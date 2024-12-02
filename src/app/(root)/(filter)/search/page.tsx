import SearchProductPage from "@/components/templates/search/search-product-page";
import { type PageDynamic } from "@/types";
import { type Metadata } from "next";
import React from "react";

export async function generateMetadata({
  searchParams,
}: PageDynamic): Promise<Metadata> {
  const { q, category, subcategory } = await searchParams;

  // Logika untuk menentukan title dinamis
  const title = q ?? category ?? subcategory ?? "Search";
  return {
    title,
  };
}

const Page = async (props: PageDynamic) => {
  const searchParams = await props.searchParams;
  const { q, category, subcategory } = searchParams;

  // Logika untuk menentukan title dinamis
  const title = q ?? category ?? subcategory ?? "";
  return <SearchProductPage searchParams={searchParams} title={title} />;
};

export default Page;
