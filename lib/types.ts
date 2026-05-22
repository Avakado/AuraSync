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
