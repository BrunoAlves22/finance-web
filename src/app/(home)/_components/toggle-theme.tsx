"use client";

import { Sun, Moon } from "lucide-react";
import { useToggleStore } from "@/stores/toggle-store";
import { useEffect } from "react";

export function ToggleTheme() {
  const { setIsToggle, isToggled } = useToggleStore();

  useEffect(() => {
    document.body.classList.toggle("dark", isToggled);
  }, [isToggled]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={setIsToggle}
        className="rounded-lg bg-black bg-opacity-[3%] p-2 text-black dark:bg-white dark:bg-opacity-[3%] dark:text-white"
      >
        {isToggled ? <Moon /> : <Sun />}
      </button>
    </div>
  );
}
