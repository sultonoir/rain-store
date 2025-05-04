"use client";
import { cn } from "@/lib/utils";
import React from "react";
import FilterInstalled from "./filter-installed";
import FilterCategory from "./filter-category";
import FilterPrice from "./filter-price";
import FilterDiscount from "./filter-discount";
import FilterRating from "./filter-rating";
import { useParams } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";

type Props = React.HTMLAttributes<HTMLElement>;

export default function FilterSidebar({ className }: Props) {
  const { product } = useParams<{ product: string }>();

  if (product) return null;

  return (
    <Sidebar
      collapsible="none"
      className={cn(
        "bg-card dark:bg-sidebar m-2 hidden flex-none shrink-0 rounded-xl border md:flex",
        className,
      )}
      variant="floating"
    >
      <SidebarContent>
        <FilterInstalled />
        <FilterCategory />
        <SidebarSeparator className="mx-0" />
        <FilterPrice />
        <SidebarSeparator className="mx-0" />
        <FilterDiscount />
        <SidebarSeparator className="mx-0" />
        <FilterRating />
      </SidebarContent>
    </Sidebar>
  );
}
