"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  X,
  Brain,
  Headphones,
  Radio,
  PlayCircle,
} from "lucide-react";
import { PROJECTS } from "@/lib/data/projects";
import type { Project } from "@/lib/types";

// Maximum vertical drift, in px, that a card may travel from its natural
// position. Keeping this small avoids overlapping the section title above.
const PARALLAX_MAX = 28;

export default function SelectedWorks() {
  const [activeJourney, setActiveJourney] = useState<Project | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = document.getElementById("selected-works");
    const grid = section?.querySelector<HTMLElement>(
      ".parallax-grid",
    );
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".parallax-audio-card"),
    );
    if (!section || !grid || !cards.length) return;

    let rafId: number | null = null;
    let pending = false;
    let mobile = window.innerWidth < 768;
    let visible = true;

    const apply = () => {
      rafId = null;
      pending = false;
      if (mobile || !visible) {
        for (let i = 0; i < cards.length; i++) {
          cards[i].style.transform = "translate3d(0, 0, 0)";
        }
        return;
      }

      // Compute progress in the range [-1, 1] based on how far the grid's
      // centre is from the viewport's centre. This means offsets stay bounded
      // and reset to zero when the grid is roughly centered on screen.
      const rect = grid.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const gridCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportH / 2;
      const raw = (gridCenter - viewportCenter) / viewportH;
      const progress = Math.max(-1, Math.min(1, raw));

      for (let i = 0; i < cards.length; i++) {
        const direction = i % 2 === 0 ? -1 : 1;
        const y = progress * PARALLAX_MAX * direction;
        cards[i].style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }
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

    // Pause parallax math while the section is offscreen.
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) apply();
        },
        { rootMargin: "200px 0px" },
      );
      io.observe(section);
    }

    for (let i = 0; i < cards.length; i++) {
      cards[i].style.willChange = "transform";
      cards[i].style.transform = "translate3d(0, 0, 0)";
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (io) io.disconnect();
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.willChange = "";
      }
    };
  }, []);

  return (
    <section
      className="bg-bg py-16 md:py-24 border-t border-stroke relative overflow-hidden transition-colors duration-500"
      id="selected-works"
    >
      <div className="absolute left-[-20%] top-[30%] w-[500px] h-[500px] rounded-full glow-aura pointer-events-none opacity-10" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 space-y-12 md:space-y-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 select-none">
          <div className="space-y-4" data-reveal data-reveal-from="up">
            <div className="flex items-center gap-3">
              <Headphones className="w-5 h-5 text-accent-light" />
              <span
                className="text-xs text-muted uppercase tracking-[0.3em] font-mono"
                data-section-pin
              >
                Neural Audio-Guides
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-text-primary uppercase font-bold">
              Somatic{" "}
              <span className="font-display italic text-accent-light lowercase">
                *waveforms*
              </span>
            </h2>

            <p className="text-sm text-muted max-w-md font-light">
              Premium acoustic matrices and visualization engines designed to
              re-structure your brainwave frequency alignments.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2 items-center"
            data-reveal
            data-reveal-from="right"
            data-reveal-delay="0.1"
          >
            <Link
              href="/info/acoustic-science"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#89AACC] uppercase bg-white/5 border border-white/10 hover:border-accent-light hover:bg-white/10 py-3.5 px-6 rounded-full transition-all duration-300"
            >
              <span>Acoustic Science &amp; Research</span>
            </Link>
            <Link
              href="/audio-guides"
              className="group inline-flex items-center gap-2 text-xs text-muted font-bold tracking-wider uppercase border border-stroke rounded-full px-6 py-3 hover:text-text-primary hover:border-transparent relative overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <span>Browse Full Library</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div
          className="parallax-grid grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pt-4 pb-12"
          data-reveal
          data-reveal-from="up"
        >
          {PROJECTS.map((journey) => (
            <div
              key={journey.id}
              className={`${journey.columnSpan} parallax-audio-card group/card relative rounded-3xl overflow-hidden bg-surface border border-stroke cursor-pointer transition-transform duration-300`}
              onClick={() => setActiveJourney(journey)}
            >
              <div
                className={`relative w-full ${journey.aspectRatio} overflow-hidden pointer-events-none`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={journey.image}
                  alt={journey.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-halftone mix-blend-multiply opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-95" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-bg via-bg/95 to-transparent flex justify-between items-end border-t border-stroke/30">
                <div className="space-y-1.5">
                  <span className="text-[9px] text-accent-light font-mono uppercase tracking-[0.2em] block">
                    {journey.category}
                  </span>
                  <h3 className="text-xl font-display font-medium text-text-primary italic">
                    {journey.title}
                  </h3>
                </div>

                <div className="w-9 h-9 rounded-full bg-stroke/50 border border-white/5 flex items-center justify-center text-text-primary/70 group-hover/card:text-accent-light group-hover/card:border-accent-light/50 transition-all duration-300 hover:scale-110">
                  <PlayCircle className="w-5 h-5 text-accent-light" />
                </div>
              </div>

              <div className="absolute -inset-[1px] rounded-3xl border border-transparent group-hover/card:border-accent-light/35 pointer-events-none transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeJourney && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveJourney(null)}
              className="absolute inset-0 bg-bg/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-2xl bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl z-20 flex flex-col"
            >
              <div className="relative h-48 md:h-64 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeJourney.image}
                  alt={activeJourney.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-halftone opacity-25 mix-blend-multiply" />
                <div className="absolute inset-y-0 inset-x-0 bg-gradient-to-t from-surface via-transparent to-black/35" />

                <button
                  onClick={() => setActiveJourney(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-bg/60 backdrop-blur-md text-text-primary hover:bg-bg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6">
                  <span className="text-[9px] text-accent-light font-mono uppercase tracking-widest block">
                    {activeJourney.category}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-display italic text-text-primary leading-tight">
                    {activeJourney.title}
                  </h4>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[50vh]">
                <div className="space-y-3">
                  <h5 className="text-xs uppercase tracking-widest text-muted font-mono">
                    Audio Guide Overview
                  </h5>
                  <p className="text-sm text-text-primary/90 leading-relaxed font-light">
                    {activeJourney.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="border border-stroke/70 bg-bg/40 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-accent-light">
                      <Brain className="w-4 h-4" />
                      <span className="text-xs font-mono uppercase tracking-widest">
                        RAS Neural Modulation
                      </span>
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">
                      Somatic wave frequencies systematically lower defense
                      signals in the cortex, welcoming higher synchronicity
                      configurations.
                    </p>
                  </div>

                  <div className="border border-stroke/70 bg-bg/40 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-accent-light">
                      <Radio className="w-4 h-4 animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-widest">
                        Coherence Alignment
                      </span>
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">
                      Syncs breathing with Solfeggio matrices and alpha noise
                      signals to foster balanced resonance.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs uppercase tracking-widest text-muted font-mono">
                    Acoustic layers
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {activeJourney.tech.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-text-primary bg-stroke/60 border border-white/5 py-1 px-3 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-stroke p-4 bg-bg/50 flex justify-between items-center">
                <Link
                  href={`/audio-guides/${activeJourney.id}`}
                  className="text-xs text-muted font-bold tracking-widest uppercase underline-offset-4 hover:text-accent-light hover:underline"
                >
                  Full deep dive &rarr;
                </Link>
                <button
                  onClick={() => {
                    setActiveJourney(null);
                    const target = document.getElementById("subscription-form");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 py-2 px-5 bg-text-primary text-bg font-bold tracking-wider text-xs uppercase rounded-full hover:opacity-90 transition-opacity"
                >
                  <span>Sync This Audio Session</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
