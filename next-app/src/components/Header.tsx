"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, Menu, X } from "lucide-react";

const instagramUrl = "https://www.instagram.com/coachrafaelmelo/";

const navigation = [
  { label: "Resultados", href: "#resultados" },
  { label: "Sobre", href: "#sobre" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Programas", href: "#programas" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(
    () => {
      gsap.from(headerRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    },
    { scope: headerRef },
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled || menuOpen
          ? "border-white/10 bg-brand-black/95 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-24 lg:px-12">
        <a
          href="#inicio"
          className="group flex items-center gap-3"
          aria-label="Rafael Melo — início"
        >
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden border border-brand-red/60 bg-brand-red text-xs font-black tracking-[-0.08em] text-white transition-transform duration-300 group-hover:-rotate-3">
            HM
            <span className="absolute -right-2 top-0 h-full w-3 rotate-12 bg-white/20" />
          </span>
          <span className="flex flex-col">
            <span className="font-heading text-base font-black uppercase leading-none tracking-[0.08em] text-white">
              Rafael Melo
            </span>
            <span className="mt-1 text-[0.57rem] font-bold uppercase tracking-[0.28em] text-white/50">
              Performance esportiva
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.69rem] font-bold uppercase tracking-[0.17em] text-white/65 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <span className="h-px w-8 bg-white/20" />
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-brand-red px-5 py-3 text-[0.68rem] font-black uppercase tracking-[0.15em] text-white transition-colors hover:bg-brand-redDark"
          >
            Agendar avaliação
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center border border-white/15 text-white lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`absolute inset-x-0 top-20 h-[calc(100svh-5rem)] border-t border-white/10 bg-brand-black px-5 transition-all duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col py-8" aria-label="Navegação mobile">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-white/10 py-5 font-heading text-3xl font-black uppercase text-white"
            >
              <span>{item.label}</span>
              <span className="text-xs font-medium tracking-widest text-brand-red">
                0{index + 1}
              </span>
            </a>
          ))}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center justify-between bg-brand-red p-5 text-sm font-black uppercase tracking-[0.16em] text-white"
          >
            Agendar avaliação
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
