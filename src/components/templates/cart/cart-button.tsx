"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import useOpenCart from "@/hooks/use-open-cart";
import { ShoppingBag } from "lucide-react";
import React from "react";
import { useStore } from "zustand";

export default function CartButton() {
  const cart = useStore(useCart, (state) => state.cart);

  const count = cart.reduce((cur, acc) => cur + acc.amount, 0);
  const { setCartOpen } = useOpenCart();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      aria-label="triger dialog cart"
      onClick={setCartOpen}
    >
      <ShoppingBag size={19} />
      {!!count && count !== 0 && (
        <div className="absolute right-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] leading-none text-white">
          {count < 99 ? count : 99}
        </div>
      )}
    </Button>
  );
}
