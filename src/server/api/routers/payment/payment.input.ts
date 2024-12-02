import { z } from "zod";

export const CreatePayment = z.object({
  cart: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      productId: z.string(),
      size: z.string(),
      amount: z.number(),
      max: z.number(),
      price: z.number(),
      discount: z.number(),
    }),
  ),
  promoId: z.string().optional(),
  name: z.string(),
  email: z.string(),
});

export type CreatePayment = z.infer<typeof CreatePayment>;

export type Cart = {
  id: string;
  name: string;
  productId: string;
  size: string;
  amount: number;
  max: number;
  price: number;
  discount: number;
};

export const GetHistory = z.object({
  name: z.string().optional(),
  statusPayment: z
    .enum(["pending", "success", "paid", "cancel", "shipped"])
    .optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.string().optional(),
});

export type GetHistory = z.infer<typeof GetHistory>;
