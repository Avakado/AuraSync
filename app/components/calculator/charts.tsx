"use client";

import { LIFE_DOMAINS } from "@/lib/calculator/scoring";
import type { DomainSnapshot } from "@/lib/types";

interface LifeWheelRadarProps {
  snapshots: DomainSnapshot[];
  size?: number;
  className?: string;
}

/**
 * Lightweight SVG radar chart showing each life-domain's current vs target.
 * No external chart deps — keeps the bundle slim and the paint cost minimal.
 */
export function LifeWheelRadar({
  snapshots,
  size = 320,
  className,
}: LifeWheelRadarProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.36;
  const labelRadius = size * 0.46;
  const count = snapshots.length || LIFE_DOMAINS.length;

  const pointFor = (value: number, idx: number) => {
    const angle = (Math.PI * 2 * idx) / count - Math.PI / 2;
    const r = (value / 10) * radius;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  };

  const labelFor = (idx: number) => {
    const angle = (Math.PI * 2 * idx) / count - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * labelRadius,
      y: cy + Math.sin(angle) * labelRadius,
    };
  };

  const currentPolygon = snapshots
    .map((s, i) => {
      const p = pointFor(s.current, i);
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    })
    .join(" ");

  const targetPolygon = snapshots
    .map((s, i) => {
      const p = pointFor(s.target, i);
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    })
    .join(" ");

  const gridSteps = [2, 4, 6, 8, 10];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-label="Life wheel radar"
      role="img"
    >
      <defs>
        <radialGradient id="radar-current" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="rgba(214,185,122,0.45)" />
          <stop offset="100%" stopColor="rgba(214,185,122,0.05)" />
        </radialGradient>
        <radialGradient id="radar-target" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
        </radialGradient>
      </defs>

      {gridSteps.map((step) => (
        <polygon
          key={step}
          points={snapshots
            .map((_, i) => {
              const p = pointFor(step, i);
              return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
            })
            .join(" ")}
          fill="none"
          stroke="currentColor"
          strokeOpacity={step === 10 ? 0.35 : 0.12}
          strokeWidth={step === 10 ? 1 : 0.6}
        />
      ))}

      {snapshots.map((_, i) => {
        const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        return (
          <line
            key={`axis-${i}`}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="currentColor"
            strokeOpacity={0.12}
            strokeWidth={0.6}
          />
        );
      })}

      <polygon
        points={targetPolygon}
        fill="url(#radar-target)"
        stroke="rgba(255,255,255,0.65)"
        strokeWidth={1.2}
        strokeDasharray="4 4"
      />

      <polygon
        points={currentPolygon}
        fill="url(#radar-current)"
        stroke="#D6B97A"
        strokeWidth={1.6}
      />

      {snapshots.map((s, i) => {
        const p = pointFor(s.current, i);
        return (
          <circle
            key={`pt-${s.key}`}
            cx={p.x}
            cy={p.y}
            r={3.2}
            fill="#D6B97A"
            stroke="#0A0A0A"
            strokeWidth={1}
          />
        );
      })}

      {snapshots.map((s, i) => {
        const label = labelFor(i);
        const anchor =
          label.x > cx + 6 ? "start" : label.x < cx - 6 ? "end" : "middle";
        return (
          <g key={`label-${s.key}`}>
            <text
              x={label.x}
              y={label.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill="currentColor"
              opacity={0.7}
              fontSize={9}
              fontFamily="ui-monospace, SFMono-Regular, monospace"
              letterSpacing={1.2}
            >
              {s.label.split(" ")[0].toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

interface CoherenceGaugeProps {
  value: number; // 0-100
  label?: string;
  size?: number;
  className?: string;
}

export function CoherenceGauge({
  value,
  label = "Coherence",
  size = 132,
  className,
}: CoherenceGaugeProps) {
  const safe = Math.max(0, Math.min(100, value));
  const radius = size * 0.42;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (safe / 100) * circumference;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.12}
          strokeWidth={6}
        />
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="#D6B97A"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={`${dash.toFixed(2)} ${circumference.toFixed(2)}`}
          style={{ transition: "stroke-dasharray 0.6s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[9px] font-mono uppercase tracking-widest text-muted">
          {label}
        </span>
        <span className="text-2xl font-display font-bold text-text-primary tabular-nums">
          {Math.round(safe)}
        </span>
      </div>
    </div>
  );
}

interface DomainBarsProps {
  snapshots: DomainSnapshot[];
  className?: string;
}

export function DomainBars({ snapshots, className }: DomainBarsProps) {
  return (
    <div className={`space-y-2.5 ${className ?? ""}`}>
      {snapshots.map((snap) => {
        const currentPct = (snap.current / 10) * 100;
        const targetPct = (snap.target / 10) * 100;
        const gapPct = Math.max(0, targetPct - currentPct);
        return (
          <div key={snap.key} className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted">
              <span>{snap.label}</span>
              <span className="tabular-nums text-text-primary/80">
                {snap.current.toFixed(1)} → {snap.target.toFixed(1)}
              </span>
            </div>
            <div className="relative h-2.5 rounded-full bg-bg/60 overflow-hidden border border-stroke/60">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-dark via-accent-light to-accent-light/80"
                style={{ width: `${currentPct}%`, transition: "width 0.6s ease-out" }}
              />
              <div
                className="absolute inset-y-0 bg-white/15"
                style={{
                  left: `${currentPct}%`,
                  width: `${gapPct}%`,
                  transition: "width 0.6s ease-out, left 0.6s ease-out",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface FrequencyBridgeProps {
  current: number;
  target: number;
  currentBand: string;
  targetBand: string;
  className?: string;
}

export function FrequencyBridge({
  current,
  target,
  currentBand,
  targetBand,
  className,
}: FrequencyBridgeProps) {
  const min = 90;
  const max = 980;
  const currentPos = ((current - min) / (max - min)) * 100;
  const targetPos = ((target - min) / (max - min)) * 100;

  return (
    <div className={`space-y-3 ${className ?? ""}`}>
      <div className="flex items-baseline justify-between text-[10px] font-mono uppercase tracking-widest text-muted">
        <span>90Hz</span>
        <span className="text-accent-light tabular-nums">
          {current}Hz → {target}Hz
        </span>
        <span>980Hz</span>
      </div>

      <div className="relative h-12 rounded-full bg-bg/60 border border-stroke overflow-hidden">
        <div
          className="absolute inset-y-0 bg-gradient-to-r from-accent-dark/30 via-accent-light/30 to-accent-light/40"
          style={{
            left: `${Math.min(currentPos, targetPos)}%`,
            width: `${Math.abs(targetPos - currentPos)}%`,
            transition: "left 0.6s ease-out, width 0.6s ease-out",
          }}
        />

        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-8 bg-text-primary/70 rounded-full"
          style={{ left: `${currentPos}%`, transition: "left 0.6s ease-out" }}
          aria-label="Current frequency"
        />

        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-8 bg-accent-light rounded-full shadow-[0_0_12px_rgba(214,185,122,0.7)]"
          style={{ left: `${targetPos}%`, transition: "left 0.6s ease-out" }}
          aria-label="Target frequency"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl border border-stroke bg-bg/40 p-3 space-y-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-muted block">
            Current band
          </span>
          <span className="font-display italic text-text-primary block">
            {currentBand}
          </span>
        </div>
        <div className="rounded-xl border border-accent-light/40 bg-accent-light/5 p-3 space-y-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-accent-light block">
            Target band
          </span>
          <span className="font-display italic text-text-primary block">
            {targetBand}
          </span>
        </div>
      </div>
    </div>
  );
}
