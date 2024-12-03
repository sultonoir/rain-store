"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Button } from "@/components/ui/button";
import { type SearchProductsParams } from "@/server/api/routers/product/product.input";
import { api } from "@/trpc/react";
import LoadingProduct from "../product/loading-product";
import { cn } from "@/lib/utils";
import CardProduct from "../product/card-product";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { type ProductCard } from "@/types";

interface Props extends SearchProductsParams {
  title?: string;
  showPagination?: boolean;
  loadingClassName?: string;
  layoutClassName?: string;
}

const RecommendSection = ({ title, loadingClassName, ...props }: Props) => {
  const { data, status } = api.product.page.useQuery({ ...props });

  switch (status) {
    case "pending":
      return (
        <LoadingProduct
          length={5}
          className={cn(
            "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5",
            loadingClassName,
          )}
        />
      );
    case "error":
      return null;
    case "success":
      return (
        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselProduct products={data.products} title={title} />
        </Carousel>
      );
  }
};

interface CarouselProducProps {
  products: ProductCard[];
  title?: string;
}

function CarouselProduct({ products, title }: CarouselProducProps) {
  const { scrollNext, scrollPrev, canScrollNext, canScrollPrev } =
    useCarousel();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        {title && <h3 className="font-bold ~text-2xl/4xl">{title}</h3>}
        <div className="flex gap-5">
          <Button
            size="icon"
            className="size-8"
            variant="outline"
            disabled={!canScrollPrev}
          >
            <ChevronLeft size={20} onClick={scrollPrev} />
          </Button>
          <Button
            size="icon"
            className="size-8"
            variant="outline"
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
      <CarouselContent>
        {products.map((item) => (
          <CarouselItem
            key={item.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <CardProduct product={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </div>
  );
}

export default RecommendSection;
