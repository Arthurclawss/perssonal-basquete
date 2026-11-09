"use client";

import React, { useRef, MouseEvent } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({
  children,
  className = "",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    // Measure once per hover. Measuring the tilted card on every movement
    // feeds its changing bounds back into the rotation and causes shaking.
    const rect = boundsRef.current ??= cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calcula a inclinação (15 graus max)
    const rotateX = Math.max(-1, Math.min(1, (y - centerY) / centerY)) * -15;
    const rotateY = Math.max(-1, Math.min(1, (x - centerX) / centerX)) * 15;
    
    cardRef.current.style.setProperty("--rx", `${rotateX}deg`);
    cardRef.current.style.setProperty("--ry", `${rotateY}deg`);
    cardRef.current.style.setProperty("--scale", `1.03`);
    // Transição muito rápida para seguir o mouse suavemente
    cardRef.current.style.setProperty("--duration", `0.1s`);
    cardRef.current.style.setProperty("--ease", `ease-out`);
  };

  const handleMouseLeave = () => {
    boundsRef.current = null;
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rx", `0deg`);
    cardRef.current.style.setProperty("--ry", `0deg`);
    cardRef.current.style.setProperty("--scale", `1`);
    // Retorno suave tipo mola quando o mouse sai
    cardRef.current.style.setProperty("--duration", `0.6s`);
    cardRef.current.style.setProperty("--ease", `cubic-bezier(0.23, 1, 0.32, 1)`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--scale, 1))",
        transition: "transform var(--duration, 0.6s) var(--ease, cubic-bezier(0.23, 1, 0.32, 1))",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
