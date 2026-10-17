import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SmartNotesDiagram from "@/components/SmartNotesDiagram";
import { jsonLdScript, softwareProjectSchema } from "@/lib/schema";
import { hasPublicFile } from "@/lib/files";
import { PERSON, IMAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tech — Software Engineering",
  description:
    "Alakhsimar Singh's software engineering work: Technical Development Program Associate on Optum's OIS DevOps team, the TDP internship that led to it, and the Smart Notes Platform, a full-stack AI-native app with real-time collaboration and RAG.",
  alternates: { canonical: "/tech" },
  openGraph: {
    url: "/tech",
    title: "Tech — Alakhsimar Singh",
    images: [{ url: IMAGES.ogImage, width: 1200, height: 630, alt: PERSON.name }],
  },
  twitter: { images: [IMAGES.ogImage] },
};

const ragSteps = [
  { label: "1 · Expand", value: "1 → 4 queries", detail: "Llama 3.3 70B rewrites the question three ways, so a note on \"React performance\" is found by \"frontend optimization\"." },
  { label: "2 · Retrieve", value: "Top 20", detail: "Hybrid score per chunk: 0.7 × best cosine similarity across variants + 0.3 × BM25-style keyword score." },
  { label: "3 · Rerank", value: "Top 6", detail: "Cohere rerank-v3.5 scores each (question, chunk) pair jointly; falls back to hybrid scores if Cohere fails." },
  { label: "4 · Answer", value: "Cited", detail: "Streamed answer grounded only in the sources, with inline [n] citations mapped back to notes." },
];

const decisions = [
  {
    label: "Separate collab process",
    decision: "Hocuspocus runs as its own process instead of a NestJS module. It owns its WebSocket server and lifecycle, which fights Nest's request-per-handler model more than it helps.",
    tradeoff: "The owner / editor / viewer check is re-implemented there against Prisma, so the two must stay in sync.",
  },
  {
    label: "Read-only at the protocol",
    decision: "Viewers connect with Hocuspocus's readOnly flag set, so the server refuses their Yjs updates. Hiding the toolbar alone would still let a modified client write.",
  },
  {
    label: "Two forms of one note",
    decision: "Every debounced save stores the Yjs binary state and an HTML copy, so search, AI summaries and public links read plain HTML without knowing Yjs exists. The first collaborative open seeds the Yjs doc from that HTML, which fixed shared notes opening blank.",
  },
  {
    label: "Local embeddings",
    decision: "MiniLM-L6 (384-d) runs in-process through Transformers.js: no per-call cost or rate limits, and note text never leaves the server to be embedded.",
    tradeoff: "Retrieval is a brute-force cosine scan over a user's chunks. Fine at personal scale; thousands of notes would need an ANN index such as pgvector.",
  },
  {
    label: "AI off the request path",
    decision: "Saving a note enqueues a BullMQ job; the worker summarizes, re-chunks (200 words, 40 overlap) and embeds in one transaction, then notifies the API to push the update over Socket.IO.",
    tradeoff: "Summaries and search lag a save by a few seconds.",
  },
  {
    label: "404, not 403",
    decision: "Requests for a private note you can't access return \"not found\". Confirming that it exists leaks more than a flat 404.",
  },
];

const hasCV = hasPublicFile(PERSON.cv);

