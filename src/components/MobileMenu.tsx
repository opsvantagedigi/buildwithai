"use client";

import { useEffect } from "react";

export function MobileMenuController() {
  useEffect(() => {
    const toggle = document.querySelector(".bw-mobile-menu-toggle");
    const menu = document.querySelector(".bw-mobile-menu");

    if (!toggle || !menu) return;

    const onClick = () => menu.classList.toggle("open");

    toggle.addEventListener("click", onClick);
    return () => toggle.removeEventListener("click", onClick);
  }, []);

  return null;
}
