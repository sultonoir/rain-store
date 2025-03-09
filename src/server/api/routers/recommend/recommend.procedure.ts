import { createTRPCRouter, publicProcedure } from "../../trpc";
import { RecommendSchema } from "./recommend.input";
import { getRecommends } from "./recommend.service";

export const recommendProcedure = createTRPCRouter({
  getRecommends: publicProcedure
    .input(RecommendSchema)
    .query(async ({ input, ctx }) => {
      const category = await ctx.db.productDetails.findFirst({
        where: {
          product: {
            slug: input.slug,
          },
        },
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      });

      return await getRecommends({
        categories: [category?.category.name ?? ""],
      });
    }),
});
