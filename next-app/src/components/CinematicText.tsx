type CinematicTextProps = { text: string };

/** Natural wrapping keeps the same word masks at every screen width. */
export default function CinematicText({ text }: CinematicTextProps) {
  return <>{text.split(" ").map((word, index) => (
    <span key={`${word}-${index}`}>
      {index > 0 ? " " : null}
      <span className="cinematic-word-mask" aria-hidden="true">
        <span data-cinematic-word>{word}</span>
      </span>
    </span>
  ))}</>;
}
