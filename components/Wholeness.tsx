type Props = {
  number: string;
  label: string;
  heading: string;
  intro: string;
  quote: string;
  body: string;
  ctaText: string;
};

export default function Wholeness({
  number,
  label,
  heading,
  intro,
  quote,
  body,
  ctaText,
}: Props) {
  return (
    <section className="wholeness" id="wholeness">
      <div className="wholeness-inner">
        {number && (
          <div className="section-number reveal" data-parallax="0.15">
            {number}
          </div>
        )}
        <p className="section-label reveal reveal-delay-1">{label}</p>
        <h2 className="section-heading reveal reveal-delay-2">{heading}</h2>
        <div
          className="section-body reveal reveal-delay-3"
          style={{ maxWidth: '100%', textAlign: 'center' }}
        >
          <p style={{ marginBottom: '1.2rem' }}>{intro}</p>
        </div>
        <div className="wholeness-quote reveal">{quote}</div>
        <div
          className="section-body reveal"
          style={{ maxWidth: '100%', textAlign: 'center' }}
        >
          <p>{body}</p>
        </div>
        <a href="#connect" className="btn-gold reveal">
          {ctaText}
        </a>
      </div>
    </section>
  );
}
