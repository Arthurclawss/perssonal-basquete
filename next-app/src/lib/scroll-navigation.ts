import { ScrollTrigger } from "gsap/ScrollTrigger";

export const navigation = [
  { label: "Resultados", href: "#resultados", scene: "resultsReady" },
  { label: "Campeonatos", href: "#campeonatos", scene: "championshipsReady" },
  { label: "Sobre", href: "#sobre", scene: "aboutReady" },
  { label: "Treinos", href: "#treinos", scene: "trainingReady" },
  { label: "Depoimentos", href: "#depoimentos", scene: "feedbackReady" },
  { label: "Contato", href: "#contato", scene: "" },
];

export function syncSceneAnchors(trigger: ScrollTrigger) {
  const timeline = trigger.animation as gsap.core.Timeline | undefined;
  const section = trigger.trigger as HTMLElement | undefined;
  if (!timeline || !section || !timeline.duration()) return;
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  for (const item of navigation) {
    if (!item.scene) continue;
    const anchor = document.getElementById(item.href.slice(1));
    const time = timeline.labels[item.scene];
    if (anchor && time !== undefined) {
      const scroll = trigger.start + (time / timeline.duration()) * (trigger.end - trigger.start);
      anchor.style.top = `${scroll - sectionTop}px`;
    }
  }
}

export function getScrollDestination(hash: string) {
  const trigger = ScrollTrigger.getById("hero-story");
  const timeline = trigger?.animation as gsap.core.Timeline | undefined;
  const scene = hash === "#inicio" ? "homeReady" : navigation.find(item => item.href === hash)?.scene;
  if (trigger && timeline && scene && timeline.labels[scene] !== undefined) {
    return trigger.start + (timeline.labels[scene] / timeline.duration()) * (trigger.end - trigger.start);
  }
  const target = document.getElementById(hash.slice(1));
  if (!target) return null;
  if (hash === "#contato" || hash === "#inicio") return target.getBoundingClientRect().top + window.scrollY;
  // Markers in the reduced-motion layout already point into its visible scenes.
  return target.getBoundingClientRect().top + window.scrollY;
}
