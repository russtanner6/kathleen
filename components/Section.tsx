import { Fragment } from 'react';

type Props = {
  anchorId?: string;
  theme?: 'cream' | 'emerald' | 'deep';
  eyebrow?: string;
  heading?: string;
  paragraphs?: string[];
  trail?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

// Splits "Miracles · Synchronicity · Liberation" so middle-dots can be styled
// in gold (and inline spaces retain). Also accepts "·" with or without
// surrounding spaces, and the fancy-dot " • ".
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

export default function Section({
  anchorId,
  theme = 'cream',
  eyebrow,
  heading,
  paragraphs = [],
  trail,
  ctaLabel,
  ctaHref,
}: Props) {
  return (
    <section className={`v2-section v2-${theme}`} id={anchorId}>
      <div className="v2-inner">
        {eyebrow && <p className="v2-eyebrow reveal">{eyebrow}</p>}
        {heading && (
          <h2 className="v2-heading reveal reveal-delay-1">
            {renderMantra(heading)}
          </h2>
        )}
        {paragraphs.map((p, i) => (
          <p key={i} className="v2-body reveal reveal-delay-2">
            {p}
          </p>
        ))}
        {trail && <p className="v2-trail reveal reveal-delay-3">{trail}</p>}
        {ctaLabel && ctaHref && (
          <a href={ctaHref} className="v2-cta reveal reveal-delay-3">
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}
