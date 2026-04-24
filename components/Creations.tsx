import { CREATION_ICONS } from './OfferingIcons';

type Props = {
  number: string;
  label: string;
  heading: string;
  items: {
    visual: string;
    iconKey: string;
    title: string;
    description: string;
  }[];
};

export default function Creations({ number, label, heading, items }: Props) {
  return (
    <section className="section-deep">
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
        <div className="creation-row">
          {items.map((item, i) => (
            <div className={`creation-item reveal${i > 0 ? ` reveal-delay-${i}` : ''}`} key={i}>
              <div className={`creation-visual ${item.visual}`}>
                {CREATION_ICONS[item.iconKey] ?? null}
              </div>
              <div className="creation-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
