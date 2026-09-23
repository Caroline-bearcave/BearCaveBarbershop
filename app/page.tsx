"use client";

import { useEffect, useState } from "react";
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
  "normal",
  "normal",
  "normal",
] as const;

// Maps gallery position (1-indexed) to a source image in /public/images.
const GALLERY_IMAGES: Record<number, string> = {
  1: "/images/1.webp",
  2: "/images/2.webp",
  3: "/images/5.webp",
  4: "/images/10.webp",
  5: "/images/8.webp",
  6: "/images/12.webp",
  7: "/images/9.webp",
  8: "/images/13.webp",
  9: "/images/hero-poster.webp",
  10: "/images/6.webp",
  11: "/images/about-portrait.webp",
};

// Per-tile background-position override (defaults to the CSS class's
// "center" otherwise) — only needed where the default crop hides the
// interesting part of the image.
const GALLERY_IMAGE_POSITION: Record<number, string> = {
  11: "center top",
};

const ADDRESS = "1/1a Emerald Street, Cooroy, QLD, Australia";
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`;

// Module-scoped (not sessionStorage/localStorage) so it resets on every real
// page load — a hard refresh or fresh visit still replays the intro — but
// survives client-side route changes within the same loaded app instance, so
// navigating Home -> About -> Home again doesn't replay it. Only ever
// written from onSequenceEnd below (never during render/SSR), so
// double-invoked renders/effects just read it twice harmlessly instead of
// corrupting each other.
let heroSeenThisLoad = false;

export default function Home() {
  const [heroComplete, setHeroComplete] = useState(false);
  // Resolved fresh on every mount of this component (i.e. every navigation
  // to "/"): true once the intro has actually completed this page load.
  const [skipIntro, setSkipIntro] = useState(heroSeenThisLoad);

  // Scrolling is never blocked during the intro, so this is just a nicety:
  // a hard refresh (or a deep link) can land the browser already scrolled
  // away from the top via native scroll restoration, in which case there's
  // no point autoplaying/loading the intro video off-screen — skip straight
  // to the finished state. Mobile Safari frequently applies its scroll
  // restoration *after* first paint, so a single synchronous check at mount
  // would miss it; poll across a few frames instead.
  useEffect(() => {
    if (skipIntro) return;
    let cancelled = false;
    let frame = 0;

    const check = () => {
      if (cancelled) return;
      if (window.scrollY > 0) {
        setSkipIntro(true);
        return;
      }
      frame += 1;
      if (frame < 10) requestAnimationFrame(check);
    };

    const raf = requestAnimationFrame(check);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [skipIntro]);

  return (
    <>
      <Nav visible={heroComplete} />

      <main id="top">
        <HeroScrollScrubber
          skipIntro={skipIntro}
          onSequenceEnd={() => {
            heroSeenThisLoad = true;
            setHeroComplete(true);
          }}
        />

        <ServicesOverview id="services" />

        <section id="gallery" className={styles.gallerySection}>
          <h2 className={styles.sectionHeading}>Bear Cave Gallery</h2>
          <p className={styles.sectionIntro}>
            A look inside the den.
          </p>
          <div className={styles.galleryGrid}>
            {GALLERY_SPANS.map((span, i) => {
              const position = i + 1;
              const image = GALLERY_IMAGES[position];
              return (
                <div
                  key={i}
                  className={[styles.galleryItem, styles[span]]
                    .filter(Boolean)
                    .join(" ")}
                  style={
                    image
                      ? {
                          backgroundImage: `url(${image})`,
                          backgroundPosition: GALLERY_IMAGE_POSITION[position],
                        }
                      : undefined
                  }
                >
                  {!image && `Image ${position}`}
                </div>
              );
            })}
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
              <a href="tel:+61402826513">0402 826 513</a>
              <span>Tue-Fri: 9am – 5pm</span>
              <span>Saturday: 9am – 2pm</span>
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
