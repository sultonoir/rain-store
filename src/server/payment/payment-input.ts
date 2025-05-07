import { z } from "zod";

const cart = z.object({
  productId: z.string(),
  quantity: z.number(),
  size: z.string(),
  price: z.number(),
});

export const paymentSchema = z.object({
  cart: z.array(cart),
  userId: z.string(),
  couponId: z.string().optional(),
});

export type PaymentInput = z.infer<typeof paymentSchema>;