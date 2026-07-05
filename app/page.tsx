import type { Metadata } from "next";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import LensCard from "@/components/LensCard";
import { PERSON, IMAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: `${PERSON.name} — Software Engineer, ML Researcher & Full-Stack Developer`,
  description:
    "Alakhsimar Singh's portfolio: software engineering at Optum, machine learning research in neuroimaging and computer vision, freelance full-stack development, and design.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: `${PERSON.name} — Portfolio`,
    images: [{ url: IMAGES.ogImage, width: 1200, height: 630, alt: PERSON.name }],
  },
  twitter: { images: [IMAGES.ogImage] },
};

export default function HubPage() {
  return (
    <div data-page="hub">
      <NavBar page="hub" />

      <header className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-kicker">Jalandhar, India — open to opportunities</div>
              <h1>Four traces,<br />one signal.</h1>
              <p className="hero-sub">
                I&apos;m Alakhsimar Singh — a final-year Computer Science engineer who moves
                between production software, <mark className="term">machine learning</mark> research
                on brain signals, freelance client builds, and visual design. Different
                instruments, same underlying discipline: read the signal, build the
                system, ship it clean.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href={`mailto:${PERSON.email}`}>Email me</a>
                <a className="btn btn-ghost" href={PERSON.github} target="_blank" rel="noopener">GitHub</a>
                <a className="btn btn-ghost" href={PERSON.linkedin} target="_blank" rel="noopener">LinkedIn</a>
              </div>
            </div>
            <div className="hero-photo-wrap">
              <Image
                src={IMAGES.profile}
                alt={`${PERSON.name}, ${PERSON.jobTitles[0]}`}
                width={440}
                height={704}
                className="hero-photo"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="lens-grid">
            <LensCard
              lens="tech"
              href="/tech"
              label="Tech"
              title="Software Engineering"
              description="Enterprise systems at Optum, plus Smart Notes — a full-stack AI-native platform with real-time collaboration and RAG."
              tracePath="M0,32 L50,32 L50,10 L95,10 L95,54 L140,54 L140,10 L185,10 L185,32 L235,32 L235,16 L280,16 L280,48 L325,48 L325,32 L400,32"
            />
            <LensCard
              lens="research"
              href="/research"
              label="Research"
              title="Machine Learning & Brain Dynamics"
              description="fMRI and machine learning research at Harvard Medical School / MGH, Georgia Tech, and beyond — 5 papers in review or published."
              tracePath="M0,32 C20,10 35,54 55,30 C70,12 85,50 105,28 C125,8 140,52 160,34 C185,14 205,48 230,30 C255,14 275,46 300,30 C325,16 345,44 370,30 L400,32"
            />
            <LensCard
              lens="freelance"
              href="/freelance"
              label="Freelance"
              title="Full-Stack Client Work"
              description="Built & deployed Maan Travels end-to-end — Lighthouse scores from 19/75/82/85 to 99/100/100/91."
              tracePath="M0,56 L60,56 L60,46 L120,46 L120,34 L180,34 L180,24 L240,24 L240,16 L300,16 L300,8 L400,4"
            />
            <LensCard
              lens="design"
              href="/design"
              label="Design"
              title="Editing & Graphic Design"
              description="Organized 30+ student video-editing workshops. Portfolio landing soon."
              tracePath="M0,40 C30,20 60,50 90,30 C120,12 150,46 180,26 C210,10 240,44 270,28 C300,14 330,40 360,26 L400,32"
            />
          </div>
        </div>
      </main>

      <Footer note="B.Tech CSE, Dr. B. R. Ambedkar NIT Jalandhar · 2022–2026" />
    </div>
  );
}
