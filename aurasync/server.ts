import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// Health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiActive: !!ai });
});

// API endpoint for neuro-manifestation vibration quiz calculation
app.post("/api/manifest/calculate", async (req, res) => {
  try {
    if (!ai) {
      // Graceful fallback with simulated insights if API Key is not set
      const fallbackData = getFallbackInsight(req.body);
      return res.json(fallbackData);
    }

    const { answers, desire } = req.body;
    const { energyLevel, focusStatus, predominantEmotion, majorObstacle } = answers || {};

    const prompt = `Perform a high-fidelity "Neuro-Manifestation Frequency Sync Analysis" for a user whose current state is:
- Energy level: ${energyLevel || "Balanced"} (on scale of calm to ecstatic)
- Focus level: ${focusStatus || "Scattered focus"}
- Predominant emotional undertone: ${predominantEmotion || "Contemplative"}
- Major spiritual/neuro-cognitive obstacle: ${majorObstacle || "Overthinking"}
- Desired manifestation vector (desire): "${desire || "Creative alignment and abundance"}"

Provide a highly polished, scientifically rigorous yet deeply mystical response bridging neuroplasticity (Reticular Activating System alignment, myelination, synaptic pruning) and spiritual frequency theory. Keep the tone sophisticated, stylish, and futuristic.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite neuro-manifestation AI analyst for AuraSync, trained in neuroplasticity, quantum cognitive science, and metaphysical frequency modeling. You break down skepticism using real brain science then elevate it with pristine, poetic, aesthetic esotericism.",
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
            "customAffirmation"
          ],
          properties: {
            currentFrequencyHz: {
              type: Type.INTEGER,
              description: "Estimated synchronized current brain/intent frequency in Hz (between 60 and 960Hz)."
            },
            frequencyBandName: {
              type: Type.STRING,
              description: "A gorgeous, stylized name for their current vibration zone (e.g. 'Gamma Resonant Flow', 'Coherent Theta Drift')."
            },
            rasStatus: {
              type: Type.STRING,
              description: "A short status description of their Reticular Activating System (RAS) filter (e.g., 'Sub-optimally filtered; high cognitive noise')."
            },
            neuroplasticInsight: {
              type: Type.STRING,
              description: "A short, beautiful paragraph detailing the biological brain state, synaptic firing, or neuro-myelination based on their answers."
            },
            metaphysicalBridging: {
              type: Type.STRING,
              description: "How their neural state impacts their quantum wave-collapse potential or manifest frequency aura."
            },
            actionSteps: {
              type: Type.ARRAY,
              description: "Three highly targetable neuro-manifestation routines tailored to their obstacle.",
              items: { type: Type.STRING }
            },
            customAffirmation: {
              type: Type.STRING,
              description: "A short, poetically crafted affirmation tailored exactly to the desire, leveraging cognitive restructuring principles."
            }
          }
        }
      }
    });

    const responseText = response.text || "{}";
    const data = JSON.parse(responseText.trim());
    res.json(data);
  } catch (error: any) {
    console.error("Gemini API Error in calculate endpoint:", error);
    res.status(500).json({
      error: "Could not calculate custom validation",
      details: error.message,
      fallback: getFallbackInsight(req.body)
    });
  }
});

// Mock service for validation & off-line fallback
function getFallbackInsight(body: any) {
  const { answers, desire = "creative freedom" } = body;
  const { energyLevel = "calm", focusStatus = "seeking focus", majorObstacle = "overthinking" } = answers || {};
  
  // Calculate raw number based on letters/values
  let scoreRange = 432;
  if (energyLevel.includes("ecstatic")) scoreRange += 100;
  if (focusStatus.includes("super")) scoreRange += 80;
  if (majorObstacle.includes("fear")) scoreRange -= 50;

  return {
    currentFrequencyHz: scoreRange,
    frequencyBandName: "Coherent Beta Resonance",
    rasStatus: "Highly Active; Primed for Syncing",
    neuroplasticInsight: "Your synaptic pathways are currently firing in a fast, analytical configuration. While this enhances logical processing, it can reinforce default mode network (DMN) overactivity, temporarily filtering out non-linear environmental coincidences.",
    metaphysicalBridging: "By shifting concentration toward subconscious states, you will drop neural resistance, aligning your aura with the wave probability of your chosen vector.",
    actionSteps: [
      "Integrate a 5-minute pre-sleep somatic release pattern to suppress analytical noise.",
      "Calibrate your RAS visually by indexing three occurrences of your target theme within 24 hours.",
      "Utilize theta-frequency sound washes while journaling your intention as an accomplished past reality."
    ],
    customAffirmation: `My neural circuits are rewiring to decode ${desire} with effortless focus and perfect clarity.`
  };
}

// Start Server Setup (Vite Middleware vs Static Serving)
async function bootServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AuraSync Backend] Server active and reachable at http://localhost:${PORT}`);
  });
}

bootServer();
