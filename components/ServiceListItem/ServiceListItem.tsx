import styles from "./ServiceListItem.module.css";

interface ServiceListItemProps {
  name: string;
  price: string;
  theme?: "light" | "dark";
}

export default function ServiceListItem({
  name,
  price,
  theme = "light",
}: ServiceListItemProps) {
  return (
    <li className={styles.item}>
      <span
        className={[styles.name, theme === "dark" ? styles.nameDark : ""]
          .filter(Boolean)
          .join(" ")}
      >
        {name}
      </span>
      <span
        className={[styles.price, theme === "dark" ? styles.priceDark : ""]
          .filter(Boolean)
          .join(" ")}
      >
        {price}
      </span>
    </li>
  );
}
