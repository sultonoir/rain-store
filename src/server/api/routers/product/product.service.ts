import { type TRPCContext } from "../../trpc";
import {
  type SlugProductSchema,
  type PostProductSchema,
  type SearchProductsParams,
} from "./product.input";
import slugify from "slugify";
import { TRPCError } from "@trpc/server";
import { db } from "@/server/db";
import { type Prisma } from "@prisma/client"; // Adjust the import as necessary
import { calculateTotalPrice } from "@/lib/utils";
import { getRecommends } from "../recommend/recommend.service";
import { type SearchProduct } from "@/types";

export const postProduct = async (
  ctx: TRPCContext,
  {
    title,
    images,
    category,
    subcategory,
    desc,
    discount,
    price,
    stockAdnSize,
    sumary,
  }: PostProductSchema,
) => {
  const slug = slugify(title, {
    lower: true,
  });
  const priceAfterDiscount = calculateTotalPrice({ price, discount });
  const product = await ctx.db.product.upsert({
    where: {
      slug,
    },
    create: {
      name: title,
      slug,
      price,
      discount,
      desc,
      summary: sumary,
      priceAfterDiscount,
    },
    update: {
      name: title,
      slug,
      price,
      discount,
      desc,
      summary: sumary,
    },
  });

  if (!product.id) {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }

  const productImages = await ctx.db.productImage.createManyAndReturn({
    data: images.map((item) => ({
      url: item,
      thumbnail: "",
      productId: product.id,
    })),
  });

  if (productImages.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Error create image product",
    });
  }

  const stocks = await ctx.db.stockAndSize.createManyAndReturn({
    data: stockAdnSize.map((item) => ({
      amount: parseInt(item.stock),
      name: item.size,
      productId: product.id,
    })),
  });

  if (stocks.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Error create image product",
    });
  }

  const productDetail = await ctx.db.productDetails.createManyAndReturn({
    data: {
      productId: product.id,
      categoryId: category,
      subcategoryId: subcategory,
    },
  });

  if (productDetail.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Error create product",
    });
  }

  return product.slug;
};

export const getBySlug = async (
  ctx: TRPCContext,
  { slug }: SlugProductSchema,
) => {
  const product = await db.product.findFirst({
    where: {
      slug,
    },
    include: {
      rating: true,
      productImage: true,
      stockandsize: true,
    },
  });

  if (!product) {
    return undefined;
  }
  const rating = await db.rating.aggregate({
    where: { product: { slug } },
    _avg: { value: true },
  });

  return {
    ...product,
    rating: rating._avg.value ?? 0,
  };
};

export async function searchProducts({
  input,
  ctx,
}: {
  ctx: TRPCContext;
  input: SearchProductsParams;
}): Promise<SearchProduct> {
  const { products, pagination } = await queryBuilder({ input, ctx });

  if (products.length === 0) {
    return {
      products: undefined,
      pagination,
      recommend: await getRecommends({}),
    };
  }

  return {
    products,
    pagination,
    recommend: undefined,
  };
}

export async function queryBuilder({
  input,
}: {
  ctx: TRPCContext;
  input: SearchProductsParams;
}) {
  const {
    q,
    category,
    subcategory,
    size,
    min,
    max,
    discount,
    rating,
    take = 12,
    sort = "latest", // Default sorting
  } = input;
  const conditions: Prisma.ProductWhereInput[] = [];
  const page = parseInt(input.page ?? "1");
  const skip = (page - 1) * take;

  if (q) {
    conditions.push({ name: { contains: q, mode: "insensitive" } });
  }

  // Filter by category
  if (category) {
    conditions.push({
      productDetails: {
        some: {
          category: { name: category },
        },
      },
    });
  }

  // Filter by subcategory
  if (subcategory) {
    conditions.push({
      productDetails: {
        some: {
          subcategory: { name: subcategory },
        },
      },
    });
  }

  // Filter by size
  if (size) {
    conditions.push({
      stockandsize: { some: { name: { contains: size, mode: "insensitive" } } },
    });
  }

  // Price range filtering
  const priceConditions: Prisma.ProductWhereInput[] = [];
  if (min) {
    priceConditions.push({
      priceAfterDiscount: { gte: parseFloat(min) },
    });
  }
  if (max) {
    priceConditions.push({
      priceAfterDiscount: { lte: parseFloat(max) },
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
      discount: { gte: parseFloat(discount) },
    });
  }

  // Final where clause
  const whereClause: Prisma.ProductWhereInput = {
    AND: conditions,
  };

  // Order by clause
  const orderByClause: Prisma.ProductOrderByWithRelationInput = {
    ...(sort === "latest"
      ? { createdAt: "desc" }
      : sort === "lowest-price"
        ? { priceAfterDiscount: "asc" }
        : sort === "high-price"
          ? { priceAfterDiscount: "desc" }
          : {}),
  };

  // Fetch products from the database
  const [products, totalCount] = await Promise.all([
    db.product.findMany({
      where: whereClause,
      orderBy: orderByClause,
      include: {
        rating: true,
        productImage: {
          take: 1,
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      take,
      skip,
      cacheStrategy: { ttl: 60, swr: 60, tags: ["find_all"] },
    }),
    db.product.count({ where: whereClause }),
  ]);

  const ids = products.map((product) => product.id);

  const ratings = await db.rating.groupBy({
    by: ["productId"],
    _avg: {
      value: true,
    },
    where: {
      productId: {
        in: ids,
      },
    },
    cacheStrategy: {
      ttl: 60,
      swr: 60,
      tags: ["rating_find"],
    },
  });

  const sells = await db.selling.groupBy({
    by: ["productId"],
    _sum: {
      amount: true,
    },
    where: {
      productId: {
        in: ids,
      },
    },
  });

  const newProducts = products.map((item) => {
    const productRating =
      ratings.find((rating) => rating.productId === item.id)?._avg.value ?? 0;

    const mostSelling =
      sells.find((sell) => sell.productId === item.id)?._sum.amount ?? 0;
    return {
      ...item,
      productImage: item.productImage[0]!,
      rating: productRating,
      selling: mostSelling,
    };
  });

  const pagination = {
    total: totalCount,
    pages: Math.ceil(totalCount / take),
    current: page,
    limit: take,
  };

  if (sort === "most-rating") {
    return {
      products: newProducts.sort((a, b) => {
        return b.rating - a.rating;
      }),
      pagination,
    };
  }

  if (sort === "hot-sale") {
    return {
      products: newProducts.sort((a, b) => {
        return b.selling - a.selling;
      }),
      pagination,
    };
  }

  if (rating) {
    return {
      products: newProducts
        .filter((product) => product.rating >= parseInt(rating))
        .sort((a, b) => {
          return b.rating - a.rating;
        }),
      pagination,
    };
  }

  if (products.length === 0) {
    return {
      products: [],
      pagination,
    };
  }

  return {
    products: newProducts,
    pagination,
  };
}
