import React from "react";
import { LoadingButton } from "../button/loading-button";
import { X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

type Props = {
  cartId: string;
};

export default function CartRemoveButton({ cartId }: Props) {
  const { remove } = useCart();
  const handleClick = () => {
    remove(cartId);
  };
  return (
    <LoadingButton
      onClick={handleClick}
      variant="ghost"
      size="icon"
      className="size-6"
      startContent={<X className="size-4" />}
    />
  );
}
