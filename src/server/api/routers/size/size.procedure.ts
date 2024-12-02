import * as service from "./size.service";
import * as input from "./size.input";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const sizeProcedure = createTRPCRouter({
  generate: protectedProcedure.mutation(
    async () => await new Promise((resolve) => setTimeout(resolve, 1000)),
  ),
  create: protectedProcedure
    .input(input.CreateSizeInput)
    .mutation(({ input }) => service.createSize(input)),

  remove: protectedProcedure
    .input(input.RemoveSizeInput)
    .mutation(({ input }) => service.removeSize({ id: input.id })),
});
