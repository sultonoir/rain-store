"use client";
import { BlurImage } from "@/components/ui/blur-image";
import { Lens } from "@/components/ui/lens";
import { type ProductImage } from "@prisma/client";
import React from "react";

type Props = {
  images: ProductImage[];
};

const ImagesProduct = ({ images }: Props) => {
  const [picture, setPicture] = React.useState(images[0]!);
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
      <Lens className="aspect-square h-auto w-full">
        <BlurImage
          src={picture.url}
          alt={picture.id}
          placeholder="blur"
          blurDataURL={picture.thumbnail}
          fill
          sizes="100%"
          className="rounded-lg object-cover"
        />
      </Lens>
      <div className="grid w-full grid-cols-4 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <BlurImage
              src={image.url}
              alt={image.id}
              placeholder="blur"
              blurDataURL={image.thumbnail}
              fill
              sizes="100%"
              onMouseEnter={() => setPicture(image)}
              onClick={() => setPicture(image)}
              className="aspect-square object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesProduct;
