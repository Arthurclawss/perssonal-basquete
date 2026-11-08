"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import styles from "./TouchCarousel.module.css";

export default function TouchCarousel({
  label,
  labels,
  children,
}: {
  label: string;
  labels: string[];
  children: ReactNode[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const trackId = useId();

  function goTo(index: number) {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: "instant" });
  }

  function syncPosition() {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const closest = slides.reduce((best, slide, index) =>
      Math.abs(slide.offsetLeft - track.scrollLeft) < Math.abs(slides[best].offsetLeft - track.scrollLeft) ? index : best, 0);
    if (closest === activeRef.current) return;
    activeRef.current = closest;
    setActive(closest);
    slides.forEach((slide, index) => {
      if (index !== closest) slide.querySelectorAll("video").forEach(video => video.pause());
    });
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => {
      const slide = track.children[activeRef.current] as HTMLElement | undefined;
      if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: "instant" });
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.carousel} role="region" aria-roledescription="carrossel" aria-label={label}>
      <p className={styles.hint}>Deslize para o lado ou use as setas.</p>
      <div
        id={trackId}
        ref={trackRef}
        className={styles.track}
        tabIndex={0}
        aria-label={`${label}: use as setas do teclado para navegar`}
        onScroll={syncPosition}
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          const next = event.key === "ArrowRight" ? Math.min(active + 1, children.length - 1)
            : event.key === "ArrowLeft" ? Math.max(active - 1, 0)
            : event.key === "Home" ? 0 : event.key === "End" ? children.length - 1 : null;
          if (next === null) return;
          event.preventDefault();
          goTo(next);
        }}
        onPlayCapture={event => {
          trackRef.current?.querySelectorAll("video").forEach(video => {
            if (video !== event.target) video.pause();
          });
        }}
      >
        {children.map((child, index) => (
          <div key={`${index}-${labels[index]}`} className={styles.slide} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${children.length}: ${labels[index]}`}>
            {child}
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button type="button" className={styles.arrow} onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={`Anterior: ${label}`} aria-controls={trackId}>←</button>
        <div className={styles.pagination}>
          <span className={styles.count} aria-live="polite" aria-atomic="true">{active + 1} / {children.length}</span>
          <div className={styles.dots}>
            {labels.map((name, index) => <button key={`${index}-${name}`} type="button" className={styles.dot} aria-label={`Ver ${index + 1}: ${name}`} aria-pressed={active === index} aria-controls={trackId} onClick={() => goTo(index)}><span /></button>)}
          </div>
        </div>
        <button type="button" className={styles.arrow} onClick={() => goTo(active + 1)} disabled={active === children.length - 1} aria-label={`Próximo: ${label}`} aria-controls={trackId}>→</button>
      </div>
    </div>
  );
}
