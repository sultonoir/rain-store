import Image from "next/image";
import React from "react";

export function NotFoundProduct() {
  return (
    <div className="flex h-full flex-col place-items-center items-center justify-center gap-2 lg:max-h-[700px]">
      <Image alt="error" src="/404.png" width={500} height={500} priority />
      <p className="text-muted-foreground">
        the product you are looking for does not exist
      </p>
    </div>
  );
}
