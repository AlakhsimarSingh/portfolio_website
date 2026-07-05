"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function LensCard({
  lens,
  href,
  label,
  title,
  description,
  tracePath,
  index = 0,
}: {
  lens: string;
  href: string;
  label: string;
  title: string;
  description: string;
  tracePath: string;
  index?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [inView, setInView] = useState(false);
  const [motionOK, setMotionOK] = useState(false);
  const pathId = `trace-path-${lens}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setMotionOK(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <Link
      ref={ref}
      className={`lens-card${inView ? " in-view" : ""}`}
      data-lens={lens}
      href={href}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <svg className="lens-trace" viewBox="0 0 400 64" preserveAspectRatio="none" aria-hidden="true">
        <path id={pathId} d={tracePath} />
        <circle className="lens-trace-dot" r="3.2">
          {motionOK && (
            <animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          )}
        </circle>
      </svg>
      <div>
        <div className="lens-label">{label}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="lens-arrow">View profile →</div>
    </Link>
  );
}