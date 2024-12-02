import { type ProtectedTRPCContext } from "../../trpc";
import type * as input from "./payment.input";
import { generateId } from "lucia";
import { TRPCError } from "@trpc/server";
import { NotifitoAdmin } from "../notifi/notifi.service";
import { db } from "@/server/db";
import { type Coupon } from "@prisma/client";

export async function createPayment({
  ctx,
  input,
}: {
  ctx: ProtectedTRPCContext;
  input: input.CreatePayment;
}) {
  const { cart, name, email } = input;
  const coupon = await getCoupon(ctx, input.promoId);

  const { total, quantity } = calculatePrices(input.cart, coupon);
  const checkout = await createCheckout(ctx, total, quantity, name, email);

  if (!checkout) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error creating payment",
    });
  }

  const checkoutItem = await createCheckoutItems(cart, checkout.id);

  const stockUpdate = await updateStock({ cart, name, email });
  const failedUpdates = stockUpdate.filter((update) => !update.success);

  if (failedUpdates.length > 0) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Errors occurred in stock updates",
      cause: failedUpdates,
    });
  }

  if (checkoutItem.length === 0) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error creating checkout item",
    });
  }

  const notifications = await handleNotifications(
    ctx,
    total,
    quantity,
    checkout.id,
  );
  return notifications;
}

async function getCoupon(
  ctx: ProtectedTRPCContext,
  promoId: string | undefined,
) {
  if (!promoId) return null; // Jika promoId undefined, langsung kembalikan null
  return ctx.db.coupon.findFirst({ where: { id: promoId } });
}

function calculatePrices(cart: input.Cart[], coupon: Coupon | null) {
  const quantity = cart.reduce((acc, cur) => acc + cur.amount, 0);
  const subTotal = cart.reduce((total, cartItem) => {
    const { price, amount } = cartItem;
    return total + price * amount;
  }, 0);

  const charge = subTotal >= 50 ? 0 : 10;
  const tax = (subTotal * 3) / 100;
  const couponValue = coupon?.discount ?? 0;
  const total = subTotal + charge + tax - couponValue;

  return { total, quantity };
}

async function createCheckout(
  ctx: ProtectedTRPCContext,
  total: number,
  quantity: number,
  name: string,
  email: string,
) {
  return ctx.db.checkout.create({
    data: {
      id: generateId(10),
      name,
      email,
      price: total,
      quantity,
      status: "paid",
    },
  });
}

async function createCheckoutItems(cart: input.Cart[], checkoutId: string) {
  return db.checkoutItem.createManyAndReturn({
    data: cart.map((item) => ({
      id: generateId(10),
      checkoutId,
      productId: item.productId,
      quantity: item.amount,
      price: item.price,
      size: item.size,
    })),
  });
}

async function updateStock({
  cart,
  name,
  email,
}: {
  cart: input.Cart[];
  name: string;
  email: string;
}) {
  return Promise.all(
    cart.map(async (item) => {
      return db.$transaction(async (tx) => {
        try {
          // Mengecek stok yang tersedia
          const stock = await tx.stockAndSize.findFirst({
            where: {
              productId: item.productId,
              name: item.size,
            },
            select: { amount: true },
          });

          // Jika stok tidak mencukupi atau sudah 0, lempar error
          if (!stock || stock.amount < item.amount) {
            throw new Error(
              `Stock for ${item.size} of product ${item.productId} is insufficient`,
            );
          }

          // Update stok
          await tx.stockAndSize.updateMany({
            where: {
              productId: item.productId,
              name: item.size,
            },
            data: {
              amount: {
                decrement: item.amount,
              },
            },
          });

          // Buat data penjualan
          await tx.selling.create({
            data: {
              amount: item.amount,
              productId: item.productId,
              id: generateId(10),
              name,
              email,
            },
          });

          return { productId: item.productId, size: item.size, success: true };
        } catch (error) {
          return {
            productId: item.productId,
            size: item.size,
            error,
            success: false,
          };
        }
      });
    }),
  );
}

async function handleNotifications(
  ctx: ProtectedTRPCContext,
  total: number,
  quantity: number,
  checkoutId: string,
) {
  const adminNotifi = await NotifitoAdmin({
    message: `${ctx.user.name} has made a purchase worth $${total} with a quantity of ${quantity} items`,
    status: "PaymentUpdate",
    issuerId: ctx.user.id,
    link: "/dashboard/order",
    checkoutId,
  });

  return adminNotifi;
}
