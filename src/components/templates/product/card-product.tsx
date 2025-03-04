import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { type ProductCard } from "@/types";
import Link from "next/link";
import TotalRating from "../rating/total-rating";
import PriceProduct from "./price-product";
import { Image } from "@unpic/react/nextjs";

type Props = {
  product: ProductCard;
};

const CardProduct = ({ product }: Props) => {
  return (
    <Card className="relative rounded-2xl border p-2 shadow-lg">
      <Link
        href={`/product/${product.slug}`}
        prefetch={true}
        title={product.name}
      >
        <Image
          alt={product.name}
          src={product.productImage.url}
          width={300}
          height={400}
          layout="constrained"
          className="rounded-lg object-cover"
        />
        <CardContent className="relative mt-4 space-y-2 bg-background p-2">
          <CardTitle className="w-[calc(100%-1px)] truncate text-[16px] font-normal leading-none">
            {product.name}
          </CardTitle>
          <TotalRating rating={product.rating} />
          <PriceProduct
            discount={product.discount}
            price={product.price}
            className="flex-grow"
          />
        </CardContent>
      </Link>
    </Card>
  );
};

export default CardProduct;
