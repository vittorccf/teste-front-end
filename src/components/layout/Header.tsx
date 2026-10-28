import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import {
  BoxIcon,
  CardIcon,
  CartIcon,
  CrownIcon,
  HeartIcon,
  SearchIcon,
  ShieldIcon,
  TruckIcon,
  UserIcon,
} from "@/components/icons/figma-icons";
import styles from "./Header.module.scss";

const BENEFITS = [
  { icon: ShieldIcon, text: <>Compra <strong>100% segura</strong></> },
  { icon: TruckIcon, text: <><strong>Frete grátis</strong> acima de R$ 200</> },
  { icon: CardIcon, text: <><strong>Parcele</strong> suas compras</> },
];

const MENU = ["Todas categorias", "Supermercado", "Livros", "Moda", "Lançamentos", "Ofertas do dia"];

export function Header() {
  return (
    <header className={styles.header}>
      <ul className={styles.benefits} aria-label="Vantagens">
        {BENEFITS.map(({ icon: Icon, text }, index) => (
          <li key={index}>
            <Icon size={20} />
            <span>{text}</span>
          </li>
        ))}
      </ul>

      <div className={styles.main}>
        <Link href="/" className={styles.logo} aria-label="Econverse, página inicial">
          <Logo width={139} height={41} priority />
        </Link>

        <form className={styles.search} role="search" action="/" method="get">
          <label htmlFor="busca" className="visually-hidden">
            Buscar produtos
          </label>
          <input id="busca" name="q" type="search" placeholder="O que você está buscando?" autoComplete="off" />
          <button type="submit" aria-label="Buscar">
            <SearchIcon size={28} />
          </button>
        </form>

        <nav className={styles.account} aria-label="Minha conta">
          <a href="#" aria-label="Meus pedidos">
            <BoxIcon size={24} />
          </a>
          <a href="#" aria-label="Favoritos">
            <HeartIcon size={32} />
          </a>
          <a href="#" aria-label="Minha conta">
            <UserIcon size={32} />
          </a>
          <a href="#" aria-label="Carrinho">
            <CartIcon size={32} />
          </a>
        </nav>
      </div>

      <nav className={styles.menu} aria-label="Departamentos">
        <ul>
          {MENU.map((item, index) => (
            <li key={item}>
              <a href="#" className={index === MENU.length - 1 ? styles.highlight : undefined}>
                {item}
              </a>
            </li>
          ))}
          <li>
            <a href="#">
              <CrownIcon size={20} />
              Assinatura
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
