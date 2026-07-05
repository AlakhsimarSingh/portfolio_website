import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { jsonLdScript, scholarlyArticleSchema } from "@/lib/schema";
import { PERSON, IMAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research — Machine Learning & Brain Dynamics",
  description:
    "Alakhsimar Singh's machine learning research: fMRI classification of Jhana meditation at Harvard Medical School / MGH, LiDAR sensor fusion for autonomous driving, and brain connectivity analysis at Georgia Tech.",
  keywords: [
    "Machine Learning",
    "Machine Learning Researcher",
    "fMRI",
    "Computer Vision",
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

const publications = [
  {
    year: "2026",
    type: "Preprint · Under review at PLOS Biology",
    title: "Machine Learning-Based Classification of Jhana Advanced Concentrative Absorption Meditation (ACAM-J) using 7T fMRI",
    authors: "Kumar, P., Yang, W. F. Z., Singh, A., Li, X., Sacchet, M. D.",
    summary:
      "Uses fMRI-derived regional homogeneity and ensemble machine learning classifiers to distinguish advanced Jhana meditation states from control conditions, reaching 66.82% accuracy with prefrontal and anterior cingulate regions driving model decisions.",
    link: "https://meditation.mgh.harvard.edu/files/Kumar_26_arXiv.pdf",
    linkLabel: "Preprint",
  },
  {
    year: "2026",
    type: "Under review at MFI 2026",
    title: "On the Role of Range in LiDAR-Based Snow-Pole Detection: A Principled Study of Modality Fusion",
    authors: "Tiwari, S., Singh, A., Rafiq, M. I., Singh, N., Seipel, S., Bavirisetti, D. P.",
    summary:
      "A systematic study of LiDAR range as a detection modality for autonomous driving, proposing three fusion methods — including Quad-Modal PCA Fusion reaching 91.0 mAP50 — and showing range contributes under 2% of pole-discriminative variance versus intensity-based cues.",
    link: "https://github.com/AlakhsimarSingh/RangeModalitiesProject",
    linkLabel: "Code & docs",
  },
  {
    year: "2025",
    type: "Conference poster · CNS 2025 (OCNS), Florence, Italy",
    title: "Network vs ROI Perspectives: Brain Connectivity Analysis using Complex Principal Component Analysis",
    authors: "Kumar, P., Singh, A., Li, X., Keilholz, S., Schumacher, E. H.",
    summary:
      "Accepted at the 34th Annual Computational Neuroscience Meeting; compares network-level and region-of-interest perspectives on brain connectivity using CPCA.",
    link: null,
    linkLabel: null,
  },
  {
    year: "2025",
    type: "Journal article · Submitted to Elsevier, under peer review",
    title: "Visual Physiological Engagement Detection Network",
    authors: "Singh, A., Goyal, K., Verma, N., Kumar, P., Li, X., Singh, A.",
    summary: null,
    link: null,
    linkLabel: null,
  },
  {
    year: "2024",
    type: "Book chapter",
    title: "Multimodal Engagement Detection Systems and the Unseen Threat to Learner Privacy",
    authors: "Singh, A., Verma, N., Goyal, K., Kumar, P., Li, X., Singh, A.",
    summary: 'Published in "The Dark Side of AI: Privacy Invasions and Data Vulnerabilities."',
    link: null,
    linkLabel: null,
  },
];

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
              authors: p.authors.split(", "),
              description: p.summary || p.type,
              url: p.link || "https://alakhsimarsingh.com/research",
              status: p.type,
              about: ["Machine Learning"],
            })
          )}
        />
      ))}
      <NavBar page="research" />

      <header className="hero">
        <div className="container">
          <Breadcrumbs trail={[{ name: "Home", path: "/" }, { name: "Research", path: "/research" }]} />
          <div className="hero-kicker">Research / Machine Learning &amp; Brain Dynamics</div>
          <h1>Reading signal out of<br />noisy brains.</h1>
          <p className="hero-sub">
            I work at the intersection of neuroimaging and <mark className="term">machine learning</mark> —
            building pipelines and classifiers that turn raw fMRI volumes and sensor data
            into patterns a lab can actually reason about, across meditation, engagement,
            and autonomous-driving perception studies.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={`mailto:${PERSON.email}`}>Get in touch</a>
            <a className="btn btn-ghost" href="https://github.com/AlakhsimarSingh/DBCATS.git" target="_blank" rel="noopener">Research GitHub</a>
          </div>
        </div>
      </header>

      <main>
        <div className="container">

          <section className="block">
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
                    <li>Co-authored a machine learning classification study (ensemble classifiers on fMRI regional homogeneity) reaching 66.82% accuracy distinguishing meditation states — see publications below.</li>
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
                    <li>Research outcomes accepted at CNS 2025 (Cognitive Neuroscience Society Annual Meeting).</li>
                  </ul>
                </div>
                <div className="entry-links">
                  <a href="https://github.com/AlakhsimarSingh/DBCATS.git" target="_blank" rel="noopener">GitHub — DBCATS →</a>
                </div>
              </div>
            </div>
          </section>

          <section className="block">
            <div className="block-head"><h2>Publications</h2></div>

            {publications.map((p) => (
              <div className="entry" style={{ gridTemplateColumns: "170px 1fr" }} key={p.title}>
                <div className="entry-time">
                  {p.year}
                  <br />
                  <span className="muted" style={{ fontSize: 11 }}>{p.type}</span>
                </div>
                <div>
                  <div className="entry-title">{p.title}</div>
                  <div className="entry-org">{p.authors}</div>
                  {p.summary && <p className="muted" style={{ fontSize: "0.92rem", marginTop: 8 }}>{p.summary}</p>}
                  {p.link && (
                    <div className="entry-links">
                      <a href={p.link} target="_blank" rel="noopener">{p.linkLabel} →</a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>

          <section className="block">
            <div className="block-head"><h2>Selected projects</h2></div>

            <div className="case-card">
              <div className="case-head">
                <h3>VisioPhysioENet</h3>
                <div className="case-links">
                  <a className="btn btn-ghost" href="https://arxiv.org/pdf/2409.16126" target="_blank" rel="noopener">Read the paper</a>
                </div>
              </div>
              <p className="muted" style={{ marginBottom: 14 }}>Deep learning · Physiological signal processing · Computer vision · Sept 2024</p>
              <div className="entry-body">
                <ul>
                  <li>Multimodal architecture fusing visual and physiological signals for engagement detection in e-learning.</li>
                  <li>Reached 63.02% accuracy on the DAiSEE dataset, outperforming state-of-the-art models.</li>
                  <li>Used parallel processing (ThreadPoolExecutor) to cut training time and improve throughput.</li>
                </ul>
              </div>
            </div>

            <div className="case-card">
              <div className="case-head">
                <h3>fMRI Functional Connectivity Analysis</h3>
                <div className="case-links">
                  <a className="btn btn-ghost" href="https://github.com/MIntelligence-Group/DBCATS" target="_blank" rel="noopener">GitHub</a>
                </div>
              </div>
              <p className="muted" style={{ marginBottom: 14 }}>Python · Signal processing · CPCA · Nilearn · MATLAB · Aug 2024 – Apr 2025</p>
              <div className="entry-body">
                <ul>
                  <li>Processed time-series fMRI data across 246 brain regions and 50 subjects from the HCP dataset.</li>
                  <li>Applied CPCA and QPP detection to surface spatiotemporal connectivity patterns.</li>
                  <li>Showed the CPCA pipeline generalizes across rest, 0-back, and 2-back task conditions.</li>
                </ul>
              </div>
            </div>

            <div className="case-card">
              <div className="case-head">
                <h3>LiDAR Modality Fusion for Snow-Pole Detection</h3>
                <div className="case-links">
                  <a className="btn btn-ghost" href="https://github.com/AlakhsimarSingh/RangeModalitiesProject" target="_blank" rel="noopener">GitHub</a>
                </div>
              </div>
              <p className="muted" style={{ marginBottom: 14 }}>Computer vision · YOLOv11 · PCA · Sensor fusion · Under review, MFI 2026</p>
              <div className="entry-body">
                <ul>
                  <li>Evaluated single-modality learning, direct 4-channel input, and multiple fusion strategies for LiDAR-based snow-pole detection on a Nordic winter dataset.</li>
                  <li>Proposed Quad-Modal PCA Fusion (QM-PCA), reaching 91.0 mAP50, and LDA-Guided PCA Fusion improving localization precision to 45.0 mAP50-95.</li>
                  <li>Foreground-biased PCA analysis showed range contributes under 2% of pole-discriminative variance versus intensity-based channels.</li>
                </ul>
              </div>
            </div>
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
