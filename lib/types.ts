export interface Project {
  id: string;
  title: string;
  category: string;
  columnSpan: string;
  image: string;
  aspectRatio: string;
  description: string;
  tech: string[];
  vibeLink?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  rotation: string;
}

export interface VibrationQuizAnswers {
  energyLevel: string;
  focusStatus: string;
  predominantEmotion: string;
  majorObstacle: string;
}

// ---- v2: enriched life-wheel + demographics calculator ----------------------

export type LifeDomainKey =
  | "health"
  | "nutrition"
  | "sleep"
  | "relationships"
  | "purpose"
  | "finances"
  | "spirituality"
  | "play";

export interface LifeDomain {
  key: LifeDomainKey;
  label: string;
  description: string;
  hint: string;
  icon: string;
  band: string; // colour band for the chart
}

export type LifeWheelScores = Record<LifeDomainKey, number>;

export interface CalibratorDemographics {
  age: number;
  region: string; // free-form (city or country)
  climate: "temperate" | "tropical" | "arctic" | "desert" | "highland";
  context: "creator" | "founder" | "student" | "caregiver" | "athlete" | "healer" | "explorer";
  chronotype: "lark" | "swing" | "owl";
}

export interface CalibratorSomatic {
  energyLevel: string;
  focusStatus: string;
  predominantEmotion: string;
  majorObstacle: string;
  stressLevel: number; // 1-10
  recoveryLevel: number; // 1-10
}

export interface CalibratorPayload {
  desire: string;
  intentionTags: string[];
  demographics: CalibratorDemographics;
  somatic: CalibratorSomatic;
  lifeWheel: LifeWheelScores;
}

export interface DomainSnapshot {
  key: LifeDomainKey;
  label: string;
  current: number; // 1-10
  target: number; // 1-10
  insight: string; // 1 line
}

export interface CalibratorResult {
  currentFrequencyHz: number;
  targetFrequencyHz: number;
  frequencyBandName: string;
  targetBandName: string;
  coherenceScore: number; // 0-100
  resilienceScore: number; // 0-100
  alignmentScore: number; // 0-100
  rasStatus: string;
  neuroplasticInsight: string;
  metaphysicalBridging: string;
  actionSteps: string[];
  customAffirmation: string;
  recommendedAudioHz: number;
  recommendedAudioRationale: string;
  domainSnapshots: DomainSnapshot[];
  primaryFocusDomain: LifeDomainKey;
  ritualWindowHours: string; // e.g. "21:30 – 23:00 local"
}

// Backwards-compatible shape returned by `/api/manifest/calculate` so older
// consumers (e.g. the existing single-call POST) keep working unchanged.
export interface NeuroManifestationResult {
  currentFrequencyHz: number;
  frequencyBandName: string;
  rasStatus: string;
  neuroplasticInsight: string;
  metaphysicalBridging: string;
  actionSteps: string[];
  customAffirmation: string;
}

export interface StatMetric {
  metric: string;
  label: string;
  subText: string;
}

export interface InfoSection {
  slug: string;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  insights: Array<{ title: string; desc: string }>;
  metrics: Array<{ label: string; val: string }>;
  longRead: string;
}
