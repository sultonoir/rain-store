import React from "react";
import Logo from "./logo";
import { MenuNavbar } from "./menu-navabar";
import { ButtonProfile } from "../profile/button-profile";
import { ThemeButton } from "../button/theme-button";
import { NavigasiFloating } from "./navigasi-floating";
import CartButton from "../cart/cart-button";
import { validateRequest } from "@/lib/auth/validate-request";
import LoginButton from "../button/login-button";
import SearchMobile from "../search/search-mobile";
import { SearchInput } from "../search/search-input";

const MainNavbar = async () => {
  const { user } = await validateRequest();
  return (
    <NavigasiFloating className="top-0 z-50 border-b bg-background">
      <div className="container flex flex-col space-y-2 rounded-lg py-2">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          <div className="mx-2 flex flex-grow items-center gap-2 md:mx-10">
            <SearchMobile />
            <SearchInput />
          </div>
          <div className="flex flex-grow-0 items-center gap-2 sm:ml-2">
            <ThemeButton />
            <CartButton />
            {!user ? (
              <LoginButton className="hidden md:flex" />
            ) : (
              <div className="hidden items-center space-x-2 md:flex">
                <ButtonProfile />
              </div>
            )}
          </div>
        </div>
        <MenuNavbar />
      </div>
    </NavigasiFloating>
  );
};

export default MainNavbar;
