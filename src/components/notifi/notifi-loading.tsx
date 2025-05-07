import React from "react";
import { Skeleton } from "../ui/skeleton";

const NotifiLoading = ({ count = 12 }: { count?: number }) => {
  return (
    <div className="grid divide-y">
      {Array.from({ length: count }).map((_, index) => (
        <div className="space-y-2 p-2" key={index}>
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      ))}
    </div>
  );
};

export default NotifiLoading;
