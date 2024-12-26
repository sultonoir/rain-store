import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselHeader,
  CarouselItem,
} from "./carousel";
import CardProduct from "../templates/product/card-product";
import { api } from "@/trpc/server";

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

export async function HotSale({
  sort,
  title = "You May Like This Product 🥰",
}: Props) {
  const data = await api.product.page({
    sort,
  });
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
