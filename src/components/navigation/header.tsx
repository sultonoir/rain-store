import React, { Suspense } from "react";
import Logo from "./logo";
import { MenuNavbar } from "./menu-navigation";
import { DarkMode } from "../ui/dark-mode";
import { AuthServer } from "../profile/auth-server";
import { SearchForm } from "../form/search/search-form";

const HeaderSection = () => {
  return (
    <div className="bg-background sticky top-0 z-[2] border-b py-2">
      <div className="container mx-auto flex flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <Logo className="flex-none shrink-0" />
          <SearchForm className="w-full" />
          <div className="flex items-center gap-2">
            <DarkMode />
            <div className="hidden gap-2 md:flex">
              <AuthServer />
            </div>
          </div>
        </div>
        <Suspense>
          <MenuNavbar className="hidden sm:flex" />
        </Suspense>
      </div>
    </div>
  );
};

export default HeaderSection;
