"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SlideUpTextProps {
  text: string;
  className?: string;
  delay?: number;
  inView?: boolean;
}

export default function SlideUpText({
  text,
  className = "",
  delay = 0,
  inView = false,
}: SlideUpTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const words = containerRef.current?.querySelectorAll("[data-slide-word]");
      if (!words?.length) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          words,
          { yPercent: 115, opacity: 0, rotate: 2 },
          {
            yPercent: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.85,
            stagger: 0.06,
            delay,
            ease: "power4.out",
            ...(inView
              ? {
                  scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 88%",
                    once: true,
                  },
                }
              : {}),
          },
        );
      });

      return () => media.revert();
    },
    { scope: containerRef, dependencies: [delay, inView] },
  );

  return (
    <span
      ref={containerRef}
      className={`${className} inline-flex flex-wrap`}
      aria-label={text}
    >
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mr-[0.24em] inline-block overflow-hidden pb-[0.08em] last:mr-0"
          aria-hidden="true"
        >
          <span
            data-slide-word
            className="inline-block origin-bottom-left leading-[0.92]"
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
