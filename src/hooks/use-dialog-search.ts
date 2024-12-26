import { create } from "zustand";

interface DialogStore {
  active: boolean;
  setActive: (value: boolean) => void;
}

export const useDialogSearch = create<DialogStore>((set) => ({
  active: false,
  setActive: (active) => set({ active }),
}));
