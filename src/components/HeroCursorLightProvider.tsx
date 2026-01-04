"use client";

import React, { useEffect } from "react";

export function HeroCursorLightProvider() {
  useEffect(() => {
    function handleMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth).toFixed(4);
      const y = (e.clientY / window.innerHeight).toFixed(4);
      document.documentElement.style.setProperty("--bw-cursor-x", x);
      document.documentElement.style.setProperty("--bw-cursor-y", y);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return null;
}
