"use client";

import { lazy, Suspense, useSyncExternalStore, type ReactNode } from "react";
import { DESKTOP_EXPERIENCE_QUERY } from "@/lib/experience";

const DesktopExperience = lazy(() => import("./DesktopExperience"));

function subscribe(onChange: () => void) {
  const media = window.matchMedia(DESKTOP_EXPERIENCE_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(DESKTOP_EXPERIENCE_QUERY).matches;
}

export default function ResponsiveExperience({ simple }: { simple: ReactNode }) {
  const desktop = useSyncExternalStore(subscribe, getSnapshot, () => false);
  // The static version is server-rendered and remains usable without JavaScript.
  return desktop ? <Suspense fallback={simple}><DesktopExperience /></Suspense> : simple;
}
