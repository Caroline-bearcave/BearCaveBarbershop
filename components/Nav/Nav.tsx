"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

interface NavLink {
  label: string;
  href: string;
}

interface NavProps {
  visible?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Nav({ visible = true }: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
          Tue – Fri: 9AM – 5PM · Sat: 9AM – 2PM
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
          {NAV_LINKS.map((link) => {
            // Hash links (Services/Gallery/Contact) are sections of the home
            // page rather than distinct routes, so only Home/About can be
            // matched against the current pathname.
            const isActive = !link.href.startsWith("#") && link.href === pathname;
            const linkClassName = [
              styles.mobileLink,
              isActive ? styles.mobileLinkActive : "",
            ]
              .filter(Boolean)
              .join(" ");

            return link.href.startsWith("#") ? (
              isHome ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={linkClassName}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    const id = link.href.slice(1);
                    requestAnimationFrame(() => {
                      document
                        .getElementById(id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    });
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={`/${link.href}`}
                  className={linkClassName}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={linkClassName}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
