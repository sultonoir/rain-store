"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import React, { useCallback, useEffect } from "react";
import NotifiMobile from "./notifi-mobile";
import NotifiDesktop from "./notifi-desktop";
import { useNotifi } from "@/hooks/use-notifi";
import { getUserNotifications } from "@/server/notifi/notifi-service";
import { Notifi } from "@/server/notifi/notifi-input";
import { supabase } from "@/lib/supabase/client";

const Notifibutton = ({ userId }: { userId: string }) => {
  const {
    setNotifications,
    setUnreadCount,
    setIsInitialLoading,
    setNextCursor,
    updateNotifi,
  } = useNotifi();
  const initialLoad = useCallback(async () => {
    setIsInitialLoading(true);
    try {
      const result = await getUserNotifications({
        userId,
        cursorId: null,
      });
      setNextCursor(result.nextCursor);
      setNotifications(result.notifications);
      setUnreadCount(result.unreadCount);
    } finally {
      setIsInitialLoading(false);
    }
  }, [
    setIsInitialLoading,
    setNextCursor,
    setNotifications,
    setUnreadCount,
    userId,
  ]);

  useEffect(() => {
    initialLoad();
  }, [initialLoad]);

  const created = useCallback(
    (newNotifi: Notifi) => {
      // Using functional updates to ensure we're working with the latest state
      setNotifications(newNotifi.notifications);

      setUnreadCount(newNotifi.unreadCount);
    },
    [setNotifications, setUnreadCount],
  );

  const edit = useCallback(
    (newNotifi: Notifi) => {
      updateNotifi(newNotifi.notifications);

      setUnreadCount(newNotifi.unreadCount);

      setNextCursor(newNotifi.nextCursor);
    },
    [setNextCursor, setUnreadCount, updateNotifi],
  );

  useEffect(() => {
    const channel = supabase
      .channel(userId)
      .on("broadcast", { event: "message" }, (payload) => {
        created(payload.payload as Notifi);
      })
      .on("broadcast", { event: "edit" }, (payload) => {
        edit(payload.payload as Notifi);
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [created, edit, userId]);

  const isMobile = useIsMobile();
  if (isMobile) {
    return <NotifiMobile />;
  }
  return <NotifiDesktop />;
};

export default Notifibutton;
