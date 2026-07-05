import type { Metadata } from "next";
import { SITE_URL, PERSON, IMAGES } from "@/lib/site";
import { personSchema, websiteSchema, jsonLdScript } from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSON.name} — Software Engineer, ML Researcher & Full-Stack Developer`,
    template: `%s — ${PERSON.name}`,
  },
  description:
    "Portfolio of Alakhsimar Singh: software engineer, machine learning researcher in neuroimaging and computer vision, freelance full-stack developer, and graphic designer.",
  keywords: [
    "Alakhsimar Singh",
    "Software Engineer",
    "Machine Learning",
    "Machine Learning Researcher",
    "fMRI Research",
    "Full-Stack Developer",
    "NIT Jalandhar",
    "Next.js Developer",
    "Freelance Web Developer",
  ],
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${PERSON.name} — Portfolio`,
    title: `${PERSON.name} — Software Engineer, ML Researcher & Full-Stack Developer`,
    description:
      "Software engineering, machine learning research, freelance full-stack development, and design — one portfolio, four lenses.",
    locale: "en_US",
    images: [{ url: IMAGES.ogImage, width: 1200, height: 630, alt: PERSON.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSON.name} — Portfolio`,
    description:
      "Software engineer, machine learning researcher, freelance full-stack developer, and designer.",
    images: [IMAGES.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: "3CkpEwLwkQMUw86lrLkLPo55DPfKFZrCI1HhtIVYgfg",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(personSchema())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteSchema())}
        />
        {children}
      </body>
    </html>
  );
}