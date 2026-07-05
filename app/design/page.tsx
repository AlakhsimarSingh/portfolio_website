import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PERSON, IMAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Design — Editing & Graphic Design",
  description: "Alakhsimar Singh's editing and graphic design portfolio — coming soon.",
  alternates: { canonical: "/design" },
  openGraph: {
    url: "/design",
    title: "Design — Alakhsimar Singh",
    images: [{ url: IMAGES.ogImage, width: 1200, height: 630, alt: PERSON.name }],
  },
  twitter: { images: [IMAGES.ogImage] },
};

export default function DesignPage() {
  return (
    <div data-page="design">
      <NavBar page="design" />

      <header className="hero">
        <div className="container">
          <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Design", path: "/design" }]} />
          <div className="hero-kicker">Design / Editing &amp; Visual Work</div>
          <h1>The fourth trace is<br />still tuning in.</h1>
          <p className="hero-sub">
            This lens covers video editing and graphic design — the side of my work
            that&apos;s more visual instinct than pipeline. The full portfolio is being
            put together now.
          </p>
        </div>
      </header>

      <main>
        <div className="container">
          <section className="block" style={{ borderBottom: "none" }}>
            <div className="coming-soon-panel">
              <h3>Portfolio landing soon</h3>
              <p>In the meantime — I&apos;ve organized 30+ student video-editing workshops, and have a body of editing and graphic design work I&apos;m curating for this page. Reach out directly if you&apos;d like samples now.</p>
              <div className="hero-actions" style={{ justifyContent: "center", marginTop: 22 }}>
                <a className="btn btn-primary" href={`mailto:${PERSON.email}`}>Ask for samples</a>
                <a className="btn btn-ghost" href="/">Back to hub</a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer note="30+ student video-editing workshops organized, 2023" />
    </div>
  );
}
