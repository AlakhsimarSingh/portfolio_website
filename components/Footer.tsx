import { PERSON } from "@/lib/site";

export default function Footer({ note }: { note: string }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <p className="footer-note">{note}</p>
          <div className="footer-links">
            <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
            <a href={PERSON.github} target="_blank" rel="noopener">
              GitHub
            </a>
            <a href={PERSON.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
