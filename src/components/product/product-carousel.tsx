import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselHeader,
  CarouselItem,
} from "@/components/ui/carousel";
import CardProduct from "@/components/product/product-card";
import type { SearchProductsParams } from "@/server/api/routers/product/products-input";
import { api } from "@/trpc/server";

interface Props extends SearchProductsParams {
  title?: string;
}

async function ProductCarousel({
  sort,
  title = "You May Like This Product 🥰",
  category,
  subcategory,
}: Props) {
  const products = await api.product.getProducts({
    sort,
    category,
    subcategory,
  });

  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselHeader title={title} />
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <CardProduct product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default ProductCarousel;
