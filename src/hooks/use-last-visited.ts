import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Visited {
  visited: string[] | undefined; // Ganti dengan array of strings
  add: (id: string) => void;
  remove: () => void;
}

export const useLastVisited = create<Visited>()(
  persist(
    (set) => ({
      visited: [],
      add: (id: string) =>
        set((state) => {
          // Cek apakah sudah ada `id` yang sama
          if (state.visited?.includes(id)) {
            return state; // Jika sudah ada, tidak melakukan perubahan
          }
          // Jika belum ada, tambahkan `id` ke array `visited`
          return { visited: [...(state.visited ?? []), id] };
        }),
      remove: () => set({ visited: [] }),
    }),
    { name: "visited-visited" },
  ),
);
