import Image from "next/image";
import banner from "../../../public/images/banner-black-friday.jpg";
import styles from "./HeroBanner.module.scss";

// Único h1 da página: o banner principal é o assunto da home.
export function HeroBanner() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Image
        src={banner}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className={styles.image}
      />
      <div className={styles.content}>
        <h1 id="hero-title" className={styles.title}>
          Venha conhecer nossas promoções
        </h1>
        <p className={styles.subtitle}>
          <strong>50% Off</strong> nos produtos
        </p>
        <a href="#vitrine" className={styles.cta}>
          Ver produto
        </a>
      </div>
    </section>
  );
}
