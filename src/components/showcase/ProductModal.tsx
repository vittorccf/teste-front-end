"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { CloseIcon } from "@/components/icons/icons";
import { formatBRL, installmentLabel } from "@/lib/price";
import type { Product } from "@/lib/products";
import { QuantityStepper } from "./QuantityStepper";
import styles from "./ProductModal.module.scss";

type Props = {
  product: Product | null;
  onClose: () => void;
};

/**
 * <dialog> nativo com showModal(): o navegador já cuida de foco preso, Esc, inert no resto da página e
 * de devolver o foco para quem abriu. O componente só liga o estado do React ao estado do diálogo.
 */
export function ProductModal({ product, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (product && !dialog.open) dialog.showModal();
    if (!product && dialog.open) dialog.close();
  }, [product]);

  // Clique no fundo escurecido (fora da caixa) fecha.
  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="product-modal-title"
      onClose={onClose}
      onClick={onBackdropClick}
    >
      {/* key: quantidade e aviso recomeçam a cada produto aberto. */}
      {product && <ModalContent key={product.id} product={product} onRequestClose={() => dialogRef.current?.close()} />}
    </dialog>
  );
}

function ModalContent({ product, onRequestClose }: { product: Product; onRequestClose: () => void }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState<number | null>(null);

  return (
    <div className={styles.box}>
      <button type="button" className={styles.close} onClick={onRequestClose} aria-label="Fechar">
        <CloseIcon size={16} />
      </button>

      <div className={styles.media}>
        <Image src={product.photo} alt={product.name} width={208} height={192} sizes="208px" />
      </div>

      <div className={styles.info}>
        <h2 id="product-modal-title" className={styles.title}>
          {product.name}
        </h2>
        <p className={styles.price}>
          {formatBRL(product.priceInCents)}
          <span className="visually-hidden">, {installmentLabel(product.priceInCents)}</span>
        </p>
        <p className={styles.description}>{product.description}</p>
        <a className={styles.details} href={`#${product.id}`} onClick={(event) => event.preventDefault()}>
          Veja mais detalhes do produto &gt;
        </a>

        <div className={styles.actions}>
          <QuantityStepper value={quantity} onChange={setQuantity} />
          <button type="button" className={styles.buy} onClick={() => setAdded(quantity)}>
            Comprar
          </button>
        </div>

        <p className={styles.feedback} role="status">
          {added !== null &&
            `${added} ${added > 1 ? "unidades adicionadas" : "unidade adicionada"} ao carrinho.`}
        </p>
      </div>
    </div>
  );
}
