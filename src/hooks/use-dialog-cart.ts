import { create } from "zustand";

interface CartStore {
  cartOpen: boolean;
  setCartOpen: () => void;
}

export const useDialogCart = create<CartStore>((set) => ({
  cartOpen: false,
  setCartOpen: () => set((state) => ({ cartOpen: !state.cartOpen })),
}));
