import type { SearchProductsParams } from "@/server/api/routers/product/products-input";
import type { Media, Product, Rating, Variant } from "@prisma/client";

export type ProductCard = Product & {
  media: Media;
};

export type ProductPage = Product & {
  media: Media[];
  variant: Variant[];
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
  media: Media;
};

export type RecommedParams = {
  categories?: string[];
  subcategories?: string[];
  take?: number;
};

export type RatingStats = {
  averageRating: number;
  ratingCounts: {
    stars: number;
    count: number;
    percentage: number;
  }[];
  totalReviews: number;
};

export type Pagination = {
  total: number;
  pages: number;
  current: number;
  limit: number;
};

export type RatingWithuser = Rating & {
  user: {
    name: string | null;
    image: string | null;
  };
};

export type ReviewerProps = {
  ratings: RatingWithuser[];
  pagination: Pagination;
  stats: RatingStats;
  page?: string;
};

type Params = Promise<{
  category: string;
  subcategory: string;
  product: string;
}>;
type SearchParams = Promise<Record<string, string | undefined>>;

export type PageDynamic = {
  searchParams: SearchParams;
  params: Params;
};

export type SearchProductsClient = {
  params?: { category?: string; subcategory?: string };
  title: string;
  searchParams: SearchProductsParams;
};

export type SearchProduct = {
  products?: ProductCard[];
  pagination: Pagination;
  recommend?: ProductCard[];
};

export type GlobalResponse = {
  success: boolean;
  error?: {
    message: string;
  };
};

type MenuListProfile = {
  title: string;
  path: string;
  keybind: string;
};

export type MenuProfileProps = {
  menulists: MenuListProfile[];
};

export interface UploadedFile {
  url: string;
  fileId: string;
  name: string;
  thumbnailUrl: string;
  blur: string;
}
