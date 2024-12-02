"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { PaymentTypeSelector } from "./payment-type-selector";
import { CardDetailsFields } from "./card-details-fields";
import { Form } from "@/components/ui/form";
import { PaymentFormSchema } from "./schema";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { LoadingButton } from "../../button/loading-button";
import useSheet from "@/hooks/useSheet";
import useSelectCoupon from "@/hooks/useSelectCoupon";
import React from "react";
import { useRouter } from "next/navigation";
import NumberFlow from "@number-flow/react";
import { AddressFormFields } from "./address-form-fields";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

interface Props {
  className?: string;
}

export function PaymentForm({ className }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { OpenSheet } = useSheet();
  const { selectedCoupon } = useSelectCoupon();
  const { cart, clear } = useCart();

  const subTotal = cart.reduce((total, cartItem) => {
    const { price, amount } = cartItem;
    return total + price * amount;
  }, 0);

  const charge = subTotal >= 50 ? 0 : 10;
  const tax = (subTotal * 3) / 100;
  const couponvalue = selectedCoupon?.discount ?? 0;
  const total = subTotal + charge + tax - couponvalue;

  const form = useForm<PaymentFormSchema>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      paymentMethod: "credit",
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
  });

  const router = useRouter();
  const { mutateAsync } = api.payment.create.useMutation({
    onSuccess: () => {
      toast.success("Payment success");
      form.reset();
      clear();
      router.push("/");
    },
  });
  async function onSubmit(data: PaymentFormSchema) {
    await mutateAsync({
      promoId: selectedCoupon?.id,
      cart,
      name: data.cardHolder,
      email: data.email,
    });
  }

  const handleOpen = () => {
    OpenSheet({
      isOpen: true,
      min: subTotal,
      type: "select",
    });
  };

  return (
    <Card
      ref={ref}
      id="payment-form"
      className={cn(
        "top-32 w-full space-y-3 rounded-2xl border bg-white p-6 dark:bg-[#0a0a0a] sm:sticky",
        className,
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Address</h2>
            <p className="text-sm text-muted-foreground">
              Add address for shipping
            </p>
          </div>
          <AddressFormFields control={form.control} />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Payment Method
            </h2>
            <p className="text-sm text-muted-foreground">
              Add a new payment method to your account
            </p>
          </div>
          <PaymentTypeSelector control={form.control} />
          <CardDetailsFields control={form.control} />
        </form>
      </Form>
      <LoadingButton
        onClick={handleOpen}
        className="w-full border border-primary bg-primary/20 text-primary hover:bg-primary/25"
      >
        Save more with promos
      </LoadingButton>
      <div className="mt-2 space-y-2 text-muted-foreground">
        <div className="flex items-center justify-between">
          <p>Subtotal :</p>
          <NumberFlow
            value={subTotal}
            aria-hidden
            animated={true}
            className="text-fluid-xl font-semibold text-foreground ~text-sm/base"
            format={{ style: "currency", currency: "USD" }}
            willChange
          />
        </div>
        <div className="flex items-center justify-between">
          <p>Shiping Charge:</p>
          <p>{charge === 0 ? "-" : `$${charge}`}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Estimated Tax (3%) : </p>
          <NumberFlow
            value={tax}
            aria-hidden
            animated={true}
            className="text-fluid-xl font-semibold text-foreground ~text-sm/base"
            format={{ style: "currency", currency: "USD" }}
            willChange
          />
        </div>
        {selectedCoupon && (
          <div className="flex items-center justify-between">
            <p>Coupon : {selectedCoupon.title} </p>
            <p className="text-foreground">- ${couponvalue.toFixed(2)}</p>
          </div>
        )}
        <div className="flex items-center justify-between py-2">
          <p className="text-2xl font-bold">Total :</p>
          <NumberFlow
            value={total}
            aria-hidden
            animated={true}
            className="font-semibold text-foreground ~text-sm/2xl"
            format={{ style: "currency", currency: "USD" }}
            willChange
          />
        </div>
      </div>
      <LoadingButton
        loading={form.formState.isSubmitting}
        disabled={form.formState.isSubmitting}
        onClick={form.handleSubmit(onSubmit)}
        className="w-full"
      >
        Pay
      </LoadingButton>
    </Card>
  );
}
