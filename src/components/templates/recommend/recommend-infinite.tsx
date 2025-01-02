"use client";
import React, { useMemo } from "react";
import LoadingProduct from "../product/loading-product";
import { api } from "@/trpc/react";
import CardProduct from "../product/card-product";
import { InfiniteScroll } from "@/components/ui/Infinite-scroll";
import { Loader2 } from "lucide-react";

interface Props {
  category?: string;
  slug?: string;
}

export default function RecomendInfinite(props: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = api.product.recommend.useInfiniteQuery(
    {
      take: 6,
      slug: props.slug,
      category: props.category,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: true, // Refetch when window is focused
    },
  );

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.products) ?? [],
    [data],
  );

  switch (status) {
    case "pending":
      return <LoadingProduct />;
    case "error":
      return null;
    case "success":
      return (
        <React.Fragment>
          {products.length < 1 ? null : (
            <InfiniteScroll
              onBottomReached={() =>
                hasNextPage && !isFetching && fetchNextPage()
              }
              className="flex flex-col gap-2"
            >
              <h3 className="font-bold ~text-lg/2xl">
                Recommendations Product
              </h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
                {products.map((product) => (
                  <CardProduct key={product.id} product={product} />
                ))}
              </div>
              {isFetchingNextPage && (
                <Loader2 className="mx-auto my-3 animate-spin" />
              )}
            </InfiniteScroll>
          )}
        </React.Fragment>
      );
  }
}
