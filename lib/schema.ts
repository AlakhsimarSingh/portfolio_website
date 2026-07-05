import { PERSON, SITE_URL } from "./site";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: PERSON.name,
    url: SITE_URL,
    email: `mailto:${PERSON.email}`,
    jobTitle: PERSON.jobTitles,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jalandhar",
      addressRegion: "Punjab",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: PERSON.alumniOf,
    },
    knowsAbout: [
      "Software Engineering",
      "Machine Learning",
      "Deep Learning",
      "Neuroimaging",
      "Full-Stack Web Development",
      "Computer Vision",
      "Graphic Design",
    ],
    sameAs: PERSON.sameAs,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${PERSON.name} — Portfolio`,
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function scholarlyArticleSchema(article: {
  name: string;
  authors: string[];
  description: string;
  url: string;
  status: string;
  about?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: article.name,
    author: article.authors.map((a) => ({ "@type": "Person", name: a })),
    description: article.description,
    url: article.url,
    creativeWorkStatus: article.status,
    about: article.about,
  };
}

export function softwareProjectSchema(project: {
  name: string;
  description: string;
  codeRepository: string;
  programmingLanguages: string[];
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    codeRepository: project.codeRepository,
    programmingLanguage: project.programmingLanguages,
    url: project.url || project.codeRepository,
    author: { "@id": `${SITE_URL}/#person` },
  };
}

/** Renders any JSON-LD object as a script tag string-safe for dangerouslySetInnerHTML */
export function jsonLdScript(data: object) {
  return { __html: JSON.stringify(data) };
}
