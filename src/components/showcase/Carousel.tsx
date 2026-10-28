"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/icons";
import styles from "./Carousel.module.scss";

type Props = {
  label: string;
  children: ReactNode[];
};

/** Trilho com scroll-snap: arrasta no toque, setas no desktop, sem biblioteca. */
export function Carousel({ label, children }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setEdges({ start: track.scrollLeft <= 1, end: track.scrollLeft >= max - 1 });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateEdges();
    track.scrollTo({ left: 0 });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    return () => observer.disconnect();
  }, [children.length, updateEdges]);

  const page = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // Uma "página": quantos cards inteiros cabem na área visível (descontando a folga da sombra).
    const slide = track.querySelector("li");
    if (!slide) return;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap) || 0;
    const visible = track.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const step = slide.offsetWidth + gap;
    const perPage = Math.max(1, Math.floor((visible + gap) / step));
    track.scrollBy({ left: direction * perPage * step, behavior: "smooth" });
  };

  return (
    <div className={styles.carousel}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        onClick={() => page(-1)}
        disabled={edges.start}
        aria-label={`Produtos anteriores de ${label}`}
      >
        <ChevronLeftIcon size={20} />
      </button>

      <ul ref={trackRef} className={styles.track} onScroll={updateEdges} aria-label={label}>
        {children.map((child, index) => (
          <li key={index} className={styles.slide}>
            {child}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        onClick={() => page(1)}
        disabled={edges.end}
        aria-label={`Próximos produtos de ${label}`}
      >
        <ChevronRightIcon size={20} />
      </button>
    </div>
  );
}
