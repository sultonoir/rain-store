import { generateId } from "lucia";
import { type ProtectedTRPCContext } from "../../trpc";
import { type GetCoupon, type CreateCouponSchema } from "./coupon.input";
import { format } from "date-fns";

export const createCoupon = (
  ctx: ProtectedTRPCContext,
  input: CreateCouponSchema,
) => {
  const expiresAt = format(input.expiresAt, "PPP");
  const code = input.code ? input.code : generateId(10);
  const desc =
    input.minOrder <= 0
      ? `No min. purchase, max. discount $${input.discount}. Valid until ${expiresAt}`
      : `Min. purchase of $${input.minOrder}, max. discount of $${input.discount}. Valid until ${expiresAt}`;

  return ctx.db.coupon.create({
    data: {
      ...input,
      id: generateId(10),
      code,
      desc,
    },
  });
};

export const getcoupon = async ({
  ctx,
  input,
}: {
  ctx: ProtectedTRPCContext;
  input: GetCoupon;
}) => {
  const coupon = await ctx.db.coupon.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              minOrder: 0,
            },
            {
              minOrder: {
                lte: input.minOrder,
              },
            },
          ],
          expiresAt: {
            gte: new Date(),
          },
        },
      ],
    },
  });
  return coupon;
};
