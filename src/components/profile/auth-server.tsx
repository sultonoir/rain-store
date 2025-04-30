import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ProfileButton } from "./profile-button";
import { User2 } from "lucide-react";

export const AuthServer = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session?.user) {
    return (
      <>
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
            "flex flex-col items-center justify-center text-xs font-medium hover:text-primary lg:hidden",
          )}
        >
          <User2 />
          <span className="mt-1">Login</span>
        </Link>
      </>
    );
  }

  return <ProfileButton {...session.user} />;
};
