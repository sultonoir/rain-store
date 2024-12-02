"use client";
import { Section } from "@/components/ui/section";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FilterDiscount() {
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

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const disocuntParams = searchParams?.get("discount");

  const handleDiscount = (value: string) => {
    const queryParams = new URLSearchParams(searchParams?.toString());
    queryParams.set("discount", value);
    const path = `${pathname}?${queryParams.toString()}`;
    return router.push(path);
  };

  return (
    <Section>
      <p className="text-sm font-bold">Dicount</p>
      <ToggleGroup
        value={disocuntParams ?? ""}
        onValueChange={handleDiscount}
        variant="outline"
        type="single"
        className="flex-wrap justify-between"
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
