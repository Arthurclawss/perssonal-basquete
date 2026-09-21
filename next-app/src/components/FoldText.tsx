"use client";

interface FoldTextProps {
  lines: string[];
  lineClassNames?: string[];
  className?: string;
}

export default function FoldText({ lines, lineClassNames = [], className = "" }: FoldTextProps) {
  const label = lines.join(" ");

  return (
    <span className={`fold-text ${className}`.trim()} aria-label={label}>
      <span className="fold-text-visual" aria-hidden="true">
        {lines.map((line, lineIndex) => (
          <span
            key={`${line}-${lineIndex}`}
            className={`fold-text-line ${lineClassNames[lineIndex] ?? ""}`.trim()}
          >
            {line.split(/(\s+)/).map((part, partIndex) =>
              /^\s+$/.test(part) ? (
                <span key={`space-${partIndex}`} className="fold-text-whitespace">
                  {part.replace(/ /g, "\u00a0")}
                </span>
              ) : (
                <span key={`${part}-${partIndex}`} className="fold-text-segment">
                  <span className="fold-text-piece" data-fold-piece>
                    {part}
                  </span>
                </span>
              ),
            )}
          </span>
        ))}
      </span>
    </span>
  );
}
