import { motion } from "motion/react";
import { BrainCircuit, Orbit, Activity, ShieldCheck, HeartHandshake, Eye, ArrowRight } from "lucide-react";

interface StatsProps {
  onOpenInfo?: (id: string) => void;
}

export default function Stats({ onOpenInfo }: StatsProps) {
  const statsList = [
    {
      metric: "85%",
      label: "Synaptic Density Rate",
      subText: "Average increase in pre-frontal cortex focus thickness within 14 days of calibrating acoustic sound layers.",
      icon: <BrainCircuit className="w-5 h-5 text-accent-light" />,
      sparkline: (
        <svg className="w-full h-8 text-accent-light opacity-50 mt-2" viewBox="0 0 100 30" fill="none">
          <path d="M0 25 Q15 5 30 20 T60 10 T90 5 T100 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="90" cy="5" r="2.5" fill="currentColor" className="animate-ping" />
        </svg>
      )
    },
    {
      metric: "528Hz",
      label: "Harmonic Coherence Axis",
      subText: "The exact Solfeggio frequency threshold engineered to harmonize neurological waveforms to receptive states.",
      icon: <Orbit className="w-5 h-5 text-accent-light" />,
      sparkline: (
        <svg className="w-full h-8 text-accent-light opacity-50 mt-2 animate-pulse" viewBox="0 0 100 30" fill="none">
          <path d="M0 15 C10 5, 20 25, 30 15 C40 5, 50 25, 60 15 C70 5, 80 25, 90 15 L100 15" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      metric: "15x",
      label: "Target Filter Accrual",
      subText: "Amplifying the Reticular Activating System's target capture speed to index hidden environmental coincidences.",
      icon: <Activity className="w-5 h-5 text-accent-light" />,
      sparkline: (
        <svg className="w-full h-8 text-accent-light opacity-50 mt-2" viewBox="0 0 100 30" fill="none">
          <path d="M0 20 L20 20 L30 5 L40 25 L50 15 L60 20 L80 20 L90 10 L100 10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      metric: "-34%",
      label: "Cortisol Delta Curve",
      subText: "Stabilized salivary cortisol measurements indicating immediate transition out of nervous stress modes.",
      icon: <ShieldCheck className="w-5 h-5 text-accent-light" />,
      sparkline: (
        <svg className="w-full h-8 text-accent-light opacity-50 mt-2" viewBox="0 0 100 30" fill="none">
          <path d="M0 5 Q30 5 50 15 T100 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="100" cy="25" r="2.5" fill="currentColor" />
        </svg>
      )
    },
    {
      metric: "94%",
      label: "Vagal Nerve Resonance",
      subText: "Somatic sensory feedback scores indicating high state receptivity and autonomic balance.",
      icon: <HeartHandshake className="w-5 h-5 text-accent-light" />,
      sparkline: (
        <svg className="w-full h-8 text-accent-light opacity-50 mt-2" viewBox="0 0 100 30" fill="none">
          <path d="M0 25 C10 25, 20 10, 35 15 C50 20, 65 5, 80 12 L100 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="80" cy="12" r="2.5" fill="currentColor" />
        </svg>
      )
    },
  ];

  return (
    <section className="bg-bg py-24 border-t border-stroke relative overflow-hidden transition-colors duration-500" id="stats-section">
      {/* Dynamic aura highlight */}
      <div className="absolute right-[-10%] bottom-[-10%] w-96 h-96 rounded-full glow-aura pointer-events-none opacity-10" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 space-y-16">
        
        {/* Title area with details trigger */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 select-none">
          <div className="space-y-4">
            <span className="text-xs text-accent-light uppercase tracking-[0.25em] font-mono block">
              empirical clinical outcome
            </span>
            <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-text-primary uppercase font-bold leading-tight">
              Somatic <br />
              <span className="font-display italic text-accent-light lowercase">*restructuring metrics*</span>
            </h2>
            <p className="text-sm text-muted max-w-md font-light">
              Actual diagnostic measurements tracked over active practitioner pools inside decentralized laboratory environments.
            </p>
          </div>

          <button
            onClick={() => onOpenInfo?.("biometric-testing")}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#89AACC] uppercase bg-white/5 border border-white/10 hover:border-accent-light hover:bg-white/10 py-3.5 px-6 rounded-full transition-all duration-300"
          >
            <span>Read Clinical Cohort Data</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dynamic statistics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12 md:mt-16 lg:mt-20" id="stats-grid">
          {statsList.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="space-y-4 p-5 bg-surface/10 rounded-2xl border border-stroke/40 hover:border-accent-light/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Icon wrap */}
                <div className="w-10 h-10 rounded-xl bg-stroke/30 flex items-center justify-center p-2 text-accent-light">
                  {stat.icon}
                </div>

                {/* Number and title */}
                <div className="space-y-1">
                  <span className="text-4xl md:text-5xl font-display font-medium text-text-primary block tracking-tighter">
                    {stat.metric}
                  </span>
                  <span className="text-[10px] text-accent-light uppercase font-mono tracking-widest block font-bold">
                    {stat.label}
                  </span>
                </div>

                {/* Text */}
                <p className="text-[11px] text-muted leading-relaxed font-light">
                  {stat.subText}
                </p>
              </div>

              {/* Sparkline visualization */}
              <div className="pt-2 border-t border-stroke/20">
                {stat.sparkline}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
