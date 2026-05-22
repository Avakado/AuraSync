import Link from "next/link";
import type { Metadata } from "next";
import { Headphones, PlayCircle } from "lucide-react";
import PageShell from "@/app/components/page-shell";
import { PROJECTS } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Neural Audio Guides — AuraSync",
  description:
    "AuraSync's full library of neuro-acoustic guides: Solfeggio matrices, binaural deltas, and synaptic focus weavers.",
};

export default function AudioGuidesPage() {
  return (
    <PageShell
      eyebrow="Neural Audio Guides"
      title={
        <>
          Somatic{" "}
          <span className="font-display italic text-accent-light lowercase">
            *waveforms*
          </span>
        </>
      }
      description="Premium acoustic matrices and visualization engines designed to re-structure your brainwave frequency alignments. Each guide is calibrated against EEG-validated entrainment data."
      actions={
        <>
          <Link
            href="/info/acoustic-science"
            className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest"
          >
            <Headphones className="w-3.5 h-3.5 text-accent-light" />
            <span>Acoustic Research</span>
          </Link>
          <Link
            href="/calibrator"
            className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest"
          >
            <span>Diagnose First</span>
          </Link>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <Link
            key={project.id}
            href={`/audio-guides/${project.id}`}
            className="group/card relative rounded-3xl overflow-hidden bg-surface border border-stroke hover:border-accent-light/40 transition-all duration-300"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-halftone mix-blend-multiply opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent opacity-90" />
            </div>

            <div className="p-5 md:p-6 space-y-2">
              <span className="text-[9px] text-accent-light font-mono uppercase tracking-[0.2em] block">
                {project.category}
              </span>
              <h3 className="text-xl font-display italic text-text-primary font-medium leading-snug">
                {project.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed line-clamp-3 font-light">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-text-primary bg-stroke/60 border border-white/5 py-1 px-2.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-3 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-accent-light">
                <span>Open deep dive</span>
                <PlayCircle className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
