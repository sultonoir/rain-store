import { generateId } from "lucia";
import { type TRPCContext } from "../../trpc";
import {
  type SlugProductSchema,
  type PostProductSchema,
  type SearchProductsParams,
  type RecommendInput,
} from "./product.input";
import slugify from "slugify";
import { TRPCError } from "@trpc/server";
import { getTotalRating } from "@/lib/total-rating";
import { createBlurHash } from "@/lib/blur";
import { db } from "@/server/db";
import { type Prisma } from "@prisma/client"; // Adjust the import as necessary
import {
  calculateTotalPrice,
  generateRandomDecimal,
  generateRandomSelling,
} from "@/lib/utils";

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
      id: generateId(10),
      name: title,
      slug,
      price,
      discount,
      desc,
      summary: sumary,
      priceAfterDiscount,
    },
    update: {
      id: generateId(10),
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
      id: generateId(10),
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
      id: generateId(10),
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
  const product = await ctx.db.product.findFirst({
    where: {
      slug,
    },
    include: {
      productImage: {
        orderBy: {
          createdAt: "desc",
        },
      },
      stockandsize: true,
      rating: true,

      productDetails: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!product) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Product not found",
    });
  }

  const coupon = await ctx.db.coupon.findMany({
    where: {
      OR: [
        {
          minOrder: 0,
        },
        {
          minOrder: {
            lte: product.price, // Menggunakan `lte` untuk mendapatkan kupon dengan minOrder <= product.price
          },
        },
      ],
    },
  });

  const newImages = await Promise.all(
    product.productImage.map(async (img) => ({
      ...img,
      thumbnail: await createBlurHash(img.url),
    })),
  );

  const newProduct = {
    ...product,
    productImage: newImages, // Sesuaikan dengan nama `productImage` dari database
    coupon,
    category: product.productDetails.at(0)?.category.name ?? "",
  };

  return newProduct;
};

export const listProduct = async (ctx: TRPCContext) => {
  const products = await ctx.db.product.findMany({
    include: {
      productImage: {
        take: 1,
        orderBy: {
          createdAt: "asc",
        },
      },

      rating: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const newProducts = await Promise.all(
    products.map(async (item) => {
      const totalRating = getTotalRating(item.rating);
      const averageRating = totalRating / item.rating.length;

      const newImages = await Promise.all(
        item.productImage.flatMap(async (img) => ({
          ...img,
          thumbnail: await createBlurHash(img.url),
        })),
      );

      return {
        ...item,
        rating: averageRating,
        productImage: newImages,
      };
    }),
  );

  return newProducts;
};

export async function searchProducts({
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
    page,
    take = 10,
    sort = "latest", // Default sorting
  } = input;
  const pagecount = page ? parseInt(page) : 1;
  const startIndex = (pagecount - 1) * take; // Mulai dari (currentPage - 1) * 10
  const endIndex = startIndex + take;
  const conditions: Prisma.ProductWhereInput[] = [];

  // Search by product name
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
      price: { gte: parseFloat(min) },
    });
  }
  if (max) {
    priceConditions.push({
      price: { lte: parseFloat(max) },
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

  if (rating) {
    conditions.push({
      rating: {
        some: {
          value: {
            gte: parseFloat(rating),
          },
        },
      },
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
  const products = await db.product.findMany({
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
    cacheStrategy: { ttl: 60, swr: 60 },
  });

  const newProducts = products.map((item) => {
    return {
      ...item,
      rating: generateRandomDecimal(),
      selling: generateRandomSelling(),
    };
  });

  if (sort === "most-rating") {
    return {
      products: newProducts
        .sort((a, b) => {
          return b.rating - a.rating;
        })
        .slice(startIndex, endIndex),
      count: newProducts.length,
    };
  }

  if (sort === "hot-sale") {
    return {
      products: newProducts
        .sort((a, b) => {
          return b.selling - a.selling;
        })
        .slice(startIndex, endIndex),
      count: newProducts.length,
    };
  }

  return {
    products: newProducts.slice(startIndex, endIndex),
    count: newProducts.length,
  };
}

export async function recommend({
  input,
}: {
  ctx: TRPCContext;
  input: RecommendInput;
}) {
  const { category, ids, slug, take, cursor } = input;
  const conditions: Prisma.ProductWhereInput[] = [];

  if (ids) {
    conditions.push({ id: { in: ids } });
  }

  if (slug) {
    conditions.push({ slug: { not: slug } });
  }

  if (category) {
    conditions.push({
      productDetails: {
        some: {
          category: { name: { contains: category, mode: "insensitive" } },
        },
      },
    });
  }

  const whereClause: Prisma.ProductWhereInput = {
    AND: conditions,
  };

  const products = await db.product.findMany({
    where: whereClause,
    include: {
      rating: true,
      productImage: {
        take: 1,
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    take: take ? take + 1 : undefined,
    cursor: cursor ? { id: cursor } : undefined,
    cacheStrategy: { ttl: 60, swr: 60 },
  });

  const nextCursor = products.length > take ? products[take]?.id : null;

  const newProducts = await Promise.all(
    products
      .map(async (item) => {
        const totalRating = getTotalRating(item.rating);
        const averageRating = totalRating / item.rating.length;

        const newImages = await Promise.all(
          item.productImage.flatMap(async (img) => ({
            ...img,
            thumbnail: await createBlurHash(img.url),
          })),
        );

        return {
          ...item,
          rating: averageRating,
          productImage: newImages,
        };
      })
      .slice(0, take),
  );
  return {
    products: newProducts,
    nextCursor,
  };
}

export async function PageSection({
  input,
}: {
  ctx: TRPCContext;
  input: SearchProductsParams;
}) {
  const {
    page,
    take = 10,
    sort = "latest", // Default sorting
  } = input;
  const pagecount = page ? parseInt(page) : 1;
  const startIndex = (pagecount - 1) * take; // Mulai dari (currentPage - 1) * 10
  const endIndex = startIndex + take;

  const products = await db.product.findMany({
    include: {
      rating: true,
      productImage: {
        take: 1,
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    cacheStrategy: { ttl: 60, swr: 60 },
  });

  const newProducts = products.map((item) => {
    return {
      ...item,
      rating: generateRandomDecimal(),
      selling: generateRandomSelling(),
    };
  });

  if (sort === "hot-sale") {
    return {
      products: newProducts
        .sort((a, b) => {
          return b.selling - a.selling;
        })
        .slice(startIndex, endIndex),
      count: newProducts.length,
    };
  }
  return {
    products: newProducts
      .sort((a, b) => {
        return b.rating - a.rating;
      })
      .slice(startIndex, endIndex),
    count: newProducts.length,
  };
}
