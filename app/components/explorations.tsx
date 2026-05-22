"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Sparkles, X, ArrowUpRight } from "lucide-react";
import { DribbbleIcon } from "./social-icons";
import { EXPLORATIONS } from "@/lib/data/explorations";
import type { ExplorationItem } from "@/lib/types";

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);
  const [activeItem, setActiveItem] = useState<ExplorationItem | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number | null = null;
    let pending = false;
    let mobile = window.innerWidth < 768;
    let visible = true;

    const apply = () => {
      rafId = null;
      pending = false;
      const container = containerRef.current;
      const col1 = col1Ref.current;
      const col2 = col2Ref.current;
      if (!container || !col1 || !col2) return;

      if (mobile || !visible) {
        col1.style.transform = "translate3d(0, 0, 0)";
        col2.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = Math.max(0, Math.min(-rect.top / scrollableHeight, 1));
      const y = progress * 160;
      col1.style.transform = `translate3d(0, ${-y}px, 0)`;
      col2.style.transform = `translate3d(0, ${y}px, 0)`;
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      rafId = requestAnimationFrame(apply);
    };

    const onResize = () => {
      mobile = window.innerWidth < 768;
      apply();
    };

    // Only run parallax math when the section is in / near the viewport.
    let io: IntersectionObserver | null = null;
    if (containerRef.current && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) apply();
        },
        { rootMargin: "150px 0px" },
      );
      io.observe(containerRef.current);
    }

    if (col1Ref.current) col1Ref.current.style.willChange = "transform";
    if (col2Ref.current) col2Ref.current.style.willChange = "transform";

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (io) io.disconnect();
    };
  }, []);

  const col1 = EXPLORATIONS.slice(0, 3);
  const col2 = EXPLORATIONS.slice(3, 6);

  return (
    <section
      ref={containerRef}
      className="relative bg-bg max-w-full min-h-screen md:min-h-[220vh] py-16 md:py-20 overflow-hidden"
      id="explorations"
    >
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-full flex justify-center items-center pointer-events-none select-none z-0">
        <div className="w-[600px] h-[600px] rounded-full bg-accent-light/5 blur-[120px] glow-aura" />
      </div>

      <div className="relative md:sticky top-0 h-auto md:h-screen max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center z-10 pointer-events-none mb-10 md:mb-0">
        <div className="w-full md:w-5/12 flex flex-col justify-center h-auto md:h-full py-10 md:py-0 pointer-events-auto select-none mt-10 md:mt-0">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-accent-light animate-pulse" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
                Explorations
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-sans tracking-tight text-text-primary leading-none uppercase">
              Visual{" "}
              <span className="font-display italic text-accent-light lowercase">
                *playground*
              </span>
            </h2>

            <p className="text-sm text-muted max-w-sm leading-relaxed">
              Procedural prototypes, mental maps, and mathematical charts
              investigating biological sync states, created as daily visual
              design workouts.
            </p>

            <div className="pt-4 flex flex-wrap gap-2">
              <Link
                href="/info/art-algorithms"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#89AACC] uppercase bg-white/5 border border-white/10 hover:border-accent-light hover:bg-white/10 py-3.5 px-6 rounded-full transition-all duration-300"
              >
                <span>Art Algorithms &amp; Math Specs</span>
              </Link>
              <Link
                href="/explorations"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted hover:text-text-primary bg-stroke/30 py-3 px-6 rounded-full border border-stroke hover:border-accent-light transition-all duration-300"
              >
                <span>Full Gallery</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted hover:text-text-primary bg-stroke/30 py-3 px-6 rounded-full border border-stroke hover:border-accent-light transition-all duration-300"
              >
                <DribbbleIcon className="w-4 h-4 text-[#ea4c89]" />
                <span>Dribbble</span>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-6/12 h-1/2 md:h-full relative overflow-visible" />
      </div>

      <div className="relative mt-8 md:-mt-[160vh] max-w-[1400px] mx-auto pointer-events-auto z-20 px-6 md:px-12 flex justify-end">
        <div className="w-full md:w-6/12 grid grid-cols-2 gap-4 md:gap-8 overflow-visible">
          <div
            ref={col1Ref}
            className="flex flex-col gap-6 md:gap-10 will-change-transform"
          >
            {col1.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`group cursor-pointer bg-surface border border-stroke rounded-2xl md:rounded-3xl p-3 select-none overflow-hidden hover:border-accent-light/40 transition-colors shadow-xl ${item.rotation}`}
              >
                <div className="aspect-square w-full rounded-xl md:rounded-2xl overflow-hidden relative mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-halftone opacity-25 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent opacity-40" />
                </div>
                <div className="px-1 space-y-0.5">
                  <span className="text-[9px] font-mono text-accent-light uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h4 className="text-xs md:text-sm font-medium text-text-primary truncate">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div
            ref={col2Ref}
            className="flex flex-col gap-6 md:gap-10 will-change-transform"
          >
            {col2.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`group cursor-pointer bg-surface border border-stroke rounded-2xl md:rounded-3xl p-3 select-none overflow-hidden hover:border-accent-light/40 transition-colors shadow-xl ${item.rotation}`}
              >
                <div className="aspect-square w-full rounded-xl md:rounded-2xl overflow-hidden relative mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-halftone opacity-25 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent opacity-40" />
                </div>
                <div className="px-1 space-y-0.5">
                  <span className="text-[9px] font-mono text-accent-light uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h4 className="text-xs md:text-sm font-medium text-text-primary truncate">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-bg/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl z-20 p-4"
            >
              <div className="relative rounded-2xl overflow-hidden bg-bg aspect-square mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-halftone opacity-15 mix-blend-multiply" />

                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-bg/60 backdrop-blur-md text-text-primary hover:bg-bg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex justify-between items-center px-1">
                <div className="space-y-1">
                  <span className="text-[10px] text-accent-light tracking-wider font-mono uppercase block">
                    {activeItem.category}
                  </span>
                  <h4 className="text-xl font-display italic text-text-primary font-semibold">
                    {activeItem.title}
                  </h4>
                </div>

                <div className="flex items-center gap-1 text-[10px] uppercase font-mono text-muted bg-bg/40 px-3 py-1 rounded-full border border-stroke">
                  <Sparkles className="w-3.5 h-3.5 text-accent-light" />
                  <span>AuraSync Studio</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
