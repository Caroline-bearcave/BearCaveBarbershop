"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import styles from "./IconFeatureStrip.module.css";

interface Feature {
  icon: ReactNode;
  label: string;
}

interface IconFeatureStripProps {
  revealed?: boolean;
  features?: Feature[];
}

const iconProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const HaircutIcon = () => (
  <svg {...iconProps} className={styles.icon} aria-hidden="true">
    <rect x="4" y="4" width="16" height="3" rx="1" />
    <line x1="6" y1="7" x2="6" y2="13" />
    <line x1="9.3" y1="7" x2="9.3" y2="15.5" />
    <line x1="12.7" y1="7" x2="12.7" y2="13" />
    <line x1="16" y1="7" x2="16" y2="15.5" />
  </svg>
);

const BeardStyleIcon = () => (
  <svg {...iconProps} className={styles.icon} aria-hidden="true">
    <path d="M8 4c-2 0-3.5 1.6-3.5 4 0 3 1 6 2 8.5.6 1.5 2 2.5 3.5 2.5s2.9-1 3.5-2.5c1-2.5 2-5.5 2-8.5 0-2.4-1.5-4-3.5-4" />
    <path d="M8 8.5c1.3-.7 2.7-.7 4 0" />
    <path d="M8.5 12c1-.5 2-.5 3 0" />
  </svg>
);

const BeardTrimIcon = () => (
  <svg {...iconProps} className={styles.icon} aria-hidden="true">
    <circle cx="6.5" cy="6.5" r="2.2" />
    <circle cx="6.5" cy="17.5" r="2.2" />
    <line x1="8.2" y1="8" x2="20" y2="17.5" />
    <line x1="8.2" y1="16" x2="20" y2="6.5" />
  </svg>
);

const ClipperIcon = () => (
  <svg {...iconProps} className={styles.icon} aria-hidden="true">
    <rect x="7" y="3" width="10" height="7" rx="1.5" />
    <path d="M9 10v9a3 3 0 0 0 6 0v-9" />
    <line x1="10" y1="5.5" x2="14" y2="5.5" />
    <line x1="10" y1="7.5" x2="14" y2="7.5" />
  </svg>
);

const FadesIcon = () => (
  <svg {...iconProps} className={styles.icon} aria-hidden="true">
    <line x1="5" y1="19" x2="5" y2="13" />
    <line x1="10.3" y1="19" x2="10.3" y2="9" />
    <line x1="15.6" y1="19" x2="15.6" y2="6" />
    <line x1="19" y1="19" x2="19" y2="4" />
  </svg>
);

const DEFAULT_FEATURES: Feature[] = [
  { icon: <HaircutIcon />, label: "Haircut" },
  { icon: <BeardStyleIcon />, label: "Beard Style" },
  { icon: <BeardTrimIcon />, label: "Beard Trim" },
  { icon: <ClipperIcon />, label: "Clipper Cut" },
  { icon: <FadesIcon />, label: "Fades" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function IconFeatureStrip({
  revealed = false,
  features = DEFAULT_FEATURES,
}: IconFeatureStripProps) {
  return (
    <motion.div
      className={styles.pill}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
      }
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={styles.strip}
        initial="hidden"
        animate={revealed ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
        }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.label}
            className={styles.item}
            variants={itemVariants}
          >
            {feature.icon}
            <span className={styles.label}>{feature.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
