"use client";

import { Fragment, useState } from "react";
import { TOPICS, STATUS_LABEL, toBibtex, type Publication, type Topic } from "@/lib/Research";
import styles from "./PublicationList.module.css";

type Filter = Topic | "All";

export default function PublicationList({ items }: { items: Publication[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [citeOpen, setCiteOpen] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const shown = filter === "All" ? items : items.filter((p) => p.topics.includes(filter));
  const countFor = (f: Filter) =>
    f === "All" ? items.length : items.filter((p) => p.topics.includes(f)).length;

  const copy = async (p: Publication) => {
    try {
      await navigator.clipboard.writeText(toBibtex(p));
      setCopied(p.id);
      setTimeout(() => setCopied((c) => (c === p.id ? null : c)), 1800);
    } catch {
      // Clipboard blocked: the BibTeX is still visible and selectable.
    }
  };

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
        <div className="entry" style={{ gridTemplateColumns: "170px 1fr" }} key={p.id}>
          <div className="entry-time">
            {p.year}
            <br />
            <span className={`${styles.badge} ${styles[p.status]}`}>{STATUS_LABEL[p.status]}</span>
            {p.self === 0 && (
              <>
                <br />
                <span className={`${styles.badge} ${styles.firstAuthor}`}>First author</span>
              </>
            )}
          </div>
          <div>
            <div className="entry-title">{p.title}</div>
            <div className="entry-org">
              {p.authors.map((a, i) => (
                <Fragment key={i}>
                  {i > 0 && ", "}
                  {i === p.self ? <strong className={styles.me}>{a}</strong> : a}
                </Fragment>
              ))}
            </div>
            <div className={styles.venue}>{p.venue}</div>
            {p.summary && (
              <p className="muted" style={{ fontSize: "0.92rem", marginTop: 8 }}>
                {p.summary}
              </p>
            )}
            <div className="entry-links">
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener">
                  {p.linkLabel} →
                </a>
              )}
              <button
                type="button"
                className={styles.citeBtn}
                aria-expanded={citeOpen === p.id}
                aria-controls={`bib-${p.id}`}
                onClick={() => setCiteOpen(citeOpen === p.id ? null : p.id)}
              >
                {citeOpen === p.id ? "Hide BibTeX" : "Cite"}
              </button>
            </div>
            {citeOpen === p.id && (
              <div className={styles.bib} id={`bib-${p.id}`}>
                <pre>{toBibtex(p)}</pre>
                <button type="button" className={styles.copyBtn} onClick={() => copy(p)}>
                  {copied === p.id ? "Copied ✓" : "Copy"}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
