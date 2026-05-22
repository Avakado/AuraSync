import Link from "next/link";
import type { Metadata } from "next";
import { Compass } from "lucide-react";
import PageShell from "@/app/components/page-shell";
import { DribbbleIcon } from "@/app/components/social-icons";
import { EXPLORATIONS } from "@/lib/data/explorations";

export const metadata: Metadata = {
  title: "Visual Playground — AuraSync",
  description:
    "Procedural prototypes, mental maps, and mathematical charts investigating biological sync states.",
};

export default function ExplorationsPage() {
  return (
    <PageShell
      eyebrow="Visual Playground"
      title={
        <>
          Visual{" "}
          <span className="font-display italic text-accent-light lowercase">
            *playground*
          </span>
        </>
      }
      description="Procedural prototypes, mental maps, and mathematical charts investigating biological sync states, created as daily visual design workouts."
      actions={
        <>
          <Link
            href="/info/art-algorithms"
            className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest"
          >
            <Compass className="w-3.5 h-3.5 text-accent-light" />
            <span>Art Algorithms</span>
          </Link>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest"
          >
            <DribbbleIcon className="w-3.5 h-3.5 text-[#ea4c89]" />
            <span>Dribbble</span>
          </a>
        </>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {EXPLORATIONS.map((item) => (
          <div
            key={item.id}
            className={`group bg-surface border border-stroke rounded-2xl md:rounded-3xl p-3 select-none overflow-hidden hover:border-accent-light/40 transition-colors shadow-xl ${item.rotation}`}
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
              <h2 className="text-sm font-medium text-text-primary truncate">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
