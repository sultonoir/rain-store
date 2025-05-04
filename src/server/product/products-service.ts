import type { Prisma } from "@prisma/client";
import type { SearchProductsParams } from "./products-input";
import { db } from "@/server/db";
import { unstable_cache } from "../unstable-chache";

async function queryProducts({
  q,
  category,
  subcategory,
  min,
  max,
  take = 10,
  discount,
  rating,
  sort,
  page = "1",
}: SearchProductsParams) {
  const skip = (parseInt(page) - 1) * take;
  const conditions: Prisma.ProductWhereInput[] = [];

  if (q) {
    conditions.push({ name: { contains: q, mode: "insensitive" } });
  }

  // Filter by category
  if (category) {
    conditions.push({
      category,
    });
  }

  // Filter by subcategory
  if (subcategory) {
    conditions.push({
      subcategory,
    });
  }

  // Price range filtering
  const priceConditions: Prisma.ProductWhereInput[] = [];
  if (min) {
    priceConditions.push({
      discountPrice: { gte: parseInt(min) },
    });
  }
  if (max) {
    priceConditions.push({
      discountPrice: { lte: parseInt(max) },
    });
  }

  // Combine price conditions with AND if there are any
  if (priceConditions.length > 0) {
    conditions.push({
      AND: priceConditions,
    });
  }

  if (discount) {
    conditions.push({
      discount: { gte: parseInt(discount) },
    });
  }

  if (rating) {
    conditions.push({
      ratingAverage: { gte: parseInt(rating) },
    });
  }

  // Final where clause
  const whereClause: Prisma.ProductWhereInput = {
    AND: conditions,
  };

  const orderByClause: Prisma.ProductOrderByWithRelationInput = (() => {
    switch (sort) {
      case "hot-sale":
        return { selling: "desc" };
      case "most-rated":
        return { ratingAverage: "desc" };
      case "high-price":
        return { discountPrice: "desc" };
      case "lowest-price":
        return { discountPrice: "asc" };
      case "latest":
        return { createdAt: "desc" };
      default:
        return { createdAt: "desc" };
    }
  })();

  const products = await db.product.findMany({
    where: whereClause,
    orderBy: orderByClause,
    take,
    skip,
    include: {
      media: {
        orderBy: {
          createdAt: "asc",
        },
        take: 1,
      },
    },
  });

  return products.flatMap((product) => ({
    ...product,
    media: product.media[0]!,
  }));
}

export const getProducts = unstable_cache(queryProducts, ["products"], {
  revalidate: 60 * 60 * 2,
});

export const getProductBySlug = unstable_cache(
  async (slug: string) => {
    return await db.product.findUnique({
      where: {
        slug,
      },
      include: {
        media: true,
        variant: true,
        ratingStatistics: true,
      },
    });
  },
  ["product-slug"],
  {
    revalidate: 60 * 60 * 2,
  },
);

export const searchProducts = unstable_cache(
  async (params: SearchProductsParams) => {
    const query = queryProducts(params);
    const count = db.product.count();

    const [products, totalProduct] = await Promise.all([query, count]);

    if (products.length === 0) {
      return {
        totalProduct,
        products: await queryProducts({ take: 12 }),
        found: false,
      };
    }

    return {
      totalProduct: products.length,
      products,
      found: true,
    };
  },
  ["search"],
  {
    revalidate: 60 * 60 * 2,
  },
);
