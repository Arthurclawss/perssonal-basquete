"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Expand, X } from "lucide-react";
import { feedbacks } from "@/lib/site-content";
import TouchCarousel from "./TouchCarousel";
import styles from "./SimpleTestimonials.module.css";

export default function SimpleTestimonials() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const feedback = feedbacks[active ?? 0];

  useEffect(() => {
    if (active === null) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow };
    // Fixed body also prevents background scrolling on touch browsers.
    Object.assign(body.style, { position: "fixed", top: `-${scrollY}px`, width: "100%", overflow: "hidden" });
    dialog.showModal();
    return () => {
      dialog.close();
      Object.assign(body.style, previous);
      window.scrollTo({ top: scrollY, behavior: "instant" });
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [active]);

  return (
    <>
      <TouchCarousel label="Depoimentos dos atletas" labels={feedbacks.map((_, index) => `Depoimento ${index + 1}`)}>
        {feedbacks.map((item, index) => <button
          key={item.src}
          type="button"
          className={styles.card}
          aria-label={`Ampliar depoimento ${index + 1}`}
          aria-haspopup="dialog"
          onClick={event => { triggerRef.current = event.currentTarget; setActive(index); }}
        >
          <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 639px) 100vw, 600px" />
          <span>Ampliar depoimento <Expand size={17} aria-hidden="true" /></span>
        </button>)}
      </TouchCarousel>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={`Depoimento ${(active ?? 0) + 1} ampliado`}
        onClose={() => { if (!dialogRef.current?.open) setActive(null); }}
        onClick={event => {
          if (event.target !== event.currentTarget) return;
          const box = event.currentTarget.getBoundingClientRect();
          if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialogRef.current?.close();
        }}
      >
        <div className={styles.toolbar}>
          <span>Depoimento {(active ?? 0) + 1} / {feedbacks.length}</span>
          <button type="button" className={styles.close} onClick={() => dialogRef.current?.close()} aria-label="Fechar depoimento ampliado" autoFocus><X size={20} aria-hidden="true" />Fechar</button>
        </div>
        {active !== null && <Image src={feedback.src} alt={feedback.alt} width={feedback.width} height={feedback.height} sizes="(max-width: 639px) 95vw, 720px" className={styles.image} />}
      </dialog>
    </>
  );
}
