import Link from "next/link";
import type { Metadata } from "next";
import { Brain, Cpu, Radio, ShieldCheck, Sparkles } from "lucide-react";
import PageShell from "@/app/components/page-shell";
import VibrationCalculator from "@/app/components/vibration-calculator";
import SoundStream from "@/app/components/sound-stream";

export const metadata: Metadata = {
  title: "Vibration Calibrator — AuraSync",
  description:
    "Run AuraSync's neuro-manifestation calibrator. A four-step quiz that maps your current somatic state to a personalized resonance frequency.",
};

const STAGES = [
  {
    icon: Radio,
    label: "Step 01 — Intent vector",
    desc: "Plain-language description of the manifestation target. Becomes the seed string for the RAS rewrite.",
  },
  {
    icon: Sparkles,
    label: "Step 02 — Somatic energy",
    desc: "Index your current body energy from quiet stillness up to gamma expansion.",
  },
  {
    icon: Brain,
    label: "Step 03 — Attention coherence",
    desc: "Identify whether your focus is scattered, linear, diffuse-receptive, or in coherent flow.",
  },
  {
    icon: ShieldCheck,
    label: "Step 04 — Limiting resistance",
    desc: "Surface the primary neurological inhibitor — overthinking, friction, limbic fear, or burnout.",
  },
];

const OUTCOMES = [
  {
    label: "Current Frequency",
    desc: "An estimated synchronized Hz value bridging your brain state with intent vector.",
  },
  {
    label: "RAS Filtration Status",
    desc: "A short status describing how cleanly your reticular activating system is currently filtering signal.",
  },
  {
    label: "Neuroplastic Insight",
    desc: "A short paragraph translating your inputs into synaptic firing and myelin behavior.",
  },
  {
    label: "Metaphysical Bridge",
    desc: "How that neural state collapses into manifestation probability — the wave-to-particle handoff.",
  },
  {
    label: "Sync Routines",
    desc: "Three targeted somatic routines you can deploy in the next 24 hours.",
  },
  {
    label: "Custom Affirmation",
    desc: "A tailored decree calibrated to your declared desire.",
  },
];

export default function CalibratorPage() {
  return (
    <PageShell
      eyebrow="Vibration Calibrator"
      title={
        <>
          Calibrate your{" "}
          <span className="font-display italic text-accent-light lowercase">
            *frequency*
          </span>
        </>
      }
      description="A four-step diagnostic that translates current energy, focus, and resistance into a Gemini-powered neuro-manifestation report. Inputs are mapped to RAS filtration, neuroplastic state, and a personalized affirmation."
      actions={
        <>
          <Link
            href="/info/calibrator-blueprint"
            className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest"
          >
            <Cpu className="w-3.5 h-3.5 text-accent-light" />
            <span>Read the Blueprint</span>
          </Link>
          <Link
            href="/audio-guides"
            className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest"
          >
            <span>Pair with Audio Guides</span>
          </Link>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface/40 border border-stroke rounded-3xl p-6 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
              How it runs
            </span>
            <div className="space-y-3">
              {STAGES.map((stage) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.label}
                    className="flex items-start gap-3 p-3 bg-bg/40 border border-stroke/70 rounded-2xl"
                  >
                    <div className="p-2 rounded-xl bg-accent-light/10 text-accent-light border border-accent-light/20 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-text-primary font-bold block">
                        {stage.label}
                      </span>
                      <p className="text-[12px] text-muted leading-relaxed font-light">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-surface/40 border border-stroke rounded-3xl p-6 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
              What you receive
            </span>
            <div className="grid grid-cols-1 gap-2">
              {OUTCOMES.map((o) => (
                <div
                  key={o.label}
                  className="bg-bg/40 border border-stroke/70 p-3 rounded-xl"
                >
                  <span className="text-[11px] font-mono text-text-primary font-bold uppercase tracking-widest block">
                    {o.label}
                  </span>
                  <p className="text-[12px] text-muted leading-relaxed font-light mt-1">
                    {o.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <SoundStream
            variant="compact"
            eyebrow="Companion frequencies"
            title="Run the calibrator with sound"
            description="Press play on the curated SoundCloud set while you complete the quiz. Headphones recommended — the 528Hz and Schumann bands tune your nervous system to receive the report."
          />
        </div>

        <div className="lg:col-span-7">
          <div className="sticky top-6">
            <VibrationCalculator />
          </div>
        </div>
      </div>

      <section className="mt-16 md:mt-24">
        <SoundStream
          eyebrow="Tune the room"
          title={
            <>
              The official{" "}
              <span className="font-display italic text-accent-light lowercase">
                *frequency&nbsp;deck*
              </span>
            </>
          }
          description="A full SoundCloud playlist of healing tones, binaural ambient tracks, and Solfeggio harmonics. Recommended pairing with each calibrator output so your nervous system anchors the new resonance map."
          className="!px-0 !py-0"
        />
      </section>
    </PageShell>
  );
}
