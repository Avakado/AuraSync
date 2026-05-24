import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import AppShell from "./components/app-shell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AuraSync — Neuro-Manifestation Ecosystem",
  description:
    "A stylish, dark, neuro-manifestation platform and creative design ecosystem bridging brain science, neuroplasticity, and mind synchronization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg text-text-primary selection:bg-accent-dark/40 selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
