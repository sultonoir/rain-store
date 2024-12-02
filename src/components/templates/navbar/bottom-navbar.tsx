import React from "react";
import { NavigasiFloating } from "./navigasi-floating";
import { HomeIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { validateRequest } from "@/lib/auth/validate-request";
import { ButtonProfile } from "../profile/button-profile";
import { Button } from "@/components/ui/button";

export default async function BottomNavbar() {
  const { user } = await validateRequest();
  const lists = [
    {
      title: "Home",
      icon: HomeIcon,
      path: "/",
    },
    {
      title: "Signin",
      icon: User2Icon,
      path: "/login",
    },
  ];
  return (
    <NavigasiFloating className="bottom-0 z-50 block border-b bg-background md:hidden">
      <div className="container flex flex-col space-y-2 rounded-lg py-2">
        {!user ? (
          <ul className="flex items-center justify-between">
            {lists.map((list) => (
              <li key={list.title}>
                <Link
                  href={list.path}
                  className="flex flex-col items-center justify-center gap-1"
                >
                  <list.icon size={19} />
                  <p className="text-muted-foreground">{list.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="relative">
              <HomeIcon size={19} />
            </Button>
            <ButtonProfile />
          </ul>
        )}
      </div>
    </NavigasiFloating>
  );
}
