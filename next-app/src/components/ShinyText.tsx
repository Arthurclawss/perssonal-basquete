"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
  color?: string;
  shineColor?: string;
}

export default function ShinyText({
  text,
  className = "",
  speed = 2.8,
  color = "#ffffff",
  shineColor = "#ff9aa9",
}: ShinyTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          textRef.current,
          { backgroundPosition: "150% center" },
          {
            backgroundPosition: "-50% center",
            duration: speed,
            repeat: -1,
            repeatDelay: 0.8,
            ease: "none",
          },
        );
      });

      return () => media.revert();
    },
    { scope: textRef, dependencies: [speed] },
  );

  return (
    <span
      ref={textRef}
      className={`inline-block ${className}`}
      style={{
        color,
        backgroundImage: `linear-gradient(120deg, ${color} 0%, ${color} 38%, ${shineColor} 50%, ${color} 62%, ${color} 100%)`,
        backgroundSize: "250% auto",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        willChange: "background-position",
      }}
    >
      {text}
    </span>
  );
}
