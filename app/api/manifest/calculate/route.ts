import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import type {
  CalibratorPayload,
  CalibratorResult,
  NeuroManifestationResult,
  VibrationQuizAnswers,
} from "@/lib/types";
import { fallbackResult, LIFE_DOMAINS } from "@/lib/calculator/scoring";

interface LegacyPayload {
  desire?: string;
  answers?: Partial<VibrationQuizAnswers>;
}

interface V2Payload extends Partial<CalibratorPayload> {
  version?: number;
}

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aurasync-next",
        },
      },
    })
  : null;

function legacyFallback(body: LegacyPayload): NeuroManifestationResult {
  const answers = body.answers ?? {};
  const desire = body.desire || "creative freedom";
  const energyLevel = answers.energyLevel ?? "calm";
  const focusStatus = answers.focusStatus ?? "seeking focus";
  const majorObstacle = answers.majorObstacle ?? "overthinking";

  let scoreRange = 432;
  if (energyLevel.toLowerCase().includes("ecstatic")) scoreRange += 100;
  if (focusStatus.toLowerCase().includes("flow")) scoreRange += 80;
  if (majorObstacle.toLowerCase().includes("fear")) scoreRange -= 50;

  return {
    currentFrequencyHz: scoreRange,
    frequencyBandName: "Coherent Beta Resonance",
    rasStatus: "Highly Active; Primed for Syncing",
    neuroplasticInsight:
      "Your synaptic pathways are currently firing in a fast, analytical configuration. While this enhances logical processing, it can reinforce default mode network (DMN) overactivity, temporarily filtering out non-linear environmental coincidences.",
    metaphysicalBridging:
      "By shifting concentration toward subconscious states, you will drop neural resistance, aligning your aura with the wave probability of your chosen vector.",
    actionSteps: [
      "Integrate a 5-minute pre-sleep somatic release pattern to suppress analytical noise.",
      "Calibrate your RAS visually by indexing three occurrences of your target theme within 24 hours.",
      "Utilize theta-frequency sound washes while journaling your intention as an accomplished past reality.",
    ],
    customAffirmation: `My neural circuits are rewiring to decode ${desire} with effortless focus and perfect clarity.`,
  };
}

function isV2Payload(input: unknown): input is V2Payload {
  if (!input || typeof input !== "object") return false;
  const v = input as Record<string, unknown>;
  return (
    v.version === 2 ||
    "lifeWheel" in v ||
    "demographics" in v ||
    "intentionTags" in v
  );
}

