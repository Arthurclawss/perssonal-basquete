"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, ArrowDown, ArrowUpRight, Brain, Shield, Target } from "lucide-react";
import AccordionGallery from "./AccordionGallery";
import BlurText from "./BlurText";
import DotField from "./DotField";
import FoldText from "./FoldText";
import MaskedHeading from "./MaskedHeading";
import ShinyText from "./ShinyText";
import SpotlightCard from "./SpotlightCard";
import Testimonials from "./Testimonials";
import TrainingShowcase from "./TrainingShowcase";
import VariableProximity from "./VariableProximity";
import TiltCard from "./TiltCard";

const instagramUrl = "https://www.instagram.com/coachrafaelmelo/";

const resultStats = [
  {
    number: "01",
    value: "10+",
    title: "Anos de experiência",
    description: "Uma década transformando treino em performance.",
    icon: Target,
  },
  {
    number: "02",
    value: "500+",
    title: "Atletas desenvolvidos",
    description: "Diferentes níveis. O mesmo compromisso com a evolução.",
    icon: Brain,
  },
  {
    number: "03",
    value: "Vários",
    title: "Títulos estaduais",
    description: "Trabalho que já se transformou em conquista.",
    icon: Activity,
  },
  {
    number: "04",
    value: "01",
    title: "Objetivo",
    description: "Elevar o nível de cada atleta que entra em quadra.",
    icon: Shield,
  },
];

