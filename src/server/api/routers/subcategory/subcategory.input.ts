import { z } from "zod";

export const postSubCategoryInput = z.object({
  category: z.string(),
  name: z.string(),
});

export type PostSubCategorySchema = z.infer<typeof postSubCategoryInput>;

export const getByCategoryInput = z.object({
  categoryId: z.string(),
});

export type GetByCategorySchema = z.infer<typeof getByCategoryInput>;

export const RemoveSub = z.object({
  id: z.string(),
});

export type RemoveSub = z.infer<typeof RemoveSub>;
