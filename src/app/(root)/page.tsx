import LoadingProduct from "@/components/templates/product/loading-product";
import EmailSubscription from "@/components/ui/email-subscription ";
import Flow from "@/components/ui/flow";
import HomeCategory from "@/components/ui/home-category";
import { HotSale } from "@/components/ui/hot-sale";
import Promo from "@/components/ui/promo";
import { api } from "@/trpc/server";
import { type Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
};

const Page = async () => {
  const promo = await api.promo.get();
  return (
    <main className="container relative z-0 min-h-screen py-5">
      <Promo hero={promo} />
      <section className="my-10 flex flex-col justify-items-center gap-5">
        <Suspense fallback={<LoadingProduct />}>
          <HotSale sort="hot-sale" />
        </Suspense>
        <Flow />
        <HomeCategory />
        <Suspense>
          <HotSale sort="most-rating" title="Best Sellers Alert!" />
        </Suspense>
        <EmailSubscription />
      </section>
    </main>
  );
};

export default Page;
