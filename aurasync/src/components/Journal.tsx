import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Calendar, ArrowUpRight, X, Clock, Brain, Compass, Sparkles } from "lucide-react";
import { JournalEntry } from "../types";

const ENTRIES: JournalEntry[] = [
  {
    id: "ras-science",
    title: "The Science Behind the Law of Attraction: How the Reticular Activating System Works",
    category: "NEUROBIOLOGY OF BELIEF",
    readTime: "6 Min Read",
    date: "May 18, 2026",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80",
    content: `For decades, the standard Law of Attraction was discussed in purely metaphysical, esoteric terms: "think positive thoughts, and the universe responds to your frequency." To most analytical skeptics, this sounded like magical thinking. 

Yet, modern neuroplasticity and cognitive science have uncovered a physical brain system that implements this exact phenomenon: the Reticular Activating System (RAS).

### The Synaptic Filter
Your brain is bombarded with roughly 2 billion bits of environmental sensory information every single second. If your conscious mind tried to process all of this, your neural networks would suffer catastrophic computational overload.

To survive, your brain relies on the Reticular Activating System—a dense network of neurons located at the base of your brainstem. The RAS acts as a high-fidelity biological filter, deciding exactly which 130 bits of information are allowed to pass through to your conscious awareness.

### How the Filter is Programmed
The RAS is incredibly loyal: it filters the world based on what you focus on. It does not distinguish between positive desires or limiting worries. It simply replicates whatever you repeatedly prime it to prioritize.

When you repeatedly envision a specific desire or goal (e.g., growing your design studio to design luxury systems), you are actively writing a new cognitive script into your RAS database.

### Physical Manifestation
Once programmed, your brain stem actively scans the environment for anything matching your primed script. Suddenly, you "coincidentally" notice:
- A niche agency contract opening that has been public for weeks.
- A design leader mentioning a specific integration puzzle on social media.
- A book on financial scalability recommended by a casual peer.

These environmental inputs were *always there*. The difference is that your previous RAS configuration filtered them out as irrelevant noise. By aligning your focus, your brain stem physically restructures your reality. Neurologically, belief is not passive; it is a live attention engine.`,
  },
  {
    id: "neuro-myelination",
    title: "Neuro-Myelination: Accelerating the Path of Least Resistance",
    category: "NEURAL PLASTICITY",
    readTime: "4 Min Read",
    date: "April 29, 2026",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=300&q=80",
    content: `When we establish new mental habits, we are physically altering our wiring. Myelin is the lipid-rich sheath that wraps around axon circuits, protecting and accelerating electrical signaling by up to 100x.

### The Biological Highway
Every time we envision a specific emotional reality (such as absolute financial abundance or deep inner validation), our brain fires a specific sequence of neural spikes. Repeated stimulation triggers master glial cells to wrap myelin insulation around these active circuits.

As a path becomes myelinated, it requires significantly less biological energy to activate. It matures from an active mental exercise into a passive "default state of mind."

### Pruning and Letting Go
Concurrently, neural paths that are neglected or starved of attention undergo synaptic pruning. Your brain actively deconstructs unused lines to save energy. 

By refusing to dwell on legacy blockages and intentionally prioritizing creative momentum, you physically, structurally starve the default pathways of doubt—transforming your cognitive landscape permanently.`,
  },
  {
    id: "solfeggio-frequencies",
    title: "Solfeggio and Coherence: Measuring Sonic Synchronization in EEG Monitors",
    category: "QUANTUM ACOUSTICS",
    readTime: "5 Min Read",
    date: "March 12, 2026",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
    content: `Can audio frequencies truly alter cognitive performance? To audit these assertions, we monitored multi-channel EEG readings while subjecting participants to 432Hz and 528Hz acoustic landscapes.

### What the Beta and Alpha Waves Reveal
Our laboratory test files confirmed that 432Hz sweeps directly stimulate high coherence within the Alpha wave band (8–12 Hz), which is typically associated with flow states, reduced anxiety, and creative receptiveness.

Conversely, 528Hz sweeps triggered high-frequency Theta coherence, which is the exact brain state observed in seasoned experts during deep meditation.

### Acoustic Resonators
By overlaying customized sub-audible alpha pulses beneath standard interface triggers, we can design software that bio-magnetically guides users into an optimal flow state, making manifestation an immersive biological habit.`,
  },
  {
    id: "quantum-mindset",
    title: "The Quantum Double-Slit Analogy: Observer Effects in Modern Design Teams",
    category: "COGNITIVE SYSTEMS",
    readTime: "7 Min Read",
    date: "Feb 05, 2026",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80",
    content: `In the classic double-slit experiment, sub-atomic waves collapse into fixed physical particles solely when an observer measures them. While strictly a microscopic rule, a parallel phenomenon occurs in high-performance design teams.

### The Uncollapsed State of Ideation
At the start of any creative effort, the project exists in a wave-state of pure potential. All options are hypothetical. The momentum of the build is governed entirely by the cognitive biases of the product leaders.

If the team operates with high internal resistance (defensiveness, fear, linear-only tracking), the ideas collapse into standard, low-risk, uninspiring paradigms.

### Intention-Driven Collapses
When a team holds a clear, aligned cognitive vision, they establish a high-cohesion workspace. Like quantum observers, their conscious intent actively directs the potential field toward non-linear solutions, creating exceptional creative outputs.`,
  },
];

