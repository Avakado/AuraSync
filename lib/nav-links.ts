export type NavLinkKind = "page" | "home";

export interface NavLink {
  label: string;
  kind: NavLinkKind;
  href: string;
  /** Section id on the homepage (used when kind === "home" and already on `/`) */
  sectionId?: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: "Home", kind: "home", href: "/", sectionId: "hero-root" },
  { label: "Calibrator", kind: "page", href: "/calibrator" },
  { label: "Binaural", kind: "page", href: "/binaural-rhythms" },
  { label: "Audios", kind: "page", href: "/audio-guides" },
  { label: "Journal", kind: "page", href: "/journal" },
  { label: "Visuals", kind: "page", href: "/explorations" },
];

export const MOBILE_NAV: NavLink[] = [
  { label: "Home Base", kind: "home", href: "/", sectionId: "hero-root" },
  { label: "Vibe Calibrator", kind: "page", href: "/calibrator" },
  { label: "Binaural Rhythms", kind: "page", href: "/binaural-rhythms" },
  { label: "Neural Soundscapes", kind: "page", href: "/audio-guides" },
  { label: "Cognitive Journal", kind: "page", href: "/journal" },
  { label: "Visual Playground", kind: "page", href: "/explorations" },
];
