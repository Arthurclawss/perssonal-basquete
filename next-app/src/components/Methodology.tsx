"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, Brain, Shield, Target } from "lucide-react";
import SlideUpText from "./SlideUpText";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: "01",
    title: "Fundamento técnico",
    description:
      "Arremesso, drible, passe e mecânica corporal refinados para o seu perfil e posição em quadra.",
    icon: Target,
  },
  {
    number: "02",
    title: "Inteligência de jogo",
    description:
      "Leitura de defesa, tomada de decisão e compreensão tática para jogar um passo à frente.",
    icon: Brain,
  },
  {
    number: "03",
    title: "Performance física",
    description:
      "Preparação integrada para sustentar explosão, potência e intensidade durante todo o jogo.",
    icon: Activity,
  },
  {
    number: "04",
    title: "Mentalidade competitiva",
    description:
      "Disciplina, liderança e resiliência para responder bem quando a pressão aumenta.",
    icon: Shield,
  },
];

export default function Methodology() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-pillar]", {
          y: 55,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-pillars-grid]",
            start: "top 82%",
            once: true,
          },
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="metodologia" className="relative overflow-hidden bg-brand-cream py-24 text-brand-black sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute right-0 top-10 font-heading text-[24vw] font-black leading-none text-black/[0.035]">04</div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 border-b border-black/15 pb-14 lg:grid-cols-[0.55fr_1.45fr] lg:items-end lg:pb-20">
          <div>
            <span className="section-kicker text-brand-red">Método Hoop Master</span>
            <p className="mt-5 max-w-xs text-sm leading-6 text-black/55">
              Um sistema completo para transformar potencial em performance consistente.
            </p>
          </div>

          <h2 className="font-heading text-[clamp(3rem,6vw,6.8rem)] font-black uppercase leading-[0.86] tracking-[-0.055em]">
            <SlideUpText text="Treinar melhor." inView />
            <br />
            <span className="text-brand-red">
              <SlideUpText text="Jogar diferente." inView delay={0.08} />
            </span>
          </h2>
        </div>

        <div data-pillars-grid className="grid md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.number}
                data-pillar
                className="group relative min-h-[360px] border-b border-black/15 px-1 py-10 transition-colors md:border-r md:px-8 md:py-12 md:first:pl-0 md:nth-[2]:border-r-0 xl:min-h-[430px] xl:border-b-0 xl:nth-[2]:border-r xl:last:border-r-0 xl:last:pr-0"
              >
                <div className="flex items-start justify-between">
                  <span className="font-heading text-sm font-black tracking-[0.15em] text-brand-red">{pillar.number}</span>
                  <span className="grid h-12 w-12 place-items-center border border-black/15 transition-all duration-300 group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                </div>

                <div className="mt-24 xl:mt-36">
                  <h3 className="max-w-[12rem] font-heading text-3xl font-black uppercase leading-[0.95] tracking-[-0.035em]">{pillar.title}</h3>
                  <p className="mt-5 max-w-xs text-sm leading-6 text-black/55">{pillar.description}</p>
                </div>

                <span className="absolute bottom-0 left-0 h-1 w-0 bg-brand-red transition-all duration-500 group-hover:w-full" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
