type Props = {
  number: string;
  label: string;
  heading: string;
  image: string;
  paragraphs: string[];
};

export default function About({ number, label, heading, image, paragraphs }: Props) {
  return (
    <section className="section-dark" id="about">
      <div className="inner">
        <div className="about-grid">
          <div>
            <div className="about-image reveal" style={{ padding: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={heading}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 4,
                  display: 'block',
                }}
              />
            </div>
          </div>
          <div>
            <div className="section-number reveal" data-parallax="0.15">
              {number}
            </div>
            <p className="section-label reveal reveal-delay-1">{label}</p>
            <h2 className="section-heading reveal reveal-delay-2">{heading}</h2>
            <div className="section-body reveal reveal-delay-3">
              {paragraphs.map((p, i) => (
                <p key={i} style={{ marginBottom: i < paragraphs.length - 1 ? '1.2rem' : 0 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
