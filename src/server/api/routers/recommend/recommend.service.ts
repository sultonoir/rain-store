import { db } from "@/server/db";
import { type Recommendations } from "./recommend.input";

export async function getRecommends({
  categories,
  subcategories,
  take = 12,
  slug,
}: Recommendations) {
  const products = await db.productDetails.findMany({
    where: {
      product: {
        slug: slug ? slug : undefined,
      },
      category: {
        name:
          categories && categories.length !== 0
            ? { in: categories }
            : undefined,
      },
      subcategory: {
        name:
          subcategories && subcategories.length !== 0
            ? { in: subcategories }
            : undefined,
      },
    },
    include: {
      product: {
        include: {
          productImage: {
            take: 1,
            orderBy: {
              createdAt: "asc",
            },
          },
          rating: true,
        },
      },
      subcategory: true,
      category: true,
    },
    take,
    orderBy: {
      product: {
        createdAt: "asc",
      },
    },
  });

  const productIds = products.flatMap((item) => item.productId);

  const ratings = await db.rating.groupBy({
    by: ["productId"],
    _avg: {
      value: true,
    },
    where: {
      productId: {
        in: productIds,
      },
    },
  });

  const result = products.map((product) => {
    //find rating
    const productRating =
      ratings.find((rating) => rating.productId === product.productId)?._avg
        .value ?? 0;

    //return result
    return {
      ...product.product,
      rating: productRating,
      productImage: product.product.productImage[0]!,
    };
  });

  return result;
}
