import { existsSync } from "fs";
import path from "path";

// Server-only: true when `href` (e.g. "/cv.pdf") exists under /public.
// Pages are static, so this is evaluated once at build time.
export function hasPublicFile(href: string) {
  return existsSync(path.join(process.cwd(), "public", href));
}
