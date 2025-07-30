"use client";
import { createContext, useContext } from "react";

export const DarkModeContext = createContext<{ isDark: boolean; setIsDark: (v: boolean) => void }>({ isDark: false, setIsDark: () => {} });

export function useDarkMode() {
  return useContext(DarkModeContext);
}

// This file is no longer needed. Dark mode is always enabled.
// You can safely delete this file.
