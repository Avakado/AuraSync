"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Radio,
  Sparkles,
  Send,
  RefreshCw,
  CheckCircle2,
  Compass,
  Activity,
  HeartPulse,
  Sun,
  Moon,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import type {
  CalibratorDemographics,
  CalibratorPayload,
  CalibratorResult,
  CalibratorSomatic,
  LifeDomainKey,
  LifeWheelScores,
} from "@/lib/types";
import {
  LIFE_DOMAINS,
  DEFAULT_WHEEL,
  computeBaseline,
  fallbackResult,
} from "@/lib/calculator/scoring";
import {
  CoherenceGauge,
  DomainBars,
  FrequencyBridge,
  LifeWheelRadar,
} from "./calculator/charts";

type Step =
  | "intro"
  | "demographics"
  | "intent"
  | "wheel"
  | "somatic"
  | "obstacles"
  | "calculating"
  | "result";

const STEP_ORDER: Step[] = [
  "intro",
  "demographics",
  "intent",
  "wheel",
  "somatic",
  "obstacles",
  "calculating",
  "result",
];

const CLIMATES: Array<{ id: CalibratorDemographics["climate"]; label: string }> = [
  { id: "temperate", label: "Temperate" },
  { id: "tropical", label: "Tropical" },
  { id: "desert", label: "Desert" },
  { id: "arctic", label: "Arctic" },
  { id: "highland", label: "Highland" },
];

const CONTEXTS: Array<{ id: CalibratorDemographics["context"]; label: string; hint: string }> = [
  { id: "founder", label: "Founder / Builder", hint: "Holding a venture" },
  { id: "creator", label: "Creator / Artist", hint: "Shipping work" },
  { id: "student", label: "Student / Learner", hint: "Knowledge ascent" },
  { id: "caregiver", label: "Caregiver / Parent", hint: "Holding others" },
  { id: "athlete", label: "Athlete / Performer", hint: "Body-led" },
  { id: "healer", label: "Healer / Coach", hint: "Service-led" },
  { id: "explorer", label: "Seeker / Explorer", hint: "Open-ended" },
];

const CHRONOTYPES: Array<{ id: CalibratorDemographics["chronotype"]; label: string; icon: React.ReactNode }> = [
  { id: "lark", label: "Morning lark", icon: <Sun className="w-3.5 h-3.5" /> },
  { id: "swing", label: "Steady swing", icon: <Activity className="w-3.5 h-3.5" /> },
  { id: "owl", label: "Night owl", icon: <Moon className="w-3.5 h-3.5" /> },
];

const ENERGY_OPTIONS = [
  "Calm / Grounded",
  "Coherent / Balanced",
  "High beta / Fast firing",
  "Ecstatic / Peak surge",
  "Depleted / Low oscillation",
];

const FOCUS_OPTIONS = [
  "Scattered / Noisy",
  "Linear / Analytical",
  "Diffuse / Receptive",
  "Flow / Effortless",
];

const EMOTION_OPTIONS = [
  "Flow / Receptive",
  "Curious / Open",
  "Heavy / Stuck",
  "Anxious / Spiked",
  "Devotional / Soft",
];

const OBSTACLE_OPTIONS = [
  "Overthinking / Imposter syndrome",
  "Environmental leaks / Focus drain",
  "Subconscious fear / Limbic friction",
  "Synaptic burnout / Energy deficit",
  "Relational static / Boundary fog",
];

const INTENT_TAGS = [
  "Abundance",
  "Healing",
  "Creative ignition",
  "Relational depth",
  "Career leap",
  "Inner peace",
  "Body restoration",
  "Spiritual opening",
];

interface ProgressBarProps {
  step: Step;
}

