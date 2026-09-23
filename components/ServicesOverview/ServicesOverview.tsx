"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ServiceListItem from "@/components/ServiceListItem";
import styles from "./ServicesOverview.module.css";

interface Service {
  name: string;
  price: string;
  description?: string;
}

interface ServicesOverviewProps {
  id?: string;
  eyebrow?: string;
  headlineLines?: string[];
  subtext?: string[];
  menuHeading?: string;
  menuIntro?: string;
  services?: Service[];
}

const DEFAULT_HEADLINE_LINES = [
  "Good Cuts.",
  "Good People.",
  "No Fuss.",
];

const DEFAULT_SUBTEXT = [
  "Step into the Bear Cave - Cooroy’s local barbershop for quality cuts, traditional barbering and a relaxed, friendly atmosphere.",
  "We believe a trip to the barber should be more than just getting your hair cut. It’s a chance to sit down, switch off, have a laugh and walk out feeling fresh.",
  "From classic men’s cuts and modern fades to clipper cuts, beard trims and traditional cut-throat shaves, we combine experience with attention to detail to make sure you leave looking your best.",
  "And because we like to keep things simple:",
  "No appointments. No complicated booking system. Just walk in, take a seat and wait for your turn.",
  "Whether you’ve been coming to us for years or you’re walking through the door for the first time, you’re always welcome in the Bear Cave.",
  "Walk in scruffy. Walk out sharp.",
];

const DEFAULT_SERVICES: Service[] = [
  {
    name: "Standard Cut",
    price: "$50",
    description:
      "A classic men’s haircut, professionally cut, styled and finished.",
  },
  {
    name: "Men’s Fade",
    price: "$50–$60",
    description:
      "From classic fades to more detailed skin fades. Pricing varies depending on the style, hair and time required to achieve the finished look.",
  },
  {
    name: "High School Cut / Fade",
    price: "$45–$55",
    description:
      "Quality cuts and fades for high school students, with pricing depending on the style and level of detail required.",
  },
  {
    name: "Kids Cut / Fade",
    price: "$45–$50",
    description:
      "Haircuts and fades for younger clients. Pricing varies according to the style and time required.",
  },
  {
    name: "Restyle",
    price: "From $50",
    description:
      "Ready for a change? Restyles are priced from $50 depending on hair length, the existing style and the work required to create your new look.",
  },
  {
    name: "Clipper Cut",
    price: "$30–$35",
    description:
      "A clean, professional clipper cut with finishing and detailing. Price varies depending on the cut required.",
  },
  {
    name: "Beard Trim",
    price: "$30–$40",
    description:
      "Professional beard trimming, shaping and detailing for a clean, balanced finish.",
  },
  {
    name: "Beard Trim with Shave",
    price: "$40",
    description:
      "Beard shaping and trimming combined with razor detailing for a sharper finish.",
  },
  {
    name: "Hot Towel Face Shave",
    price: "$50",
    description:
      "The traditional barbershop experience. Hot towel preparation followed by a professional shave for a clean, smooth finish.",
  },
  {
    name: "Nose / Ear Wax",
    price: "$25",
    description: "Quick and effective grooming for unwanted nose and ear hair.",
  },
];

const lineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ServicesOverview({
  id,
  eyebrow = "What Bear Cave Barber's are all about",
  headlineLines = DEFAULT_HEADLINE_LINES,
  subtext = DEFAULT_SUBTEXT,
  menuHeading = "Bear Cave Barber Menu",
  menuIntro = "At Bear Cave Barbershop Cooroy, every service is tailored to the person sitting in the chair. From a straightforward tidy-up to a complete restyle, fade or traditional shave, we take the time needed to get the job done properly.",
  services = DEFAULT_SERVICES,
}: ServicesOverviewProps) {
  const [expanded, setExpanded] = useState(false);
  const [firstParagraph, ...restParagraphs] = subtext;

  return (
    <section id={id} className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <motion.div
            className={styles.headline}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {headlineLines.map((line) => (
              <motion.span
                key={line}
                className={styles.headlineLine}
                variants={lineVariants}
              >
                {line}
              </motion.span>
            ))}
          </motion.div>
          <div className={styles.subtext}>
            <p
              className={[styles.firstParagraph, expanded ? styles.expanded : ""]
                .filter(Boolean)
                .join(" ")}
            >
              {firstParagraph}
            </p>
            <div
              className={[
                styles.restParagraphs,
                expanded ? styles.expanded : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {restParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <button
              type="button"
              className={styles.seeMoreButton}
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
            >
              {expanded ? "See less" : "See more..."}
            </button>
          </div>
        </div>

        <div className={styles.right}>
          <h2 className={styles.menuHeading}>{menuHeading}</h2>
          <p className={styles.menuIntro}>{menuIntro}</p>
          <ul className={styles.list}>
            {services.map((service) => (
              <ServiceListItem
                key={service.name}
                name={service.name}
                price={service.price}
                description={service.description}
                theme="dark"
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
