// Single source of truth for identity, links, and site-wide constants.
// Update SITE_URL once a real domain is chosen — every canonical URL,
// sitemap entry, and JSON-LD @id derives from it.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alakhsimarsingh.com";

export const PERSON = {
  name: "Alakhsimar Singh",
  shortName: "A. Singh",
  email: "alakh124@gmail.com",
  phone: "+919501038811",
  location: "Jalandhar, Punjab, India",
  jobTitles: [
    "Software Engineer",
    "Machine Learning Researcher",
    "Full-Stack Freelance Developer",
    "Graphic Designer",
  ],
  alumniOf: "Dr. B. R. Ambedkar National Institute of Technology, Jalandhar",
  sameAs: [
    "https://github.com/AlakhsimarSingh",
    "https://www.linkedin.com/in/alakhsimar/",
    "https://leetcode.com/u/Alakhsimar_singh/",
  ],
  github: "https://github.com/AlakhsimarSingh",
  linkedin: "https://www.linkedin.com/in/alakhsimar/",
  leetcode: "https://leetcode.com/u/Alakhsimar_singh/",
};

export const IMAGES = {
  profile: "/images/profile.jpg",
  profileSquare: "/images/profile-square.jpg",
  ogImage: "/og-image.jpg",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tech", label: "Tech" },
  { href: "/research", label: "Research" },
  { href: "/freelance", label: "Freelance" },
  { href: "/design", label: "Design" },
];

export const LENS_ACCENT: Record<string, string> = {
  hub: "#E8A33D",
  tech: "#E8A33D",
  research: "#5FD4D0",
  freelance: "#8FCB7E",
  design: "#E17FA8",
};
