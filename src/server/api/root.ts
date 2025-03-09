import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userProsedure } from "./routers/user/user.prosedure";
import { categoryProcedure } from "./routers/category/category.procedure";
import { subcategoryProcedure } from "./routers/subcategory/subcategory.procedure";
import { productProcedure } from "./routers/product/product.procedure";
import { couponProcedure } from "./routers/coupon/coupon.procedure";
import { sizeProcedure } from "./routers/size/size.procedure";
import { notifiProcedure } from "./routers/notifi/notifi.procedure";
import { paymentProcedure } from "./routers/payment/payment.procedure";
import { promoProcedure } from "./routers/promo/promo.procedure";
import { reviewsProcedure } from "./routers/reviews/reviews.procedure";
import { recommendProcedure } from "./routers/recommend/recommend.procedure";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userProsedure,
  category: categoryProcedure,
  subcategory: subcategoryProcedure,
  product: productProcedure,
  coupon: couponProcedure,
  size: sizeProcedure,
  notifi: notifiProcedure,
  payment: paymentProcedure,
  promo: promoProcedure,
  reviews: reviewsProcedure,
  recommends: recommendProcedure,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
