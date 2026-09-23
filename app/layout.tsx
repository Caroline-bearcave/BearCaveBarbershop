import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bear Cave Barbershop — Cooroy",
  description:
    "A den for a proper cut and shave in Cooroy. Bear Cave Barbershop — old-world craft, modern comfort.",
};

// Values match what's already hardcoded in Footer.tsx / app/page.tsx exactly.
// `url` is intentionally omitted — no production domain exists yet. Add one
// (and ideally an `@id` matching it) once the site is deployed.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Bear Cave Barbershop",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1/1a Emerald Street",
    addressLocality: "Cooroy",
    addressRegion: "QLD",
    postalCode: "4563",
    addressCountry: "AU",
  },
  telephone: "+61402826513",
  openingHours: ["Tu-Fr 09:00-17:00", "Sa 09:00-14:00"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
