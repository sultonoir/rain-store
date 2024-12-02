import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ReviewStatsProps {
  reviews: Array<{ value: number }>;
}

export function ReviewStats({ reviews }: ReviewStatsProps) {
  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((acc, review) => acc + review.value, 0) / totalReviews;

  const ratingCounts = Array.from({ length: 5 }, (_, i) => {
    const count = reviews.filter((review) => review.value === i + 1).length;
    return {
      stars: i + 1,
      count,
      percentage: (count / totalReviews) * 100,
    };
  }).reverse();

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col items-center gap-4 lg:flex-row">
        <div className="text-center">
          <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
          <div className="flex items-center justify-center gap-1 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.round(averageRating) ? "fill-current" : "fill-muted",
                )}
              />
            ))}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {totalReviews} reviews
          </div>
        </div>
        <div className="flex w-full flex-1 flex-col gap-2">
          {ratingCounts.map((rating) => (
            <div key={rating.stars} className="flex gap-2">
              <div className="min-w-[60px] flex-shrink-0 whitespace-nowrap text-sm">
                {rating.stars} stars
              </div>
              <Progress
                value={rating.percentage}
                className="w-full flex-grow"
              />
              <div className="min-w-[30px] flex-shrink-0 whitespace-nowrap text-right text-sm text-muted-foreground">
                {rating.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
