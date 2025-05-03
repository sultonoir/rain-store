import React, { Suspense } from "react";
import Logo from "./logo";
import { MenuNavbar } from "./menu-navigation";
import { DarkMode } from "../ui/dark-mode";
import { AuthServer } from "../profile/auth-server";

const HeaderSection = () => {
  return (
    <div className="bg-background sticky top-0 z-[2] border-b py-2">
      <div className="container mx-auto flex flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-2">
            <DarkMode />
            <AuthServer />
          </div>
        </div>
        <Suspense>
          <MenuNavbar />
        </Suspense>
      </div>
    </div>
  );
};

export default HeaderSection;
