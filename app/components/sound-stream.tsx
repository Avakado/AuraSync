import {
  ArrowUpRight,
  Disc3,
  ExternalLink,
  Headphones,
  Heart,
  Play,
  Radio,
  Sparkles,
  Waves,
} from "lucide-react";
import type { ReactNode } from "react";

interface SoundStreamProps {
  variant?: "section" | "compact";
  profileUrl?: string;
  curatorName?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  className?: string;
}

const DEFAULT_PROFILE_URL = "https://soundcloud.com/source-vibrations";
const DEFAULT_CURATOR = "Source Vibrations";

const FREQUENCY_STREAM = [
  {
    label: "432Hz Earth Lock",
    duration: "07:42",
    tag: "Cosmic Coherence",
    band: "α",
    color: "amber",
  },
  {
    label: "528Hz DNA Wash",
    duration: "08:11",
    tag: "Solfeggio Bloom",
    band: "β",
    color: "emerald",
  },
  {
    label: "639Hz Heart Bridge",
    duration: "09:24",
    tag: "Relational Field",
    band: "θ",
    color: "purple",
  },
  {
    label: "7.83Hz Schumann Field",
    duration: "11:08",
    tag: "Planetary Tone",
    band: "δ",
    color: "blue",
  },
];

const WAVEFORM = [
  18, 26, 14, 32, 22, 40, 28, 36, 20, 30, 16, 38, 24, 44, 18, 30, 22, 36, 26,
  42, 18, 28, 14, 34, 20, 38, 26, 30, 16, 40, 22, 34,
];

function colorClasses(color: string) {
  switch (color) {
    case "amber":
      return "bg-amber-400/15 text-amber-300 border-amber-400/30";
    case "emerald":
      return "bg-emerald-400/15 text-emerald-300 border-emerald-400/30";
    case "purple":
      return "bg-purple-400/15 text-purple-300 border-purple-400/30";
    case "blue":
      return "bg-blue-400/15 text-blue-300 border-blue-400/30";
    default:
      return "bg-white/10 text-text-primary border-white/15";
  }
}

function Waveform({
  className = "",
  reverse = false,
}: {
  className?: string;
  reverse?: boolean;
}) {
  const bars = reverse ? [...WAVEFORM].reverse() : WAVEFORM;
  return (
    <div
      className={`flex items-end justify-between gap-[3px] w-full h-full ${className}`}
      aria-hidden
    >
      {bars.map((h, i) => (
        <span
          key={i}
          className="flex-1 rounded-full bg-gradient-to-t from-accent-dark via-accent-light to-accent-light/70 animate-pulse"
          style={{
            height: `${h * 1.6}%`,
            animationDelay: `${(i % 8) * 90}ms`,
            animationDuration: `${1800 + ((i * 73) % 900)}ms`,
            opacity: 0.55 + (i % 5) * 0.09,
          }}
        />
      ))}
    </div>
  );
}

function SoundCloudGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M3 28v6m4-10v14m4-18v22m4-24v26m4-22v20m4-16v14m6-23a8 8 0 0 1 7.86 6.43A6.5 6.5 0 0 1 39 36H29V13.3A7.97 7.97 0 0 1 33 13Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StreamCard({
  profileUrl,
  curatorName,
}: {
  profileUrl: string;
  curatorName: string;
}) {
  return (
    <div className="relative bg-surface/60 border border-stroke rounded-3xl overflow-hidden shadow-[0_30px_80px_-40px_rgba(214,185,122,0.45)]">
      <div className="absolute inset-0 bg-halftone opacity-25 mix-blend-soft-light pointer-events-none" />
      <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full glow-aura opacity-40 pointer-events-none" />
      <div className="absolute -bottom-32 -left-16 w-72 h-72 rounded-full glow-aura opacity-25 pointer-events-none" />

      <div className="relative p-6 md:p-7 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl bg-accent-light/12 border border-accent-light/30 flex items-center justify-center text-accent-light">
              <SoundCloudGlyph className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 inline-flex w-2.5 h-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-accent-light block">
                Now broadcasting
              </span>
              <span className="text-base font-display italic font-semibold text-text-primary leading-tight">
                {curatorName}
              </span>
            </div>
          </div>
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${curatorName} on SoundCloud`}
            className="text-muted hover:text-text-primary transition-colors p-2 rounded-full bg-stroke/30 hover:bg-stroke"
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="relative rounded-2xl border border-stroke bg-bg/55 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-dark/30 via-transparent to-accent-light/15 pointer-events-none" />
          <div className="relative px-5 pt-5 pb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-2xl bg-accent-light text-bg flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                aria-label="Open playlist on SoundCloud"
              >
                <Play className="w-5 h-5 ml-0.5" />
              </a>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
                  Featured tone
                </span>
                <span className="text-sm font-medium text-text-primary block">
                  432Hz Earth Lock · A1
                </span>
                <span className="text-[10px] font-mono text-muted block uppercase tracking-wider">
                  Source Vibrations · 07:42
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-muted text-[10px] font-mono uppercase tracking-widest">
              <Heart className="w-3.5 h-3.5 text-accent-light" />
              <span>1.4k</span>
            </div>
          </div>

          <div className="relative px-5 pb-4">
            <div className="h-14 md:h-16">
              <Waveform />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-muted uppercase tracking-widest">
              <span>00:00</span>
              <span className="hidden md:inline">
                Sine layered · binaural pan · 528Hz under-tone
              </span>
              <span>07:42</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {FREQUENCY_STREAM.slice(1).map((track, idx) => (
            <a
              key={track.label}
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="group/track flex items-center justify-between gap-3 p-3 rounded-2xl bg-bg/40 border border-stroke/70 hover:border-accent-light/40 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[10px] font-mono text-muted tabular-nums w-5 shrink-0">
                  {String(idx + 2).padStart(2, "0")}
                </span>
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${colorClasses(track.color)}`}
                >
                  {track.band}
                </span>
                <div className="min-w-0">
                  <span className="text-sm text-text-primary font-medium block truncate">
                    {track.label}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted block truncate">
                    {track.tag}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-mono text-muted tabular-nums hidden sm:block">
                  {track.duration}
                </span>
                <Play className="w-4 h-4 text-muted group-hover/track:text-accent-light transition-colors" />
              </div>
            </a>
          ))}
        </div>

        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="liquid-glass-button-strong w-full text-[11px] font-mono uppercase tracking-widest justify-between"
        >
          <span className="flex items-center gap-2">
            <SoundCloudGlyph className="w-3.5 h-3.5 text-accent-light" />
            Listen on SoundCloud
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-accent-light" />
        </a>
      </div>
    </div>
  );
}

