/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Only production builds redirect. Preview/branch deployments (also on
    // *.vercel.app) build with VERCEL_ENV=preview, and local dev has no
    // VERCEL_ENV, so both are left alone.
    if (process.env.VERCEL_ENV !== "production") return [];

    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        destination: "https://www.bearcavecooroy.com/:path*",
        permanent: true, // 308
      },
    ];
  },
};

export default nextConfig;
