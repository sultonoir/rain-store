"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { categories } from "@/lib/constants";
import { ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingButton } from "../button/loading-button";

export default function FilterCategory() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = searchParams?.get("category");
  const subcategory = searchParams?.get("subcategory");
  const [openCategory, setOpenCategory] = useState(category);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    [],
  );

  useEffect(() => {
    // Initialize selected subcategories based on the query parameter
    if (subcategory) {
      setSelectedSubcategories([subcategory]);
    } else {
      setSelectedSubcategories([]);
    }
  }, [subcategory]);

  useEffect(() => {
    setOpenCategory(category);
  }, [category]);

  const addParams = (key: string) => {
    const current = new URLSearchParams(
      Array.from(searchParams?.entries() ?? []),
    );

    if (selectedSubcategories.includes(key)) {
      // Remove subcategory if it already exists
      selectedSubcategories.splice(selectedSubcategories.indexOf(key), 1);
      current.delete("subcategory");
    } else {
      // Add subcategory if it doesn't exist
      selectedSubcategories.push(key);
      current.set("subcategory", key);
    }

    const queryString = current.toString();
    const path = queryString ? pathname + "?" + queryString : (pathname ?? "");
    router.push(path);
    setSelectedSubcategories([...selectedSubcategories]); // Update state
  };

  const handleOpenChange = (itemName: string) => {
    setOpenCategory((prev) => (prev === itemName ? null : itemName));
  };

  if (pathname !== "/search") return null;

  return (
    <section className="space-y-2 rounded-b-2xl border-b p-4 shadow-lg dark:shadow-accent/50">
      <p className="text-sm font-bold">Categories</p>
      <div className="flex flex-col space-y-2 divide-y">
        {categories.map((item) => (
          <Collapsible
            key={item.id}
            open={item.name === openCategory}
            onOpenChange={() => handleOpenChange(item.name)}
            className="group/collapsible"
            asChild
          >
            <div>
              <CollapsibleTrigger asChild>
                <LoadingButton
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full justify-between capitalize"
                >
                  <span>{item.name}</span>
                  <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </LoadingButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="my-2">
                <div className="flex min-w-0 translate-x-px flex-col gap-1 px-2.5 py-0.5">
                  {item.subcategories.map((subItem) => (
                    <div
                      className="flex items-center justify-between"
                      key={subItem.id}
                    >
                      <Label
                        htmlFor={subItem.id}
                        className="w-full text-sm font-normal capitalize"
                      >
                        {subItem.name}
                      </Label>
                      <Checkbox
                        id={subItem.id}
                        className="size-5"
                        checked={selectedSubcategories.includes(subItem.name)}
                        onCheckedChange={() => addParams(subItem.name)}
                      />
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>
    </section>
  );
}
