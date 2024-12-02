import { z } from "zod";

export const postProductInput = z.object({
  title: z.string().min(2, {
    message: "Product must have 2 character",
  }),
  desc: z.string().min(10, {
    message: "Product must have 10 character",
  }),
  discount: z.number().max(90, {
    message: "Max discount is 90%",
  }),
  sumary: z.string().min(10, {
    message: "Product must have 10 character",
  }),
  price: z.number(),
  stockAdnSize: z
    .array(
      z.object({
        stock: z.string(),
        size: z.string(),
      }),
    )
    .min(1, {
      message: "Stock and size must have 1 item",
    }),
  category: z.string(),
  subcategory: z.string(),
  images: z.array(z.string()),
});

export type PostProductSchema = z.infer<typeof postProductInput>;

export const slugProductInput = z.object({
  slug: z.string(),
});

export type SlugProductSchema = z.infer<typeof slugProductInput>;

export const CreateProductSchema = z.object({
  title: z.string().min(2, {
    message: "Product must have 2 character",
  }),
  desc: z.string().min(10, {
    message: "Product must have 10 character",
  }),
  sumary: z.string().min(10, {
    message: "Product must have 10 character",
  }),
  discount: z.number().max(90, {
    message: "Max discount is 90%",
  }),
  price: z.number().min(1, {
    message: "Please enter valid price",
  }),
  stockAdnSize: z
    .array(
      z.object({
        stock: z.string(),
        size: z.string(),
      }),
    )
    .min(1, {
      message: "Stock and size must have 1 item",
    }),
  category: z.string().min(1, {
    message: "Please select category",
  }),
  subcategory: z.string().min(1, {
    message: "Plese select subcategory",
  }),
  images: z.array(z.instanceof(File)).min(1, {
    message: "Images min have 1 picture",
  }),
});

export type CreateProductSchema = z.infer<typeof CreateProductSchema>;

export const SearchProductsParams = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  size: z.string().optional(),
  min: z.string().optional(),
  max: z.string().optional(),
  discount: z.string().optional(),
  rating: z.string().optional(),
  page: z.string().optional(),
  take: z.number().optional(),
  sort: z
    .enum(["hot-sale", "most-rating", "latest", "lowest-price", "high-price"])
    .optional(),
});

export type SearchProductsParams = z.infer<typeof SearchProductsParams>;

export const RecommendInput = z.object({
  category: z.string().optional(),
  ids: z.array(z.string()).optional(),
  slug: z.string().optional(),
  take: z.number(),
  cursor: z.string().optional(),
});

export type RecommendInput = z.infer<typeof RecommendInput>;
