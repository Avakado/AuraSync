import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

interface PageShellProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  backHref?: string;
  backLabel?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function PageShell({
  eyebrow,
  title,
  description,
  backHref = "/",
  backLabel = "Return to home",
  actions,
  children,
}: PageShellProps) {
  return (
    <main className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <div className="absolute top-[10%] right-[12%] w-96 h-96 rounded-full glow-aura pointer-events-none opacity-20" />
      <div className="absolute bottom-[15%] left-[5%] w-[450px] h-[450px] rounded-full glow-aura pointer-events-none opacity-10" />

      <section className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-[calc(var(--site-header-h)+1.5rem)] md:pt-[calc(var(--site-header-h)+2rem)] pb-10">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{backLabel}</span>
        </Link>

        <div className="space-y-5 max-w-3xl">
          {eyebrow && (
            <div className="flex items-center gap-2 text-accent-light">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] font-bold">
                {eyebrow}
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-sans tracking-tight text-text-primary uppercase font-bold leading-[1.05]">
            {title}
          </h1>

          {description && (
            <div className="text-sm md:text-base text-muted max-w-2xl font-light leading-relaxed">
              {description}
            </div>
          )}

          {actions && <div className="flex flex-wrap gap-2 pt-2">{actions}</div>}
        </div>
      </section>

      <section className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pb-24">
        {children}
      </section>
    </main>
  );
}
