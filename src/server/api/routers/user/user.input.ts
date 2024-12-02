import { z } from "zod";

export const getUserSchema = z.object({
  id: z.string(),
});

export type GetUserInput = z.infer<typeof getUserSchema>;

export const ImageInput = z.object({
  image: z.string(),
});

export type ImageInput = z.infer<typeof ImageInput>;

export const UpdateInput = z.object({
  image: z.string().optional(),
  name: z.string().optional(),
  password: z.string().optional(),
});

export type UpdateInput = z.infer<typeof UpdateInput>;
