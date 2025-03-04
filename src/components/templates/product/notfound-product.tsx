import React from "react";

export function NotFoundProduct({ titile }: { titile: string }) {
  return (
    <div className="flex size-full flex-col gap-4">
      <div className="flex h-full flex-col items-center">
        <p className="text-muted-foreground">
          No items found for <b>{titile}</b>
        </p>
        <p className="text-muted-foreground">
          <b>You may be interested in:</b>
        </p>
      </div>
    </div>
  );
}
