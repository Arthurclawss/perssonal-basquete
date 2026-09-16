"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import SlideUpText from "./SlideUpText";

const instagramUrl = "https://www.instagram.com/coachrafaelmelo/";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        timeline
          .from(imageRef.current, { clipPath: "inset(0 0 100% 0)", duration: 1.25 })
          .from(
            contentRef.current?.querySelectorAll("[data-hero-reveal]") ?? [],
            { y: 24, opacity: 0, duration: 0.8, stagger: 0.12 },
            0.45,
          )
          .from(detailRef.current, { x: 30, opacity: 0, duration: 0.7 }, 0.8);

        gsap.to(imageRef.current?.querySelector("img") ?? null, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="grain court-grid relative flex min-h-[100svh] items-center overflow-hidden bg-brand-black pb-16 pt-28 lg:pb-20 lg:pt-32"
    >
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-brand-red/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-[8%] hidden font-heading text-[20vw] font-black leading-none text-white/[0.025] lg:block">
        HM
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-12">
        <div ref={contentRef} className="relative z-20 pt-6 lg:pt-0">
          <div data-hero-reveal className="mb-7 flex items-center gap-4">
            <span className="h-px w-10 bg-brand-red" />
            <p className="max-w-[15rem] text-[0.62rem] font-black uppercase leading-5 tracking-[0.22em] text-white/60 sm:max-w-none sm:text-[0.66rem] sm:tracking-[0.26em]">
              Hoop Master <span className="mx-2 text-brand-red">/</span> Performance esportiva
            </p>
          </div>

          <h1 className="max-w-4xl font-heading text-[clamp(2.9rem,13vw,3.35rem)] font-black uppercase leading-[0.82] tracking-[-0.06em] text-white sm:text-[clamp(3.7rem,8.3vw,8.5rem)] sm:leading-[0.79] sm:tracking-[-0.065em]">
            <SlideUpText text="Construa" />
            <br />
            <span className="text-brand-red">
              <SlideUpText text="seu jogo." delay={0.1} />
            </span>
            <br />
            <span className="outline-text">
              <SlideUpText text="Eleve o nível." delay={0.2} />
            </span>
          </h1>

          <div className="mt-9 grid max-w-2xl gap-7 border-l border-white/20 pl-5 sm:grid-cols-[1fr_auto] sm:items-end sm:pl-7">
            <p data-hero-reveal className="max-w-md text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
              Treinamento de basquete com método, intensidade e leitura de jogo para atletas que querem evoluir de verdade.
            </p>
            <div data-hero-reveal className="flex flex-wrap gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 bg-brand-red px-5 py-4 text-[0.68rem] font-black uppercase tracking-[0.15em] text-white transition-colors hover:bg-brand-redDark"
              >
                Começar agora
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:ml-auto lg:max-w-none">
          <div className="absolute -left-5 -top-5 h-28 w-20 bg-brand-red sm:-left-8 sm:-top-8 sm:h-40 sm:w-28" />
          <div className="absolute -bottom-5 -right-4 h-28 w-28 border-b-2 border-r-2 border-brand-red sm:-bottom-8 sm:-right-7 sm:h-44 sm:w-44" />

          <div
            ref={imageRef}
            className="image-mask relative aspect-[4/5] min-h-[520px] overflow-hidden bg-brand-dark sm:min-h-[620px] lg:min-h-[680px]"
          >
            <Image
              src="/assets/coach-2.jpg"
              alt="Coach Rafael Melo à beira da quadra"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 48vw"
              className="scale-[1.06] object-cover object-[48%_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-brand-red/10 mix-blend-color" />
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between border-t border-white/30 pt-4 sm:bottom-10 sm:left-10 sm:right-10">
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-white/55">Coach</p>
                <p className="mt-1 font-heading text-xl font-black uppercase tracking-tight text-white">Rafael Melo</p>
              </div>
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/55">RN · Brasil</span>
            </div>
          </div>

          <div
            ref={detailRef}
            className="absolute -bottom-7 -left-2 z-20 flex items-center gap-4 bg-white px-5 py-4 text-brand-black sm:-left-12 sm:bottom-14 sm:px-7 sm:py-5"
          >
            <span className="font-heading text-3xl font-black tracking-tighter text-brand-red sm:text-4xl">HM</span>
            <span className="h-9 w-px bg-black/15" />
            <span className="max-w-28 text-[0.58rem] font-black uppercase leading-4 tracking-[0.15em]">
              Método aplicado à performance
            </span>
          </div>
        </div>
      </div>

      <a
        href="#resultados"
        className="absolute bottom-5 left-5 z-20 hidden items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-white/40 transition-colors hover:text-white md:flex lg:left-12"
      >
        Explore
        <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20">
          <ArrowDown className="h-3.5 w-3.5" />
        </span>
      </a>
    </section>
  );
}
