import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {
  count?: number;
}

export default function NotifiSkeleton({ count = 10 }: Props) {
  return (
    <React.Fragment>
      {Array.from({ length: count }).map((_, i) => (
        <div className="flex items-center space-x-4" key={i}>
          <Skeleton className="size-12 flex-shrink-0 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}
