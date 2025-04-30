import React from "react";
import { Star, Stars } from "lucide-react";

type Props = {
  average: number;
  count: number;
  size?: number;
};

const ProductRating = ({ count, average, size = 16 }: Props) => {
  return (
    <div className="flex items-center space-x-1.5">
      {count > 0 ? (
        <>
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <span className="text-muted-foreground text-sm font-medium">
              {average % 1 === 0 ? average.toFixed(0) : average.toFixed(1)}
            </span>
            <p className="text-muted-foreground text-sm font-medium">
              ({count})
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
