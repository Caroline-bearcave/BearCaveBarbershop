import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import ContentSection from "@/components/ContentSection";
import Footer from "@/components/Footer";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About | Bear Cave Barbershop — Cooroy",
  description:
    "The story behind Bear Cave Barbershop — Cooroy's local den for quality cuts and traditional barbering.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />

      <main id="top">
        <section className={styles.hero}>
          <p className={styles.eyebrow}>About Bear Cave Barbershop</p>
          <h1 className={styles.headline}>Great Barbering without the attitude.</h1>
          <div className={styles.heroCard}>
            <p>
              With more than 26 years of experience in the hair and barbering industry, Caroline brings decades of knowledge, skill and old-school customer service to the chair.
            </p>
          </div>
        </section>

        <ContentSection direction="left" variant="plain">
          <div className={styles.storyRow}>
            <div className={styles.storyText}>
              <h2 className={styles.sectionHeading}>The Beginning</h2>
              <p className={styles.paragraph}>
                The Bear Cave has grown into a genuine local barbershop where our customers aren’t treated like numbers. We get to know the people who walk through our doors, remember how they like their hair and enjoy the conversations and laughs that come with being part of a small community.
              </p>
              <p className={styles.paragraph}>
                Caroline has also passed that experience on to Judith, who trained at the Bear Cave and has become a talented barber in her own right - with plenty of regulars now asking for her by name.
              </p>
            </div>
            <div className={styles.storyImage}>
              <Image
                src="/images/about-portrait.webp"
                alt="Judith and Caroline, barbers at Bear Cave Barbershop, standing together in the shop"
                fill
                sizes="(min-width: 700px) 50vw, 100vw"
                className={styles.storyImagePicture}
                style={{ objectPosition: "center top" }}
              />
            </div>
          </div>
        </ContentSection>

        <ContentSection
          direction="left"
          variant="panel"
          className={styles.craftPanel}
        >
          <div className={styles.storyRow}>
            <div
              className={[styles.storyImage, styles.craftImage].join(" ")}
              style={{ aspectRatio: "1086 / 1448" }}
            >
              <Image
                src="/images/7-about.webp"
                alt="Barber combing a client's hair during a haircut at Bear Cave Barbershop"
                fill
                sizes="(min-width: 700px) 32vw, 80vw"
                className={styles.storyImagePicture}
                style={{ objectPosition: "center" }}
              />
            </div>
            <div className={styles.storyText}>
              <h2 className={styles.sectionHeadingDark}>The Craft</h2>
              <p className={styles.paragraphDark}>
                At Bear Cave Barbershop, every cut is built on classic technique - the kind that doesn’t go out of style. Our barbers train in traditional skills first: precision fades, clean lines, and straight-razor finishes, sharpened by years behind the chair.
              </p>
              <p className={styles.paragraphDark}>
                Every visit comes with a hot towel, we don’t rush, and we don’t cut corners. From the first consultation to the final trim, it’s about getting the details right - because a great haircut isn’t just seen, it’s felt.
              </p>
            </div>
          </div>
        </ContentSection>

        <section className={styles.quoteSection}>
          <div className={styles.quoteCard}>
            <p className={styles.quoteText}>
              “A trip to the barber should be more than just getting your hair cut. It’s a chance to sit down, switch off, have a laugh and walk out feeling fresh.”
            </p>
            <p className={styles.quoteAttribution}>Caroline Trottemant / Owner</p>
          </div>
        </section>

        <ContentSection
          direction="left"
          variant="panel"
          className={styles.ctaPanel}
        >
          <div className={styles.storyRow}>
            <div className={styles.storyText}>
              <h2 className={styles.sectionHeadingDark}>
                Come Meet Us... and Snoopy
              </h2>
              <p className={styles.paragraphDark}>
                We take our work seriously, but we don’t take ourselves too seriously.
                There’s no pretentious stuff here. Just experienced barbers, sharp scissors, good conversation and a welcoming place to get a great haircut.
                And of course there’s <strong>Snoopy</strong> - our four-legged Bear Cave mascot and a familiar face to many of our customers.
              </p>
            </div>
            <div className={styles.storyImage}>
              <Image
                src="/images/snoopy.webp"
                alt="Snoopy, the Bear Cave Barbershop mascot dog, looking at the camera"
                fill
                sizes="(min-width: 700px) 50vw, 100vw"
                className={styles.storyImagePicture}
                style={{ objectPosition: "center 20%" }}
              />
            </div>
          </div>
        </ContentSection>
      </main>

      <Footer />
    </>
  );
}
