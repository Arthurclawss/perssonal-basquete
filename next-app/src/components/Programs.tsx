"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Dumbbell, Gauge, Users } from "lucide-react";
import SlideUpText from "./SlideUpText";
import { buildWhatsAppUrl } from "@/lib/contact";

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    tag: "Individual",
    title: "Desenvolvimento de atleta",
    description: "Treino direcionado às necessidades técnicas, físicas e táticas de cada jogador.",
    icon: Gauge,
    message: "Olá, Rafael! Vim pelo site e quero saber mais sobre o treino individual de desenvolvimento de atleta.",
  },
  {
    tag: "Coletivo",
    title: "Preparação de equipes",
    description: "Construção de identidade de jogo, execução coletiva e cultura competitiva.",
    icon: Users,
    message: "Olá, Rafael! Vim pelo site e quero saber mais sobre a preparação de equipes.",
  },
  {
    tag: "Performance",
    title: "Treino de alta intensidade",
    description: "Sessões que aproximam técnica, tomada de decisão e exigência real de jogo.",
    icon: Dumbbell,
    message: "Olá, Rafael! Vim pelo site e quero saber mais sobre o treino de alta intensidade.",
  },
];

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-program-card]",
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-program-grid]",
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="programas"
      className="relative overflow-hidden bg-brand-black py-24 text-white sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(242,13,47,0.14)_0%,transparent_65%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
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

        <div data-program-grid className="mt-16 grid gap-4 sm:gap-6 lg:mt-24 lg:grid-cols-3">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <a
                key={program.title}
                id={`program-${index + 1}`}
                href={buildWhatsAppUrl(program.message)}
                target="_blank"
                rel="noopener noreferrer"
                data-program-card
                aria-label={`${program.title} — falar no WhatsApp`}
                className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[1.2rem] border border-white/[0.08] bg-[rgba(12,12,13,0.85)] p-7 transition-[border-color,background-color,translate] duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[rgba(18,12,13,0.95)] sm:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[0.61rem] font-black uppercase tracking-[0.2em] text-brand-red">{program.tag}</span>
                  <span className="font-heading text-sm font-black text-white/25">0{index + 1}</span>
                </div>

                <span className="mt-14 grid h-14 w-14 place-items-center rounded-xl border border-white/10 text-white/70 transition-colors duration-300 group-hover:border-brand-red/70 group-hover:text-brand-red">
                  <Icon className="h-7 w-7" strokeWidth={1.4} />
                </span>

                <div className="mt-10">
                  <h3 className="max-w-xs font-heading text-3xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-4xl">{program.title}</h3>
                  <p className="mt-5 max-w-sm text-sm leading-6 text-white/50">{program.description}</p>
                </div>

                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.65rem] font-black uppercase tracking-[0.16em] text-white/40 transition-colors duration-300 group-hover:text-white">
                  Quero saber mais
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-red" />
                </span>
                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand-red transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
