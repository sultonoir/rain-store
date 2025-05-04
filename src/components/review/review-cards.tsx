"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { fromNow } from "@/lib/from-now";
import { blurhashToDataUri } from "@unpic/placeholder";
import PaginationState from "../ui/pagination-state";
import { RatingWithuser } from "@/types";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  slug: string;
  totalPages: number;
  initialData: RatingWithuser[];
};

const ReviewCards = ({ slug, totalPages, initialData }: Props) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [ratings, setRatings] = useState(initialData);
  const [cursor, setCursor] = useState(1);

  const handlePageChange = async (page: number) => {
    const pathname = `/api/ratings/${slug}?page=${page}`;
    try {
      setIsPending(true);
      router.prefetch(pathname);
      const response = await fetch(pathname);

      if (!response.ok) {
        return [];
      }
      const data = (await response.json()) as RatingWithuser[];
      setRatings(data);
      setCursor(page);
    } catch (e) {
      setIsPending(false);
      console.log("Failed to load ratings", e);
      setCursor(page);
      setRatings([]);
    } finally {
      setIsPending(false);
    }
  };

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
        paginationItemsToDisplay={isMobile ? 5 : 7}
      />
    </div>
  );
};

export default ReviewCards;
