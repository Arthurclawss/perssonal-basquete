"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  controlled?: boolean;
}

export default function BlurText({
  text,
  className = "",
  delay = 0,
  stagger = 0.075,
  animateBy = "words",
  direction = "bottom",
  controlled = false,
}: BlurTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const segments = animateBy === "letters" ? text.split("") : text.split(" ");

  useGSAP(
    () => {
      if (controlled) return;

      const elements = containerRef.current?.querySelectorAll("[data-blur-segment]");
      if (!elements?.length) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          elements,
          {
            filter: "blur(14px)",
            opacity: 0,
            y: direction === "top" ? -34 : 34,
          },
          {
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            stagger,
            ease: "power3.out",
          },
        );
      });

      return () => media.revert();
    },
    { scope: containerRef, dependencies: [controlled, delay, direction, stagger, text] },
  );

  return (
    <span ref={containerRef} className={`${className} inline-flex flex-wrap`} aria-label={text}>
      {segments.map((segment, index) => (
        <span
          key={`${segment}-${index}`}
          data-blur-segment
          aria-hidden="true"
          className="inline-block will-change-[transform,filter,opacity]"
          style={
            controlled
              ? { filter: "blur(18px)", opacity: 0, transform: "translateY(42px)" }
              : undefined
          }
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < segments.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}
