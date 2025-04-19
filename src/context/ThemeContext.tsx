
import React, { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "@/lib/utils";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // First, check localStorage
    const storedTheme = getLocalStorage<Theme>("skycast-theme", "light");
    
    // Then, check system preference as a fallback
    if (!storedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
    }
    
    return storedTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    setLocalStorage("skycast-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

