"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  from?: { opacity: number; y: number | string };
  to?: { opacity: number; y: number | string };
  threshold?: number;
  textAlign?: "left" | "center" | "right" | "justify";
}

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 0.5,
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  textAlign = "center",
}: SplitTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const words = text.split(" ").map((word) => word.split(""));

  return (
    <span
      ref={ref}
      className={`inline-block whitespace-normal ${className}`}
      style={{ textAlign }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0">
          {word.map((char, charIndex) => {
            const letterIndex =
              words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) + charIndex;

            return (
              <motion.span
                key={charIndex}
                className="inline-block will-change-transform"
                initial={from}
                animate={isInView ? to : from}
                transition={{
                  duration,
                  ease: [0.25, 1, 0.5, 1], // Equivalent to power3.out
                  delay: (letterIndex * delay) / 1000,
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
