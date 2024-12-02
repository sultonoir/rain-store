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
  RiFireLine,
  RiSortNumberAsc,
  RiSortNumberDesc,
  RiStarFill,
} from "@remixicon/react";
import { ChevronsUpDown, Sparkles } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SortCombobox() {
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
        <Button
          variant="outline"
          role="combobox"
          size="sm"
          className="justify-between md:w-56"
        >
          {sort ? sortOptions.find((s) => s.value === sort)?.label : "Sorting"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
    value: "hot-sale",
    label: "Hot sales",
    icon: <RiFireLine className="fill-red-500" />,
  },
  {
    value: "most-rating",
    label: "Most rating",
    icon: <RiStarFill className="text-amber-500" />,
  },
  {
    value: "latest",
    label: "Latest",
    icon: <Sparkles className="text-amber-500" />,
  },
  {
    value: "lowest-price",
    label: "Lowest price to high",
    icon: <RiSortNumberAsc />,
  },
  {
    value: "high-price",
    label: "High price to low",
    icon: <RiSortNumberDesc />,
  },
] as const;
