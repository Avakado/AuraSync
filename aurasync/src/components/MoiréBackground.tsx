import { useEffect, useRef, useState } from "react";

export default function MoiréBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to client window values
      setMouse((prev) => ({
        ...prev,
        targetX: (e.clientX - window.innerWidth / 2) * 0.15,
        targetY: (e.clientY - window.innerHeight / 2) * 0.15,
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    resizeCanvas();

    let angle1 = 0;
    let angle2 = 0;
    let currentX = 0;
    let currentY = 0;

    const draw = () => {
      if (!ctx || !canvas) return;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Interpolate mouse coordinates for fluid dampening
      currentX += (mouse.targetX - currentX) * 0.05;
      currentY += (mouse.targetY - currentY) * 0.05;

      // Detect current theme by looking at document element
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      
      // Select appropriate theme colors for lines
      const lineColor = isLight 
        ? "rgba(42, 84, 130, 0.12)"   // soft slate blue in day mode
        : "rgba(255, 255, 255, 0.13)"; // crisp white in dark mode

      const glowColor = isLight
        ? "rgba(78, 133, 191, 0.05)"
        : "rgba(137, 170, 204, 0.04)";

      // Draw an optional faint central aura wash
      ctx.beginPath();
      const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, Math.max(w, h) / 1.5);
      grad.addColorStop(0, glowColor);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = 1.2;

      // Central rotation variables
      angle1 += 0.003;
      angle2 -= 0.0015;

      // 1. First concentric set of rings (stationary center + subtle orbit)
      const cx1 = w / 2 + Math.cos(angle1) * 3;
      const cy1 = h / 2 + Math.sin(angle1) * 3;
      
      // 2. Second set of rings (offset center driven by mouse + orbit to create interference)
      // The offset creates the incredible moiré lines!
      const cx2 = w / 2 + currentX + Math.sin(angle2) * 12;
      const cy2 = h / 2 + currentY + Math.cos(angle2) * 12;

      const maxR = Math.max(w, h) * 0.9;
      const step = 6; // Rings spacing (fine density looks incredibly premium!)

      // Draw layers
      ctx.strokeStyle = lineColor;

      // Draw Ring Set 1
      for (let r = 10; r < maxR; r += step) {
        ctx.beginPath();
        ctx.arc(cx1, cy1, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw Ring Set 2 (slightly different center makes the interference pattern!)
      for (let r = 12; r < maxR; r += step) {
        ctx.beginPath();
        ctx.arc(cx2, cy2, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      requestRef.current = requestAnimationFrame(draw);
    };

    requestRef.current = requestAnimationFrame(draw);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [mouse]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full mix-blend-screen opacity-90 transition-opacity duration-300 pointer-events-none select-none animate-fade-in"
      />
      {/* Dynamic Cosmic Gradient Filter Overlay requested by User */}
      <div className="moire-gradient-filter transition-all duration-500" />
    </div>
  );
}
