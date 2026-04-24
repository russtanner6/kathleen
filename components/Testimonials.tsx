type Props = {
  number: string;
  label: string;
  heading: string;
  items: { quote: string; author: string }[];
};

export default function Testimonials({ number, label, heading, items }: Props) {
  return (
    <section className="section-dark" id="voices" style={{ paddingTop: '8rem' }}>
      <div className="inner">
        {number && (
          <div className="section-number reveal" data-parallax="0.15">
            {number}
          </div>
        )}
        <p className="section-label reveal reveal-delay-1">{label}</p>
        <h2 className="section-heading reveal reveal-delay-2" style={{ marginBottom: '3rem' }}>
          {heading}
        </h2>
        <div className="testimonial-grid">
          {items.map((item, i) => (
            <div className="testimonial-card reveal" key={i}>
              <p className="testimonial-text">{item.quote}</p>
              <p className="testimonial-author">{item.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
