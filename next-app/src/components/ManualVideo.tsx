"use client";

import { useRef, useState } from "react";
import styles from "./ManualVideo.module.css";

export default function ManualVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  async function play() {
    const video = videoRef.current;
    if (!video || pending) return;
    setPending(true);
    setError(false);
    try {
      if (video.error) video.load();
      // Call play directly from the user's tap, as required by mobile browsers.
      await video.play();
    } catch (cause) {
      // Switching slides can interrupt a pending play request normally.
      if (!(cause instanceof DOMException && cause.name === "AbortError")) setError(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <figure className={styles.player}>
      <video
        ref={videoRef}
        src={src}
        controls
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        onPlaying={() => { setPlaying(true); setPending(false); setError(false); }}
        onPause={() => { setPlaying(false); setPending(false); }}
        onEnded={() => setPlaying(false)}
        onError={() => { setPlaying(false); setPending(false); setError(true); }}
      >
        Seu navegador não suporta este vídeo. <a href={src}>Abrir vídeo</a>.
      </video>
      {!playing && <button type="button" className={styles.play} onClick={() => void play()} disabled={pending} aria-label={`Reproduzir vídeo: ${label}`}>
        <span aria-hidden="true">▶</span><span>{pending ? "Carregando…" : "Reproduzir"}</span>
      </button>}
      {error && <figcaption className={styles.error} role="status">
        Não foi possível reproduzir aqui. <a href={src} target="_blank" rel="noopener noreferrer">Abrir vídeo diretamente ↗</a>
      </figcaption>}
    </figure>
  );
}