function ProgressDots({ step }: ProgressBarProps) {
  const visibleSteps: Step[] = STEP_ORDER.filter(
    (s) => s !== "intro" && s !== "calculating" && s !== "result",
  );
  const currentIndex = visibleSteps.indexOf(step);
  return (
    <div className="flex items-center gap-1.5">
      {visibleSteps.map((s, i) => {
        const active = i <= currentIndex;
        return (
          <span
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${active ? "bg-accent-light" : "bg-stroke"}`}
            aria-current={i === currentIndex}
          />
        );
      })}
    </div>
  );
}

interface VibrationCalculatorProps {
  variant?: "default" | "compact";
}

export default function VibrationCalculator({
  variant = "default",
}: VibrationCalculatorProps) {
  const [step, setStep] = useState<Step>("intro");
  const [desire, setDesire] = useState("");
  const [intentionTags, setIntentionTags] = useState<string[]>([]);

  const [demographics, setDemographics] = useState<CalibratorDemographics>({
    age: 32,
    region: "",
    climate: "temperate",
    context: "creator",
    chronotype: "swing",
  });

  const [lifeWheel, setLifeWheel] = useState<LifeWheelScores>(DEFAULT_WHEEL);

  const [somatic, setSomatic] = useState<CalibratorSomatic>({
    energyLevel: "Coherent / Balanced",
    focusStatus: "Diffuse / Receptive",
    predominantEmotion: "Flow / Receptive",
    majorObstacle: OBSTACLE_OPTIONS[0],
    stressLevel: 5,
    recoveryLevel: 5,
  });

  const [result, setResult] = useState<CalibratorResult | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const livePreview = useMemo(() => {
    return computeBaseline({
      desire,
      intentionTags,
      demographics,
      somatic,
      lifeWheel,
    });
  }, [desire, intentionTags, demographics, somatic, lifeWheel]);

  const goTo = (next: Step) => setStep(next);
  const back = () => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) setStep(STEP_ORDER[idx - 1]);
  };

  const toggleTag = (tag: string) => {
    setIntentionTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const updateWheel = (key: LifeDomainKey, value: number) => {
    setLifeWheel((prev) => ({ ...prev, [key]: value }));
  };

  const runCalibration = async () => {
    setWarning(null);
    setStep("calculating");

    const payload: CalibratorPayload = {
      desire: desire || "Creative expansion + somatic synchronization",
      intentionTags,
      demographics,
      somatic,
      lifeWheel,
    };

    try {
      const res = await fetch("/api/manifest/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, version: 2 }),
      });
      if (!res.ok) throw new Error("Sync failed");
      const data = (await res.json()) as CalibratorResult;
      // Guard: if the API returned a v1 shape (no domainSnapshots), use the
      // local baseline charts but keep the AI prose.
      if (!Array.isArray(data.domainSnapshots) || !data.domainSnapshots.length) {
        const baseline = fallbackResult(payload);
        setResult({ ...baseline, ...data, domainSnapshots: baseline.domainSnapshots });
      } else {
        setResult(data);
      }
    } catch {
      setWarning(
        "Live AI synthesis is offline — showing your high-fidelity local calibration instead.",
      );
      setResult(fallbackResult(payload));
    }
    setStep("result");
  };

  const reset = () => {
    setDesire("");
    setIntentionTags([]);
    setLifeWheel(DEFAULT_WHEEL);
    setResult(null);
    setStep("intro");
    setWarning(null);
  };

  return (
    <div
      className="w-full bg-surface border border-stroke rounded-3xl p-6 md:p-8 relative overflow-hidden"
      id="vibe-calculator"
    >
      <div
        className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-accent-light/10 blur-[60px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -left-20 -bottom-20 w-44 h-44 rounded-full bg-accent-dark/5 blur-[50px] pointer-events-none"
        aria-hidden
      />

      <div className="relative space-y-5">
        {step !== "intro" && step !== "calculating" && step !== "result" ? (
          <div className="space-y-3">
            <ProgressDots step={step} />
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted">
              <button
                type="button"
                onClick={back}
                className="inline-flex items-center gap-1 text-muted hover:text-text-primary transition-colors"
              >
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
              <span className="tabular-nums text-accent-light">
                Live baseline · {livePreview.currentFrequencyHz}Hz
              </span>
            </div>
          </div>
        ) : null}

        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-stroke/50 text-accent-light">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-mono block">
                    BIOMETRIC FIELD INDEX · v2
                  </span>
                  <h4 className="text-lg font-medium text-text-primary">
                    Multi-sphere Vibration Calculator
                  </h4>
                </div>
              </div>

              <p className="text-sm text-muted leading-relaxed">
                A six-stage calibration that reads your demographics, life-wheel
                balance, somatic baseline and intention vector — then renders a
                full chart-driven report with current vs target frequency.
              </p>

              <ul className="grid grid-cols-2 gap-2 text-[11px] text-muted">
                {[
                  { icon: <Compass className="w-3.5 h-3.5 text-accent-light" />, label: "Life-wheel radar" },
                  { icon: <HeartPulse className="w-3.5 h-3.5 text-accent-light" />, label: "Coherence gauge" },
                  { icon: <Activity className="w-3.5 h-3.5 text-accent-light" />, label: "Hz current → goal" },
                  { icon: <Sparkles className="w-3.5 h-3.5 text-accent-light" />, label: "Audio prescription" },
                ].map((f) => (
                  <li
                    key={f.label}
                    className="flex items-center gap-2 rounded-xl bg-bg/40 border border-stroke px-3 py-2"
                  >
                    {f.icon}
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => goTo("demographics")}
                className="liquid-glass-button-strong w-full text-xs font-semibold tracking-wider uppercase cursor-pointer justify-center"
              >
                Begin calibration
                <ChevronRight className="w-3.5 h-3.5 text-accent-light" />
              </button>
            </motion.div>
          )}

          {step === "demographics" && (
            <motion.div
              key="demographics"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-5"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                  Step 1 · Field anchors
                </span>
                <h4 className="text-base font-medium text-text-primary">
                  Tell us who is being calibrated
                </h4>
                <p className="text-xs text-muted">
                  Age, location and your daily context shape the Hz curve.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1 col-span-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                    Age
                  </span>
                  <input
                    type="number"
                    min={13}
                    max={120}
                    value={demographics.age}
                    onChange={(e) =>
                      setDemographics((d) => ({
                        ...d,
                        age: Math.max(13, Math.min(120, Number(e.target.value) || 0)),
                      }))
                    }
                    className="w-full bg-bg/50 border border-stroke rounded-xl px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-light/50"
                  />
                </label>
                <label className="space-y-1 col-span-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                    City / region
                  </span>
                  <input
                    type="text"
                    value={demographics.region}
                    placeholder="Lisbon"
                    onChange={(e) =>
                      setDemographics((d) => ({ ...d, region: e.target.value }))
                    }
                    className="w-full bg-bg/50 border border-stroke rounded-xl px-3 py-2 text-sm text-text-primary placeholder:text-muted/60 focus:outline-none focus:border-accent-light/50"
                  />
                </label>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                  Climate band
                </span>
                <div className="flex flex-wrap gap-2">
                  {CLIMATES.map((c) => {
                    const active = demographics.climate === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() =>
                          setDemographics((d) => ({ ...d, climate: c.id }))
                        }
                        className={`px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest border transition-colors ${active ? "bg-accent-light/15 border-accent-light text-text-primary" : "bg-bg/40 border-stroke text-muted hover:text-text-primary"}`}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                  Current life context
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CONTEXTS.map((c) => {
                    const active = demographics.context === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() =>
                          setDemographics((d) => ({ ...d, context: c.id }))
                        }
                        className={`text-left rounded-xl border p-3 transition-colors ${active ? "border-accent-light bg-accent-light/10 text-text-primary" : "border-stroke bg-bg/30 text-muted hover:text-text-primary hover:border-accent-light/40"}`}
                      >
                        <span className="block text-xs font-medium">{c.label}</span>
                        <span className="block text-[10px] mt-0.5 opacity-70 font-mono uppercase tracking-wider">
                          {c.hint}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                  Chronotype
                </span>
                <div className="flex flex-wrap gap-2">
                  {CHRONOTYPES.map((c) => {
                    const active = demographics.chronotype === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() =>
                          setDemographics((d) => ({ ...d, chronotype: c.id }))
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest border transition-colors ${active ? "bg-accent-light/15 border-accent-light text-text-primary" : "bg-bg/40 border-stroke text-muted hover:text-text-primary"}`}
                      >
                        {c.icon}
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => goTo("intent")}
                className="liquid-glass-button-strong w-full text-xs font-semibold tracking-wider uppercase cursor-pointer justify-center"
              >
                Set intention
                <ChevronRight className="w-3.5 h-3.5 text-accent-light" />
              </button>
            </motion.div>
          )}

          {step === "intent" && (
            <motion.div
              key="intent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-5"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                  Step 2 · Intent vector
                </span>
                <h4 className="text-base font-medium text-text-primary">
                  Name the manifestation you are tuning toward
                </h4>
                <p className="text-xs text-muted">
                  Short and specific reads best — one sentence.
                </p>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={desire}
                  onChange={(e) => setDesire(e.target.value)}
                  placeholder="e.g. Scaling my studio to $20k/month with ease"
                  className="w-full bg-bg/50 border border-stroke rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-muted/60 focus:outline-none focus:border-accent-light/50 pr-10"
                />
                <Sparkles className="absolute right-3 top-3.5 w-4 h-4 text-muted" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                  Tag the vibe (multi-select)
                </span>
                <div className="flex flex-wrap gap-2">
                  {INTENT_TAGS.map((tag) => {
                    const active = intentionTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest border transition-colors ${active ? "bg-accent-light/15 border-accent-light text-text-primary" : "bg-bg/40 border-stroke text-muted hover:text-text-primary"}`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => goTo("wheel")}
                disabled={!desire.trim()}
                className="liquid-glass-button-strong w-full text-xs font-semibold tracking-wider uppercase cursor-pointer justify-center disabled:opacity-40 disabled:pointer-events-none"
              >
                Map the wheel
                <Send className="w-3.5 h-3.5 text-accent-light" />
              </button>
            </motion.div>
          )}

          {step === "wheel" && (
            <motion.div
              key="wheel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-5"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                  Step 3 · Life-wheel resonance
                </span>
                <h4 className="text-base font-medium text-text-primary">
                  Score each sphere of your life right now
                </h4>
                <p className="text-xs text-muted">
                  1 means depleted · 10 means thriving. Be honest, not aspirational.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {LIFE_DOMAINS.map((d) => (
                  <label
                    key={d.key}
                    className="space-y-2 rounded-xl bg-bg/40 border border-stroke p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-text-primary">
                        {d.label}
                      </span>
                      <span className="text-[11px] font-mono text-accent-light tabular-nums">
                        {lifeWheel[d.key].toFixed(0)}/10
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={lifeWheel[d.key]}
                      onChange={(e) => updateWheel(d.key, Number(e.target.value))}
                      aria-label={`${d.label} score`}
                      className="w-full accent-[#D6B97A]"
                    />
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-muted">
                      {d.hint}
                    </span>
                  </label>
                ))}
              </div>

              <button
                onClick={() => goTo("somatic")}
                className="liquid-glass-button-strong w-full text-xs font-semibold tracking-wider uppercase cursor-pointer justify-center"
              >
                Continue to somatic read
                <ChevronRight className="w-3.5 h-3.5 text-accent-light" />
              </button>
            </motion.div>
          )}

          {step === "somatic" && (
            <motion.div
              key="somatic"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-5"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                  Step 4 · Somatic baseline
                </span>
                <h4 className="text-base font-medium text-text-primary">
                  How does your body & nervous system feel today?
                </h4>
              </div>

              <SelectField
                label="Energy"
                value={somatic.energyLevel}
                options={ENERGY_OPTIONS}
                onChange={(v) => setSomatic((s) => ({ ...s, energyLevel: v }))}
              />
              <SelectField
                label="Focus"
                value={somatic.focusStatus}
                options={FOCUS_OPTIONS}
                onChange={(v) => setSomatic((s) => ({ ...s, focusStatus: v }))}
              />
              <SelectField
                label="Emotion"
                value={somatic.predominantEmotion}
                options={EMOTION_OPTIONS}
                onChange={(v) =>
                  setSomatic((s) => ({ ...s, predominantEmotion: v }))
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <SliderField
                  label="Stress load"
                  value={somatic.stressLevel}
                  onChange={(v) =>
                    setSomatic((s) => ({ ...s, stressLevel: v }))
                  }
                />
                <SliderField
                  label="Recovery quality"
                  value={somatic.recoveryLevel}
                  onChange={(v) =>
                    setSomatic((s) => ({ ...s, recoveryLevel: v }))
                  }
                />
              </div>

              <button
                onClick={() => goTo("obstacles")}
                className="liquid-glass-button-strong w-full text-xs font-semibold tracking-wider uppercase cursor-pointer justify-center"
              >
                Identify resistance
                <ChevronRight className="w-3.5 h-3.5 text-accent-light" />
              </button>
            </motion.div>
          )}

          {step === "obstacles" && (
            <motion.div
              key="obstacles"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-5"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                  Step 5 · Primary resistance
                </span>
                <h4 className="text-base font-medium text-text-primary">
                  What is actively pulling you off-frequency?
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {OBSTACLE_OPTIONS.map((opt) => {
                  const active = somatic.majorObstacle === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setSomatic((s) => ({ ...s, majorObstacle: opt }))
                      }
                      className={`text-left p-3.5 rounded-xl border transition-colors ${active ? "border-accent-light bg-accent-light/10 text-text-primary" : "border-stroke bg-bg/40 text-muted hover:text-text-primary hover:border-accent-light/40"}`}
                    >
                      <span className="text-xs">{opt}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={runCalibration}
                className="liquid-glass-button-strong w-full text-xs font-semibold tracking-wider uppercase cursor-pointer justify-center"
              >
                Run full calibration
                <Sparkles className="w-3.5 h-3.5 text-accent-light" />
              </button>
            </motion.div>
          )}

          {step === "calculating" && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-14 flex flex-col items-center justify-center space-y-4"
            >
              <RefreshCw className="w-8 h-8 text-accent-light animate-spin" />
              <div className="text-center space-y-1">
                <p className="text-xs font-mono text-muted tracking-widest uppercase">
                  Resolving frequency synthesis
                </p>
                <p className="text-[11px] text-muted/70">
                  Cross-referencing wheel scores · somatic state · intent vector
                </p>
              </div>
            </motion.div>
          )}

          {step === "result" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {warning ? (
                <div className="rounded-xl border border-accent-light/40 bg-accent-light/5 px-3 py-2 text-[11px] font-mono uppercase tracking-widest text-accent-light">
                  {warning}
                </div>
              ) : null}

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-stroke pb-5">
                <div>
                  <span className="text-[10px] text-accent-light uppercase tracking-widest font-mono">
                    Calibration synchronized
                  </span>
                  <h5 className="text-2xl font-display italic text-text-primary">
                    {result.frequencyBandName}
                    <span className="text-muted mx-2">→</span>
                    {result.targetBandName}
                  </h5>
                </div>
                <div className="grid grid-cols-2 gap-3 text-right">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-muted block">
                      Current
                    </span>
                    <span className="text-xl font-display font-bold text-text-primary tabular-nums">
                      {result.currentFrequencyHz}Hz
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-accent-light block">
                      Target
                    </span>
                    <span className="text-xl font-display font-bold text-accent-light tabular-nums">
                      {result.targetFrequencyHz}Hz
                    </span>
                  </div>
                </div>
              </div>

              <FrequencyBridge
                current={result.currentFrequencyHz}
                target={result.targetFrequencyHz}
                currentBand={result.frequencyBandName}
                targetBand={result.targetBandName}
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7 rounded-2xl bg-bg/40 border border-stroke p-4 text-text-primary">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                      Life-wheel · current vs target
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent-light">
                      Radar
                    </span>
                  </div>
                  <LifeWheelRadar
                    snapshots={result.domainSnapshots}
                    className="w-full max-w-[360px] mx-auto"
                  />
                </div>

                <div className="md:col-span-5 space-y-3">
                  <div className="rounded-2xl bg-bg/40 border border-stroke p-4 flex items-center justify-between gap-3">
                    <CoherenceGauge value={result.coherenceScore} label="Coherence" />
                    <div className="grid grid-cols-1 gap-3 text-right">
                      <Stat
                        label="Resilience"
                        value={result.resilienceScore}
                      />
                      <Stat
                        label="Alignment"
                        value={result.alignmentScore}
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-bg/40 border border-stroke p-4 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted block">
                      Primary leverage sphere
                    </span>
                    <span className="text-base font-display italic text-text-primary block">
                      {result.domainSnapshots.find(
                        (d) => d.key === result.primaryFocusDomain,
                      )?.label ?? "Life-wheel"}
                    </span>
                    <p className="text-[11px] text-muted leading-relaxed">
                      {result.domainSnapshots.find(
                        (d) => d.key === result.primaryFocusDomain,
                      )?.insight ??
                        "Anchor one micro-practice in this sphere for compound returns."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-bg/40 border border-stroke p-4 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted block">
                  Domain progress map
                </span>
                <DomainBars snapshots={result.domainSnapshots} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InsightCard
                  title="RAS calibration"
                  body={result.rasStatus}
                />
                <InsightCard
                  title="Neuroplastic frame"
                  body={result.neuroplasticInsight}
                />
                <InsightCard
                  title="Metaphysical bridging"
                  body={result.metaphysicalBridging}
                />
                <InsightCard
                  title={`Audio prescription · ${result.recommendedAudioHz}Hz`}
                  body={result.recommendedAudioRationale}
                  accent
                />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-muted uppercase tracking-widest block">
                  Sync routines for the next {result.ritualWindowHours}
                </span>
                <div className="space-y-1.5">
                  {result.actionSteps.map((stepStr, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2.5 items-start text-[12px] text-muted bg-stroke/10 px-3 py-2 rounded-lg"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-light shrink-0 mt-0.5" />
                      <span>{stepStr}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-accent-dark/5 border border-accent-light/20 p-4 rounded-xl relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-1 bg-accent-light h-full" />
                <span className="text-[9px] font-mono text-accent-light uppercase tracking-widest block mb-1">
                  Reprogramming cognitive decree
                </span>
                <blockquote className="text-sm font-display italic text-text-primary leading-relaxed px-2">
                  &ldquo;{result.customAffirmation}&rdquo;
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={reset}
                  className="liquid-glass-button flex-1 text-xs font-bold text-center !py-3 justify-center cursor-pointer"
                >
                  Recalibrate field
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
                  Unlock audio guide
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {variant === "default" ? null : null}
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
        {label}
      </span>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`text-left text-xs px-3 py-2 rounded-xl border transition-colors ${active ? "border-accent-light bg-accent-light/10 text-text-primary" : "border-stroke bg-bg/40 text-muted hover:text-text-primary hover:border-accent-light/40"}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="space-y-1 rounded-xl bg-bg/40 border border-stroke p-3 block">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
          {label}
        </span>
        <span className="text-[11px] font-mono text-accent-light tabular-nums">
          {value}/10
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#D6B97A]"
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-0.5">
      <span className="text-[9px] font-mono uppercase tracking-widest text-muted block">
        {label}
      </span>
      <span className="text-lg font-display font-medium text-text-primary tabular-nums">
        {value}
      </span>
    </div>
  );
}

function InsightCard({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`p-3.5 rounded-xl border ${accent ? "border-accent-light/40 bg-accent-light/5" : "border-stroke bg-bg/40"} space-y-1`}
    >
      <span
        className={`text-[9px] font-mono uppercase tracking-widest block ${accent ? "text-accent-light" : "text-muted"}`}
      >
        {title}
      </span>
      <p className="text-[11px] text-muted leading-relaxed">{body}</p>
    </div>
  );
}
