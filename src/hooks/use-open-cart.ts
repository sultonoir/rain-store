import { create } from "zustand";

interface CartStore {
  cartOpen: boolean;
  setCartOpen: () => void;
}

const useOpenCart = create<CartStore>((set) => ({
  cartOpen: false,
  setCartOpen: () => set((state) => ({ cartOpen: !state.cartOpen })),
}));

export default useOpenCart;
