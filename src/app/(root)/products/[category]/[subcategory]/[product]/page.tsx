import ProductCarousel from "@/components/product/product-carousel";
import ProductPage from "@/components/product/product-page";
import ReviewCards from "@/components/review/review-cards";
import ReviewStats from "@/components/review/review-stats";
import { api, HydrateClient } from "@/trpc/server";
import type { PageDynamic } from "@/types";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({ params }: PageDynamic) => {
  const { product: slug, category } = await params;

  const product = await api.product.slug({ slug });
  void api.rating.getbyslug.prefetch({ slug, limit: 4 });
  if (!product) {
    return notFound();
  }

  return (
    <div className="container space-y-10 py-5">
      <ProductPage data={product} />
      <div className="relative w-full">
        <h1 className="mb-8 text-4xl font-bold">Customer Reviews</h1>
        <div className="flex w-full flex-col gap-10 lg:flex-row">
          <ReviewStats
            average={product.ratingAverage}
            count={product.ratingCount}
            stats={product.ratingStatistics}
          />
          <HydrateClient>
            <ReviewCards slug={slug} totalPages={product.ratingCount} />
          </HydrateClient>
        </div>
      </div>
      <ProductCarousel category={category} />
    </div>
  );
};

export default Page;
