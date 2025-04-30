import { create } from "zustand";

interface CartStore {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const useDialogSignin = create<CartStore>((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
