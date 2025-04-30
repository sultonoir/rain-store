import { z } from "zod";

export const ratingBySlugProductSchema = z.object({
  slug: z.string(),
  limit: z.number(),
  cursor: z.number().optional(),
});

export type RatingBySlugProductSchema = z.infer<
  typeof ratingBySlugProductSchema
>;
