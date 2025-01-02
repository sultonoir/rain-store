"use client";
import React, { useMemo, useState } from "react";
import ratings from "@/lib/rating.json";
import { PaginationState } from "@/components/ui/pagination-state";
import { ReviewStats } from "./review-stats";
import { ReviewCard } from "./review-card";

export default function ProductRating() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const getDataReviews = useMemo(() => {
    const totalPages = Math.ceil(ratings.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return {
      currentReviews: ratings.slice(startIndex, endIndex),
      totalPages,
    };
  }, [currentPage]);

  const { currentReviews, totalPages } = getDataReviews;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="reviews" className="min-h-screen scroll-mt-28 bg-background">
      <div className="relative w-full p-8">
        <h1 className="mb-8 text-4xl font-bold">Customer Reviews</h1>
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="mb-8 w-full flex-none lg:max-w-sm">
            <ReviewStats reviews={ratings} />
          </div>
          <div className="mb-8 grid w-full gap-6 md:grid-cols-1">
            {currentReviews.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                value={review.value}
                message={review.message}
              />
            ))}
          </div>
        </div>
        <PaginationState
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          siblingsCount={1}
        />
      </div>
    </div>
  );
}
