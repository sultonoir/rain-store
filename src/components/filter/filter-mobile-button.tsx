"use client";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { useFilter } from "@/hooks/use-filter";

export default function FilterMobileButton() {
  const { setFilterOpen } = useFilter();
  return (
    <Button className="gap-2 lg:hidden" onClick={setFilterOpen} size="sm">
      <SlidersHorizontal className="size-4" />
      Filter
    </Button>
  );
}
