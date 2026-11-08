"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CinematicText from "./CinematicText";
import { ArrowUp, ArrowUpRight, AtSign } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppButton";
import { INSTAGRAM_URL, buildWhatsAppUrl } from "@/lib/contact";

gsap.registerPlugin(ScrollTrigger);

export default function FooterCTA() {
  const rootRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const root = rootRef.current!;
      const card = root.querySelector(".final-contact__card");
      const words = root.querySelectorAll("[data-cta-heading] [data-cinematic-word]");
      const kicker = root.querySelector("[data-cta-kicker]");
      const description = root.querySelector("[data-cta-description]");
      const actions = root.querySelector("[data-cta-actions]");
      const process = root.querySelector("[data-cta-process]");
      const footer = root.querySelector(".final-contact__footer");
      const glow = root.querySelector("[data-cta-glow]");
      const brand = root.querySelector("[data-cta-brand]");
      const mesh = root.querySelector("[data-cta-mesh]");
      const feedback = document.querySelector("[data-feedback-stage]");
      gsap.set(card, { y: 56, scale: 0.975, transformOrigin: "50% 50%", force3D: true });
      gsap.set(words, { autoAlpha: 0, y: 0, yPercent: 115, force3D: true });
      gsap.set([kicker, description, actions, process, footer], { autoAlpha: 0, y: 20, force3D: true });
      gsap.set(glow, { opacity: 0.3, scale: 0.9 });
      gsap.set(brand, { opacity: 0.04, scale: 0.98 });
      gsap.set(mesh, { opacity: 0.15 });
      const entry = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          id: "contact-entry", trigger: root, start: "top bottom", end: "top top", scrub: 0.65,
        },
      });
      if (feedback) entry.fromTo(feedback,
        { autoAlpha: 1, y: 0 },
        { autoAlpha: 0.12, y: -40, duration: 1, ease: "none", immediateRender: false }, 0);
      entry
        .to(card, { y: 0, scale: 1, duration: 0.9 }, 0)
        .to(glow, { opacity: 1, scale: 1, duration: 1 }, 0)
        .to(brand, { opacity: 0.12, scale: 1, duration: 1 }, 0)
        .to(mesh, { opacity: 0.6, duration: 1 }, 0)
        .to(kicker, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.12)
        .to(words, { autoAlpha: 1, y: 0, yPercent: 0, duration: 0.45, stagger: { amount: 0.18 } }, 0.2)
        .to(description, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.4)
        .to(actions, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.5)
        .to(process, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.6)
        .to(footer, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.7);
    });
    return () => media.revert();
  }, { scope: rootRef });

  return (
    <footer
      ref={rootRef}
      id="contato"
      className="final-contact relative isolate overflow-hidden bg-zinc-950 text-white"
    >
      {/* Luz ambiente e marca d'água de fundo */}
      <div
        data-cta-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,13,47,0.22)_0%,rgba(242,13,47,0.06)_40%,transparent_70%)] blur-3xl"
      />
      <div
        data-cta-brand
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[78svh] w-full max-w-6xl -translate-y-1/2 select-none opacity-[0.12]"
      >
        <Image src="/assets/hoop-master-logo.png" alt="" fill sizes="100vw"
          className="object-contain px-6 sm:px-12" />
      </div>
      <div data-cta-mesh aria-hidden="true" className="final-contact__mesh pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="final-contact__layout mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div
          className="final-contact__card relative mx-auto flex w-full max-w-5xl flex-col items-center overflow-hidden border border-white/10 bg-white/[0.025] px-5 text-center shadow-[0_28px_90px_-48px_rgba(242,13,47,0.7)] sm:px-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent"
          />
          <span data-cta-kicker className="section-kicker justify-center text-zinc-400">
            A próxima jogada é sua
          </span>

          <h2 data-cta-heading aria-label="Vamos evoluir seu jogo?" className="mt-5 max-w-4xl font-heading text-[clamp(2.75rem,6vw,6rem)] font-black uppercase leading-[0.95] tracking-[-0.06em]">
            <CinematicText text="Vamos evoluir" />
            <br />
            <span className="text-brand-red"><CinematicText text="seu jogo?" /></span>
          </h2>

          <p data-cta-description className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Converse com Rafael Melo e descubra como começar um treino pensado para seus objetivos.
          </p>

          {/* Contato direto pelo WhatsApp */}
          <div data-cta-actions className="mt-6 flex w-full flex-col items-center">
            <a
              id="cta-whatsapp"
              href={buildWhatsAppUrl("Olá, Rafael! Vim pelo site e quero saber mais sobre os treinos e a avaliação. Meu objetivo no basquete é…")}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-3 bg-brand-red px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_18px_60px_-15px_rgba(242,13,47,0.7)] transition-[color,background-color,transform] duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-white hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:px-9 sm:py-5 sm:text-sm"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>Falar com o técnico</span>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400">
              Tire suas dúvidas pelo WhatsApp.
            </p>
          </div>
          <p data-cta-process className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.68rem] leading-5 text-zinc-400 sm:text-xs">
            <span>Avaliação</span>
            <span aria-hidden="true" className="text-brand-red">→</span>
            <span>Plano personalizado</span>
            <span aria-hidden="true" className="text-brand-red">→</span>
            <span>Treino acompanhado</span>
          </p>
        </div>

        {/* 4. LINHA FINAL DO RODAPÉ (Fluindo naturalmente) */}
        <div className="final-contact__footer border-t border-zinc-800/60 pb-4 pt-4">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            {/* Logo HM */}
            <a
              href="#inicio"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
              aria-label="Voltar ao início"
            >
              <span data-footer-logo className="relative block h-12 w-12 shrink-0">
                <Image src="/assets/hoop-master-logo.png" alt="" fill sizes="48px" className="object-contain" />
              </span>
              <div className="text-left">
                <span className="block whitespace-nowrap font-heading text-xs font-black uppercase tracking-[0.06em] sm:text-sm text-white">
                  Rafael Melo
                </span>
                <span className="mt-0.5 block text-[0.55rem] font-bold uppercase tracking-[0.22em] text-zinc-500">
                  Hoop Master Performance Esportiva
                </span>
              </div>
            </a>

            {/* Copyright */}
            <p className="order-last text-center text-[0.6rem] leading-5 font-medium uppercase tracking-[0.1em] text-zinc-500 md:order-none">
              © {new Date().getFullYear()} Rafael Melo · Método · Disciplina · Performance
            </p>

            {/* Links secundários discretos */}
            <div className="flex items-center gap-5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-zinc-500">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <AtSign className="h-4 w-4" />
                <span>Instagram</span>
              </a>

              <a
                id="footer-back-to-top"
                href="#inicio"
                className="group inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <span><span className="hidden sm:inline">Voltar ao </span>topo</span>
                <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
