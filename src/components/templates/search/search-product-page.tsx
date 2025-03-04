"use client";
import { api } from "@/trpc/react";
import { type SearchProductsClient } from "@/types";
import React from "react";
import CardProduct from "../product/card-product";
import FilterHeader from "../filter/filter-header";
import { NotFoundProduct } from "../product/notfound-product";
import Item from "@/components/ui/pagination-with-links";
import LoadingProduct from "../product/loading-product";

export default function SearchProductPage({
  searchParams,
  title,
  params,
}: SearchProductsClient) {
  const sub = params?.itemId ?? "";
  const { data, status } = api.product.search.useQuery({
    ...searchParams,
    category: params?.categoryId ?? searchParams.category,
    subcategory: params?.itemId ? sub : searchParams.subcategory,
  });

  return (
    <main className="flex min-h-[calc(100dvh-130px)] w-full flex-col gap-3">
      {/* <FilterHeader title={title} count={data?.count ?? 0} /> */}
      {(() => {
        switch (status) {
          case "pending":
            return (
              <LoadingProduct className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-4" />
            );
          case "error":
            return <NotFoundProduct titile={title} />;
          case "success":
            return (
              <React.Fragment>
                {data.products.length < 1 ? (
                  <NotFoundProduct titile={title} />
                ) : (
                  <div className="flex h-full flex-col gap-4">
                    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
                      {data?.products.map((item) => (
                        <CardProduct key={item.id} product={item} />
                      ))}
                    </div>
                    {/* <Item
                      pageSize={10}
                      totalCount={data.count}
                      className="mt-auto justify-end"
                    /> */}
                  </div>
                )}
              </React.Fragment>
            );
        }
      })()}
    </main>
  );
}
