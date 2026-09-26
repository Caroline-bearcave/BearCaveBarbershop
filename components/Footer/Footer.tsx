import Image from "next/image";
import styles from "./Footer.module.css";

interface FooterProps {
  hours?: { day: string; time: string }[];
}

const DEFAULT_HOURS = [
  { day: "Monday:", time: "9am - 4pm" },
  { day: "Tue-Fri:", time: "9am - 5pm" },
  { day: "Saturday:", time: "9am - 2pm" },
  { day: "Sunday:", time: "Closed" },
];

export default function Footer({ hours = DEFAULT_HOURS }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <Image
            src="/images/footer-logo.webp"
            alt="Bear Cave Barbershop"
            width={1000}
            height={1000}
            className={styles.mark}
          />
          <p className={styles.tagline}>
            A den for a proper cut and shave - old world craft, modern
            comfort.
          </p>
        </div>

        <div>
          <div className={styles.heading}>Hours</div>
          <div className={styles.list}>
            {hours.map((slot) => (
              <span key={slot.day}>
                {slot.day} {slot.time}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className={styles.heading}>Find Us</div>
          <div className={styles.list}>
            <span>1/1a Emerald Street, Cooroy, QLD, Australia</span>
            <a href="tel:+61402826513">0402 826 513</a>
            <a href="mailto:bearcavecooroy@gmail.com">
              bearcavecooroy@gmail.com
            </a>
            <div className={styles.socials}>
            <a
              href="https://www.facebook.com/p/Bear-Cave-Barbershop-Cooroy-61556354075405/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <defs>
                  <clipPath id="footer-fb-clip">
                    <circle cx="12" cy="12" r="12" />
                  </clipPath>
                </defs>
                <g clipPath="url(#footer-fb-clip)">
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
              className={styles.socialLink}
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient
                    id="footer-ig-gradient"
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
                  fill="url(#footer-ig-gradient)"
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
        </div>
      </div>

      <div className={styles.bottom}>
        <span>&copy; {new Date().getFullYear()} Bear Cave Barbershop</span>
        <span>
          Made with care by{" "}
          <a href="https://relead.com.au" target="_blank" rel="noopener noreferrer">
            Relead Digital
          </a>
          .
        </span>
      </div>
    </footer>
  );
}
