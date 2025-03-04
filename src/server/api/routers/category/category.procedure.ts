import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import * as input from "./category.input";
import * as service from "./category.service";

export const categoryProcedure = createTRPCRouter({
  getall: protectedProcedure.query(({ ctx }) => service.getCategories(ctx)),

  post: protectedProcedure
    .input(input.postCategoryInput)
    .mutation(({ ctx, input }) => service.createCategory(ctx, input)),

  withSub: publicProcedure.query(({ ctx }) => service.withSub(ctx)),

  generate: protectedProcedure.mutation(async ({ ctx }) =>
    service.generateCategory(ctx),
  ),

  remove: protectedProcedure
    .input(input.RemoveCategoryInput)
    .mutation(async ({ input, ctx }) => service.removeById({ ctx, input })),
});
