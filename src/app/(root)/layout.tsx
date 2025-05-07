import FooterSection from "@/components/navigation/footer";
import HeaderSection from "@/components/navigation/header";
import NavbarMobile from "@/components/navigation/nav-mobile";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderSection />
      {children}
      <FooterSection />
      <NavbarMobile />
    </>
  );
};

export default RootLayout;
