import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { jsonLdScript, softwareProjectSchema } from "@/lib/schema";
import { PERSON, IMAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Freelance — Full-Stack Client Work",
  description:
    "Case study: Maan Travels, a production full-stack booking platform built and deployed end-to-end by Alakhsimar Singh, with passwordless auth and Lighthouse scores of 99/100/100/91.",
  alternates: { canonical: "/freelance" },
  openGraph: {
    url: "/freelance",
    title: "Freelance — Alakhsimar Singh",
    images: [{ url: IMAGES.ogImage, width: 1200, height: 630, alt: PERSON.name }],
  },
  twitter: { images: [IMAGES.ogImage] },
};

export default function FreelancePage() {
  return (
    <div data-page="freelance">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          softwareProjectSchema({
            name: "Maan Travels",
            description:
              "Production full-stack booking platform for a luxury chauffeur service, with passwordless device-trust authentication and Lighthouse scores of 99/100/100/91.",
            codeRepository: "https://github.com/AlakhsimarSingh/maan_travels.git",
            programmingLanguages: ["TypeScript"],
            url: "https://www.maantravels.com",
          })
        )}
      />
      <NavBar page="freelance" />

      <header className="hero">
        <div className="container">
          <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Freelance", path: "/freelance" }]} />
          <div className="hero-kicker">Freelance / Full-Stack Client Work</div>
          <h1>From legacy PHP<br />to production, solo.</h1>
          <p className="hero-sub">
            I take client projects end to end — architecture, auth, database, admin
            tooling, deployment, and the unglamorous performance work that makes a
            site actually fast. Below is the full build behind Maan Travels.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="https://www.maantravels.com" target="_blank" rel="noopener">View live site</a>
            <a className="btn btn-ghost" href="https://github.com/AlakhsimarSingh/maan_travels.git" target="_blank" rel="noopener">GitHub</a>
            <a className="btn btn-ghost" href={`mailto:${PERSON.email}`}>Hire me</a>
          </div>
        </div>
      </header>

      <main>
        <div className="container">

          <section className="block">
            <div className="block-head"><h2>Case study: Maan Travels</h2></div>

            <p className="muted" style={{ maxWidth: "62ch", fontSize: "1rem", marginBottom: 24 }}>
              A luxury chauffeur service needed to replace an aging, legacy PHP site
              with something that could run real bookings, fleet management, and
              payments without falling over. I designed, built, and deployed the
              entire platform — this is a production system serving real customers,
              not a demo.
            </p>

            <div className="readouts">
              <div className="readout"><div className="readout-label">Lighthouse — Performance</div><div className="readout-value">19 → 99</div></div>
              <div className="readout"><div className="readout-label">Lighthouse — Accessibility</div><div className="readout-value">65 → 96</div></div>
              <div className="readout"><div className="readout-label">Lighthouse — Best Practices</div><div className="readout-value">80 → 96</div></div>
              <div className="readout"><div className="readout-label">Lighthouse — SEO</div><div className="readout-value">85 → 100</div></div>
            </div>

            <div className="case-card">
              <div className="case-head">
                <h3>What I built</h3>
                <div className="case-links">
                  <a className="btn btn-ghost" href="https://www.maantravels.com" target="_blank" rel="noopener">Live site ↗</a>
                  <a className="btn btn-ghost" href="https://github.com/AlakhsimarSingh/maan_travels.git" target="_blank" rel="noopener">GitHub ↗</a>
                </div>
              </div>
              <div className="entry-body">
                <ul>
                  <li>Designed and deployed a production-grade full-stack platform handling real bookings, fleet, payments, and admin operations end to end.</li>
                  <li>Architected a passwordless device-trust authentication system using browser fingerprinting, SHA-256 hashed tokens, and HttpOnly cross-origin cookies — zero passwords stored.</li>
                  <li>Rebuilt the site with SSR/ISR and technical SEO, taking Lighthouse scores from 19/65/80/50 to 99/96/96/100.</li>
                  <li>Built an admin panel that stores payment screenshots in access-controlled Supabase buckets with signed URLs, visible only to authenticated admins.</li>
                </ul>
              </div>
            </div>

            <div className="tag-group" style={{ marginTop: 28 }}>
              <span className="tag-group-label">Stack</span>
              <div className="tags">
                <span className="tag">Next.js 15</span><span className="tag">TypeScript</span><span className="tag">Node.js</span>
                <span className="tag">PostgreSQL</span><span className="tag">Prisma ORM</span><span className="tag">Supabase</span>
                <span className="tag">Vercel</span><span className="tag">Render</span>
              </div>
            </div>
          </section>

          <section className="block" style={{ borderBottom: "none" }}>
            <div className="block-head"><h2>How I work with clients</h2></div>
            <div className="entry" style={{ gridTemplateColumns: "170px 1fr" }}>
              <div className="entry-time">Scope</div>
              <div><p style={{ fontSize: "0.94rem", color: "#C9C7BE" }}>Happy to take a project from a rough idea to a deployed, maintained product — or step into an existing codebase for a specific migration, performance pass, or feature.</p></div>
            </div>
            <div className="entry" style={{ gridTemplateColumns: "170px 1fr" }}>
              <div className="entry-time">Ownership</div>
              <div><p style={{ fontSize: "0.94rem", color: "#C9C7BE" }}>I handle architecture, auth/security, database design, deployment, and admin tooling myself — one point of contact, not a hand-off between specialists.</p></div>
            </div>
            <div className="entry" style={{ gridTemplateColumns: "170px 1fr" }}>
              <div className="entry-time">Get started</div>
              <div><p style={{ fontSize: "0.94rem" }}><a href={`mailto:${PERSON.email}`} style={{ color: "var(--moss)", borderBottom: "1px solid var(--moss-dim)" }}>{PERSON.email}</a> — happy to scope a project over a short call.</p></div>
            </div>
          </section>

        </div>
      </main>

      <Footer note="Available for freelance & contract web development" />
    </div>
  );
}
