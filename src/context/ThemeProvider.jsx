import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme === "light" ? "light-theme" : "dark-theme"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
