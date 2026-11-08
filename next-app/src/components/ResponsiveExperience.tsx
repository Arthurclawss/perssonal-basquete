"use client";

import { lazy, Suspense, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import { DESKTOP_EXPERIENCE_QUERY } from "@/lib/experience";
import styles from "./ResponsiveExperience.module.css";

const DesktopExperience = lazy(() => import("./DesktopExperience"));

function subscribe(onChange: () => void) {
  const media = window.matchMedia(DESKTOP_EXPERIENCE_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(DESKTOP_EXPERIENCE_QUERY).matches;
}

function DesktopBoot() {
  return (
    <div data-desktop-boot className={styles.boot} role="status" aria-label="Carregando apresentação Hoop Master">
      <div className="hero-logo-backdrop pointer-events-none absolute inset-0" aria-hidden="true">
        <Image src="/assets/hoop-master-logo.png" alt="" fill sizes="100vw" className="object-contain px-[3vw] py-28 sm:px-[10vw] sm:py-20 lg:px-[16vw]" />
      </div>
      <span className={styles.caption}>Preparando a quadra</span>
    </div>
  );
}

export default function ResponsiveExperience({ simple }: { simple: ReactNode }) {
  const desktop = useSyncExternalStore(subscribe, getSnapshot, () => false);
  // CSS selects the first paint before hydration knows the device. Never use
  // the mobile page as the desktop Suspense fallback, including on reloads.
  if (desktop) return <Suspense fallback={<DesktopBoot />}><DesktopExperience /></Suspense>;

  return (
    <>
      <div data-responsive-simple className={styles.simple}>{simple}</div>
      <DesktopBoot />
      <noscript><style>{"[data-responsive-simple] { display: block !important; } [data-desktop-boot] { display: none !important; }"}</style></noscript>
    </>
  );
}
