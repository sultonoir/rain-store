"use client";

import { api } from "@/trpc/react";
import {
  type SearchProduct,
  type ProductCard,
  type SearchProductsClient,
} from "@/types";
import React from "react";
import CardProduct from "../product/card-product";
import FilterHeader from "../filter/filter-header";
import { NotFoundProduct } from "../product/notfound-product";
import LoadingProduct from "../product/loading-product";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

type ProductGridProps = {
  products: ProductCard[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => (
  <div className="flex h-full flex-col gap-4">
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
      {products.map((item) => (
        <CardProduct key={item.id} product={item} />
      ))}
    </div>
  </div>
);

type SearchResultProps = {
  status: "pending" | "error" | "success";
  data?: SearchProduct;
  title: string;
};

const SearchResult: React.FC<SearchResultProps> = ({ status, data, title }) => {
  if (status === "pending") {
    return (
      <LoadingProduct className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-4" />
    );
  }

  if (status === "error" || !data?.products || data.products.length === 0) {
    return <NotFoundProduct title={title} recommend={data?.recommend ?? []} />;
  }

  return (
    <>
      <ProductGrid products={data.products} />
      <PaginationWithLinks
        totalCount={data.pagination.total}
        pageSize={data.pagination.limit}
        page={data.pagination.current}
      />
    </>
  );
};

export default function SearchProductPage({
  searchParams,
  title,
  params,
}: SearchProductsClient) {
  const { data, status } = api.product.search.useQuery({
    ...searchParams,
    category: params?.categoryId
      ? decodeURIComponent(params.categoryId)
      : searchParams.category,
    subcategory: params?.itemId
      ? decodeURI(params.itemId)
      : searchParams.subcategory,
  });

  return (
    <main className="flex min-h-[calc(100dvh-130px)] w-full flex-col gap-3">
      <FilterHeader title={title} count={data?.pagination.total ?? 0} />
      <SearchResult status={status} data={data} title={title} />
    </main>
  );
}
