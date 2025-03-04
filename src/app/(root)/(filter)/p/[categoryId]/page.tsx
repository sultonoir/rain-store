import SearchProductPage from "@/components/templates/search/search-product-page";
import { capitalizeWords } from "@/lib/capitalize";
import { type PageDynamic } from "@/types";
import { type Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: PageDynamic): Promise<Metadata> {
  const { categoryId } = await params;
  const title = categoryId ?? "";
  const titleCapital = capitalizeWords(title);
  return {
    title: titleCapital,
  };
}

const Page = async (props: PageDynamic) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { categoryId, itemId } = params;

  const title = categoryId ?? "";
  return (
    <SearchProductPage
      params={{ categoryId, itemId }}
      searchParams={searchParams}
      title={title}
    />
  );
};

export default Page;
