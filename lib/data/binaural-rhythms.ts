export interface BinauralBand {
  id: string;
  name: string;
  beatHz: number;
  rangeLabel: string;
  state: string;
  carrierBase: number;
  color: string;
  description: string;
}

export interface DailyRhythmSlot {
  id: string;
  window: string;
  label: string;
  bandId: string;
  beatHz: number;
  duration: string;
  intent: string;
  tip: string;
}

export interface HourlyRhythmPhase {
  id: string;
  phase: string;
  minutes: string;
  bandId: string;
  beatHz: number;
  intent: string;
  action: string;
}

export interface SetupStep {
  step: number;
  title: string;
  body: string;
  detail?: string;
}

export const BINAURAL_BANDS: BinauralBand[] = [
  {
    id: "delta",
    name: "Delta",
    beatHz: 2,
    rangeLabel: "0.5 – 4 Hz",
    state: "Deep sleep · cellular repair",
    carrierBase: 200,
    color: "indigo",
    description:
      "Slowest entrainment band. Used for restorative sleep, immune recovery, and nervous-system downshift after high stress.",
  },
  {
    id: "theta",
    name: "Theta",
    beatHz: 6,
    rangeLabel: "4 – 8 Hz",
    state: "Meditation · creative drift",
    carrierBase: 220,
    color: "violet",
    description:
      "The hypnagogic corridor between waking and dreaming. Ideal for visualization, journaling, and subconscious reprogramming.",
  },
  {
    id: "alpha",
    name: "Alpha",
    beatHz: 10,
    rangeLabel: "8 – 12 Hz",
    state: "Calm focus · receptive flow",
    carrierBase: 240,
    color: "emerald",
    description:
      "Relaxed alertness — the bridge state where the analytical mind softens without losing clarity. Best for learning and gentle reset.",
  },
  {
    id: "beta",
    name: "Beta",
    beatHz: 16,
    rangeLabel: "12 – 30 Hz",
    state: "Analytical sprint · execution",
    carrierBase: 260,
    color: "amber",
    description:
      "High cognitive throughput. Use for deep work blocks, problem-solving, and structured output — not for winding down.",
  },
  {
    id: "gamma",
    name: "Gamma",
    beatHz: 40,
    rangeLabel: "30 – 100 Hz",
    state: "Peak binding · insight bursts",
    carrierBase: 280,
    color: "rose",
    description:
      "Short, intense bursts only. Associated with integrative cognition and sudden insight — keep sessions under 20 minutes.",
  },
];

export const DAILY_RHYTHMS: DailyRhythmSlot[] = [
  {
    id: "dawn",
    window: "06:00 – 08:00",
    label: "Dawn ignition",
    bandId: "alpha",
    beatHz: 10,
    duration: "12 – 18 min",
    intent: "Gentle cortical wake-up without spiking adrenaline.",
    tip: "Pair with slow breathing (4-4-6) before checking notifications.",
  },
  {
    id: "focus-am",
    window: "08:00 – 12:00",
    label: "Morning execution",
    bandId: "beta",
    beatHz: 16,
    duration: "25 – 45 min",
    intent: "Linear focus for building, writing, and decision work.",
    tip: "Run one block, then a 5-minute silence gap — do not stack back-to-back.",
  },
  {
    id: "midday",
    window: "12:00 – 13:30",
    label: "Midday recalibration",
    bandId: "alpha",
    beatHz: 8,
    duration: "10 – 15 min",
    intent: "Parasympathetic reset after the morning cortisol peak.",
    tip: "Eyes closed or soft gaze — this is a downshift, not another sprint.",
  },
  {
    id: "focus-pm",
    window: "13:30 – 17:00",
    label: "Afternoon deep lane",
    bandId: "beta",
    beatHz: 14,
    duration: "25 – 40 min",
    intent: "Sustain output through the post-lunch dip with lighter beta.",
    tip: "Drop beat to 12 Hz if you feel jittery — sensitivity rises after noon.",
  },
  {
    id: "creative",
    window: "17:00 – 19:00",
    label: "Creative decompression",
    bandId: "theta",
    beatHz: 6,
    duration: "15 – 25 min",
    intent: "Open diffuse mode for art, ideation, and somatic release.",
    tip: "Best paired with movement or freewriting — not screens.",
  },
  {
    id: "evening",
    window: "19:00 – 22:00",
    label: "Evening coherence",
    bandId: "alpha",
    beatHz: 9,
    duration: "12 – 20 min",
    intent: "Social ease, relational warmth, and pre-sleep downshift.",
    tip: "Lower volume here — the beat should feel like a pulse, not a signal.",
  },
  {
    id: "sleep",
    window: "22:00 – 06:00",
    label: "Nocturnal delta",
    bandId: "delta",
    beatHz: 2,
    duration: "45 – 90 min loop",
    intent: "Deep sleep entrainment and limbic offloading.",
    tip: "Use a sleep timer. Remove headphones once drowsy if uncomfortable.",
  },
];

