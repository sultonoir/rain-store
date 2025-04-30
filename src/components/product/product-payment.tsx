"use client";
import { useSizes } from "@/hooks/use-sizes";
import React from "react";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import CartCard from "../cart/cart-card";
import { useCount } from "@/hooks/use-count";
import { type ProductPage } from "@/types";
import { useCart } from "@/hooks/use-cart";
import { Button } from "../ui/button";

interface Props {
  data: ProductPage;
}

const ProductPayment = ({ data }: Props) => {
  const { add: addtoCart } = useCart();
  const { sizes } = useSizes();
  const { count, reset } = useCount();

  const handlePayment = () => {
    if (!sizes) {
      return toast.error("Please select size");
    }
    const cart = {
      id: new Date().getTime().toString(),
      name: data.name,
      productId: data.id,
      size: sizes.name,
      amount: count,
      createdAt: new Date(),
      updatedAt: new Date(),
      max: sizes.amount,
      price: data.discount >= 0 ? data.discountPrice : data.normalPrice,
      discount: data.discount,
      media: data.media[0]!,
    };
    addtoCart(cart);
    reset();
    toast(<CartCard cart={cart} action={false} />);
  };

  return (
    <div className="flex gap-2">
      <Button
        className="h-auto w-full gap-2"
        onClick={handlePayment}
        startContent={<ShoppingBag />}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductPayment;
