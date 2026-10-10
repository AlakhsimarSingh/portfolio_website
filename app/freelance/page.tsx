import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { jsonLdScript, softwareProjectSchema } from "@/lib/schema";
import { PERSON, IMAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Freelance — Full-Stack Client Work",
  description:
    "Case studies: Maan Travels, a production chauffeur booking platform with passwordless auth and Lighthouse scores of 99/100/100/91, and NUMEN, a full-stack streetwear e-commerce store with Razorpay payments, multi-currency pricing and dynamic shipping. Plus live demo sites for export, B2B catalog and e-commerce businesses. Built and deployed end-to-end by Alakhsimar Singh.",
  alternates: { canonical: "/freelance" },
  openGraph: {
    url: "/freelance",
    title: "Freelance — Alakhsimar Singh",
    images: [{ url: IMAGES.ogImage, width: 1200, height: 630, alt: PERSON.name }],
  },
  twitter: { images: [IMAGES.ogImage] },
};

const DEMOS = [
  {
    name: "IronRoute Exports",
    url: "https://tools-export-eight.vercel.app/",
    blurb:
      "Spare-parts exporter site with a six-category catalog, inquiry-to-delivery timeline, certifications, destination ports, and a quote request form.",
    tags: ["Export", "Lead generation"],
  },
  {
    name: "Meridian Industrial Exports",
    url: "https://demo1-meridian.vercel.app/",
    blurb:
      "Image-led brand site for an industrial exporter: product lines, industries served, a seven-step export process, and an enquiry form.",
    tags: ["B2B", "Brand site"],
  },
  {
    name: "Global Export Sales Platform",
    url: "https://premium-export-six.vercel.app",
    blurb:
      "B2B catalog with filtering, product comparison, a multi-step RFQ flow, and a bulk savings estimator that prices by quantity and region.",
    tags: ["B2B catalog", "RFQ workflow"],
  },
  {
    name: "Boothill Arms Co.",
    url: "https://boothill-arms-co-five.vercel.app/",
    blurb:
      "Old-frontier themed storefront with browse-by-type navigation, a filterable catalog, cart, deals, and a pickup-or-ship ordering flow.",
    tags: ["E-commerce", "Themed design"],
  },
];

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          softwareProjectSchema({
            name: "NUMEN",
            description:
              "Production full-stack streetwear e-commerce platform with Razorpay payments (card/UPI), a multi-currency pricing engine, dynamic weight- and destination-aware shipping, and an admin bulk product editor.",
            codeRepository: "https://github.com/AlakhsimarSingh/numen-store",
            programmingLanguages: ["TypeScript"],
            url: "https://www.invitedsonly.com",
          })
        )}
      />
      <NavBar page="freelance" />

      <header className="hero">
        <div className="container">
          <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Freelance", path: "/freelance" }]} />
          <div className="hero-kicker">Freelance / Full-Stack Client Work</div>
          <h1>Real products.<br />Built and shipped solo.</h1>
          <p className="hero-sub">
            I take client projects end to end: architecture, auth, payments, database,
            admin tooling, deployment, and the unglamorous performance work that makes a
            site actually fast. Below are two production builds, Maan Travels, a
            chauffeur booking platform, and NUMEN, a streetwear e-commerce store,
            followed by a set of demo sites.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="https://www.maantravels.com" target="_blank" rel="noopener">Maan Travels</a>
            <a className="btn btn-primary" href="https://www.invitedsonly.com" target="_blank" rel="noopener">NUMEN</a>
            <a className="btn btn-ghost" href="#demos">Demos</a>
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
              entire platform. This is a production system serving real customers,
              not a demo.
            </p>

            <div className="readouts">
              <div className="readout"><div className="readout-label">Lighthouse — Performance</div><div className="readout-value">19 → 99</div></div>
              <div className="readout"><div className="readout-label">Lighthouse — Accessibility</div><div className="readout-value">75 → 100</div></div>
              <div className="readout"><div className="readout-label">Lighthouse — Best Practices</div><div className="readout-value">82 → 100</div></div>
              <div className="readout"><div className="readout-label">Lighthouse — SEO</div><div className="readout-value">85 → 91</div></div>
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
                  <li>Architected a passwordless device-trust authentication system using browser fingerprinting, SHA-256 hashed tokens, and HttpOnly cross-origin cookies, with zero passwords stored.</li>
                  <li>Rebuilt the site with SSR/ISR and technical SEO, taking Lighthouse scores from 19/75/82/85 to 99/100/100/91.</li>
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

          <section className="block">
            <div className="block-head"><h2>Case study: NUMEN</h2></div>

            <p className="muted" style={{ maxWidth: "62ch", fontSize: "1rem", marginBottom: 24 }}>
              NUMEN sells streetwear and accessories (sneakers, watches, perfumes,
              shades, bags) to customers around the world. That means prices in
              different currencies, shipping costs that depend on what is in the box
              and where it is going, and a catalog too big to manage one product at a
              time. I built the whole platform around those constraints: storefront,
              checkout, payments, shipping logic, and admin tooling. It is live at
              invitedsonly.com and handling real orders.
            </p>

            <div className="readouts">
              <div className="readout"><div className="readout-label">Live catalog</div><div className="readout-value">1500+ products</div></div>
              <div className="readout"><div className="readout-label">Categories</div><div className="readout-value">8</div></div>
              <div className="readout"><div className="readout-label">Payments</div><div className="readout-value">Card · UPI</div></div>
              <div className="readout"><div className="readout-label">Pricing</div><div className="readout-value">Multi-currency</div></div>
            </div>

            <div className="case-card">
              <div className="case-head">
                <h3>What I built</h3>
                <div className="case-links">
                  <a className="btn btn-ghost" href="https://www.invitedsonly.com" target="_blank" rel="noopener">Live site ↗</a>
                  <a className="btn btn-ghost" href="https://github.com/AlakhsimarSingh/numen-store" target="_blank" rel="noopener">GitHub ↗</a>
                </div>
              </div>
              <div className="entry-body">
                <ul>
                  <li>Built a production e-commerce platform end to end (catalog, cart, multi-step checkout, and admin operations) for a streetwear and accessories store spanning shoes, watches, perfumes, shades, bags, and more.</li>
                  <li>Integrated Razorpay for card and UPI payments, with server-side signature verification so an order is never marked paid on the client&apos;s word alone.</li>
                  <li>Engineered a multi-currency pricing engine, so shoppers can browse and pay in their own currency with prices kept consistent from catalog to final billing.</li>
                  <li>Built a weight- and destination-aware dynamic shipping calculator, applied consistently across cart, checkout, and the final invoice.</li>
                  <li>Shipped an Excel-style bulk product editor for the admin panel, so a catalog of hundreds of items can be updated in one pass instead of one product at a time.</li>
                </ul>
              </div>
            </div>

            <div className="tag-group" style={{ marginTop: 28 }}>
              <span className="tag-group-label">Stack</span>
              <div className="tags">
                <span className="tag">Next.js 15</span><span className="tag">TypeScript</span><span className="tag">Tailwind CSS</span>
                <span className="tag">PostgreSQL</span><span className="tag">Prisma ORM</span><span className="tag">Zustand</span>
                <span className="tag">Razorpay</span><span className="tag">Supabase</span><span className="tag">Vercel</span>
              </div>
            </div>
          </section>

          <section className="block" id="demos">
            <div className="block-head"><h2>Demo builds</h2></div>

            <p className="muted" style={{ maxWidth: "62ch", fontSize: "1rem", marginBottom: 24 }}>
              Concept sites that show the range of what I can deliver for different
              kinds of businesses. They run on sample content, so treat them as
              working previews rather than live companies.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 16,
              }}
            >
              {DEMOS.map((demo) => (
                <div
                  key={demo.name}
                  className="case-card"
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  <h3>{demo.name}</h3>
                  <p className="muted" style={{ fontSize: "0.94rem", flex: 1 }}>{demo.blurb}</p>
                  <div className="tags">
                    {demo.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div>
                    <a className="btn btn-ghost" href={demo.url} target="_blank" rel="noopener">View demo ↗</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="block" style={{ borderBottom: "none" }}>
            <div className="block-head"><h2>How I work with clients</h2></div>
            <div className="entry" style={{ gridTemplateColumns: "170px 1fr" }}>
              <div className="entry-time">Scope</div>
              <div><p style={{ fontSize: "0.94rem", color: "#C9C7BE" }}>Happy to take a project from a rough idea to a deployed, maintained product, or step into an existing codebase for a specific migration, performance pass, or feature.</p></div>
            </div>
            <div className="entry" style={{ gridTemplateColumns: "170px 1fr" }}>
              <div className="entry-time">Ownership</div>
              <div><p style={{ fontSize: "0.94rem", color: "#C9C7BE" }}>I handle architecture, auth/security, payments, database design, deployment, and admin tooling myself: one point of contact, not a hand-off between specialists.</p></div>
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