export type PublicationStatus = "published" | "accepted" | "review";
export type Topic = "Neuroimaging" | "Computer Vision" | "Multimodal";

export type Publication = {
  year: string;
  status: PublicationStatus;
  venue: string;
  title: string;
  authors: string;
  summary: string | null;
  link: string | null;
  linkLabel: string | null;
  topics: Topic[];
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
    year: "2026",
    status: "review",
    venue: "PLOS Biology · Preprint",
    title:
      "Machine Learning-Based Classification of Jhana Advanced Concentrative Absorption Meditation (ACAM-J) using 7T fMRI",
    authors: "Kumar, P., Yang, W. F. Z., Singh, A., Li, X., Sacchet, M. D.",
    summary:
      "Uses fMRI-derived regional homogeneity and ensemble machine learning classifiers to distinguish advanced Jhana meditation states from control conditions, reaching 66.82% accuracy with prefrontal and anterior cingulate regions driving model decisions.",
    link: "https://meditation.mgh.harvard.edu/files/Kumar_26_arXiv.pdf",
    linkLabel: "Preprint",
    topics: ["Neuroimaging"],
  },
  {
    year: "2026",
    status: "accepted",
    venue: "ICECER 2026 · Istanbul, Türkiye · 3–5 Dec 2026",
    title:
      "On the Role of Range in LiDAR-Based Snow-Pole Detection: A Principled Study of Modality Fusion",
    authors: "Tiwari, S., Singh, A., Rafiq, M. I., Singh, N., Seipel, S., Bavirisetti, D. P.",
    summary:
      "Asks whether LiDAR range actually helps detect snow poles. Compares reflectivity, signal, NearIR and range across several fusion and deep learning strategies, including Quad-Modal PCA Fusion at 91.0 mAP50. Range contributes under 2% of the discriminative variance, so more modalities do not necessarily mean more useful information and range needs more geometry-aware treatment.",
    link: "https://github.com/AlakhsimarSingh/RangeModalitiesProject",
    linkLabel: "Code & docs",
    topics: ["Computer Vision", "Multimodal"],
  },
  {
    year: "2025",
    status: "accepted",
    venue: "CNS 2025 (OCNS) · Conference poster · Florence, Italy",
    title:
      "Network vs ROI Perspectives: Brain Connectivity Analysis using Complex Principal Component Analysis",
    authors: "Kumar, P., Singh, A., Li, X., Keilholz, S., Schumacher, E. H.",
    summary:
      "Accepted at the 34th Annual Computational Neuroscience Meeting; compares network-level and region-of-interest perspectives on brain connectivity using CPCA.",
    link: null,
    linkLabel: null,
    topics: ["Neuroimaging"],
  },
  {
    year: "2025",
    status: "review",
    venue: "Elsevier journal · Submitted",
    title: "Visual Physiological Engagement Detection Network",
    authors: "Singh, A., Goyal, K., Verma, N., Kumar, P., Li, X., Singh, A.",
    summary: null,
    link: null,
    linkLabel: null,
    topics: ["Computer Vision", "Multimodal"],
  },
  {
    year: "2024",
    status: "published",
    venue: "Book chapter",
    title: "Multimodal Engagement Detection Systems and the Unseen Threat to Learner Privacy",
    authors: "Singh, A., Verma, N., Goyal, K., Kumar, P., Li, X., Singh, A.",
    summary: 'Published in "The Dark Side of AI: Privacy Invasions and Data Vulnerabilities."',
    link: null,
    linkLabel: null,
    topics: ["Multimodal"],
  },
];