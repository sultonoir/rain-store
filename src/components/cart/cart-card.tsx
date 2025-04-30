import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { type FormatCart } from "@/types";
import React, { useState } from "react";
import CartRemoveButton from "./cart-remove-button";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import NumberFlow from "@number-flow/react";
import { useCart } from "@/hooks/use-cart";
import { Image } from "@unpic/react/nextjs";
import { blurhashToDataUri } from "@unpic/placeholder";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  cart: FormatCart;
  action: boolean;
}

export default function CartCard({ cart, action, className }: Props) {
  const { mutate } = useCart();
  const [count, setCount] = useState(cart.amount);

  const maxAllowedAmount = cart.max;

  // Menggunakan useDebounce untuk memperbarui count dengan delay 500ms
  const debouncedCount = useDebounce(count, 500);

  React.useEffect(() => {
    mutate({
      id: cart.id,
      amount: debouncedCount,
    });
  }, [cart.id, debouncedCount, mutate]);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

  const totalPrice = cart.price * cart.amount;
  return (
    <div
      className={cn(
        "flex w-full justify-between space-x-3 rounded-2xl",
        className,
      )}
    >
      <div className="relative h-[100px] w-20 flex-shrink-0 overflow-hidden rounded-sm">
        <Image
          src={cart.media.url}
          alt={cart.name}
          layout="constrained"
          width={200}
          height={300}
          background={blurhashToDataUri(cart.media.blur)}
          className="object-cover"
          sizes="100%"
        />
      </div>
      <div className="flex w-full flex-1 flex-col">
        <h3 className="line-clamp-1 text-[16px] font-bold leading-normal">
          {cart.name}
        </h3>
        <div className="mt-1 flex h-5 space-x-2">
          <p className="text-sm text-muted-foreground">Size: {cart.size}</p>
          <Separator orientation="vertical" className="h-full w-0.5" />
          <NumberFlow
            value={cart.amount}
            format={{ useGrouping: false }}
            aria-hidden
            animated={true}
            className="pointer-events-none"
            willChange
          />
        </div>
        {action && (
          <div className="mt-auto flex w-fit gap-3 rounded-lg bg-muted p-1 dark:bg-muted/50">
            <Button
              className="size-6 disabled:cursor-not-allowed"
              onClick={decrement}
              disabled={count === 1}
              variant="ghost"
              size="icon"
            >
              <MinusIcon className="size-4" />
            </Button>
            <NumberFlow
              value={count}
              format={{ useGrouping: false }}
              aria-hidden
              animated={true}
              className="pointer-events-none"
              willChange
            />
            <Button
              onClick={increment}
              className="size-6"
              disabled={count >= maxAllowedAmount}
              variant="ghost"
              size="icon"
            >
              <PlusIcon className="size-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-shrink-0 flex-col items-end justify-between">
        {action && <CartRemoveButton cartId={cart.id} />}
        <NumberFlow
          value={totalPrice}
          format={{ style: "currency", currency: "USD" }}
          aria-hidden
          animated={true}
          className="pointer-events-none"
          willChange
        />
      </div>
    </div>
  );
}
