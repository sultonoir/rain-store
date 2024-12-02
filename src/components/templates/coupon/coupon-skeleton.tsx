import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {
  count?: number;
}

export default function CouponSkeleton({ count = 10 }: Props) {
  return (
    <React.Fragment>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          className="w-full space-y-2 bg-white p-2 dark:bg-[#0a0a0a]"
          key={i}
        >
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-10 w-[250px]" />
        </Skeleton>
      ))}
    </React.Fragment>
  );
}
