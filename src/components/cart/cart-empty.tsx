import { useDialogCart } from "@/hooks/use-dialog-cart";
import { Image } from "@unpic/react/nextjs";
import Link from "next/link";
import React from "react";

export default function CartEmpty() {
  const { setCartOpen } = useDialogCart();
  return (
    <div className="flex flex-col place-items-center gap-3">
      <div className="relative aspect-square size-40">
        <Image
          src="/empty-cart.png"
          layout="constrained"
          width={160}
          height={160}
          alt="empty-cart"
          priority
          loading="eager"
        />
      </div>
      <h4 className="font-medium">Your cart is empty</h4>
      <p className="text-muted-foreground text-[14px] leading-tight">
        Looks like you haven&apos;t made your choice yey...
      </p>
      <Link
        href="/products"
        prefetch={true}
        onClick={setCartOpen}
        className="bg-primary hover:bg-primary/80 mt-1 rounded-lg px-3 py-1 text-white"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
