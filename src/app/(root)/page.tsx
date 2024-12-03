import RecommendSection from "@/components/templates/recommend/recommend-section";
import EmailSubscription from "@/components/ui/email-subscription ";
import Flow from "@/components/ui/flow";
import HomeCategory from "@/components/ui/home-category";
import InviewContainer from "@/components/ui/inview-container";
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
        <RecommendSection
          title="You May Like This Product 🥰"
          sort="hot-sale"
        />
        <Flow />
        <HomeCategory />
        <InviewContainer>
          <RecommendSection title="Best Sellers Alert!" sort="most-rating" />
        </InviewContainer>
        <EmailSubscription />
      </section>
    </main>
  );
};

export default Page;
