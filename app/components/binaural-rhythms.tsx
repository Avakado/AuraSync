"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Headphones,
  Radio,
  Sun,
  Waves,
} from "lucide-react";
import {
  BINAURAL_BANDS,
  DAILY_RHYTHMS,
  HOURLY_RHYTHMS,
  bandById,
  carrierPair,
} from "@/lib/data/binaural-rhythms";

type RhythmTab = "daily" | "hourly";

function colorClasses(color: string) {
  const map: Record<string, string> = {
    indigo: "text-indigo-300 border-indigo-400/40 bg-indigo-400/10",
    violet: "text-violet-300 border-violet-400/40 bg-violet-400/10",
    emerald: "text-emerald-300 border-emerald-400/40 bg-emerald-400/10",
    amber: "text-amber-300 border-amber-400/40 bg-amber-400/10",
    rose: "text-rose-300 border-rose-400/40 bg-rose-400/10",
  };
  return map[color] ?? "text-accent-light border-accent-light/40 bg-accent-light/10";
}

function MiniWaveform({ active }: { active?: boolean }) {
  const bars = [3, 5, 8, 6, 9, 5, 7, 4, 8, 6, 5, 9, 4, 7, 5];
  return (
    <div className="flex items-end gap-[3px] h-8" aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full bg-accent-light/70 ${active ? "animate-pulse" : "opacity-40"}`}
          style={{
            height: `${h * 3}px`,
            animationDelay: active ? `${i * 0.08}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}

export default function BinauralRhythms() {
  const [tab, setTab] = useState<RhythmTab>("daily");
  const previewSlot = DAILY_RHYTHMS[1];
  const previewBand = bandById(previewSlot.bandId);
  const carriers = carrierPair(previewSlot.beatHz, previewBand?.carrierBase ?? 240);

  return (
    <section
      id="binaural-rhythms"
      className="relative bg-bg py-20 md:py-28 border-t border-stroke overflow-hidden"
    >
      <div className="absolute left-[-15%] top-[20%] w-[420px] h-[420px] rounded-full glow-aura pointer-events-none opacity-10" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 space-y-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="space-y-4 max-w-xl" data-reveal data-reveal-from="up">
            <div className="flex items-center gap-2 text-accent-light">
              <Waves className="w-4 h-4" />
              <span
                className="text-[11px] font-mono uppercase tracking-[0.3em] font-bold"
                data-section-pin
              >
                Neural entrainment
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-text-primary uppercase font-bold leading-[1.05]">
              Binaural{" "}
              <span className="font-display italic text-accent-light lowercase">
                *rhythms*
              </span>
            </h2>

            <p className="text-sm md:text-base text-muted font-light leading-relaxed">
              Two slightly different tones — one per ear — and your brain locks
              onto the difference as a rhythmic pulse. That pulse nudges your
              dominant brainwave toward Delta, Theta, Alpha, Beta, or Gamma.
              AuraSync maps both{" "}
              <strong className="text-text-primary font-normal">daily</strong>{" "}
              circadian windows and{" "}
              <strong className="text-text-primary font-normal">hourly</strong>{" "}
              90-minute ultradian cycles so you know exactly what to run, and
              when.
            </p>

            <Link
              href="/binaural-rhythms"
              className="liquid-glass-button-strong inline-flex text-[11px] font-mono uppercase tracking-widest mt-2"
            >
              <Headphones className="w-3.5 h-3.5 text-accent-light" />
              <span>Full setup guide</span>
              <ArrowRight className="w-3.5 h-3.5 text-accent-light" />
            </Link>
          </div>

          <div
            className="w-full lg:max-w-md rounded-3xl bg-surface/50 border border-stroke p-5 space-y-4"
            data-reveal
            data-reveal-from="right"
            data-reveal-delay="0.1"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                Live carrier preview
              </span>
              <Radio className="w-3.5 h-3.5 text-accent-light animate-pulse" />
            </div>
            <MiniWaveform active />
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-bg/50 border border-stroke p-3">
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted block">
                  Left
                </span>
                <span className="text-sm font-display text-text-primary tabular-nums">
                  {carriers.left}Hz
                </span>
              </div>
              <div className="rounded-xl bg-accent-light/10 border border-accent-light/30 p-3">
                <span className="text-[9px] font-mono uppercase tracking-widest text-accent-light block">
                  Beat
                </span>
                <span className="text-sm font-display text-accent-light tabular-nums">
                  {carriers.beat}Hz
                </span>
              </div>
              <div className="rounded-xl bg-bg/50 border border-stroke p-3">
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted block">
                  Right
                </span>
                <span className="text-sm font-display text-text-primary tabular-nums">
                  {carriers.right}Hz
                </span>
              </div>
            </div>
            <p className="text-[11px] text-muted leading-relaxed">
              Example: {previewSlot.label} ({previewSlot.window}) — brain
              entrainment toward {previewBand?.name} ({previewSlot.beatHz}Hz).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BINAURAL_BANDS.map((band) => (
            <div
              key={band.id}
              className={`rounded-2xl border p-4 space-y-2 ${colorClasses(band.color)}`}
              data-reveal
              data-reveal-from="scale"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-80 block">
                {band.rangeLabel}
              </span>
              <span className="text-lg font-display italic text-text-primary block">
                {band.name}
              </span>
              <span className="text-[11px] opacity-90 block leading-snug">
                {band.state}
              </span>
              <span className="text-[10px] font-mono tabular-nums opacity-70 block">
                {band.beatHz}Hz beat
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-5" data-reveal data-reveal-from="up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
                Rhythm schedules
              </span>
              <h3 className="text-xl font-sans uppercase text-text-primary font-bold">
                Daily vs hourly protocols
              </h3>
            </div>

            <div className="inline-flex rounded-full border border-stroke bg-bg/40 p-1">
              <button
                type="button"
                onClick={() => setTab("daily")}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-colors ${tab === "daily" ? "bg-accent-light/15 text-text-primary border border-accent-light/40" : "text-muted hover:text-text-primary"}`}
              >
                <Sun className="w-3 h-3" />
                Daily
              </button>
              <button
                type="button"
                onClick={() => setTab("hourly")}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-colors ${tab === "hourly" ? "bg-accent-light/15 text-text-primary border border-accent-light/40" : "text-muted hover:text-text-primary"}`}
              >
                <Clock className="w-3 h-3" />
                Hourly
              </button>
            </div>
          </div>

          {tab === "daily" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DAILY_RHYTHMS.map((slot) => {
                const band = bandById(slot.bandId);
                return (
                  <div
                    key={slot.id}
                    className="rounded-2xl border border-stroke bg-surface/30 p-4 space-y-2 hover:border-accent-light/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
                          {slot.window}
                        </span>
                        <h4 className="text-sm font-semibold text-text-primary">
                          {slot.label}
                        </h4>
                      </div>
                      <span
                        className={`shrink-0 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full border ${band ? colorClasses(band.color) : ""}`}
                      >
                        {slot.beatHz}Hz · {band?.name}
                      </span>
                    </div>
                    <p className="text-[12px] text-muted leading-relaxed">
                      {slot.intent}
                    </p>
                    <span className="text-[10px] font-mono text-muted/80 uppercase tracking-wider block">
                      {slot.duration}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {HOURLY_RHYTHMS.map((phase, idx) => {
                const band = bandById(phase.bandId);
                return (
                  <div
                    key={phase.id}
                    className="relative rounded-2xl border border-stroke bg-surface/30 p-4 space-y-2"
                  >
                    <span className="absolute top-3 right-3 text-[10px] font-mono text-muted tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
                      {phase.minutes}
                    </span>
                    <h4 className="text-sm font-semibold text-text-primary pr-6">
                      {phase.phase}
                    </h4>
                    <p className="text-[12px] text-muted leading-relaxed">
                      {phase.intent}
                    </p>
                    <span
                      className={`inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${band ? colorClasses(band.color) : ""}`}
                    >
                      {phase.beatHz}Hz {band?.name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-[11px] text-muted font-mono uppercase tracking-widest text-center pt-2">
            {tab === "daily"
              ? "Circadian map · 24-hour biological clock"
              : "Ultradian map · repeat every 90 minutes inside any focus block"}
          </p>
        </div>
      </div>
    </section>
  );
}
