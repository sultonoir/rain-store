"use client";

import { cn } from "@/lib/utils";
import React from "react";
import CartEmpty from "../cart/cart-empty";
import CartCard from "../cart/cart-card";
import { useCart } from "@/hooks/use-cart";

type CheckoutContentProps = React.HTMLAttributes<HTMLDivElement>;

export default function CheckoutContent({ className }: CheckoutContentProps) {
  const { cart } = useCart();

  return (
    <div
      className={cn(
        "flex min-w-0 flex-grow flex-col space-y-4 overflow-y-auto overflow-x-hidden rounded-2xl border bg-white p-6 dark:bg-[#0a0a0a]",
        className,
      )}
    >
      {cart.length < 1 ? (
        <CartEmpty />
      ) : (
        <React.Fragment>
          {cart.map((item) => (
            <CartCard cart={item} key={item.id} action />
          ))}
        </React.Fragment>
      )}
    </div>
  );
}
