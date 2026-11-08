import Image from "next/image";
import { buildWhatsAppUrl, INSTAGRAM_URL } from "@/lib/contact";
import { campGalleryItems, feedbacks, resultStats, videos } from "@/lib/site-content";
import styles from "./SimpleExperience.module.css";
import TouchCarousel from "./TouchCarousel";
import ManualVideo from "./ManualVideo";
import { WhatsAppIcon } from "./WhatsAppButton";
import SimpleHeader from "./SimpleHeader";
import { ArrowRight, ArrowUp, ArrowUpRight, Target, Trophy } from "lucide-react";

function InstagramIcon({ size = 22 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
}

function ContactLink({ children = "Quero elevar meu jogo" }: { children?: React.ReactNode }) {
  return <a className={styles.button} href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer"><span>{children}</span><span className={styles.buttonIcon}><ArrowRight size={20} strokeWidth={2.25} aria-hidden="true" /></span></a>;
}

export default function SimpleExperience() {
  return (
    <div className={styles.site} data-experience="simple">
      <a className={styles.skip} href="#conteudo">Pular para o conteúdo</a>
      <SimpleHeader />

      <main id="conteudo">
        <section id="inicio" className={styles.hero} aria-labelledby="simple-title">
          <div>
            <p className={styles.kicker}>Hoop Master / Basquete</p>
            <h1 id="simple-title">Treine.<br /><span>Evolua.</span><br />Domine.</h1>
            <p className={styles.lead}>Treino de alta performance para transformar fundamento em resultado.</p>
            <ContactLink />
            <p className={styles.note}>Preparação física com Rafael Melo.</p>
          </div>
          <figure className={styles.heroPhoto}>
            <Image src="/assets/coach-2.jpg" alt="Coach Rafael Melo à beira da quadra" width={800} height={1000} sizes="(max-width: 639px) 100vw, 45vw" loading="eager" />
            <figcaption>Rafael Melo <span>Coach · Hoop Master</span></figcaption>
          </figure>
        </section>

        <section id="resultados" className={styles.section} aria-labelledby="simple-results">
          <p className={styles.kicker}>01 / Resultados</p>
          <h2 id="simple-results" className={styles.resultsTitle}>Formando atletas.<span>Construindo legados.</span></h2>
          <p className={styles.intro}>Evolução construída atleta por atleta.</p>
          <ul className={styles.stats}>
            {resultStats.slice(0, 3).map((stat, index) => <li key={stat.number} className={styles.stat}>
              <h3>{index < 2 ? <strong>{stat.value}</strong> : <Trophy className={styles.statIcon} size={26} aria-hidden="true" />}<span>{stat.title}</span></h3>
              <p>{index === 2 ? "Trabalho que se transforma em conquista." : stat.description}</p>
            </li>)}
          </ul>
          <p className={styles.objective}><Target size={22} aria-hidden="true" /><span><strong>Um objetivo:</strong> elevar o nível de cada atleta.</span></p>
        </section>

        <section id="campeonatos" className={styles.section} aria-labelledby="simple-camps">
          <p className={styles.kicker}>02 / Campeonatos</p>
          <h2 id="simple-camps">Trabalho que vira <span>conquista.</span></h2>
          <TouchCarousel label="Fotos dos campeonatos" labels={campGalleryItems.map(item => item.label)}>
            {campGalleryItems.map((item, index) => <figure key={item.src} className={styles.camp}>
              <Image src={item.src} alt={item.alt} width={720} height={480} sizes="(max-width: 639px) 100vw, 45vw" style={{ objectPosition: item.objectPosition }} />
              <figcaption><span className={styles.number}>0{index + 1}</span>{item.label}</figcaption>
            </figure>)}
          </TouchCarousel>
        </section>

        <section id="sobre" className={styles.section} aria-labelledby="simple-about">
          <p className={styles.kicker}>03 / Sobre o treinador</p>
          <div className={styles.about}>
            <div>
              <h2 id="simple-about">Rafael <span>Melo.</span></h2>
              <p className={styles.intro}>Preparo atletas para entregar o melhor quando o jogo mais exige.</p>
              <p className={styles.body}>O basquete exige contato, saltos e mudanças rápidas de direção. Meu trabalho é construir sua base atlética com um treino pensado para as exigências do jogo.</p>
              <ul className={styles.pillars}><li>Potência e explosão</li><li>Resistência de jogo</li><li>Prevenção de lesões</li></ul>
              <a className={styles.textLink} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                <span className={styles.socialIcon}><InstagramIcon /></span>
                <span className={styles.socialCopy}><strong>Conheça o trabalho no Instagram</strong><small>@coachrafaelmelo</small></span>
                <ArrowUpRight className={styles.socialArrow} size={20} aria-hidden="true" />
              </a>
            </div>
            <Image className={styles.aboutPhoto} src="/assets/results-huddle.jpeg" alt="Rafael Melo orientando a equipe de basquete durante a partida" width={1170} height={1548} sizes="(max-width: 639px) 100vw, 45vw" />
          </div>
        </section>

        <section id="treinos" className={styles.section} aria-labelledby="simple-training">
          <p className={styles.kicker}>04 / Treinos</p>
          <h2 id="simple-training">Evolução em <span>movimento.</span></h2>
          <p className={styles.intro}>Veja o treino na prática. Toque em reproduzir para assistir.</p>
          <div className={styles.videos}>
          <TouchCarousel label="Vídeos dos treinos" labels={videos.map(video => video.title)}>
            {videos.map(video => <article key={video.src} className={styles.videoCard}>
              <ManualVideo src={video.src} poster={video.poster} label={`${video.eyebrow}: ${video.title}`} />
              <div><p className={styles.kicker}>{video.eyebrow}</p><h3>{video.title}</h3></div>
            </article>)}
          </TouchCarousel>
          </div>
        </section>

        <section id="depoimentos" className={styles.section} aria-labelledby="simple-feedback">
          <p className={styles.kicker}>05 / Depoimentos</p>
          <h2 id="simple-feedback">Quem treina <span>conta.</span></h2>
          <p className={styles.intro}>Relatos de quem vive essa evolução. Toque na imagem para abrir em tamanho maior.</p>
          <div className={styles.feedbacks}>
          <TouchCarousel label="Depoimentos dos atletas" labels={feedbacks.map((_, index) => `Depoimento ${index + 1}`)}>
            {feedbacks.map((feedback, index) => <a key={feedback.src} className={styles.feedback} href={feedback.src} target="_blank" rel="noopener noreferrer" aria-label={`Abrir depoimento ${index + 1} em tamanho maior`}>
              <Image src={feedback.src} alt={feedback.alt} width={feedback.width} height={feedback.height} sizes="(max-width: 639px) 100vw, 45vw" />
              <span>Ampliar depoimento <ArrowUpRight size={16} aria-hidden="true" /></span>
            </a>)}
          </TouchCarousel>
          </div>
        </section>
      </main>

      <footer id="contato" className={`${styles.section} ${styles.footer}`}>
        <p className={styles.kicker}>06 / A próxima jogada é sua</p>
        <h2>Vamos evoluir <span>seu jogo?</span></h2>
        <p className={styles.intro}>Converse com Rafael Melo sobre seus objetivos e descubra como começar.</p>
        <ol className={styles.steps}><li>Avaliação</li><li>Plano personalizado</li><li>Treino acompanhado</li></ol>
        <div className={styles.footerLinks}><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><InstagramIcon size={17} />Instagram <ArrowUpRight size={16} aria-hidden="true" /></a><a href="#inicio">Voltar ao início <ArrowUp size={16} aria-hidden="true" /></a></div>
        <p className={styles.copyright}>© {new Date().getFullYear()} Rafael Melo · Hoop Master</p>
      </footer>
      <a
        className={styles.floatingWhatsApp}
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar com Rafael Melo pelo WhatsApp"
      >
        <WhatsAppIcon className={styles.whatsAppIcon} />
        <span>Falar com o técnico</span>
      </a>
    </div>
  );
}
