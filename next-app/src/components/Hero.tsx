"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import AccordionGallery from "./AccordionGallery";
import BlurText from "./BlurText";
import DotField from "./DotField";
import FoldText from "./FoldText";
import MaskedHeading from "./MaskedHeading";
import ShinyText from "./ShinyText";
import Testimonials from "./Testimonials";
import TrainingShowcase from "./TrainingShowcase";
import VariableProximity from "./VariableProximity";
import TiltCard from "./TiltCard";
import { syncSceneAnchors } from "@/lib/scroll-navigation";
import { getOpeningPhase } from "@/lib/opening";

import { resultStats, campGalleryItems } from "@/lib/site-content";

const instagramUrl = "https://www.instagram.com/coachrafaelmelo/";

const ExperienceMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <circle cx="24" cy="24" r="15.5" />
    <path d="M24 8.5v6M24 33.5v6M8.5 24h6M33.5 24h6" />
    <path d="m17 27 5-5 4 3 7-8" />
  </svg>
);

const AthletesMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <circle cx="24" cy="16" r="5" />
    <circle cx="11.5" cy="21" r="3.5" />
    <circle cx="36.5" cy="21" r="3.5" />
    <path d="M14.5 38c.7-7.2 4-11 9.5-11s8.8 3.8 9.5 11" />
    <path d="M4.5 38c.5-5.4 2.8-8.2 7-8.2 1.8 0 3.3.5 4.4 1.5M43.5 38c-.5-5.4-2.8-8.2-7-8.2-1.8 0-3.3.5-4.4 1.5" />
  </svg>
);

const TitlesMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path d="M15 9h18v8c0 7-3.5 11-9 11s-9-4-9-11V9Z" />
    <path d="M15 13H8v3c0 5 3 8 8.5 8M33 13h7v3c0 5-3 8-8.5 8M24 28v7M16 40h16M19 35h10" />
  </svg>
);

const ObjectiveMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path d="M9 38 38 9M24 9h14v14" />
    <path d="M9 14v24h24" />
    <path d="M9 30h8v8M9 22h16v16" />
  </svg>
);

