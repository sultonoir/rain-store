import { createTRPCRouter, publicProcedure } from "../../trpc";
import { SearchProductsParams } from "./products-input";
import { getProducts } from "./products-service";

export const productRouter = createTRPCRouter({
  getProducts: publicProcedure
    .input(SearchProductsParams)
    .query(async ({ input }) => getProducts(input)),
});
