"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { motion } from "motion/react";
import {
  Sparkles,
  Cpu,
  Compass,
  ChevronRight,
  ArrowDown,
  FolderSync,
  Activity,
  Volume2,
} from "lucide-react";
import MoireBackground from "./moire-background";
import SiteNav from "./site-nav";
import { useTheme } from "./theme-provider";
import {
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "./social-icons";

type FrequencyKey = "432" | "528" | "639" | "7.83";

export default function Hero() {
  const { theme, toggleTheme } = useTheme();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeTab, setActiveTab] = useState("Vibe Syncing");

  const [engagedActivity, setEngagedActivity] = useState<string | null>(null);
  const [selectedFreq, setSelectedFreq] = useState<FrequencyKey>("528");
  const [intentText, setIntentText] = useState("");
  const [scanPulse, setScanPulse] = useState(12);
  const [isIntentSaved, setIsIntentSaved] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"Inhale" | "Hold" | "Exhale">(
    "Inhale"
  );

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-glass-left",
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power4.out" },
    );
    gsap.fromTo(
      ".bento-float-card",
      { opacity: 0, y: 24, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.35,
      },
    );
  }, []);

  // Pause decorative loops + left-card video when the hero leaves the viewport.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.getElementById("hero-root");
    if (!root || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        root.classList.toggle("hero-paused", !visible);
        const video = videoRef.current;
        if (!video) return;
        if (visible) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "80px 0px", threshold: 0.05 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (engagedActivity !== "breath") return;
    const interval = setInterval(() => {
      setBreathPhase((prev) => {
        if (prev === "Inhale") return "Hold";
        if (prev === "Hold") return "Exhale";
        return "Inhale";
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [engagedActivity]);

  useEffect(() => {
    if (engagedActivity !== "scan") return;
    let cancelled = false;
    const interval = setInterval(() => {
      if (cancelled) return;
      setScanPulse((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          return 98;
        }
        return prev + Math.floor(Math.random() * 12) + 6;
      });
    }, 4500 / 6);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [engagedActivity]);

  const playSolfeggioTone = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(528, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.0);
    } catch {
      // Audio constraints may prevent sound playback
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full min-h-screen bg-bg flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 select-none overflow-hidden transition-colors duration-500 hero-dashboard"
      id="hero-root"
    >
      <MoireBackground />

      <div className="absolute top-[12%] right-[12%] w-72 h-72 md:w-96 md:h-96 rounded-full glow-aura pointer-events-none z-0 opacity-20 animate-hero-glow hero-glow-primary" />

      <SiteNav variant="inline" />

      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
        <div className="lg:col-span-5 flex flex-col justify-between hero-glass-left glass-panel rounded-[2rem] p-6 md:p-8 lg:p-10 shadow-2xl relative overflow-hidden group/left border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-light/5 via-transparent to-transparent opacity-0 group-hover/left:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-[0.12] transition-opacity duration-500 hero-bg-video"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
              type="video/mp4"
            />
          </video>

          <div className="flex items-center justify-between mt-1 mb-10 select-none relative z-10">
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 100 100">
                  <circle cx="35" cy="50" r="18" fill="var(--accent-light)" className="opacity-80" />
                  <circle cx="65" cy="50" r="18" fill="var(--accent-light)" className="opacity-80" />
                  <circle cx="50" cy="35" r="18" fill="var(--accent-dark)" className="opacity-80" />
                  <circle cx="50" cy="65" r="18" fill="var(--accent-dark)" className="opacity-80" />
                  <circle cx="50" cy="50" r="8" fill="#fff" />
                </svg>
              </div>
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#89AACC]">
                bloom
              </span>
            </div>

            <Link
              href="/info/calibrator-blueprint"
              className="liquid-glass-button"
            >
              <Cpu className="w-3.5 h-3.5 text-accent-light shrink-0" />
              <span>Calibrate System</span>
            </Link>
          </div>

          <div className="space-y-6 my-auto select-none relative z-10">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.4 }}
              className="w-16 h-16 rounded-3xl bg-accent-light/10 flex items-center justify-center border border-accent-light/20 relative animate-hero-float"
            >
              <div className="absolute inset-0 rounded-3xl bg-accent-light/5 animate-pulse" />
              <svg width="34" height="34" viewBox="0 0 100 100" className="animate-hero-orbit">
                <circle cx="35" cy="50" r="16" fill="var(--accent-light)" className="opacity-90" />
                <circle cx="65" cy="50" r="16" fill="var(--accent-light)" className="opacity-90" />
                <circle cx="50" cy="35" r="16" fill="var(--accent-dark)" className="opacity-90" />
                <circle cx="50" cy="65" r="16" fill="var(--accent-dark)" className="opacity-90" />
                <circle cx="50" cy="50" r="6" fill="#fff" />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.55 }}
              className="hero-title-card p-6 md:p-8 -mx-4 md:-mx-6 rounded-3xl border shadow-inner select-none space-y-4 transition-all duration-300"
            >
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-4xl sm:text-5xl lg:text-3xl xl:text-4xl font-sans leading-[1.05] font-bold text-text-primary uppercase tracking-tight"
              >
                Synchronizing the <br />
                spirit of{" "}
                <span className="font-display italic normal-case text-5xl sm:text-6xl hero-title-shimmer">
                  AuraSync
                </span>
              </motion.h1>

              <div className="border-t border-white/10 pt-4 mt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono tracking-wider uppercase text-[#89AACC] font-bold">
                    Select active wavelength:
                  </span>
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>

                <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-black/20 border border-white/5 hero-freq-grid">
                  {[
                    { val: "432", label: "432 Hz" },
                    { val: "528", label: "528 Hz" },
                    { val: "639", label: "639 Hz" },
                    { val: "7.83", label: "7.83Hz" },
                  ].map((freq) => {
                    const isSelected = selectedFreq === freq.val;
                    let styleClass = "";
                    if (isSelected) {
                      if (freq.val === "432")
                        styleClass =
                          "bg-amber-400/15 border-amber-400/40 text-amber-300 font-bold";
                      else if (freq.val === "528")
                        styleClass =
                          "bg-emerald-400/15 border-emerald-400/40 text-emerald-300 font-bold";
                      else if (freq.val === "639")
                        styleClass =
                          "bg-purple-400/15 border-purple-400/40 text-purple-300 font-bold";
                      else
                        styleClass =
                          "bg-blue-400/15 border-blue-400/40 text-blue-300 font-bold";
                    } else {
                      styleClass =
                        "bg-white/5 border-transparent text-muted hover:text-text-primary hover:bg-white/10";
                    }

                    return (
                      <button
                        key={freq.val}
                        onClick={() => setSelectedFreq(freq.val as FrequencyKey)}
                        className={`py-1.5 px-1 text-center font-mono text-[10px] rounded-xl border transition-all duration-300 cursor-pointer ${styleClass}`}
                      >
                        {freq.label}
                      </button>
                    );
                  })}
                </div>

                <div className="rounded-2xl p-4 bg-white/[0.02] border border-white/5 relative overflow-hidden transition-all duration-300 hero-freq-stats">
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                      selectedFreq === "432"
                        ? "bg-amber-400/[0.03]"
                        : selectedFreq === "528"
                          ? "bg-emerald-400/[0.03]"
                          : selectedFreq === "639"
                            ? "bg-purple-400/[0.03]"
                            : "bg-blue-400/[0.03]"
                    }`}
                  />

                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#89AACC]">
                      {selectedFreq === "432"
                        ? "Cosmic Coherence"
                        : selectedFreq === "528"
                          ? "DNA Solfeggio Aura"
                          : selectedFreq === "639"
                            ? "Ecosystem Connection"
                            : "Schumann Vibration"}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold leading-none px-2 py-0.5 rounded ${
                        selectedFreq === "432"
                          ? "text-amber-400 bg-amber-400/10"
                          : selectedFreq === "528"
                            ? "text-emerald-400 bg-emerald-400/10"
                            : selectedFreq === "639"
                              ? "text-purple-400 bg-purple-400/10"
                              : "text-blue-400 bg-blue-400/10"
                      }`}
                    >
                      {selectedFreq === "432"
                        ? "+1.4x Flow"
                        : selectedFreq === "528"
                          ? "+1.8x Flow"
                          : selectedFreq === "639"
                            ? "+1.5x Flow"
                            : "+2.0x Flow"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2.5 relative z-10 border-t border-white/5 pt-2">
                    <div>
                      <span className="text-[8px] text-muted font-mono uppercase block">
                        Harmonic Ratio
                      </span>
                      <span className="font-mono text-[10px] font-bold text-text-primary">
                        {selectedFreq === "432"
                          ? "1.414 φ (Key)"
                          : selectedFreq === "528"
                            ? "1.618 φ (Golden)"
                            : selectedFreq === "639"
                              ? "2.236 φ (Hyper)"
                              : "7.83Hz (Core)"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] text-muted font-mono uppercase block">
                        Somatic Wave
                      </span>
                      <span className="font-mono text-[10px] font-bold text-text-primary">
                        {selectedFreq === "432"
                          ? "7.8Hz Theta Gap"
                          : selectedFreq === "528"
                            ? "10.5Hz Alpha Focus"
                            : selectedFreq === "639"
                              ? "4.5Hz Meditation"
                              : "Earth Core"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 relative z-10 space-y-1">
                    <div className="flex justify-between items-center text-[8px] font-mono text-muted">
                      <span>Neural Locking Ratio</span>
                      <span
                        className={
                          selectedFreq === "432"
                            ? "text-amber-400 font-bold"
                            : selectedFreq === "528"
                              ? "text-emerald-400 font-bold"
                              : selectedFreq === "639"
                                ? "text-purple-400 font-bold"
                                : "text-blue-400 font-bold"
                        }
                      >
                        {selectedFreq === "432"
                          ? "96.8%"
                          : selectedFreq === "528"
                            ? "98.2%"
                            : selectedFreq === "639"
                              ? "93.4%"
                              : "99.1%"}
                      </span>
                    </div>

                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          selectedFreq === "432"
                            ? "bg-amber-400"
                            : selectedFreq === "528"
                              ? "bg-emerald-400"
                              : selectedFreq === "639"
                                ? "bg-purple-400"
                                : "bg-blue-400"
                        }`}
                        style={{
                          width:
                            selectedFreq === "432"
                              ? "96.8%"
                              : selectedFreq === "528"
                                ? "98.2%"
                                : selectedFreq === "639"
                                  ? "93.4%"
                                  : "99.1%",
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-end justify-center gap-1.5 h-5 mt-3 pt-1 border-t border-white/5">
                    {[
                      { delay: "0.2s", heightClass: "h-3" },
                      { delay: "0.1s", heightClass: "h-4" },
                      { delay: "0.4s", heightClass: "h-2" },
                      { delay: "0.3s", heightClass: "h-3" },
                      { delay: "0.6s", heightClass: "h-5" },
                      { delay: "0.5s", heightClass: "h-3" },
                      { delay: "0.7s", heightClass: "h-4" },
                      { delay: "0.1s", heightClass: "h-2" },
                      { delay: "0.3s", heightClass: "h-3" },
                      { delay: "0.5s", heightClass: "h-4" },
                    ].map((bar, i) => (
                      <div
                        key={i}
                        style={{ animationDelay: bar.delay }}
                        className={`w-0.5 rounded-full hero-freq-bar ${
                          selectedFreq === "432"
                            ? "bg-amber-400/80"
                            : selectedFreq === "528"
                              ? "bg-emerald-400/80"
                              : selectedFreq === "639"
                                ? "bg-purple-400/80"
                                : "bg-blue-400/80"
                        } ${bar.heightClass}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95 }}
              className="pt-1 flex"
            >
              <button
                onClick={() => scrollToSection("calculator-section")}
                className="liquid-glass-button-strong w-full sm:w-auto text-xs uppercase tracking-widest font-bold font-sans py-3 px-8"
              >
                <span>Explore Sync Now</span>
                <ArrowDown className="w-4 h-4 text-accent-light" />
              </button>
            </motion.div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {["Vibe Syncing", "Neural Practices", "Sound Bath"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setActiveTab(tag);
                    if (tag === "Vibe Syncing") scrollToSection("calculator-section");
                    if (tag === "Neural Practices") scrollToSection("journal-section");
                    if (tag === "Sound Bath") scrollToSection("selected-works");
                  }}
                  className={`text-[9px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                    activeTab === tag
                      ? "bg-text-primary text-bg border-transparent font-bold shadow-md"
                      : "bg-white/5 border-white/10 text-muted hover:border-accent-light/40 hover:text-text-primary"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 mt-8 relative z-10">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-accent-light block mb-2">
              VISIONARY DESIGN ASPECT
            </span>
            <div className="flex items-start justify-between gap-2">
              <p className="font-display text-lg italic text-text-primary font-normal leading-snug">
                &ldquo;We imagined a realm with no ending.&rdquo;
              </p>
              <span className="font-mono text-[9px] uppercase text-muted tracking-widest shrink-0 mt-2">
                — MARCUS AURELIUS
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-between gap-6 overflow-visible">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="glass-panel rounded-2xl p-4 flex items-center justify-between border border-white/10 shadow-sm bento-float-card">
              <div className="flex gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-accent-light transition-colors"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-accent-light transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-accent-light transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
              <div className="w-px h-4 bg-stroke" />
              <button
                onClick={() => scrollToSection("selected-works")}
                className="liquid-glass-button !py-1 px-3 gap-1.5 text-[10px] uppercase font-mono tracking-wider cursor-pointer"
              >
                <span>Audio Library</span>
                <ChevronRight className="w-3 h-3 text-accent-light" />
              </button>
            </div>

            <div className="glass-panel rounded-2xl p-4 flex items-center justify-between border border-white/10 shadow-sm bento-float-card">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
                  Aura Sync Dynamic
                </span>
              </div>
              <button
                onClick={() => scrollToSection("calculator-section")}
                className="liquid-glass-button !py-1 px-3 cursor-pointer"
              >
                <span>Sync</span>
                <span className="w-4 h-4 rounded-full bg-accent-light text-bg flex items-center justify-center font-bold text-[9px]">
                  A
                </span>
              </button>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 md:p-8 space-y-6 border border-white/10 bento-float-card flex flex-col justify-center relative overflow-hidden group/eco shadow-md">
            <div className="absolute inset-0 bg-halftone hero-bento-halftone pointer-events-none" />

            <div className="flex items-center justify-between relative z-10 w-full col-span-1">
              <div className="flex items-center gap-2.5 text-accent-light select-none">
                <Sparkles className="w-4 h-4 animate-spin [animation-duration:6s]" />
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-accent-light">
                  Enter our ecosystem
                </span>
              </div>

              <Link
                href="/info/calibrator-blueprint"
                className="liquid-glass-button !py-1 px-2.5 font-mono text-[9px] uppercase tracking-wider cursor-pointer font-bold"
              >
                Blueprint Page &rarr;
              </Link>
            </div>

            <p className="text-xs md:text-sm text-text-primary/95 leading-relaxed font-light relative z-10">
              Connect with metaphysical experts, track somatic frequency changes
              over time, and keep active with AuraSync&apos;s modern AI-powered
              neural alignment protocols. Explore real-time exercises below.
            </p>

            <div className="relative z-10 space-y-3 pt-2 select-none">
              <span className="text-[9px] font-mono tracking-widest uppercase text-accent-light block font-semibold">
                Available Active Tools:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "breath", label: "Breath-Sync", icon: <Activity className="w-3.5 h-3.5 text-emerald-400" /> },
                  { id: "scan", label: "Aura Radar", icon: <Cpu className="w-3.5 h-3.5 text-blue-400" /> },
                  { id: "intent", label: "Intent Lock", icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" /> },
                  { id: "audio", label: "Harmonic Tone", icon: <Volume2 className="w-3.5 h-3.5 text-purple-400" /> },
                ].map((act) => {
                  const isActive = engagedActivity === act.id;
                  return (
                    <button
                      key={act.id}
                      onClick={() => {
                        setEngagedActivity(isActive ? null : act.id);
                        if (act.id === "scan" && !isActive) setScanPulse(12);
                        if (act.id === "audio") playSolfeggioTone();
                      }}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-tr from-accent-light/10 to-accent-dark/10 border-accent-light text-text-primary scale-[1.03] shadow-[0_0_15px_rgba(var(--accent-rgb),0.15)]"
                          : "bg-white/[0.02] border-white/10 hover:border-accent-light/35 text-muted hover:text-text-primary hover:bg-white/[0.05]"
                      }`}
                    >
                      {act.icon}
                      <span className="text-[10px] uppercase font-mono tracking-wider block font-bold">
                        {act.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {engagedActivity === "breath" && (
                <div className="bg-emerald-400/5 border border-emerald-400/10 p-4 rounded-2xl flex items-center justify-between gap-4 mt-2 text-[11px] font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                    </span>
                    <div>
                      <span className="text-muted uppercase block text-[9px]">
                        Somatic breath assist
                      </span>
                      <span className="text-emerald-400 font-bold uppercase">
                        {breathPhase} Cycle active
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-emerald-400/30 flex items-center justify-center">
                    <div
                      className={`rounded-full bg-emerald-400 transition-all duration-[2400ms] ${
                        breathPhase === "Inhale"
                          ? "w-6 h-6 opacity-80"
                          : breathPhase === "Hold"
                            ? "w-7 h-7 opacity-100"
                            : "w-2 h-2 opacity-30"
                      }`}
                    />
                  </div>
                </div>
              )}

              {engagedActivity === "scan" && (
                <div className="bg-blue-400/5 border border-blue-400/10 p-4 rounded-2xl space-y-2 mt-2 text-[11px] font-mono">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-blue-400 uppercase font-bold">
                      AURA FREQUENCY RADAR DIRECT SCAN
                    </span>
                    <span className="text-muted font-bold">{scanPulse}% Completed</span>
                  </div>
                  <div className="w-full bg-stroke h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-400 h-full transition-all duration-300"
                      style={{ width: `${scanPulse}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-muted font-light pl-1 leading-none italic select-none">
                    {scanPulse < 40
                      ? "Mapping cortical alpha-beta wave thresholds..."
                      : scanPulse < 75
                        ? "Aligning Solfeggio 528Hz interference indexes..."
                        : scanPulse < 98
                          ? "Compiling pre-frontal cognitive density offsets..."
                          : "Aura Sync completely locked! Alignment stable."}
                  </p>
                </div>
              )}

              {engagedActivity === "intent" && (
                <div className="bg-amber-300/5 border border-amber-300/15 p-4 rounded-2xl space-y-3 mt-2 text-[11px] font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-300 font-bold uppercase text-[10px]">
                      Prime Subconscious Filter
                    </span>
                    {isIntentSaved && (
                      <span className="text-[9px] text-amber-300 bg-amber-300/10 border border-amber-300/30 px-2 py-0.5 rounded font-bold">
                        RAS PRIMED
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Attract major active luxury clients..."
                      value={intentText}
                      onChange={(e) => {
                        setIntentText(e.target.value);
                        setIsIntentSaved(false);
                      }}
                      className="flex-1 bg-bg border border-stroke rounded-xl px-3 py-2 text-text-primary text-xs hover:border-amber-300/30 focus:border-amber-300/60 focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        if (intentText.trim()) setIsIntentSaved(true);
                      }}
                      className="bg-amber-300 hover:bg-amber-400 text-bg text-[10px] font-bold px-4 rounded-xl uppercase tracking-widest transition-colors font-sans"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}

              {engagedActivity === "audio" && (
                <div className="bg-purple-400/5 border border-purple-400/10 p-4 rounded-2xl flex items-center justify-between mt-2 text-[11px] font-mono">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-purple-400 animate-bounce" />
                    <div>
                      <span className="text-muted block text-[9px] uppercase">
                        Acoustic Oscillator Playback
                      </span>
                      <span className="text-purple-400 font-bold uppercase text-[10px]">
                        Solfeggio 528Hz synthesis
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={playSolfeggioTone}
                    className="text-[9px] font-mono py-1.5 px-3 bg-purple-400/15 rounded-lg border border-purple-400/30 hover:bg-purple-400/25 uppercase text-purple-300 font-bold"
                  >
                    Re-trigger chime
                  </button>
                </div>
              )}
            </div>

            <div className="relative z-10 pt-2 flex items-center gap-4">
              <button
                onClick={() => scrollToSection("calculator-section")}
                className="inline-flex items-center gap-1.5 text-xs text-text-primary hover:text-accent-light font-bold uppercase tracking-widest border-b border-text-primary hover:border-accent-light pb-0.5 transition-all"
              >
                <span>Full Vibe Frequency calibration &rarr;</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/info/calibrator-blueprint"
              className="glass-panel rounded-3xl p-6 border border-white/5 bento-float-card group/p hover:border-accent-light/20 transition-all duration-300 block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-accent-light/5 text-accent-light border border-accent-light/10">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
                  Process Alpha
                </span>
              </div>
              <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-1">
                Processing Logic
              </h4>
              <p className="text-xs text-muted leading-relaxed font-light">
                High-end cognitive calculations that translate your manifestation
                targets from raw metaphysical waves into focused cognitive focus
                areas.
              </p>
            </Link>

            <Link
              href="/info/acoustic-science"
              className="glass-panel rounded-3xl p-6 border border-white/5 bento-float-card group/g hover:border-accent-light/20 transition-all duration-300 block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-accent-light/5 text-accent-light border border-accent-light/10">
                  <FolderSync className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
                  Growth Base
                </span>
              </div>
              <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-1">
                Aura Archive
              </h4>
              <p className="text-xs text-muted leading-relaxed font-light">
                Set-up templates, mental routines, and audio tracks engineered
                specifically to align with target neuro-vibrational bands.
              </p>
            </Link>
          </div>

          <div className="glass-panel rounded-3xl p-5 border border-white/5 bento-float-card group/sculpt hover:border-accent-light/20 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1E3A5F] to-[#4E85BF] p-0.5 relative shrink-0 overflow-hidden shadow-inner flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20" />
                <div className="w-8 h-8 rounded-full border border-white/20 relative animate-spin [animation-duration:10s]">
                  <div className="absolute top-1 left-2 w-2 h-2 rounded-full bg-white/40" />
                  <div className="absolute bottom-2 right-1.5 w-1.5 h-1.5 rounded-full bg-white/30" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-[1px] bg-white/30 rotate-12" />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-accent-light">
                  Deep Sculpting
                </h4>
                <p className="text-[11px] text-muted leading-relaxed font-light">
                  Modern sensory sound baths and mental models that allow you to
                  sculpt complex biological pathways.
                </p>
              </div>
            </div>

            <button
              onClick={() => scrollToSection("selected-works")}
              className="w-10 h-10 rounded-2xl bg-white/5 text-text-primary hover:bg-accent-light hover:text-bg transition-all flex items-center justify-center border border-white/10"
              title="Add Practice Routine"
              aria-label="Scroll to Audio Guides"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          <div className="glass-panel rounded-3xl p-4 border border-white/5 bento-float-card flex flex-col sm:flex-row items-center justify-between gap-4 select-none relative overflow-hidden bg-gradient-to-tr from-accent-light/5 via-transparent to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-surface/80 rounded-xl border border-stroke text-accent-light shrink-0">
                <Compass className="w-4 h-4 animate-spin [animation-duration:8s]" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-muted uppercase tracking-widest block">
                  Cosmic Axis Controller
                </span>
                <span className="text-xs font-semibold text-text-primary">
                  Current Theme: {theme === "dark" ? "LUNAR NIGHT" : "SOLAR DAY"}
                </span>
              </div>
            </div>

            <div
              onClick={toggleTheme}
              className="relative w-44 h-11 bg-bg/80 border border-stroke rounded-full p-1 cursor-pointer flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-muted select-none group/toggle"
            >
              <div
                className={`absolute top-1 bottom-1 w-20 bg-accent-light rounded-full shadow-md transition-all duration-300 ${
                  theme === "dark" ? "left-1.5" : "left-[calc(100%-84px)]"
                }`}
              />
              <span
                className={`z-10 pl-4 font-bold transition-all duration-300 pointer-events-none ${
                  theme === "dark" ? "text-bg" : "text-muted"
                }`}
              >
                Lunar
              </span>
              <span
                className={`z-10 pr-4 font-bold transition-all duration-300 pointer-events-none ${
                  theme === "light" ? "text-bg" : "text-muted"
                }`}
              >
                Solar
              </span>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        onClick={() => scrollToSection("calculator-section")}
        className="absolute bottom-4 flex flex-col items-center gap-1 cursor-pointer text-muted hover:text-text-primary transition-colors hover:scale-105"
      >
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase">
          Calibration Console Below
        </span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.div>
    </section>
  );
}
