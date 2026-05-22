import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import type {
  NeuroManifestationResult,
  VibrationQuizAnswers,
} from "@/lib/types";

interface RequestPayload {
  desire?: string;
  answers?: Partial<VibrationQuizAnswers>;
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

function fallbackInsight(body: RequestPayload): NeuroManifestationResult {
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

export async function POST(request: Request) {
  let body: RequestPayload = {};
  try {
    body = (await request.json()) as RequestPayload;
  } catch {
    body = {};
  }

  if (!ai) {
    return NextResponse.json(fallbackInsight(body));
  }

  const { answers = {}, desire } = body;
  const {
    energyLevel,
    focusStatus,
    predominantEmotion,
    majorObstacle,
  } = answers;

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
    const data = JSON.parse(text.trim()) as NeuroManifestationResult;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Gemini calculation error", error);
    return NextResponse.json(fallbackInsight(body), { status: 200 });
  }
}
