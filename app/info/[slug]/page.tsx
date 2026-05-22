import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Activity, Compass, Cpu } from "lucide-react";
import PageShell from "@/app/components/page-shell";
import { INFO_SECTIONS } from "@/lib/data/info-sections";

interface InfoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(INFO_SECTIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: InfoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const info = INFO_SECTIONS[slug];
  if (!info) return { title: "AuraSync — Information" };
  return {
    title: `${info.title} — AuraSync`,
    description: info.subtitle,
  };
}

export default async function InfoPage({ params }: InfoPageProps) {
  const { slug } = await params;
  const info = INFO_SECTIONS[slug];

  if (!info) notFound();

  return (
    <PageShell
      eyebrow={info.badge}
      title={info.title}
      description={info.subtitle}
      actions={
        <Link
          href="/"
          className="liquid-glass-button text-[11px] font-mono uppercase tracking-widest"
        >
          <span>Return to Core Grid</span>
        </Link>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <article className="bg-surface/40 border border-stroke rounded-3xl p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2 text-accent-light">
              <Compass className="w-4 h-4" />
              <h2 className="text-xs font-mono uppercase tracking-widest">
                Overview
              </h2>
            </div>
            <p className="text-sm md:text-base text-text-primary/90 leading-relaxed font-light">
              {info.description}
            </p>
          </article>

          <article className="space-y-4">
            <div className="flex items-center gap-2 text-accent-light">
              <Activity className="w-4 h-4" />
              <h2 className="text-xs font-mono uppercase tracking-widest">
                Core Biological Modulators
              </h2>
            </div>
            <div className="space-y-3">
              {info.insights.map((insight) => (
                <div
                  key={insight.title}
                  className="p-4 border border-stroke bg-bg/25 rounded-2xl space-y-1.5"
                >
                  <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-light" />
                    {insight.title}
                  </h3>
                  <p className="text-[13px] text-muted leading-relaxed font-light pl-3.5">
                    {insight.desc}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="space-y-4">
            <div className="flex items-center gap-2 text-accent-light">
              <Cpu className="w-4 h-4" />
              <h2 className="text-xs font-mono uppercase tracking-widest">
                Long-form Brief
              </h2>
            </div>
            <div className="space-y-4 text-sm md:text-base text-muted leading-relaxed font-light bg-surface/30 border border-stroke rounded-3xl p-6 md:p-8">
              {info.longRead.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </article>
        </div>

        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-surface/40 border border-stroke rounded-3xl p-6 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
              Diagnostic Outcome
            </span>
            <div className="space-y-2">
              {info.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-bg/40 border border-stroke/70 p-3.5 rounded-xl flex items-center justify-between gap-3"
                >
                  <span className="text-[11px] text-muted font-mono">
                    {metric.label}
                  </span>
                  <span className="text-xs font-bold text-text-primary uppercase font-mono text-right">
                    {metric.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#89AACC]/5 border border-[#89AACC]/15 rounded-3xl p-6 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
              Cross-link the protocol
            </span>
            <p className="text-xs text-muted leading-relaxed">
              Each AuraSync surface bridges biology and intention. Continue with
              a related sector to keep your neural model coherent.
            </p>
            <div className="flex flex-col gap-2">
              {Object.values(INFO_SECTIONS)
                .filter((other) => other.slug !== info.slug)
                .map((other) => (
                  <Link
                    key={other.slug}
                    href={`/info/${other.slug}`}
                    className="liquid-glass-button !py-2 text-[11px] font-mono uppercase tracking-wider justify-between"
                  >
                    <span className="text-left">{other.title}</span>
                    <span className="text-accent-light">&rarr;</span>
                  </Link>
                ))}
            </div>
          </div>

          <div className="bg-surface/40 border border-stroke rounded-3xl p-6 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
              Next action
            </span>
            <p className="text-xs text-muted leading-relaxed">
              Run the AuraSync Vibration Calibrator to translate this brief into
              a personalized resonance map.
            </p>
            <Link
              href="/calibrator"
              className="liquid-glass-button-strong w-full text-xs uppercase tracking-widest font-bold"
            >
              <span>Open Vibration Calibrator</span>
            </Link>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
