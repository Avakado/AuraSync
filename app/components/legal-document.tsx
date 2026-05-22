import type { ReactNode } from "react";

interface LegalSection {
  heading: string;
  body: ReactNode;
}

export function LegalDocument({
  intro,
  lastUpdated,
  sections,
}: {
  intro: ReactNode;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <aside className="lg:col-span-4 space-y-5">
        <div className="bg-surface/40 border border-stroke rounded-3xl p-6 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
            Last updated
          </span>
          <p className="text-sm text-text-primary font-medium">{lastUpdated}</p>
          <p className="text-xs text-muted leading-relaxed">
            We notify subscribers whenever this document is materially revised.
          </p>
        </div>
        <nav className="bg-surface/40 border border-stroke rounded-3xl p-6 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light block">
            On this page
          </span>
          <ul className="flex flex-col gap-1.5 text-xs font-mono uppercase tracking-wider text-muted">
            {sections.map((section, idx) => (
              <li key={section.heading}>
                <a
                  href={`#section-${idx + 1}`}
                  className="hover:text-text-primary transition-colors"
                >
                  {String(idx + 1).padStart(2, "0")} · {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <article className="lg:col-span-8 space-y-8 text-sm md:text-[15px] leading-relaxed text-muted font-light">
        <div className="text-base md:text-lg text-text-primary/90 font-light leading-relaxed">
          {intro}
        </div>

        {sections.map((section, idx) => (
          <section
            key={section.heading}
            id={`section-${idx + 1}`}
            className="space-y-3 scroll-mt-28"
          >
            <h2 className="text-xl md:text-2xl font-sans uppercase tracking-tight font-bold text-text-primary flex items-center gap-3">
              <span className="text-accent-light font-mono text-xs">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {section.heading}
            </h2>
            <div className="space-y-3">{section.body}</div>
          </section>
        ))}
      </article>
    </div>
  );
}
