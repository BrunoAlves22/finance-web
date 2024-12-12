import { create } from "zustand";

type ToggleStore = {
  isToggled: boolean;
  setIsToggle: () => void;
};

export const useToggleStore = create<ToggleStore>((set) => ({
  isToggled: false,
  setIsToggle: () => set((state) => ({ isToggled: !state.isToggled })),
}));
