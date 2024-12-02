"use client";
import React from "react";
import LoadingProduct from "../product/loading-product";
import { api } from "@/trpc/react";
import CardProduct from "../product/card-product";
import { type SearchProductsParams } from "@/server/api/routers/product/product.input";
import { cn } from "@/lib/utils";

interface Props extends SearchProductsParams {
  title?: string;
  showPagination?: boolean;
  loadingClassName?: string;
  layoutClassName?: string;
}

export default function RecomendPagination({
  title,
  layoutClassName,
  loadingClassName,
  ...props
}: Props) {
  const { data, status } = api.product.search.useQuery({ ...props });

  switch (status) {
    case "pending":
      return (
        <LoadingProduct
          length={props.take}
          className={cn(
            "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4",
            loadingClassName,
          )}
        />
      );
    case "error":
      return null;
    case "success":
      return (
        <React.Fragment>
          {data.products.length < 1 ? null : (
            <div className="flex flex-col gap-2">
              {title && <h3 className="font-bold ~text-lg/2xl">{title}</h3>}
              <div
                className={cn(
                  "grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6",
                  layoutClassName,
                )}
              >
                {data.products.map((product) => (
                  <CardProduct key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </React.Fragment>
      );
  }
}
