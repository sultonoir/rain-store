"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { stringToPathname } from "@/lib/pathname";
import subcategoryData from "@/lib/subcategory";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function FilterSubcategory() {
  const pathname = usePathname();
  const router = useRouter();

  const pathSegments = pathname?.split("/").slice(1) ?? [];
  const currentCategory = pathSegments.at(1);

  // Filter subcategories based on the current category
  const filteredSubcategories = React.useMemo(() => {
    return currentCategory
      ? subcategoryData.filter((item) => item.category === currentCategory)
      : subcategoryData;
  }, [currentCategory]);

  // Handle navigation when a subcategory is selected
  const handleSubcategorySelection = (subcategoryName: string) => {
    router.push(`/p/${currentCategory}/${stringToPathname(subcategoryName)}`);
  };

  if (pathname === "/search") return null;
  return (
    <section className="space-y-2 rounded-b-2xl border-b p-4 shadow-lg dark:shadow-accent/50">
      <p className="text-sm font-bold">Subcategories</p>
      <div className="flex min-w-0 translate-x-px flex-col gap-1 py-0.5">
        {filteredSubcategories.map((subcategory) => (
          <SubcategoryItem
            key={subcategory.id}
            subcategory={subcategory}
            isSelected={pathSegments.includes(
              stringToPathname(subcategory.name),
            )}
            onSelection={handleSubcategorySelection}
          />
        ))}
      </div>
    </section>
  );
}

// Component for individual subcategory items
type SubcategoryItemProps = {
  subcategory: { id: string; name: string };
  isSelected: boolean;
  onSelection: (name: string) => void;
};

const SubcategoryItem: React.FC<SubcategoryItemProps> = ({
  subcategory,
  isSelected,
  onSelection,
}) => {
  return (
    <div className="flex items-center justify-between">
      <Label
        htmlFor={subcategory.id}
        className="w-full text-sm font-normal capitalize"
      >
        {subcategory.name}
      </Label>
      <Checkbox
        id={subcategory.id}
        className="size-5"
        checked={isSelected}
        onCheckedChange={() => onSelection(subcategory.name)}
      />
    </div>
  );
};
