"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useDialogCart } from "@/hooks/use-dialog-cart";

const CartButton = () => {
  const { cart } = useCart();
  const { setCartOpen } = useDialogCart();
  const totalQuantity = cart.reduce((cur, acc) => cur + acc.amount, 0);
  return (
    <Button
      size="icon"
      onClick={setCartOpen}
      variant="ghost"
      className="relative rounded-full"
      aria-label="cart button"
    >
      {totalQuantity > 0 && (
        <div className="absolute -right-1 top-0 flex size-5 items-center justify-center rounded-full bg-primary p-1 text-xs leading-none text-primary-foreground">
          {totalQuantity > 99 ? "99" : totalQuantity}
        </div>
      )}
      <ShoppingBag />
    </Button>
  );
};

export default CartButton;
