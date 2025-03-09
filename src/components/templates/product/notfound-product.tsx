import { type ProductCard } from "@/types";
import React from "react";
import CardProduct from "./card-product";

export function NotFoundProduct({
  title,
  recommend,
}: {
  title: string;
  recommend: ProductCard[];
}) {
  return (
    <div className="flex size-full flex-col gap-4">
      <div className="flex h-full flex-col items-center">
        <p className="text-muted-foreground">
          No items found for <b>{title}</b>
        </p>
        <p className="text-muted-foreground">
          <b>You may be interested in:</b>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {recommend.map((item) => (
          <CardProduct key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
