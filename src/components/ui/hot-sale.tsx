import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselHeader,
  CarouselItem,
} from "./carousel";
import CardProduct from "../templates/product/card-product";
import { api } from "@/trpc/server";

export async function HotSale() {
  const data = await api.product.page({
    sort: "hot-sale",
  });
  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselHeader title="You May Like This Product 🥰" />
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
