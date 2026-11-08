export type OpeningPhase = "loading" | "revealing" | "complete";
let phase: OpeningPhase | undefined;

export function getOpeningPhase(): OpeningPhase {
  if (!phase) {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const shouldPlay = !window.location.hash && window.scrollY < 8
      && navigation?.type !== "back_forward" && navigation?.type !== "reload"
      && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    phase = shouldPlay ? "loading" : "complete";
  }
  return phase;
}

export function setOpeningPhase(next: OpeningPhase) {
  phase = next;
  document.documentElement.dataset.siteOpening = next;
  window.dispatchEvent(new CustomEvent("site-opening", { detail: next }));
}
