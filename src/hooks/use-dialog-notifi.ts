import { create } from "zustand";

interface NotifiStore {
  notifiOpen: boolean;
  setNotifiOpen: () => void;
}

export const useDialogNotifi = create<NotifiStore>((set) => ({
  notifiOpen: false,
  setNotifiOpen: () => set((state) => ({ notifiOpen: !state.notifiOpen })),
}));
