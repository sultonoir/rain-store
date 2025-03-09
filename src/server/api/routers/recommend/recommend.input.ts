import { z } from "zod";

export const RecommendSchema = z.object({
  categories: z.array(z.string()).optional(),
  subcategories: z.array(z.string()).optional(),
  take: z.number().optional(),
  slug : z.string().optional()
});

export type Recommendations = z.infer<typeof RecommendSchema>;
