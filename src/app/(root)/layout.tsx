import CartContent from "@/components/templates/cart/cart-content";
import MainNavbar from "@/components/templates/navbar/main-navbar";
import { Toaster } from "@/components/ui/sonner";
import { Suspense, type ReactNode } from "react";
import DialogTermsCoupon from "@/components/templates/coupon/dialog-terms-coupon";
import { SheetCoupon } from "@/components/templates/coupon/sheet-coupon";
import { FilterMobile } from "@/components/templates/filter/filter-mobile";
import Footer from "@/components/ui/footer";
import ButtonUP from "@/components/templates/button/button-up";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense>
      <div className="mb-8 lg:mb-0">
        <MainNavbar />
        {children}
        <Footer />
      </div>
      <DialogTermsCoupon />
      <SheetCoupon />
      <Toaster richColors position="top-center" />
      <Suspense>
        <FilterMobile />
      </Suspense>
      <CartContent />
      <ButtonUP />
    </Suspense>
  );
};

export default AuthLayout;
