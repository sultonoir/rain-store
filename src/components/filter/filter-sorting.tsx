"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ArrowDown01,
  ArrowDown10,
  ChevronsUpDown,
  Flame,
  Repeat,
  Sparkles,
  Star,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function FilterSorting() {
  const [sort, setSort] = React.useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSort = (value: string) => {
    const queryParams = new URLSearchParams(searchParams?.toString());
    setSort(value);
    queryParams.set("sort", value);
    const path = `${pathname}?${queryParams.toString()}`;
    return router.push(path);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" role="combobox" className="size-10 lg:w-56">
          <Repeat className="size-6 rotate-90 lg:hidden" />
          <div className="hidden w-full lg:flex lg:items-center lg:justify-between">
            {sort
              ? sortOptions.find((s) => s.value === sort)?.label
              : "Sorting"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sorting</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
          {sortOptions.map((item) => (
            <DropdownMenuRadioItem
              key={item.value}
              value={item.value}
              className="gap-2"
            >
              {item.icon}
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const sortOptions = [
  {
    value: "most-rated",
    label: "Most rated",
    icon: <Star className="text-amber-500" />,
  },
  {
    value: "hot-sale",
    label: "Hot sale",
    icon: <Flame className="text-red-500" />,
  },
  {
    value: "latest",
    label: "Latest",
    icon: <Sparkles className="text-amber-500" />,
  },
  {
    value: "lowest-price",
    label: "Lowest price to high",
    icon: <ArrowDown01 />,
  },
  {
    value: "high-price",
    label: "High price to low",
    icon: <ArrowDown10 />,
  },
] as const;

export default FilterSorting;
