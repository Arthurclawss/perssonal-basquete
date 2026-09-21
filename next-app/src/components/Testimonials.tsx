import Image from "next/image";
import { ArrowUpRight, Quote } from "lucide-react";

const feedbacks = [
  {
    src: "/assets/testimonial-performance.jpeg",
    alt: "Feedback de atleta relatando evolução de força, explosão, propriocepção e condicionamento físico, além de passar de cinco para dez repetições na barra fixa",
    quote: "Mais força, explosão e condicionamento — de 5 para 10 repetições na barra fixa.",
    wrapperClassName: "lg:col-span-7",
    figureClassName: "lg:-rotate-1",
    frameClassName: "h-[46svh] min-h-[18rem] max-h-[30rem]",
  },
  {
    src: "/assets/testimonial-mobility.jpeg",
    alt: "Feedback de atleta relatando melhora rápida na mobilidade do joelho, força, velocidade, potência, redução da dor e mais confiança",
    quote: "Mais mobilidade, velocidade, potência e confiança nos movimentos.",
    wrapperClassName: "lg:col-span-5",
    figureClassName: "lg:translate-y-10 lg:rotate-1",
    frameClassName: "h-[38svh] min-h-[16rem] max-h-[24rem]",
  },
];

export default function Testimonials() {
  return (
    <>
      <div className="absolute inset-0 z-10 flex items-center overflow-hidden px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div data-feedback-grid className="mx-auto grid w-full max-w-[1120px] grid-cols-2 items-center gap-3 sm:gap-6 lg:grid-cols-12 lg:gap-8">
          {feedbacks.map((feedback) => (
            <div key={feedback.src} data-feedback-card className={feedback.wrapperClassName}>
              <figure
                className={`testimonial-feedback-card overflow-hidden border border-white/15 bg-[#0d0d0f] p-2 shadow-2xl sm:p-3 ${feedback.figureClassName}`}
              >
                <a
                  href={feedback.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative block cursor-zoom-in overflow-hidden bg-black ${feedback.frameClassName}`}
                  aria-label="Abrir feedback em tamanho completo"
                >
                  <Image
                    src={feedback.src}
                    alt={feedback.alt}
                    fill
                    sizes="(max-width: 1024px) 48vw, 52vw"
                    className="object-contain"
                  />
                </a>
                <figcaption className="flex items-end justify-between gap-3 border-t border-white/10 px-2 py-3 sm:gap-5 sm:px-5 sm:py-5">
                  <div>
                    <span className="text-[0.5rem] font-black uppercase tracking-[0.18em] text-brand-red sm:text-[0.57rem] sm:tracking-[0.2em]">
                      Feedback recebido
                    </span>
                    <p className="mt-2 line-clamp-3 text-[0.7rem] leading-5 text-white/70 sm:text-sm sm:leading-6">
                      {feedback.quote}
                    </p>
                  </div>
                  <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-white/35 sm:block" />
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex items-center overflow-hidden px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="max-w-[39rem]">
            <div data-feedback-copy>
              <Quote className="h-11 w-11 text-brand-red sm:h-14 sm:w-14" strokeWidth={1.4} />
            </div>
            <h2
              data-feedback-copy
              className="mt-7 font-heading text-[clamp(2.55rem,5vw,5.4rem)] font-black uppercase leading-[0.88] tracking-[-0.055em] text-white"
            >
              Quando o atleta sente a diferença, o resultado deixa de ser promessa
            </h2>
            <p data-feedback-copy className="mt-6 max-w-md text-sm leading-6 text-white/50 sm:text-base sm:leading-7">
              Feedbacks recebidos durante o processo de preparação e desenvolvimento esportivo.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
