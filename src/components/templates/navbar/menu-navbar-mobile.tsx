"use client";
import { categories } from "@/lib/constants";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterMobileButton } from "../filter/filter-mobile";
import { SortCombobox } from "@/components/ui/sort-combobox";
import { useShow } from "@/hooks/use-show";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function MenuNavbarMobile({ className }: Props) {
  const [open, setOpen] = useState(false);
  const show = useShow();
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className={cn("gap-2", className)}
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
          Categories
        </Button>
        <div
          className={cn("flex items-center gap-2", {
            hidden: show,
          })}
        >
          <FilterMobileButton />
          <SortCombobox />
        </div>
      </div>
      <DrawerContent>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <FilterCategory onClose={() => setOpen(false)} />
      </DrawerContent>
    </Drawer>
  );
}

interface FilterCategoryProps {
  onClose: () => void;
}

function FilterCategory({ onClose }: FilterCategoryProps) {
  return (
    <div className="my-2 flex max-h-[calc(100dvh-500px)] flex-col space-y-2 overflow-auto p-4">
      {categories.map((item) => (
        <div key={item.id} className="flex w-full flex-col">
          <Link
            href={`/p/${item.name}`}
            className="inline-flex w-full rounded-lg px-3 py-1 text-sm font-semibold capitalize hover:bg-accent"
            onClick={onClose}
          >
            {item.name}
          </Link>
          {item.subcategories.map((subitem) => (
            <Link
              href={`/p/${item.name}/${subitem.name}`}
              className="mx-3.5 rounded-lg px-2.5 py-1 text-sm capitalize leading-normal hover:bg-accent"
              onClick={onClose}
              key={subitem.id}
            >
              {subitem.name}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
