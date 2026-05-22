import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Brain, Calendar, Clock, Sparkles } from "lucide-react";
import PageShell from "@/app/components/page-shell";
import { JOURNAL_ENTRIES } from "@/lib/data/journal-entries";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return JOURNAL_ENTRIES.map((entry) => ({ id: entry.id }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const entry = JOURNAL_ENTRIES.find((e) => e.id === id);
  if (!entry) return { title: "AuraSync — Journal" };
  return {
    title: `${entry.title} — AuraSync`,
    description: entry.content.split("\n")[0].slice(0, 160),
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const entry = JOURNAL_ENTRIES.find((e) => e.id === id);
  if (!entry) notFound();

  return (
    <PageShell
      eyebrow={entry.category}
      title={entry.title}
      description={
        <div className="flex items-center gap-4 text-xs text-muted font-mono uppercase tracking-widest">
          <span>{entry.date}</span>
          <span>•</span>
          <span>{entry.readTime}</span>
        </div>
      }
      backHref="/journal"
      backLabel="All articles"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8 space-y-6">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl border border-stroke">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={entry.image}
              alt={entry.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-halftone mix-blend-multiply opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
          </div>

          <div className="space-y-5 text-text-primary/90 leading-relaxed font-light text-base">
            {entry.content.split("\n\n").map((para, idx) => {
              if (para.startsWith("###")) {
                return (
                  <h2
                    key={idx}
                    className="text-xl md:text-2xl font-medium text-text-primary font-sans pt-4 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-accent-light rounded-full" />
                    {para.replace("###", "").trim()}
                  </h2>
                );
              }
              if (para.startsWith("-")) {
                return (
                  <ul key={idx} className="space-y-2 pl-4 list-none text-muted">
                    {para
                      .split("\n")
                      .filter((li) => li.trim())
                      .map((li, lidx) => (
                        <li key={lidx} className="flex gap-2 items-start">
                          <Sparkles className="w-3.5 h-3.5 text-accent-light shrink-0 mt-1.5" />
                          <span>{li.replace(/^-\s*/, "").trim()}</span>
                        </li>
                      ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-muted leading-relaxed">
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
              <h3 className="text-xs font-mono uppercase tracking-wider text-text-primary">
                Cognitive Integration Prompt
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Take three slow diaphragmatic breaths while holding the
                visualization of your desire. Then open the AuraSync Vibration
                Calibrator and journal the strongest somatic shift.
              </p>
            </div>
          </div>
        </article>

        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-surface/40 border border-stroke rounded-3xl p-6 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
              Apply this article
            </span>
            <p className="text-xs text-muted leading-relaxed">
              Run the Vibration Calibrator to convert these ideas into a
              personalized resonance map.
            </p>
            <Link
              href="/calibrator"
              className="liquid-glass-button-strong w-full text-xs uppercase tracking-widest font-bold"
            >
              <span>Open the Calibrator</span>
            </Link>
          </div>

          <div className="bg-surface/40 border border-stroke rounded-3xl p-6 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
              Continue reading
            </span>
            <div className="flex flex-col gap-2">
              {JOURNAL_ENTRIES.filter((e) => e.id !== entry.id).map((other) => (
                <Link
                  key={other.id}
                  href={`/journal/${other.id}`}
                  className="liquid-glass-button !py-2 text-[11px] font-mono uppercase tracking-wider justify-between"
                >
                  <span className="text-left line-clamp-1">{other.title}</span>
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
              More from the journal
            </span>
            <h2 className="text-2xl md:text-3xl font-sans uppercase tracking-tight font-bold text-text-primary">
              Continue your{" "}
              <span className="font-display italic text-accent-light lowercase">
                *integration*
              </span>
            </h2>
            <p className="text-sm text-muted max-w-md font-light">
              Adjacent thoughts and research notes — pick the thread that
              matches your current frequency.
            </p>
          </div>
          <Link
            href="/journal"
            className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest self-start md:self-end"
          >
            <span>All articles</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent-light" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOURNAL_ENTRIES.filter((e) => e.id !== entry.id).map((other) => (
            <Link
              key={other.id}
              href={`/journal/${other.id}`}
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
                <h3 className="text-lg font-display italic text-text-primary font-medium leading-snug line-clamp-2">
                  {other.title}
                </h3>
                <div className="flex items-center gap-3 pt-1 text-[10px] font-mono uppercase tracking-wider text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {other.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {other.readTime}
                  </span>
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-accent-light">
                  <span>Read article</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
