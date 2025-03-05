import { Hero, Promotions } from "@/components/templates/home/home-hero";
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
    <main className="relative z-0 min-h-screen space-y-10 py-5">
      <Hero />
      <Promotions />
      <div className="container">
        <HotSale sort="hot-sale" />
      </div>
      <Promo hero={promo} />
      <section className="container my-10 flex flex-col justify-items-center gap-10">
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
