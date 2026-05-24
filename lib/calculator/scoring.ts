import type {
  CalibratorPayload,
  CalibratorResult,
  DomainSnapshot,
  LifeDomain,
  LifeDomainKey,
  LifeWheelScores,
} from "@/lib/types";

export const LIFE_DOMAINS: LifeDomain[] = [
  {
    key: "health",
    label: "Health & body",
    description: "Energy, movement, somatic vitality",
    hint: "10 = thriving · 1 = depleted",
    icon: "heart",
    band: "#E8B86F",
  },
  {
    key: "nutrition",
    label: "Nutrition",
    description: "Food, hydration, biochemical fuel",
    hint: "10 = nourished · 1 = chaotic",
    icon: "leaf",
    band: "#9DD49B",
  },
  {
    key: "sleep",
    label: "Sleep & recovery",
    description: "Depth, length, restoration",
    hint: "10 = restorative · 1 = fragmented",
    icon: "moon",
    band: "#7FB7D1",
  },
  {
    key: "relationships",
    label: "Relationships",
    description: "Family, partners, social fabric",
    hint: "10 = supported · 1 = isolated",
    icon: "users",
    band: "#D89BCB",
  },
  {
    key: "purpose",
    label: "Purpose & work",
    description: "Meaningful contribution, growth",
    hint: "10 = aligned · 1 = drifting",
    icon: "compass",
    band: "#C8A87D",
  },
  {
    key: "finances",
    label: "Finances",
    description: "Stability, abundance, flow",
    hint: "10 = abundant · 1 = strained",
    icon: "trending-up",
    band: "#9AC79A",
  },
  {
    key: "spirituality",
    label: "Spirituality",
    description: "Awe, meaning, connection to source",
    hint: "10 = devotional · 1 = numb",
    icon: "sparkles",
    band: "#B8A1E8",
  },
  {
    key: "play",
    label: "Play & creativity",
    description: "Joy, art, lightness",
    hint: "10 = childlike · 1 = grey",
    icon: "music",
    band: "#F1B5A4",
  },
];

export const DEFAULT_WHEEL: LifeWheelScores = {
  health: 5,
  nutrition: 5,
  sleep: 5,
  relationships: 5,
  purpose: 5,
  finances: 5,
  spirituality: 5,
  play: 5,
};

const FREQUENCY_BANDS: Array<{ name: string; min: number; max: number; audioHz: number; rationale: string }> = [
  { name: "Root Stillness", min: 60, max: 200, audioHz: 174, rationale: "Earthing 174Hz tone for nervous-system safety." },
  { name: "Sacral Restoration", min: 200, max: 330, audioHz: 285, rationale: "285Hz Solfeggio for cellular re-knit." },
  { name: "Schumann Anchor", min: 330, max: 410, audioHz: 396, rationale: "396Hz to dissolve fear loops + lock the Schumann field." },
  { name: "Alpha-Coherent Field", min: 410, max: 490, audioHz: 432, rationale: "432Hz binaural alpha to coast in receptive flow." },
  { name: "DNA Repair Vector", min: 490, max: 570, audioHz: 528, rationale: "528Hz \"miracle tone\" for cellular intent imprinting." },
  { name: "Heart Coherence", min: 570, max: 660, audioHz: 639, rationale: "639Hz heart-rate-variability uplift + relational warmth." },
  { name: "Vocal Truth", min: 660, max: 760, audioHz: 741, rationale: "741Hz for expressive clarity + boundary integrity." },
  { name: "Pineal Awakening", min: 760, max: 880, audioHz: 852, rationale: "852Hz to unlatch intuition and pattern recognition." },
  { name: "Gamma Expansion", min: 880, max: 1000, audioHz: 963, rationale: "963Hz crown frequency for non-dual perception." },
];

function bandForHz(hz: number) {
  return (
    FREQUENCY_BANDS.find((b) => hz >= b.min && hz <= b.max) ??
    FREQUENCY_BANDS[3]
  );
}

const STRESS_WORDS: Record<string, number> = {
  ecstatic: 8.5,
  flow: 7.2,
  receptive: 6.4,
  grounded: 7,
  balanced: 7,
  coherent: 7.4,
  contemplative: 6,
  scattered: 4,
  anxious: 3,
  burnt: 2.4,
  depleted: 2.8,
  fear: 2.6,
};

