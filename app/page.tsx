"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import HeroScrollScrubber from "@/components/HeroScrollScrubber";
import ContentSection from "@/components/ContentSection";
import ServicesOverview from "@/components/ServicesOverview";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

// Spans control each tile's footprint in the bento grid, in source order.
const GALLERY_SPANS = [
  "large",
  "normal",
  "normal",
  "wide",
  "normal",
  "tall",
  "normal",
  "normal",
] as const;

const ADDRESS = "1/1a Emerald Street, Cooroy, QLD, Australia";
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`;

export default function Home() {
  const [heroComplete, setHeroComplete] = useState(false);

  return (
    <>
      <Nav visible={heroComplete} />

      <main id="top">
        <HeroScrollScrubber onSequenceEnd={() => setHeroComplete(true)} />

        <ServicesOverview id="services" />

        <section id="Bear Cave gallery" className={styles.gallerySection}>
          <h2 className={styles.sectionHeading}>Bear Cave Gallery</h2>
          <p className={styles.sectionIntro}>
            A look inside the den. Photos coming soon.
          </p>
          <div className={styles.galleryGrid}>
            {GALLERY_SPANS.map((span, i) => (
              <div
                key={i}
                className={[styles.galleryItem, styles[span]]
                  .filter(Boolean)
                  .join(" ")}
              >
                Image {i + 1}
              </div>
            ))}
          </div>
        </section>

        <ContentSection
          id="contact"
          direction="up"
          variant="panel"
          className={styles.contactPanel}
        >
          <h2 className={styles.sectionHeading}>Visit the Den</h2>
          <div className={styles.contactLayout}>
            <div className={styles.contactHours}>
              <span>{ADDRESS}</span>
              <span>0402 826 513</span>
              <span>Tue – Sat: 9am – 5pm</span>
              <span>Sunday &amp; Monday: Closed</span>
            </div>
            <div className={styles.contactMap}>
              <iframe
                src={MAP_SRC}
                title="Bear Cave Barbershop location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </ContentSection>
      </main>

      <Footer />
    </>
  );
}
