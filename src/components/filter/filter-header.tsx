"use client";

import React, { Suspense } from "react";
import FilterSorting from "./filter-sorting";
import dynamic from "next/dynamic";

interface FilterHeaderProps {
  title?: string;
  count: number;
  found: boolean;
}

const FilterMobileButton = dynamic(
  () => import("@/components/filter/filter-mobile-button"),
  {
    ssr: false,
  },
);

export default function FilterHeader({
  title,
  count,
  found,
}: FilterHeaderProps) {
  return (
    <section className="flex w-full min-w-0 flex-col items-center justify-between gap-3 lg:flex-row lg:gap-5">
      <div className="flex flex-col items-center gap-2 lg:flex-row lg:items-start lg:gap-4">
        {found ? (
          <>
            {title ? (
              <h1 className="text-base capitalize md:text-lg lg:text-2xl lg:leading-9">
                Search for <span className="font-bold">{`" ${title} "`}</span>
              </h1>
            ) : (
              <h1 className="text-base capitalize md:text-lg lg:text-2xl lg:leading-9">
                All Products
              </h1>
            )}
          </>
        ) : (
          <h1 className="~text-base/2xl inline-flex flex-col leading-normal capitalize">
            <span>
              No items found for <b>{`" ${title} "`}</b>
            </span>
            <span>
              <b>You may be interested in:</b>
            </span>
          </h1>
        )}
        <p className="text-muted-foreground text-sm whitespace-nowrap md:text-sm lg:mt-1 lg:text-base lg:leading-9">
          {count} Products
        </p>
      </div>
      <div className="flex items-center justify-end gap-2 self-end">
        <FilterMobileButton />
        <Suspense>
          <FilterSorting />
        </Suspense>
      </div>
    </section>
  );
}
