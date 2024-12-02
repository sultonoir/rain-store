import useOpenCart from "@/hooks/use-open-cart";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CartEmpty() {
  const { setCartOpen } = useOpenCart();
  return (
    <div className="flex flex-col place-items-center gap-3">
      <div className="relative aspect-square size-40">
        <Image
          src="/empty-cart.png"
          fill
          alt="empty-cart"
          priority
          sizes="100%"
        />
      </div>
      <h4 className="font-medium">Your cart is empty</h4>
      <p className="text-[14px] leading-tight text-muted-foreground">
        Looks like you haven&apos;t made your choice yey...
      </p>
      <Link
        href="/search"
        onClick={setCartOpen}
        className="mt-1 rounded-lg bg-primary px-3 py-1 text-white hover:bg-primary/80"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
