import FooterSection from "@/components/navigation/footer";
import HeaderSection from "@/components/navigation/header";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderSection />
      {children}
      <FooterSection />
    </>
  );
};

export default RootLayout;
