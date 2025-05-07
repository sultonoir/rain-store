import CheckoutContent from "@/components/checkout/checkout-content";
import { PaymentForm } from "@/components/form/payment/payment-form";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function Checkout() {
  return (
    <div className="container space-y-3">
      <h1 className="pt-3 text-2xl lg:text-3xl">Checkout</h1>
      <div className="flex flex-col gap-5 pb-10 lg:flex-row lg:gap-10">
        <div className="basis-1/3 space-y-3 lg:min-h-screen">
          <CheckoutContent />
        </div>
        <div className="relative basis-2/3">
          <PaymentForm />
        </div>
      </div>
    </div>
  );
}
