"use client";

import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

interface NavLink {
  label: string;
  href: string;
}

interface NavProps {
  visible?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Nav({ visible = true }: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={[
          styles.nav,
          visible ? "" : styles.navHidden,
          scrolled ? styles.navScrolled : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!visible}
      >
        <span className={styles.hours}>
          Open Tuesday – Saturday, 9AM – 5PM
        </span>

        <button
          type="button"
          className={styles.toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={styles.hamburger} data-open={open}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>

      {open && visible && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                const id = link.href.slice(1);
                requestAnimationFrame(() => {
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                });
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
