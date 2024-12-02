import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import * as input from "./product.input";
import * as service from "./product.service";
export const productProcedure = createTRPCRouter({
  post: protectedProcedure
    .input(input.postProductInput)
    .mutation(({ ctx, input }) => service.postProduct(ctx, input)),

  slug: publicProcedure
    .input(input.slugProductInput)
    .query(({ ctx, input }) => service.getBySlug(ctx, input)),

  list: publicProcedure.query(({ ctx }) => service.listProduct(ctx)),

  recommend: publicProcedure
    .input(input.RecommendInput)
    .query(async ({ ctx, input }) => service.recommend({ ctx, input })),

  search: publicProcedure
    .input(input.SearchProductsParams)
    .query(async ({ input, ctx }) => service.searchProducts({ ctx, input })),
});
