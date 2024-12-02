import CategoryCard from "@/components/templates/category/category-card";
import SizeCard from "@/components/templates/size/size-card";
import SubCategoryCard from "@/components/templates/subcategory/subcategory-card";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Generate Form",
};

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
      <CategoryCard />
      <SubCategoryCard />
      <SizeCard />
    </div>
  );
}
