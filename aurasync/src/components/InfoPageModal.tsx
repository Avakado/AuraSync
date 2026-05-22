import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Sparkles, 
  Activity, 
  Brain, 
  Flame, 
  LineChart, 
  Compass, 
  TrendingUp, 
  Award,
  Play,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Cpu,
  Bookmark
} from "lucide-react";

interface InfoPageModalProps {
  sectionId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoPageModal({ sectionId, isOpen, onClose }: InfoPageModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [frequencyValue, setFrequencyValue] = useState(528);
  const [completedPractices, setCompletedPractices] = useState<string[]>([]);
  const [resonanceScore, setResonanceScore] = useState(85);

  // Animation frame loop for custom canvas visualizers
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (sectionId === "calibrator-blueprint") {
        // Render dynamic wave representation of frequency input
        ctx.strokeStyle = "rgba(137, 170, 204, 0.4)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + Math.sin(x * 0.02 + frame * 0.05) * 20 * Math.sin(frame * 0.01) + 
                    Math.sin(x * 0.005 - frame * 0.03) * 10;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Render target frequency node
        ctx.fillStyle = "#89AACC";
        ctx.beginPath();
        const targetX = (frequencyValue - 100) * (canvas.width / 900);
        const targetY = canvas.height / 2 + Math.sin(targetX * 0.02 + frame * 0.05) * 20 * Math.sin(frame * 0.01);
        ctx.arc(targetX, targetY, 8, 0, Math.PI * 2);
        ctx.fill();
      } 
      else if (sectionId === "acoustic-science") {
        // Render concentric audio spectrum nodes
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.lineWidth = 1.5;

        for (let r = 20; r < 90; r += 20) {
          ctx.strokeStyle = `rgba(137, 170, 204, ${0.8 - r / 110})`;
          ctx.beginPath();
          ctx.arc(centerX, centerY, r + Math.sin(frame * 0.08 + r) * 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Animated sound-wave dots in the orbit
        ctx.fillStyle = "#89AACC";
        const angle = frame * 0.02;
        const dotX = centerX + Math.cos(angle) * 70;
        const dotY = centerY + Math.sin(angle) * 70;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      else if (sectionId === "art-algorithms") {
        // Morphing geometry mathematical attractor
        ctx.strokeStyle = "rgba(137, 170, 204, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        const numVertices = 16;
        const radius = 60 + Math.sin(frame * 0.03) * 12;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        for (let i = 0; i <= numVertices; i++) {
          const angle = (i / numVertices) * Math.PI * 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle * 2) * radius; // Lissajous style
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }
      else {
        // Standard bio-harmonic diagnostic pulse
        ctx.strokeStyle = "rgba(137, 170, 204, 0.35)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          let impulse = 0;
          const pulseCenter = (frame * 3) % canvas.width;
          const dist = Math.abs(x - pulseCenter);
          if (dist < 40) {
            impulse = Math.sin((dist / 40) * Math.PI + Math.PI / 2) * 25;
          }
          const y = canvas.height / 2 + impulse + Math.sin(x * 0.08) * 3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isOpen, sectionId, frequencyValue]);

  const togglePractice = (name: string) => {
    if (completedPractices.includes(name)) {
      setCompletedPractices((prev) => prev.filter((p) => p !== name));
    } else {
      setCompletedPractices((prev) => [...prev, name]);
    }
  };

  const getPageData = () => {
    switch (sectionId) {
      case "calibrator-blueprint":
        return {
          title: "Vibe Calibrator Bio-Blueprint",
          badge: "Neuro-Heuristics Analysis",
          subtitle: "The cognitive mathematics of Intentional Reticular Filtering",
          description: "Our proprietary alignment engine interprets cortical tension ratios. Operating on the intersection of manifestation practices and biological cognitive science, this tool maps mental objectives to active neurological pathways.",
          insights: [
            { title: "RAS Synchronization", desc: "Locks key target variables into the pre-frontal cortex filters, enabling rapid environmental awareness of opportunities." },
            { title: "Subconscious Gateways", desc: "Operates during relaxed alpha states (8Hz-12Hz) to deploy cognitive seeds below standard analytical limits." },
            { title: "Neuroplastic Loop Consolidation", desc: "Thickens defensive myelin sheaths around deliberate positive pathways while allowing chronic stress links to naturally degenerate." }
          ],
          metrics: [
            { label: "Synaptic Fire Ratio", val: "142Hz Core Phase" },
            { label: "Target Detection Mult", val: "x8.4 Velocity" },
            { label: "Cortisol Delta Curve", val: "-34% Stabilization" }
          ]
        };
      case "acoustic-science":
        return {
          title: "Acoustic Bio-Resonance Research",
          badge: "Somatic Waves Engineering",
          subtitle: "Harmonizing Neural Axis with Solfeggio Architectures",
          description: "Acoustic fields operate as structural scaffolding for physical water molecules inside the cortex. These deep binaural wave streams align random molecular vibrations into stable geometric soundscapes.",
          insights: [
            { title: "Solfeggio 528Hz Matrix", desc: "Classified as the transformation frequency, 528Hz acts as a primary cellular driver, resetting localized anxiety response spikes." },
            { title: "0.5Hz Binaural Delta Waves", desc: "Drives direct mental recovery on the deep sleep axis, neutralizing high-amplitude flight or fight response behaviors." },
            { title: "Coherence Vagus Stimulus", desc: "Harmonizes heart rate variability (HRV) with sound-wash frequencies to restore nervous system balance." }
          ],
          metrics: [
            { label: "Sympathetic Balance", val: "94.2% Coherence" },
            { label: "Binaural Sweep Range", val: "0.5Hz - 15Hz" },
            { label: "Stress Threshold Offset", val: "-12.5dB Recovery" }
          ]
        };
      case "cognitive-practices":
        return {
          title: "Cognitive Myelination System",
          badge: "Metaphysical Routines",
          subtitle: "Somatic repetition templates designed to structuralize mindset momentum",
          description: "Mental alignment is a biological muscle. High-frequency thoughts must be physicalized into routines to avoid fading back into chronic historical brain states.",
          insights: [
            { title: "AM Intention Grounding", desc: "Immediate 3-step visualization script to calibrate your RAS sensor arrays before interacting with external notifications." },
            { title: "Intention Mapping Loop", desc: "A detailed journaling worksheet that pairs positive affirmations with physical somatic anchors for maximum impact." },
            { title: "PM Subconscious Sweep", desc: "A bedtime clearing exercise to offload localized default mode network (DMN) clutter into creative dream assets." }
          ],
          metrics: [
            { label: "Myelin Thickness Accrual", val: "+40% Daily Growth" },
            { label: "Habit Lock Threshold", val: "21 Days Linear" },
            { label: "Daily Ritual Volume", val: "3 Active Modules" }
          ]
        };
      case "art-algorithms":
        return {
          title: "Procedural Art & Concentric Systems",
          badge: "Visual Meditation Math",
          subtitle: "Geometric attractor designs engineered to reduce optical strain",
          description: "Visual cortex inputs account for over 50% of active cognitive energy. By viewing procedurally generated golden-ratio mandalas, the brain shifts out of random activity into soothing flow patterns.",
          insights: [
            { title: "Concentric Waveform Synthesis", desc: "Alternating light and dark rings designed to mimic wave interference, encouraging steady neural focus." },
            { title: "Prismatic Dispersion Scales", desc: "Colors specifically range between warm copper sands and indigo blues to safely support natural sleep patterns." },
            { title: "attractor Geometries", desc: "Generative chaos systems that maintain mathematical consistency, allowing the analytical mind to rest." }
          ],
          metrics: [
            { label: "Golden Ratio Scale", val: "1.618 Standard" },
            { label: "Generative Variations", val: "256 Fractal Layers" },
            { label: "Micro-Saccade Offset", val: "-68.4% Rest Rate" }
          ]
        };
      default:
        return {
          title: "Clinical Trials & Biometric Cohorts",
          badge: "Scientific Testing Data",
          subtitle: "Empirical focus and stress tracking on 2,400 active practitioners",
          description: "AuraSync's research metrics are gathered using EEG array readings and cortisol salivary assays. Over a 12-month interval, participants show rapid neural restructuring.",
          insights: [
            { title: "Pre-frontal Cortex Synapsis Maps", desc: "MRI testing reveals thickened localized pre-frontal density inside the focus circles of long-term calibrators." },
            { title: "Nervous De-escalation Profile", desc: "91% of participants recorded an immediate shift from active beta brainwaves to healing calm waves within 7 minutes." },
            { title: "Limbic Cortex Stress Dampening", desc: "Submersion under binaural acoustic sweeps safely dampens overactive trauma markers in the amygdala." }
          ],
          metrics: [
            { label: "Study Cohort Sample", val: "2,400 Active Members" },
            { label: "Cortisol Balance Rate", val: "89% Stabilization" },
            { label: "Sustained Cognitive Index", val: "+280% Performance" }
          ]
        };
    }
  };

  const data = getPageData();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] overflow-y-auto bg-bg/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-6 lg:p-8 select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 pointer-events-none"
            onClick={onClose}
          />

          {/* Floating dynamic glow elements */}
          <div className="absolute top-[10%] right-[20%] w-72 h-72 rounded-full glow-aura pointer-events-none opacity-20" />
          <div className="absolute bottom-[10%] left-[10%] w-80 h-80 rounded-full glow-aura pointer-events-none opacity-15" />

          {/* Core Card layout wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", damping: 30, stiffness: 180 }}
            className="relative w-full max-w-4xl bg-surface/80 border border-stroke rounded-[2rem] p-6 md:p-10 shadow-3xl text-text-primary z-10 overflow-hidden"
          >
            {/* Background Mesh */}
            <div className="absolute inset-0 bg-halftone opacity-10 mix-blend-overlay pointer-events-none" />

            {/* Header Area */}
            <div className="flex justify-between items-start border-b border-stroke pb-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-light animate-ping" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#89AACC] font-bold">
                    {data.badge}
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-display italic font-semibold text-text-primary leading-tight">
                  {data.title}
                </h3>
                
                <p className="text-xs text-muted max-w-2xl font-light">
                  {data.subtitle}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-3 bg-bg/50 border border-stroke rounded-full text-muted hover:text-text-primary hover:border-accent-light hover:scale-105 transition-all cursor-pointer"
                title="Return to Core Grid"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Double Column split info structure */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 items-stretch relative z-10">
              
              {/* Left Column: Visualizers & Metrics */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-6">
                
                {/* Visual Canvas Panel */}
                <div className="bg-bg/60 border border-stroke rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 text-[8px] font-mono text-accent-light uppercase">
                    <Activity className="w-3 h-3 animate-pulse" />
                    <span>Live Wave-Gen</span>
                  </div>

                  <canvas 
                    ref={canvasRef} 
                    width={200} 
                    height={110} 
                    className="w-full h-24 object-contain rounded-lg"
                  />
                  
                  {/* Specialized Interactive Element depending on section ID */}
                  {sectionId === "calibrator-blueprint" && (
                    <div className="w-full pt-3 space-y-1.5 border-t border-stroke/55">
                      <div className="flex justify-between text-[9px] font-mono text-muted uppercase">
                        <span>Target Frequency</span>
                        <span className="text-accent-light font-bold">{frequencyValue} HZ</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="1000"
                        value={frequencyValue}
                        onChange={(e) => setFrequencyValue(Number(e.target.value))}
                        className="w-full accent-accent-light cursor-pointer h-1 bg-stroke rounded-lg"
                      />
                    </div>
                  )}

                  {sectionId === "acoustic-science" && (
                    <div className="w-full pt-3 flex gap-2 justify-center border-t border-stroke/55">
                      {[432, 528, 639].map((f) => (
                        <button
                          key={f}
                          onClick={() => setFrequencyValue(f)}
                          className={`text-[9px] font-mono py-1 px-2.5 rounded-md border transition-all ${
                            frequencyValue === f 
                              ? "bg-accent-light text-bg border-transparent font-bold"
                              : "bg-stroke/40 border-stroke text-muted hover:text-text-primary"
                          }`}
                        >
                          {f}Hz
                        </button>
                      ))}
                    </div>
                  )}

                  {sectionId === "cognitive-practices" && (
                    <div className="w-full pt-3 text-center border-t border-stroke/55">
                      <button
                        onClick={() => {
                          setResonanceScore(prev => Math.min(100, prev + 5));
                        }}
                        className="text-[9px] font-mono py-1 px-4 bg-accent-light/10 text-[#89AACC] rounded-md border border-accent-light/20 hover:bg-accent-light/20 font-bold uppercase transition-all"
                      >
                        Synthesize Routines (+5%)
                      </button>
                    </div>
                  )}

                  {sectionId === "art-algorithms" && (
                    <div className="w-full pt-3 text-center border-t border-stroke/55">
                      <span className="text-[8px] font-mono text-muted uppercase tracking-wider block">
                        CLICK MORPHING GEOMETRY ACTIVE
                      </span>
                    </div>
                  )}
                </div>

                {/* Vertical metrics summary column */}
                <div className="space-y-4">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#89AACC] block">
                    Diagnostic Outcome
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {data.metrics.map((m, idx) => (
                      <div 
                        key={idx}
                        className="bg-bg/40 border border-stroke/70 p-3.5 rounded-xl flex items-center justify-between"
                      >
                        <span className="text-[10px] text-muted font-mono">{m.label}</span>
                        <span className="text-xs font-bold text-text-primary uppercase font-mono">{m.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: In-depth Insights & Practical Action Steps */}
              <div className="lg:col-span-8 flex flex-col justify-between gap-6 pb-2">
                
                {/* Navigation Pills for sub-tab contents */}
                <div className="flex gap-2 border-b border-stroke pb-3">
                  {["overview", "mechanics", "protocols"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`text-xs uppercase font-mono tracking-widest py-1.5 px-4 rounded-full transition-all cursor-pointer ${
                        activeTab === t 
                          ? "bg-text-primary text-bg font-bold" 
                          : "text-muted hover:text-text-primary hover:bg-stroke/40"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-4"
                    >
                      <p className="text-xs md:text-sm text-text-primary/90 leading-relaxed font-light">
                        {data.description}
                      </p>

                      <div className="bg-[#89AACC]/5 border border-[#89AACC]/10 rounded-2xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-accent-light">
                          <Compass className="w-4 h-4" />
                          <h4 className="text-xs font-mono uppercase tracking-widest">Strategic Implementation</h4>
                        </div>
                        <p className="text-[11px] text-muted leading-relaxed">
                          By bridging neurological filters with modern digital calibration routines, AuraSync isolates negative default habits and provides customized acoustic waveforms to keep mindset momentum active.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "mechanics" && (
                    <motion.div
                      key="mechanics"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-3"
                    >
                      <h4 className="text-xs text-accent-light uppercase font-mono tracking-widest mb-1">
                        Core Biological Modulators
                      </h4>
                      <div className="space-y-2.5">
                        {data.insights.map((ins, i) => (
                          <div 
                            key={i} 
                            className="p-3 border border-stroke/70 bg-bg/25 rounded-xl space-y-1 group"
                          >
                            <h5 className="text-xs font-semibold text-text-primary flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-light group-hover:scale-125 transition-transform" />
                              {ins.title}
                            </h5>
                            <p className="text-[11px] text-muted leading-relaxed font-light pl-3.5">
                              {ins.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "protocols" && (
                    <motion.div
                      key="protocols"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <h4 className="text-xs text-accent-light uppercase font-mono tracking-widest">
                          Active Practice Protocol List
                        </h4>
                        <p className="text-[11px] text-muted">
                          Tap practice items to declare daily alignment checks and sync neural density scores.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[
                          "Cortical Calibration Sweep",
                          "AM Intention Attractor Reset",
                          "Solfeggio Resonance Meditation",
                          "PM Subconscious Default Offload"
                        ].map((practice) => {
                          const isDone = completedPractices.includes(practice);
                          return (
                            <button
                              key={practice}
                              onClick={() => togglePractice(practice)}
                              className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                                isDone 
                                  ? "bg-accent-light/10 border-accent-light/30 text-[#89AACC]" 
                                  : "bg-bg/40 border-stroke text-muted hover:border-stroke hover:text-text-primary"
                              }`}
                            >
                              <span className="font-light">{practice}</span>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                isDone 
                                  ? "bg-accent-light text-bg border-transparent" 
                                  : "border-stroke"
                              }`}>
                                {isDone && <CheckCircle className="w-3.5 h-3.5" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Cumulative alignment metric bar */}
                      <div className="bg-bg/60 border border-stroke p-3.5 rounded-2xl flex items-center justify-between gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-[#89AACC]" />
                          <div>
                            <span className="text-[9px] text-muted block font-mono">NEURAL ALIGNMENT RATE</span>
                            <span className="text-xs text-text-primary font-semibold">Resonance Index</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg font-mono font-bold text-accent-light">
                            {resonanceScore + (completedPractices.length * 5)}%
                          </span>
                          <span className="text-[9px] font-mono text-muted uppercase bg-stroke/60 px-2 py-0.5 rounded border border-white/5">
                            Optimized
                          </span>
                        </div>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>

            {/* Bottom Section Footer action */}
            <div className="border-t border-stroke pt-6 mt-2 flex justify-between items-center relative z-10 select-none">
              <span className="text-[9px] font-mono text-muted uppercase tracking-[0.25em]">
                AURASYNC PROTOCOL v2.60
              </span>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 py-2.5 px-6 rounded-full bg-text-primary text-bg font-bold tracking-wider text-xs uppercase hover:opacity-90 hover:scale-[1.02] transition-all"
              >
                <span>Return to Workspace Grid</span>
                <Bookmark className="w-3.5 h-3.5 text-accent-light" />
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
