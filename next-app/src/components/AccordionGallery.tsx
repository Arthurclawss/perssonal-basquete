"use client";

import Image from "next/image";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

export type AccordionGalleryItem = {
  src: string;
  alt: string;
  label: string;
  objectPosition?: string;
};

type AccordionGalleryProps = {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  mobileHeight?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: "horizontal" | "vertical";
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: "hover" | "click";
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
};

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  accentColor = "#ffffff",
  overlayColor = "#060010",
  textColor = "#ffffff",
  height = 420,
  mobileHeight = 380,
  gap = 10,
  radius = 0,
  expandRatio = 0.52,
  orientation = "horizontal",
  duration = 0.6,
  ease = "power3.out",
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = "hover",
  showLabels = true,
  grayscale = true,
  className = "",
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const textRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);
  const count = items.length;
  const safeDefaultIndex = Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0));
  const [active, setActive] = useState(safeDefaultIndex);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [responsiveVertical, setResponsiveVertical] = useState(false);
  const vertical = orientation === "vertical" || responsiveVertical;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 520px)");
    const updateOrientation = () => setResponsiveVertical(mediaQuery.matches);

    updateOrientation();
    mediaQuery.addEventListener("change", updateOrientation);
    return () => mediaQuery.removeEventListener("change", updateOrientation);
  }, []);

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const activeGrow = count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1;
      const mediaSize = mediaSizeRef.current;
      const animationDuration = animate && !prefersReducedMotion ? duration : 0;

      timelineRef.current?.kill();
      const timeline = gsap.timeline();

      panels.forEach((panel, index) => {
        if (!panel) return;

        const isActive = index === active;
        const media = mediaRefs.current[index];
        const bar = barRefs.current[index];
        const text = textRefs.current[index];
        const rotation = isActive ? 0 : index < active ? tilt : -tilt;
        const rotationProps = vertical
          ? { rotateX: -rotation }
          : { rotateY: rotation };

        timeline.to(
          panel,
          {
            flexGrow: isActive ? activeGrow : 1,
            ...rotationProps,
            duration: animationDuration,
            ease,
          },
          0,
        );

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - index));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;

          timeline.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              "--ag-gray": gray,
              "--ag-dim": isActive ? 0 : 0.35,
              duration: animationDuration,
              ease,
            },
            0,
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            timeline.to(
              [bar, text],
              {
                opacity: 1,
                x: 0,
                duration: animationDuration,
                ease,
                stagger: prefersReducedMotion ? 0 : stagger,
              },
              0,
            );
          } else {
            timeline.to(
              [bar, text],
              {
                opacity: 0,
                x: -14,
                duration: animationDuration * 0.6,
                ease,
              },
              0,
            );
          }
        }
      });

      timelineRef.current = timeline;
    },
    [
      active,
      count,
      duration,
      ease,
      expandRatio,
      grayscale,
      parallax,
      prefersReducedMotion,
      showLabels,
      stagger,
      tilt,
      vertical,
    ],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const rect = root.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const mediaSize = Math.max(140, usable * ratio * 1.22);

      mediaSizeRef.current = mediaSize;
      root.style.setProperty("--ag-media-size", `${mediaSize}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(root);
    return () => resizeObserver.disconnect();
  }, [applyLayout, count, expandRatio, gap, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      timelineRef.current?.kill();
    },
    [],
  );

  const activate = (index: number) => {
    if (trigger === "hover") setActive(index);
  };

  const moveFocus = (index: number) => {
    setActive(index);
    buttonRefs.current[index]?.focus();
  };

  if (!count) return null;

  const rootStyle = {
    "--ag-accent": accentColor,
    "--ag-overlay": overlayColor,
    "--ag-text": textColor,
    "--ag-gap": `${gap}px`,
    "--ag-radius": `${radius}px`,
    height: vertical
      ? `${responsiveVertical ? mobileHeight : Math.round(height * 1.6)}px`
      : `${height}px`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? " accordion-gallery--vertical" : ""}${className ? ` ${className}` : ""}`}
      style={rootStyle}
      role="group"
      aria-label="Galeria de campeonatos"
    >
      {items.map((item, index) => {
        const isActive = index === active;

        return (
          <div
            key={item.src}
            ref={(node) => {
              panelRefs.current[index] = node;
            }}
            className={`ag-panel-shell${isActive ? " ag-panel-shell--active" : ""}`}
          >
            <button
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              type="button"
              className="ag-panel"
              data-gallery-split-panel
              aria-label={`${item.label}: ${item.alt}`}
              aria-pressed={isActive}
              onClick={() => setActive(index)}
              onMouseEnter={() => activate(index)}
              onFocus={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  moveFocus((index + 1) % count);
                } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  moveFocus((index - 1 + count) % count);
                }
              }}
            >
              <span className="ag-panel__frame">
                <span
                  ref={(node) => {
                    mediaRefs.current[index] = node;
                  }}
                  className="ag-panel__media"
                >
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="(max-width: 520px) 100vw, 55vw"
                    className="ag-panel__image"
                    style={{ objectPosition: item.objectPosition ?? "50% 50%" }}
                    draggable={false}
                  />
                </span>
                <span className="ag-panel__overlay" aria-hidden="true" />
              </span>

              {showLabels ? (
                <span className="ag-panel__label" aria-hidden="true">
                  <span
                    ref={(node) => {
                      barRefs.current[index] = node;
                    }}
                    className="ag-panel__bar"
                  />
                  <span
                    ref={(node) => {
                      textRefs.current[index] = node;
                    }}
                    className="ag-panel__text"
                  >
                    {item.label}
                  </span>
                </span>
              ) : null}
            </button>
          </div>
        );
      })}
    </div>
  );
}
