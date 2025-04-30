import HomeCategory from "@/components/home/home-category";
import HomeCallToAction from "@/components/home/home-cta";
import HomeFeatures from "@/components/home/home-features";
import HomePromotion from "@/components/home/home-promotion";
import ProductCarousel from "@/components/product/product-carousel";
import ProductLoading from "@/components/product/product-loading";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <main className="container mx-auto min-h-screen space-y-10 py-5">
      <HomePromotion />
      <Suspense fallback={<ProductLoading />}>
        <ProductCarousel sort="most-rated" />
      </Suspense>
      <HomeFeatures />
      <HomeCategory />
      <Suspense fallback={<ProductLoading />}>
        <ProductCarousel sort="hot-sale" />
      </Suspense>
      <HomeCallToAction />
    </main>
  );
};

export default Page;