function lexicalScore(text: string | undefined, fallback: number): number {
  if (!text) return fallback;
  const haystack = text.toLowerCase();
  let total = 0;
  let matches = 0;
  for (const [word, score] of Object.entries(STRESS_WORDS)) {
    if (haystack.includes(word)) {
      total += score;
      matches += 1;
    }
  }
  return matches ? total / matches : fallback;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function average(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((s, v) => s + v, 0) / values.length;
}

function deviation(values: number[], mean: number): number {
  if (!values.length) return 0;
  const variance =
    values.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}

function ageModifier(age: number) {
  // Modest age-based modulation: younger cohorts skew toward higher beta;
  // elders skew toward alpha/theta calm. ±20 Hz range across the spectrum.
  if (age <= 24) return 18;
  if (age <= 34) return 10;
  if (age <= 44) return 0;
  if (age <= 54) return -8;
  if (age <= 64) return -14;
  return -20;
}

function climateModifier(climate: string) {
  switch (climate) {
    case "tropical":
      return 8;
    case "highland":
      return 12;
    case "arctic":
      return -10;
    case "desert":
      return 4;
    default:
      return 0;
  }
}

function contextModifier(context: string) {
  switch (context) {
    case "founder":
      return 18;
    case "creator":
      return 14;
    case "healer":
      return 10;
    case "athlete":
      return 8;
    case "student":
      return 4;
    case "caregiver":
      return -2;
    default:
      return 0;
  }
}

function chronoModifier(chronotype: string) {
  switch (chronotype) {
    case "lark":
      return 6;
    case "owl":
      return -4;
    default:
      return 0;
  }
}

export interface ScoringResult {
  currentFrequencyHz: number;
  targetFrequencyHz: number;
  coherenceScore: number;
  resilienceScore: number;
  alignmentScore: number;
  domainSnapshots: DomainSnapshot[];
  primaryFocusDomain: LifeDomainKey;
  baselineBand: ReturnType<typeof bandForHz>;
  targetBand: ReturnType<typeof bandForHz>;
}

/**
 * Local, deterministic scoring engine. Always returns chart-ready numbers so
 * the UI can render the radar/gauges instantly, even if Gemini is unavailable
 * or still streaming.
 */
export function computeBaseline(payload: CalibratorPayload): ScoringResult {
  const { demographics, somatic, lifeWheel } = payload;

  const wheelValues = Object.values(lifeWheel);
  const wheelMean = average(wheelValues);
  const wheelDeviation = deviation(wheelValues, wheelMean);

  const energyScore = lexicalScore(somatic.energyLevel, 5);
  const focusScore = lexicalScore(somatic.focusStatus, 5);
  const emotionScore = lexicalScore(somatic.predominantEmotion, 5);
  const obstaclePenalty = lexicalScore(somatic.majorObstacle, 5) - 5;

  const somaticAverage =
    (energyScore + focusScore + emotionScore) / 3 -
    obstaclePenalty * 0.4 +
    (somatic.recoveryLevel - somatic.stressLevel) * 0.25;

  // Start at 432 (alpha) and shift up/down based on weighted inputs.
  const weighted =
    wheelMean * 24 + // 1-10 wheel mean → ~24–240 push
    somaticAverage * 14 +
    ageModifier(demographics.age) +
    climateModifier(demographics.climate) +
    contextModifier(demographics.context) +
    chronoModifier(demographics.chronotype);

  const currentFrequencyHz = clamp(Math.round(320 + weighted * 0.6), 90, 960);

  // Target band lifts toward 528–639 based on intent text + chosen tags.
  const intentBoost = Math.min(80, (payload.intentionTags?.length ?? 0) * 18);
  const targetFrequencyHz = clamp(
    Math.round(currentFrequencyHz + 96 + intentBoost),
    currentFrequencyHz + 30,
    980,
  );

  // 0-100 scores.
  const coherenceScore = clamp(
    Math.round(100 - wheelDeviation * 12 + somaticAverage * 3),
    18,
    99,
  );
  const resilienceScore = clamp(
    Math.round(
      wheelMean * 6 + somatic.recoveryLevel * 4 - somatic.stressLevel * 2.5 + 30,
    ),
    14,
    99,
  );
  const alignmentScore = clamp(
    Math.round((coherenceScore + resilienceScore) / 2 + intentBoost * 0.15),
    20,
    99,
  );

  // Per-domain target = current + lift, weighted by how far below the wheel
  // mean each domain currently sits.
  const domainSnapshots: DomainSnapshot[] = LIFE_DOMAINS.map((d) => {
    const current = lifeWheel[d.key];
    const gap = Math.max(0, wheelMean - current);
    const lift = clamp(Math.round(1.2 + gap * 0.6), 1, 4);
    const target = clamp(current + lift, current, 10);

    const insight =
      current >= 8
        ? `${d.label} is your anchor — protect this band.`
        : current >= 6
          ? `${d.label} is stable; one disciplined upgrade keeps it climbing.`
          : current >= 4
            ? `${d.label} is the leverage point — a small ritual moves it fastest.`
            : `${d.label} needs immediate recalibration; choose one micro-practice this week.`;

    return { key: d.key, label: d.label, current, target, insight };
  });

  // Lowest scoring sphere = primary focus domain.
  const primaryFocusDomain = domainSnapshots.reduce((acc, snap) =>
    snap.current < acc.current ? snap : acc,
  ).key;

  return {
    currentFrequencyHz,
    targetFrequencyHz,
    coherenceScore,
    resilienceScore,
    alignmentScore,
    domainSnapshots,
    primaryFocusDomain,
    baselineBand: bandForHz(currentFrequencyHz),
    targetBand: bandForHz(targetFrequencyHz),
  };
}

export function fallbackResult(payload: CalibratorPayload): CalibratorResult {
  const base = computeBaseline(payload);
  const focusDomain = LIFE_DOMAINS.find(
    (d) => d.key === base.primaryFocusDomain,
  );
  const focusLabel = focusDomain?.label ?? "your weakest sphere";

  return {
    currentFrequencyHz: base.currentFrequencyHz,
    targetFrequencyHz: base.targetFrequencyHz,
    frequencyBandName: base.baselineBand.name,
    targetBandName: base.targetBand.name,
    coherenceScore: base.coherenceScore,
    resilienceScore: base.resilienceScore,
    alignmentScore: base.alignmentScore,
    rasStatus:
      base.coherenceScore >= 70
        ? "RAS filters are tight and well-tuned — small refinements unlock the next octave."
        : base.coherenceScore >= 50
          ? "RAS filters are partially open; structured ritual will widen the receptive bandwidth."
          : "RAS filters are noisy — re-anchor the somatic baseline before scaling intent.",
    neuroplasticInsight: `Your dominant load right now is ${focusLabel.toLowerCase()}. Routing 12 minutes of attention here daily compounds neuroplastic gains across every adjacent domain.`,
    metaphysicalBridging: `${base.baselineBand.name} → ${base.targetBand.name}: bridging this band lets your aura emit the carrier wave that ${payload.desire || "your stated intention"} needs to land.`,
    actionSteps: [
      `Run a 9-minute ${base.targetBand.audioHz}Hz audio bath during your ${payload.demographics.chronotype === "lark" ? "morning ignition" : payload.demographics.chronotype === "owl" ? "late-night downshift" : "midday plateau"} window.`,
      `Stack ${focusLabel.toLowerCase()} with one existing habit (e.g. while brewing your first drink).`,
      `Journal one paragraph naming the new identity that ships ${payload.desire || "your manifestation"} into reality.`,
      `Close the loop with three intentional somatic exhales before lights-out.`,
    ],
    customAffirmation: `I am the calm carrier of ${payload.desire || "my chosen frequency"}, and every sphere of my life is tuning up to receive it.`,
    recommendedAudioHz: base.targetBand.audioHz,
    recommendedAudioRationale: base.targetBand.rationale,
    domainSnapshots: base.domainSnapshots,
    primaryFocusDomain: base.primaryFocusDomain,
    ritualWindowHours:
      payload.demographics.chronotype === "lark"
        ? "06:00 – 07:30 local"
        : payload.demographics.chronotype === "owl"
          ? "22:30 – 00:00 local"
          : "12:30 – 13:30 local",
  };
}
