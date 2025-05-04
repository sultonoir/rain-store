import { z } from "zod";

export const SearchProductsParams = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  min: z.string().optional(),
  max: z.string().optional(),
  discount: z.string().optional(),
  rating: z.string().optional(),
  page: z.string().optional(),
  take: z.number().optional(),
  cursor: z.string().optional(),
  sort: z
    .enum(["hot-sale", "most-rated", "latest", "lowest-price", "high-price"])
    .optional(),
});

export type SearchProductsParams = z.infer<typeof SearchProductsParams>;
