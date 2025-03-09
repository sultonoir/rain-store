"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { categories } from "@/lib/constants";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Section } from "@/components/ui/section";
import { Checkbox } from "@/components/ui/checkbox";

export const FilterCategory = () => {
  const router = useRouter();
  const { itemId } = useParams();
  const [openCategoryId, setOpenCategoryId] = React.useState<string | null>(
    null,
  );

  const toggleCategory = (categoryId: string | null) => {
    setOpenCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <Section>
      <p className="text-sm font-bold">Categories</p>
      <div className="flex flex-col divide-y">
        {categories.map((item) => (
          <Collapsible
            key={item.id}
            open={openCategoryId === item.id}
            onOpenChange={(open) => toggleCategory(open ? item.id : null)}
            className="group/collapsible"
          >
            <div className="my-2 flex items-center justify-between">
              <Link
                prefetch
                href={`/collections/${item.name}`}
                className="capitalize"
              >
                {item.name}
              </Link>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="my-2">
              <div className="flex min-w-0 translate-x-px flex-col gap-1 px-2.5 py-0.5">
                {item.subcategories.map((subItem) => (
                  <div
                    className="flex items-center justify-between"
                    key={subItem.id}
                  >
                    <Link
                      prefetch
                      href={`/collections/${item.name}/${subItem.name}`}
                      className="w-full text-sm font-normal capitalize"
                    >
                      {subItem.name}
                    </Link>
                    <Checkbox
                      className="size-5"
                      checked={
                        decodeURIComponent(itemId as string) === subItem.name
                      }
                      onCheckedChange={() =>
                        router.push(`/collections/${item.name}/${subItem.name}`)
                      }
                    />
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </Section>
  );
};
