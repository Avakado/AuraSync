"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { MOBILE_NAV, PRIMARY_NAV, type NavLink } from "@/lib/nav-links";
import { useTheme } from "./theme-provider";

function AuraLogo({ pulse = false }: { pulse?: boolean }) {
  return (
    <div className="relative w-9 h-9 flex items-center justify-center">
      {pulse ? (
        <div className="absolute inset-0 bg-accent-light/30 blur-md rounded-full animate-pulse pointer-events-none" />
      ) : null}
      <svg width="28" height="28" viewBox="0 0 100 100" aria-hidden>
        <circle cx="35" cy="50" r="20" fill="var(--accent-light)" className="opacity-80" />
        <circle cx="65" cy="50" r="20" fill="var(--accent-light)" className="opacity-80" />
        <circle cx="50" cy="35" r="20" fill="var(--accent-dark)" className="opacity-80" />
        <circle cx="50" cy="65" r="20" fill="var(--accent-dark)" className="opacity-80" />
        <circle cx="50" cy="50" r="10" fill="#fff" />
      </svg>
    </div>
  );
}

function isActive(pathname: string, link: NavLink) {
  if (link.kind === "home") return pathname === "/";
  return pathname === link.href || pathname.startsWith(`${link.href}/`);
}

interface SiteNavProps {
  /** In-flow nav inside the hero (home). Fixed transparent overlay on inner pages. */
  variant?: "inline" | "overlay";
}

export default function SiteNav({ variant = "overlay" }: SiteNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (link: NavLink) => {
    setMenuOpen(false);
    if (link.kind === "home" && pathname === "/" && link.sectionId) {
      const el = document.getElementById(link.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push(link.href);
  };

  const isInline = variant === "inline";
  const navLinks = isInline
    ? PRIMARY_NAV.filter((l) => l.label !== "Home")
    : PRIMARY_NAV;

  const shellClass = isInline
    ? "relative z-50 w-full max-w-[1400px] mx-auto px-4 mb-4 md:mb-6"
    : "site-header fixed inset-x-0 top-0 z-[200] pointer-events-none";

  const innerClass = isInline
    ? "flex items-center justify-between gap-4"
    : "max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 h-[var(--site-header-h)] flex items-center justify-between gap-4 pointer-events-auto";

  return (
    <header className={shellClass}>
      <div className={innerClass}>
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              document.getElementById("hero-root")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <AuraLogo pulse={isInline} />
          <span className="font-display italic text-lg tracking-tight text-text-primary uppercase font-bold">
            AuraSync{" "}
            <span className="text-[10px] font-mono tracking-widest text-accent-light ml-1 font-light opacity-80">
              (mindset)
            </span>
          </span>
        </Link>

        <nav
          className={`${isInline ? "hidden md:flex" : "hidden lg:flex"} items-center gap-2`}
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const active = isActive(pathname, link);
            const className = `liquid-glass-button text-[11px] font-mono tracking-wider font-bold !py-1.5 !px-3.5 cursor-pointer uppercase ${
              active ? "!border-accent-light/50 text-accent-light" : ""
            }`;

            if (link.kind === "home" && pathname === "/") {
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => navigate(link)}
                  className={className}
                >
                  {link.label}
                </button>
              );
            }

            return (
              <Link key={link.label} href={link.href} className={className}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-stroke bg-surface/50 text-text-primary hover:border-accent-light/40 hover:scale-105 transition-all"
            title="Calibrate Solar/Lunar Axis"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className={`${isInline ? "md:hidden" : "lg:hidden"} p-2.5 rounded-full border border-stroke bg-surface/50 text-text-primary hover:bg-stroke transition-colors`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          className={
            isInline
              ? "md:hidden w-full max-w-[1400px] mx-auto px-4 mb-6 relative z-50 pointer-events-auto"
              : "lg:hidden px-4 pt-2 pb-4 pointer-events-auto"
          }
        >
          <div className="bg-surface/95 backdrop-blur-md border border-stroke rounded-3xl p-6 flex flex-col gap-4 shadow-2xl max-w-[1400px] mx-auto">
            <span className="text-[9px] font-mono text-muted uppercase tracking-widest border-b border-stroke pb-2 block">
              Ecosystem Navigation
            </span>
            {(isInline ? MOBILE_NAV.filter((l) => l.label !== "Home Base") : MOBILE_NAV).map(
              (link) => {
                const active = isActive(pathname, link);
                const className = `text-sm font-semibold text-left py-2 hover:text-accent-light transition-colors ${
                  active ? "text-accent-light" : "text-text-primary"
                }`;

                if (link.kind === "home" && pathname === "/") {
                  return (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => navigate(link)}
                      className={className}
                    >
                      {link.label}
                    </button>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={className}
                  >
                    {link.label}
                  </Link>
                );
              },
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
