import { api } from "@/trpc/server";
import { type Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";

import PageProduct from "@/components/templates/product/page-product";

type Params = Promise<{ slug: string }>;

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await api.product.slug({
    slug,
  });
  if (!data) notFound();
  return {
    title: data.name ?? "Rainame",
    generator: "nextjs,Trpc,e-commerce",
    description:
      "Rainame is a leading online fashion retailer that offers the latest trends and styles in clothing, shoes, and accessories for men and women. Our mission is to provide our customers with a seamless and enjoyable shopping experience, allowing them to stay ahead of the fashion curve without breaking the bank.",
    metadataBase: new URL("https://rainame.vercel.app/"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
      },
    },
    openGraph: {
      title: data.name ?? "Rainame",
      description:
        "Rainame is a leading online fashion retailer that offers the latest trends and styles in clothing, shoes, and accessories for men and women. Our mission is to provide our customers with a seamless and enjoyable shopping experience, allowing them to stay ahead of the fashion curve without breaking the bank.",
      url: "https://rainame.vercel.app/",
      siteName: "KyouShop",
      images: [
        {
          url: data.productImage[0]?.url ?? "",
          width: 800,
          height: 600,
        },
        {
          url: data.productImage[0]?.url ?? "",

          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      site: "https://rainame.vercel.app/",
      title: "KyouShop",
      description: "KyouShop easy shopping for everyone",
      images: [
        {
          url: data.productImage[0]?.url ?? "",

          width: 800,
          height: 600,
        },
        {
          url: data.productImage[0]?.url ?? "",

          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
    },
  };
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const data = await api.product.slug({
    slug,
  });

  if (!data) notFound();

  return <PageProduct data={data} />;
};

export default Page;
