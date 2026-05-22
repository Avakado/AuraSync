import Link from "next/link";
import type { Metadata } from "next";
import {
  Activity,
  BrainCircuit,
  HeartHandshake,
  Orbit,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";
import PageShell from "@/app/components/page-shell";
import { STATS } from "@/lib/data/stats";

export const metadata: Metadata = {
  title: "Clinical Outcomes — AuraSync",
  description:
    "Empirical clinical outcome metrics from AuraSync's 2,400-member decentralized lab cohort.",
};

const ICONS: ReactNode[] = [
  <BrainCircuit key="b" className="w-5 h-5 text-accent-light" />,
  <Orbit key="o" className="w-5 h-5 text-accent-light" />,
  <Activity key="a" className="w-5 h-5 text-accent-light" />,
  <ShieldCheck key="s" className="w-5 h-5 text-accent-light" />,
  <HeartHandshake key="h" className="w-5 h-5 text-accent-light" />,
];

const DETAIL_NOTES = [
  "Sample collection follows blind-protocol intake at three checkpoints across a fourteen-day window. The number reported is the median delta against baseline, not best-case.",
  "528Hz is held as the standard solfeggio anchor across all cohort sessions. Coherence is measured at the audible-band tap on the parietal lobe sensor set.",
  "Reticular Activating System filtration is quantified by environmental cue-spotting tasks pre/post calibration. Speed-up is reported per validated sub-task pair.",
  "Cortisol delta is measured via salivary assay morning and evening across the practice window. The number shown is the average shift, not a peak reduction.",
  "Vagal coherence is tracked through HRV time-domain and frequency-domain analysis with respiration normalization across the session.",
];

export default function StatsPage() {
  return (
    <PageShell
      eyebrow="Empirical Clinical Outcome"
      title={
        <>
          Somatic{" "}
          <span className="font-display italic text-accent-light lowercase">
            *restructuring metrics*
          </span>
        </>
      }
      description="Diagnostic measurements gathered across 2,400 active practitioners in AuraSync's decentralized laboratory environments. The numbers below are median outcomes, not best-case highlights."
      actions={
        <Link
          href="/info/biometric-testing"
          className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest"
        >
          <span>Read the cohort brief</span>
        </Link>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STATS.map((stat, idx) => (
          <div
            key={stat.label}
            className="space-y-4 p-6 bg-surface/20 rounded-3xl border border-stroke/50 hover:border-accent-light/30 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-stroke/30 flex items-center justify-center p-2 text-accent-light">
              {ICONS[idx]}
            </div>

            <div className="space-y-1">
              <span className="text-4xl md:text-5xl font-display font-medium text-text-primary block tracking-tighter">
                {stat.metric}
              </span>
              <span className="text-[10px] text-accent-light uppercase font-mono tracking-widest block font-bold">
                {stat.label}
              </span>
            </div>

            <p className="text-xs text-muted leading-relaxed font-light">
              {stat.subText}
            </p>

            <div className="pt-3 border-t border-stroke/30 text-[11px] text-muted/80 leading-relaxed font-light">
              {DETAIL_NOTES[idx]}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface/30 border border-stroke rounded-3xl p-6 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
            Methodology snapshot
          </span>
          <p className="text-sm text-muted leading-relaxed font-light">
            Cohort sessions follow a 14-day intake. Every participant runs the
            Vibration Calibrator on day 1 and day 14, with daily acoustic
            sessions in between. EEG arrays, salivary cortisol assays, and HRV
            sensors are sampled at intake, midpoint, and outflow.
          </p>
        </div>
        <div className="bg-surface/30 border border-stroke rounded-3xl p-6 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
            How to read this page
          </span>
          <p className="text-sm text-muted leading-relaxed font-light">
            Each metric is a median delta against a participant&apos;s own
            baseline. None of the numbers are peak responses or selected
            highlights — outliers in either direction are excluded by
            interquartile filtering before reporting.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
