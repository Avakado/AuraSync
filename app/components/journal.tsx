"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Calendar,
  ArrowUpRight,
  X,
  Clock,
  Brain,
  Sparkles,
} from "lucide-react";
import { JOURNAL_ENTRIES } from "@/lib/data/journal-entries";
import type { JournalEntry } from "@/lib/types";

export default function Journal() {
  const [activeArticle, setActiveArticle] = useState<JournalEntry | null>(null);

  return (
    <section className="bg-bg py-20 border-t border-stroke" id="journal-section">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4" data-reveal data-reveal-from="up">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-stroke shrink-0" />
              <span
                className="text-xs text-muted uppercase tracking-[0.3em]"
                data-section-pin
              >
                Insights &amp; Science
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-text-primary uppercase">
              Recent{" "}
              <span className="font-display italic text-accent-light lowercase">
                *thoughts*
              </span>
            </h2>

            <p className="text-sm text-muted max-w-md">
              Demystifying the connection between brain neuro-pathways and
              spiritual manifestation. Practical biological insights.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2"
            data-reveal
            data-reveal-from="right"
            data-reveal-delay="0.1"
          >
            <Link
              href="/info/cognitive-practices"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#89AACC] uppercase bg-white/5 border border-white/10 hover:border-accent-light hover:bg-white/10 py-3.5 px-6 rounded-full transition-all duration-300"
            >
              <span>Practices Science &amp; schedules</span>
            </Link>
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 group text-xs text-muted font-bold tracking-wider uppercase border border-stroke rounded-full px-6 py-3 hover:text-text-primary transition-all duration-300"
            >
              <span>Read All Articles</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {JOURNAL_ENTRIES.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              onClick={() => setActiveArticle(entry)}
              className="group flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[32px] md:rounded-full cursor-pointer transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row items-center gap-5 w-full md:w-auto">
                <div className="w-20 h-20 md:w-14 md:h-14 rounded-full overflow-hidden shrink-0 border border-stroke">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5">
                    <span className="text-[10px] text-accent-light tracking-wider font-mono uppercase bg-stroke/50 px-2.5 py-0.5 rounded-full">
                      {entry.category}
                    </span>
                    <span className="text-[10px] text-muted font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {entry.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm md:text-base font-medium text-text-primary group-hover:text-accent-light transition-colors line-clamp-1 pr-4">
                    {entry.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 md:pr-4 w-full md:w-auto justify-between md:justify-end border-t border-stroke/30 md:border-none pt-3 md:pt-0">
                <span className="text-xs text-muted font-mono flex items-center gap-1.5 pl-2 md:pl-0">
                  <Calendar className="w-3.5 h-3.5" />
                  {entry.date}
                </span>

                <div className="w-7 h-7 rounded-full bg-stroke/10 flex items-center justify-center text-text-primary group-hover:bg-accent-light group-hover:text-bg transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              <div className="absolute -inset-[1px] rounded-[32px] md:rounded-full border border-transparent group-hover:border-accent-light/30 pointer-events-none transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="absolute inset-0 bg-bg/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 30 }}
              className="relative w-full max-w-3xl bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl z-20 flex flex-col"
            >
              <div className="p-4 md:p-6 border-b border-stroke flex justify-between items-center bg-bg/55">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-accent-light" />
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
                    AuraSync Neuro-Cognitive Library
                  </span>
                </div>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-full bg-stroke/55 hover:bg-stroke text-text-primary transition-colors"
                  aria-label="Close article"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 md:p-10 space-y-6 overflow-y-auto max-h-[70vh] no-scrollbar">
                <div className="text-center space-y-3 pb-6 border-b border-stroke/50">
                  <span className="text-xs text-accent-light uppercase tracking-widest font-mono">
                    {activeArticle.category}
                  </span>

                  <h1 className="text-3xl md:text-4xl font-display italic text-text-primary leading-tight max-w-2xl mx-auto">
                    {activeArticle.title}
                  </h1>

                  <div className="flex justify-center items-center gap-4 text-xs text-muted font-mono">
                    <span>{activeArticle.date}</span>
                    <span>•</span>
                    <span>{activeArticle.readTime}</span>
                  </div>
                </div>

                <div className="text-text-primary/95 leading-relaxed space-y-6 font-light text-sm md:text-base">
                  {activeArticle.content.split("\n\n").map((para, idx) => {
                    if (para.startsWith("###")) {
                      return (
                        <h3
                          key={idx}
                          className="text-lg md:text-xl font-medium text-text-primary font-sans pt-4 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-accent-light rounded-full" />
                          {para.replace("###", "").trim()}
                        </h3>
                      );
                    }
                    if (para.startsWith("-")) {
                      return (
                        <ul
                          key={idx}
                          className="space-y-2.5 pl-4 list-none text-muted"
                        >
                          {para.split("\n").map((li, lidx) => (
                            <li key={lidx} className="flex gap-2 items-start">
                              <Sparkles className="w-3.5 h-3.5 text-accent-light shrink-0 mt-1" />
                              <span>{li.replace("-", "").trim()}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p
                        key={idx}
                        className="text-sm md:text-base leading-relaxed text-muted font-sans font-light"
                      >
                        {para}
                      </p>
                    );
                  })}
                </div>

                <div className="p-5 bg-bg/50 border border-stroke rounded-2xl flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="p-3 bg-stroke rounded-xl text-accent-light">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-text-primary">
                      Cognitive Integration Prompt
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      To help lock in these synaptic networks, take 3 slow
                      diaphragmatic breaths while holding the visualization of
                      your desire. Try writing it out in our Vibration Sync
                      Widget.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-stroke p-4 bg-bg/55 flex justify-between items-center">
                <Link
                  href={`/journal/${activeArticle.id}`}
                  className="text-[11px] uppercase tracking-widest font-bold text-accent-light hover:underline underline-offset-4"
                >
                  Open full article page &rarr;
                </Link>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    const target = document.getElementById("vibe-calculator");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full text-[11px] uppercase tracking-widest font-bold py-2 px-5 accent-gradient text-bg"
                >
                  Test My Brainwave Sync
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
