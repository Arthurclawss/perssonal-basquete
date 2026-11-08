"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, ArrowUpRight, AtSign, MessageCircle } from "lucide-react";
import SlideUpText from "./SlideUpText";
import { INSTAGRAM_URL, buildWhatsAppUrl } from "@/lib/contact";

gsap.registerPlugin(ScrollTrigger);

const journey = [
  { title: "Avaliação", description: "Diagnóstico físico e técnico" },
  { title: "Plano", description: "Treino feito para o seu objetivo" },
  { title: "Treino", description: "Execução com acompanhamento" },
  { title: "Evolução", description: "Resultado medido em quadra" },
];

/**
 * Bloco final unificado: chamada para ação + rodapé no mesmo fundo preto.
 * O elemento raiz é <footer> para manter o landmark "contentinfo" da página.
 */
export default function FinalCTA() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-cta-detail]",
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-cta-main]", start: "top 80%", once: true },
          },
        );
        gsap.fromTo(
          "[data-cta-step]",
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-cta-journey]", start: "top 90%", once: true },
          },
        );
        gsap.fromTo(
          "[data-cta-glow]",
          { scale: 0.7, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
          },
        );
        gsap.fromTo(
          "[data-footer-line]",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: { trigger: "[data-footer-line]", start: "top 98%", once: true },
          },
        );
      });
      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <footer
      ref={rootRef}
      id="contato"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-brand-black text-white"
    >
      {/* Fundo: brilho vermelho + marca d'água HM */}
      <div
        data-cta-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,13,47,0.28)_0%,rgba(242,13,47,0.08)_38%,transparent_68%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-4vw] -z-10 select-none text-center font-heading text-[30vw] font-black leading-none tracking-[-0.08em] text-white/[0.025]"
      >
        HM
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      {/* Chamada para ação */}
      <div
        data-cta-main
        className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center sm:px-8 sm:py-32"
      >
        <span data-cta-detail className="section-kicker text-brand-red">
          A próxima jogada é sua
        </span>

        <h2 className="mt-7 max-w-5xl font-heading text-[clamp(3rem,8vw,8.5rem)] font-black uppercase leading-[0.84] tracking-[-0.06em]">
          <SlideUpText text="Pronto para" inView className="justify-center" />
          <br />
          <SlideUpText
            text="subir de nível?"
            inView
            delay={0.08}
            className="justify-center text-brand-red"
          />
        </h2>

        <p
          data-cta-detail
          className="mt-7 max-w-xl text-sm leading-7 text-white/55 sm:text-base"
        >
          Agende sua avaliação e receba um plano de treino pensado para a sua posição, o seu
          momento e o seu objetivo dentro de quadra.
        </p>

        <div
          data-cta-detail
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <a
            id="cta-whatsapp"
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 overflow-hidden bg-brand-red px-8 py-5 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_18px_60px_-18px_rgba(242,13,47,0.7)] transition-[transform,background-color,color,box-shadow] duration-300 hover:scale-[1.04] hover:bg-white hover:text-brand-black hover:shadow-[0_22px_70px_-20px_rgba(255,255,255,0.45)] active:scale-[0.96] sm:px-10 sm:py-6"
          >
            <MessageCircle className="h-5 w-5" />
            Agendar avaliação
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>

          <a
            id="cta-instagram"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-white"
          >
            <AtSign className="h-4 w-4" />
            Ver o dia a dia no Instagram
          </a>
        </div>

        <div data-cta-journey className="mt-16 w-full max-w-5xl sm:mt-20">
          <p
            data-cta-detail
            className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-white/35"
          >
            Como funciona
          </p>
          <ol className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {journey.map((step, index) => (
              <li
                key={step.title}
                data-cta-step
                className="relative flex flex-col items-start gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 text-left"
              >
                <span className="font-heading text-2xl font-black leading-none text-brand-red">
                  0{index + 1}
                </span>
                <span className="text-sm font-black uppercase tracking-[0.1em]">{step.title}</span>
                <span className="text-xs leading-5 text-white/45">{step.description}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Linha de rodapé */}
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-12">
        <div
          data-footer-line
          aria-hidden="true"
          className="h-px w-full origin-center bg-white/10"
        />
        <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Voltar ao início">
            <span className="grid h-10 w-10 place-items-center bg-brand-red font-heading text-xs font-black tracking-[-0.08em]">
              HM
            </span>
            <span className="text-left">
              <span className="block font-heading text-sm font-black uppercase tracking-[0.06em]">
                Rafael Melo
              </span>
              <span className="mt-0.5 block text-[0.55rem] font-bold uppercase tracking-[0.22em] text-white/40">
                Hoop Master Performance Esportiva
              </span>
            </span>
          </a>

          <p className="order-last text-[0.58rem] font-medium uppercase tracking-[0.16em] text-white/30 md:order-none">
            © {new Date().getFullYear()} Rafael Melo · Método · Disciplina · Performance
          </p>

          <nav aria-label="Links do rodapé" className="flex items-center gap-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/55 transition-colors hover:text-white"
            >
              <AtSign className="h-4 w-4" />
              Instagram
            </a>
            <a
              id="footer-back-to-top"
              href="#inicio"
              className="group inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/55 transition-colors hover:text-white"
            >
              Voltar ao topo
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
