"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type DarkModeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;

      // Langsung update DOM setelah state berubah
      setTimeout(() => {
        if (newValue) {
          document.documentElement.classList.add("dark");
          console.log("✅ DARK MODE ON");
        } else {
          document.documentElement.classList.remove("dark");
          console.log("✅ LIGHT MODE ON");
        }
        console.log("📋 HTML classes:", document.documentElement.className);
      }, 0);

      return newValue;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}
