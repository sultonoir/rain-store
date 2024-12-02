"use client";

import { SortCombobox } from "@/components/ui/sort-combobox";
import React from "react";
import { FilterMobileButton } from "./filter-mobile";

interface FilterHeaderProps {
  title?: string;
  count: number;
}

export default function FilterHeader({ title, count }: FilterHeaderProps) {
  return (
    <section className="flex w-full min-w-0 items-center justify-between">
      <div className="inline-flex items-center gap-2">
        {title ? (
          <h2 className="text-base capitalize leading-9 md:text-lg lg:text-2xl">
            Search for <span className="font-bold">{`" ${title} "`}</span>
          </h2>
        ) : (
          <h2 className="text-base capitalize leading-9 md:text-lg lg:text-2xl">
            All Products
          </h2>
        )}
        <p className="whitespace-nowrap text-sm leading-9 text-muted-foreground md:text-sm lg:mt-1 lg:text-base">
          {count} items
        </p>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        <FilterMobileButton />
        <SortCombobox />
      </div>
    </section>
  );
}
