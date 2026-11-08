"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

import { navigation, getScrollDestination } from "@/lib/scroll-navigation";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
      const active = [...navigation].reverse().find(item => {
        const position = getScrollDestination(item.href);
        return position !== null && window.scrollY >= position - window.innerHeight * 0.12;
      });
      setActiveSection(active?.href ?? "");
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigation-menu", { detail: menuOpen }));
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButtonRef.current?.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    window.addEventListener("keydown", close);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.dispatchEvent(new CustomEvent("navigation-menu", { detail: false }));
      window.removeEventListener("keydown", close);
      desktop.removeEventListener("change", closeOnDesktop);
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
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-8">
        <a
          href="#inicio"
          className="group flex items-center gap-3"
          aria-label="Rafael Melo — início"
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-110">
            <Image src="/assets/hoop-master-logo.png" alt="Hoop Master Logo" fill className="object-contain p-0.5" sizes="40px" />
          </span>
          <span className="flex flex-col">
            <span className="whitespace-nowrap font-heading text-base font-black uppercase leading-none tracking-[0.08em] text-white">
              Rafael Melo
            </span>
            <span className="mt-1 whitespace-nowrap text-[0.57rem] font-bold uppercase tracking-[0.28em] text-white/50">
              Performance esportiva
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/25 p-1 lg:flex" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeSection === item.href ? "location" : undefined}
              className={`rounded-full px-3 py-2.5 text-[0.6rem] font-bold uppercase tracking-[0.08em] transition-colors focus-visible:outline-white xl:px-4 xl:text-[0.65rem] ${activeSection === item.href ? "bg-brand-red text-white" : "text-white/65 hover:bg-white/10 hover:text-white"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          ref={menuButtonRef}
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
        inert={!menuOpen}
        data-lenis-prevent
        className={`absolute inset-x-0 top-20 h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t border-white/10 bg-brand-black px-5 transition-all duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav className="flex min-h-full flex-col py-5" aria-label="Navegação mobile">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              aria-current={activeSection === item.href ? "location" : undefined}
              className={`flex items-center justify-between border-b border-white/10 py-3.5 font-heading text-2xl font-black uppercase transition-colors ${activeSection === item.href ? "text-brand-red" : "text-white hover:text-brand-red"}`}
            >
              <span>{item.label}</span>
              <span className="text-xs font-medium tracking-widest text-brand-red">
                0{index + 1}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
