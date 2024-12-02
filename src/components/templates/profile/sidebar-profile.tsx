"use client";
import { UserMenulist } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarProfile() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-full max-w-[200px] flex-col gap-1 transition-all md:flex">
      {UserMenulist.map((menu) => (
        <Link
          href={menu.path}
          key={menu.title}
          className={cn("rounded-lg px-2 py-1 hover:bg-accent", {
            "bg-accent hover:bg-accent/50": pathname === menu.path,
          })}
        >
          {menu.title}
        </Link>
      ))}
    </aside>
  );
}
