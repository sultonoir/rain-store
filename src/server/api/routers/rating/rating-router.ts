import { createTRPCRouter, publicProcedure } from "../../trpc";
import { ratingBySlugProductSchema } from "./rating-input";

export const ratingRouter = createTRPCRouter({
  getbyslug: publicProcedure
    .input(ratingBySlugProductSchema)
    .query(async ({ ctx, input }) => {
      const { cursor = 1 } = input;
      const skip = (cursor - 1) * input.limit;
      const ratings = await ctx.db.rating.findMany({
        where: {
          product: {
            slug: input.slug,
          },
        },
        select: {
          id: true,
          message: true,
          value: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              image: true,
              imageBlur: true,
            },
          },
        },
        take: input.limit,
        skip,
      });

      return {
        ratings,
        nextCursor: cursor + 1,
      };
    }),
});
