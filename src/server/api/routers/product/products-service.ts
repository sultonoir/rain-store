import type { Prisma } from "@prisma/client";
import type { SearchProductsParams } from "./products-input";
import { db } from "@/server/db";

export async function getProducts({
  q,
  category,
  subcategory,
  min,
  max,
  take = 10,
  discount,
  rating,
  sort,
  page = 1,
}: SearchProductsParams) {
  const skip = (page - 1) * take;
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
      discountPrice: { gte: min },
    });
  }
  if (max) {
    priceConditions.push({
      discountPrice: { lte: max },
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
      discount: { gte: discount },
    });
  }

  if (rating) {
    conditions.push({
      ratingAverage: { gte: rating },
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

export async function getProductByslug(slug: string) {
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
}
