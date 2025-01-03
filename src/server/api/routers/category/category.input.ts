import { z } from "zod";

export const postCategoryInput = z.object({
  name: z.string().min(2),
});

export type PostCategorySchema = z.infer<typeof postCategoryInput>;

export const RemoveCategoryInput = z.object({
  id: z.string(),
});

export type RemoveCategoryInput = z.infer<typeof RemoveCategoryInput>;
