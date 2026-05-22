import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { ArrowRight, Eye, Sparkles, X, Brain, Heart, Headphones, Radio, PlayCircle } from "lucide-react";
import { Project } from "../types";

const JOURNEYS: Project[] = [
  {
    id: "ras-solfeggio",
    title: "RAS Solfeggio 528Hz Catalyst",
    category: "COGNITIVE SYNAPSE ACCELERATION",
    columnSpan: "md:col-span-7",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[16/10]",
    description: "An intensive 20-minute neural-audio loop engineered to synchronize your Reticular Activating System's cognitive filters with quantum prosperity configurations. Layered with active brainwave entrainments that safely bypass analytical logical buffers.",
    tech: ["528Hz Tone", "Theta Waves", "Subliminal Cues", "Dual-Channel Hemisync"],
  },
  {
    id: "myelination-guide",
    title: "Synaptic Focus Field Weaver",
    category: "NEUROPLASTICITY REPROGRAMMING",
    columnSpan: "md:col-span-5",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[4/3] md:aspect-auto",
    description: "A series of precise visualization scripts configured to accelerate myelination across target focus circles. This systematic mental routine builds thick neural protective sheaths over your core intention vectors.",
    tech: ["Alpha Frequencies", "Somatic Grounding", "Neuro-Myelination Patterns"],
  },
  {
    id: "delta-manifestor",
    title: "Deep Delta Sleep Manifestor",
    category: "SUBCONSCIOUS HABIT SWEEPER",
    columnSpan: "md:col-span-4",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[4/3] md:aspect-auto",
    description: "A restorative deep sleep frequency framework structured on 0.5Hz sub-harmonics. Designed to reprogram deep-seated environmental doubt patterns directly inside your default mode network (DMN) while the limbic cortex is dormant.",
    tech: ["0.5Hz Sub-Harmonics", "Binaural Delta Beats", "Vagus Nerve Resonators"],
  },
  {
    id: "alpha-coherence",
    title: "Somatic Alpha Coherence Sweep",
    category: "AURIC FIELD SYNCHRONIZER",
    columnSpan: "md:col-span-8",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80",
    aspectRatio: "aspect-[16/10]",
    description: "A rhythmic soundscape calibrating physical respiratory rates with alpha brainwave oscillations. This practice establishes wide coherence ranges, creating a powerful receptive field that welcomes high-probability synchronicity events.",
    tech: ["432Hz Core Tune", "Deep Breath Cues", "Vibe Shift Matrix"],
  },
];

interface SelectedWorksProps {
  onOpenInfo?: (id: string) => void;
}

