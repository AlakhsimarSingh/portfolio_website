export type PublicationStatus = "published" | "accepted" | "review";
export type Topic = "Neuroimaging" | "Computer Vision" | "Multimodal";

export type Publication = {
  id: string; // stable slug, also used as the BibTeX key
  year: string;
  status: PublicationStatus;
  venue: string;
  title: string;
  authors: string[]; // "Last, F." in paper order
  self: number; // index of my name in `authors` (some papers have another A. Singh)
  summary: string | null;
  link: string | null;
  linkLabel: string | null;
  topics: Topic[];
  bibtex: {
    type: "article" | "inproceedings" | "incollection" | "misc";
    fields: Record<string, string>; // extra fields; may override title/author/year
  };
};

// Add a new topic here when you branch into a new area; the filter chips update automatically.
export const TOPICS: Topic[] = ["Neuroimaging", "Computer Vision", "Multimodal"];

export const STATUS_LABEL: Record<PublicationStatus, string> = {
  published: "Published",
  accepted: "Accepted",
  review: "Under review",
};

// Newest first.
export const publications: Publication[] = [
  {
    id: "kumar2026jhana",
    year: "2026",
    status: "review",
    venue: "PLOS Biology · Preprint",
    title:
      "Machine Learning-Based Classification of Jhana Advanced Concentrative Absorption Meditation Using 7 Tesla Functional Magnetic Resonance Imaging",
    authors: ["Kumar, P.", "Yang, W. F. Z.", "Singh, A.", "Li, X.", "Sacchet, M. D."],
    self: 2,
    summary:
      "Uses fMRI-derived regional homogeneity and ensemble machine learning classifiers to distinguish advanced Jhana meditation states from control conditions, reaching 66.82% accuracy with prefrontal and anterior cingulate regions driving model decisions.",
    link: "https://arxiv.org/abs/2602.13008",
    linkLabel: "arXiv preprint",
    topics: ["Neuroimaging"],
    bibtex: {
      type: "misc",
      fields: { eprint: "2602.13008", archivePrefix: "arXiv", note: "Under review at PLOS Biology" },
    },
  },
  {
    id: "tiwari2026range",
    year: "2026",
    status: "accepted",
    venue: "ICECER 2026 · Istanbul, Türkiye · 3–5 Dec 2026",
    title:
      "On the Role of Range in LiDAR-Based Snow-Pole Detection: A Principled Study of Modality Fusion",
    authors: ["Tiwari, S.", "Singh, A.", "Rafiq, M. I.", "Singh, N.", "Seipel, S.", "Bavirisetti, D. P."],
    self: 1,
    summary:
      "Asks whether LiDAR range actually helps detect snow poles. Compares reflectivity, signal, NearIR and range across several fusion and deep learning strategies, including Quad-Modal PCA Fusion at 91.0 mAP50. Range contributes under 2% of the discriminative variance, so more modalities do not necessarily mean more useful information and range needs more geometry-aware treatment.",
    link: "https://github.com/AlakhsimarSingh/RangeModalitiesProject",
    linkLabel: "Code & docs",
    topics: ["Computer Vision", "Multimodal"],
    bibtex: {
      type: "inproceedings",
      fields: { booktitle: "ICECER 2026", address: "Istanbul, Türkiye", note: "Accepted" },
    },
  },
  {
    id: "kumar2025cpca",
    year: "2025",
    status: "accepted",
    venue: "CNS 2025 (OCNS) · Conference poster · Florence, Italy",
    title:
      "Network vs ROI Perspectives: Brain Connectivity Analysis using Complex Principal Component Analysis",
    authors: ["Kumar, P.", "Singh, A.", "Li, X.", "Keilholz, S.", "Schumacher, E. H."],
    self: 1,
    summary:
      "Accepted at the 34th Annual Computational Neuroscience Meeting; compares network-level and region-of-interest perspectives on brain connectivity using CPCA.",
    link: "https://github.com/MIntelligence-Group/DBCATS",
    linkLabel: "Code",
    topics: ["Neuroimaging"],
    bibtex: {
      type: "misc",
      fields: {
        howpublished: "Poster, 34th Annual Computational Neuroscience Meeting (CNS*2025), Florence, Italy",
      },
    },
  },
  {
    id: "singh2024visiophysioenet",
    year: "2025",
    status: "review",
    venue: "Elsevier journal · Submitted · arXiv preprint",
    title: "VisioPhysioENet: Visual Physiological Engagement Detection Network",
    authors: ["Singh, A.", "Goyal, K.", "Verma, N.", "Kumar, P.", "Li, X.", "Singh, A."],
    self: 0,
    summary:
      "Multimodal engagement detection for e-learning that fuses visual cues (eye state, head pose, gaze) with physiological signals extracted from video, reaching 63.02% accuracy on DAiSEE.",
    link: "https://arxiv.org/abs/2409.16126",
    linkLabel: "arXiv preprint",
    topics: ["Computer Vision", "Multimodal"],
    bibtex: {
      type: "misc",
      fields: { year: "2024", eprint: "2409.16126", archivePrefix: "arXiv" },
    },
  },
  {
    id: "singh2024privacy",
    year: "2024",
    status: "published",
    venue: "Book chapter",
    title: "Multimodal Engagement Detection Systems and the Unseen Threat to Learner Privacy",
    authors: ["Singh, A.", "Verma, N.", "Goyal, K.", "Kumar, P.", "Li, X.", "Singh, A."],
    self: 0,
    summary: 'Published in "The Dark Side of AI: Privacy Invasions and Data Vulnerabilities."',
    link: null,
    linkLabel: null,
    topics: ["Multimodal"],
    bibtex: {
      type: "incollection",
      fields: { booktitle: "The Dark Side of AI: Privacy Invasions and Data Vulnerabilities" },
    },
  },
];

export function toBibtex(p: Publication): string {
  const fields: Record<string, string> = {
    title: p.title,
    author: p.authors.join(" and "),
    year: p.year,
    ...p.bibtex.fields,
  };
  const body = Object.entries(fields)
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(",\n");
  return `@${p.bibtex.type}{${p.id},\n${body}\n}`;
}
