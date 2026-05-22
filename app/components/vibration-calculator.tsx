"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Brain,
  Activity,
  Zap,
  CheckCircle2,
  RefreshCw,
  Send,
  Radio,
} from "lucide-react";
import type {
  NeuroManifestationResult,
  VibrationQuizAnswers,
} from "@/lib/types";

const ENERGY_OPTIONS = [
  { label: "Quiet Stillness / Depleted", val: "Calm / Low Oscillation" },
  { label: "Grounded Balance / Deep Coherence", val: "Coherent Balanced Resonance" },
  { label: "High Cognitive Momentum / Fast Firing", val: "High Analytical Beta" },
  { label: "Ecstatic / Peak Creative Surge", val: "Gamma Expansion State" },
];

const FOCUS_OPTIONS = [
  { label: "Scattered / Easily distracted", val: "Scattered / High Noise" },
  { label: "Highly analytical / Linear focus", val: "Linear Focus Coherence" },
  { label: "Subconscious day-dreaming / Diffuse", val: "Diffuse Receptive Alpha" },
  { label: "Flow state / Effortless hyper-focus", val: "Coherent Synaptic Flow" },
];

const OBSTACLE_OPTIONS = [
  { label: "Logical Overthinking / Imposter Syndrome", val: "Overthinking / Intellectual Resistance" },
  { label: "Sub-optimal Environment / Focus Leaks", val: "Environmental Leaks / External Friction" },
  { label: "Subconscious Doubt / Fear of Expansion", val: "Subconscious Friction / Limbic Fear" },
  { label: "Mental Exhaustion / Synaptic Burnout", val: "Synaptic Burnout / Energy Deficit" },
];

