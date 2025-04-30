import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { SearchProductsParams } from "./products-input";
import { getProductByslug, getProducts } from "./products-service";

export const productRouter = createTRPCRouter({
  getProducts: publicProcedure
    .input(SearchProductsParams)
    .query(async ({ input }) => getProducts(input)),
  slug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => getProductByslug(input.slug)),
});
