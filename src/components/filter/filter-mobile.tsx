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
import { Star } from "lucide-react";
import FilterPrice from "./filter-price";
import { useFilter } from "@/hooks/use-filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function FilterMobile() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { filter, setFilterOpen, filterOpen, setFilterValue } = useFilter();

  const handleSubmit = () => {
    const queryParams = new URLSearchParams(searchParams?.toString());
    if (filter.min > 0) {
      queryParams.set("min", String(filter.min));
    }
    if (filter.max > 0) {
      queryParams.set("max", String(filter.max));
    }
    if (filter.discount > 0) {
      queryParams.set("discount", String(filter.discount));
    }
    if (filter.rating) {
      queryParams.set("rating", String(filter.rating));
    }
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
    queryParams.delete("name");
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
    <div className="space-y-3">
      <p className="text-sm font-bold">Dicount</p>
      <div className="grid grid-cols-3 gap-2">
        {discount.map((item) => (
          <Button
            key={item.label}
            variant={filter.discount === item.value ? "glow" : "outline"}
            onClick={() => handleDiscount(item.value.toString())}
            className="w-full"
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function FilterRating() {
  const { filter, setFilterValue } = useFilter();

  const handleToggleRating = (value: number) => {
    // Jika rating sekarang sudah sama dengan value, artinya user ingin meng-uncheck (hapus filter)
    if (filter.rating === value) {
      setFilterValue({ rating: undefined }); // atau null, tergantung skema
    } else {
      setFilterValue({ rating: value });
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-bold">Rating</p>
      <div className="flex items-center gap-2">
        <Checkbox
          id="rating-mobile"
          checked={filter.rating === 4}
          onCheckedChange={() => handleToggleRating(4)}
          className="size-5"
        />
        <Label
          htmlFor="rating-mobile"
          className="inline-flex items-center gap-1"
        >
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
          rating of more than 4
        </Label>
      </div>
    </div>
  );
}
