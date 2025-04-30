"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import CartEmpty from "./cart-empty";
import CartCard from "./cart-card";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { useCart } from "@/hooks/use-cart";
import { useDialogCart } from "@/hooks/use-dialog-cart";
import { useRouter } from "next/navigation";

export default function CartDialog() {
  const { setCartOpen, cartOpen } = useDialogCart();
  const { cart } = useCart();
  const router = useRouter();
  const count = cart.reduce((cur, acc) => cur + acc.amount, 0);

  const subTotal = cart.reduce((total, cartItem) => {
    const { price, amount } = cartItem;
    return total + price * amount;
  }, 0);

  const charge = subTotal >= 50 ? 0 : 10;
  const tax = (subTotal * 3) / 100;
  const total = subTotal + charge + tax;

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0">
        <SheetHeader className="flex-shrink-0 flex-row items-center justify-between space-y-0 p-6">
          <div className="flex flex-grow items-center">
            <SheetTitle className="pr-2">My Cart</SheetTitle>
            <SheetDescription className="sr-only" />
            {!!count && count !== 0 && (
              <NumberFlow
                value={count}
                format={{ useGrouping: false }}
                aria-hidden
                animated={true}
                className="pointer-events-none flex size-5 items-center justify-center rounded-lg bg-primary text-[10px] leading-none text-white"
                willChange
              />
            )}
          </div>
          <SheetClose className="mt-0">
            <XIcon size={19} />
          </SheetClose>
        </SheetHeader>
        <div
          className={cn(
            "flex min-w-0 flex-grow flex-col space-y-4 overflow-y-auto overflow-x-hidden p-6 pt-0",
          )}
        >
          {cart.length < 1 ? (
            <CartEmpty />
          ) : (
            <React.Fragment>
              {cart.map((cart) => (
                <CartCard cart={cart} key={cart.id} action />
              ))}
            </React.Fragment>
          )}
        </div>
        {cart.length > 0 && (
          <div className="bg-accent dark:bg-accent/50">
            <div className="p-6">
              <div className="flex items-center justify-between pb-3">
                <p>Subtotal :</p>
                <NumberFlow
                  value={subTotal}
                  aria-hidden
                  animated={true}
                  className="text-fluid-xl font-semibold ~text-sm/base"
                  format={{ style: "currency", currency: "USD" }}
                  willChange
                />
              </div>
              <div className="flex items-center justify-between py-2 text-foreground/80">
                <p>Shiping Charge:</p>
                <p>{charge === 0 ? "-" : `$${charge}`}</p>
              </div>
              <div className="flex items-center justify-between py-2 text-foreground/80">
                <p>Estimated Tax (3%) : </p>
                <NumberFlow
                  value={tax}
                  aria-hidden
                  animated={true}
                  className="text-fluid-xl font-semibold ~text-sm/base"
                  format={{ style: "currency", currency: "USD" }}
                  willChange
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <p className="text-2xl font-bold">Total :</p>
                <NumberFlow
                  value={total}
                  aria-hidden
                  animated={true}
                  className="font-semibold ~text-sm/2xl"
                  format={{ style: "currency", currency: "USD" }}
                  willChange
                />
              </div>
              <Button
                onClick={() => {
                  setCartOpen();
                  router.push("/checkout");
                }}
                className="w-full"
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
