"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselHeader,
  CarouselItem,
} from "@/components/ui/carousel";
import CardProduct from "@/components/templates/product/card-product";
import LoadingProduct from "@/components/templates/product/loading-product";
import { api } from "@/trpc/react";

interface Props {
  slug: string;
  title?: string;
}

export function RecommendSection({ slug, title = "Recommendations" }: Props) {
  const { data, isLoading } = api.recommends.getRecommends.useQuery({
    slug,
  });

  if (isLoading) {
    return <LoadingProduct />;
  }

  if (!data) {
    return null;
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselHeader title={title} />
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem
            key={item.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <CardProduct product={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
