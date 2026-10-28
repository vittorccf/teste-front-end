import { Logo } from "@/components/brand/Logo";
import styles from "./Brands.module.scss";

const BRANDS = ["Marca 1", "Marca 2", "Marca 3", "Marca 4", "Marca 5"];

export function Brands() {
  return (
    <section className={styles.brands} aria-labelledby="marcas-title">
      <h2 id="marcas-title" className={styles.title}>
        Navegue por marcas
      </h2>
      <ul className={styles.list}>
        {BRANDS.map((brand) => (
          <li key={brand}>
            <a href="#" className={styles.brand} aria-label={brand}>
              <Logo width={117} height={35} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
