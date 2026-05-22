"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingScreen from "./loading-screen";
import Hero from "./hero";
import VibrationCalculator from "./vibration-calculator";
import SoundStream from "./sound-stream";
import SelectedWorks from "./selected-works";
import Journal from "./journal";
import Explorations from "./explorations";
import Stats from "./stats";
import ContactFooter from "./contact-footer";

const SESSION_KEY = "aurasync-loaded";

export default function HomeClient() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const alreadyLoaded =
      typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY);
    if (alreadyLoaded) setIsLoading(false);
    setMounted(true);
  }, []);

  const handleComplete = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "1");
    }
    setIsLoading(false);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-bg" aria-hidden />;
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleComplete} />;
  }

  return (
    <div className="w-full bg-bg text-text-primary min-h-screen relative overflow-x-hidden selection:bg-accent-dark/40 selection:text-white">
      <div className="absolute top-[30vh] left-0 w-80 h-80 glow-aura rounded-full z-0 pointer-events-none opacity-20" />
      <div className="absolute top-[160vh] right-10 w-96 h-96 glow-aura rounded-full z-0 pointer-events-none opacity-15" />
      <div className="absolute bottom-[20vh] left-5 w-[500px] h-[500px] glow-aura rounded-full z-0 pointer-events-none opacity-10" />

      <Hero />

      <div
        className="bg-bg py-16 border-t border-stroke relative z-10"
        id="calculator-section"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5 select-none text-center lg:text-left">
            <div className="flex justify-center lg:justify-start items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-light animate-ping" />
              <span className="text-[10px] font-mono tracking-widest text-accent-light uppercase">
                NEURAL HARMONIZING
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-sans text-text-primary leading-tight uppercase font-light">
              Calibrate your <br className="hidden lg:block" />
              <span className="font-display italic text-accent-light lowercase">
                *frequency*
              </span>
            </h2>

            <p className="text-xs md:text-sm text-muted leading-relaxed max-w-md mx-auto lg:mx-0 font-light">
              Our lightweight cognitive index interprets current energetic
              alignment levels, mapping them against desired neuro-plastic
              manifestation goals using Gemini deep analysis algorithms.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center lg:justify-start">
              <Link
                href="/info/calibrator-blueprint"
                className="liquid-glass-button text-xs font-mono tracking-wide cursor-pointer font-bold"
              >
                <span>Blueprint Specs</span>
                <span className="w-2 h-2 rounded-full bg-accent-light" />
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-4 text-[11px] text-muted/65 font-mono pt-4">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-accent-light" />
                <span className="w-2 h-2 rounded-full bg-accent-dark" />
              </div>
              <span>AuraSync Biometric Integration Active</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <VibrationCalculator />
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-stroke bg-bg">
        <SoundStream />
      </div>

      <SelectedWorks />
      <Journal />
      <Explorations />
      <Stats />
      <ContactFooter />
    </div>
  );
}
