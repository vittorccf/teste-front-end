import Image from "next/image";
import { formatBRL, installmentLabel, listPriceInCents } from "@/lib/price";
import type { Product } from "@/lib/products";
import styles from "./ProductCard.module.scss";

type Props = {
  product: Product;
  onSelect: (product: Product) => void;
  /** Só a primeira vitrine visível carrega a foto com prioridade (LCP). */
  priority?: boolean;
};

export function ProductCard({ product, onSelect, priority = false }: Props) {
  const listPrice = listPriceInCents(product.priceInCents);
  const open = () => onSelect(product);

  return (
    <article className={styles.card} aria-labelledby={`${product.id}-name`}>
      <div className={styles.media}>
        <Image
          src={product.photo}
          alt={product.name}
          width={247}
          height={228}
          sizes="247px"
          priority={priority}
          className={styles.image}
        />
      </div>

      {/* Botão "esticado" (::after cobre o card): o card inteiro abre o modal e continua sendo um só alvo de teclado. */}
      <h3 className={styles.name} id={`${product.id}-name`}>
        <button type="button" className={styles.open} onClick={open} aria-haspopup="dialog">
          {product.description}
        </button>
      </h3>

      <div className={styles.prices}>
        {listPrice > product.priceInCents && (
          <p className={styles.listPrice}>
            <span className="visually-hidden">De </span>
            <s>{formatBRL(listPrice)}</s>
          </p>
        )}
        <p className={styles.price}>
          <span className="visually-hidden">Por </span>
          {formatBRL(product.priceInCents)}
        </p>
        <p className={styles.installments}>{installmentLabel(product.priceInCents)}</p>
        <p className={styles.shipping}>Frete grátis</p>
      </div>

      <button type="button" className={styles.buy} onClick={open} aria-haspopup="dialog" aria-describedby={`${product.id}-name`}>
        Comprar
      </button>
    </article>
  );
}
