import React, { useMemo } from "react";
import LoadingProduct from "./loading-product";
import CardProduct from "./card-product";
import { api } from "@/trpc/react";
import { InfiniteScroll } from "@/components/ui/Infinite-scroll";
import { Loader2 } from "lucide-react";

export function NotFoundProduct({ titile }: { titile: string }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = api.product.recommend.useInfiniteQuery(
    {
      take: 10,
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
  return (
    <div className="flex size-full flex-col gap-4">
      <div className="flex h-full flex-col items-center">
        <p className="text-muted-foreground">
          No items found for <b>{titile}</b>
        </p>
        <p className="text-muted-foreground">
          <b>You may be interested in:</b>
        </p>
      </div>
      {(() => {
        switch (status) {
          case "pending":
            return (
              <LoadingProduct className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-4" />
            );
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
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
      })()}
    </div>
  );
}