async function runV2(payload: V2Payload): Promise<CalibratorResult> {
  const ensured: CalibratorPayload = {
    desire: payload.desire || "Creative expansion + somatic synchronization",
    intentionTags: payload.intentionTags ?? [],
    demographics: {
      age: payload.demographics?.age ?? 32,
      region: payload.demographics?.region ?? "",
      climate: payload.demographics?.climate ?? "temperate",
      context: payload.demographics?.context ?? "creator",
      chronotype: payload.demographics?.chronotype ?? "swing",
    },
    somatic: {
      energyLevel: payload.somatic?.energyLevel ?? "Coherent / Balanced",
      focusStatus: payload.somatic?.focusStatus ?? "Diffuse / Receptive",
      predominantEmotion:
        payload.somatic?.predominantEmotion ?? "Flow / Receptive",
      majorObstacle:
        payload.somatic?.majorObstacle ?? "Overthinking / Imposter syndrome",
      stressLevel: payload.somatic?.stressLevel ?? 5,
      recoveryLevel: payload.somatic?.recoveryLevel ?? 5,
    },
    lifeWheel: {
      health: payload.lifeWheel?.health ?? 5,
      nutrition: payload.lifeWheel?.nutrition ?? 5,
      sleep: payload.lifeWheel?.sleep ?? 5,
      relationships: payload.lifeWheel?.relationships ?? 5,
      purpose: payload.lifeWheel?.purpose ?? 5,
      finances: payload.lifeWheel?.finances ?? 5,
      spirituality: payload.lifeWheel?.spirituality ?? 5,
      play: payload.lifeWheel?.play ?? 5,
    },
  };

  const baseline = fallbackResult(ensured);
  if (!ai) return baseline;

  const wheelLines = LIFE_DOMAINS.map(
    (d) =>
      `  - ${d.label}: ${ensured.lifeWheel[d.key]}/10 (${d.description.toLowerCase()})`,
  ).join("\n");

  const prompt = `Generate a sophisticated "Multi-Sphere Neuro-Manifestation Frequency Calibration" report for a user with this complete profile:

Demographics:
  - Age: ${ensured.demographics.age}
  - Region: ${ensured.demographics.region || "unspecified"}
  - Climate band: ${ensured.demographics.climate}
  - Daily context: ${ensured.demographics.context}
  - Chronotype: ${ensured.demographics.chronotype}

Intent vector:
  - Stated manifestation: "${ensured.desire}"
  - Tagged vibes: ${ensured.intentionTags.join(", ") || "(none)"}

Somatic baseline:
  - Energy: ${ensured.somatic.energyLevel}
  - Focus: ${ensured.somatic.focusStatus}
  - Emotion: ${ensured.somatic.predominantEmotion}
  - Major obstacle: ${ensured.somatic.majorObstacle}
  - Stress load: ${ensured.somatic.stressLevel}/10
  - Recovery quality: ${ensured.somatic.recoveryLevel}/10

Life wheel scores:
${wheelLines}

For grounding, our internal scoring engine baselined the report as:
  - Current frequency: ${baseline.currentFrequencyHz}Hz (${baseline.frequencyBandName})
  - Target frequency: ${baseline.targetFrequencyHz}Hz (${baseline.targetBandName})
  - Coherence: ${baseline.coherenceScore} · Resilience: ${baseline.resilienceScore} · Alignment: ${baseline.alignmentScore}
  - Primary leverage sphere: ${baseline.primaryFocusDomain}
  - Recommended audio: ${baseline.recommendedAudioHz}Hz (${baseline.recommendedAudioRationale})

Refine and personalize the report. Keep frequency numbers within ±40Hz of baseline so the charts stay coherent. Domain snapshots MUST contain exactly one entry per life-wheel key (health, nutrition, sleep, relationships, purpose, finances, spirituality, play) and the "current" values MUST exactly match the user's submitted scores. Use the "target" field to suggest a realistic 30-day lift (typically +1 to +3 from current, capped at 10). Insights per domain should be one short, specific sentence tied to that user's context.

Tone: scientifically rigorous, mystical, futuristic, elegant. Bridge neuroplasticity (RAS, myelination, synaptic pruning) with metaphysical frequency theory. Avoid clichés.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are an elite neuro-manifestation analyst for AuraSync. You produce strictly-typed, chart-ready JSON for a calibration dashboard. Numbers must be plausible, never hand-wavy.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "currentFrequencyHz",
            "targetFrequencyHz",
            "frequencyBandName",
            "targetBandName",
            "coherenceScore",
            "resilienceScore",
            "alignmentScore",
            "rasStatus",
            "neuroplasticInsight",
            "metaphysicalBridging",
            "actionSteps",
            "customAffirmation",
            "recommendedAudioHz",
            "recommendedAudioRationale",
            "domainSnapshots",
            "primaryFocusDomain",
            "ritualWindowHours",
          ],
          properties: {
            currentFrequencyHz: { type: Type.INTEGER },
            targetFrequencyHz: { type: Type.INTEGER },
            frequencyBandName: { type: Type.STRING },
            targetBandName: { type: Type.STRING },
            coherenceScore: { type: Type.INTEGER },
            resilienceScore: { type: Type.INTEGER },
            alignmentScore: { type: Type.INTEGER },
            rasStatus: { type: Type.STRING },
            neuroplasticInsight: { type: Type.STRING },
            metaphysicalBridging: { type: Type.STRING },
            actionSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
            customAffirmation: { type: Type.STRING },
            recommendedAudioHz: { type: Type.INTEGER },
            recommendedAudioRationale: { type: Type.STRING },
            primaryFocusDomain: {
              type: Type.STRING,
              enum: [
                "health",
                "nutrition",
                "sleep",
                "relationships",
                "purpose",
                "finances",
                "spirituality",
                "play",
              ],
            },
            ritualWindowHours: { type: Type.STRING },
            domainSnapshots: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["key", "label", "current", "target", "insight"],
                properties: {
                  key: {
                    type: Type.STRING,
                    enum: [
                      "health",
                      "nutrition",
                      "sleep",
                      "relationships",
                      "purpose",
                      "finances",
                      "spirituality",
                      "play",
                    ],
                  },
                  label: { type: Type.STRING },
                  current: { type: Type.NUMBER },
                  target: { type: Type.NUMBER },
                  insight: { type: Type.STRING },
                },
              },
            },
          },
        },
      },
    });

    const text = response.text ?? "{}";
    const parsed = JSON.parse(text.trim()) as CalibratorResult;

    // Defensive merge: keep AI strings, but force-correct any numeric drift
    // from the baseline so the charts stay believable.
    const merged: CalibratorResult = {
      ...baseline,
      ...parsed,
      domainSnapshots:
        Array.isArray(parsed.domainSnapshots) && parsed.domainSnapshots.length
          ? parsed.domainSnapshots.map((snap) => {
              const submitted = ensured.lifeWheel[snap.key];
              return {
                ...snap,
                current:
                  typeof submitted === "number" ? submitted : snap.current,
              };
            })
          : baseline.domainSnapshots,
    };
    return merged;
  } catch (error) {
    console.error("Gemini v2 calibration error", error);
    return baseline;
  }
}

async function runLegacy(body: LegacyPayload) {
  if (!ai) return legacyFallback(body);

  const { answers = {}, desire } = body;
  const { energyLevel, focusStatus, predominantEmotion, majorObstacle } =
    answers;

  const prompt = `Perform a high-fidelity "Neuro-Manifestation Frequency Sync Analysis" for a user whose current state is:
- Energy level: ${energyLevel || "Balanced"} (on scale of calm to ecstatic)
- Focus level: ${focusStatus || "Scattered focus"}
- Predominant emotional undertone: ${predominantEmotion || "Contemplative"}
- Major spiritual/neuro-cognitive obstacle: ${majorObstacle || "Overthinking"}
- Desired manifestation vector (desire): "${desire || "Creative alignment and abundance"}"

Provide a highly polished, scientifically rigorous yet deeply mystical response bridging neuroplasticity (Reticular Activating System alignment, myelination, synaptic pruning) and spiritual frequency theory. Keep the tone sophisticated, stylish, and futuristic.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are an elite neuro-manifestation AI analyst for AuraSync, trained in neuroplasticity, quantum cognitive science, and metaphysical frequency modeling. You break down skepticism using real brain science then elevate it with pristine, poetic, aesthetic esotericism.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "currentFrequencyHz",
            "frequencyBandName",
            "rasStatus",
            "neuroplasticInsight",
            "metaphysicalBridging",
            "actionSteps",
            "customAffirmation",
          ],
          properties: {
            currentFrequencyHz: {
              type: Type.INTEGER,
              description:
                "Estimated synchronized current brain/intent frequency in Hz (between 60 and 960Hz).",
            },
            frequencyBandName: {
              type: Type.STRING,
              description:
                "A gorgeous, stylized name for their current vibration zone.",
            },
            rasStatus: { type: Type.STRING },
            neuroplasticInsight: { type: Type.STRING },
            metaphysicalBridging: { type: Type.STRING },
            actionSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            customAffirmation: { type: Type.STRING },
          },
        },
      },
    });

    const text = response.text ?? "{}";
    return JSON.parse(text.trim()) as NeuroManifestationResult;
  } catch (error) {
    console.error("Gemini legacy calibration error", error);
    return legacyFallback(body);
  }
}

export async function POST(request: Request) {
  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  if (isV2Payload(body)) {
    const result = await runV2(body);
    return NextResponse.json(result);
  }

  const legacy = await runLegacy(body as LegacyPayload);
  return NextResponse.json(legacy);
}
