import CartContent from "@/components/templates/cart/cart-content";
import MainNavbar from "@/components/templates/navbar/main-navbar";
import { Toaster } from "@/components/ui/sonner";
import { Fragment, type ReactNode } from "react";
import DialogTermsCoupon from "@/components/templates/coupon/dialog-terms-coupon";
import { SheetCoupon } from "@/components/templates/coupon/sheet-coupon";
import { FilterMobile } from "@/components/templates/filter/filter-mobile";
import Footer from "@/components/ui/footer";
import ButtonUP from "@/components/templates/button/button-up";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <MainNavbar />
      {children}
      <DialogTermsCoupon />
      <SheetCoupon />
      <Toaster richColors position="top-center" />
      <FilterMobile />
      <CartContent />
      <Footer />
      <ButtonUP />
    </Fragment>
  );
};

export default AuthLayout;
