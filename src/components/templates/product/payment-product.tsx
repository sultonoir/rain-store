"use client";
import useSizes from "@/hooks/useSizes";
import React from "react";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import CartCard from "../cart/cart-card";
import useCount from "@/hooks/use-count";
import { LoadingButton } from "../button/loading-button";
import { useLastVisited } from "@/hooks/use-last-visited";
import { type ProductPage } from "@/types";
import { generateId } from "lucia";
import { useCart } from "@/hooks/use-cart";

interface Props {
  data: ProductPage;
}

const PaymentProduct = ({ data }: Props) => {
  const { add } = useLastVisited();
  const { add: addtoCart } = useCart();
  add(data.id);
  const { sizes } = useSizes();
  const { count, reset } = useCount();

  const handlePayment = () => {
    if (!sizes) {
      return toast.error("Please select size");
    }
    const cart = {
      id: generateId(10),
      name: data.name,
      productId: data.id,
      size: sizes.name,
      amount: count,
      createdAt: new Date(),
      updatedAt: new Date(),
      max: sizes.amount,
      price: data.discount >= 0 ? data.priceAfterDiscount : data.price,
      discount: data.discount,
      image: data.productImage[0]!,
    };
    addtoCart(cart);
    reset();
    toast(<CartCard cart={cart} action={false} />);
  };

  return (
    <div className="flex gap-2">
      <LoadingButton
        className="h-auto w-full gap-2"
        onClick={handlePayment}
        startContent={<ShoppingBag />}
      >
        Add to cart
      </LoadingButton>
    </div>
  );
};

export default PaymentProduct;
