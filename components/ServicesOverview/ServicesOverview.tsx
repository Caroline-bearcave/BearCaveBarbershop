"use client";

import { motion } from "framer-motion";
import ServiceListItem from "@/components/ServiceListItem";
import styles from "./ServicesOverview.module.css";

interface Service {
  name: string;
  price: string;
}

interface ServicesOverviewProps {
  id?: string;
  eyebrow?: string;
  headlineLines?: string[];
  subtext?: string;
  menuHeading?: string;
  menuIntro?: string;
  services?: Service[];
}

const DEFAULT_HEADLINE_LINES = [
  "Barbering",
  "Grooming & Shaves",
  "Beard Care & Trim",
];

const DEFAULT_SERVICES: Service[] = [
  { name: "Haircut", price: "From $28" },
  { name: "Fade", price: "From $32" },
  { name: "Scissor Cut", price: "From $35" },
  { name: "Restyle", price: "From $45" },
  { name: "Beard Shape", price: "From $18" },
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
  subtext = "At Bear Cave Barber, a haircut isn't a service - it's an experience.",
  menuHeading = "Bear Cave Barber Menu",
  menuIntro = "At Bear Cave Barber we take pride in every service - where every seat gets the full treatment.",
  services = DEFAULT_SERVICES,
}: ServicesOverviewProps) {
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
          <p className={styles.subtext}>{subtext}</p>
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
                theme="dark"
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
