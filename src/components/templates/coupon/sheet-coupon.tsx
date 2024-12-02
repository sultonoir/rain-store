"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useSheet from "@/hooks/useSheet";
import CouponProduct from "../product/coupon-product";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingButton } from "../button/loading-button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useSelectCoupon from "@/hooks/useSelectCoupon";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import CouponSkeleton from "./coupon-skeleton";
import { type Coupon } from "@prisma/client";

export const SheetCoupon = () => {
  const { isOpen, setIsOpen } = useSheet();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Voucher</SheetTitle>
          <SheetDescription className="sr-only">Voucer</SheetDescription>
        </SheetHeader>
        {isOpen && <SheetCouponContent />}
      </SheetContent>
    </Sheet>
  );
};

function SheetCouponContent() {
  const { min, setIsOpen, type } = useSheet();
  const [select, setSelect] = React.useState<Coupon | undefined>(undefined);
  const { setSelectedCoupon } = useSelectCoupon();
  const { data, isLoading } = api.coupon.get.useQuery({
    minOrder: min,
  });

  const handleSelect = () => {
    setSelectedCoupon(select);
    setIsOpen(false);
  };

  return (
    <>
      {isLoading && (
        <div className="space-y-2">
          <CouponSkeleton />
        </div>
      )}
      <ScrollArea
        className={cn("mt-2", {
          "h-[calc(100dvh-130px)]": type === "select",
          "h-[calc(100dvh-90px)]": type === "show",
        })}
      >
        {type === "select" ? (
          <div className="flex flex-col gap-2 pr-4">
            {data?.map((coupon) => (
              <div className="flex items-start space-x-2" key={coupon.id}>
                <Checkbox
                  id={coupon.id}
                  checked={select?.id === coupon.id}
                  onCheckedChange={() => {
                    setSelect(select?.id === coupon.id ? undefined : coupon);
                  }}
                  className="data-[state=checked]:text-white"
                />
                <Label htmlFor={coupon.id}>
                  <CouponProduct
                    key={coupon.id}
                    coupon={coupon}
                    type="single"
                    amount={0}
                  />
                </Label>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {data?.map((coupon) => (
              <CouponProduct
                key={coupon.id}
                coupon={coupon}
                type="single"
                amount={0}
              />
            ))}
          </div>
        )}
      </ScrollArea>
      {type === "select" && (
        <div className="mt-4">
          <LoadingButton
            onClick={handleSelect}
            disabled={!select}
            className="w-full"
          >
            Use promo
          </LoadingButton>
        </div>
      )}
    </>
  );
}
