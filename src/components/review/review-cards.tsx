"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { fromNow } from "@/lib/from-now";
import { blurhashToDataUri } from "@unpic/placeholder";
import PaginationState from "../ui/pagination-state";

const ReviewCards = ({
  slug,
  totalPages,
}: {
  slug: string;
  totalPages: number;
}) => {
  const [cursor, setCursor] = useState(1);
  const [data] = api.rating.getbyslug.useSuspenseQuery({
    slug,
    limit: 4,
    cursor,
  });

  return (
    <div className="order-2 mb-8 flex w-full flex-col gap-10 lg:order-1">
      <div className="grid w-full gap-1 divide-y md:grid-cols-1">
        {data.ratings.map((result) => (
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
        onPageChange={(page) => setCursor(page)}
      />
    </div>
  );
};

export default ReviewCards;
