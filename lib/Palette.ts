import { PERSON } from "@/lib/site";

export type PaletteItem = {
  id: string;
  label: string;
  group: string;
  href: string; // "/path", "/path#hash", "https://…" or "mailto:…"
  keywords?: string; // extra words the search should match
  hint?: string; // small right-aligned text
};

// Keep items ordered by group: the palette lists groups in the order they first appear here.
export const PALETTE_ITEMS: PaletteItem[] = [
  // ---- Pages ----
  { id: "home", label: "Home", group: "Pages", href: "/", keywords: "hub landing" },
  { id: "tech", label: "Tech — Software Engineering", group: "Pages", href: "/tech", keywords: "optum experience skills" },
  { id: "research", label: "Research — Machine Learning & Brain Dynamics", group: "Pages", href: "/research", keywords: "papers publications fmri neuroscience" },
  { id: "freelance", label: "Freelance — Full-Stack Client Work", group: "Pages", href: "/freelance", keywords: "clients web development" },
  { id: "design", label: "Design — Editing & Graphic Design", group: "Pages", href: "/design", keywords: "video editing graphics" },

  // ---- Projects ----
  { id: "maan", label: "Maan Travels — case study", group: "Projects", href: "/freelance#maan-travels", keywords: "chauffeur booking lighthouse auth", hint: "Freelance" },
  { id: "numen", label: "NUMEN — case study", group: "Projects", href: "/freelance#numen", keywords: "ecommerce streetwear razorpay store", hint: "Freelance" },
  { id: "smart-notes", label: "Smart Notes Platform", group: "Projects", href: "/tech", keywords: "rag yjs knowledge graph ai notes", hint: "Tech" },
  { id: "demos", label: "Demo builds", group: "Projects", href: "/freelance#demos", keywords: "previews concept sites", hint: "Freelance" },

  // ---- Live sites ----
  { id: "live-maan", label: "Maan Travels — live site", group: "Live sites", href: "https://www.maantravels.com", hint: "↗" },
  { id: "live-numen", label: "NUMEN — live store", group: "Live sites", href: "https://www.invitedsonly.com", hint: "↗" },
  { id: "demo-ironroute", label: "IronRoute Exports — demo", group: "Live sites", href: "https://tools-export-eight.vercel.app/", keywords: "export spare parts", hint: "↗" },
  { id: "demo-meridian", label: "Meridian Industrial Exports — demo", group: "Live sites", href: "https://demo1-meridian.vercel.app/", keywords: "export industrial", hint: "↗" },
  { id: "demo-platform", label: "Global Export Sales Platform — demo", group: "Live sites", href: "https://premium-export-six.vercel.app", keywords: "rfq b2b catalog", hint: "↗" },
  { id: "demo-boothill", label: "Boothill Arms Co. — demo", group: "Live sites", href: "https://boothill-arms-co-five.vercel.app/", keywords: "ecommerce store", hint: "↗" },

  // ---- Papers ----
  // Add one entry per paper so people can jump straight to it.
  {
    id: "paper-visuophysioenet",
    label: "VisuoPhysioENet — Multimodal Engagement Detection",
    group: "Papers",
    href: "https://arxiv.org/pdf/2409.16126",
    keywords: "arxiv engagement e-learning multimodal paper",
    hint: "arXiv ↗",
  },
  // { id: "paper-xyz", label: "Paper title", group: "Papers", href: "https://…", keywords: "venue topic", hint: "NeurIPS ↗" },

  // ---- Links ----
  { id: "email", label: "Email me", group: "Links", href: `mailto:${PERSON.email}`, keywords: "contact hire" },
  { id: "github", label: "GitHub", group: "Links", href: PERSON.github, hint: "↗" },
  { id: "linkedin", label: "LinkedIn", group: "Links", href: PERSON.linkedin, hint: "↗" },
  { id: "leetcode", label: "LeetCode", group: "Links", href: PERSON.leetcode, hint: "↗" },
];
