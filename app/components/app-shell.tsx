"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import SiteNav from "./site-nav";
import ScrollPerfBoost from "./scroll-perf-boost";
import { ThemeProvider } from "./theme-provider";

function ShellBody({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <ScrollPerfBoost />
      {!isHome ? <SiteNav variant="overlay" /> : null}
      <div className={isHome ? "min-h-screen" : "site-content min-h-screen site-page-under-nav"}>
        {children}
      </div>
    </>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ShellBody>{children}</ShellBody>
    </ThemeProvider>
  );
}
