import { createTRPCRouter, publicProcedure } from "../../trpc";

export const promoProcedure = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.promo.findMany({
      take: 5,
    });
  }),
});
