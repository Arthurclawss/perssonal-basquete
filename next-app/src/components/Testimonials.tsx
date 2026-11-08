import Image from "next/image";
import { Quote } from "lucide-react";
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

function FeedbackCard({ feedback, hidden = false }: { feedback: Feedback; hidden?: boolean }) {
  return (
    <div data-feedback-card className="feedback-marquee__card">
      <a
        href={feedback.src}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto block w-full cursor-zoom-in"
        aria-label="Abrir mensagem em tamanho completo"
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : undefined}
      >
        <Image
          src={feedback.src}
          alt={hidden ? "" : feedback.alt}
          width={feedback.width}
          height={feedback.height}
          sizes="(max-width: 767px) 90vw, 22.5rem"
          className="h-auto w-full object-contain drop-shadow-2xl"
        />
      </a>
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
}: {
  items: Feedback[];
  direction: "up" | "down";
  duration: number;
  className?: string;
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
              <FeedbackCard key={`${copy}-${feedback.src}`} feedback={feedback} hidden={copy === 1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <div data-feedback-stage className="absolute inset-0 z-20 flex items-center overflow-hidden px-5 pb-8 pt-24 sm:px-8 lg:px-10 xl:px-12">
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
          <p data-feedback-copy data-feedback-subtitle className="mt-4 max-w-lg text-sm leading-6 text-white/55 sm:mt-5 sm:text-base sm:leading-7">
            Feedbacks recebidos durante o processo de preparação e desenvolvimento esportivo.
          </p>
        </div>

        <div
          data-feedback-grid
          className="feedback-marquee relative z-10 h-[46svh] min-h-0 overflow-hidden md:h-[68svh] xl:h-[84svh]"
        >
          <div
            data-feedback-track
            className="mx-auto grid h-full w-full max-w-[47rem] grid-cols-1 gap-5 md:grid-cols-2"
          >
            {/* Mobile: uma única coluna com todos os feedbacks */}
            <MarqueeLane items={feedbacks} direction="up" duration={48} className="md:hidden" />

            {/* Desktop: duas colunas independentes */}
            {feedbackColumns.map((column, index) => (
              <MarqueeLane
                key={index}
                items={column.items}
                direction={column.direction}
                duration={column.duration}
                className="hidden md:block"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
