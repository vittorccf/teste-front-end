import Image, { type StaticImageData } from "next/image";
import bebidas from "../../../public/images/categorias/bebidas.png";
import esportes from "../../../public/images/categorias/esportes.png";
import ferramentas from "../../../public/images/categorias/ferramentas.png";
import moda from "../../../public/images/categorias/moda.png";
import saude from "../../../public/images/categorias/saude.png";
import supermercado from "../../../public/images/categorias/supermercado.png";
import tecnologia from "../../../public/images/categorias/tecnologia.png";
import styles from "./DepartmentNav.module.scss";

const DEPARTMENTS: { label: string; icon: StaticImageData; current?: boolean }[] = [
  { label: "Tecnologia", icon: tecnologia, current: true },
  { label: "Supermercado", icon: supermercado },
  { label: "Bebidas", icon: bebidas },
  { label: "Ferramentas", icon: ferramentas },
  { label: "Saúde", icon: saude },
  { label: "Esportes e Fitness", icon: esportes },
  { label: "Moda", icon: moda },
];

export function DepartmentNav() {
  return (
    <nav className={styles.nav} aria-label="Categorias da loja">
      <ul className={styles.list}>
        {DEPARTMENTS.map(({ label, icon, current }) => (
          <li key={label}>
            <a href="#" className={styles.item} aria-current={current ? "page" : undefined}>
              <span className={styles.tile}>
                <Image src={icon} alt="" width={61} height={61} />
              </span>
              <span className={styles.label}>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
