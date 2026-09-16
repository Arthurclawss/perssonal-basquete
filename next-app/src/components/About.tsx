"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, AtSign } from "lucide-react";
import SlideUpText from "./SlideUpText";

gsap.registerPlugin(ScrollTrigger);

const instagramUrl = "https://www.instagram.com/coachrafaelmelo/";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(logoRef.current, {
          rotate: -4,
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 80%",
            once: true,
          },
        });

        gsap.from("[data-about-copy]", {
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-about-content]",
            start: "top 78%",
            once: true,
          },
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="sobre" className="relative overflow-hidden bg-brand-black py-24 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute -right-48 top-1/3 h-[34rem] w-[34rem] rounded-full border border-white/5" />
      <div className="pointer-events-none absolute -right-28 top-[28%] h-[22rem] w-[22rem] rounded-full border border-white/5" />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-4 -top-4 h-full w-full border border-brand-red/45 sm:-left-7 sm:-top-7" />
            <div ref={logoRef} className="relative aspect-square overflow-hidden bg-black shadow-2xl shadow-black">
              <Image
                src="/assets/coach-1.jpg"
                alt="Hoop Master Performance Esportiva"
                fill
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 border border-white/10" />
            </div>
            <div className="absolute -bottom-7 right-0 bg-brand-red px-6 py-5 sm:-right-7 sm:px-8">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-white/70">Identidade</p>
              <p className="mt-1 font-heading text-2xl font-black uppercase tracking-tight">Hoop Master</p>
            </div>
          </div>

          <div data-about-content>
            <span data-about-copy className="section-kicker text-brand-red">Mais que treino</span>
            <h2 className="mt-7 font-heading text-[clamp(3.2rem,6.2vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.055em] text-white">
              <SlideUpText text="Mentalidade" inView />
              <br />
              <span className="outline-text">
                <SlideUpText text="inabalável." inView delay={0.08} />
              </span>
            </h2>

            <div className="mt-10 grid gap-7 border-t border-white/15 pt-8 sm:grid-cols-2">
              <p data-about-copy className="text-base leading-7 text-white/70">
                O basquete de alto rendimento não aceita atalhos. Talento abre portas; método, disciplina e consistência mantêm o atleta em evolução.
              </p>
              <p data-about-copy className="text-base leading-7 text-white/70">
                Cada treino tem intenção. Cada detalhe é corrigido. Cada repetição aproxima você da performance que quer entregar em quadra.
              </p>
            </div>

            <div data-about-copy className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 bg-white px-6 py-4 text-[0.68rem] font-black uppercase tracking-[0.15em] text-brand-black transition-colors hover:bg-brand-red hover:text-white"
              >
                <AtSign className="h-4 w-4" />
                Acompanhar no Instagram
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="text-[0.63rem] font-bold uppercase tracking-[0.18em] text-white/40">@coachrafaelmelo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
