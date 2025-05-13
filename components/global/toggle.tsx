"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      onClick={toggleTheme}
      className="cursor-pointer relative group w-8 h-8 flex items-center justify-center"
      title="Toggle Theme"
    >
     
      <div className="absolute w-6 h-6 bg-gray-300 dark:bg-white opacity-0 group-hover:opacity-15 rounded-full transition-all duration-300 scale-95 group-hover:scale-100 z-0"></div>

   
      <Sun className="w-4 h-4 text-gray-600 dark:text-white transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0 z-10" />
      <Moon className="absolute w-4 h-4 text-gray-600 dark:text-white transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100 z-10" />


      <span className="sr-only">Toggle theme</span>
    </div>
  );
}
