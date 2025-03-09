"use client";

import React, { useState } from "react";
import { type ReviewerProps } from "@/types";
import { cn } from "@/lib/utils";
import { ReviewCard } from "./reviewer-card";
import { ReviewStats } from "./reviewer-stats";
import { PaginationState } from "@/components/ui/pagination-state";
import { api } from "@/trpc/react";

interface Props {
  slug: string;
  initialData: ReviewerProps;
}

export const ReviewerSection = ({ slug, initialData }: Props) => {
  const [ratingData, setRatingData] = useState<ReviewerProps | null>(
    initialData,
  );

  const { mutate } = api.reviews.postBySlug.useMutation({
    onSuccess: (data) => {
      setRatingData(data);
      document
        .getElementById("reviews")
        ?.scrollIntoView({ behavior: "smooth" });
    },
  });

  // Handle pagination change
  const handlePageChange = (page: number) => {
    mutate({ slug, page });
  };

  if (!ratingData) return null;

  return (
    <div id="reviews" className={cn("scroll-mt-28 bg-background")}>
      <div className="relative flex size-full min-h-[500px] flex-col">
        <h1 className="mb-8 text-4xl font-bold">Customer Reviews</h1>
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Review Stats */}
          <div className="order-1 mb-8 w-full flex-none lg:order-2 lg:max-w-sm">
            <ReviewStats {...ratingData.stats} />
          </div>
          {/* Review List */}
          <div className="order-2 mb-8 grid w-full gap-1 divide-y md:grid-cols-1 lg:order-1">
            {ratingData.ratings.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.user.name}
                value={review.value}
                image={review.user.image}
                message={review.message}
                createdAt={review.createdAt}
              />
            ))}
          </div>
        </div>
        {/* Pagination */}
        <div className="mt-auto">
          <PaginationState
            currentPage={ratingData.pagination.current}
            totalPages={ratingData.pagination.pages}
            onPageChange={handlePageChange}
            siblingsCount={1}
          />
        </div>
      </div>
    </div>
  );
};