export default function SoundStream({
  variant = "section",
  profileUrl = DEFAULT_PROFILE_URL,
  curatorName = DEFAULT_CURATOR,
  eyebrow = "Live resonance stream",
  title,
  description,
  className,
}: SoundStreamProps) {
  if (variant === "compact") {
    return (
      <a
        href={profileUrl}
        target="_blank"
        rel="noreferrer"
        className={`group/sound block relative overflow-hidden bg-surface/40 border border-stroke rounded-3xl p-6 hover:border-accent-light/40 transition-colors ${className ?? ""}`}
      >
        <div className="absolute inset-0 bg-halftone opacity-15 mix-blend-soft-light pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full glow-aura opacity-30 pointer-events-none" />

        <div className="relative space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
                {eyebrow}
              </span>
              <span className="text-sm font-display italic text-text-primary font-semibold block">
                {title ?? `${curatorName} on SoundCloud`}
              </span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-accent-light/10 border border-accent-light/30 flex items-center justify-center text-accent-light shrink-0">
              <SoundCloudGlyph className="w-5 h-5" />
            </div>
          </div>

          {description ? (
            <p className="text-xs text-muted leading-relaxed">{description}</p>
          ) : null}

          <div className="relative h-10 rounded-xl bg-bg/55 border border-stroke px-3 py-2">
            <Waveform />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest">
            <span className="inline-flex items-center gap-2 text-accent-light">
              <Headphones className="w-3.5 h-3.5" />
              Open profile
            </span>
            <ArrowUpRight className="w-4 h-4 text-muted group-hover/sound:text-text-primary transition-colors" />
          </div>
        </div>
      </a>
    );
  }

  return (
    <section
      id="sound-stream"
      className={`relative max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28 ${className ?? ""}`}
    >
      <div className="absolute top-0 right-[10%] w-72 h-72 rounded-full glow-aura pointer-events-none opacity-15" />
      <div className="absolute bottom-0 left-[10%] w-72 h-72 rounded-full glow-aura pointer-events-none opacity-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 relative z-10">
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 text-accent-light">
            <Radio className="w-4 h-4 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] font-bold">
              {eyebrow}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-sans uppercase tracking-tight font-bold text-text-primary leading-[1.05]">
            {title ?? (
              <>
                Tune in to the{" "}
                <span className="font-display italic text-accent-light lowercase">
                  *frequency&nbsp;deck*
                </span>
              </>
            )}
          </h2>

          <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-md">
            {description ??
              `A curated SoundCloud channel of Solfeggio frequencies, binaural ambient washes, and Schumann-resonant pieces by ${curatorName}. Tap any band, open the profile, and let your nervous system entrain.`}
          </p>

          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <div className="bg-surface/40 border border-stroke rounded-2xl p-4">
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted block">
                Curator
              </span>
              <span className="text-sm text-text-primary font-medium block mt-1">
                {curatorName}
              </span>
            </div>
            <div className="bg-surface/40 border border-stroke rounded-2xl p-4">
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted block">
                Hosted on
              </span>
              <span className="text-sm text-text-primary font-medium block mt-1">
                SoundCloud
              </span>
            </div>
            <div className="bg-surface/40 border border-stroke rounded-2xl p-4">
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted block">
                Bands covered
              </span>
              <span className="text-sm text-text-primary font-medium block mt-1">
                432 · 528 · 639 · 7.83
              </span>
            </div>
            <div className="bg-surface/40 border border-stroke rounded-2xl p-4">
              <span className="text-[9px] font-mono uppercase tracking-widest text-muted block">
                Mode
              </span>
              <span className="text-sm text-text-primary font-medium block mt-1">
                Continuous stream
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-muted">
            <Waves className="w-4 h-4 text-accent-light" />
            <span>Headphones recommended · low-light room</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="liquid-glass-button-strong text-[11px] font-mono uppercase tracking-widest"
            >
              <SoundCloudGlyph className="w-3.5 h-3.5 text-accent-light" />
              <span>Open SoundCloud profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-accent-light" />
            </a>
            <a
              href="/calibrator"
              className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-light" />
              <span>Pair with calibrator</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative">
            <div className="absolute -top-3 left-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg border border-stroke text-[10px] font-mono uppercase tracking-widest text-accent-light z-10">
              <Disc3 className="w-3 h-3 animate-spin" />
              Featured deck
            </div>
            <StreamCard profileUrl={profileUrl} curatorName={curatorName} />
          </div>
        </div>
      </div>
    </section>
  );
}
