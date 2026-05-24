"use client";

import { useEffect } from "react";

/**
 * Pauses decorative `animate-*` loops (pulse / bounce / spin / ping / hero-*)
 * while the user is actively scrolling, then resumes them shortly after.
 *
 * Done via a body class (`is-scrolling`) — CSS does the actual pausing in
 * globals.css, so this hook stays cheap (single passive listener + rAF debounce).
 *
 * Recovers ~5–10 ms/frame during scroll on mid-range devices.
 */
export default function ScrollPerfBoost() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const body = document.body;
    if (!body) return;

    let scrollEndTimer: number | null = null;
    let pending = false;

    const onScroll = () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(() => {
          pending = false;
          if (!body.classList.contains("is-scrolling")) {
            body.classList.add("is-scrolling");
          }
        });
      }
      if (scrollEndTimer !== null) window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        body.classList.remove("is-scrolling");
        scrollEndTimer = null;
      }, 160);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollEndTimer !== null) window.clearTimeout(scrollEndTimer);
      body.classList.remove("is-scrolling");
    };
  }, []);

  return null;
}
