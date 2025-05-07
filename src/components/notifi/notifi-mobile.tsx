"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ArrowLeft, BellIcon, Loader2 } from "lucide-react";
import NotifiContent from "./notifi-content";
import { ScrollArea } from "../ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAction } from "next-safe-action/hooks";
import { markAllNotifications } from "@/server/notifi/notifi-service";
import { useNotifi } from "@/hooks/use-notifi";

const NotifiMobile = () => {
  const [notifiOpen, setNotifiOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isInitialLoading, unreadCount, notifications } = useNotifi();

  const { execute, isPending } = useAction(markAllNotifications);
  function handleMarkAllAsRead() {
    execute({ notifiIds: notifications.map((notifi) => notifi.id) });
  }

  if (!isMobile) return null;

  return (
    <Sheet open={notifiOpen} onOpenChange={setNotifiOpen}>
      <SheetTrigger asChild>
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
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-full">
        <SheetHeader className="flex flex-row items-center gap-2 space-y-0 pr-4">
          <SheetClose className="flex flex-grow justify-start gap-2">
            <ArrowLeft />
            <SheetTitle>Notifications</SheetTitle>
            <SheetDescription className="sr-only">
              Select Categories
            </SheetDescription>
          </SheetClose>

          <button
            disabled={isPending}
            className="text-xs font-medium hover:underline disabled:pointer-events-none disabled:opacity-50"
            onClick={handleMarkAllAsRead}
          >
            Mark all as read
          </button>
        </SheetHeader>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="bg-border my-1 mr-4 h-px"
        ></div>
        <ScrollArea className="h-[calc(100dvh-73px)]">
          <NotifiContent />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NotifiMobile;
