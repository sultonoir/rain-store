"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "@/provider/session-provider";
import { api } from "@/trpc/react";
import { BellIcon, Check, DotIcon, Loader2 } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import React from "react";
import NotifiSkeleton from "./notifi-skeleton";
import { fromNow } from "@/lib/format-time";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InfiniteScroll } from "@/components/ui/Infinite-scroll";
import Link from "next/link";

export default function NotifiButton() {
  const { user } = useSession();
  const { data: count } = api.notifi.getCount.useQuery({
    userId: user?.id ?? "",
  });

  const ctx = api.useUtils();

  const { mutate } = api.notifi.readALL.useMutation({
    onSuccess: (data) => {
      ctx.notifi.getCount.setData({ userId: user?.id ?? "" }, (oldData) => {
        if (!oldData) {
          return data.count;
        }
        return data.count;
      });
    },
  });

  const handleHover = () => {
    mutate();
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onMouseEnter={handleHover}
        >
          <BellIcon size={19} />
          {!!count && count !== 0 && (
            <div className="absolute right-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] leading-none text-white">
              {count < 99 ? count : 99}
            </div>
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0">
        <h2 className="p-4 pb-0 font-semibold ~text-base/lg">Notifications</h2>
        <ScrollArea className="h-[300px]">
          <BodyNotification userId={user?.id ?? ""} />
        </ScrollArea>
      </HoverCardContent>
    </HoverCard>
  );
}

function BodyNotification({ userId }: { userId: string }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = api.notifi.getNotifi.useInfiniteQuery(
    {
      limit: 10,
      userId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: true, // Refetch when window is focused
    },
  );

  const notifications = React.useMemo(
    () => data?.pages.flatMap((page) => page.notifications) ?? [],
    [data],
  );

  switch (status) {
    case "pending":
      return (
        <div className="flex flex-col gap-1 p-3">
          <NotifiSkeleton />
        </div>
      );
    case "error":
      return (
        <div className="flex size-full flex-col items-center justify-center">
          <p className="rounded-full bg-blue-50 p-3 text-sm font-medium dark:bg-gray-800">
            <BellIcon className="size-6" />
          </p>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            You dont have notifications
          </p>
        </div>
      );
    case "success":
      return (
        <React.Fragment>
          {notifications.length < 1 ? (
            <div className="flex size-full flex-col items-center justify-center">
              <p className="rounded-full bg-blue-50 p-3 text-sm font-medium dark:bg-gray-800">
                <BellIcon className="size-6" />
              </p>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                You dont have notifications
              </p>
            </div>
          ) : (
            <InfiniteScroll
              onBottomReached={() =>
                hasNextPage && !isFetching && fetchNextPage()
              }
              className="flex flex-col gap-1"
            >
              {notifications.map((notif) => (
                <Link
                  href={notif.link ?? "#"}
                  key={notif.id}
                  className="relative flex space-x-4 p-3 hover:bg-accent/40"
                >
                  <div className="flex items-center">
                    {notif.notifiRead && notif.notifiRead.isRead === false && (
                      <DotIcon className="text-primary" />
                    )}
                    <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-4" />
                    </div>
                  </div>
                  <div className="flex max-w-[200px] flex-1 flex-col space-y-1">
                    <p className="text-sm">{notif.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {fromNow(notif.createdAt)}
                    </p>
                  </div>
                </Link>
              ))}
              {isFetchingNextPage && (
                <Loader2 className="mx-auto my-3 animate-spin" />
              )}
            </InfiniteScroll>
          )}
        </React.Fragment>
      );
  }
}
