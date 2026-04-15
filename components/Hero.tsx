type Props = {
  logoImage: string;
  backgroundImage: string;
  title: string;
  subtitle: string;
};

export default function Hero({ logoImage, backgroundImage, title, subtitle }: Props) {
  return (
    <section className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className="hero-grain" />
      <div className="hero-content" data-parallax="0.4">
        {logoImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="hero-logo" src={logoImage} alt={title} />
        ) : null}
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
