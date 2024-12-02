"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { LoadingButton } from "../button/loading-button";
import { XIcon } from "lucide-react";
import { Stars } from "../rating/select-rating";

export default function FilterInstalled() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get all filter parameters
  const filters = {
    q: searchParams?.get("q"),
    category: searchParams?.get("category"),
    subcategory: searchParams?.get("subcategory"),
    min: searchParams?.get("min"),
    max: searchParams?.get("max"),
    size: searchParams?.get("size"),
    discount: searchParams?.get("discount"),
    rating: searchParams?.get("rating"),
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);
  const formatLabel = (key: string, value: string | null) => {
    if (!value) return "";
    if (key === "min" || key === "max") {
      return `${key === "min" ? "Min" : "Max"} $${value}`;
    }

    if (key === "discount") {
      return `> ${value}% off`;
    }

    if (key === "rating") {
      return <Stars count={Number(value)} />;
    }
    return value;
  };

  if (!hasActiveFilters) return null;

  const handleRemoveall = () => {
    router.push(pathname ?? "");
  };

  // Remove a specific filter
  const removeFilter = (key: string) => {
    const current = new URLSearchParams(
      Array.from(searchParams?.entries() ?? []),
    );
    current.delete(key);
    const queryString = current.toString();
    const path = queryString ? pathname + "?" + queryString : (pathname ?? "");
    router.push(path);
  };

  return (
    <section className="rounded-b-2xl border-b p-4 shadow-lg dark:shadow-accent/50">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">Filter installed</p>
        <LoadingButton variant="link" onClick={handleRemoveall}>
          Remove all
        </LoadingButton>
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {Object.entries(filters).map(([key, value]) => {
          if (!value) return null;
          return (
            <LoadingButton
              key={key}
              variant="secondary"
              size="sm"
              onClick={() => removeFilter(key)}
              className="capitalize"
              endContent={<XIcon className="size-4" />}
            >
              {formatLabel(key, value)}
            </LoadingButton>
          );
        })}
      </div>
    </section>
  );
}
