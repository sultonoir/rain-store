import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  length?: number;
}

const ProductLoading = forwardRef<HTMLDivElement, Props>(
  ({ length = 12, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6",
          className,
        )}
      >
        {Array.from({ length }).map((_, index) => (
          <div
            className="flex flex-col space-y-3 rounded-2xl bg-muted/20 p-2"
            key={index}
          >
            <Skeleton className="h-[225px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-10" />
            </div>
          </div>
        ))}
      </div>
    );
  },
);

ProductLoading.displayName = "ProductLoading"; // Optional: Helps with debugging

export default ProductLoading;
