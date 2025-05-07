"use server";

import { db } from "../db";
import { action, ActionError } from "@/lib/safe-action";
import { paymentSchema } from "./payment-input";
import { Prisma } from "@prisma/client";
import {
  sendAdminNotifiOrder,
  sendUserNotifiOrder,
} from "../notifi/notifi-service";

export const createPayment = action
  .metadata({ actionName: "createPayment" })
  .schema(paymentSchema)
  .action(async ({ parsedInput: { cart, userId }, ctx: { user } }) => {
    if (user.id !== userId) {
      throw new ActionError("Unauthorized");
    }
    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
    const totalProduct = cart.reduce((acc, item) => acc + item.quantity, 0);

    try {
      const orderId = await db.$transaction(async (tx) => {
        const order = await tx.order.create({
          data: {
            userId,
            totalPrice,
            totalProduct,
            status: "paid",
          },
        });

        await tx.orderItem.createMany({
          data: cart.map((item) => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            size: item.size,
            price: item.price,
          })),
        });

        return order.id;
      });

      // Setelah transaksi selesai (commit), jalankan notifikasi
      await Promise.all([
        sendAdminNotifiOrder({
          username: user.name,
          totalPrice,
          totalProduct,
          orderId: orderId,
        }),
        sendUserNotifiOrder({ userId, orderId }),
      ]);
    } catch (error) {
      console.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ActionError(error.message);
      }
      throw new ActionError("Error creating payment");
    }
  });
