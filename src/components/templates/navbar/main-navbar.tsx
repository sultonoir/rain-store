import React from "react";
import Logo from "./logo";
import { MenuNavbar } from "./menu-navabar";
import { ThemeButton } from "../button/theme-button";
import CartButton from "../cart/cart-button";
import SearchMobile from "../search/search-mobile";
import { SearchInput } from "../search/search-input";

const MainNavbar = async () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
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
          </div>
        </div>
        <MenuNavbar />
      </div>
    </header>
  );
};

export default MainNavbar;