const campGalleryItems = [
  {
    src: "/assets/camps/camp-01.jpg",
    label: "Campeonato 01",
    alt: "Equipe de basquete reunida com medalhas e troféus",
    objectPosition: "50% 54%",
  },
  {
    src: "/assets/camps/camp-02.jpeg",
    label: "Campeonato 02",
    alt: "Equipe de basquete de uniforme verde reunida com medalhas",
    objectPosition: "50% 70%",
  },
  {
    src: "/assets/camps/camp-03.jpg",
    label: "Campeonato 03",
    alt: "Equipe de basquete alinhada na quadra com medalhas",
    objectPosition: "50% 50%",
  },
  {
    src: "/assets/camps/camp-04.jpg",
    label: "Campeonato 04",
    alt: "Equipe de basquete reunida diante do painel da competição",
    objectPosition: "50% 44%",
  },
  {
    src: "/assets/camps/camp-05.jpg",
    label: "Campeonato 05",
    alt: "Grupo de atletas e comissão técnica reunidos na quadra",
    objectPosition: "50% 48%",
  },
];

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
  const testimonialsIntroRef = useRef<HTMLDivElement>(null);
  const trainingSceneRef = useRef<HTMLDivElement>(null);
  const feedbackSceneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
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
        const feedbackCopy =
          feedbackSceneRef.current?.querySelectorAll("[data-feedback-copy]") ?? [];
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
        gsap.set(transitionLineRef.current, {
          autoAlpha: 0,
          scaleX: 0,
          transformOrigin: "50% 50%",
          force3D: true,
        });
        gsap.set(transitionPanelRef.current, {
          autoAlpha: 0,
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
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-intro-copy]") ?? [], {
          autoAlpha: 0,
          x: -88,
          y: 28,
          scale: 0.9,
          rotateY: -14,
          rotateZ: -1.2,
          filter: "blur(22px)",
          clipPath: "inset(0 32% 0 0 round 2.6rem 0.65rem 4.8rem 0.65rem)",
          transformPerspective: 1100,
          transformOrigin: "0% 60%",
          force3D: true,
        });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-masked-heading-word]") ?? [], {
          autoAlpha: 0,
          yPercent: 128,
          rotateX: -64,
          rotateZ: (index) => (index % 2 === 0 ? 2.5 : -1.5),
          filter: "blur(12px)",
          transformPerspective: 900,
          transformOrigin: "0% 100%",
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
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-about-line]") ?? [], {
          scaleX: 0,
          transformOrigin: "0% 50%",
        });
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-about-pillar]") ?? [], {
          autoAlpha: 0,
          y: 22,
          clipPath: "inset(0 100% 0 0)",
          force3D: true,
        });
        gsap.set(trainingCards, {
          autoAlpha: 0,
          yPercent: (index) => [72, 88, 78][index] ?? 78,
          force3D: true,
        });
        gsap.set(trainingBackdrop, {
          autoAlpha: 0,
          scale: 1.025,
          clipPath: "inset(48% 0 48% 0)",
          force3D: true,
        });
        gsap.set(feedbackCards, {
          autoAlpha: 0,
          yPercent: (index) => [72, 88][index] ?? 78,
          force3D: true,
        });
        gsap.set(feedbackCopy, {
          autoAlpha: 0,
          y: 96,
          filter: "blur(14px)",
          force3D: true,
        });

        gsap.to(logoLightRef.current?.querySelector(".hero-logo-light-core") ?? null, {
          scale: 1.1,
          rotate: 3,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 2.2,
          },
        });

        timeline
          .to({}, { duration: 0.3 })
          .to(logoRef.current, { opacity: 0.3, scale: 1.04, duration: 0.9, ease: "power2.out" }, 0.3)
          .to(logoLightRef.current, { opacity: 0.28, duration: 0.92, ease: "power2.out" }, 0.3)
          .to(textureRef.current, { autoAlpha: 1, duration: 0.96, ease: "power2.out" }, 0.42)
          .to(vignetteRef.current, { autoAlpha: 1, duration: 0.9, ease: "power2.out" }, 0.5)
          .to(
            blurSegments,
            {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              duration: 1.08,
              stagger: 0.055,
              ease: "power2.out",
            },
            0.62,
          )
          .to(frame, { borderColor: "rgba(255,255,255,0.2)", duration: 0.78, ease: "power2.out" }, 0.82)
          .to(
            photoRef.current,
            {
              autoAlpha: 1,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              scale: 1,
              rotate: 0,
              duration: 1.42,
              ease: "power2.inOut",
            },
            0.72,
          )
          .to(photoGlowRef.current, { opacity: 1, scale: 1, duration: 1.08, ease: "power2.out" }, 0.9)
          .to(interfaceElements, { opacity: 1, y: 0, duration: 0.86, stagger: 0.14, ease: "power2.out" }, 1.02)
          .to(exploreRef.current, { opacity: 1, y: 0, duration: 0.62, ease: "power2.out" }, 1.58)
          .to({}, { duration: 0.72 })
          .to(
            currentSceneRef.current,
            { autoAlpha: 0, y: -72, scale: 0.96, filter: "blur(14px)", duration: 0.62, ease: "power3.inOut" },
          )
          .to(exploreRef.current, { opacity: 0, duration: 0.2 }, "<")
          .to(
            methodRef.current,
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.78, ease: "power4.out" },
            "-=0.18",
          )
          .to(
            methodRef.current?.querySelectorAll("[data-fold-piece]") ?? [],
            {
              opacity: 1,
              rotateX: 0,
              "--fold-crease": 0,
              duration: 0.62,
              stagger: 0.065,
              ease: "power3.out",
            },
            "-=0.56",
          )
          .from(
            methodRef.current?.querySelectorAll("[data-result-stat]") ?? [],
            { y: 60, opacity: 0, rotateX: -12, duration: 0.58, stagger: 0.09, ease: "power3.out" },
            "-=0.48",
          )
          .to({}, { duration: 0.72 })
          .to(
            transitionLineRef.current,
            {
              autoAlpha: 1,
              scaleX: 1,
              duration: 0.62,
              ease: "power3.inOut",
              force3D: true,
            },
          )
          .to({}, { duration: 0.16 })
          .set(transitionPanelRef.current, { autoAlpha: 1 })
          .to(
            transitionPanelRef.current,
            {
              scaleY: 1,
              duration: 1.35,
              ease: "power3.inOut",
              force3D: true,
            },
          )
          .to(transitionLineRef.current, { autoAlpha: 0, duration: 0.2, ease: "sine.out" }, "-=1.08")
          .to(transitionOverlayRef.current, { autoAlpha: 1, duration: 0.34, ease: "sine.out" }, "-=0.3")
          .to(
            transitionLogoRef.current,
            { autoAlpha: 0.18, scale: 1, rotate: 0, duration: 0.48, ease: "power2.out" },
            "-=0.3",
          )
          .to(
            transitionBlurSegments,
            {
              keyframes: [
                { filter: "blur(5px)", opacity: 0.5, y: 4, duration: 0.34 },
                { filter: "blur(0px)", opacity: 1, y: 0, duration: 0.5 },
              ],
              stagger: 0.075,
              ease: "power2.out",
            },
            "-=0.18",
          )
          .to(
            transitionGalleryPanels,
            {
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
              yPercent: 0,
              duration: 1.28,
              stagger: 0.12,
              ease: "power2.inOut",
              force3D: true,
            },
            "-=0.3",
          )
          .to({}, { duration: 0.78 })
          .to(
            transitionTrackRef.current,
            {
              xPercent: -50,
              duration: 1.85,
              ease: "power2.inOut",
              force3D: true,
            },
          )
          .to(transitionGallerySceneRef.current, { autoAlpha: 0, duration: 0.01 })
          .addLabel("introReveal")
          .to(
            testimonialsIntroRef.current?.querySelectorAll("[data-intro-copy]") ?? [],
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotateY: 0,
              rotateZ: 0,
              filter: "blur(0px)",
              clipPath: "inset(0 0% 0 0 round 2.6rem 0.65rem 4.8rem 0.65rem)",
              duration: 1.2,
              ease: "power4.out",
              force3D: true,
            },
            "introReveal",
          )
          .to(
            testimonialsIntroRef.current?.querySelectorAll("[data-masked-heading-word]") ?? [],
            {
              autoAlpha: 1,
              yPercent: 0,
              rotateX: 0,
              rotateZ: 0,
              filter: "blur(0px)",
              duration: 0.9,
              stagger: { amount: 0.3 },
              ease: "power4.out",
              force3D: true,
            },
            "introReveal",
          )
          .to(
            testimonialsIntroRef.current?.querySelectorAll("[data-intro-detail]") ?? [],
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1,
              stagger: 0.08,
              ease: "power3.out",
              force3D: true,
            },
            "introReveal+=0.2",
          )
          .to(
            testimonialsIntroRef.current?.querySelectorAll("[data-fold-piece]") ?? [],
            {
              opacity: 1,
              rotateX: 0,
              "--fold-crease": 0,
              duration: 1.1,
              stagger: { amount: 1.8 },
              ease: "power2.out",
            },
            "introReveal+=0.15",
          )
          .to(
            testimonialsIntroRef.current?.querySelectorAll("[data-about-line]") ?? [],
            {
              scaleX: 1,
              duration: 0.9,
              stagger: 0.08,
              ease: "power3.inOut",
            },
            "introReveal+=0.28",
          )
          .to(
            testimonialsIntroRef.current?.querySelectorAll("[data-about-pillar]") ?? [],
            {
              autoAlpha: 1,
              y: 0,
              clipPath: "inset(0 0% 0 0)",
              duration: 0.82,
              stagger: 0.08,
              ease: "power3.out",
              force3D: true,
            },
            "introReveal+=0.48",
          )
          .to({}, { duration: 1.5 })
          .addLabel("trainingOverlay")
          .addLabel("aboutExit", "trainingOverlay")
          .to(
            testimonialsIntroRef.current,
            {
              yPercent: -110,
              duration: 1.45,
              ease: "power2.inOut",
              force3D: true,
            },
            "aboutExit",
          )
          .to(
            testimonialsIntroRef.current,
            {
              autoAlpha: 0,
              duration: 0.75,
              ease: "power2.in",
            },
            "aboutExit+=0.35",
          )
          .addLabel("backgroundReveal", "aboutExit+=1.46")
          .to(
            trainingBackdrop,
            {
              autoAlpha: 1,
              scale: 1,
              clipPath: "inset(0% 0 0% 0)",
              duration: 0.62,
              ease: "power3.inOut",
              force3D: true,
            },
            "backgroundReveal",
          )
          .addLabel("videoSequence", "backgroundReveal+=0.9")
          .to(
            trainingCards,
            {
              yPercent: 0,
              duration: 2.35,
              stagger: 0.16,
              ease: "power2.out",
              force3D: true,
            },
            "videoSequence",
          )
          .to(
            trainingCards,
            {
              autoAlpha: 1,
              duration: 0.85,
              stagger: 0.12,
              ease: "power2.out",
            },
            "videoSequence",
          )
          .addLabel("videosExit", "videoSequence+=3.95")
          .to(
            trainingCards,
            {
              yPercent: (index) => [-225, -248, -232][index] ?? -230,
              duration: 3.6,
              stagger: 0.18,
              ease: "none",
              force3D: true,
            },
            "videosExit",
          )
          .to(
            trainingCards,
            {
              autoAlpha: 0,
              duration: 1.25,
              stagger: 0.12,
              ease: "power1.in",
            },
            "videosExit+=2.25",
          )
          .addLabel("feedbackOverlay", "videosExit+=1.45")
          .to(
            feedbackCards,
            {
              yPercent: 0,
              duration: 2.35,
              stagger: 0.16,
              ease: "power2.out",
              force3D: true,
            },
            "feedbackOverlay",
          )
          .to(
            feedbackCards,
            {
              autoAlpha: 1,
              duration: 0.85,
              stagger: 0.12,
              ease: "power2.out",
            },
            "feedbackOverlay",
          )
          .to(
            feedbackCopy,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 2.05,
              stagger: { amount: 0.3 },
              ease: "power3.out",
              force3D: true,
            },
            "feedbackOverlay",
          )
          .to({}, { duration: 2.2 });
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
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
        gsap.set(testimonialsIntroRef.current?.querySelectorAll("[data-about-line]") ?? [], {
          scaleX: 1,
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
          autoAlpha: 0,
          clearProps: "transform",
        });
        gsap.set(feedbackCopy, {
          autoAlpha: 0,
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
            gsap.set(transitionGallerySceneRef.current, { autoAlpha: 0 });
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
            gsap.set(trainingBackdrop, { autoAlpha: 1, scale: 1 });
            gsap.set(trainingCards, { autoAlpha: 1, yPercent: 0 });
          },
          onLeaveBack: () => {
            gsap.set(testimonialsIntroRef.current, { autoAlpha: 1, clearProps: "transform" });
            gsap.set(trainingBackdrop, { autoAlpha: 0, clearProps: "transform" });
            gsap.set(trainingCards, { autoAlpha: 0, clearProps: "transform" });
          },
        });

        const reducedFeedbackCardsTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "93% center",
          onEnter: () => {
            gsap.set(trainingCards, { autoAlpha: 0 });
            gsap.set(feedbackCards, { autoAlpha: 1, yPercent: 0 });
            gsap.set(feedbackCopy, { autoAlpha: 1, clearProps: "transform,filter" });
          },
          onLeaveBack: () => {
            gsap.set(trainingCards, { autoAlpha: 1, yPercent: 0 });
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

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative h-[1100svh] bg-brand-black lg:h-[1200svh]"
    >
      <span id="resultados" className="pointer-events-none absolute top-[22%]" aria-hidden="true" />
      <span id="sobre" className="pointer-events-none absolute top-[85%]" aria-hidden="true" />
      <span id="depoimentos" className="pointer-events-none absolute top-[92%]" aria-hidden="true" />
      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:pb-20 lg:pt-32">
      <div ref={logoRef} className="hero-logo-backdrop pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        <Image
          src="/assets/hoop-master-logo.png"
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
      <div ref={vignetteRef} className="hero-dot-vignette grain pointer-events-none absolute inset-0 z-[3] opacity-0" />

      <div ref={currentSceneRef} className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-12">
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
        className="invisible absolute inset-0 z-20 flex items-center px-5 opacity-0 sm:px-8 lg:px-12"
      >
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="grid gap-8 border-b border-white/20 pb-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-end lg:pb-10">
            <div>
              <span className="section-kicker text-brand-red">Resultados Hoop Master</span>
              <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">
                Não é promessa. É evolução construída atleta por atleta.
              </p>
            </div>
            <h2 className="font-heading text-[clamp(2.55rem,5.55vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.055em] text-white">
              <FoldText
                lines={["Formando atletas", "Construindo legados"]}
                lineClassNames={["text-white", "text-brand-red"]}
              />
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4">
            {resultStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <SpotlightCard
                  key={stat.number}
                  className="group min-h-44 border-b border-r border-white/15 p-4 sm:min-h-52 sm:p-6 lg:min-h-64 lg:border-b-0 lg:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-heading text-xs font-black tracking-[0.16em] text-brand-red">{stat.number}</span>
                    <Icon className="h-5 w-5 text-white/45 transition-colors group-hover:text-brand-red" strokeWidth={1.6} />
                  </div>
                  <p className="mt-8 font-heading text-[clamp(2.4rem,4vw,4.8rem)] font-black uppercase leading-none tracking-[-0.055em] text-white sm:mt-10">
                    <VariableProximity
                      label={stat.value}
                      containerRef={methodRef}
                      fromWeight={620}
                      toWeight={900}
                      radius={150}
                    />
                  </p>
                  <h3 className="mt-4 max-w-[12rem] font-heading text-base font-black uppercase leading-tight tracking-[-0.02em] text-white sm:text-lg">
                    {stat.title}
                  </h3>
                  <p className="mt-2 max-w-[15rem] text-xs leading-5 text-white/50 sm:text-sm">{stat.description}</p>
                </SpotlightCard>
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
        style={{ transform: "scaleY(0.002)", transformOrigin: "50% 50%" }}
        aria-hidden="true"
      />

      <div ref={transitionOverlayRef} className="invisible absolute inset-0 z-[31] overflow-hidden opacity-0">
        <div ref={transitionTrackRef} className="flex h-full w-[200vw] will-change-transform">
          <div
            ref={transitionGallerySceneRef}
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
                  gap={10}
                  radius={0}
                  defaultIndex={0}
                  expandRatio={0.52}
                  tilt={8}
                  parallax={0.5}
                  accentColor="#ffffff"
                  overlayColor="#070707"
                  textColor="#ffffff"
                />
              </div>
            </div>
          </div>

          <div className="about-red-stage relative h-full w-screen shrink-0 overflow-hidden">
            <div className="relative h-full w-full overflow-hidden">

              <div ref={testimonialsIntroRef} className="absolute inset-0 z-20 flex items-center px-5 sm:px-8 lg:px-12">
                <div className="about-rafael-panel relative mx-auto w-full max-w-[1440px]">
                  <div className="about-red-atmosphere__rafael pointer-events-none absolute -right-[8%] top-1/2 -translate-y-1/2 font-heading text-[clamp(8rem,20vw,20rem)] font-black uppercase leading-none tracking-[-0.09em]" aria-hidden="true">
                    Rafael
                  </div>
                  <div data-intro-detail className="relative pb-3 sm:pb-4">
                    <div className="inline-flex bg-brand-red px-3 py-1.5">
                      <span className="text-[0.6rem] font-black uppercase tracking-[0.25em] text-black">Sobre mim</span>
                    </div>
                  </div>

                  <div className="relative mt-5 grid items-center gap-6 sm:mt-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 xl:gap-20">
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

              <div ref={trainingSceneRef} className="absolute inset-0 z-10 flex items-center overflow-hidden px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
                <div data-training-backdrop className="training-backdrop-surface pointer-events-none invisible absolute inset-0 opacity-0" aria-hidden="true">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.022]">
                    Evolução
                  </div>
                </div>
                <div className="relative z-10 mx-auto w-full max-w-[1380px]">
                  <TrainingShowcase />
                </div>
              </div>

              <div ref={feedbackSceneRef} className="absolute inset-0 z-30 overflow-hidden">
                <Testimonials />
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
