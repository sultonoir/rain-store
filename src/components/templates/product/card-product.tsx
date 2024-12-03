import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { type ProductCard } from "@/types";
import Link from "next/link";
import TotalRating from "../rating/total-rating";
import PriceProduct from "./price-product";
import { BlurImage } from "@/components/ui/blur-image";

type Props = {
  product: ProductCard;
};

const CardProduct = ({ product }: Props) => {
  return (
    <Card className="relative rounded-2xl border p-2 shadow-lg dark:border-border/50 dark:bg-muted/50">
      <Link
        href={`/product/${product.slug}`}
        className="absolute inset-0 z-10"
        prefetch={true}
        title={product.name}
      />
      <div className="relative block aspect-9/16 h-auto w-full overflow-hidden rounded-lg p-0">
        {product.productImage.flatMap((img) => (
          <BlurImage
            alt={product.name}
            src={img.url}
            key={img.id}
            fill
            sizes="(min-width: 1540px) 309px, (min-width: 1280px) 500px, (min-width: 1040px) calc(25vw - 28px), (min-width: 780px) calc(33.33vw - 32px), calc(50vw - 40px"
            className="object-cover"
          />
        ))}
      </div>
      <CardContent className="relative mt-4 rounded-lg bg-accent p-2 dark:bg-muted">
        <CardTitle className="w-[calc(100%-1px)] truncate text-[16px] font-normal leading-normal">
          {product.name}
        </CardTitle>
        <TotalRating rating={product.rating} />
        <PriceProduct
          discount={product.discount}
          price={product.price}
          className="flex-grow"
        />
      </CardContent>
    </Card>
  );
};

export default CardProduct;
