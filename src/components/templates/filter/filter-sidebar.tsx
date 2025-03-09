import { cn } from "@/lib/utils";
import React from "react";
import FilterInstalled from "./filter-installed";
import { FilterCategory } from "./filter-category";
import { FilterPrice } from "./filter-price";
import { FilterDiscount } from "./filter-discount";
import { FilterRating } from "./filter-rating";

type Props = React.HTMLAttributes<HTMLElement>;

export default function FilterSidebar({ className, ...props }: Props) {
  return (
    <aside
      {...props}
      className={cn(
        "hidden w-80 flex-shrink-0 flex-col gap-2 lg:flex",
        className,
      )}
    >
      <FilterInstalled />
      <FilterCategory />
      <FilterPrice />
      <FilterDiscount />
      <FilterRating />
    </aside>
  );
}
