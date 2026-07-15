"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import styles from "./ContentSection.module.css";

type Direction = "up" | "left" | "right";
type Variant = "panel" | "plain";

interface ContentSectionProps {
  children: ReactNode;
  direction?: Direction;
  variant?: Variant;
  id?: string;
  className?: string;
  animate?: boolean;
}

const HIDDEN_OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 48 },
  left: { x: -48 },
  right: { x: 48 },
};

export default function ContentSection({
  children,
  direction = "up",
  variant = "plain",
  id,
  className,
  animate = true,
}: ContentSectionProps) {
  const innerClassName = [styles.inner, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  if (!animate) {
    return (
      <section id={id} className={styles.section}>
        <div className={innerClassName}>{children}</div>
      </section>
    );
  }

  const hidden = { opacity: 0, ...HIDDEN_OFFSET[direction] };

  return (
    <section id={id} className={styles.section}>
      <motion.div
        className={innerClassName}
        initial={hidden}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
