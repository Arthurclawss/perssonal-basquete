"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import TrainingVideo from "./TrainingVideo";

const videos = [
  {
    src: "/assets/training-03-web.mp4?v=3",
    poster: "/assets/training-03-poster.png",
    eyebrow: "Resultado real",
    title: "Recorde pessoal e uma base mais forte",
  },
  {
    src: "/assets/training-01-web.mp4?v=3",
    poster: "/assets/training-01-poster.png",
    eyebrow: "Agilidade",
    title: "Resposta rápida em cada direção",
  },
  {
    src: "/assets/training-02-web.mp4?v=3",
    poster: "/assets/training-02-poster.png",
    eyebrow: "Preparação física",
    title: "Preparando o atleta para a temporada",
  },
];

export default function TrainingShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [idlePulse, setIdlePulse] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeVideo = videos[activeIndex];
  const prevIndex = (activeIndex - 1 + videos.length) % videos.length;
  const nextIndex = (activeIndex + 1) % videos.length;

  useEffect(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setIdlePulse(true), 3500);
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [activeIndex]);

  const showPrevious = () => {
    setIdlePulse(false);
    setDirection("prev");
    setActiveIndex((current) => (current - 1 + videos.length) % videos.length);
  };

  const showNext = () => {
    setIdlePulse(false);
    setDirection("next");
    setActiveIndex((current) => (current + 1) % videos.length);
  };

  const goToIndex = (index: number) => {
    if (index === activeIndex) return;
    setIdlePulse(false);
    setDirection(index > activeIndex ? "next" : "prev");
    setActiveIndex(index);
  };

  return (
    <div data-training-grid className="training-carousel">
      <div className="training-carousel__heading">
        <span data-training-heading-detail className="training-carousel__heading-line" aria-hidden="true" />
        <h2>
          <span data-training-heading-primary>Evolução</span>
          <span data-training-heading-detail className="training-carousel__heading-accent"> em movimento</span>
        </h2>
        <span data-training-heading-detail className="training-carousel__heading-line" aria-hidden="true" />
      </div>

      <div className="training-carousel__stage">
        {/* Glow behind active card */}
        <div data-training-control className="training-carousel__glow" aria-hidden="true" />

        <button
          type="button"
          data-training-control
          onClick={showPrevious}
          className={`training-carousel__arrow training-carousel__arrow--previous${idlePulse ? " training-carousel__arrow--pulse" : ""}`}
          aria-label="Ver vídeo anterior"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 12H5m6-6-6 6 6 6" />
          </svg>
        </button>

        {/* Previous ghost card */}
        <button
          type="button"
          data-training-control
          className="training-carousel__ghost training-carousel__ghost--prev"
          onClick={showPrevious}
          aria-label={`Ver: ${videos[prevIndex].title}`}
          tabIndex={-1}
        >
          <Image
            src={videos[prevIndex].poster}
            alt=""
            fill
            sizes="14vw"
            className="training-carousel__ghost-img"
          />
        </button>

        <div data-training-card className="training-carousel__card-shell">
          <article
            key={activeVideo.src}
            data-direction={direction}
            className="testimonial-video-card training-carousel__card group relative overflow-hidden border border-white/15 bg-brand-dark"
          >
            <TrainingVideo
              src={activeVideo.src}
              poster={activeVideo.poster}
              label={`${activeVideo.eyebrow}: ${activeVideo.title}`}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Video info overlay */}
            <div className="training-carousel__info">
              <span className="training-carousel__info-eyebrow">
                {activeVideo.eyebrow}
              </span>
              <p className="training-carousel__info-title">
                {activeVideo.title}
              </p>
            </div>
          </article>
        </div>

        {/* Next ghost card */}
        <button
          type="button"
          data-training-control
          className="training-carousel__ghost training-carousel__ghost--next"
          onClick={showNext}
          aria-label={`Ver: ${videos[nextIndex].title}`}
          tabIndex={-1}
        >
          <Image
            src={videos[nextIndex].poster}
            alt=""
            fill
            sizes="14vw"
            className="training-carousel__ghost-img"
          />
        </button>

        <button
          type="button"
          data-training-control
          onClick={showNext}
          className={`training-carousel__arrow training-carousel__arrow--next${idlePulse ? " training-carousel__arrow--pulse" : ""}`}
          aria-label="Ver próximo vídeo"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 12h15m-6-6 6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Progress indicators */}
      <div data-training-control className="training-carousel__indicators" role="tablist" aria-label="Selecionar vídeo">
        {videos.map((video, index) => (
          <button
            key={video.src}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Vídeo ${index + 1}: ${video.eyebrow}`}
            className={`training-carousel__indicator${index === activeIndex ? " training-carousel__indicator--active" : ""}`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
