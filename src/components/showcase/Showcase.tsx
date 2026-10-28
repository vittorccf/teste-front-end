"use client";

import { useId, useState } from "react";
import { filterByCategory, SHOWCASE_CATEGORIES, type CategoryId } from "@/lib/categories";
import type { Product } from "@/lib/products";
import { Carousel } from "./Carousel";
import { CategoryTabs } from "./CategoryTabs";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import styles from "./Showcase.module.scss";

type Props = {
  title: string;
  products: Product[];
  /** false quando a API falhou: a vitrine avisa em vez de parecer vazia. */
  available?: boolean;
  /** Primeira vitrine: abas de categoria e fotos com prioridade. */
  variant?: "tabs" | "link";
  priority?: boolean;
};

export function Showcase({ title, products, available = true, variant = "tabs", priority = false }: Props) {
  const id = useId();
  const [category, setCategory] = useState<CategoryId>("celular");
  const [selected, setSelected] = useState<Product | null>(null);

  const visible = variant === "tabs" ? filterByCategory(products, category) : products;
  const activeLabel = SHOWCASE_CATEGORIES.find((item) => item.id === category)?.label ?? title;

  return (
    <section className={styles.showcase} aria-labelledby={`${id}-title`}>
      <header className={styles.header}>
        <h2 id={`${id}-title`} className={styles.title}>
          {title}
        </h2>
      </header>

      {variant === "link" && (
        <p className={styles.seeAllRow}>
          <a href="#vitrine" className={styles.seeAll}>
            Ver todos
          </a>
        </p>
      )}

      {variant === "tabs" && (
        <div className={styles.tabsRow}>
          <CategoryTabs idPrefix={id} categories={SHOWCASE_CATEGORIES} active={category} onChange={setCategory} />
        </div>
      )}

      <div
        id={`${id}-panel`}
        className={styles.panel}
        {...(variant === "tabs" ? { role: "tabpanel", "aria-labelledby": `${id}-tab-${category}` } : {})}
      >
        {!available ? (
          <p className={styles.empty} role="alert">
            Não foi possível carregar os produtos agora. Tente novamente em instantes.
          </p>
        ) : visible.length === 0 ? (
          <p className={styles.empty}>Nenhum produto em {activeLabel.toLowerCase()} no momento.</p>
        ) : (
          <Carousel label={variant === "tabs" ? `${title}: ${activeLabel}` : title}>
            {visible.map((product, index) => (
              <ProductCard key={product.id} product={product} onSelect={setSelected} priority={priority && index < 4} />
            ))}
          </Carousel>
        )}
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
