import styles from "./Footer.module.css";

interface FooterProps {
  hours?: { day: string; time: string }[];
}

const DEFAULT_HOURS = [
  { day: "Tue – Fri:", time: "9am – 5pm" },
  { day: "Saturday:", time: "9am – 2pm" },
  { day: "Sun – Mon:", time: "Closed" },
];

export default function Footer({ hours = DEFAULT_HOURS }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.mark}>Bear Cave Barbershop</div>
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
