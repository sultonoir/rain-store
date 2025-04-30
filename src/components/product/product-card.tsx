import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { type ProductCard as ProductCardProps } from "@/types";
import Link from "next/link";
import { Image } from "@unpic/react/nextjs";
import ProductPrice from "./product-price";
import ProductRating from "./product-rating";
import { blurhashToDataUri } from "@unpic/placeholder";

type Props = {
  product: ProductCardProps;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Card className="relative isolate gap-4 overflow-hidden rounded-2xl border p-2 shadow-lg">
      <Image
        alt={product.name}
        src={product.media.url}
        width={300}
        height={400}
        layout="constrained"
        background={blurhashToDataUri(product.media.blur)}
        className="rounded-lg object-cover"
      />
      <CardContent className="space-y-1 p-2">
        <CardTitle className="w-[calc(100%-1px)] truncate text-base font-normal">
          <Link
            href={`/product/${product.slug}`}
            prefetch={true}
            title={product.name}
          >
            <span className="absolute inset-0" />
            {product.name}
          </Link>
        </CardTitle>
        <ProductRating
          rating={{
            average: product.ratingAverage,
            count: product.ratingCount,
          }}
        />
        <ProductPrice
          discount={product.discount}
          price={product.normalPrice}
          priceAfterDiscount={product.discountPrice}
          className="flex-grow"
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
