import type { Metadata } from "next";
import { existsSync } from "fs";
import path from "path";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PublicationList from "@/components/PublicationList";
import { jsonLdScript, scholarlyArticleSchema } from "@/lib/schema";
import { PERSON, IMAGES } from "@/lib/site";
import { publications, STATUS_LABEL, TOPICS } from "@/lib/Research";

export const metadata: Metadata = {
  title: "Research — Applied Machine Learning",
  description:
    "Alakhsimar Singh's machine learning research: fMRI classification of Jhana meditation at Harvard Medical School / MGH, LiDAR sensor fusion for autonomous driving (accepted at ICECER 2026), multimodal engagement detection, and brain connectivity analysis at Georgia Tech.",
  keywords: [
    "Machine Learning",
    "Machine Learning Researcher",
    "Computer Vision",
    "LiDAR",
    "Sensor Fusion",
    "fMRI",
    "Neuroimaging",
    "Deep Learning",
  ],
  alternates: { canonical: "/research" },
  openGraph: {
    url: "/research",
    title: "Research — Alakhsimar Singh",
    images: [{ url: IMAGES.ogImage, width: 1200, height: 630, alt: PERSON.name }],
  },
  twitter: { images: [IMAGES.ogImage] },
};

type Figure = { src: string; width: number; height: number; alt: string; caption: string };

const projects: {
  title: string;
  meta: string;
  links: { label: string; href: string }[];
  figure?: Figure;
  results: { label: string; value: string }[];
  bullets: string[];
}[] = [
  {
    title: "LiDAR Modality Fusion for Snow-Pole Detection",
    meta: "Computer vision · YOLOv11 · PCA · Sensor fusion · Accepted, ICECER 2026",
    links: [{ label: "GitHub", href: "https://github.com/AlakhsimarSingh/RangeModalitiesProject" }],
    figure: {
      src: "/images/research/lidar-fusion-architecture.png",
      width: 1685,
      height: 810,
      alt: "Three LiDAR fusion architectures feeding YOLOv11n: (a) QM-PCA fuses reflectance, signal, NearIR and range into 3 PCA channels; (b) LG-PCA uses LDA foreground/background separation plus PCA residuals; (c) range injected mid-network through a convolutional range encoder.",
      caption: "Fusion strategies compared: (a) Quad-Modal PCA, (b) LDA-Guided PCA, (c) mid-network range injection.",
    },
    results: [
      { label: "Best detection", value: "91.0 mAP50" },
      { label: "Best localization", value: "45.0 mAP50-95" },
      { label: "Range variance", value: "< 2%" },
    ],
    bullets: [
      "Evaluated single-modality learning, direct 4-channel input, and multiple fusion strategies for LiDAR-based snow-pole detection on a Nordic winter dataset.",
      "Proposed Quad-Modal PCA Fusion (QM-PCA), reaching 91.0 mAP50, and LDA-Guided PCA Fusion improving localization precision to 45.0 mAP50-95.",
      "Foreground-biased PCA analysis showed range contributes under 2% of pole-discriminative variance versus intensity-based channels, so more modalities do not automatically mean more useful information.",
    ],
  },
  {
    title: "VisioPhysioENet",
    meta: "Deep learning · Physiological signal processing · Computer vision · Sept 2024",
    links: [{ label: "Read the paper", href: "https://arxiv.org/abs/2409.16126" }],
    figure: {
      src: "/images/research/visiophysioenet-architecture.png",
      width: 2019,
      height: 678,
      alt: "VisioPhysioENet pipeline: video frames are split into physiological signals (heart rate, peak intervals, systolic and diastolic peak sums) and visual features (eye category, head position, gaze direction), classified by random forest and AdaBoost ensembles, then stacked with logistic regression into four engagement levels.",
      caption: "Architecture: per-modality feature extraction and ensembles, combined by stacked generalization into four engagement levels.",
    },
    results: [
      { label: "Accuracy", value: "63.02%" },
      { label: "Dataset", value: "DAiSEE" },
      { label: "Modalities", value: "Visual + physiological" },
    ],
    bullets: [
      "Multimodal architecture fusing visual and physiological signals for engagement detection in e-learning.",
      "Reached 63.02% accuracy on the DAiSEE dataset, outperforming state-of-the-art models.",
      "Used parallel processing (ThreadPoolExecutor) to cut training time and improve throughput.",
    ],
  },
  {
    title: "fMRI Functional Connectivity Analysis",
    meta: "Python · Signal processing · CPCA · Nilearn · MATLAB · Aug 2024 – Apr 2025",
    links: [{ label: "GitHub", href: "https://github.com/MIntelligence-Group/DBCATS" }],
    results: [
      { label: "Brain regions", value: "246" },
      { label: "Subjects", value: "50 (HCP)" },
      { label: "Conditions", value: "Rest · 0-back · 2-back" },
    ],
    bullets: [
      "Processed time-series fMRI data across 246 brain regions and 50 subjects from the HCP dataset.",
      "Applied CPCA and QPP detection to surface spatiotemporal connectivity patterns.",
      "Showed the CPCA pipeline generalizes across rest, 0-back, and 2-back task conditions.",
    ],
  },
];