interface JournalProps {
  onOpenInfo?: (id: string) => void;
}

export default function Journal({ onOpenInfo }: JournalProps) {
  const [activeArticle, setActiveArticle] = useState<JournalEntry | null>(null);

  return (
    <section className="bg-bg py-20 border-t border-stroke" id="journal-section">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-stroke shrink-0" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Insights & Science</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-text-primary uppercase">
              Recent <span className="font-display italic text-accent-light lowercase">*thoughts*</span>
            </h2>
            
            <p className="text-sm text-muted max-w-md">
              Demystifying the connection between brain neuro-pathways and spiritual manifestation. Practical biological insights.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onOpenInfo?.("cognitive-practices")}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#89AACC] uppercase bg-white/5 border border-white/10 hover:border-accent-light hover:bg-white/10 py-3.5 px-6 rounded-full transition-all duration-300"
            >
              <span>Practices Science & schedules</span>
            </button>
            <button
              onClick={() => {
                const target = document.getElementById("subscription-form");
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 group text-xs text-muted font-bold tracking-wider uppercase border border-stroke rounded-full px-6 py-3 hover:text-text-primary transition-all duration-300"
            >
              <span>Subscribe for Guides</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 4 Journal entries displayed as horizontal pills */}
        <div className="flex flex-col gap-4" id="journal-list">
          {ENTRIES.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              onClick={() => setActiveArticle(entry)}
              className="group flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[32px] md:rounded-full cursor-pointer transition-all duration-300 relative overflow-hidden"
            >
              {/* Media & Metadata side */}
              <div className="flex flex-col md:flex-row items-center gap-5 w-full md:w-auto">
                {/* Thumb image */}
                <div className="w-20 h-20 md:w-14 md:h-14 rounded-full overflow-hidden shrink-0 border border-stroke">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5">
                    <span className="text-[10px] text-accent-light tracking-wider font-mono uppercase bg-stroke/50 px-2.5 py-0.5 rounded-full">
                      {entry.category}
                    </span>
                    <span className="text-[10px] text-muted font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {entry.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm md:text-base font-medium text-text-primary group-hover:text-accent-light transition-colors line-clamp-1 pr-4">
                    {entry.title}
                  </h3>
                </div>
              </div>

              {/* Date & Trigger Arrow */}
              <div className="flex items-center gap-4 shrink-0 md:pr-4 w-full md:w-auto justify-between md:justify-end border-t border-stroke/30 md:border-none pt-3 md:pt-0">
                <span className="text-xs text-muted font-mono flex items-center gap-1.5 pl-2 md:pl-0">
                  <Calendar className="w-3.5 h-3.5" />
                  {entry.date}
                </span>

                <div className="w-7 h-7 rounded-full bg-stroke/10 flex items-center justify-center text-text-primary group-hover:bg-accent-light group-hover:text-bg transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Gradient border indicator on hover */}
              <div className="absolute -inset-[1px] rounded-[32px] md:rounded-full border border-transparent group-hover:border-accent-light/30 pointer-events-none transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Detail Drawer Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="absolute inset-0 bg-bg/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 30 }}
              className="relative w-full max-w-3xl bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl z-20 flex flex-col"
              id="article-reader"
            >
              {/* Close Button Header */}
              <div className="p-4 md:p-6 border-b border-stroke flex justify-between items-center bg-bg/55">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-accent-light" />
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
                    AuraSync Neuro-Cognitive Library
                  </span>
                </div>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 rounded-full bg-stroke/55 hover:bg-stroke text-text-primary transition-colors"
                  id="close-article-reader"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body scrollable */}
              <div className="p-6 md:p-10 space-y-6 overflow-y-auto max-h-[70vh] no-scrollbar">
                {/* Meta details */}
                <div className="text-center space-y-3 pb-6 border-b border-stroke/50">
                  <span className="text-xs text-accent-light uppercase tracking-widest font-mono">
                    {activeArticle.category}
                  </span>
                  
                  <h1 className="text-3xl md:text-4xl font-display italic text-text-primary leading-tight max-w-2xl mx-auto">
                    {activeArticle.title}
                  </h1>

                  <div className="flex justify-center items-center gap-4 text-xs text-muted font-mono">
                    <span>{activeArticle.date}</span>
                    <span>•</span>
                    <span>{activeArticle.readTime}</span>
                  </div>
                </div>

                {/* Article Body Content */}
                <div className="text-text-primary/95 leading-relaxed space-y-6 font-light text-sm md:text-base">
                  {activeArticle.content.split("\n\n").map((para, idx) => {
                    if (para.startsWith("###")) {
                      return (
                        <h3 key={idx} className="text-lg md:text-xl font-medium text-text-primary font-sans pt-4 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-accent-light rounded-full" />
                          {para.replace("###", "").trim()}
                        </h3>
                      );
                    }
                    if (para.startsWith("-")) {
                      return (
                        <ul key={idx} className="space-y-2.5 pl-4 list-none text-muted">
                          {para.split("\n").map((li, lidx) => (
                            <li key={lidx} className="flex gap-2 items-start">
                              <Sparkles className="w-3.5 h-3.5 text-accent-light shrink-0 mt-1" />
                              <span>{li.replace("-", "").trim()}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={idx} className="text-sm md:text-base leading-relaxed text-muted font-sans font-light">
                        {para}
                      </p>
                    );
                  })}
                </div>

                {/* Cognitive callout */}
                <div className="p-5 bg-bg/50 border border-stroke rounded-2xl flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="p-3 bg-stroke rounded-xl text-accent-light">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-text-primary">Cognitive Integration Prompt</h4>
                    <p className="text-xs text-muted leading-relaxed">
                      To help lock in these synaptic networks, take 3 slow diaphragmatic breaths while holding the visualization of your desire. Try writing it out in our Vibration Sync Widget.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom footer overlay */}
              <div className="border-t border-stroke p-4 bg-bg/55 flex justify-between items-center">
                <span className="text-[10px] text-muted font-mono uppercase">
                  AuraSync Vol. XII
                </span>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    const target = document.getElementById("vibe-calculator");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full text-[11px] uppercase tracking-widest font-bold py-2 px-5 accent-gradient text-bg"
                >
                  Test My Brainwave Sync
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
