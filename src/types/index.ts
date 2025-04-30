import type { Media, Product } from "@prisma/client";

export type ProductCard = Product & {
  media: Media;
};

type MenuListProfile = {
  title: string;
  path: string;
  keybind: string;
};

export type MenuProfileProps = {
  menulists: MenuListProfile[];
};
