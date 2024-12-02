"use client";
import React, { useMemo, useState } from "react";
import ratings from "@/lib/rating.json";
import { PaginationState } from "@/components/ui/pagination-state";
import { ReviewStats } from "./review-stats";
import { ReviewCard } from "./review-card";
import { SelectRating } from "./select-rating";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

const ratingOptions = [
  { stars: 5 },
  { stars: 4 },
  { stars: 3 },
  { stars: 2 },
  { stars: 1 },
];

export default function ProductRating() {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewValue, setReviewValue] = useState("");
  const ITEMS_PER_PAGE = 10;

  const getDataReviews = useMemo(() => {
    const totalPages = Math.ceil(ratings.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    if (reviewValue !== "") {
      const currentReviews = ratings
        .filter((item) => item.value === parseInt(reviewValue))
        .slice(startIndex, endIndex);
      const filterLength = Math.ceil(currentReviews.length / ITEMS_PER_PAGE);
      return {
        currentReviews,
        totalPages: filterLength,
      };
    }
    return {
      currentReviews: ratings.slice(startIndex, endIndex),
      totalPages,
    };
  }, [currentPage, reviewValue]);

  const { currentReviews, totalPages } = getDataReviews;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="reviews" className="min-h-screen scroll-mt-28 bg-background">
      <div className="relative w-full p-8">
        <h1 className="mb-8 text-4xl font-bold">Customer Reviews</h1>

        {/* Review Statistics */}
        <div className="mb-8">
          <ReviewStats reviews={ratings} />
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          <Section className="top-[120px] h-fit space-y-3 rounded-2xl lg:sticky">
            <p className="whitespace-nowrap font-bold ~text-lg/2xl">
              Sort reviews
            </p>
            <SelectRating
              options={ratingOptions}
              value={reviewValue}
              handleRating={setReviewValue}
            />
            <Button
              size="icon"
              className="h-8 w-full"
              onClick={() => setReviewValue("")}
            >
              Reset
            </Button>
          </Section>
          {/* Reviews Grid */}
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

        {/* Pagination */}
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
