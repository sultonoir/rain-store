
import type { Variant } from "@prisma/client";
import { create } from "zustand";

interface SizesStore {
  sizes?: Variant
  setSizes: (values: Variant| undefined) => void;
}

export const useSizes = create<SizesStore>((set) => ({
  sizes: undefined,
  setSizes: (values: Variant| undefined) => set({ sizes: values }),
}));
