import React from "react";
import { X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

type Props = {
  cartId: string;
};

export default function CartRemoveButton({ cartId }: Props) {
  const { remove } = useCart();
  const handleClick = () => {
    remove(cartId);
  };
  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="icon"
      className="size-6"
      startContent={<X className="size-4" />}
    />
  );
}
