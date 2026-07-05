"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS, LENS_ACCENT, IMAGES } from "@/lib/site";

export default function NavBar({ page = "hub" }: { page?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const accent = LENS_ACCENT[page] || LENS_ACCENT.hub;

  return (
    <nav className="site-nav">
      <div className="container">
        <Link href="/" className="nav-mark" aria-label="Home">
          <Image
            src={IMAGES.profileSquare}
            alt=""
            width={28}
            height={28}
            className="nav-avatar"
            style={{ borderColor: accent }}
            priority
          />
          A. Singh
        </Link>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
        <ul className={`nav-links${open ? " open" : ""}`}>
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={isActive ? "active" : ""}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
