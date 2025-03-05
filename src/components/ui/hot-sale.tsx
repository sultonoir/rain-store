"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselHeader,
  CarouselItem,
} from "./carousel";
import CardProduct from "../templates/product/card-product";
import { api } from "@/trpc/react";
import LoadingProduct from "../templates/product/loading-product";

interface Props {
  sort?:
    | "hot-sale"
    | "most-rating"
    | "latest"
    | "lowest-price"
    | "high-price"
    | undefined;
  title?: string;
}

export function HotSale({
  sort,
  title = "You May Like This Product 🥰",
}: Props) {
  const { data, isLoading } = api.product.search.useQuery({
    sort,
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
        {data.products.map((item) => (
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
