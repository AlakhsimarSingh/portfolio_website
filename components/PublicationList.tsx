"use client";

import { useState } from "react";
import { TOPICS, STATUS_LABEL, type Publication, type Topic } from "@/lib/Research";
import styles from "./PublicationList.module.css";

type Filter = Topic | "All";

export default function PublicationList({ items }: { items: Publication[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const shown = filter === "All" ? items : items.filter((p) => p.topics.includes(filter));
  const countFor = (f: Filter) =>
    f === "All" ? items.length : items.filter((p) => p.topics.includes(f)).length;

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter publications by topic">
        {(["All", ...TOPICS] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            className={`${styles.chip} ${filter === f ? styles.chipActive : ""}`}
            onClick={() => setFilter(f)}
          >
            {f} <span className={styles.count}>{countFor(f)}</span>
          </button>
        ))}
      </div>

      {shown.map((p) => (
        <div className="entry" style={{ gridTemplateColumns: "170px 1fr" }} key={p.title}>
          <div className="entry-time">
            {p.year}
            <br />
            <span className={`${styles.badge} ${styles[p.status]}`}>{STATUS_LABEL[p.status]}</span>
          </div>
          <div>
            <div className="entry-title">{p.title}</div>
            <div className="entry-org">{p.authors}</div>
            <div className={styles.venue}>{p.venue}</div>
            {p.summary && (
              <p className="muted" style={{ fontSize: "0.92rem", marginTop: 8 }}>
                {p.summary}
              </p>
            )}
            {p.link && (
              <div className="entry-links">
                <a href={p.link} target="_blank" rel="noopener">
                  {p.linkLabel} →
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}