"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminMenulist, UserMenulist } from "@/lib/constants";
import React from "react";
import { ProfileMenu } from "./profile-menu";
import { Image } from "@unpic/react/nextjs";
import { blurhashToDataUri } from "@unpic/placeholder";

interface ProfileButtonProps {
  role?: string | null;
  name: string;
  email: string;
  image?: string | null;
}

export function ProfileButton({
  role,
  name,
  email,
  image,
}: ProfileButtonProps) {
  const menulist = () => {
    if (role === "admin") {
      return AdminMenulist;
    } else if (role === "write") {
      return Object.values(
        [...AdminMenulist, ...UserMenulist].reduce(
          (acc, item) => {
            acc[item.title] = item; // Menyimpan item unik berdasarkan title sebagai key
            return acc;
          },
          {} as Record<string, (typeof AdminMenulist)[number]>,
        ),
      );
    } else {
      return UserMenulist;
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden rounded-full"
        >
          <Image
            src={image ?? "/avatar.png"}
            background={blurhashToDataUri(
              "U8R3TWt7~qxu%MfQayj[?bj[D*ayoffQWBay",
            )}
            alt={name}
            width={32}
            height={32}
            className="rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium capitalize">
              {name}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ProfileMenu menulists={menulist()} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
