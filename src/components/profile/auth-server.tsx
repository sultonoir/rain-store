import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ProfileButton } from "./profile-button";
import { User2 } from "lucide-react";
import CartButton from "../cart/cart-button";
import NotifiButton from "../notifi/notifi-button";

export const AuthServer = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session?.user) {
    return (
      <>
        <CartButton />
        <Link
          href="/signin"
          prefetch={true}
          className={cn(
            buttonVariants({ variant: "default" }),
            "hidden lg:flex",
          )}
        >
          Login
        </Link>
        <Link
          href="/signin"
          className={cn(
            "hover:text-primary flex flex-col items-center justify-center text-xs font-medium lg:hidden",
          )}
        >
          <User2 />
          <span className="mt-1">Login</span>
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="order-2 lg:order-1">
        <CartButton />
      </div>
      <div className="order-1 md:order-2">
        <NotifiButton userId={session.user.id} />
      </div>
      <div className="order-3">
        <ProfileButton {...session.user} />
      </div>
    </>
  );
};
