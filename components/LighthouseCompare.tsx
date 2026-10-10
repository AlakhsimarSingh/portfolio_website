"use client";

import { useState } from "react";
import styles from "./LighthouseCompare.module.css";

type Metric = { label: string; before: number; after: number };

const DEFAULT_METRICS: Metric[] = [
  { label: "Performance", before: 19, after: 99 },
  { label: "Accessibility", before: 75, after: 100 },
  { label: "Best Practices", before: 82, after: 100 },
  { label: "SEO", before: 85, after: 91 },
];

const RADIUS = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Same thresholds Lighthouse itself uses.
function scoreColor(score: number) {
  if (score >= 90) return "#0cce6b";
  if (score >= 50) return "#ffa400";
  return "#ff4e42";
}

function Gauge({ score, label }: { score: number; label: string }) {
  const color = scoreColor(score);
  return (
    <div className={styles.gauge}>
      <div className={styles.ringWrap}>
        <svg viewBox="0 0 88 88" className={styles.ring}>
          <circle cx="44" cy="44" r={RADIUS} className={styles.track} />
          <circle
            cx="44"
            cy="44"
            r={RADIUS}
            className={styles.arc}
            transform="rotate(-90 44 44)"
            style={{
              stroke: color,
              strokeDasharray: CIRCUMFERENCE,
              strokeDashoffset: CIRCUMFERENCE * (1 - score / 100),
            }}
          />
        </svg>
        <span className={styles.score} style={{ color }}>
          {score}
        </span>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default function LighthouseCompare({
  metrics = DEFAULT_METRICS,
}: {
  metrics?: Metric[];
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        {/* Before layer (full width) */}
        <div className={styles.layer} aria-hidden="true">
          {metrics.map((m) => (
            <Gauge key={m.label} score={m.before} label={m.label} />
          ))}
        </div>

        {/* After layer, revealed to the right of the handle */}
        <div
          className={`${styles.layer} ${styles.after}`}
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          aria-hidden="true"
        >
          {metrics.map((m) => (
            <Gauge key={m.label} score={m.after} label={m.label} />
          ))}
        </div>

        <span className={`${styles.tag} ${styles.tagLeft}`} aria-hidden="true">Before</span>
        <span className={`${styles.tag} ${styles.tagRight}`} aria-hidden="true">After</span>

        <div className={styles.handle} style={{ left: `${pos}%` }} aria-hidden="true">
          <span className={styles.knob}>⇄</span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className={styles.range}
          aria-label="Slide to compare Lighthouse scores before and after the rebuild"
        />
      </div>

      <p className={styles.caption}>
        Drag to compare Lighthouse scores before and after the rebuild.
      </p>

      <ul className={styles.srOnly}>
        {metrics.map((m) => (
          <li key={m.label}>
            {m.label}: {m.before} before, {m.after} after
          </li>
        ))}
      </ul>
    </div>
  );
}
