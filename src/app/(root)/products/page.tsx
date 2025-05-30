import FilterPage from "@/components/filter/filter-page";
import ProductLoading from "@/components/product/product-loading";
import { PageDynamic } from "@/types";
import { Metadata } from "next";
import React, { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: PageDynamic): Promise<Metadata> {
  const { q } = await searchParams;
  const title = q ?? "All Products";

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
  return (
    <Suspense fallback={<ProductLoading className="p-5 xl:grid-cols-4" />}>
      <FilterPage params={params} title={""} searchParams={searchParams} />
    </Suspense>
  );
};

export default Page;
