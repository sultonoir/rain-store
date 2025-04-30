import { z } from "zod";

export const SearchProductsParams = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  min: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined)),
  max: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined)),
  discount: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined)),
  rating: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined)),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : undefined)), // Default to page 1 if not provided
  take: z.number().optional(),
  cursor: z.string().optional(),
  sort: z
    .enum(["hot-sale", "most-rated", "latest", "lowest-price", "high-price"])
    .optional(),
});

export type SearchProductsParams = z.infer<typeof SearchProductsParams>;
