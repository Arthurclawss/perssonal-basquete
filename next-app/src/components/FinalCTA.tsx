"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import SlideUpText from "./SlideUpText";

gsap.registerPlugin(ScrollTrigger);

const instagramUrl = "https://www.instagram.com/coachrafaelmelo/";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-cta-detail]", {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });
      });
      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-brand-red py-24 sm:py-32 lg:py-36">
      <div className="red-slash pointer-events-none absolute -right-24 -top-20 h-[140%] w-[42%] bg-black/10" />
      <div className="pointer-events-none absolute -bottom-10 right-6 font-heading text-[24vw] font-black leading-none text-white/[0.08]">HM</div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
          <div>
            <span data-cta-detail className="section-kicker text-white/70">A próxima jogada é sua</span>
            <h2 className="mt-7 max-w-5xl font-heading text-[clamp(3.4rem,7.4vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.06em] text-white">
              <SlideUpText text="Pronto para" inView />
              <br />
              <SlideUpText text="subir de nível?" inView delay={0.08} />
            </h2>
          </div>

          <a
            data-cta-detail
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-7 bg-brand-black px-7 py-5 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-brand-black sm:px-9 sm:py-6"
          >
            Agendar avaliação
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
