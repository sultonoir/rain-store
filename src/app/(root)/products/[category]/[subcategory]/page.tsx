import FilterPage from "@/components/filter/filter-page";
import ProductLoading from "@/components/product/product-loading";
import { convertSlug } from "@/lib/covert-slug";
import { PageDynamic } from "@/types";
import { Metadata } from "next";
import React, { Suspense } from "react";

export async function generateMetadata({
  params,
}: PageDynamic): Promise<Metadata> {
  const { subcategory } = await params;
  const title = convertSlug(subcategory);

  return {
    title,
  };
}

const Page = async ({
  params: PromiseParams,
  searchParams: PromiseSearchparams,
}: PageDynamic) => {
  const params = await PromiseParams;
  const searchParams = await PromiseSearchparams;
  const title = convertSlug(params.subcategory);
  return (
    <Suspense fallback={<ProductLoading className="p-5 xl:grid-cols-4" />}>
      <FilterPage params={params} title={title} searchParams={searchParams} />
    </Suspense>
  );
};

export default Page;
