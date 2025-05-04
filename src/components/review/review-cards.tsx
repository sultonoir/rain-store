"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { fromNow } from "@/lib/from-now";
import { blurhashToDataUri } from "@unpic/placeholder";
import PaginationState from "../ui/pagination-state";
import { RatingWithuser } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  slug: string;
  totalPages: number;
  initialData: RatingWithuser[];
};

const ReviewCards = ({ slug, totalPages, initialData }: Props) => {
  const isMobile = useIsMobile();
  const [isPending, setIsPending] = useState(false);
  const [ratings, setRatings] = useState(initialData);
  const [cursor, setCursor] = useState(1);
  const [cache, setCache] = useState<Record<number, RatingWithuser[]>>({
    1: initialData,
  });

  const handlePageChange = useCallback(
    async (page: number) => {
      if (page === cursor) return;

      setCursor(page);

      if (cache[page]) {
        // gunakan cache jika sudah tersedia
        setRatings(cache[page]);
        return;
      }

      try {
        setIsPending(true);
        const res = await fetch(`/api/ratings/${slug}?page=${page}`);
        if (!res.ok) throw new Error("Failed to fetch ratings");

        const data = (await res.json()) as RatingWithuser[];

        setRatings(data);
        setCache((prev) => ({ ...prev, [page]: data }));
      } catch (err) {
        console.error("Error loading ratings", err);
        setRatings([]);
      } finally {
        setIsPending(false);
      }
    },
    [cache, cursor, slug],
  );

  useEffect(() => {
    if (!cache[cursor]) {
      handlePageChange(cursor);
    }
  }, [cache, cursor, handlePageChange]);

  return (
    <div className="order-2 mb-8 flex w-full flex-col gap-10 lg:order-1">
      <div
        className={cn("grid w-full gap-1 divide-y md:grid-cols-1", {
          "opacity-75": isPending,
        })}
      >
        {ratings.map((result) => (
          <div
            key={result.id}
            className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0"
          >
            <Image
              src={result.user?.image ?? "/avatar.png"}
              alt="avatar"
              width={40}
              height={40}
              placeholder="blur"
              blurDataURL={blurhashToDataUri(result.user.imageBlur)}
              className="relative size-10 flex-shrink-0 overflow-hidden rounded-full"
            />
            <div className="flex flex-grow flex-col gap-1">
              <p className="text-lg font-semibold">
                {result.user?.name}
                <span className="text-muted-foreground ml-2 text-sm">
                  {fromNow(new Date(result.createdAt))}
                </span>
              </p>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={cn(
                      "size-4",
                      index < result.value
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted",
                    )}
                  />
                ))}
              </div>
              <p className="text-muted-foreground">{result.message}</p>
            </div>
          </div>
        ))}
      </div>

      <PaginationState
        totalPages={Math.ceil(totalPages / 4)}
        currentPage={cursor}
        onPageChange={handlePageChange}
        isPending={isPending}
        paginationItemsToDisplay={isMobile ? 5 : 7}
      />
    </div>
  );
};

export default ReviewCards;
