"use client";
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BellIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotifiSidebar() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip="Notifications">
        <Link href="/dashboard/notification">
          <BellIcon />
          <span>Notifications</span>
        </Link>
      </SidebarMenuButton>
      <SidebarMenuBadge className="bg-primary">99</SidebarMenuBadge>
    </SidebarMenuItem>
  );
}