export const HOURLY_RHYTHMS: HourlyRhythmPhase[] = [
  {
    id: "sprint-1",
    phase: "Focus sprint I",
    minutes: "0 – 25 min",
    bandId: "beta",
    beatHz: 16,
    intent: "Maximum analytical throughput at cycle start.",
    action: "Single task only. Phone in another room.",
  },
  {
    id: "micro-break",
    phase: "Ultradian dip",
    minutes: "25 – 30 min",
    bandId: "alpha",
    beatHz: 10,
    intent: "Allow the brain's natural 90-minute rhythm to breathe.",
    action: "Stand, hydrate, no inputs. Let the beat wash without focus.",
  },
  {
    id: "sprint-2",
    phase: "Focus sprint II",
    minutes: "30 – 55 min",
    bandId: "beta",
    beatHz: 14,
    intent: "Second lane with slightly softer beta — fatigue accumulates.",
    action: "Same task or tightly related sub-task. No context switching.",
  },
  {
    id: "recovery",
    phase: "Cycle recovery",
    minutes: "55 – 90 min",
    bandId: "theta",
    beatHz: 5,
    intent: "Consolidate what you built; open associative networks.",
    action: "Walk, stretch, or journal. Prepare the next 90-minute block.",
  },
];

export const SETUP_STEPS: SetupStep[] = [
  {
    step: 1,
    title: "Stereo headphones — non-negotiable",
    body: "Binaural beats only form inside the brain when each ear receives a slightly different carrier frequency. Speakers or mono output collapse the effect.",
    detail: "Closed-back headphones with flat response work best. Keep volume low.",
  },
  {
    step: 2,
    title: "Pick a carrier frequency",
    body: "Most sessions use a pleasant base tone between 200 Hz and 400 Hz. The carrier should feel neutral — you listen for the pulse, not the tone itself.",
    detail: "AuraSync defaults: left ear = carrier, right ear = carrier + beat offset.",
  },
  {
    step: 3,
    title: "Set the beat offset (= target brainwave)",
    body: "The perceived binaural beat equals the difference between left and right carriers. For 10 Hz Alpha with a 240 Hz base: left 240 Hz, right 250 Hz.",
    detail: "Formula: beatHz = |rightCarrier − leftCarrier|",
  },
  {
    step: 4,
    title: "Match rhythm to your clock",
    body: "Daily rhythms follow circadian biology — beta in daylight, theta at dusk, delta at night. Hourly rhythms follow ultradian 90-minute focus cycles inside each day.",
    detail: "Never run beta entrainment within 2 hours of sleep onset.",
  },
  {
    step: 5,
    title: "Session length & fade",
    body: "Entrainment typically stabilizes after 8–15 minutes. Most blocks run 15–45 minutes. Always fade volume out over 60 seconds — hard stops jar the nervous system.",
    detail: "Pair with the calibrator output Hz for a coherent intent + entrainment stack.",
  },
];

export function bandById(id: string): BinauralBand | undefined {
  return BINAURAL_BANDS.find((b) => b.id === id);
}

export function carrierPair(beatHz: number, base = 240) {
  return { left: base, right: base + beatHz, beat: beatHz };
}
