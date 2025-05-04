"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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
    <SidebarGroup className="pt-0">
      <SidebarGroupLabel className="text-sm font-bold">
        Dicount
      </SidebarGroupLabel>
      <SidebarMenu className="grid grid-cols-3 gap-2">
        {discount.map((dis) => (
          <SidebarMenuItem key={dis.label}>
            <Button
              variant={
                disocuntParams === dis.value.toString() ? "glow" : "outline"
              }
              onClick={() => handleDiscount(dis.value.toString())}
              className="w-full"
            >
              {dis.label}
            </Button>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default FilterDiscount;
