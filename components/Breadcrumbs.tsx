import Link from "next/link";
import { breadcrumbSchema, jsonLdScript } from "@/lib/schema";

export default function Breadcrumbs({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbSchema(trail))}
      />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {trail.map((item, i) => (
            <li key={item.path}>
              {i < trail.length - 1 ? (
                <Link href={item.path}>{item.name}</Link>
              ) : (
                <span aria-current="page">{item.name}</span>
              )}
              {i < trail.length - 1 && <span className="crumb-sep"> / </span>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
