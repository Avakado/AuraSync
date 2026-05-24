"use client";

import { useEffect, useRef } from "react";

function drawArcField(
  ctx: CanvasRenderingContext2D,
  size: number,
  cx: number,
  cy: number,
  lineColor: string,
) {
  ctx.clearRect(0, 0, size, size);
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = lineColor;

  const maxR = size * 0.48;
  const step = 12;
  for (let r = 10; r < maxR; r += step) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function themeLineColor() {
  const isLight =
    document.documentElement.getAttribute("data-theme") === "light";
  return isLight ? "rgba(42, 84, 130, 0.12)" : "rgba(255, 255, 255, 0.13)";
}

/**
 * Lightweight moiré: arc fields are drawn once per resize, then rotated purely
 * via CSS (compositor thread). No rAF loop, no mousemove, no per-frame redraws.
 */
export default function MoireBackground() {
  const layerARef = useRef<HTMLCanvasElement | null>(null);
  const layerBRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const layerA = layerARef.current;
    const layerB = layerBRef.current;
    if (!layerA || !layerB) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const size = Math.round(Math.max(window.innerWidth, window.innerHeight) * 2);

    const paint = () => {
      const color = themeLineColor();
      for (const canvas of [layerA, layerB]) {
        canvas.width = Math.round(size * dpr);
        canvas.height = Math.round(size * dpr);
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
      }

      const ctxA = layerA.getContext("2d", { alpha: true });
      const ctxB = layerB.getContext("2d", { alpha: true });
      if (!ctxA || !ctxB) return;

      ctxA.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxB.setTransform(dpr, 0, 0, dpr, 0, 0);

      const center = size / 2;
      drawArcField(ctxA, size, center, center, color);
      // Slight offset on layer B — interference pattern when layers rotate.
      drawArcField(ctxB, size, center + 12, center - 8, color);
    };

    paint();

    const onResize = () => paint();
    window.addEventListener("resize", onResize, { passive: true });

    const themeObserver = new MutationObserver(() => paint());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    if (prefersReducedMotion) {
      layerA.style.animationPlayState = "paused";
      layerB.style.animationPlayState = "paused";
    }

    return () => {
      window.removeEventListener("resize", onResize);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none gpu-promoted">
      <canvas
        ref={layerARef}
        aria-hidden
        className="moire-layer moire-layer-a mix-blend-screen opacity-90"
      />
      <canvas
        ref={layerBRef}
        aria-hidden
        className="moire-layer moire-layer-b mix-blend-screen opacity-90"
      />
      <div className="moire-gradient-filter transition-all duration-500" />
    </div>
  );
}
