import { create } from "zustand";

type View = "select" | "show";

type OpenSheet = {
  isOpen: boolean;
  min: number;
  type: View;
};
interface SheetStore {
  isOpen: boolean;
  min: number;
  type: View;
  setIsOpen: (open: boolean) => void;
  OpenSheet: (value: OpenSheet) => void;
}

const useSheet = create<SheetStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  min: 0,
  type: "show",
  OpenSheet: (value) =>
    set({ isOpen: value.isOpen, min: value.min, type: value.type }),
}));

export default useSheet;
