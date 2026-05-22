import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Brain, Headphones, PlayCircle, Radio, Sparkles } from "lucide-react";
import PageShell from "@/app/components/page-shell";
import { PROJECTS } from "@/lib/data/projects";

interface GuidePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return { title: "AuraSync — Audio Guide" };
  return {
    title: `${project.title} — AuraSync`,
    description: project.description,
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <PageShell
      eyebrow={project.category}
      title={project.title}
      description={project.description}
      backHref="/audio-guides"
      backLabel="All audio guides"
      actions={
        <>
          <Link
            href="/info/acoustic-science"
            className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest"
          >
            <Headphones className="w-3.5 h-3.5 text-accent-light" />
            <span>Acoustic Science</span>
          </Link>
          <Link
            href="/calibrator"
            className="liquid-glass-button-strong text-[11px] font-mono uppercase tracking-widest"
          >
            <span>Pair with the Calibrator</span>
          </Link>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-3xl border border-stroke">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-halftone mix-blend-multiply opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-stroke/70 bg-bg/40 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-accent-light">
                <Brain className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-widest">
                  RAS Neural Modulation
                </span>
              </div>
              <p className="text-[12px] text-muted leading-relaxed font-light">
                Somatic wave frequencies systematically lower defense signals in
                the cortex, welcoming higher synchronicity configurations.
              </p>
            </div>

            <div className="border border-stroke/70 bg-bg/40 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-accent-light">
                <Radio className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest">
                  Coherence Alignment
                </span>
              </div>
              <p className="text-[12px] text-muted leading-relaxed font-light">
                Syncs breathing with Solfeggio matrices and alpha noise signals
                to foster balanced resonance.
              </p>
            </div>
          </div>

          <div className="border border-stroke bg-surface/30 rounded-3xl p-6 md:p-8 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
              How to use this guide
            </span>
            <ol className="space-y-2 text-sm text-muted leading-relaxed font-light">
              <li className="flex gap-3">
                <span className="text-accent-light font-mono">01</span>
                <span>
                  Run the AuraSync Vibration Calibrator first so the guide is
                  applied to your current somatic state rather than a generic
                  baseline.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-light font-mono">02</span>
                <span>
                  Listen on headphones in a low-light environment with 3 minutes
                  of paced breath before pressing play.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-light font-mono">03</span>
                <span>
                  Journal a single sentence afterward describing the strongest
                  somatic shift. This pins the new neural pathway.
                </span>
              </li>
            </ol>
          </div>
        </div>

        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-surface/40 border border-stroke rounded-3xl p-6 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
              Acoustic layers
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono text-text-primary bg-stroke/60 border border-white/5 py-1.5 px-3 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-surface/40 border border-stroke rounded-3xl p-6 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
              Quick switch
            </span>
            <div className="flex flex-col gap-2">
              {PROJECTS.filter((p) => p.id !== project.id).map((other) => (
                <Link
                  key={other.id}
                  href={`/audio-guides/${other.id}`}
                  className="liquid-glass-button !py-2 text-[11px] font-mono uppercase tracking-wider justify-between"
                >
                  <span className="text-left">{other.title}</span>
                  <Sparkles className="w-3.5 h-3.5 text-accent-light" />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-16 md:mt-24 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent-light">
              Continue listening
            </span>
            <h2 className="text-2xl md:text-3xl font-sans uppercase tracking-tight font-bold text-text-primary">
              Other{" "}
              <span className="font-display italic text-accent-light lowercase">
                *waveforms*
              </span>
            </h2>
            <p className="text-sm text-muted max-w-md font-light">
              Pair this guide with another resonance band. Each entry pulls a
              different brainwave anchor — alpha receptivity, theta focus,
              delta restoration.
            </p>
          </div>
          <Link
            href="/audio-guides"
            className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest self-start md:self-end"
          >
            <span>Browse all guides</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent-light" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.filter((p) => p.id !== project.id).map((other) => (
            <Link
              key={other.id}
              href={`/audio-guides/${other.id}`}
              className="group/card relative rounded-3xl overflow-hidden bg-surface border border-stroke hover:border-accent-light/40 transition-all duration-300"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={other.image}
                  alt={other.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-halftone mix-blend-multiply opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent opacity-90" />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[9px] text-accent-light font-mono uppercase tracking-[0.2em] block">
                  {other.category}
                </span>
                <h3 className="text-lg font-display italic text-text-primary font-medium leading-snug">
                  {other.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2 font-light">
                  {other.description}
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-accent-light">
                  <span>Open guide</span>
                  <PlayCircle className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
