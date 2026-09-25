"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, AtSign } from "lucide-react";
import { motion } from "framer-motion";
import SlideUpText from "./SlideUpText";

gsap.registerPlugin(ScrollTrigger);

const instagramUrl = "https://www.instagram.com/coachrafaelmelo/";

const SilhouetteIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
    <path d="M36,11c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S38.2,11,36,11z M21.5,56l5.7-18.4L23,34.4l-7.3,7.3l-2.8-2.8l10.3-10.3 l3.9-9.9c0.9-2.3,3.2-3.8,5.7-3.8h4.5c2.6,0,5,1.7,5.8,4.1l4.2,12.7l7.5-3.2v-7.3h4v10l-9.9,4.2l-3.2-9.6L36,25.9l-3.8,9.7l9.8,9.8 v10.6h-4V47L31,40l-5.6,16H21.5z M47,15c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S48.7,15,47,15z" />
  </svg>
);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const parallaxTextRef = useRef<HTMLDivElement>(null);

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

        // Parallax vertical (Camada 2) com GSAP
        if (parallaxTextRef.current) {
          gsap.to(parallaxTextRef.current, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="sobre" className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32 lg:py-40">
      
      {/* Camada 0 — Base & Gradiente Radial */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 70% 30%, rgba(180, 20, 20, 0.25) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(74, 0, 0, 0.3) 0%, transparent 50%)"
        }}
        aria-hidden="true"
      />

      {/* Camada 1 — Textura de Madeira / Granulação (Film Grain) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
        aria-hidden="true"
      />

      {/* Camada 2 — Tipografia Gigante Dinâmica (GSAP Parallax) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-center overflow-hidden opacity-30 select-none"
        aria-hidden="true"
      >
        <div ref={parallaxTextRef} className="flex w-full flex-col items-center justify-center will-change-transform">
          <span className="whitespace-nowrap font-heading text-[15vw] font-black uppercase leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.08)] md:[-webkit-text-stroke:3px_rgba(255,255,255,0.08)]">
            Hoop Master
          </span>
          <span className="whitespace-nowrap font-heading text-[15vw] font-black uppercase leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.08)] md:[-webkit-text-stroke:3px_rgba(255,255,255,0.08)]">
            Rafael Melo
          </span>
        </div>
      </div>

      {/* Camada 3 — Silhuetas Vetoriais de Basquete em Ação (Framer Motion) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.85, x: 50 }}
        whileInView={{ opacity: 0.15, scale: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-10%" }}
        className="pointer-events-none absolute bottom-0 right-[-5%] z-0 hidden md:block will-change-transform"
        aria-hidden="true"
      >
        <SilhouetteIcon className="h-[45rem] w-auto text-black drop-shadow-[0_0_15px_rgba(242,13,47,0.7)]" />
      </motion.div>

      {/* Camada 4 — Máscara de Contraste e Legibilidade WCAG AAA */}
      <div 
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "linear-gradient(to top, #0a0a0a 15%, rgba(10,10,10,0.85) 45%, transparent 100%)"
        }}
        aria-hidden="true"
      />

      {/* CONTEÚDO PRINCIPAL (Z-Index alto para ficar acima do fundo) */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-4 -top-4 h-full w-full border border-brand-red/45 sm:-left-7 sm:-top-7" />
            <div ref={logoRef} className="relative aspect-square overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <Image
                src="/assets/coach-1.jpg"
                alt="Rafael Melo - Hoop Master Performance Esportiva"
                fill
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 border border-white/10" />
            </div>
            <div className="absolute -bottom-7 right-0 bg-brand-red px-6 py-5 shadow-2xl sm:-right-7 sm:px-8">
              <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-white/70">Identidade</p>
              <p className="mt-1 font-heading text-2xl font-black uppercase tracking-tight">Hoop Master</p>
            </div>
          </div>

          <div data-about-content>
            <span data-about-copy className="section-kicker text-brand-red drop-shadow-md">Mais que treino</span>
            <h2 className="mt-7 font-heading text-[clamp(3.2rem,6.2vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.055em] text-white drop-shadow-xl">
              <SlideUpText text="Mentalidade" inView />
              <br />
              <span className="outline-text drop-shadow-2xl">
                <SlideUpText text="inabalável." inView delay={0.08} />
              </span>
            </h2>

            <div className="mt-10 grid gap-7 border-t border-white/15 pt-8 sm:grid-cols-2 relative z-10">
              <div className="rounded-xl bg-black/40 p-5 backdrop-blur-sm border border-white/5">
                <h3 data-about-copy className="text-brand-red font-black uppercase tracking-wider text-sm mb-3">Potência & Resistência</h3>
                <p data-about-copy className="text-sm sm:text-base leading-7 text-white/80">
                  O basquete de alto rendimento não aceita atalhos. Talento abre portas; método, disciplina e consistência mantêm o atleta em evolução.
                </p>
              </div>
              <div className="rounded-xl bg-black/40 p-5 backdrop-blur-sm border border-white/5">
                <h3 data-about-copy className="text-brand-red font-black uppercase tracking-wider text-sm mb-3">Prevenção</h3>
                <p data-about-copy className="text-sm sm:text-base leading-7 text-white/80">
                  Cada treino tem intenção. Cada detalhe é corrigido. Cada repetição aproxima você da performance que quer entregar em quadra sem se machucar.
                </p>
              </div>
            </div>

            <div data-about-copy className="mt-10 flex flex-wrap items-center gap-5 relative z-10">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 bg-white px-6 py-4 text-[0.68rem] font-black uppercase tracking-[0.15em] text-brand-black transition-colors hover:bg-brand-red hover:text-white shadow-xl"
              >
                <AtSign className="h-4 w-4" />
                Acompanhar no Instagram
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="text-[0.63rem] font-bold uppercase tracking-[0.18em] text-white/40 drop-shadow-md">@coachrafaelmelo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
