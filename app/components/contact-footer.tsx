"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Hls from "hls.js";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";
import {
  Send,
  CheckCircle2,
  Headphones,
  ArrowUpRight,
  Target,
  Loader2,
} from "lucide-react";
import { LinkedinIcon, TwitterIcon } from "./social-icons";

const STREAM_URL =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const EMAILJS_SERVICE_ID = "service_54cgdaa";
const EMAILJS_TEMPLATE_ID = "template_ua2brif";
const EMAILJS_PUBLIC_KEY = "omFcxjn6HOwGLs3ZP";

const SITE_URL = "https://aurasync.space";
const BRAND = "AuraSync";

function buildTemplateParams(email: string): Record<string, string | number> {
  return {
    to_email: email,
    user_email: email,
    reply_to: email,

    name: "there",
    email,
    brand: BRAND,
    website_url: SITE_URL,
    calibrator_url: `${SITE_URL}/calibrator`,
    guides_url: `${SITE_URL}/audio-guides`,
    journal_url: `${SITE_URL}/journal`,
    privacy_url: `${SITE_URL}/privacy`,
    terms_url: `${SITE_URL}/terms`,
    unsubscribe_url: "mailto:vibe@aurasync.space?subject=UNSUBSCRIBE",
    year: new Date().getFullYear(),
  };
}

