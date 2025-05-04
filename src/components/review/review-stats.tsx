import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import React from "react";
import { Progress } from "../ui/progress";
import type { RatingStatistics } from "@prisma/client";

interface ReviewStatsProps {
  average: number;
  count: number;
  stats: RatingStatistics[];
}

const ReviewStats = ({ average, count, stats }: ReviewStatsProps) => {
  const allRatings = [1, 2, 3, 4, 5];

  // Ubah array stats jadi map agar mudah diakses
  const ratingMap = new Map(stats.map((r) => [r.ratingValue, r.ratingCount]));

  // Buat array final lengkap 1–5
  const completeStats = allRatings
    .map((value) => ({
      ratingValue: value,
      ratingCount: ratingMap.get(value) ?? 0,
    }))
    .reverse();

  return (
    <div className="order-1 mb-8 w-full flex-none lg:order-2 lg:max-w-sm">
      <div className="bg-card rounded-lg border p-6 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-4 lg:flex-row">
          <div className="text-center">
            <div className="text-4xl font-bold">{average.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.round(average) ? "fill-current" : "fill-muted",
                  )}
                />
              ))}
            </div>
            <div className="text-muted-foreground mt-1 text-sm">
              {count} reviews
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col gap-2">
            {completeStats.map((rating, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="min-w-[60px] flex-shrink-0 text-sm whitespace-nowrap">
                  {rating.ratingValue} stars
                </div>
                <Progress
                  value={(rating.ratingCount / count) * 100}
                  className="w-full flex-grow"
                  aria-label="rating percentage"
                />
                <div className="text-muted-foreground min-w-[30px] flex-shrink-0 text-right text-sm whitespace-nowrap">
                  {rating.ratingCount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStats;
