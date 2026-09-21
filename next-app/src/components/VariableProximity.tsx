"use client";

import { type RefObject, useEffect, useMemo, useRef } from "react";

interface VariableProximityProps {
  label: string;
  containerRef: RefObject<HTMLElement | null>;
  className?: string;
  radius?: number;
  fromWeight?: number;
  toWeight?: number;
}

export default function VariableProximity({
  label,
  containerRef,
  className = "",
  radius = 150,
  fromWeight = 450,
  toWeight = 900,
}: VariableProximityProps) {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const words = useMemo(() => label.split(" "), [label]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame: number | null = null;

    const render = () => {
      frame = null;
      letterRefs.current.forEach((letter) => {
        if (!letter) return;
        const rect = letter.getBoundingClientRect();
        const distance = Math.hypot(
          pointerRef.current.x - (rect.left + rect.width / 2),
          pointerRef.current.y - (rect.top + rect.height / 2),
        );
        const proximity = Math.max(0, 1 - distance / radius);
        const eased = 1 - Math.pow(1 - proximity, 3);
        const weight = fromWeight + (toWeight - fromWeight) * eased;
        letter.style.fontVariationSettings = `'wght' ${Math.round(weight)}`;
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      if (frame === null) frame = window.requestAnimationFrame(render);
    };

    const handlePointerLeave = () => {
      pointerRef.current = { x: -9999, y: -9999 };
      if (frame === null) frame = window.requestAnimationFrame(render);
    };

    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [containerRef, fromWeight, radius, toWeight]);

  return (
    <span className={className} aria-label={label}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((letter, indexInWord) => {
            const currentIndex = words
              .slice(0, wordIndex)
              .reduce((total, previousWord) => total + previousWord.length, 0) + indexInWord;
            return (
              <span
                key={`${letter}-${currentIndex}`}
                ref={(element) => {
                  letterRefs.current[currentIndex] = element;
                }}
                className="inline-block transition-[font-variation-settings] duration-150"
                style={{ fontVariationSettings: `'wght' ${fromWeight}` }}
              >
                {letter}
              </span>
            );
          })}
          {wordIndex < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}
