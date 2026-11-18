import { OfferingIcon } from './OfferingIcons';

type Card = {
  number: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
};

type Props = {
  number: string;
  label: string;
  heading: string;
  body: string;
  cards: Card[];
};

export default function Offerings({ number, label, heading, body, cards }: Props) {
  return (
    <section className="offerings-scroll" id="offerings">
      <div className="offerings-header">
        {number && (
          <div className="section-number reveal" data-parallax="0.15">
            {number}
          </div>
        )}
        <p className="section-label reveal reveal-delay-1">{label}</p>
        <h2 className="section-heading reveal reveal-delay-2">{heading}</h2>
        <p className="section-body reveal reveal-delay-3">{body}</p>
      </div>
      <div className="scroll-track">
        {cards.map((card) => (
          <div className="offering-card" key={card.number}>
            <div className="card-number">{card.number}</div>
            <span className="card-icon">
              <OfferingIcon name={card.icon} />
            </span>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-desc">{card.description}</p>
            <a href="#connect" className="card-cta">
              {card.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
