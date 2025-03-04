import {
  type StockAndSize,
  type Product,
  type ProductImage,
} from "@prisma/client";
import { type LucideProps } from "lucide-react";
import { type Socket, type Server as NetServer } from "net";
import { type Server as SocketIOServer } from "socket.io";
import { type NextApiResponse } from "next";
import { type SearchProductsParams } from "@/server/api/routers/product/product.input";
import { type GetHistory } from "@/server/api/routers/payment/payment.input";

export type GithubData = {
  id: number;
  name: string;
  avatar_url: string;
};

export type FacebookData = {
  name: string;
  id: string;
  email: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
};

export type GoogleUser = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
};

export type AdminMenuList = {
  title: string;
  path: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  count: number | null;
};

type MenuListProfile = {
  title: string;
  path: string;
  keybind: string;
};

export type MenuProfileProps = {
  menulists: MenuListProfile[];
};

export type Option = Record<"value" | "label", string> & Record<string, string>;

export type ProductCard = Product & {
  productImage: ProductImage[];
  rating: number;
};

export type ProductPage = Product & {
  productImage: ProductImage[];
  rating: number;
  stockandsize: StockAndSize[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type FormatCart = {
  id: string;
  name: string;
  productId: string;
  size: string;
  amount: number;
  createdAt: Date;
  max: number;
  updatedAt: Date;
  price: number;
  discount: number;
  image: ProductImage;
};

export type Categories = {
  name: string;
  id: string;
  subcategories: {
    name: string;
    id: string;
  }[];
};

export type NotifiCount = {
  userId: string;
  count: number;
};

export type SearchProductsPageProps = {
  searchParams: SearchProductsParams;
};

export type CategoryPageProps = {
  params: { categoryId?: string; itemId?: string };
  searchParams: SearchProductsParams;
};

export type SearchProductsClient = {
  params?: { categoryId?: string; itemId?: string };
  title: string;
  searchParams: SearchProductsParams;
};

export type HistoryPage = {
  searchParams: GetHistory;
};

type Params = Promise<Record<string, string>>;
type SearchParams = Promise<Record<string, string | undefined>>;

export type PageDynamic = {
  searchParams: SearchParams;
  params: Params;
};
