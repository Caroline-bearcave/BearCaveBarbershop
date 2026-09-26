"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

interface NavLink {
  label: string;
  href: string;
  icon: ReactNode;
}

interface NavProps {
  visible?: boolean;
}

const navIconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const HomeIcon = () => (
  <svg {...navIconProps} className={styles.mobileLinkIcon} aria-hidden="true">
    <path d="M4 11.5 12 4l8 7.5" />
    <path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" />
  </svg>
);

const AboutIcon = () => (
  <svg {...navIconProps} className={styles.mobileLinkIcon} aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <line x1="12" y1="11" x2="12" y2="16" />
    <circle cx="12" cy="7.7" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

const ServicesIcon = () => (
  <svg {...navIconProps} className={styles.mobileLinkIcon} aria-hidden="true">
    <circle cx="6.5" cy="6.5" r="2.2" />
    <circle cx="6.5" cy="17.5" r="2.2" />
    <line x1="8.2" y1="8" x2="20" y2="17.5" />
    <line x1="8.2" y1="16" x2="20" y2="6.5" />
  </svg>
);

const GalleryIcon = () => (
  <svg {...navIconProps} className={styles.mobileLinkIcon} aria-hidden="true">
    <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
    <circle cx="8.5" cy="9.5" r="1.6" />
    <path d="M4.5 16.5 9 12l3 3 4-4.5 3.5 4" />
  </svg>
);

const ContactIcon = () => (
  <svg {...navIconProps} className={styles.mobileLinkIcon} aria-hidden="true">
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.3" />
  </svg>
);

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", icon: <HomeIcon /> },
  { label: "About", href: "/about", icon: <AboutIcon /> },
  { label: "Services", href: "#services", icon: <ServicesIcon /> },
  { label: "Gallery", href: "#gallery", icon: <GalleryIcon /> },
  { label: "Contact", href: "#contact", icon: <ContactIcon /> },
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
          <span className={styles.hoursRow}>
            <span className={styles.hoursLine}>Mon: <strong className={styles.hoursTime}>9AM-4PM</strong></span>
            <span className={styles.hoursSeparator}> · </span>
            <span className={styles.hoursLine}>Tue-Fri: <strong className={styles.hoursTime}>9AM-5PM</strong></span>
          </span>
          <span className={[styles.hoursSeparator, styles.hoursBreak].join(" ")}> · </span>
          <span className={styles.hoursLine}>Sat: <strong className={styles.hoursTime}>9AM-2PM</strong></span>
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
                  {link.icon}
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={`/${link.href}`}
                  className={linkClassName}
                  onClick={() => setOpen(false)}
                >
                  {link.icon}
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
                {link.icon}
                {link.label}
              </Link>
            );
          })}

          <div className={styles.mobileSocials}>
            <a
              href="https://www.facebook.com/p/Bear-Cave-Barbershop-Cooroy-61556354075405/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileLink}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className={styles.mobileLinkIcon}
                aria-hidden="true"
              >
                <defs>
                  <clipPath id="nav-fb-clip">
                    <circle cx="12" cy="12" r="12" />
                  </clipPath>
                </defs>
                <g clipPath="url(#nav-fb-clip)">
                  <circle cx="12" cy="12" r="12" fill="#1877F2" />
                  <path
                    fill="#fff"
                    d="M16.67 15.47 17.2 12h-3.33V9.75c0-.95.47-1.88 1.96-1.88h1.51V4.92s-1.37-.23-2.68-.23c-2.74 0-4.53 1.66-4.53 4.67V12H7.04v3.47h3.09V24h3.74v-8.53z"
                  />
                </g>
              </svg>
              Facebook
            </a>
            <a
              href="https://www.instagram.com/bear.cavebarbershopcooroy/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileLink}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className={styles.mobileLinkIcon}
                aria-hidden="true"
              >
                <defs>
                  <radialGradient
                    id="nav-ig-gradient"
                    cx="0.3"
                    cy="1.07"
                    r="1.1"
                  >
                    <stop offset="0" stopColor="#FED576" />
                    <stop offset="0.26" stopColor="#F47133" />
                    <stop offset="0.61" stopColor="#BC3081" />
                    <stop offset="1" stopColor="#4C63D2" />
                  </radialGradient>
                </defs>
                <rect
                  width="24"
                  height="24"
                  rx="6"
                  fill="url(#nav-ig-gradient)"
                />
                <g
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <rect x="5" y="5" width="14" height="14" rx="4" />
                  <circle cx="12" cy="12" r="3.3" />
                </g>
                <circle cx="16.4" cy="7.6" r="1" fill="#fff" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      )}
    </>
  );
}
