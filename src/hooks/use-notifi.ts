import { NotificationWithRead } from "@/server/notifi/notifi-input";
import { create } from "zustand";

interface NotifiStore {
  unreadCount: number;
  setUnreadCount: (value: number) => void;
  notifications: NotificationWithRead[];
  setNotifications: (value: NotificationWithRead[]) => void;
  updateNotifi: (value: NotificationWithRead[]) => void;
  isInitialLoading: boolean;
  nextCursor: string | null;
  userId: string;
  setUserId: (value: string) => void;
  setNextCursor: (value: string | null) => void;
  setIsInitialLoading: (value: boolean) => void;
}

export const useNotifi = create<NotifiStore>((set) => ({
  unreadCount: 0,
  setUnreadCount: (value) => set({ unreadCount: value }),
  notifications: [],
  setNotifications: (value) =>
    set((prev) => ({ notifications: [...value, ...prev.notifications] })),
  isInitialLoading: false,
  setIsInitialLoading: (value) => set({ isInitialLoading: value }),
  nextCursor: null,
  setNextCursor: (value) => set({ nextCursor: value }),
  userId: "",
  setUserId: (value) => set({ userId: value }),
  updateNotifi: (value) => set({ notifications: value }),
}));
