import { createTRPCRouter, publicProcedure } from "../../trpc";
import { ReviewsSchema } from "./reviews.input";
import { queryRating } from "./reviews.service";

export const reviewsProcedure = createTRPCRouter({
  getBySlug: publicProcedure
    .input(ReviewsSchema)
    .query(async ({ input }) => queryRating(input)),
  postBySlug: publicProcedure
    .input(ReviewsSchema)
    .mutation(async ({ input }) => queryRating(input)),
});
