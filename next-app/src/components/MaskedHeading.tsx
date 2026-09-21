interface MaskedHeadingLine {
  text: string;
  className?: string;
}

interface MaskedHeadingProps {
  lines: MaskedHeadingLine[];
  className?: string;
}

export default function MaskedHeading({ lines, className = "" }: MaskedHeadingProps) {
  return (
    <h2 className={`masked-heading-controlled ${className}`.trim()} aria-label={lines.map((line) => line.text).join(" ")}>
      {lines.map((line, lineIndex) => (
        <span key={`${line.text}-${lineIndex}`} className={`masked-heading-controlled__line ${line.className ?? ""}`.trim()} aria-hidden="true">
          {line.text.split(" ").map((word, wordIndex) => (
            <span key={`${word}-${wordIndex}`}>
              <span className="masked-heading-controlled__mask">
                <span data-masked-heading-word className="masked-heading-controlled__word">
                  {word}
                </span>
              </span>
              {wordIndex < line.text.split(" ").length - 1 ? " " : null}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}
