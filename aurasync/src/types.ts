// Shared UI type definitions for AuraSync portfolio

export interface Project {
  id: string;
  title: string;
  category: string;
  columnSpan: string; // Tailwind grid span
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
  content: string; // The in-depth article body
}

export interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  rotation: string; // CSS rotation degrees for visual scatter
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
