import styles from "./ServiceListItem.module.css";

interface ServiceListItemProps {
  name: string;
  price: string;
  description?: string;
  theme?: "light" | "dark";
}

export default function ServiceListItem({
  name,
  price,
  description,
  theme = "light",
}: ServiceListItemProps) {
  return (
    <li className={styles.item}>
      <div className={styles.header}>
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
      </div>
      {description && (
        <p
          className={[
            styles.description,
            theme === "dark" ? styles.descriptionDark : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {description}
        </p>
      )}
    </li>
  );
}
