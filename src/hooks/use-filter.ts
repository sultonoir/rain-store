import { create } from "zustand";

type FilterState = {
  min: number;
  max: number;
  discount: number;
  rating: number;
  subcategory: string;
};

interface FilterStore {
  filterOpen: boolean;
  setFilterOpen: () => void;
  filter: FilterState;
  setFilterValue: (newValue: Partial<FilterState>) => void;
}

export const useFilter = create<FilterStore>((set) => ({
  filterOpen: false,
  setFilterOpen: () => set((state) => ({ filterOpen: !state.filterOpen })),
  filter: {
    min: 0,
    max: 0,
    discount: 0,
    rating: 0,
    subcategory: "",
  },
  setFilterValue: (newValue) =>
    set((state) => ({
      filter: { ...state.filter, ...newValue },
    })),
}));
