
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
    
    // Then, check system preference if no stored theme
    if (!storedTheme) {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? "dark" : "light";
    }
    
    return storedTheme;
  });

  // Apply theme when component mounts and whenever theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both classes to ensure clean state
    root.classList.remove("light", "dark");
    // Add the current theme class
    root.classList.add(theme);
    
    // Save theme preference to localStorage
    setLocalStorage("skycast-theme", theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update theme based on system preference if user hasn't set a preference
      if (!getLocalStorage("skycast-theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    
    // Add event listener using the method appropriate for the browser
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // For older browsers
      mediaQuery.addListener(handleChange);
    }
    
    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // For older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

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
