import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { gsap } from "gsap";
import { Send, Sparkles, X, Play, Pause, Headphones, Radio, ArrowUpRight, Github, Linkedin, Twitter, Target } from "lucide-react";

const STREAM_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function ContactFooter() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [audioFreq, setAudioFreq] = useState(432); // Solfeggio State

  // HLS Video reversed vertically
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(STREAM_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.log("HLS play caught:", err));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = STREAM_URL;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((err) => console.log("HLS play caught:", err));
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Marquee scroll
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Linear translation matching details exactly
    gsap.to(".marquee-elements", {
      xPercent: -50,
      duration: 25,
      ease: "none",
      repeat: -1,
    });
  }, []);

  // Web Audio Synthesizer: Play exact 432Hz/528Hz Solfeggio sine sweeps!
  const toggleSolfeggioMusic = () => {
    if (playingAudio) {
      stopSolfeggio();
    } else {
      startSolfeggio(audioFreq);
    }
  };

  const startSolfeggio = (freq: number) => {
    try {
      if (playingAudio) stopSolfeggio();

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // Master oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Low LFO to simulate gentle waves
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.25; // 0.25Hz wave
      lfoGain.gain.value = 6;    // wave swing amplitude

      // Chain LFO to oscillator frequency for subtle detuning
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      // Gain level
      gain.gain.setValueAtTime(0.07, ctx.currentTime); // Gentle soft volume
      
      osc.connect(gain);
      gain.connect(ctx.destination);

      lfo.start();
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setPlayingAudio(true);
      setAudioFreq(freq);
    } catch (e) {
      console.error("Web audio API not supported inside sandboxed environments", e);
    }
  };

  const stopSolfeggio = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch (err) {}
      oscillatorRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
    }
    oscillatorRef.current = null;
    audioContextRef.current = null;
    setPlayingAudio(false);
  };

  const changeFrequencySetting = (freq: number) => {
    setAudioFreq(freq);
    if (playingAudio) {
      startSolfeggio(freq);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      // Automatically trigger 432Hz sine sound wash as reward!
      startSolfeggio(432);
    }
  };

  // Housecleaning on unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <footer className="relative bg-bg pt-20 pb-8 md:pb-12 overflow-hidden border-t border-stroke transition-colors duration-500" id="contact-footer">
      {/* Background flipped HLS video with scale-y-[-1] */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black/60 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute left-1/2 top-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-30 scale-y-[-1] scale-x-105"
        />
        {/* Deep darken filter screen overlap */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* GSAP Marquee text repeating */}
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
        
        {/* Grid left: Contact triggers */}
        <div className="md:col-span-6 space-y-8 select-none">
          <div className="space-y-4">
            <span className="text-xs text-accent-light tracking-[0.3em] font-mono uppercase block">
              READY TO REALIGN?
            </span>
            <h3 className="text-4xl md:text-6xl font-display italic text-text-primary leading-[0.95] tracking-tight">
              Let&apos;s shift the <br />
              <span className="text-gradient font-bold lowercase">*vibe together*</span>
            </h3>
            <p className="text-xs md:text-sm text-muted max-w-sm font-light">
              Connect with our decentralized sound laboratories. Access high-fidelity biological metrics to structuralize your mental momentum.
            </p>
          </div>

          {/* Email button wrapped in custom glowing borders */}
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

        {/* Grid right: Newsletter / Subscription Guide form */}
        <div className="md:col-span-6 space-y-6 bg-surface/40 p-6 md:p-8 rounded-3xl border border-stroke" id="subscription-form">
          <div className="space-y-1">
            <div className="flex gap-2 items-center text-accent-light">
              <Headphones className="w-4 h-4 animate-bounce" />
              <span className="text-[10px] font-mono uppercase tracking-widest">FREE NEURAL ACCESS</span>
            </div>
            
            <h4 className="text-xl font-display italic font-semibold text-text-primary">
              Sync Audio Guide
            </h4>
            
            <p className="text-xs text-muted leading-relaxed">
              Claim your free 7-Day Mindset Calibrator Audio-Guide. Infused with 528Hz Solfeggio beats and deep somatic breath cues to calibrate your Reticular Activating System.
            </p>
          </div>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email to unlock 432Hz stream"
                  className="w-full bg-bg/60 border border-stroke rounded-xl px-4 py-3.5 text-xs text-text-primary placeholder:text-muted focus:outline-none focus:border-accent-light/50 transition-all pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-2 rounded-lg bg-stroke/65 hover:bg-accent-light hover:text-bg transition-all text-text-primary"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[9px] text-muted/60 block font-mono">
                * Zero spam. High-fidelity cognitive science only.
              </span>
            </form>
          ) : (
            <div className="space-y-4 p-4 border border-accent-light/20 bg-accent-light/5 rounded-2xl">
              <div className="flex gap-2 items-center text-accent-light">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span className="text-[11px] font-mono uppercase tracking-wider">GUIDE ACCESS ACTIVE</span>
              </div>
              
              <p className="text-xs text-muted leading-relaxed">
                Check your inbox! We have synthesized and sent your customized guide arrays.
              </p>

              {/* Subscribed embedded mini-synthesizer player (Active Solfeggio sound therapy) */}
              <div className="bg-bg/60 border border-stroke p-3 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-accent-light animate-pulse" />
                    <div>
                      <span className="text-[9px] text-muted block font-mono">ACTIVE SYNTH THERAPY</span>
                      <span className="text-xs text-text-primary font-medium">{audioFreq}Hz Tone</span>
                    </div>
                  </div>

                  {/* Play & Pause Trigger */}
                  <button
                    onClick={toggleSolfeggioMusic}
                    className="p-2 rounded-full bg-accent-light text-bg hover:scale-105 transition-all text-sm font-bold flex items-center justify-center"
                    title={playingAudio ? "Mute Sine Wash" : "Play Sine Wash"}
                  >
                    {playingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Option Toggles */}
                <div className="flex gap-2 justify-center">
                  {[432, 528].map((freq) => (
                    <button
                      key={freq}
                      onClick={() => changeFrequencySetting(freq)}
                      className={`text-[9px] font-mono py-1 px-3.5 rounded-full border transition-all ${
                        audioFreq === freq
                          ? "bg-accent-light text-bg border-transparent font-bold"
                          : "bg-stroke/40 text-muted border-stroke hover:text-text-primary"
                      }`}
                    >
                      {freq}Hz {freq === 432 ? "Alpha Relax" : "Theta Focus"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer bar credits */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 border-t border-stroke/70 pt-8 flex flex-col sm:flex-row justify-between items-center gap-5">
        
        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-text-primary transition-colors p-2 rounded-full bg-stroke/30 hover:bg-stroke"
          >
            <Twitter className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-text-primary transition-colors p-2 rounded-full bg-stroke/30 hover:bg-stroke"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Pulse Dot available indicator */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 animate-pulse"></span>
          </span>
          <span className="text-[10px] text-muted font-mono uppercase tracking-widest">
            AuraSync Core Active &apos;26
          </span>
        </div>

        {/* Copyright */}
        <div className="text-[10px] text-muted font-mono tracking-wider">
          © {new Date().getFullYear()} AuraSync. Engineered globally.
        </div>
      </div>
    </footer>
  );
}
