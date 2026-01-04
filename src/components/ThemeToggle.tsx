"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("bw-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored as "dark" | "light");
      document.documentElement.classList.toggle("light", stored === "light");
    } else {
      // default dark
      document.documentElement.classList.remove("light");
      window.localStorage.setItem("bw-theme", "dark");
    }
  }, []);

  useEffect(() => {
    const header = document.querySelector(".cinematic-header");

    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 10) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    window.localStorage.setItem("bw-theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="bw-theme-toggle"
      aria-label="Toggle color theme"
    >
      <span className="bw-theme-toggle-thumb">{theme === "dark" ? "☾" : "☼"}</span>
    </button>
  );
}