const statIcons = [ExperienceMark, AthletesMark, TitlesMark, ObjectiveMark];
const desktopStats = resultStats.map((stat, index) => ({ ...stat, icon: statIcons[index] }));

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textureRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoLightRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLAnchorElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoGlowRef = useRef<HTMLDivElement>(null);
  const currentSceneRef = useRef<HTMLDivElement>(null);
  const methodRef = useRef<HTMLDivElement>(null);
  const transitionLineRef = useRef<HTMLDivElement>(null);
  const transitionPanelRef = useRef<HTMLDivElement>(null);
  const transitionOverlayRef = useRef<HTMLDivElement>(null);
  const transitionTrackRef = useRef<HTMLDivElement>(null);
  const transitionContentRef = useRef<HTMLDivElement>(null);
  const transitionGallerySceneRef = useRef<HTMLDivElement>(null);
  const transitionLogoRef = useRef<HTMLDivElement>(null);
  const aboutSideBarRef = useRef<HTMLDivElement>(null);
  const testimonialsIntroRef = useRef<HTMLDivElement>(null);
  const proofVerticalTrackRef = useRef<HTMLDivElement>(null);
  const trainingSceneRef = useRef<HTMLDivElement>(null);
  const feedbackSceneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const blurSegments = contentRef.current?.querySelectorAll("[data-blur-segment]") ?? [];
        const interfaceElements = contentRef.current?.querySelectorAll("[data-hero-ui]") ?? [];
        const transitionBlurSegments =
          transitionContentRef.current?.querySelectorAll(
            "[data-transition-blur] [data-blur-segment]",
          ) ?? [];
        const transitionGalleryPanels =
          transitionGallerySceneRef.current?.querySelectorAll("[data-gallery-split-panel]") ?? [];
        const trainingCards =
          trainingSceneRef.current?.querySelectorAll("[data-training-card]") ?? [];
        const trainingBackdrop =
          trainingSceneRef.current?.querySelector("[data-training-backdrop]") ?? null;
        const trainingHeadingPrimary =
          trainingSceneRef.current?.querySelector("[data-training-heading-primary]") ?? null;
        const trainingHeadingDetails =
          trainingSceneRef.current?.querySelectorAll("[data-training-heading-detail]") ?? [];
        const trainingControls =
          trainingSceneRef.current?.querySelectorAll("[data-training-control]") ?? [];
        const feedbackCards =
          feedbackSceneRef.current?.querySelectorAll("[data-feedback-card]") ?? [];
        const feedbackTrack =
          feedbackSceneRef.current?.querySelector<HTMLElement>("[data-feedback-track]") ?? null;
        const feedbackLanes =
          feedbackSceneRef.current?.querySelectorAll<HTMLElement>("[data-feedback-lane]") ?? [];
        const feedbackCopy =
          feedbackSceneRef.current?.querySelectorAll("[data-feedback-copy]") ?? [];
        const feedbackWords = feedbackSceneRef.current?.querySelectorAll("[data-feedback-heading] [data-cinematic-word]") ?? [];
        const feedbackAccent = feedbackSceneRef.current?.querySelector("[data-feedback-accent]") ?? null;
        const feedbackSubtitle = feedbackSceneRef.current?.querySelector("[data-feedback-subtitle]") ?? null;
        const frame = contentRef.current?.querySelector("[data-hero-frame]");
        if (!frame) return;

        gsap.set(textureRef.current, { autoAlpha: 0 });
        gsap.set(vignetteRef.current, { autoAlpha: 0 });
        gsap.set(blurSegments, { filter: "blur(18px)", opacity: 0, y: 42 });
        gsap.set(interfaceElements, { opacity: 0, y: 24 });
        gsap.set(photoRef.current, {
          autoAlpha: 0,
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          scale: 1.08,
          rotate: 2,
        });
        gsap.set(photoGlowRef.current, { opacity: 0, scale: 0.72 });
        gsap.set(methodRef.current, { autoAlpha: 0, y: 70, filter: "blur(18px)" });
        gsap.set(methodRef.current?.querySelectorAll("[data-fold-piece]") ?? [], {
          opacity: 0,
          rotateX: -92,
          transformOrigin: "50% 0%",
          "--fold-crease": 0.62,
        });
        gsap.set(methodRef.current?.querySelectorAll("[data-method-subtitle]") ?? [], {
          autoAlpha: 0,
          y: 20,
          filter: "blur(6px)",
        });
        // Estado inicial explícito dos cards de resultado (evita salto do .from() no scrub)
        gsap.set(methodRef.current?.querySelectorAll("[data-result-stat]") ?? [], {
          autoAlpha: 0,
          y: 48,
          scale: 0.95,
          filter: "blur(8px)",
          force3D: true,
        });
        gsap.set(transitionLineRef.current, {
          autoAlpha: 0,
          scaleX: 0,
          transformOrigin: "50% 50%",
          force3D: true,
        });
        gsap.set(transitionPanelRef.current, {
          autoAlpha: 0,
          scaleX: 0,
          scaleY: 0.002,
          transformOrigin: "50% 50%",
          force3D: true,
        });
        gsap.set(transitionOverlayRef.current, { autoAlpha: 0 });
        gsap.set(transitionTrackRef.current, { xPercent: 0, force3D: true });
        gsap.set(transitionContentRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(transitionBlurSegments, {
          filter: "blur(10px)",
          opacity: 0,
          y: -50,
        });
        gsap.set(transitionGalleryPanels, {
          opacity: 1,
          clipPath: "inset(0 0 100% 0)",
          yPercent: 10,
          transformOrigin: "50% 100%",
          force3D: true,
        });
        gsap.set(transitionLogoRef.current, { autoAlpha: 0, scale: 0.94, rotate: -1.5 });
        gsap.set(aboutSideBarRef.current, { autoAlpha: 1, xPercent: 0 });
        gsap.set(testimonialsIntroRef.current, { autoAlpha: 0, yPercent: 0 });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-intro-copy]") ?? [], {
          autoAlpha: 0,
          x: 28,
          y: 0,
          force3D: true,
        });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-masked-heading-word]") ?? [], {
          autoAlpha: 0,
          y: 35,
          filter: "blur(6px)",
          force3D: true,
        });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-intro-detail]") ?? [], {
          autoAlpha: 0,
          y: 30,
          filter: "blur(10px)",
          force3D: true,
        });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-fold-piece]") ?? [], {
          opacity: 0,
          rotateX: -92,
          transformOrigin: "50% 0%",
          "--fold-crease": 0.62,
        });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-about-pillar]") ?? [], {
          autoAlpha: 0,
          y: 22,
          clipPath: "inset(0 100% 0 0)",
          force3D: true,
        });
        gsap.set(trainingSceneRef.current, { autoAlpha: 0 });
        gsap.set(proofVerticalTrackRef.current, { yPercent: 0, force3D: true });
        gsap.set(feedbackSceneRef.current, { autoAlpha: 1 });
        gsap.set(trainingHeadingPrimary, {
          autoAlpha: 0,
          y: 28,
          filter: "blur(10px)",
          force3D: true,
        });
        gsap.set(trainingHeadingDetails, { autoAlpha: 0 });
        gsap.set(trainingControls, { autoAlpha: 0 });
        gsap.set(trainingCards, {
          autoAlpha: 0,
          y: 40,
          scale: 0.95,
          force3D: true,
        });
        gsap.set(trainingBackdrop, {
          autoAlpha: 0,
          scale: 1.025,
          clipPath: "inset(48% 0 48% 0)",
          force3D: true,
        });
        gsap.set(feedbackCards, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          force3D: true,
        });
        gsap.set(feedbackTrack, {
          y: 0,
          force3D: true,
        });
        gsap.set(feedbackLanes, { autoAlpha: 0, y: 56, force3D: true });
        gsap.set(feedbackCopy, { autoAlpha: 0, y: 20, force3D: true });
        gsap.set(feedbackWords, { autoAlpha: 0, y: 0, yPercent: 115, force3D: true });

        gsap.to(logoLightRef.current?.querySelector(".hero-logo-light-core") ?? null, {
          scale: 1.1,
          rotate: 3,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // ─────────────────────────────────────────────────────────────
        // Linha do tempo principal (scroll-driven).
        // Cada bloco entra no seu tempo: os elementos chegam um após o
        // outro, com pausas de leitura entre as cenas.
        // Obs.: sem invalidateOnRefresh — ele fazia o GSAP reler os
        // transforms no F5 e "congelar" deslocamentos (ex.: nome sumindo).
        // ─────────────────────────────────────────────────────────────
        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            id: "hero-story",
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.65,
            onRefresh: syncSceneAnchors,
          },
        });

        // The opening plays once in time; scrolling starts with the hero already visible.
        const intro = gsap.timeline({ paused: true })
          .to(logoRef.current, { opacity: 0.3, scale: 1.04, duration: 1.2 }, 0)
          .to(logoLightRef.current, { opacity: 0.28, duration: 1.2 }, 0)
          .to(textureRef.current, { autoAlpha: 1, duration: 0.9 }, 0.05)
          .to(vignetteRef.current, { autoAlpha: 1, duration: 0.9 }, 0.1)
          .to(blurSegments, { filter: "blur(0px)", opacity: 1, y: 0, duration: 0.9, stagger: { amount: 0.65 }, ease: "power3.out" }, 0.2)
          .to(frame, { borderColor: "rgba(255,255,255,0.2)", duration: 0.7 }, 0.25)
          .to(photoRef.current, {
            autoAlpha: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1, rotate: 0,
            duration: 1.2, ease: "power2.inOut",
          }, 0.15)
          .to(photoGlowRef.current, { opacity: 1, scale: 1, duration: 1 }, 0.25)
          .to(interfaceElements, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, 0.8)
          .to(exploreRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.1);
        const onOpening = () => {
          if (getOpeningPhase() === "revealing") intro.play();
        };
        window.addEventListener("site-opening", onOpening);
        if (getOpeningPhase() === "complete") intro.progress(1);
        else if (getOpeningPhase() === "revealing") intro.play();

        timeline
          .addLabel("homeReady", 0)
          .to({}, { duration: 2.4 })

          // ── Cena 2: Resultados ────────────────────────────────────
          .addLabel("heroExit")
          .to(
            currentSceneRef.current,
            { autoAlpha: 0, y: -72, scale: 0.96, filter: "blur(14px)", duration: 1.2, ease: "power2.inOut" },
            "heroExit",
          )
          .to(exploreRef.current, { opacity: 0, duration: 0.4 }, "heroExit")
          .to(
            methodRef.current,
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.1 },
            "heroExit+=0.9",
          )
          .to(
            methodRef.current?.querySelectorAll("[data-fold-piece]") ?? [],
            { opacity: 1, rotateX: 0, "--fold-crease": 0, duration: 1, stagger: 0.12 },
            ">-0.6",
          )
          .to(
            methodRef.current?.querySelectorAll("[data-method-subtitle]") ?? [],
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
            ">-0.2",
          )
          .to(
            methodRef.current?.querySelectorAll("[data-result-stat]") ?? [],
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.4,
              stagger: 0.6,
              force3D: true,
            },
            ">+0.2",
          )
          .addLabel("resultsReady")
          .to({}, { duration: 2.5 })

          // ── Transição vermelha + galeria ──────────────────────────
          .addLabel("redFill")
          .set([transitionLineRef.current, transitionPanelRef.current], { autoAlpha: 1 }, "redFill")
          .to([transitionLineRef.current, transitionPanelRef.current], {
            scaleX: 1,
            duration: 0.9,
            ease: "none",
            force3D: true,
          }, "redFill")
          .to(transitionPanelRef.current, {
            scaleY: 1,
            duration: 1.5,
            ease: "power1.inOut",
            force3D: true,
          }, "redFill+=0.65")
          .to(transitionLineRef.current, { autoAlpha: 0, duration: 0.3 }, "redFill+=0.85")
          .to(transitionOverlayRef.current, { autoAlpha: 1, duration: 0.4 }, "redFill+=1.85")
          .to(
            transitionLogoRef.current,
            { autoAlpha: 0.18, scale: 1, rotate: 0, duration: 0.9 },
            ">-0.2",
          )
          .to(
            transitionBlurSegments,
            {
              keyframes: [
                { filter: "blur(5px)", opacity: 0.5, y: 4, duration: 0.5 },
                { filter: "blur(0px)", opacity: 1, y: 0, duration: 0.7 },
              ],
              stagger: 0.15,
            },
            ">-0.4",
          )
          .to(
            transitionGalleryPanels,
            {
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
              y: 0,
              yPercent: 0,
              duration: 1.6,
              stagger: 0.35,
              ease: "power2.inOut",
              force3D: true,
            },
            ">-0.2",
          )
          .addLabel("championshipsReady")
          .to({}, { duration: 1.5 })
          .addLabel("aboutSlide")
          .to(transitionTrackRef.current, {
            xPercent: -50,
            duration: 2.4,
            ease: "power2.inOut",
            force3D: true,
          }, "aboutSlide")

          // ── Cena 3: Sobre mim ─────────────────────────────────────
          .addLabel("introReveal", "aboutSlide+=0.35")
          .to(testimonialsIntroRef.current, { autoAlpha: 1, y: 0, yPercent: 0, duration: 0.65 }, "introReveal")
          .to(
            testimonialsIntroRef.current?.querySelectorAll("[data-intro-copy]") ?? [],
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 1.4,
              ease: "power3.out",
              force3D: true,
            },
            "introReveal",
          )
          .to(
            testimonialsIntroRef.current?.querySelectorAll("[data-intro-detail]") ?? [],
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.3, force3D: true },
            "introReveal+=0.5",
          )
          .to(
            testimonialsIntroRef.current?.querySelectorAll("[data-masked-heading-word]") ?? [],
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.1,
              stagger: 0.35,
              ease: "power3.out",
              force3D: true,
            },
            "introReveal+=1.0",
          )
          .to(
            testimonialsIntroRef.current?.querySelectorAll("[data-fold-piece]") ?? [],
            {
              opacity: 1,
              rotateX: 0,
              "--fold-crease": 0,
              duration: 1,
              stagger: { amount: 2.6 },
            },
            ">-0.4",
          )
          .to(
            testimonialsIntroRef.current?.querySelectorAll("[data-about-pillar]") ?? [],
            {
              autoAlpha: 1,
              y: 0,
              clipPath: "inset(0 0% 0 0)",
              duration: 1,
              stagger: 0.4,
              force3D: true,
            },
            ">-0.6",
          )
          .addLabel("aboutReady")
          .to({}, { duration: 2.5 })

          // ── Cena 4: Vídeos de treino ──────────────────────────────
          .addLabel("trainingOverlay")
          .addLabel("aboutExit", "trainingOverlay")
          .to(
            testimonialsIntroRef.current,
            { y: 0, yPercent: -110, duration: 1.8, ease: "power2.inOut", force3D: true },
            "aboutExit",
          )
          .to(
            testimonialsIntroRef.current,
            { autoAlpha: 0, duration: 1, ease: "power2.in" },
            "aboutExit+=0.5",
          )
          .to(
            aboutSideBarRef.current,
            { autoAlpha: 0, xPercent: -100, duration: 1, ease: "power2.inOut", force3D: true },
            "aboutExit+=0.3",
          )
          .addLabel("backgroundReveal", "aboutExit+=1.8")
          .set(trainingSceneRef.current, { autoAlpha: 1 }, "backgroundReveal")
          .to(
            trainingBackdrop,
            {
              autoAlpha: 1,
              scale: 1,
              clipPath: "inset(0% 0 0% 0)",
              duration: 1,
              ease: "power2.inOut",
              force3D: true,
            },
            "backgroundReveal",
          )
          .to(
            trainingHeadingPrimary,
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, force3D: true },
            "backgroundReveal+=0.3",
          )
          .to(
            trainingHeadingDetails,
            { autoAlpha: 1, duration: 0.8, stagger: 0.15 },
            ">-0.3",
          )
          .addLabel("videoSequence", ">")
          .to(
            trainingCards,
            { autoAlpha: 1, y: 0, scale: 1, duration: 1.4, force3D: true },
            "videoSequence",
          )
          .to(
            trainingControls,
            { autoAlpha: 1, duration: 0.8, stagger: 0.12 },
            ">-0.4",
          )
          .addLabel("trainingReady")
          .to({}, { duration: 3 })

          // One continuous sequence: training moves out while the feedbacks arrive.
          .addLabel("videosExit")
          .to(trainingCards,
            { autoAlpha: 0, y: -24, duration: 1.2, ease: "power2.inOut", force3D: true },
            "videosExit")
          .to(proofVerticalTrackRef.current,
            { y: 0, yPercent: -50, duration: 2.8, ease: "power2.inOut", force3D: true },
            "videosExit")
          .addLabel("feedbackOverlay", "videosExit+=0.65")
          .to(feedbackLanes,
            { autoAlpha: 1, y: 0, duration: 1.8, stagger: 0.12, ease: "power3.out", force3D: true },
            "feedbackOverlay")
          .to(feedbackAccent,
            { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" },
            "feedbackOverlay+=0.3")
          .to(feedbackWords,
            { autoAlpha: 1, y: 0, yPercent: 0, duration: 1.2, stagger: { amount: 1.1 }, ease: "power3.out", force3D: true },
            "feedbackOverlay+=0.5")
          .to(feedbackSubtitle,
            { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" },
            "feedbackOverlay+=1.6")
          .addLabel("feedbackReady")
          .to({}, { duration: 2 });

        syncSceneAnchors(timeline.scrollTrigger!);

        // Disponível para depuração no console: window.__heroTimeline
        (window as unknown as { __heroTimeline?: gsap.core.Timeline }).__heroTimeline = timeline;
        return () => window.removeEventListener("site-opening", onOpening);
      });

      media.add("(min-width: 768px) and (prefers-reduced-motion: reduce)", () => {
        const blurSegments = contentRef.current?.querySelectorAll("[data-blur-segment]") ?? [];
        const interfaceElements = contentRef.current?.querySelectorAll("[data-hero-ui]") ?? [];
        const transitionBlurSegments =
          transitionContentRef.current?.querySelectorAll(
            "[data-transition-blur] [data-blur-segment]",
          ) ?? [];
        const transitionGalleryPanels =
          transitionGallerySceneRef.current?.querySelectorAll("[data-gallery-split-panel]") ?? [];
        const trainingCards =
          trainingSceneRef.current?.querySelectorAll("[data-training-card]") ?? [];
        const trainingBackdrop =
          trainingSceneRef.current?.querySelector("[data-training-backdrop]") ?? null;
        const feedbackCards =
          feedbackSceneRef.current?.querySelectorAll("[data-feedback-card]") ?? [];
        const feedbackTrack =
          feedbackSceneRef.current?.querySelector("[data-feedback-track]") ?? null;
        const feedbackLanes =
          feedbackSceneRef.current?.querySelectorAll("[data-feedback-lane]") ?? [];
        const feedbackCopy =
          feedbackSceneRef.current?.querySelectorAll("[data-feedback-copy]") ?? [];
        const frame = contentRef.current?.querySelector("[data-hero-frame]");
        if (!frame) return;
        gsap.set([textureRef.current, vignetteRef.current], { autoAlpha: 1 });
        gsap.set([...blurSegments, ...interfaceElements, exploreRef.current], {
          clearProps: "opacity,transform,filter,visibility",
        });
        gsap.set([photoRef.current, photoGlowRef.current], { clearProps: "all" });
        gsap.set(currentSceneRef.current, { clearProps: "all" });
        gsap.set(methodRef.current, { autoAlpha: 0 });
        gsap.set(methodRef.current?.querySelectorAll("[data-fold-piece]") ?? [], {
          opacity: 1,
          rotateX: 0,
          "--fold-crease": 0,
        });
        gsap.set(methodRef.current?.querySelectorAll("[data-method-subtitle]") ?? [], {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
        });
        gsap.set(methodRef.current?.querySelectorAll("[data-result-stat]") ?? [], {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          clearProps: "transform",
        });
        gsap.set(transitionOverlayRef.current, { autoAlpha: 0 });
        gsap.set(transitionGallerySceneRef.current, { autoAlpha: 1 });
        gsap.set([transitionContentRef.current, transitionLogoRef.current], {
          autoAlpha: 1,
          clearProps: "transform",
        });
        gsap.set(transitionBlurSegments, {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
        });
        gsap.set(transitionGalleryPanels, {
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          yPercent: 0,
        });
        gsap.set(transitionTrackRef.current, { xPercent: 0 });
        gsap.set(aboutSideBarRef.current, { autoAlpha: 1, xPercent: 0 });
        gsap.set(proofVerticalTrackRef.current, { yPercent: 0 });
        gsap.set(trainingSceneRef.current, { autoAlpha: 0 });
        gsap.set(testimonialsIntroRef.current, { autoAlpha: 1 });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-intro-copy]") ?? [], {
          autoAlpha: 1,
          filter: "blur(0px)",
          clipPath: "none",
          clearProps: "transform",
        });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-masked-heading-word]") ?? [], {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          rotateZ: 0,
          filter: "blur(0px)",
        });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-intro-detail]") ?? [], {
          autoAlpha: 1,
          filter: "blur(0px)",
          clearProps: "transform",
        });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-fold-piece]") ?? [], {
          opacity: 1,
          rotateX: 0,
          "--fold-crease": 0,
        });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-about-pillar]") ?? [], {
          autoAlpha: 1,
          clipPath: "none",
          clearProps: "transform",
        });
        gsap.set(trainingCards, {
          autoAlpha: 0,
          clearProps: "transform",
        });
        gsap.set(trainingBackdrop, { autoAlpha: 0, clipPath: "none", clearProps: "transform" });
        gsap.set(feedbackCards, {
          autoAlpha: 1,
          scale: 1,
          clearProps: "transform",
        });
        gsap.set(feedbackTrack, { clearProps: "transform" });
        gsap.set(feedbackLanes, { clearProps: "transform" });
        gsap.set(feedbackCopy, {
          autoAlpha: 1,
          clearProps: "transform,filter",
        });
        gsap.set([transitionLineRef.current, transitionPanelRef.current], { autoAlpha: 0 });
        gsap.set(frame, { borderColor: "rgba(255,255,255,0.2)" });

        const reducedTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "32% center",
          onEnter: () => {
            gsap.set(currentSceneRef.current, { autoAlpha: 0 });
            gsap.set(methodRef.current, { autoAlpha: 1 });
          },
          onLeaveBack: () => {
            gsap.set(currentSceneRef.current, { autoAlpha: 1 });
            gsap.set(methodRef.current, { autoAlpha: 0 });
          },
        });

        const reducedTransitionTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "76% center",
          onEnter: () => {
            gsap.set(methodRef.current, { autoAlpha: 0 });
            gsap.set(transitionPanelRef.current, {
              autoAlpha: 1,
              scaleX: 1,
              scaleY: 1,
              transformOrigin: "50% 50%",
            });
            gsap.set(transitionOverlayRef.current, { autoAlpha: 1 });
            gsap.set(transitionGallerySceneRef.current, { autoAlpha: 1 });
            gsap.set(transitionTrackRef.current, { xPercent: 0 });
          },
          onLeaveBack: () => {
            gsap.set(methodRef.current, { autoAlpha: 1 });
            gsap.set(transitionPanelRef.current, {
              autoAlpha: 0,
              scaleY: 0.002,
              transformOrigin: "50% 50%",
            });
            gsap.set(transitionOverlayRef.current, { autoAlpha: 0 });
            gsap.set(transitionGallerySceneRef.current, { autoAlpha: 1 });
            gsap.set(transitionTrackRef.current, { xPercent: 0 });
          },
        });

        const reducedHorizontalTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "84% center",
          onEnter: () => {
            gsap.set(transitionTrackRef.current, { xPercent: -50 });
          },
          onLeaveBack: () => {
            gsap.set(transitionGallerySceneRef.current, { autoAlpha: 1 });
            gsap.set(transitionTrackRef.current, { xPercent: 0 });
          },
        });

        const reducedVideosTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "88% center",
          onEnter: () => {
            gsap.set(testimonialsIntroRef.current, { autoAlpha: 0 });
            gsap.set(aboutSideBarRef.current, { autoAlpha: 0, xPercent: -100 });
            gsap.set(trainingSceneRef.current, { autoAlpha: 1 });
            gsap.set(trainingBackdrop, { autoAlpha: 1, scale: 1 });
            gsap.set(trainingCards, { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform" });
          },
          onLeaveBack: () => {
            gsap.set(testimonialsIntroRef.current, { autoAlpha: 1, clearProps: "transform" });
            gsap.set(aboutSideBarRef.current, { autoAlpha: 1, xPercent: 0 });
            gsap.set(trainingSceneRef.current, { autoAlpha: 0 });
            gsap.set(trainingBackdrop, { autoAlpha: 0, clearProps: "transform" });
            gsap.set(trainingCards, { autoAlpha: 0, clearProps: "transform" });
          },
        });

        const reducedFeedbackCardsTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "93% center",
          onEnter: () => {
            gsap.set(proofVerticalTrackRef.current, { yPercent: -50 });
            gsap.set(trainingSceneRef.current, { autoAlpha: 0 });
            gsap.set(trainingCards, { autoAlpha: 0 });
            gsap.set(feedbackCards, { autoAlpha: 1, y: 0, scale: 1 });
            gsap.set(feedbackCopy, { autoAlpha: 1, clearProps: "transform,filter" });
          },
          onLeaveBack: () => {
            gsap.set(proofVerticalTrackRef.current, { yPercent: 0 });
            gsap.set(trainingSceneRef.current, { autoAlpha: 1 });
            gsap.set(trainingCards, { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform" });
            gsap.set(feedbackCards, { autoAlpha: 0, clearProps: "transform" });
            gsap.set(feedbackCopy, { autoAlpha: 0, clearProps: "transform,filter" });
          },
        });

        return () => {
          reducedTrigger.kill();
          reducedTransitionTrigger.kill();
          reducedHorizontalTrigger.kill();
          reducedVideosTrigger.kill();
          reducedFeedbackCardsTrigger.kill();
        };
      });

      // ─────────────────────────────────────────────────────────────
      // Contexto Mobile (< 768px): Fluxo Natural (Opção A)
      // Rolagem nativa sem pinning. Revelações suaves por seção.
      // ─────────────────────────────────────────────────────────────
      media.add("(max-width: 767px)", () => {
        const blurSegments = contentRef.current?.querySelectorAll("[data-blur-segment]") ?? [];
        const interfaceElements = contentRef.current?.querySelectorAll("[data-hero-ui]") ?? [];
        const frame = contentRef.current?.querySelector("[data-hero-frame]");

        gsap.set([textureRef.current, vignetteRef.current], { autoAlpha: 1 });
        gsap.set(blurSegments, { filter: "blur(0px)", opacity: 1, y: 0 });
        gsap.set(interfaceElements, { opacity: 1, y: 0 });
        if (frame) gsap.set(frame, { borderColor: "rgba(255,255,255,0.2)" });

        // Estado inicial de visibilidade limpa para os componentes em fluxo normal
        gsap.set(
          [
            methodRef.current,
            transitionOverlayRef.current,
            transitionContentRef.current,
            testimonialsIntroRef.current,
            trainingSceneRef.current,
            feedbackSceneRef.current,
          ],
          { autoAlpha: 1, clearProps: "transform,filter" }
        );

        // Cards de estatísticas de resultado
        const statsCards = methodRef.current?.querySelectorAll("[data-result-stat]") ?? [];
        gsap.set(statsCards, { autoAlpha: 1, y: 0, scale: 1, filter: "none", clearProps: "transform,filter" });
        gsap.set(methodRef.current?.querySelectorAll("[data-fold-piece]") ?? [], { opacity: 1, rotateX: 0, "--fold-crease": 0 });
        gsap.set(methodRef.current?.querySelectorAll("[data-method-subtitle]") ?? [], { autoAlpha: 1, y: 0, filter: "none" });

        // Galeria e Sobre Mim
        const galleryPanels = transitionGallerySceneRef.current?.querySelectorAll("[data-gallery-split-panel]") ?? [];
        gsap.set(galleryPanels, { opacity: 1, clipPath: "none", clearProps: "transform" });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-intro-copy]") ?? [], { autoAlpha: 1, clearProps: "transform,clipPath" });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-masked-heading-word]") ?? [], { autoAlpha: 1, y: 0, filter: "none", clearProps: "transform" });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-fold-piece]") ?? [], { opacity: 1, rotateX: 0, "--fold-crease": 0 });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-intro-detail]") ?? [], { autoAlpha: 1, y: 0, filter: "none" });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-about-pillar]") ?? [], { autoAlpha: 1, y: 0, clipPath: "none" });

        // Vídeos de treino
        const trainingCards = trainingSceneRef.current?.querySelectorAll("[data-training-card]") ?? [];
        const trainingControls = trainingSceneRef.current?.querySelectorAll("[data-training-control]") ?? [];
        gsap.set(trainingCards, { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform" });
        gsap.set(trainingControls, { autoAlpha: 1, clearProps: "transform" });

        // Feedbacks
        const feedbackCards = feedbackSceneRef.current?.querySelectorAll("[data-feedback-card]") ?? [];
        const feedbackLanes = feedbackSceneRef.current?.querySelectorAll("[data-feedback-lane]") ?? [];
        const feedbackWords = feedbackSceneRef.current?.querySelectorAll("[data-feedback-heading] [data-cinematic-word]") ?? [];
        gsap.set(feedbackCards, { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform" });
        gsap.set(feedbackLanes, { autoAlpha: 1, y: 0, clearProps: "transform" });
        gsap.set(feedbackWords, { autoAlpha: 1, y: 0, yPercent: 0, clearProps: "transform" });
        gsap.set(feedbackSceneRef.current?.querySelectorAll("[data-feedback-copy]") ?? [], { autoAlpha: 1, y: 0, filter: "none", clearProps: "transform" });

        // Revelações suaves baseadas em entrada na viewport (sem cálculos a cada frame de scroll)
        const revealTargets = [
          methodRef.current,
          transitionContentRef.current,
          testimonialsIntroRef.current,
          trainingSceneRef.current,
          feedbackSceneRef.current,
        ];

        const triggers: ScrollTrigger[] = [];
        revealTargets.forEach((target) => {
          if (!target) return;
          const st = ScrollTrigger.create({
            trigger: target,
            start: "top 92%",
            once: true,
            onEnter: () => {
              gsap.fromTo(
                target,
                { autoAlpha: 0, y: 22 },
                { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out", clearProps: "transform" }
              );
            },
          });
          triggers.push(st);
        });

        return () => {
          triggers.forEach((st) => st.kill());
        };
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative h-[1040svh] bg-brand-black lg:h-[1160svh]"
    >
      <span id="resultados" className="pointer-events-none absolute top-[35%]" aria-hidden="true" />
      <span id="campeonatos" className="pointer-events-none absolute top-[76%]" aria-hidden="true" />
      <span id="sobre" className="pointer-events-none absolute top-[85%]" aria-hidden="true" />
      <span id="treinos" className="pointer-events-none absolute top-[90%]" aria-hidden="true" />
      <span id="depoimentos" className="pointer-events-none absolute top-[94%]" aria-hidden="true" />
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:pb-20 lg:pt-32">
        <div ref={logoRef} className="hero-logo-backdrop pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
          <Image
            src="/assets/hoop-master-logo.png"
            data-opening-asset="logo"
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-contain px-[3vw] py-28 sm:px-[10vw] sm:py-20 lg:px-[16vw]"
          />
        </div>
        <div ref={logoLightRef} className="hero-logo-light pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div className="hero-logo-light-core" />
        </div>
        <div ref={textureRef} className="absolute inset-0 z-[2] opacity-0 mix-blend-screen">
          <DotField />
        </div>
        <div ref={vignetteRef} className="hero-dot-vignette pointer-events-none absolute inset-0 z-[3] opacity-0" />

      <div ref={currentSceneRef} data-hero-scene className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-12">
        <div ref={contentRef} className="relative z-20 max-w-4xl pt-6 lg:pt-0">
          <div data-hero-ui className="mb-7 flex translate-y-6 items-center gap-4 opacity-0">
            <span className="h-px w-10 bg-brand-red" />
            <p className="max-w-[15rem] text-[0.62rem] font-black uppercase leading-5 tracking-[0.22em] text-white/60 sm:max-w-none sm:text-[0.66rem] sm:tracking-[0.26em]">
              <BlurText text="Hoop Master / Performance esportiva" controlled />
            </p>
          </div>

            <h1 className="max-w-4xl font-heading text-[clamp(2.9rem,13vw,3.35rem)] font-black uppercase leading-[0.82] tracking-[-0.06em] text-white sm:text-[clamp(3.7rem,8.3vw,8.5rem)] sm:leading-[0.79] sm:tracking-[-0.065em]">
              <BlurText text="Treine." controlled />
              <br />
              <span className="text-brand-red">
                <BlurText text="Evolua." controlled />
              </span>
              <br />
              <span className="outline-text">
                <BlurText text="Domine." controlled />
              </span>
            </h1>

            <div data-hero-frame className="mt-9 grid max-w-2xl gap-7 border-l border-transparent pl-5 sm:grid-cols-[1fr_auto] sm:items-end sm:pl-7">
              <p className="max-w-md text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
                <BlurText
                  text="Treino de alta performance para transformar fundamento em resultado."
                  controlled
                />
              </p>
              <div data-hero-ui className="flex translate-y-6 flex-wrap gap-3 opacity-0">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 bg-brand-red px-5 py-4 text-[0.68rem] font-black uppercase tracking-[0.15em] text-white transition-colors hover:bg-brand-redDark"
                >
                  <ShinyText text="Quero elevar meu jogo" speed={3.8} />
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div ref={photoGlowRef} className="hero-photo-glow pointer-events-none absolute -inset-10 opacity-0" />
            <div
              ref={photoRef}
              className="hero-photo-frame relative ml-auto aspect-[4/5] max-h-[72svh] w-full max-w-[31rem] overflow-hidden opacity-0"
            >
              <Image
                src="/assets/coach-2.jpg"
                data-opening-asset="coach"
                loading="eager"
                alt="Coach Rafael Melo à beira da quadra"
                fill
                sizes="(max-width: 1024px) 0px, 42vw"
                className="scale-[1.06] object-cover object-[48%_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-black/10" />
              <div className="absolute inset-0 bg-brand-red/10 mix-blend-color" />
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between border-t border-white/35 pt-4">
                <div>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-white/60">Coach</p>
                  <p className="mt-1 font-heading text-xl font-black uppercase tracking-tight text-white">Rafael Melo</p>
                </div>
                <ShinyText
                  text="Performance"
                  color="rgba(255,255,255,0.55)"
                  shineColor="#ffffff"
                  className="text-[0.58rem] font-bold uppercase tracking-[0.18em]"
                  speed={4.8}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          ref={methodRef}
          data-results-scene
          className="invisible absolute inset-0 z-20 flex items-center px-5 opacity-0 sm:px-8 lg:px-12"
        >
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="flex flex-col gap-5 border-b border-white/10 pb-8 mb-8 lg:pb-12 lg:mb-12">
              <div className="order-2 mt-2">

                <p
                  data-method-subtitle
                  className="max-w-xl text-base sm:text-lg font-medium leading-relaxed text-white/60"
                >
                  Não é promessa. É evolução construída atleta por atleta.
                </p>
              </div>
              <h2 className="order-1 font-heading text-[clamp(2.55rem,5.55vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.055em] text-white">
                <FoldText
                  lines={["Formando atletas", "Construindo legados"]}
                  lineClassNames={["text-white", "text-brand-red"]}
                />
              </h2>
            </div>

            <div className="result-metrics-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {desktopStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <TiltCard key={stat.number} className="h-full w-full">
                    <article
                      data-result-stat
                      className="result-metric-card group w-full h-full"
                    >
                      <div className="result-metric-card__header">
                        <span className="result-metric-card__icon-wrap">
                          <Icon className="result-metric-card__icon" />
                        </span>
                      </div>
                      <div className="result-metric-card__rule" aria-hidden="true"><span /></div>
                      <p className="result-metric-card__value">
                        <VariableProximity
                          label={stat.value}
                          containerRef={methodRef}
                          fromWeight={620}
                          toWeight={900}
                          radius={150}
                        />
                      </p>
                      <h3 className="result-metric-card__title">
                        {stat.title}
                      </h3>
                      <p className="result-metric-card__description">{stat.description}</p>
                    </article>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </div>

        <div
          ref={transitionLineRef}
          className="invisible absolute left-0 top-1/2 z-[35] h-[2px] w-full origin-center bg-brand-red opacity-0 shadow-[0_0_28px_rgba(255,26,26,0.82)]"
          aria-hidden="true"
        />

        <div
          ref={transitionPanelRef}
          className="transition-screen invisible absolute inset-0 z-30 bg-brand-red opacity-0"
          style={{ transform: "scale(0, 0.002)", transformOrigin: "50% 50%" }}
          aria-hidden="true"
        />

      <div ref={transitionOverlayRef} data-story-overlay className="invisible absolute inset-0 z-[31] overflow-hidden opacity-0">
        <div ref={transitionTrackRef} data-story-track className="flex h-full w-[200vw] will-change-transform">
          <div
            ref={transitionGallerySceneRef}
            data-gallery-scene
            className="relative h-full w-screen shrink-0 overflow-hidden bg-brand-red"
          >


              <div ref={transitionLogoRef} className="pointer-events-none absolute inset-0 opacity-0" aria-hidden="true">
                <Image
                  src="/assets/hoop-master-logo.png"
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-contain p-[10vw] brightness-0 invert"
                />
              </div>
              <div className="transition-screen-grid pointer-events-none absolute inset-0" aria-hidden="true" />

              <div ref={transitionContentRef} className="relative z-10 flex h-full items-center px-5 py-8 opacity-0 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                <div className="mx-auto w-full max-w-[1440px]">
                  <h2
                    data-transition-blur
                    className="mb-5 max-w-[15ch] font-heading text-[clamp(2.15rem,4.7vw,5rem)] font-black uppercase leading-[0.84] tracking-[-0.06em] text-white sm:mb-7"
                  >
                    <BlurText text="O treino" controlled />{" "}
                    <BlurText text="aparece" controlled className="text-brand-black" />{" "}
                    <BlurText text="no jogo" controlled className="text-brand-black" />
                  </h2>

                  <AccordionGallery
                    items={campGalleryItems}
                    height={400}
                    gap={12}
                    radius={20}
                    defaultIndex={0}
                    expandRatio={0.52}
                    tilt={3}
                    parallax={0.3}
                    accentColor="#ffffff"
                    overlayColor="#070707"
                    textColor="#ffffff"
                  />
                </div>
              </div>
            </div>

          <div data-about-stage className="about-red-stage relative h-full w-screen shrink-0 overflow-hidden">
            {/* Slanted red transition from previous screen */}
            <div
              ref={aboutSideBarRef}
              className="absolute bottom-0 left-0 top-0 z-10 w-[12vw] bg-brand-red [clip-path:polygon(0_0,100%_0,0_100%)] pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative h-full w-full overflow-hidden">

              <div ref={testimonialsIntroRef} data-about-scene className="invisible absolute inset-0 z-20 flex items-center px-5 opacity-0 sm:px-8 lg:px-12">
                <div className="about-rafael-panel relative mx-auto w-full max-w-[1440px]">
                  <div className="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2 opacity-[0.05] mix-blend-screen select-none" aria-hidden="true">
                    <Image
                      src="/assets/hoop-master-logo.png"
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-[clamp(25rem,45vw,55rem)] object-contain"
                    />
                  </div>
                  <div data-intro-detail className="relative pb-3 sm:pb-4 flex items-center">
                    {/* Elementos decorativos de velocidade */}
                    <div className="flex space-x-1 mr-3">
                      <span className="h-4 w-1 bg-brand-red -skew-x-[15deg] opacity-30"></span>
                      <span className="h-4 w-1 bg-brand-red -skew-x-[15deg] opacity-60"></span>
                      <span className="h-4 w-1.5 bg-brand-red -skew-x-[15deg]"></span>
                    </div>
                    {/* Bloco inclinado com estilo premium */}
                    <div className="relative inline-flex items-center justify-center border border-brand-red/30 bg-black/40 px-4 py-1.5 -skew-x-[15deg] backdrop-blur-md shadow-lg">
                      <div className="absolute top-0 left-0 w-3 h-[2px] bg-brand-red"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-[2px] bg-brand-red"></div>
                      <span className="text-[0.65rem] font-black uppercase tracking-[0.25em] text-white skew-x-[15deg] drop-shadow-md">Sobre mim</span>
                    </div>
                  </div>

                  <div className="relative mt-5 flex flex-col-reverse items-center gap-6 sm:mt-7 lg:grid lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 xl:gap-20">
                    <div className="flex items-center justify-center lg:justify-start lg:translate-y-8">
                      <TiltCard className="huddle-photo-frame relative w-full max-w-[24rem] sm:w-72 lg:w-full lg:max-w-[23rem] xl:max-w-[25rem]">
                        <figure
                          data-intro-copy
                          className="huddle-photo-media relative aspect-[16/9] w-full overflow-hidden sm:aspect-[1170/1548]"
                        >
                          <div className="absolute inset-0 h-full w-full bg-[#0d0d0d]">
                            <Image
                              src="/assets/results-huddle.jpeg"
                              alt="Rafael Melo orientando uma equipe de basquete durante a partida"
                              fill
                              sizes="(min-width: 1280px) 400px, (min-width: 1024px) 368px, (min-width: 640px) 288px, 100vw"
                              className="about-profile-image pointer-events-none object-cover object-[50%_62%] sm:object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/[0.04]" aria-hidden="true" />
                            <div className="huddle-card-glare absolute inset-0" aria-hidden="true" />
                          </div>
                        </figure>
                      </TiltCard>
                    </div>

                    <article className="min-w-0">
                      <div data-intro-detail className="mb-3 inline-flex bg-white px-3 py-1.5 text-[0.56rem] font-black uppercase tracking-[0.26em] text-black sm:mb-4 sm:text-[0.62rem]">
                        <FoldText lines={["Preparador físico · Performance esportiva"]} className="[&_.fold-text-line]:inline" />
                      </div>
                      <MaskedHeading
                        lines={[{ text: "Rafael Melo", className: "text-white" }]}
                        className="font-heading text-[clamp(2.45rem,3.9vw,4.35rem)] font-black uppercase leading-[0.9] tracking-[-0.055em]"
                      />

                      <div className="mt-4 max-w-[31ch] font-heading text-[clamp(1.1rem,1.7vw,1.65rem)] font-bold leading-[1.08] tracking-[-0.025em] text-white sm:mt-5">
                        <FoldText lines={["Preparo atletas para", "entregar o melhor", "quando o jogo", "mais exige."]} />
                      </div>

                      <div className="mt-5 max-w-[52rem] sm:mt-6">
                        <div data-intro-detail className="space-y-3 text-[0.95rem] leading-relaxed text-white sm:text-[1.1rem] sm:leading-[1.7]">
                          <p>
                            <FoldText lines={["Esqueça os treinos genéricos de academia. O basquete exige um corpo que suporte contato, saltos repetidos e mudanças bruscas de direção. Meu trabalho aqui é construir a sua base atlética para você jogar mais duro, cansar menos e passar a temporada inteira sem se machucar."]} className="[&_.fold-text-line]:inline" />
                          </p>
                        </div>
                      </div>

                      <ul className="mt-8 flex flex-col gap-3 sm:mt-10">
                        {[
                          "Potência e Explosão",
                          "Resistência de Jogo",
                          "Prevenção de Lesões"
                        ].map((label, i) => (
                          <li key={i} data-about-pillar className="flex items-center gap-3">
                            <span className="about-performance-marker h-2 w-2 shrink-0 rounded-none bg-brand-red" />
                            <span className="font-heading text-[0.85rem] font-black uppercase tracking-[0.04em] text-white sm:text-base">
                              <FoldText lines={[label]} className="[&_.fold-text-line]:inline" />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                </div>
              </div>

              <div ref={proofVerticalTrackRef} data-proof-track className="absolute inset-x-0 top-0 z-30 h-[200%] w-full will-change-transform">
                <div ref={trainingSceneRef} data-training-scene className="invisible relative flex h-1/2 w-full items-center overflow-hidden px-5 py-8 opacity-0 sm:px-8 lg:px-12 lg:py-10">
                  <div data-training-backdrop className="training-backdrop-surface pointer-events-none invisible absolute inset-0 opacity-0" aria-hidden="true">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.045]">
                      Evolução
                    </div>
                  </div>
                  <div className="relative z-10 mx-auto w-full max-w-[1380px]">
                    <TrainingShowcase />
                  </div>
                </div>

                <div ref={feedbackSceneRef} data-feedback-scene className="pointer-events-none relative h-1/2 w-full overflow-hidden">
                  <Testimonials />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <a
          ref={exploreRef}
          href="#resultados"
          className="absolute bottom-5 left-5 z-20 hidden translate-y-6 items-center gap-3 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-white/40 opacity-0 transition-colors hover:text-white md:flex lg:left-12"
        >
          Explore
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20">
            <ArrowDown className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
    </section>
  );
}
