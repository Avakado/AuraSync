import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ["Align", "Synthesize", "Calibrate", "Manifest"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // 2700ms duration for count and words transition
    const duration = 2700;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      // Cycle words every 675ms (2700 / 4)
      const currentWordIdx = Math.min(Math.floor(elapsed / 675), WORDS.length - 1);
      setWordIndex(currentWordIdx);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        // Complete delay of 400ms when count hits 100
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none">
      {/* Top Left: AuraSync label */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs text-muted font-mono uppercase tracking-[0.3em]"
          id="loading-tag"
        >
          AuraSync • Ecosystem
        </motion.div>
        
        <div className="text-[10px] text-muted tracking-widest font-mono uppercase bg-stroke px-2 py-0.5 rounded">
          NEURAL RESCALE ACTIVE
        </div>
      </div>

      {/* Center: Rotating Words */}
      <div className="flex justify-center items-center h-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={WORDS[wordIndex]}
            initial={{ y: 30, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 0.8, filter: "blur(0px)" }}
            exit={{ y: -30, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="text-4xl md:text-6xl lg:text-8xl font-display italic text-text-primary"
            id="loading-word"
          >
            {WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Segment */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="max-w-xs text-[11px] text-muted uppercase tracking-widest leading-relaxed">
            CALIBRATING RETICULAR ACTIVATING SYSTEM<br />
            FREQUENCY WAVE HARMONIC EQUALIZER
          </div>
          
          {/* Bottom Right Counter */}
          <div 
            className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tighter"
            id="loading-counter"
          >
            {String(count).padStart(3, "0")}
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="w-full h-[3px] bg-stroke/50 rounded-full overflow-hidden relative">
          <div
            className="accent-gradient h-full rounded-full transition-all duration-75 ease"
            style={{
              width: `${count}%`,
              boxShadow: "0 0 12px rgba(var(--accent-rgb), 0.6)",
            }}
            id="loading-progress-bar"
          />
        </div>
      </div>
    </div>
  );
}
