import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, Calendar, Clock } from "lucide-react";
import PageShell from "@/app/components/page-shell";
import { JOURNAL_ENTRIES } from "@/lib/data/journal-entries";

export const metadata: Metadata = {
  title: "Journal — AuraSync",
  description:
    "Long-form articles on the neurobiology of belief, neuroplasticity, Solfeggio coherence, and observer-effect mindset frameworks.",
};

export default function JournalIndexPage() {
  return (
    <PageShell
      eyebrow="AuraSync Library"
      title={
        <>
          Recent{" "}
          <span className="font-display italic text-accent-light lowercase">
            *thoughts*
          </span>
        </>
      }
      description="Demystifying the connection between brain neuro-pathways and spiritual manifestation. Each article pairs cognitive science with practical protocols you can run today."
      actions={
        <Link
          href="/info/cognitive-practices"
          className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest"
        >
          <BookOpen className="w-3.5 h-3.5 text-accent-light" />
          <span>Practices Specs</span>
        </Link>
      }
    >
      <div className="space-y-4">
        {JOURNAL_ENTRIES.map((entry) => (
          <Link
            key={entry.id}
            href={`/journal/${entry.id}`}
            className="group flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-3xl md:rounded-full transition-all duration-300 relative overflow-hidden"
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
                <h2 className="text-sm md:text-base font-medium text-text-primary group-hover:text-accent-light transition-colors pr-4">
                  {entry.title}
                </h2>
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
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
