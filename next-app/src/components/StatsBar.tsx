"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 10, suffix: "+", label: "Anos de experiência" },
  { value: 500, suffix: "+", label: "Atletas desenvolvidos" },
];

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-stat]", {
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 86%",
            once: true,
          },
        });

        countersRef.current.forEach((counter, index) => {
          if (!counter) return;
          const state = { value: 0 };
          gsap.to(state, {
            value: stats[index].value,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 86%",
              once: true,
            },
            onUpdate: () => {
              counter.textContent = Math.round(state.value).toString();
            },
          });
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="resultados" className="relative z-20 bg-brand-red text-white">
      <div className="mx-auto grid max-w-[1440px] divide-y divide-white/20 md:grid-cols-[1.35fr_0.8fr_0.8fr_0.9fr] md:divide-x md:divide-y-0">
        <div data-stat className="flex min-h-40 items-center px-6 py-9 sm:px-10 lg:min-h-48 lg:px-12">
          <p className="max-w-md font-heading text-2xl font-black uppercase leading-tight tracking-[-0.03em] sm:text-3xl">
            Evolução não acontece por acaso. Ela é construída.
          </p>
        </div>

        {stats.map((stat, index) => (
          <div key={stat.label} data-stat className="flex min-h-40 flex-col justify-center px-6 py-9 sm:px-10 lg:min-h-48">
            <p className="font-heading text-5xl font-black leading-none tracking-[-0.06em] sm:text-6xl">
              <span ref={(element) => { countersRef.current[index] = element; }}>0</span>
              <span>{stat.suffix}</span>
            </p>
            <p className="mt-3 text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/70">{stat.label}</p>
          </div>
        ))}

        <div data-stat className="flex min-h-40 flex-col justify-center px-6 py-9 sm:px-10 lg:min-h-48">
          <p className="font-heading text-3xl font-black uppercase leading-none tracking-[-0.04em] sm:text-4xl">Múltiplos</p>
          <p className="mt-3 text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/70">Títulos estaduais</p>
        </div>
      </div>
    </section>
  );
}
