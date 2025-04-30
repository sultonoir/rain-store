import { create } from "zustand";

interface CartStore {
  permission: NotificationPermission;
  setPermission: (permission: NotificationPermission) => void;
}

export const usePermission = create<CartStore>((set) => ({
  permission: "default",
  setPermission: (permission: NotificationPermission) => set({ permission }),
}));
