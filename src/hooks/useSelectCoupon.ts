import { type Coupon } from "@prisma/client";
import { create } from "zustand";

interface SelectCouponStore {
  selectedCoupon: Coupon | undefined;
  setSelectedCoupon: (open: Coupon | undefined) => void;
}

const useSelectCoupon = create<SelectCouponStore>((set) => ({
  selectedCoupon: undefined,
  setSelectedCoupon: (selectedCoupon: Coupon | undefined) => set({ selectedCoupon }),
}));

export default useSelectCoupon;
