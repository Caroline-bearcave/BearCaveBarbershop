import type { MetadataRoute } from "next";

// The whole site is public-facing, so crawling is allowed everywhere with
// no disallowed paths. No sitemap reference yet — the production domain
// isn't finalized, and pointing this at a placeholder URL would be worse
// than omitting it. Add one once a domain is confirmed and app/sitemap.ts
// exists.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
