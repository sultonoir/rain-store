import React, { Suspense } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { MenuCategories } from "./menu-categories";
import { AuthServer } from "../profile/auth-server";

const NavbarMobile = () => {
  return (
    <div className="bg-background fixed bottom-0 z-10 flex w-full border-t py-2 md:hidden">
      <div className="container flex flex-row flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="home page"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "rounded-full",
          )}
        >
          <Home />
        </Link>
        <Suspense>
          <MenuCategories />
        </Suspense>
        <AuthServer />
      </div>
    </div>
  );
};

export default NavbarMobile;
