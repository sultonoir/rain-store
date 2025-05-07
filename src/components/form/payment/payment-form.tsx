"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { PaymentTypeSelector } from "./payment-type-selector";
import { CardDetailsFields } from "./card-details-fields";
import { Form } from "@/components/ui/form";
import { PaymentFormSchema } from "./schema";
import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import NumberFlow from "@number-flow/react";
import { AddressFormFields } from "./address-form-fields";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { useDialogCoupon } from "@/hooks/use-dialog-coupon";
import { Button } from "@/components/ui/button";
import ErrorToast from "../../ui/error-toast";
import { authClient } from "@/lib/auth-client";
import { useAction } from "next-safe-action/hooks";
import { createPayment } from "@/server/payment/payment-service";

interface Props {
  className?: string;
}

export function PaymentForm({ className }: Props) {
  const session = authClient.useSession();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { OpenSheet } = useDialogCoupon();
  const { cart, clear } = useCart();
  const subTotal = cart.reduce((total, cartItem) => {
    const { price, amount } = cartItem;
    return total + price * amount;
  }, 0);

  const charge = subTotal >= 50 ? 0 : 10;
  const tax = (subTotal * 3) / 100;

  const total = subTotal + charge + tax;

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
      email: "",
    },
  });

  const router = useRouter();
  const { executeAsync } = useAction(createPayment, {
    onSuccess: () => {
      clear();
      router.push(`/`);
      form.reset();
    },
    onError: (error) => {
      toast.custom((t) => (
        <ErrorToast
          t={t}
          name={error.error.serverError ?? "Error create payment"}
        />
      ));
    },
  });
  async function onSubmit() {
    if (session.error) {
      router.push("/signin?callbackURL=/checkout");
      return;
    }
    await executeAsync({
      userId: session.data?.user?.id ?? "",
      cart: cart.map((cartItem) => ({
        productId: cartItem.productId,
        quantity: cartItem.amount,
        price: cartItem.price,
        size: cartItem.size,
      })),
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
        "top-32 w-full space-y-3 rounded-2xl border bg-white p-6 sm:sticky dark:bg-[#0a0a0a]",
        className,
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Address</h2>
            <p className="text-muted-foreground text-sm">
              Add address for shipping
            </p>
          </div>
          <AddressFormFields control={form.control} />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Payment Method
            </h2>
            <p className="text-muted-foreground text-sm">
              Add a new payment method to your account
            </p>
          </div>
          <PaymentTypeSelector control={form.control} />
          <CardDetailsFields control={form.control} />
        </form>
      </Form>
      <Button
        onClick={handleOpen}
        className="border-primary bg-primary/20 text-primary hover:bg-primary/25 w-full border"
      >
        Save more with promos
      </Button>
      <div className="text-muted-foreground mt-2 space-y-2">
        <div className="flex items-center justify-between">
          <p>Subtotal :</p>
          <NumberFlow
            value={subTotal}
            aria-hidden
            animated={true}
            className="text-fluid-xl text-foreground ~text-sm/base font-semibold"
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
            className="text-fluid-xl text-foreground ~text-sm/base font-semibold"
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
            className="text-foreground ~text-sm/2xl font-semibold"
            format={{ style: "currency", currency: "USD" }}
            willChange
          />
        </div>
      </div>
      <Button
        loading={form.formState.isSubmitting}
        disabled={form.formState.isSubmitting}
        onClick={form.handleSubmit(onSubmit)}
        className="w-full"
      >
        Pay
      </Button>
    </Card>
  );
}