export default function TechPage() {
  return (
    <div data-page="tech">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          softwareProjectSchema({
            name: "Smart Notes Platform",
            description:
              "Full-stack, AI-native personal knowledge base with real-time collaboration (Yjs/Hocuspocus), a hybrid RAG chat pipeline with Cohere reranking, local semantic embeddings, and a 3D knowledge graph.",
            codeRepository: "https://github.com/AlakhsimarSingh/smart_notes_platform.git",
            programmingLanguages: ["TypeScript", "JavaScript"],
          })
        )}
      />
      <NavBar page="tech" />

      <header className="hero">
        <div className="container">
          <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Tech", path: "/tech" }]} />
          <div className="hero-kicker">Tech / Software Engineering</div>
          <h1>Software that ships<br />and keeps running.</h1>
            <p className="hero-sub">
              I'm a software engineer who builds full-stack and AI-powered systems,
              from enterprise systems at Optum, where I ranked first in my intern cohort
              and now work full-time on the OIS DevOps team, to a real-time, RAG-driven knowledge
              platform of my own. Typed, tested, and deployed, not just prototyped.
            </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={`mailto:${PERSON.email}`}>Get in touch</a>
            {hasCV && (
              <a className="btn btn-ghost" href={PERSON.cv} target="_blank" rel="noopener">Résumé (PDF)</a>
            )}
            <a className="btn btn-ghost" href={PERSON.github} target="_blank" rel="noopener">GitHub</a>
            <a className="btn btn-ghost" href={PERSON.leetcode} target="_blank" rel="noopener">LeetCode</a>
          </div>
        </div>
      </header>

      <main>
        <div className="container">

          <section className="block">
            <div className="block-head"><h2>Experience</h2></div>

            <div className="entry">
              <div className="entry-time">Jul 2026 –<br />Present</div>
              <div>
                <div className="entry-title">Technical Development Program Associate — OIS DevOps</div>
                <div className="entry-org">Optum (UnitedHealth Group)</div>
                <div className="entry-body">
                  <ul>
                    <li>Joined full-time on 28 July 2026 through the pre-placement offer earned during the 2025 internship, as part of the OIS DevOps team.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="entry">
              <div className="entry-time">Jun 2025 –<br />Aug 2025</div>
              <div>
                <div className="entry-title">Software Engineer Intern — Technical Development Program</div>
                <div className="entry-org">Optum (UnitedHealth Group), Hyderabad</div>
                <div className="entry-body">
                  <ul>
                    <li>Delivered three enterprise use cases — a Data Migration App, a Data Quality Engine, and a Health Insights Engine — using TypeScript, Flask, and hybrid DL + LLM-based architectures.</li>
                    <li>Built a Query Assistant Tool that converted natural-language input into schema- and syntax-specific database queries.</li>
                    <li>Data Quality Engine flagged anomalies across millions of records to head off downstream failures and cost.</li>
                    <li>Health Insights Engine grouped patients by health-risk tier with personalized, model-generated insights.</li>
                    <li>Ranked 1st in the Ireland/India cohort and Global Runner-up at the TDP Shark Tank, against 300+ interns across 6 countries — and secured a Pre-Placement Offer for a full-time role.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="readouts">
              <div className="readout"><div className="readout-label">Cohort rank</div><div className="readout-value">#1 IE/IN</div></div>
              <div className="readout"><div className="readout-label">Global standing</div><div className="readout-value">Runner-up</div></div>
              <div className="readout"><div className="readout-label">Interns competed</div><div className="readout-value">300+</div></div>
              <div className="readout"><div className="readout-label">Outcome</div><div className="readout-value">PPO secured</div></div>
            </div>
          </section>

          <section className="block">
            <div className="block-head"><h2>Featured project</h2></div>

            <div className="case-card">
              <div className="case-head">
                <h3>Smart Notes Platform</h3>
                <div className="case-links">
                  <a className="btn btn-ghost" href="https://github.com/AlakhsimarSingh/smart_notes_platform.git" target="_blank" rel="noopener">GitHub ↗</a>
                </div>
              </div>
              <p className="muted" style={{ marginBottom: 14 }}>
                Next.js · NestJS · TypeScript · PostgreSQL · Yjs/Hocuspocus · Groq · Cohere
              </p>
              <SmartNotesDiagram />
              <div className="entry-body">
                <ul>
                  <li>A full-stack, AI-native personal knowledge base built incrementally from a basic CRUD app into a production-grade platform — three concurrent Node processes (NestJS API, a BullMQ worker for AI jobs, and a standalone Hocuspocus server for real-time sync).</li>
                  <li>Real-time collaborative editing via Yjs CRDTs, with JWT-authenticated WebSocket connections, protocol-level read-only enforcement for viewers, and live presence cursors.</li>
                  <li>A full RAG chat pipeline over the notes: multi-query expansion, chunk-level retrieval, hybrid semantic + BM25 search, and Cohere cross-encoder reranking, with inline citations and source attribution.</li>
                  <li>Local 384-dimensional semantic embeddings (Xenova/MiniLM) power both search and an explorable 3D knowledge graph, where each note&apos;s size and glow are driven by a computed recency/connection &quot;vitality&quot; score.</li>
                  <li>Role-based sharing (owner/editor/viewer) with email invites and public links, enforced by a single access-control service across the REST API and checked again by the collaboration server on every WebSocket connection.</li>
                </ul>
              </div>

              <h4 className="case-subhead">How the RAG chat answers a question</h4>
              <div className="readouts pipeline">
                {ragSteps.map((s) => (
                  <div className="readout" key={s.label}>
                    <div className="readout-label">{s.label}</div>
                    <div className="readout-value">{s.value}</div>
                    <p className="pipeline-detail">{s.detail}</p>
                  </div>
                ))}
              </div>

              <h4 className="case-subhead">Decisions &amp; tradeoffs</h4>
              {decisions.map((d) => (
                <div className="entry" key={d.label}>
                  <div className="entry-time">{d.label}</div>
                  <div>
                    <p className="decision">{d.decision}</p>
                    {d.tradeoff && (
                      <p className="decision-tradeoff"><span>Tradeoff</span> {d.tradeoff}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="tag-group" style={{ marginTop: 28 }}>
              <span className="tag-group-label">Stack</span>
              <div className="tags">
                <span className="tag">Next.js</span><span className="tag">NestJS</span><span className="tag">TypeScript</span>
                <span className="tag">PostgreSQL</span><span className="tag">Prisma</span><span className="tag">Redis / BullMQ</span>
                <span className="tag">Yjs</span><span className="tag">Hocuspocus</span><span className="tag">TipTap</span>
                <span className="tag">Socket.IO</span><span className="tag">Three.js</span><span className="tag">Transformers.js</span>
                <span className="tag">Groq</span><span className="tag">Cohere Rerank</span>
              </div>
            </div>
          </section>

          <section className="block">
            <div className="block-head"><h2>Also building</h2></div>
            <div className="entry" style={{ gridTemplateColumns: "170px 1fr" }}>
              <div className="entry-time">Jan 2025 –<br />Present</div>
              <div>
                <div className="entry-title">Maan Travels — production full-stack platform</div>
                <div className="entry-org">Freelance · Next.js 15, TypeScript, PostgreSQL, Prisma, Supabase</div>
                <div className="entry-body">
                  <p className="muted" style={{ fontSize: "0.94rem" }}>
                    Passwordless device-trust auth, 99/100/100/91 Lighthouse scores, real bookings &amp;
                    payments in production. Full case study on the freelance page.
                  </p>
                </div>
                <div className="entry-links">
                  <a href="/freelance">Read the case study →</a>
                </div>
              </div>
            </div>
          </section>

          <section className="block">
            <div className="block-head"><h2>Skills</h2></div>

            <div className="tag-group">
              <span className="tag-group-label">Languages</span>
              <div className="tags">
                <span className="tag">Java</span><span className="tag">C / C++</span><span className="tag">Python</span>
                <span className="tag">JavaScript</span><span className="tag">TypeScript</span>
              </div>
            </div>

            <div className="tag-group">
              <span className="tag-group-label">Development</span>
              <div className="tags">
                <span className="tag">React</span><span className="tag">Next.js</span><span className="tag">Node.js</span>
                <span className="tag">NestJS</span><span className="tag">Flask</span><span className="tag">FastAPI</span>
                <span className="tag">Django</span><span className="tag">Express</span><span className="tag">MySQL</span>
                <span className="tag">PostgreSQL</span><span className="tag">MongoDB</span>
              </div>
            </div>

            <div className="tag-group">
              <span className="tag-group-label">Coursework</span>
              <div className="tags">
                <span className="tag">DSA</span><span className="tag">Operating Systems</span><span className="tag">DBMS</span>
                <span className="tag">Computer Networks</span><span className="tag">System Design</span>
                <span className="tag">Cybersecurity &amp; Cryptography</span><span className="tag">Linear Algebra</span>
              </div>
            </div>

            <div className="tag-group">
              <span className="tag-group-label">Tools</span>
              <div className="tags">
                <span className="tag">Git</span><span className="tag">GitHub</span><span className="tag">Postman</span>
                <span className="tag">Jupyter</span><span className="tag">VS Code</span>
              </div>
            </div>
          </section>

          <section className="block" style={{ borderBottom: "none" }}>
            <div className="block-head"><h2>Education</h2></div>
            <div className="entry">
              <div className="entry-time">2022 –<br />2026</div>
              <div>
                <div className="entry-title">B.Tech, Computer Science Engineering</div>
                <div className="entry-org">Dr. B. R. Ambedkar National Institute of Technology, Jalandhar — CGPA 8.26</div>
              </div>
            </div>
            <div className="entry">
              <div className="entry-time">2020 –<br />2022</div>
              <div>
                <div className="entry-title">Senior Secondary &amp; Matriculation</div>
                <div className="entry-org">Apeejay School, Jalandhar (CBSE) — 93.8% · 90%</div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer note="Global Runner-up, Optum TDP Shark Tank 2025 · English, French, Hindi, Punjabi" />
    </div>
  );
}
