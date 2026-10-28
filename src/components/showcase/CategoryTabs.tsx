"use client";

import { useRef, type KeyboardEvent } from "react";
import type { CategoryId } from "@/lib/categories";
import styles from "./CategoryTabs.module.scss";

type Props = {
  idPrefix: string;
  categories: { id: CategoryId; label: string }[];
  active: CategoryId;
  onChange: (id: CategoryId) => void;
};

/** Abas no padrão WAI-ARIA: setas, Home e End movem entre as abas; só a ativa entra no Tab. */
export function CategoryTabs({ idPrefix, categories, active, onChange }: Props) {
  const listRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = categories.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    const target = categories[next];
    if (!target) return;
    onChange(target.id);
    listRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[next]?.focus();
  };

  return (
    <div ref={listRef} className={styles.tabs} role="tablist" aria-label="Categorias">
      {categories.map((category, index) => {
        const selected = category.id === active;
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${category.id}`}
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={selected ? 0 : -1}
            className={styles.tab}
            onClick={() => onChange(category.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
