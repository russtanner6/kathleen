type Props = {
  backgroundImage?: string;
  portraitImage?: string;
  eyebrow?: string;
  brandMark?: string;
  title: string;
  openingParagraphs?: string[];
  goldQuote?: string;
  goldAttribution?: string;
  closingParagraphs?: string[];
};

export default function Welcome({
  backgroundImage,
  portraitImage,
  eyebrow,
  brandMark,
  title,
  openingParagraphs = [],
  goldQuote,
  goldAttribution,
  closingParagraphs = [],
}: Props) {
  return (
    <section className="welcome" id="welcome">
      <div
        className="welcome-bg"
        style={backgroundImage ? { backgroundImage: `url('${backgroundImage}')` } : undefined}
      />
      <div className="welcome-veil" />
      <div className="welcome-grain" />

      <div className="welcome-inner">
        {brandMark && <div className="welcome-brandmark reveal">{brandMark}</div>}
        {eyebrow && <p className="welcome-eyebrow reveal reveal-delay-1">{eyebrow}</p>}
        <h1 className="welcome-title reveal reveal-delay-1">{title}</h1>
        <div className="welcome-line reveal reveal-delay-2" />

        <div className="welcome-grid">
          <div className="welcome-copy">
            {openingParagraphs.map((p, i) => (
              <p key={`o-${i}`} className="welcome-body reveal reveal-delay-2">
                {p}
              </p>
            ))}

            {goldQuote && (
              <blockquote className="gold-quote reveal reveal-delay-3">
                <span className="gold-quote-mark" aria-hidden>“</span>
                <span className="gold-quote-text">{goldQuote}</span>
                {goldAttribution && (
                  <cite className="gold-quote-cite">{goldAttribution}</cite>
                )}
              </blockquote>
            )}

            {closingParagraphs.map((p, i) => (
              <p key={`c-${i}`} className="welcome-body reveal">
                {p}
              </p>
            ))}
          </div>

          {portraitImage && (
            <div className="welcome-portrait reveal reveal-delay-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={portraitImage} alt="Kathleen & Sophia at the ocean" />
              <div className="welcome-portrait-frame" aria-hidden />
            </div>
          )}
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
