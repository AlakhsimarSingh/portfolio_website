import { TESTIMONIALS } from "@/lib/Testimonials";

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="block" id="testimonials">
      <div className="block-head"><h2>What clients say</h2></div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {TESTIMONIALS.map((t) => (
          <figure
            key={`${t.name}-${t.project ?? ""}`}
            className="case-card"
            style={{ display: "flex", flexDirection: "column", gap: 14, margin: 0 }}
          >
            <blockquote style={{ margin: 0, flex: 1, fontSize: "1rem", lineHeight: 1.6 }}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption style={{ fontSize: "0.86rem" }}>
              <strong>{t.name}</strong>
              {(t.role || t.company) && (
                <span className="muted">
                  {" "}
                  — {[t.role, t.company].filter(Boolean).join(", ")}
                </span>
              )}
              {t.project && (
                <div style={{ marginTop: 8 }}>
                  <span className="tag">{t.project}</span>
                </div>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