export default function VibrationCalculator() {
  const [step, setStep] = useState(0);
  const [desire, setDesire] = useState("");
  const [answers, setAnswers] = useState<VibrationQuizAnswers>({
    energyLevel: "Calm / Low Oscillation",
    focusStatus: "Scattered / High Noise",
    predominantEmotion: "Flow / Receptive",
    majorObstacle: "Overthinking / Intellectual Resistance",
  });
  const [result, setResult] = useState<NeuroManifestationResult | null>(null);

  const startQuiz = () => setStep(1);

  const handleSelectEnergy = (val: string) => {
    setAnswers((prev) => ({ ...prev, energyLevel: val }));
    setStep(3);
  };

  const handleSelectFocus = (val: string) => {
    setAnswers((prev) => ({ ...prev, focusStatus: val }));
    setStep(4);
  };

  const handleSelectObstacle = (val: string) => {
    setAnswers((prev) => ({ ...prev, majorObstacle: val }));
    calculateSync(val);
  };

  const calculateSync = async (finalObstacle: string) => {
    setStep(5);

    const payload = {
      desire: desire || "Creative expansion and synaptic synchronization",
      answers: { ...answers, majorObstacle: finalObstacle },
    };

    try {
      const res = await fetch("/api/manifest/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Synchronization calculation failed");
      const data = (await res.json()) as NeuroManifestationResult;
      setResult(data);
      setStep(6);
    } catch {
      setResult({
        currentFrequencyHz: 432,
        frequencyBandName: "Alpha-Coherent Harmonic",
        rasStatus: "Active calibration requested",
        neuroplasticInsight:
          "Your default mode network is processing high analytical filters. Pruning excess feedback loops is advised.",
        metaphysicalBridging:
          "A shift towards non-binary focus will release sub-harmonic anchors, establishing rapid wave alignment.",
        actionSteps: [
          "Calibrate target focus arrays over three 5-minute somatic intervals.",
          "Establish secondary synaptic hooks using visual triggers.",
          "Apply alpha-resonant noise offsets during focus phases.",
        ],
        customAffirmation:
          "I release the friction of thought to align directly with my intention.",
      });
      setStep(6);
    }
  };

  const resetCalculator = () => {
    setDesire("");
    setAnswers({
      energyLevel: "Calm / Low Oscillation",
      focusStatus: "Scattered / High Noise",
      predominantEmotion: "Flow / Receptive",
      majorObstacle: "Overthinking / Intellectual Resistance",
    });
    setResult(null);
    setStep(0);
  };

  return (
    <div
      className="w-full bg-surface border border-stroke rounded-3xl p-6 md:p-8 relative overflow-hidden group/calc"
      id="vibe-calculator"
    >
      <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-accent-light/10 blur-[60px] pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-44 h-44 rounded-full bg-accent-dark/5 blur-[50px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-stroke/50 text-accent-light">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-mono block">
                  BIOMETRIC FIELD INDEX
                </span>
                <h4 className="text-lg font-medium text-text-primary">
                  Current Vibration Calculator
                </h4>
              </div>
            </div>

            <p className="text-sm text-muted leading-relaxed">
              Measure your neuro-cognitive configuration. This lightweight
              multi-step engine maps your Reticular Activating System (RAS)
              filters to provide instant bio-metaphysical alignment insights.
            </p>

            <button
              onClick={startQuiz}
              className="liquid-glass-button-strong w-full text-xs font-semibold tracking-wider uppercase cursor-pointer"
            >
              Analyze My Frequency
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-muted uppercase font-mono tracking-wider">
                <span>VECTOR CALIBRATION</span>
                <span>STEP 1 / 4</span>
              </div>
              <h4 className="text-base font-medium text-text-primary">
                What is your current manifestation desire?
              </h4>
              <p className="text-xs text-muted">
                State your primary intention simply (abundance, career leap,
                inner peace).
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                value={desire}
                onChange={(e) => setDesire(e.target.value)}
                placeholder="e.g. Scaling my design studio to $20k/month"
                className="w-full bg-bg/50 border border-stroke rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder:text-muted focus:outline-none focus:border-accent-light/50 transition-colors pr-10"
              />
              <Sparkles className="absolute right-3.5 top-3.5 w-4 h-4 text-muted" />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!desire.trim()}
              className="liquid-glass-button-strong w-full text-xs font-semibold tracking-wider uppercase justify-center disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              Continue Calibration{" "}
              <Send className="w-3.5 h-3.5 text-accent-light shrink-0" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-muted uppercase font-mono tracking-wider">
                <span>BIO-ENERGY STATE</span>
                <span>STEP 2 / 4</span>
              </div>
              <h4 className="text-base font-medium text-text-primary font-sans">
                Index your overall somatic energy level right now:
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {ENERGY_OPTIONS.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSelectEnergy(opt.val)}
                  className="w-full text-left p-3.5 rounded-xl bg-bg/40 border border-stroke hover:border-accent-light/40 hover:bg-bg transition-all text-xs text-text-primary group/opt flex justify-between items-center"
                >
                  <span>{opt.label}</span>
                  <Zap className="w-3.5 h-3.5 text-muted opacity-0 group-hover/opt:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-muted uppercase font-mono tracking-wider">
                <span>SYNAPTIC ATTENTION COHERENCE</span>
                <span>STEP 3 / 4</span>
              </div>
              <h4 className="text-base font-medium text-text-primary">
                What is your current attention capability?
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {FOCUS_OPTIONS.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSelectFocus(opt.val)}
                  className="w-full text-left p-3.5 rounded-xl bg-bg/40 border border-stroke hover:border-accent-light/40 hover:bg-bg transition-all text-xs text-text-primary group/opt flex justify-between items-center"
                >
                  <span>{opt.label}</span>
                  <Brain className="w-3.5 h-3.5 text-muted opacity-0 group-hover/opt:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-muted uppercase font-mono tracking-wider">
                <span>SYNAPTIC INHIBITORS</span>
                <span>STEP 4 / 4</span>
              </div>
              <h4 className="text-base font-medium text-text-primary">
                Identify your primary neurological restriction:
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {OBSTACLE_OPTIONS.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSelectObstacle(opt.val)}
                  className="w-full text-left p-3.5 rounded-xl bg-bg/40 border border-stroke hover:border-accent-light/40 hover:bg-bg transition-all text-xs text-text-primary group/opt flex justify-between items-center"
                >
                  <span>{opt.label}</span>
                  <Activity className="w-3.5 h-3.5 text-muted opacity-0 group-hover/opt:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 flex flex-col items-center justify-center space-y-4"
          >
            <RefreshCw className="w-8 h-8 text-accent-light animate-spin" />
            <div className="text-center">
              <p className="text-xs font-mono text-muted tracking-widest uppercase">
                Calculating Synaptic Alignment
              </p>
              <p className="text-[11px] text-muted/60 mt-1">
                Interpreting RAS filters via deep neuroplasticity models...
              </p>
            </div>
          </motion.div>
        )}

        {step === 6 && result && (
          <motion.div
            key="step-6"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="flex justify-between items-start border-b border-stroke pb-4">
              <div>
                <span className="text-[10px] text-accent-light uppercase tracking-widest font-mono">
                  CALIBRATION SYNCHRONIZED
                </span>
                <h5 className="text-xl font-display italic text-text-primary text-gradient">
                  {result.frequencyBandName}
                </h5>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted block font-mono">FREQUENCY</span>
                <span className="text-2xl font-display font-bold text-text-primary tracking-tight">
                  {result.currentFrequencyHz} Hz
                </span>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="bg-bg/40 border border-stroke p-3 rounded-xl space-y-1">
                <span className="text-[9px] font-mono text-muted uppercase tracking-wider block">
                  RAS FILTRATION ACCURACY
                </span>
                <p className="text-xs text-text-primary font-medium">
                  {result.rasStatus}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-bg/40 border border-stroke p-3 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono text-muted uppercase tracking-wider block">
                    NEUROPLASTIC MATRIX
                  </span>
                  <p className="text-[11px] text-muted leading-relaxed">
                    {result.neuroplasticInsight}
                  </p>
                </div>
                <div className="bg-bg/40 border border-stroke p-3 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono text-muted uppercase tracking-wider block">
                    METAPHYSICAL COLLAPSE
                  </span>
                  <p className="text-[11px] text-muted leading-relaxed">
                    {result.metaphysicalBridging}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
                  RECOMMENDED SYNC ROUTINES
                </span>
                <div className="space-y-1.5">
                  {result.actionSteps.map((stepStr, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2.5 items-start text-[11px] text-muted bg-stroke/10 px-3 py-2 rounded-lg"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-light shrink-0 mt-0.5" />
                      <span>{stepStr}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-accent-dark/5 border border-accent-light/10 p-4 rounded-xl relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-1 bg-accent-light h-full" />
                <span className="text-[9px] font-mono text-accent-light uppercase tracking-widest block mb-1">
                  REPROGRAMMING COGNITIVE DECREE
                </span>
                <blockquote className="text-xs font-display italic text-text-primary leading-relaxed px-2">
                  &ldquo;{result.customAffirmation}&rdquo;
                </blockquote>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={resetCalculator}
                className="liquid-glass-button flex-1 text-xs font-bold text-center !py-3 justify-center cursor-pointer"
              >
                Recalibrate Field
              </button>
              <a
                href="#subscription-form"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("subscription-form");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="liquid-glass-button-strong flex-1 text-xs font-bold text-center !py-3 justify-center cursor-pointer block"
              >
                Unlock Audio Guide
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
