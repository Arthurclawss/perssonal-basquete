"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, X } from "lucide-react";
import CinematicText from "./CinematicText";

type Feedback = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const feedbacks: Feedback[] = [
  {
    src: "/assets/testimonial-performance-cutout.png",
    alt: "Mensagem de WhatsApp relatando evolução de força, explosão, propriocepção e condicionamento físico",
    width: 788,
    height: 1049,
  },
  {
    src: "/assets/testimonial-mobility-cutout.png",
    alt: "Mensagens de WhatsApp relatando melhora de mobilidade, força, velocidade, potência e confiança",
    width: 814,
    height: 600,
  },
  {
    src: "/assets/testimonial-3-cutout.png",
    alt: "Feedback recebido no WhatsApp",
    width: 777,
    height: 616,
  },
  {
    src: "/assets/testimonial-5-cutout.png",
    alt: "Feedback recebido no WhatsApp",
    width: 746,
    height: 652,
  },
];

// Colunas equilibradas: a mais alta (depoimento longo + curto) ao lado de dois curtos.
const feedbackColumns = [
  { items: [feedbacks[0], feedbacks[3]], direction: "up" as const, duration: 38 },
  { items: [feedbacks[2], feedbacks[1]], direction: "down" as const, duration: 44 },
];

function FeedbackCard({
  feedback,
  hidden = false,
  onSelect,
}: {
  feedback: Feedback;
  hidden?: boolean;
  onSelect: (feedback: Feedback) => void;
}) {
  return (
    <div data-feedback-card className="feedback-marquee__card">
      <button
        type="button"
        onClick={() => onSelect(feedback)}
        className="group pointer-events-auto block w-full cursor-zoom-in text-left rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
        aria-label="Abrir feedback com maior destaque"
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : undefined}
      >
        <Image
          src={feedback.src}
          alt={hidden ? "" : feedback.alt}
          width={feedback.width}
          height={feedback.height}
          sizes="(max-width: 767px) 90vw, 22.5rem"
          className="h-auto w-full object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.025]"
        />
      </button>
    </div>
  );
}

/**
 * Coluna com rolagem infinita. O conteúdo é duplicado e o trilho anda 50%,
 * criando um loop sem emenda. Ao passar o mouse, só esta coluna pausa.
 */
function MarqueeLane({
  items,
  direction,
  duration,
  className = "",
  onSelect,
}: {
  items: Feedback[];
  direction: "up" | "down";
  duration: number;
  className?: string;
  onSelect: (feedback: Feedback) => void;
}) {
  return (
    <div data-feedback-lane className={`feedback-marquee__lane ${className}`.trim()}>
      <div
        className={`feedback-marquee__track feedback-marquee__track--${direction}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="feedback-marquee__group" aria-hidden={copy === 1 || undefined}>
            {items.map((feedback) => (
              <FeedbackCard
                key={`${copy}-${feedback.src}`}
                feedback={feedback}
                hidden={copy === 1}
                onSelect={onSelect}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [activeFeedback, setActiveFeedback] = useState<Feedback | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fechar no Esc e travar scroll enquanto o modal estiver aberto
  useEffect(() => {
    if (!activeFeedback) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveFeedback(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeFeedback]);

  return (
    <>
      <div
        data-feedback-stage
        className="absolute inset-0 z-20 flex items-center overflow-hidden px-5 pb-8 pt-24 sm:px-8 lg:px-10 xl:px-12"
      >
        <div className="mx-auto grid h-full w-full max-w-[1500px] content-center gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-center xl:gap-10 2xl:gap-14">
          <div className="relative z-20 max-w-[44rem] xl:-translate-y-3">
            <div data-feedback-copy data-feedback-accent>
              <Quote className="h-8 w-8 text-brand-red sm:h-10 sm:w-10" strokeWidth={1.4} />
            </div>
            <h2
              data-feedback-heading
              aria-label="Quando o atleta sente a diferença, o resultado deixa de ser promessa"
              className="mt-3 font-heading text-[clamp(1.85rem,3vw,3.6rem)] font-black uppercase leading-[0.92] tracking-[-0.045em] text-white sm:mt-5"
            >
              <CinematicText text="Quando o atleta sente a diferença, o resultado deixa de ser promessa" />
            </h2>
            <p
              data-feedback-copy
              data-feedback-subtitle
              className="mt-4 max-w-lg text-sm leading-6 text-white/55 sm:mt-5 sm:text-base sm:leading-7"
            >
              Feedbacks recebidos durante o processo de preparação e desenvolvimento esportivo.
            </p>
          </div>

          <div
            data-feedback-grid
            className={`feedback-marquee relative z-10 h-[46svh] min-h-0 overflow-hidden md:h-[68svh] xl:h-[84svh] ${
              activeFeedback ? "feedback-marquee--paused" : ""
            }`}
          >
            <div
              data-feedback-track
              className="mx-auto grid h-full w-full max-w-[47rem] grid-cols-1 gap-5 md:grid-cols-2"
            >
              {/* Mobile: uma única coluna com todos os feedbacks */}
              <MarqueeLane
                items={feedbacks}
                direction="up"
                duration={48}
                className="md:hidden"
                onSelect={setActiveFeedback}
              />

              {/* Desktop: duas colunas independentes */}
              {feedbackColumns.map((column, index) => (
                <MarqueeLane
                  key={index}
                  items={column.items}
                  direction={column.direction}
                  duration={column.duration}
                  className="hidden md:block"
                  onSelect={setActiveFeedback}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Lightbox montado direto no body via createPortal para escapar de transforms de ancestrais */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeFeedback && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                onClick={() => setActiveFeedback(null)}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md cursor-zoom-out"
                role="dialog"
                aria-modal="true"
                aria-label="Visualização do depoimento ampliado"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 12 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative flex flex-col items-center justify-center max-h-[92vh] max-w-[94vw] sm:max-w-md md:max-w-lg cursor-default select-none"
                >
                  {/* Botão de Fechar */}
                  <button
                    type="button"
                    onClick={() => setActiveFeedback(null)}
                    className="group absolute -top-12 right-0 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/75 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white/80 backdrop-blur-md transition-all hover:border-brand-red hover:bg-brand-red hover:text-white cursor-pointer shadow-lg"
                    aria-label="Fechar visualização"
                  >
                    <X className="h-4 w-4 transition-transform group-hover:rotate-90 duration-200" />
                    <span>Fechar</span>
                  </button>

                  {/* Card da mensagem ampliada em destaque */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-[#0a0a0c] p-2.5 sm:p-3.5 shadow-[0_20px_70px_rgba(0,0,0,0.95)] max-h-[85vh] flex items-center justify-center">
                    <Image
                      src={activeFeedback.src}
                      alt={activeFeedback.alt}
                      width={activeFeedback.width}
                      height={activeFeedback.height}
                      sizes="(max-width: 768px) 94vw, 540px"
                      className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl drop-shadow-2xl"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
