"use client";
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/provider/session-provider";
import { api } from "@/trpc/react";
import { BellIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotifiSidebar() {
  const { user } = useSession();
  const { data: count } = api.notifi.getCount.useQuery({
    userId: user?.id ?? "",
  });
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip="Notifications">
        <Link href="/dashboard/notification">
          <BellIcon />
          <span>Notifications</span>
        </Link>
      </SidebarMenuButton>
      {!!count && (
        <SidebarMenuBadge className="bg-primary">
          {count < 99 ? count : 99}
        </SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );
}
