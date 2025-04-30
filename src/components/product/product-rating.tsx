import React from "react";
import { Star, Stars } from "lucide-react";

type Props = {
  rating: {
    average: number;
    count: number;
  };
  size?: number;
};

const ProductRating = ({ rating, size = 16 }: Props) => {
  return (
    <div className="flex items-center space-x-1.5">
      {rating.count > 0 ? (
        <>
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-muted-foreground">
              {rating.average % 1 === 0
                ? rating.average.toFixed(0)
                : rating.average.toFixed(1)}
            </span>
            <p className="text-sm font-medium text-muted-foreground">
              ({rating.count})
            </p>
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-1.5 text-sm">
          <Stars size={size} className="text-yellow-500" />
          <span>New</span>
        </div>
      )}
    </div>
  );
};

export default ProductRating;