const acceptedOrPublished = publications.filter((p) => p.status !== "review").length;
const underReview = publications.filter((p) => p.status === "review").length;

// The CV button appears automatically once the PDF is dropped into /public.
const hasCV = existsSync(path.join(process.cwd(), "public", PERSON.cv));

export default function ResearchPage() {
  return (
    <div data-page="research">
      {publications.map((p) => (
        <script
          key={p.title}
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(
            scholarlyArticleSchema({
              name: p.title,
              authors: p.authors,
              description: p.summary || `${STATUS_LABEL[p.status]}: ${p.venue}`,
              url: p.link || "https://alakhsimarsingh.com/research",
              status: `${STATUS_LABEL[p.status]} · ${p.venue}`,
              about: ["Machine Learning"],
            })
          )}
        />
      ))}
      <NavBar page="research" />

      <header className="hero">
        <div className="container">
          <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Research", path: "/research" }]} />
          <div className="hero-kicker">Research / Applied Machine Learning</div>
          <h1>Turning messy data<br />into reliable models.</h1>
          <p className="hero-sub">
            I build <mark className="term">machine learning</mark> systems for high-dimensional,
            noisy data (fMRI volumes, LiDAR point clouds, video, physiological signals) and
            study what the models actually learn. My work so far spans neuroimaging,
            autonomous-driving perception, and multimodal learning.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={`mailto:${PERSON.email}`}>Get in touch</a>
            {hasCV && (
              <a className="btn btn-ghost" href={PERSON.cv} target="_blank" rel="noopener">CV (PDF)</a>
            )}
            <a className="btn btn-ghost" href={PERSON.scholar} target="_blank" rel="noopener">Google Scholar</a>
            <a className="btn btn-ghost" href="#publications">Publications</a>
          </div>
        </div>
      </header>

      <main>
        <div className="container">

          <section className="block" id="interests">
            <div className="block-head"><h2>Research interests</h2></div>
            <div className="research-statement">
              <p>
                I&apos;m drawn to learning from signals that are high-dimensional, noisy, and
                expensive to collect, and to checking what a model has actually learned
                before trusting it. The questions I want to pursue next:
              </p>
              <div className="entry-body">
                <ul>
                  <li>How well do representations learned from fMRI generalize across subjects, sessions, and scanners, and which brain regions genuinely drive a classifier&apos;s decision?</li>
                  <li>When does adding a sensing modality add information rather than noise, and how should fusion be designed to tell the difference?</li>
                  <li>How do we build analysis pipelines that stay reproducible across conditions and datasets instead of being tuned to one?</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="block" id="experience">
            <div className="block-head"><h2>Research experience</h2></div>

            <div className="entry">
              <div className="entry-time">Aug 2025 –<br />Present</div>
              <div>
                <div className="entry-title">MRP Undergraduate Research Assistant — <mark className="term">Machine Learning</mark> &amp; Brain Dynamics</div>
                <div className="entry-org">Harvard Medical School (HMS) &amp; Massachusetts General Hospital (MGH), USA</div>
                <div className="entry-body">
                  <ul>
                    <li>Investigating alterations in brain dynamics during Jhana meditation using advanced neuroimaging and fMRI analysis pipelines.</li>
                    <li>Built pipelines for upsampling, classification, and visualization of pre-processed gradient data; produced group-level brain activation plots.</li>
                    <li>Conducted lesion overlap analysis at voxel and network levels to study connectivity disruptions.</li>
                    <li>Co-authored a machine learning classification study (ensemble classifiers on fMRI regional homogeneity) reaching 66.82% accuracy distinguishing meditation states. See publications below.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="entry">
              <div className="entry-time">Aug 2024 –<br />Apr 2025</div>
              <div>
                <div className="entry-title">Remote Research Intern — Affective Computing &amp; Neuro Dynamics</div>
                <div className="entry-org">Georgia Institute of Technology, USA</div>
                <div className="entry-body">
                  <ul>
                    <li>Developed pipelines for processing fMRI (.nii) data and applied Complex PCA (CPCA) for voxel- and network-level connectivity analysis.</li>
                    <li>Demonstrated reproducibility of the CPCA analysis across multiple subjects and experimental conditions.</li>
                    <li>Research outcomes accepted as a poster at CNS 2025 (34th Annual Computational Neuroscience Meeting, OCNS), Florence.</li>
                  </ul>
                </div>
                <div className="entry-links">
                  <a href="https://github.com/MIntelligence-Group/DBCATS" target="_blank" rel="noopener">GitHub — DBCATS →</a>
                </div>
              </div>
            </div>
          </section>

          <section className="block" id="publications">
            <div className="block-head"><h2>Publications</h2></div>

            <div className="readouts">
              <div className="readout"><div className="readout-label">Papers &amp; posters</div><div className="readout-value">{publications.length}</div></div>
              <div className="readout"><div className="readout-label">Accepted / published</div><div className="readout-value">{acceptedOrPublished}</div></div>
              <div className="readout"><div className="readout-label">Under review</div><div className="readout-value">{underReview}</div></div>
              <div className="readout"><div className="readout-label">Research areas</div><div className="readout-value">{TOPICS.length}</div></div>
            </div>

            <PublicationList items={publications} />
          </section>

          <section className="block" id="projects">
            <div className="block-head"><h2>Selected projects</h2></div>

            {projects.map((project) => (
              <div className="case-card" key={project.title}>
                <div className="case-head">
                  <h3>{project.title}</h3>
                  <div className="case-links">
                    {project.links.map((l) => (
                      <a key={l.href} className="btn btn-ghost" href={l.href} target="_blank" rel="noopener">{l.label} ↗</a>
                    ))}
                  </div>
                </div>
                <p className="muted" style={{ marginBottom: 14 }}>{project.meta}</p>
                {project.figure && (
                  <figure className="research-figure">
                    <div className="research-figure-img">
                      <Image
                        src={project.figure.src}
                        width={project.figure.width}
                        height={project.figure.height}
                        alt={project.figure.alt}
                        sizes="(max-width: 1080px) 100vw, 1000px"
                      />
                    </div>
                    <figcaption>{project.figure.caption}</figcaption>
                  </figure>
                )}
                <div className="readouts" style={{ marginBottom: 14 }}>
                  {project.results.map((r) => (
                    <div className="readout" key={r.label}>
                      <div className="readout-label">{r.label}</div>
                      <div className="readout-value">{r.value}</div>
                    </div>
                  ))}
                </div>
                <div className="entry-body">
                  <ul>
                    {project.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          <section className="block" style={{ borderBottom: "none" }}>
            <div className="block-head"><h2>Skills &amp; coursework</h2></div>

            <div className="tag-group">
              <span className="tag-group-label">Programming</span>
              <div className="tags">
                <span className="tag">Python</span><span className="tag">C++</span><span className="tag">Java</span>
                <span className="tag">MATLAB</span><span className="tag">JavaScript</span>
              </div>
            </div>

            <div className="tag-group">
              <span className="tag-group-label">Machine Learning &amp; Deep Learning</span>
              <div className="tags">
                <span className="tag">Supervised / Unsupervised Learning</span><span className="tag">Reinforcement Learning</span>
                <span className="tag">CPCA</span><span className="tag">CNNs</span><span className="tag">RNNs</span>
                <span className="tag">Attention Models</span><span className="tag">Computer Vision</span><span className="tag">NLP</span>
                <span className="tag">YOLO</span><span className="tag">Ensemble Classifiers</span>
              </div>
            </div>

            <div className="tag-group">
              <span className="tag-group-label">Tools &amp; frameworks</span>
              <div className="tags">
                <span className="tag">PyTorch</span><span className="tag">Nilearn</span><span className="tag">AFNI</span><span className="tag">FSL</span>
                <span className="tag">scikit-learn</span><span className="tag">OpenCV</span><span className="tag">LangChain</span>
                <span className="tag">transformers</span>
              </div>
            </div>

            <div className="tag-group">
              <span className="tag-group-label">Coursework</span>
              <div className="tags">
                <span className="tag">Machine Learning</span><span className="tag">Deep Learning</span>
                <span className="tag">Large Language Models</span><span className="tag">Linear Algebra</span>
                <span className="tag">Probability &amp; Statistics</span><span className="tag">Numerical Analysis</span>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer note="Dr. B. R. Ambedkar NIT Jalandhar · B.Tech CSE, 2022–2026" />
    </div>
  );
}