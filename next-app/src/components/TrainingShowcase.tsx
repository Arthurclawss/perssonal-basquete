import TrainingVideo from "./TrainingVideo";

const videos = [
  {
    src: "/assets/training-03.mp4",
    poster: "/assets/training-03-poster.png",
    eyebrow: "Resultado real",
    title: "Recorde pessoal e uma base mais forte",
    className: "training-card-featured",
  },
  {
    src: "/assets/training-01.mp4",
    poster: "/assets/training-01-poster.png",
    eyebrow: "Agilidade",
    title: "Resposta rápida em cada direção",
    className: "training-card-secondary",
  },
  {
    src: "/assets/training-02.mp4",
    poster: "/assets/training-02-poster.png",
    eyebrow: "Preparação física",
    title: "Preparando o atleta para a temporada",
    className: "training-card-tertiary",
  },
];

export default function TrainingShowcase() {
  return (
    <div data-training-grid className="training-mosaic">
      {videos.map((video, index) => (
        <article
          key={video.src}
          data-training-card
          className={`testimonial-video-card group relative overflow-hidden border border-white/15 bg-brand-dark ${video.className}`}
        >
          <TrainingVideo
            src={video.src}
            poster={video.poster}
            label={`${video.eyebrow}: ${video.title}`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 sm:p-8">
            <div>
              <p className="text-[0.6rem] font-black uppercase tracking-[0.22em] text-brand-red">{video.eyebrow}</p>
              <h3 className={`mt-2 max-w-xl font-heading font-black uppercase leading-[0.92] tracking-[-0.04em] text-white ${index === 0 ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>
                {video.title}
              </h3>
            </div>
            <span className="shrink-0 border border-white/25 px-3 py-2 text-[0.55rem] font-black uppercase tracking-[0.16em] text-white/65">
              Em movimento
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
