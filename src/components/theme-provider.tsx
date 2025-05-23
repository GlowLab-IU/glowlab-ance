"use client";

import React, { ReactNode, useEffect, useState } from "react";
type ThemeProviderProps = {
  children: ReactNode;
  attribute?: string; // "class" hoặc "data-theme" vd
  defaultTheme?: "light" | "dark";
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
};

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "light",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(defaultTheme);

  // Ví dụ đơn giản, bạn có thể bổ sung logic đọc system theme hoặc lưu localStorage
  useEffect(() => {
    if (enableSystem) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, [enableSystem]);

  useEffect(() => {
    if (disableTransitionOnChange) {
      const css = document.createElement("style");
      css.appendChild(
        document.createTextNode(`* { transition: none !important; }`)
      );
      document.head.appendChild(css);
      setTimeout(() => {
        document.head.removeChild(css);
      }, 300);
    }
  }, [theme, disableTransitionOnChange]);

  useEffect(() => {
    if (attribute === "class") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else if (attribute === "data-theme") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, attribute]);

  return <>{children}</>;
}
