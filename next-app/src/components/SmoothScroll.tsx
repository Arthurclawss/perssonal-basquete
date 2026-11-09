"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollDestination } from "@/lib/scroll-navigation";
import { getOpeningPhase } from "@/lib/opening";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: !reducedMotion.matches,
      wheelMultiplier: 0.88,
      touchMultiplier: 1,
      anchors: false,
    });
    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    let menuOpen = false;
    const syncLock = () => {
      if (menuOpen || getOpeningPhase() !== "complete") lenis.stop();
      else lenis.start();
    };
    const onMenu = (event: Event) => {
      menuOpen = (event as CustomEvent<boolean>).detail;
      syncLock();
    };
    syncLock();
    const navigate = (hash: string, updateHistory: boolean) => {
      const destination = getScrollDestination(hash);
      if (destination === null) return;
      lenis.start();
      lenis.scrollTo(destination, {
        duration: Math.min(3.2, Math.max(1.2, Math.abs(destination - window.scrollY) / 3200)),
        immediate: reducedMotion.matches,
        easing: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
        onComplete: () => {
          if (updateHistory) window.history.pushState(null, "", hash);
          const target = document.getElementById(hash.slice(1));
          if (target) {
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
          }
        },
      });
    };
    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#" || getScrollDestination(hash) === null) return;
      event.preventDefault();
      requestAnimationFrame(() => navigate(hash, true));
    };
    const onHistory = () => navigate(window.location.hash || "#inicio", false);
    const refresh = () => { lenis.resize(); ScrollTrigger.refresh(); };
    let cancelled = false;
    const restoreHash = () => {
      refresh();
      if (window.location.hash) navigate(window.location.hash, false);
    };
    document.addEventListener("click", onAnchorClick);
    window.addEventListener("navigation-menu", onMenu);
    window.addEventListener("site-opening", syncLock);
    window.addEventListener("popstate", onHistory);
    window.addEventListener("load", restoreHash);
    document.fonts.ready.then(() => { if (!cancelled) refresh(); });
    if (document.readyState === "complete") restoreHash();
    lenis.on("scroll", updateScrollTrigger);
    // Update scroll before GSAP renders this frame's animations, so both use
    // the same position instead of rendering the previous frame's scroll.
    gsap.ticker.add(updateLenis, false, true);
    gsap.ticker.lagSmoothing(0);
    return () => {
      cancelled = true;
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("navigation-menu", onMenu);
      window.removeEventListener("site-opening", syncLock);
      window.removeEventListener("popstate", onHistory);
      window.removeEventListener("load", restoreHash);
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);
  return null;
}
