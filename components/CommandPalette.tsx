"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PALETTE_ITEMS, type PaletteItem } from "@/lib/Palette";
import styles from "./CommandPalette.module.css";

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [isMac, setIsMac] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  // Set after mount so server and client markup match.
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    returnFocus.current?.focus();
  }, []);

  // Cmd/Ctrl+K toggles, Esc closes. Other components can dispatch "open-command-palette".
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open ? close() : show();
      } else if (e.key === "Escape" && open) {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", show);
    };
  }, [open, close, show]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return PALETTE_ITEMS;
    return PALETTE_ITEMS.filter((item) => {
      const haystack = `${item.label} ${item.group} ${item.keywords ?? ""}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });
  }, [query]);

  const groups = useMemo(() => {
    const map = new Map<string, { item: PaletteItem; index: number }[]>();
    results.forEach((item, index) => {
      const bucket = map.get(item.group) ?? [];
      bucket.push({ item, index });
      map.set(item.group, bucket);
    });
    return Array.from(map.entries());
  }, [results]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  const run = (item: PaletteItem) => {
    close();
    if (item.href.startsWith("mailto:")) {
      window.location.href = item.href;
    } else if (/^https?:/.test(item.href)) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    }
  };

  return (
    <>
      {!open && (
        <button type="button" className={styles.pill} onClick={show} aria-label="Open search and navigation">
          <span>Search</span>
          <kbd>{isMac ? "⌘" : "Ctrl"} K</kbd>
        </button>
      )}

      {open && (
        <div className={styles.backdrop} onMouseDown={close}>
          <div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Search and navigation"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              className={styles.input}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKey}
              placeholder="Jump to a page, project or paper…"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
              autoComplete="off"
              spellCheck={false}
            />

            <ul id="palette-list" ref={listRef} className={styles.list} role="listbox">
              {results.length === 0 && <li className={styles.empty}>No matches for “{query}”</li>}

              {groups.map(([group, entries]) => (
                <li key={group} role="presentation">
                  <div className={styles.group}>{group}</div>
                  <ul role="presentation" className={styles.groupList}>
                    {entries.map(({ item, index }) => (
                      <li
                        key={item.id}
                        id={`palette-${item.id}`}
                        role="option"
                        aria-selected={index === active}
                        data-active={index === active}
                        className={styles.item}
                        onMouseMove={() => setActive(index)}
                        onClick={() => run(item)}
                      >
                        <span>{item.label}</span>
                        {item.hint && <span className={styles.hint}>{item.hint}</span>}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span><kbd>↵</kbd> open</span>
              <span><kbd>esc</kbd> close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
