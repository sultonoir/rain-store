import type { Media, Product } from "@prisma/client";

export type ProductCard = Product & {
  media: Media;
};
