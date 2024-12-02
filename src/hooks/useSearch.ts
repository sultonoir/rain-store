import { create } from "zustand";
import { persist } from "zustand/middleware";

interface searchvalue {
  id: string;
  name: string;
}

interface SearchState {
  search: searchvalue[] | undefined;
  add: (values: searchvalue) => void;
  remove: () => void;
}

export const useSearch = create<SearchState>()(
  persist(
    (set) => ({
      search: [],
      add: (by: searchvalue) =>
        set((state) => ({ search: [...(state.search ?? []), by] })),
      remove: () => set({ search: [] }),
    }),
    { name: "recent-search" },
  ),
);
