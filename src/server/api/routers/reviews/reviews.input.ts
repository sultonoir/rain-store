import { z } from "zod";

export const ReviewsSchema = z.object({
  slug : z.string(),
  page : z.number().optional(),
  pageSize : z.number().optional()
})

export type ReviewsSchema = z.infer<typeof ReviewsSchema>