import { type FormatCart } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Aritmatic = {
  id: string;
  amount: number;
};
interface Cart {
  cart: FormatCart[]; // Change this to a non-optional array
  add: (values: FormatCart) => void;
  remove: (id: string) => void;
  mutate: (values: Aritmatic) => void;
  clear: () => void;
}

export const useCart = create<Cart>()(
  persist(
    (set) => ({
      cart: [], // Initialize cart as an empty array
      mutate: ({ id, amount }: Aritmatic) =>
        set((state) => {
          // Find the item to decrement
          const updatedCart = state.cart.map((item) =>
            item.id === id
              ? { ...item, amount } // Prevent negative amount
              : item,
          );
          return { cart: updatedCart };
        }),
      add: (values: FormatCart) =>
        set((state) => {
          // Cek apakah ada item dengan id dan size yang sama
          const existingItem = state.cart.find(
            (item) =>
              item.productId === values.productId && item.size === values.size,
          );

          if (existingItem) {
            // Jika item ditemukan, update amount
            const updatedCart = state.cart.map((item) =>
              item.productId === values.productId && item.size === values.size
                ? { ...item, amount: item.amount + values.amount }
                : item,
            );
            return { cart: updatedCart };
          }

          // Jika item tidak ditemukan, tambahkan item baru ke cart
          return { cart: [...state.cart, values] };
        }),
      remove: (id: string) =>
        set((state) => {
          // Find the item to decrement
          const updatedCart = state.cart.filter((item) => item.id !== id);
          return { cart: updatedCart };
        }),
      clear: () => set({ cart: [] }),
    }),
    { name: "cart-cart" },
  ),
);
