"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { SlidersHorizontal } from "lucide-react";
import { FilterPrice } from "./filter-price";
import useFilter from "@/hooks/use-filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Section } from "@/components/ui/section";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SelectRating } from "../rating/select-rating";

export function FilterMobile() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { filter, setFilterOpen, filterOpen, setFilterValue } = useFilter();

  const handleSubmit = () => {
    const queryParams = new URLSearchParams(searchParams?.toString());
    queryParams.set("min", String(filter.min));
    queryParams.set("max", String(filter.max));
    queryParams.set("discount", String(filter.discount));
    queryParams.set("rating", String(filter.rating));
    const path = `${pathname}?${queryParams.toString()}`;
    setFilterOpen();
    router.replace(path);
  };

  const handleReset = () => {
    setFilterValue({
      min: 0,
      max: 0,
      discount: 0,
      rating: 0,
      subcategory: "",
    });
    const queryParams = new URLSearchParams(searchParams?.toString());
    queryParams.delete("min");
    queryParams.delete("max");
    queryParams.delete("discount");
    queryParams.delete("rating");
    const path = `${pathname}?${queryParams.toString()}`;
    setFilterOpen();
    router.replace(path);
  };

  return (
    <Drawer open={filterOpen} onOpenChange={setFilterOpen}>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="mx-auto max-w-md space-y-4 p-4">
          <FilterPrice />
          <FilterDiscount />
          <FilterRating />
        </div>
        <DrawerFooter className="mx-auto w-full max-w-md">
          <Button onClick={handleSubmit}>Submit</Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function FilterMobileButton() {
  const { setFilterOpen } = useFilter();
  return (
    <Button className="gap-2 lg:hidden" onClick={setFilterOpen} size="sm">
      <SlidersHorizontal className="size-4" />
      Filter
    </Button>
  );
}

function FilterDiscount() {
  const discount = [
    {
      value: 20,
      label: "> 20% off",
    },
    {
      value: 30,
      label: "> 30% off",
    },
    {
      value: 40,
      label: "> 40% off",
    },
    {
      value: 50,
      label: "> 50% off",
    },
    {
      value: 60,
      label: "> 60% off",
    },
    {
      value: 80,
      label: "> 80% off",
    },
  ];

  const { filter, setFilterValue } = useFilter();

  const handleDiscount = (value: string) => {
    setFilterValue({ discount: Number(value) });
  };

  return (
    <Section>
      <p className="text-sm font-bold">Dicount</p>
      <ToggleGroup
        value={String(filter.discount)}
        onValueChange={handleDiscount}
        variant="outline"
        type="single"
        className="flex-wrap justify-start gap-3"
      >
        {discount.map((item) => (
          <ToggleGroupItem
            value={String(item.value)}
            key={item.value}
            className="capitalize"
          >
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Section>
  );
}

function FilterRating() {
  const ratingOptions = [
    { stars: 5, count: 5168 },
    { stars: 4, count: 4726 },
    { stars: 3, count: 3234 },
    { stars: 2, count: 1842 },
    { stars: 1, count: 452 },
  ];
  const { filter, setFilterValue } = useFilter();

  const handleRating = (value: string) => {
    setFilterValue({ rating: Number(value) });
  };
  return (
    <Section>
      <p>Rating</p>
      <SelectRating
        options={ratingOptions}
        value={String(filter.rating)}
        handleRating={handleRating}
      />
    </Section>
  );
}
