"use client";

import { type MenuProfileProps } from "@/types";
import React from "react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const ProfileMenu = ({ menulists }: MenuProfileProps) => {
  const router = useRouter();
  const handleSignout = async () =>
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });
  return (
    <React.Fragment>
      <DropdownMenuGroup>
        {menulists.map((item) => (
          <DropdownMenuItem asChild key={item.title}>
            <Link
              prefetch={true}
              href={item.path}
              className="flex w-full justify-between"
            >
              {item.title}
              <DropdownMenuShortcut>{item.keybind}</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleSignout}>Signout</DropdownMenuItem>
    </React.Fragment>
  );
};