export default function SelectedWorks({ onOpenInfo }: SelectedWorksProps) {
  const [activeJourney, setActiveJourney] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll Parallax Effect using GSAP for a high-end luxury feel
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll(".parallax-audio-card");
      if (!cards.length) return;

      // Gracefully disable/reset parallax position on mobile screens & small devices to solve jumpiness
      if (window.innerWidth < 768) {
        cards.forEach((card) => {
          gsap.set(card, { y: 0 });
        });
        return;
      }

      cards.forEach((card, idx) => {
        // Translate odd cards slightly slower/faster than even cards
        const offsetMultiplier = idx % 2 === 0 ? -0.06 : 0.06;
        const scrollPosition = window.scrollY;
        const speed = scrollPosition * offsetMultiplier;

        gsap.to(card, {
          y: speed,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="bg-bg py-16 md:py-24 border-t border-stroke relative overflow-hidden transition-colors duration-500" 
      id="selected-works"
    >
      {/* Absolute faint aura indicator */}
      <div className="absolute left-[-20%] top-[30%] w-[500px] h-[500px] rounded-full glow-aura pointer-events-none opacity-10" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 select-none">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Headphones className="w-5 h-5 text-accent-light" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">Neural Audio-Guides</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-text-primary uppercase font-bold">
              Somatic <span className="font-display italic text-accent-light lowercase">*waveforms*</span>
            </h2>
            
            <p className="text-sm text-muted max-w-md font-light">
              Premium acoustic matrices and visualization engines designed to re-structure your brainwave frequency alignments.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => onOpenInfo?.("acoustic-science")}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#89AACC] uppercase bg-white/5 border border-white/10 hover:border-accent-light hover:bg-white/10 py-3.5 px-6 rounded-full transition-all duration-300"
            >
              <span>Acoustic Science & Research</span>
            </button>
            <button
              onClick={() => {
                const target = document.getElementById("calculator-section");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 text-xs text-muted font-bold tracking-wider uppercase border border-stroke rounded-full px-6 py-3 hover:text-text-primary hover:border-transparent relative overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <span>Launch Vibe Sync App</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bento Grid with scrolling GSAP parallax classes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 pb-12" id="projects-bento-grid">
          {JOURNEYS.map((journey) => (
            <div
              key={journey.id}
              className={`${journey.columnSpan} parallax-audio-card group/card relative rounded-3xl overflow-hidden bg-surface border border-stroke cursor-pointer transition-transform duration-300`}
              onClick={() => setActiveJourney(journey)}
            >
              <div className={`relative w-full ${journey.aspectRatio} overflow-hidden pointer-events-none`}>
                <img
                  src={journey.image}
                  alt={journey.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Grid Halftone Pattern matching mockup background */}
                <div className="absolute inset-0 bg-halftone mix-blend-multiply opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-95" />
              </div>

              {/* Card Meta Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-bg via-bg/95 to-transparent flex justify-between items-end border-t border-stroke/30">
                <div className="space-y-1.5">
                  <span className="text-[9px] text-accent-light font-mono uppercase tracking-[0.2em] block">
                    {journey.category}
                  </span>
                  <h3 className="text-xl font-display font-medium text-text-primary italic">
                    {journey.title}
                  </h3>
                </div>

                <div className="w-9 h-9 rounded-full bg-stroke/50 border border-white/5 flex items-center justify-center text-text-primary/70 group-hover/card:text-accent-light group-hover/card:border-accent-light/50 transition-all duration-300 hover:scale-110">
                  <PlayCircle className="w-5 h-5 text-accent-light" />
                </div>
              </div>

              <div className="absolute -inset-[1px] rounded-3xl border border-transparent group-hover/card:border-accent-light/35 pointer-events-none transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Somatic Audio Guide modal */}
      <AnimatePresence>
        {activeJourney && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveJourney(null)}
              className="absolute inset-0 bg-bg/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-2xl bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl z-20 flex flex-col"
              id="project-detail-modal"
            >
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  src={activeJourney.image}
                  alt={activeJourney.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-halftone opacity-25 mix-blend-multiply" />
                <div className="absolute inset-y-0 inset-x-0 bg-gradient-to-t from-surface via-transparent to-black/35" />

                <button
                  onClick={() => setActiveJourney(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-bg/60 backdrop-blur-md text-text-primary hover:bg-bg transition-colors"
                  id="close-project-modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6">
                  <span className="text-[9px] text-accent-light font-mono uppercase tracking-widest block">
                    {activeJourney.category}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-display italic text-text-primary leading-tight">
                    {activeJourney.title}
                  </h4>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[50vh]">
                <div className="space-y-3">
                  <h5 className="text-xs uppercase tracking-widest text-muted font-mono">Audio Guide Overview</h5>
                  <p className="text-sm text-text-primary/90 leading-relaxed font-light">
                    {activeJourney.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="border border-stroke/70 bg-bg/40 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-accent-light">
                      <Brain className="w-4 h-4" />
                      <span className="text-xs font-mono uppercase tracking-widest">RAS Neural Modulation</span>
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">
                      Somatic wave frequencies systematically lower defense signals in the cortex, welcoming higher synchronicity configurations.
                    </p>
                  </div>

                  <div className="border border-stroke/70 bg-bg/40 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-accent-light">
                      <Radio className="w-4 h-4 animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-widest">Coherence Alignment</span>
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">
                      Syncs breathing with Solfeggio matrices and alpha noise signals to foster balanced resonance.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs uppercase tracking-widest text-muted font-mono">Acoustic layers</h5>
                  <div className="flex flex-wrap gap-2">
                    {activeJourney.tech.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-text-primary bg-stroke/60 border border-white/5 py-1 px-3 rounded-full animate-pulse"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-stroke p-4 bg-bg/50 flex justify-end">
                <button
                  onClick={() => {
                    setActiveJourney(null);
                    // Automatically scroll to the contact guide down below
                    const target = document.getElementById("subscription-form");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 py-2 px-5 bg-text-primary text-bg font-bold tracking-wider text-xs uppercase rounded-full hover:opacity-90 transition-opacity"
                >
                  <span>Sync This Audio Session</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
