import Link from "next/link";
import type { Metadata } from "next";
import {
  Brain,
  Clock,
  Headphones,
  Radio,
  Settings2,
  Sun,
  Waves,
} from "lucide-react";
import PageShell from "@/app/components/page-shell";
import SoundStream from "@/app/components/sound-stream";
import {
  BINAURAL_BANDS,
  DAILY_RHYTHMS,
  HOURLY_RHYTHMS,
  SETUP_STEPS,
  bandById,
  carrierPair,
} from "@/lib/data/binaural-rhythms";

export const metadata: Metadata = {
  title: "Binaural Rhythms — AuraSync",
  description:
    "Learn how binaural beats work, configure daily circadian and hourly ultradian entrainment schedules, and pair them with AuraSync audio guides.",
};

export default function BinauralRhythmsPage() {
  return (
    <PageShell
      eyebrow="Neural entrainment protocol"
      title={
        <>
          Binaural{" "}
          <span className="font-display italic text-accent-light lowercase">
            *rhythms*
          </span>
        </>
      }
      description="How binaural beats entrain brainwaves, how to configure carrier frequencies and beat offsets, and when to run daily circadian vs hourly ultradian sessions."
      actions={
        <>
          <Link
            href="/calibrator"
            className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest"
          >
            <Radio className="w-3.5 h-3.5 text-accent-light" />
            <span>Pair with calibrator</span>
          </Link>
          <Link
            href="/audio-guides"
            className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest"
          >
            <span>Audio guides library</span>
          </Link>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <article className="bg-surface/40 border border-stroke rounded-3xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2 text-accent-light">
              <Brain className="w-4 h-4" />
              <h2 className="text-xs font-mono uppercase tracking-widest">
                How binaural beats work
              </h2>
            </div>
            <div className="space-y-3 text-sm text-text-primary/90 leading-relaxed font-light">
              <p>
                When each ear hears a slightly different pure tone — for example
                240 Hz in the left channel and 250 Hz in the right — the brain
                does not hear two separate notes. Instead, the auditory cortex
                synthesizes a third, pulsing rhythm at the{" "}
                <strong className="font-normal text-text-primary">
                  difference frequency
                </strong>{" "}
                (here, 10 Hz). That perceived pulse is the binaural beat.
              </p>
              <p>
                Over 8–15 minutes of continuous listening, this external rhythm
                can{" "}
                <strong className="font-normal text-text-primary">
                  frequency-follow
                </strong>{" "}
                (entrain) your dominant brainwave toward the target band — Delta
                for sleep, Theta for creative drift, Alpha for calm focus, Beta
                for execution, Gamma for short insight bursts.
              </p>
              <p className="text-muted">
                The effect requires true stereo separation. Speakers, mono
                playback, or low-quality earbuds that leak between channels will
                weaken or eliminate the beat entirely.
              </p>
            </div>
          </article>

          <article className="space-y-4">
            <div className="flex items-center gap-2 text-accent-light">
              <Waves className="w-4 h-4" />
              <h2 className="text-xs font-mono uppercase tracking-widest">
                Brainwave bands & carrier math
              </h2>
            </div>
            <div className="space-y-3">
              {BINAURAL_BANDS.map((band) => {
                const pair = carrierPair(band.beatHz, band.carrierBase);
                return (
                  <div
                    key={band.id}
                    className="p-4 border border-stroke bg-bg/25 rounded-2xl space-y-2"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-light" />
                        {band.name}{" "}
                        <span className="font-mono text-muted font-normal">
                          ({band.rangeLabel})
                        </span>
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light tabular-nums">
                        L {pair.left} · R {pair.right} → {pair.beat}Hz beat
                      </span>
                    </div>
                    <p className="text-[13px] text-muted leading-relaxed font-light pl-3.5">
                      {band.description}
                    </p>
                    <span className="text-[10px] font-mono text-muted/80 uppercase tracking-wider pl-3.5 block">
                      Best for: {band.state}
                    </span>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="space-y-4">
            <div className="flex items-center gap-2 text-accent-light">
              <Settings2 className="w-4 h-4" />
              <h2 className="text-xs font-mono uppercase tracking-widest">
                Configuration checklist
              </h2>
            </div>
            <div className="space-y-3">
              {SETUP_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="flex gap-4 p-4 border border-stroke bg-surface/30 rounded-2xl"
                >
                  <span className="shrink-0 w-8 h-8 rounded-xl bg-accent-light/10 border border-accent-light/30 flex items-center justify-center text-xs font-mono font-bold text-accent-light">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="text-[13px] text-muted leading-relaxed font-light">
                      {step.body}
                    </p>
                    {step.detail ? (
                      <p className="text-[11px] text-muted/80 font-mono leading-relaxed pt-1">
                        {step.detail}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside className="lg:col-span-5 space-y-6">
          <div className="sticky top-6 space-y-6">
            <div className="bg-surface/40 border border-stroke rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-accent-light">
                <Headphones className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                  Quick-start recipe
                </span>
              </div>
              <ol className="space-y-3 text-[12px] text-muted leading-relaxed list-none">
                <li className="flex gap-2">
                  <span className="text-accent-light font-mono">01</span>
                  <span>
                    Put on closed-back headphones. Volume low — the beat should
                    feel subliminal.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-light font-mono">02</span>
                  <span>
                    Pick a schedule below (daily window or hourly phase).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-light font-mono">03</span>
                  <span>
                    Set left/right carriers from the band table. Run for the
                    listed duration.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-light font-mono">04</span>
                  <span>
                    Fade out over 60 seconds. Log how you feel — adjust beat ±2
                    Hz next session.
                  </span>
                </li>
              </ol>
              <Link
                href="/#sound-stream"
                className="liquid-glass-button-strong w-full text-[11px] font-mono uppercase tracking-widest justify-center"
              >
                Open frequency deck
              </Link>
            </div>

            <SoundStream
              variant="compact"
              eyebrow="Practice stack"
              title="Layer binaural + Solfeggio"
              description="Run a binaural entrainment block first, then cross-fade into the SoundCloud frequency deck for the same Hz band."
            />
          </div>
        </aside>
      </div>

      <section className="mt-16 md:mt-20 space-y-6">
        <div className="flex items-center gap-2 text-accent-light">
          <Sun className="w-4 h-4" />
          <h2 className="text-xs font-mono uppercase tracking-widest">
            Daily rhythms · circadian 24h map
          </h2>
        </div>
        <p className="text-sm text-muted max-w-3xl font-light leading-relaxed">
          Daily rhythms align binaural sessions with your biological clock —
          cortisol peaks, melatonin onset, and natural energy valleys. Match the
          beat band to what your nervous system is already trying to do at that
          hour.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DAILY_RHYTHMS.map((slot) => {
            const band = bandById(slot.bandId);
            const pair = carrierPair(slot.beatHz, band?.carrierBase ?? 240);
            return (
              <div
                key={slot.id}
                className="rounded-2xl border border-stroke bg-surface/30 p-5 space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
                      {slot.window}
                    </span>
                    <h3 className="text-base font-semibold text-text-primary">
                      {slot.label}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                    {slot.duration}
                  </span>
                </div>
                <p className="text-[13px] text-muted leading-relaxed">
                  {slot.intent}
                </p>
                <div className="flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-widest">
                  <span className="px-2 py-1 rounded-full bg-accent-light/10 border border-accent-light/30 text-accent-light">
                    {band?.name} · {slot.beatHz}Hz
                  </span>
                  <span className="px-2 py-1 rounded-full bg-bg/50 border border-stroke text-muted tabular-nums">
                    L {pair.left} / R {pair.right}
                  </span>
                </div>
                <p className="text-[11px] text-muted/90 italic">{slot.tip}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16 md:mt-20 space-y-6">
        <div className="flex items-center gap-2 text-accent-light">
          <Clock className="w-4 h-4" />
          <h2 className="text-xs font-mono uppercase tracking-widest">
            Hourly rhythms · 90-minute ultradian cycle
          </h2>
        </div>
        <p className="text-sm text-muted max-w-3xl font-light leading-relaxed">
          Inside any deep-work day, the brain naturally pulses through roughly
          90-minute focus/rest cycles (ultradian rhythms). Hourly protocols
          mirror that architecture: Beta sprints, Alpha micro-breaks, and Theta
          recovery — repeated across the day without fighting your biology.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOURLY_RHYTHMS.map((phase, idx) => {
            const band = bandById(phase.bandId);
            const pair = carrierPair(phase.beatHz, band?.carrierBase ?? 240);
            return (
              <div
                key={phase.id}
                className="relative rounded-2xl border border-stroke bg-surface/30 p-5 space-y-3"
              >
                <span className="absolute top-4 right-4 text-[10px] font-mono text-muted tabular-nums">
                  {String(idx + 1).padStart(2, "0")}/04
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
                  {phase.minutes}
                </span>
                <h3 className="text-sm font-semibold text-text-primary pr-8">
                  {phase.phase}
                </h3>
                <p className="text-[12px] text-muted leading-relaxed">
                  {phase.intent}
                </p>
                <p className="text-[11px] text-text-primary/80 leading-relaxed">
                  {phase.action}
                </p>
                <span className="text-[10px] font-mono text-muted tabular-nums block">
                  {band?.name} · L {pair.left} / R {pair.right}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16 md:mt-24">
        <SoundStream
          eyebrow="Entrainment companion"
          title={
            <>
              Run rhythms with the{" "}
              <span className="font-display italic text-accent-light lowercase">
                *frequency&nbsp;deck*
              </span>
            </>
          }
          description="After your binaural block, cross-fade into curated Solfeggio and ambient tracks on SoundCloud — matched Hz bands for sleep, focus, and heart coherence."
          className="!px-0 !py-0"
        />
      </section>
    </PageShell>
  );
}
