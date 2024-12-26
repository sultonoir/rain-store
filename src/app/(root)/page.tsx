import EmailSubscription from "@/components/ui/email-subscription ";
import Flow from "@/components/ui/flow";
import HomeCategory from "@/components/ui/home-category";
import { HotSale } from "@/components/ui/hot-sale";
import Promo from "@/components/ui/promo";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home",
};

const Page = () => {
  return (
    <main className="container relative z-0 min-h-screen py-5">
      <Promo />
      <section className="my-10 flex flex-col justify-items-center gap-5">
        <HotSale sort="hot-sale" />
        <Flow />
        <HomeCategory />
        <HotSale sort="most-rating" title="Best Sellers Alert!" />
        <EmailSubscription />
      </section>
    </main>
  );
};

export default Page;
