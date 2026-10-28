"use client";

import { MinusIcon, PlusIcon } from "@/components/icons/icons";
import styles from "./QuantityStepper.module.scss";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export function QuantityStepper({ value, onChange, min = 1, max = 99 }: Props) {
  return (
    <div className={styles.stepper} role="group" aria-label="Quantidade">
      <button
        type="button"
        className={styles.button}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
      >
        <MinusIcon size={20} />
      </button>
      {/* span e não <output>: o <output> tem papel "status" e competiria com o aviso do modal. */}
      <span className={styles.value} aria-live="polite" aria-atomic="true">
        <span aria-hidden="true">{String(value).padStart(2, "0")}</span>
        <span className="visually-hidden">{`${value} unidade${value > 1 ? "s" : ""}`}</span>
      </span>
      <button
        type="button"
        className={styles.button}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Aumentar quantidade"
      >
        <PlusIcon size={20} />
      </button>
    </div>
  );
}
