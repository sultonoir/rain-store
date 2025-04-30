"use client";

import { Lens } from "@/components/ui/lens";
import React from "react";
import { Image } from "@unpic/react/nextjs";
import { blurhashToDataUri } from "@unpic/placeholder";
import type { Media } from "@prisma/client";

type Props = {
  images: Media[];
};

const ProductImages = ({ images }: Props) => {
  const [picture, setPicture] = React.useState(images[0]!);
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
      <Lens className="aspect-square h-auto w-full">
        <Image
          src={picture.url}
          alt={picture.id}
          width={713}
          height={713}
          layout="constrained"
          priority={true}
          loading="eager"
          background={blurhashToDataUri(picture.blur)}
          className="rounded-lg object-cover"
        />
      </Lens>
      <div className="grid w-full grid-cols-4 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={image.url}
              alt={image.id}
              width={180}
              height={180}
              onMouseEnter={() => setPicture(image)}
              onClick={() => setPicture(image)}
              background={blurhashToDataUri(image.blur)}
              className="aspect-square object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
