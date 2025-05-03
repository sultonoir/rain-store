"use server";

import { db } from "../db";
import { unstable_cache } from "../unstable-chache";

export const getRatingByProductSlug = unstable_cache(
  async ({
    slug,
    page,
    take,
  }: {
    slug: string;
    page: number;
    take: number;
  }) => {
    const skip = (page - 1) * take;
    return await db.rating.findMany({
      where: {
        product: {
          slug,
        },
      },
      select: {
        id: true,
        message: true,
        value: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        productId: true,
        user: {
          select: {
            name: true,
            image: true,
            imageBlur: true,
          },
        },
      },
      take,
      skip,
    });
  },
  ["rating"],
  {
    revalidate: 60 * 60 * 2,
  },
);
