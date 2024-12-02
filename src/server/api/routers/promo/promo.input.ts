import { z } from "zod";

export const PromoInput = z.object({
  title: z.string(),
  discount: z.number(),
  image: z.string(),
  desc: z.string(),
});

export type PromoInput = z.infer<typeof PromoInput>;

export const FormPromoInput = z.object({
  title: z.string(),
  discount: z.string(),
  image: z.array(z.instanceof(File)).min(1, {
    message: "Images min have 1 picture",
  }),
  desc: z.string(),
});

export type FormPromoInput = z.infer<typeof FormPromoInput>;
