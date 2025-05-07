"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BellIcon, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotifiContent from "./notifi-content";
import { ScrollArea } from "../ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAction } from "next-safe-action/hooks";
import { markAllNotifications } from "@/server/notifi/notifi-service";
import { useNotifi } from "@/hooks/use-notifi";

const NotifiDesktop = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const { isInitialLoading, unreadCount, notifications } = useNotifi();

  const { execute, isPending } = useAction(markAllNotifications);
  function handleMarkAllAsRead() {
    execute({ notifiIds: notifications.map((notifi) => notifi.id) });
  }

  if (isMobile) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="relative rounded-full"
          aria-label="notification button"
        >
          {isInitialLoading ? (
            <div className="bg-primary text-primary-foreground absolute top-0 -right-1 flex size-5 items-center justify-center rounded-full p-1 text-xs leading-none">
              <Loader2 className="size-3 animate-spin" />
            </div>
          ) : (
            <>
              {unreadCount > 0 && (
                <div className="bg-primary text-primary-foreground absolute top-0 -right-1 flex size-5 items-center justify-center rounded-full p-1 text-xs leading-none">
                  {unreadCount > 99 ? "99" : unreadCount}
                </div>
              )}
            </>
          )}
          <BellIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
          {!!unreadCount && (
            <button
              disabled={isPending}
              className="text-xs font-medium hover:underline disabled:pointer-events-none disabled:opacity-50"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
          )}
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="bg-border -mx-1 my-1 h-px"
        ></div>
        <ScrollArea className="h-72">
          <NotifiContent />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotifiDesktop;
