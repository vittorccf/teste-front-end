import Image from "next/image";
import photo from "../../../public/images/parceiros.jpg";
import styles from "./Partners.module.scss";

const PARTNERS = [
  { id: "a", title: "Parceiros", text: "Lorem ipsum dolor sit amet, consectetur" },
  { id: "b", title: "Parceiros", text: "Lorem ipsum dolor sit amet, consectetur" },
];

export function Partners({ id }: { id: string }) {
  return (
    <section className={styles.partners} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="visually-hidden">
        Parceiros
      </h2>
      <ul className={styles.list}>
        {PARTNERS.map((partner) => (
          <li key={partner.id} className={styles.card}>
            <Image src={photo} alt="" fill sizes="(min-width: 768px) 634px, 100vw" className={styles.image} />
            <h3 className={styles.title}>{partner.title}</h3>
            <p className={styles.text}>{partner.text}</p>
            <a href="#" className={styles.cta}>
              Confira
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
