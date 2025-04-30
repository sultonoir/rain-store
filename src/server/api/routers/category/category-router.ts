import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.category.findMany({
      include: {
        subcategories: true,
      },
    });
  }),
});
