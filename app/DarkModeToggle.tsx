"use client";

import { useDarkMode } from "./DarkModeContext";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleClick = () => {
    console.log("🔘 Clicked! Current mode:", isDarkMode ? "DARK" : "LIGHT");
    toggleDarkMode();

    // Log after a tiny delay to see new state
    setTimeout(() => {
      console.log("✅ After toggle, mode is:", isDarkMode ? "DARK" : "LIGHT");
    }, 100);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
      aria-label="Toggle Dark Mode"
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <span className="text-2xl">{isDarkMode ? "☀️" : "🌙"}</span>
    </button>
  );
}