export default function ContactFooter() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(STREAM_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = STREAM_URL;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  useEffect(() => {
    if (!marqueeRef.current) return;
    gsap.to(".marquee-elements", {
      xPercent: -50,
      duration: 25,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    setErrorMessage(null);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        buildTemplateParams(trimmed),
      );
      setSentTo(trimmed);
      setEmail("");
    } catch (error) {
      const message =
        (error as { text?: string; message?: string })?.text ||
        (error as { message?: string })?.message ||
        "We couldn't process that just now. Try again shortly.";
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer
      className="relative bg-bg pt-20 pb-8 md:pb-12 overflow-hidden border-t border-stroke transition-colors duration-500"
      id="contact-footer"
    >
      <div className="absolute inset-0 z-0 overflow-hidden footer-overlay-soft pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute left-1/2 top-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-30 scale-y-[-1] scale-x-105"
        />
        <div className="absolute inset-0 footer-overlay-deep" />
      </div>

      <div className="relative w-full overflow-hidden border-y border-stroke bg-surface/35 backdrop-blur-sm py-4 select-none z-10 mb-16">
        <div ref={marqueeRef} className="flex whitespace-nowrap overflow-hidden">
          <div className="marquee-elements inline-flex gap-8 text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-text-primary/70">
            {Array.from({ length: 14 }).map((_, idx) => (
              <span key={idx} className="flex items-center gap-3 shrink-0 uppercase">
                <Target className="w-3.5 h-3.5 text-accent-light shrink-0" />
                BUILDING THE COGNITIVE MATRIX • CALIBRATING SYNC WAVEFORMS
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
        <div className="md:col-span-6 space-y-8 select-none">
          <div className="space-y-4">
            <span className="text-xs text-accent-light tracking-[0.3em] font-mono uppercase block">
              READY TO REALIGN?
            </span>
            <h3 className="text-4xl md:text-6xl font-display italic text-text-primary leading-[0.95] tracking-tight">
              Let&apos;s shift the <br />
              <span className="text-gradient font-bold lowercase">
                *vibe together*
              </span>
            </h3>
            <p className="text-xs md:text-sm text-muted max-w-sm font-light">
              Connect with our decentralized sound laboratories. Access
              high-fidelity biological metrics to structuralize your mental
              momentum.
            </p>
          </div>

          <div className="relative group/email inline-block">
            <div className="absolute inset-[-1.5px] rounded-2xl accent-gradient opacity-80 group-hover/email:opacity-100 blur-[2px] transition-all" />
            <a
              href="mailto:vibe@aurasync.space"
              className="relative flex items-center gap-3 bg-surface border border-white/5 py-4 px-8 rounded-2xl text-xs font-bold tracking-wider uppercase text-text-primary group-hover/email:bg-bg transition-all"
            >
              <span>vibe@aurasync.space</span>
              <ArrowUpRight className="w-4 h-4 text-accent-light" />
            </a>
          </div>
        </div>

        <div
          className="md:col-span-6 space-y-6 bg-surface/40 p-6 md:p-8 rounded-3xl border border-stroke"
          id="subscription-form"
        >
          <div className="space-y-1">
            <div className="flex gap-2 items-center text-accent-light">
              <Headphones className="w-4 h-4 animate-bounce" />
              <span className="text-[10px] font-mono uppercase tracking-widest">
                FREE NEURAL ACCESS
              </span>
            </div>

            <h4 className="text-xl font-display italic font-semibold text-text-primary">
              Sync Audio Guide
            </h4>

            <p className="text-xs text-muted leading-relaxed">
              Claim your free 7-Day Mindset Calibrator Audio-Guide. Infused with
              528Hz Solfeggio beats and deep somatic breath cues to calibrate
              your Reticular Activating System.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            noValidate
            className="space-y-3"
            aria-live="polite"
          >
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                disabled={submitting}
                placeholder="Enter email to unlock 432Hz stream"
                className="w-full bg-bg/60 border border-stroke rounded-xl px-4 py-3.5 text-xs text-text-primary placeholder:text-muted focus:outline-none focus:border-accent-light/50 transition-all pr-12 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={submitting}
                className="absolute right-2 top-2 p-2 rounded-lg bg-stroke/65 hover:bg-accent-light hover:text-bg transition-all text-text-primary disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Submit email"
              >
                {submitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {sentTo ? (
              <div
                role="status"
                className="flex items-start gap-3 p-3 border border-emerald-400/30 bg-emerald-400/8 rounded-xl"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-[1px]" />
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-300 block">
                    Email sent
                  </span>
                  <span className="text-[11px] text-muted font-mono break-all">
                    Check{" "}
                    <span className="text-text-primary">{sentTo}</span> for your
                    7-day calibrator.
                  </span>
                </div>
              </div>
            ) : errorMessage ? (
              <span
                role="alert"
                className="text-[10px] text-red-400/90 block font-mono"
              >
                {errorMessage}
              </span>
            ) : (
              <span className="text-[9px] text-muted/60 block font-mono">
                * Zero spam. High-fidelity cognitive science only.
              </span>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 border-t border-stroke/70 pt-8 flex flex-col sm:flex-row justify-between items-center gap-5">
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-text-primary transition-colors p-2 rounded-full bg-stroke/30 hover:bg-stroke"
            aria-label="Twitter"
          >
            <TwitterIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-text-primary transition-colors p-2 rounded-full bg-stroke/30 hover:bg-stroke"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 animate-pulse"></span>
          </span>
          <span className="text-[10px] text-muted font-mono uppercase tracking-widest">
            AuraSync Core Active &apos;26
          </span>
        </div>

        <div className="text-[10px] text-muted font-mono tracking-wider">
          © {new Date().getFullYear()} AuraSync. Engineered globally.
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mt-5">
        <div className="footer-legal-row rounded-2xl px-5 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono uppercase tracking-[0.22em]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="footer-legal-link transition-colors"
            >
              Privacy Policy
            </Link>
            <span
              className="w-1 h-1 rounded-full bg-current opacity-50"
              aria-hidden
            />
            <Link
              href="/terms"
              className="footer-legal-link transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <span
              className="w-1 h-1 rounded-full bg-current opacity-50"
              aria-hidden
            />
            <Link
              href="/contact"
              className="footer-legal-link transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="footer-legal-tagline">
            Built with intentional resonance.
          </div>
        </div>
      </div>
    </footer>
  );
}
