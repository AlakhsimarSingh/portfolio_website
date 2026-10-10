"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DemoPreview.module.css";

const DESKTOP_WIDTH = 1280;
const DESKTOP_HEIGHT = 800;

export default function DemoPreview({ url, title }: { url: string; title: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(0.3);

  const host = (() => {
    try {
      return new URL(url).host;
    } catch {
      return url;
    }
  })();

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    // Scale the 1280px-wide page down to whatever width the card has.
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / DESKTOP_WIDTH);
    });
    ro.observe(el);

    // Only load the iframe once the card is close to the viewport.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className={styles.frame}>
      <div className={styles.bar}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.url}>{host}</span>
      </div>

      <div ref={viewportRef} className={styles.viewport}>
        {visible && (
          <iframe
            src={url}
            title={`${title} preview`}
            loading="lazy"
            tabIndex={-1}
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin"
            className={styles.iframe}
            style={{
              width: DESKTOP_WIDTH,
              height: DESKTOP_HEIGHT,
              transform: `scale(${scale})`,
            }}
          />
        )}

        {/* Overlay link: the iframe itself ignores pointer events, so the whole preview is one click target. */}
        <a
          className={styles.overlay}
          href={url}
          target="_blank"
          rel="noopener"
          aria-label={`Open ${title} demo in a new tab`}
        >
          <span className={styles.pill}>Open demo ↗</span>
        </a>
      </div>
    </div>
  );
}
