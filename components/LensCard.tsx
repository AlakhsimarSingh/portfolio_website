import Link from "next/link";

export default function LensCard({
  lens,
  href,
  label,
  title,
  description,
  tracePath,
}: {
  lens: string;
  href: string;
  label: string;
  title: string;
  description: string;
  tracePath: string;
}) {
  return (
    <Link className="lens-card in-view" data-lens={lens} href={href}>
      <svg className="lens-trace" viewBox="0 0 400 64" preserveAspectRatio="none" aria-hidden="true">
        <path d={tracePath} />
      </svg>
      <div>
        <div className="lens-label">{label}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="lens-arrow">View profile →</div>
    </Link>
  );
}
