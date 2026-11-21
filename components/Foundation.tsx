import { Fragment } from 'react';

type Props = {
  anchorId?: string;
  eyebrow?: string;
  heading?: string;
  introParagraphs?: string[];
  firstQuote?: string;
  firstAttribution?: string;
  middleParagraphs?: string[];
  secondQuote?: string;
  secondAttribution?: string;
  signoff?: string;
};

function renderMantra(text: string) {
  const parts = text.split(/\s*[·•]\s*/);
  if (parts.length < 2) return text;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <span className="v2-heading-sep" aria-hidden>·</span>
      )}
    </Fragment>
  ));
}

// Signoff can be a single line ("With radiant love, ~ Kathleen & Sophia") or
// multi-line via \n in the JSON. Render each non-empty line in its own element
// so the first line (closing) and the second line (names) can stack.
function renderSignoff(signoff: string) {
  const lines = signoff
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);
  if (lines.length === 1) return <span>{lines[0]}</span>;
  return lines.map((line, i) => (
    <span key={i} className={`v2-signoff-line v2-signoff-line-${i + 1}`}>
      {line}
    </span>
  ));
}

export default function Foundation({
  anchorId = 'foundation',
  eyebrow,
  heading,
  introParagraphs = [],
  firstQuote,
  firstAttribution,
  middleParagraphs = [],
  secondQuote,
  secondAttribution,
  signoff,
}: Props) {
  return (
    <section className="v2-section v2-emerald v2-foundation" id={anchorId}>
      <div className="v2-foundation-aura" aria-hidden />
      <div className="v2-inner">
        {eyebrow && <p className="v2-eyebrow reveal">{eyebrow}</p>}
        {heading && (
          <h2 className="v2-heading reveal reveal-delay-1">
            {renderMantra(heading)}
          </h2>
        )}

        {introParagraphs.map((p, i) => (
          <p key={`i-${i}`} className="v2-body reveal reveal-delay-2">
            {p}
          </p>
        ))}

        {firstQuote && (
          <blockquote className="gold-quote gold-quote-bright reveal reveal-delay-3">
            <span className="gold-quote-mark" aria-hidden>“</span>
            <span className="gold-quote-text">{firstQuote}</span>
            {firstAttribution && (
              <cite className="gold-quote-cite">{firstAttribution}</cite>
            )}
          </blockquote>
        )}

        {middleParagraphs.map((p, i) => (
          <p key={`m-${i}`} className="v2-body reveal">
            {p}
          </p>
        ))}

        {secondQuote && (
          <blockquote className="gold-quote gold-quote-bright reveal">
            <span className="gold-quote-mark" aria-hidden>“</span>
            <span className="gold-quote-text">{secondQuote}</span>
            {secondAttribution && (
              <cite className="gold-quote-cite">{secondAttribution}</cite>
            )}
          </blockquote>
        )}

        {signoff && <p className="v2-signoff reveal">{renderSignoff(signoff)}</p>}
      </div>
    </section>
  );
}
