"use client";

import { useEffect, useRef } from "react";

export default function MoireBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ targetX: 0, targetY: 0 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX =
        (e.clientX - window.innerWidth / 2) * 0.15;
      mouseRef.current.targetY =
        (e.clientY - window.innerHeight / 2) * 0.15;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Devices with reduced-motion preference shouldn't burn cycles on the moire.
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr =
      typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    resizeCanvas();

    let angle1 = 0;
    let angle2 = 0;
    let currentX = 0;
    let currentY = 0;
    let running = true;
    let visible = true;

    // Drop the canvas to ~30fps — the user never notices on a slow ambient
    // animation, but it halves the per-second work.
    const minFrameMs = 1000 / 30;
    let lastFrame = 0;

    const draw = (time: number) => {
      requestRef.current = requestAnimationFrame(draw);
      if (!running || !visible || prefersReducedMotion) return;
      if (time - lastFrame < minFrameMs) return;
      lastFrame = time;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      currentX += (mouseRef.current.targetX - currentX) * 0.05;
      currentY += (mouseRef.current.targetY - currentY) * 0.05;

      const isLight =
        document.documentElement.getAttribute("data-theme") === "light";

      const lineColor = isLight
        ? "rgba(42, 84, 130, 0.12)"
        : "rgba(255, 255, 255, 0.13)";

      const glowColor = isLight
        ? "rgba(78, 133, 191, 0.05)"
        : "rgba(137, 170, 204, 0.04)";

      const grad = ctx.createRadialGradient(
        w / 2,
        h / 2,
        50,
        w / 2,
        h / 2,
        Math.max(w, h) / 1.5,
      );
      grad.addColorStop(0, glowColor);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = 1.2;
      angle1 += 0.003;
      angle2 -= 0.0015;

      const cx1 = w / 2 + Math.cos(angle1) * 3;
      const cy1 = h / 2 + Math.sin(angle1) * 3;
      const cx2 = w / 2 + currentX + Math.sin(angle2) * 12;
      const cy2 = h / 2 + currentY + Math.cos(angle2) * 12;

      const maxR = Math.max(w, h) * 0.9;
      // Twice the spacing → half the arcs drawn per frame.
      const step = 12;

      ctx.strokeStyle = lineColor;

      for (let r = 10; r < maxR; r += step) {
        ctx.beginPath();
        ctx.arc(cx1, cy1, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (let r = 12; r < maxR; r += step) {
        ctx.beginPath();
        ctx.arc(cx2, cy2, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    requestRef.current = requestAnimationFrame(draw);

    // Pause when the canvas is scrolled out of view — the heaviest work was
    // running even while the user was reading the footer.
    let io: IntersectionObserver | null = null;
    if (canvas.parentElement && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { rootMargin: "100px 0px" },
      );
      io.observe(canvas.parentElement);
    }

    const onVisibilityChange = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      resizeObserver.disconnect();
      if (io) io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none gpu-promoted">
      <canvas
        ref={canvasRef}
        className="w-full h-full mix-blend-screen opacity-90 transition-opacity duration-300 pointer-events-none select-none"
      />
      <div className="moire-gradient-filter transition-all duration-500" />
    </div>
  );
}
