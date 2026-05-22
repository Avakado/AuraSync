import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Sparkles, Globe, X, Dribbble, ArrowUpRight } from "lucide-react";
import { ExplorationItem } from "../types";

const ITEMS: ExplorationItem[] = [
  {
    id: "exp-1",
    title: "Quantum Coherence Chart",
    category: "MATHEMATICAL SYNSTHESIS",
    image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=600&q=80",
    rotation: "rotate-[-3deg]",
  },
  {
    id: "exp-2",
    title: "Somatic Aura Waveforms",
    category: "AURA MODULATORS",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    rotation: "rotate-[4deg]",
  },
  {
    id: "exp-3",
    title: "EEG Alpha Synapse Map",
    category: "NEUROBIOLOGY ANALYSIS",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
    rotation: "rotate-[-2deg]",
  },
  {
    id: "exp-4",
    title: "Chronos Orbit Indicator",
    category: "GEOMETRICAL SYSTEM",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80",
    rotation: "rotate-[3deg]",
  },
  {
    id: "exp-5",
    title: "RAS Attention Prism",
    category: "OPTICAL PRISM",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=600&q=80",
    rotation: "rotate-[-4deg]",
  },
  {
    id: "exp-6",
    title: "Epiphany Synapse Mandala",
    category: "CONCENTRIC SYSTEM",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    rotation: "rotate-[2deg]",
  },
];

interface ExplorationsProps {
  onOpenInfo?: (id: string) => void;
}

export default function Explorations({ onOpenInfo }: ExplorationsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeItem, setActiveItem] = useState<ExplorationItem | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      
      // Calculate how far down the section is scrolled
      const scrolled = -rect.top;
      const scrollableHeight = containerHeight - window.innerHeight;
      
      if (scrollableHeight > 0) {
        const progress = Math.max(0, Math.min(scrolled / scrollableHeight, 1));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Split items into 2 columns
  const col1 = ITEMS.slice(0, 3);
  const col2 = ITEMS.slice(3, 6);

  // Parallax offsets based on scroll progress - disable translation on mobile to solve jumpiness
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const y1 = isMobile ? 0 : scrollProgress * -160; // Column 1 translates upwards
  const y2 = isMobile ? 0 : scrollProgress * 160;  // Column 2 translates downwards

  return (
    <section 
      ref={containerRef}
      className="relative bg-bg max-w-full min-h-screen md:min-h-[220vh] py-16 md:py-20 overflow-hidden" 
      id="explorations"
    >
      {/* Decorative Aura background */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-full flex justify-center items-center pointer-events-none select-none z-0">
        <div className="w-[600px] h-[600px] rounded-full bg-accent-light/5 blur-[120px] glow-aura" />
      </div>

      {/* Grid container with pinned elements on left and scrolling elements on right */}
      <div className="relative md:sticky top-0 h-auto md:h-screen max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center z-10 pointer-events-none mb-10 md:mb-0">
        
        {/* Layer 1: Left Pinned content */}
        <div className="w-full md:w-5/12 flex flex-col justify-center h-auto md:h-full py-10 md:py-0 pointer-events-auto select-none mt-10 md:mt-0">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-accent-light animate-pulse" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">Explorations</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-sans tracking-tight text-text-primary leading-none uppercase">
              Visual <span className="font-display italic text-accent-light lowercase">*playground*</span>
            </h2>
            
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              Procedural prototypes, mental maps, and mathematical charts investigating biological sync states, created as daily visual design workouts.
            </p>

            <div className="pt-4 flex flex-wrap gap-2">
              <button
                onClick={() => onOpenInfo?.("art-algorithms")}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#89AACC] uppercase bg-white/5 border border-white/10 hover:border-accent-light hover:bg-white/10 py-3.5 px-6 rounded-full transition-all duration-300"
              >
                <span>Art Algorithms & Math Specs</span>
              </button>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted hover:text-text-primary bg-stroke/30 decoration-none py-3 px-6 rounded-full border border-stroke hover:border-accent-light transition-all duration-300"
              >
                <Dribbble className="w-4 h-4 text-[#ea4c89]" />
                <span>Browse Dribbble</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right side placeholder area for scrolling column references */}
        <div className="w-full md:w-6/12 h-1/2 md:h-full relative overflow-visible" />
      </div>

      {/* Layer 2: Moving content grid that translates during scroll */}
      <div className="relative mt-8 md:-mt-[160vh] max-w-[1400px] mx-auto pointer-events-auto z-20 px-6 md:px-12 flex justify-end">
        <div className="w-full md:w-6/12 grid grid-cols-2 gap-4 md:gap-8 overflow-visible">
          
          {/* Column 1: Speed-Up */}
          <div 
            className="flex flex-col gap-6 md:gap-10 transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${y1}px)` }}
          >
            {col1.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`group cursor-pointer bg-surface border border-stroke rounded-2xl md:rounded-3xl p-3 select-none overflow-hidden hover:border-accent-light/40 transition-colors shadow-xl ${item.rotation}`}
              >
                <div className="aspect-square w-full rounded-xl md:rounded-2xl overflow-hidden relative mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-halftone opacity-25 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent opacity-40" />
                </div>
                <div className="px-1 space-y-0.5">
                  <span className="text-[9px] font-mono text-accent-light uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h4 className="text-xs md:text-sm font-medium text-text-primary truncate">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Slow-Down */}
          <div 
            className="flex flex-col gap-6 md:gap-10 transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${y2}px)` }}
          >
            {col2.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`group cursor-pointer bg-surface border border-stroke rounded-2xl md:rounded-3xl p-3 select-none overflow-hidden hover:border-accent-light/40 transition-colors shadow-xl ${item.rotation}`}
              >
                <div className="aspect-square w-full rounded-xl md:rounded-2xl overflow-hidden relative mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-halftone opacity-25 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent opacity-40" />
                </div>
                <div className="px-1 space-y-0.5">
                  <span className="text-[9px] font-mono text-accent-light uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h4 className="text-xs md:text-sm font-medium text-text-primary truncate">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox Modal display */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-bg/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl z-20 p-4"
              id="exploration-lightbox hover:border-accent-light/20"
            >
              <div className="relative rounded-2xl overflow-hidden bg-bg aspect-square mb-4">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-halftone opacity-15 mix-blend-multiply" />
                
                {/* Close Button Trigger */}
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-bg/60 backdrop-blur-md text-text-primary hover:bg-bg transition-colors"
                  id="close-lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Lightbox Information Bar */}
              <div className="flex justify-between items-center px-1">
                <div className="space-y-1">
                  <span className="text-[10px] text-accent-light tracking-wider font-mono uppercase block">
                    {activeItem.category}
                  </span>
                  <h4 className="text-xl font-display italic text-text-primary font-semibold">
                    {activeItem.title}
                  </h4>
                </div>
                
                <div className="flex items-center gap-1 text-[10px] uppercase font-mono text-muted bg-bg/40 px-3 py-1 rounded-full border border-stroke">
                  <Sparkles className="w-3.5 h-3.5 text-accent-light" />
                  <span>AuraSync Studio</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
