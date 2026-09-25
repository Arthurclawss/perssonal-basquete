"use client";

import { memo, useEffect, useId, useRef } from "react";

const TWO_PI = Math.PI * 2;

interface Dot {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
}

interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  className?: string;
}

const DotField = memo(function DotField({
  dotRadius = 1.7,
  dotSpacing = 17,
  cursorRadius = 360,
  bulgeStrength = 52,
  glowRadius = 220,
  sparkle = true,
  waveAmplitude = 1.5,
  gradientFrom = "rgba(255, 26, 26, 0.62)",
  gradientTo = "rgba(225, 229, 234, 0.26)",
  glowColor = "rgba(255, 26, 26, 0.18)",
  className = "",
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const frameRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0, left: 0, top: 0 });
  const pointerInsideRef = useRef(false);
  const engagementRef = useRef(0);
  const glowOpacityRef = useRef(0);
  const glowId = `dot-field-glow-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let frameCount = 0;

    const buildDots = (width: number, height: number) => {
      const step = dotRadius + dotSpacing;
      const columns = Math.floor(width / step);
      const rows = Math.floor(height / step);
      const offsetX = (width % step) / 2;
      const offsetY = (height % step) / 2;
      const dots: Dot[] = [];

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const ax = offsetX + column * step + step / 2;
          const ay = offsetY + row * step + step / 2;
          dots.push({ ax, ay, sx: ax, sy: ay });
        }
      }

      dotsRef.current = dots;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();

      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      sizeRef.current = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
      };
      buildDots(rect.width, rect.height);
    };

    const scheduleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const size = sizeRef.current;
      const x = event.clientX - size.left;
      const y = event.clientY - size.top;
      pointerInsideRef.current = x >= 0 && x <= size.width && y >= 0 && y <= size.height;

      if (!pointerInsideRef.current) return;

      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    const handlePointerLeave = () => {
      pointerInsideRef.current = false;
    };

    const draw = () => {
      frameCount += 1;
      const mouse = mouseRef.current;
      const { width, height } = sizeRef.current;
      const speed = Math.hypot(mouse.prevX - mouse.x, mouse.prevY - mouse.y);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      const targetEngagement = reducedMotion || !pointerInsideRef.current
        ? 0
        : Math.min(0.58 + speed / 12, 1);
      engagementRef.current += (targetEngagement - engagementRef.current) * 0.06;
      glowOpacityRef.current += (engagementRef.current - glowOpacityRef.current) * 0.08;

      if (glow) {
        glow.setAttribute("cx", String(mouse.x));
        glow.setAttribute("cy", String(mouse.y));
        glow.style.opacity = String(glowOpacityRef.current);
      }

      context.clearRect(0, 0, width, height);
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, gradientFrom);
      gradient.addColorStop(1, gradientTo);
      context.fillStyle = gradient;
      context.beginPath();

      const radius = dotRadius / 2;
      const cursorRadiusSquared = cursorRadius * cursorRadius;
      const time = frameCount * 0.02;

      dotsRef.current.forEach((dot, index) => {
        const dx = mouse.x - dot.ax;
        const dy = mouse.y - dot.ay;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared < cursorRadiusSquared && engagementRef.current > 0.01) {
          const distance = Math.sqrt(distanceSquared);
          const influence = 1 - distance / cursorRadius;
          const push = influence * influence * bulgeStrength * engagementRef.current;
          const angle = Math.atan2(dy, dx);
          dot.sx += (dot.ax - Math.cos(angle) * push - dot.sx) * 0.15;
          dot.sy += (dot.ay - Math.sin(angle) * push - dot.sy) * 0.15;
        } else {
          dot.sx += (dot.ax - dot.sx) * 0.1;
          dot.sy += (dot.ay - dot.sy) * 0.1;
        }

        const drawX = dot.sx + Math.cos(dot.ay * 0.03 + time * 0.7) * waveAmplitude * 0.5;
        const drawY = dot.sy + Math.sin(dot.ax * 0.03 + time) * waveAmplitude;
        const sparkleScale = sparkle && ((index * 2654435761) ^ (frameCount >> 3)) % 100 < 3 ? 1.75 : 1;
        const drawRadius = radius * sparkleScale;

        context.moveTo(drawX + drawRadius, drawY);
        context.arc(drawX, drawY, drawRadius, 0, TWO_PI);
      });

      context.fill();
      frameRef.current = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", scheduleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    frameRef.current = window.requestAnimationFrame(draw);

    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", scheduleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [bulgeStrength, cursorRadius, dotRadius, dotSpacing, gradientFrom, gradientTo, sparkle, waveAmplitude]);

  return (
    <div className={`relative h-full w-full ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowId})`}
          style={{ opacity: 0, willChange: "opacity" }}
        />
      </svg>
    </div>
  );
});

export default DotField;
