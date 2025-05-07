import React, { useCallback, useMemo, useState } from "react";
import InfiniteContainer from "../ui/infinite-container";
import { Loader2 } from "lucide-react";
import NotifiCard from "./notifi-card";
import NotifiEmpty from "./notifi-empty";
import { useNotifi } from "@/hooks/use-notifi";
import { getUserNotifications } from "@/server/notifi/notifi-service";
import { NotificationWithRead } from "@/server/notifi/notifi-input";

const NotifiContent = () => {
  const { notifications: initalNotification, userId } = useNotifi();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [notifications, setNotifications] = useState<NotificationWithRead[]>(
    [],
  );
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const loadMore = useCallback(async () => {
    setIsFetchingMore(true);
    try {
      const result = await getUserNotifications({
        userId,
        cursorId: nextCursor,
      });

      setNotifications((prev) => [...prev, ...result.notifications]);
      setNextCursor(result.nextCursor);
    } finally {
      setIsFetchingMore(false);
    }
  }, [nextCursor, userId]);

  const allNotifi = useMemo(() => {
    const mergedNotifi = [...initalNotification, ...notifications];
    // Remove duplicates based on message id
    const uniqueNotifi = mergedNotifi.filter(
      (message, index, self) =>
        index === self.findIndex((m) => m.id === message.id),
    );
    return uniqueNotifi;
  }, [initalNotification, notifications]);

  if (allNotifi.length === 0) {
    return <NotifiEmpty />;
  }

  return (
    <div className="pr-4">
      <InfiniteContainer
        onBottomReached={async () => {
          if (nextCursor !== null) {
            await loadMore();
          }
        }}
        className="flex flex-col"
      >
        {allNotifi.map((notification) => (
          <NotifiCard key={notification.id} notification={notification} />
        ))}
        {isFetchingMore && <Loader2 className="mx-auto my-3 animate-spin" />}
      </InfiniteContainer>
    </div>
  );
};

export default NotifiContent;
