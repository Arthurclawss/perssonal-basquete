"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, Dumbbell, Gauge, Users } from "lucide-react";
import SlideUpText from "./SlideUpText";

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    tag: "Individual",
    title: "Desenvolvimento de atleta",
    description: "Treino direcionado às necessidades técnicas, físicas e táticas de cada jogador.",
    icon: Gauge,
  },
  {
    tag: "Coletivo",
    title: "Preparação de equipes",
    description: "Construção de identidade de jogo, execução coletiva e cultura competitiva.",
    icon: Users,
  },
  {
    tag: "Performance",
    title: "Treino de alta intensidade",
    description: "Sessões que aproximam técnica, tomada de decisão e exigência real de jogo.",
    icon: Dumbbell,
  },
];

const journey = ["Avaliação", "Plano", "Treino", "Evolução"];

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-program-card]", {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-program-grid]",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from("[data-journey-step]", {
          x: -24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-journey]",
            start: "top 85%",
            once: true,
          },
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="programas" className="relative bg-white py-24 text-brand-black sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <span className="section-kicker text-brand-red">Para quem quer mais</span>
          </div>
          <h2 className="font-heading text-[clamp(3.2rem,6.5vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.06em]">
            <SlideUpText text="Seu objetivo." inView />
            <br />
            <span className="text-brand-red">
              <SlideUpText text="Um plano real." inView delay={0.08} />
            </span>
          </h2>
        </div>

        <div data-program-grid className="mt-16 grid gap-px bg-black/15 lg:mt-24 lg:grid-cols-3">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <article key={program.title} data-program-card className="group relative min-h-[390px] overflow-hidden bg-white p-7 sm:p-10">
                <div className="flex items-start justify-between">
                  <span className="text-[0.61rem] font-black uppercase tracking-[0.2em] text-brand-red">{program.tag}</span>
                  <span className="font-heading text-sm font-black text-black/30">0{index + 1}</span>
                </div>

                <Icon className="mt-20 h-10 w-10 text-brand-red" strokeWidth={1.4} />

                <div className="mt-10">
                  <h3 className="max-w-xs font-heading text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-4xl">{program.title}</h3>
                  <p className="mt-5 max-w-sm text-sm leading-6 text-black/55">{program.description}</p>
                </div>

                <ArrowDownRight className="absolute bottom-7 right-7 h-6 w-6 text-black/20 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-brand-red sm:bottom-10 sm:right-10" />
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand-red transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            );
          })}
        </div>

        <div data-journey className="mt-16 border-t border-black/15 pt-8 lg:mt-24">
          <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-black/40">O caminho da evolução</p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((step, index) => (
              <li key={step} data-journey-step className="flex items-center gap-4 border-l border-black/15 pl-5">
                <span className="font-heading text-3xl font-black text-brand-red">0{index + 1}</span>
                <span className="text-sm font-black uppercase tracking-[0.1em]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
