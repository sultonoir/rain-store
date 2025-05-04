"use client";
import React, { Suspense } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";
import dynamic from "next/dynamic";
import { useFilter } from "@/hooks/use-filter";

const CartDialog = dynamic(() => import("@/components/cart/cart-dialog"), {
  ssr: false,
});

const MobileFilter = dynamic(() => import("@/components/filter/filter-mobile"));

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { filterOpen } = useFilter();
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-center" richColors />
        <Suspense>{filterOpen && <MobileFilter />}</Suspense>
        <CartDialog />
      </ThemeProvider>
    </>
  );
};

export default Provider;
