"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { getOpeningPhase, setOpeningPhase } from "@/lib/opening";

export default function IntroLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  useGSAP((_context, contextSafe) => {
    const root = rootRef.current!;
    if (getOpeningPhase() === "complete") {
      gsap.set(root, { display: "none" });
      setOpeningPhase("complete");
      return;
    }
    setOpeningPhase("loading");
    let disposed = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const imageCleanups: (() => void)[] = [];
    const protectedElements = [...document.querySelectorAll<HTMLElement>("main, footer, #whatsapp-floating")]
      .map(element => ({ element, inert: element.inert }));
    protectedElements.forEach(({ element }) => { element.inert = true; });
    const unlock = () => protectedElements.forEach(({ element, inert }) => { element.inert = inert; });
    const progress = { value: 0 };
    const fill = root.querySelector("[data-loader-fill]");
    const counter = root.querySelector("[data-loader-counter]");
    const bar = root.querySelector("[role=progressbar]");
    const setFill = gsap.quickSetter(fill, "scaleX");
    const paint = () => {
      const percent = Math.round(progress.value);
      setFill(progress.value / 100);
      if (counter) counter.textContent = `${String(percent).padStart(2, "0")}%`;
      bar?.setAttribute("aria-valuenow", String(percent));
    };
    const delay = (ms: number) => new Promise<void>(resolve => {
      timers.push(setTimeout(resolve, ms));
    });
    const readyImage = (selector: string) => new Promise<void>(resolve => {
      const image = document.querySelector<HTMLImageElement>(selector);
      if (!image) { resolve(); return; }
      const done = () => {
        image.removeEventListener("load", done);
        image.removeEventListener("error", done);
        image.decode().catch(() => {}).then(resolve);
      };
      imageCleanups.push(() => {
        image.removeEventListener("load", done);
        image.removeEventListener("error", done);
      });
      if (image.complete) done();
      else {
        image.addEventListener("load", done, { once: true });
        image.addEventListener("error", done, { once: true });
      }
    });
    const assets = [readyImage('[data-opening-asset="logo"]'), document.fonts.ready];
    if (window.matchMedia("(min-width: 1024px)").matches) assets.push(readyImage('[data-opening-asset="coach"]'));
    let completed = 0;
    const advance = contextSafe!(() => {
      if (disposed) return;
      completed += 1;
      gsap.to(progress, { value: (completed / assets.length) * 95, duration: 0.4, overwrite: true, ease: "power2.out", onUpdate: paint });
    });
    const reveal = contextSafe!(() => {
      if (disposed) return;
      gsap.timeline({ onComplete: () => {
        gsap.set(root, { display: "none" });
        unlock();
        setOpeningPhase("complete");
      } })
        .to({}, { duration: 0.12 })
        .call(() => setOpeningPhase("revealing"))
        .to(root.querySelector("[data-loader-logo]"), { opacity: 0.3, scale: 1.04, duration: 0.85, ease: "power2.inOut" })
        .to(root, { autoAlpha: 0, duration: 0.85, ease: "power2.inOut" }, "<");
    });
    const finish = contextSafe!(() => {
      if (disposed) return;
      gsap.to(progress, {
        value: 100, duration: 0.3, overwrite: true, onUpdate: paint, onComplete: reveal,
      });
    });
    const ready = Promise.allSettled(assets.map(asset => asset.then(advance, advance)));
    // Asset errors or a slow connection must never leave the page locked.
    Promise.all([Promise.race([ready, delay(6000)]), delay(1100)]).then(finish);
    return () => {
      disposed = true;
      timers.forEach(clearTimeout);
      imageCleanups.forEach(cleanup => cleanup());
      unlock();
    };
  }, { scope: rootRef });

  return (
    <div ref={rootRef} id="site-loader" className="site-loader fixed inset-0 z-[100] overflow-hidden bg-brand-black" aria-label="Abertura Hoop Master">
      <div className="site-loader__halo pointer-events-none absolute inset-0" aria-hidden="true" />
      <div data-loader-logo className="hero-logo-backdrop pointer-events-none absolute inset-0">
        <Image src="/assets/hoop-master-logo.png" alt="Hoop Master — Performance esportiva" fill preload sizes="100vw"
          className="object-contain px-[3vw] py-28 sm:px-[10vw] sm:py-20 lg:px-[16vw]" />
      </div>
      <div className="site-loader__progress absolute inset-x-6 bottom-[max(2rem,env(safe-area-inset-bottom))] mx-auto max-w-xs sm:bottom-12">
        <div className="mb-3 flex items-center justify-between text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/55">
          <span>Preparando a quadra</span><span data-loader-counter className="tabular-nums text-white/80">00%</span>
        </div>
        <div role="progressbar" aria-label="Carregando apresentação" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0} className="h-px overflow-hidden bg-white/15">
          <div data-loader-fill className="h-full w-full origin-left scale-x-0 bg-brand-red shadow-[0_0_16px_rgba(242,13,47,0.8)]" />
        </div>
      </div>
      <noscript><style>{"#site-loader { display: none !important; }"}</style></noscript>
    </div>
  );
}
