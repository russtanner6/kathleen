'use client';

import { useEffect, useState, type CSSProperties } from 'react';

type HeroSlide = { src: string; position?: string; mobilePosition?: string };

type Props = {
  logoImage?: string;
  backgroundImage?: string;
  backgroundImages?: string[];
  slides?: HeroSlide[];
  title: string;
  subtitle: string;
  intervalMs?: number;
};

const DEFAULT_INTERVAL_MS = 7000;

function resolveSlides({
  slides,
  backgroundImages,
  backgroundImage,
}: Pick<Props, 'slides' | 'backgroundImages' | 'backgroundImage'>): HeroSlide[] {
  if (slides && slides.length > 0) return slides.filter(s => s?.src);
  if (backgroundImages && backgroundImages.length > 0) {
    return backgroundImages.filter(Boolean).map(src => ({ src }));
  }
  if (backgroundImage) return [{ src: backgroundImage }];
  return [];
}

export default function Hero({
  logoImage,
  backgroundImage,
  backgroundImages,
  slides,
  title,
  subtitle,
  intervalMs = DEFAULT_INTERVAL_MS,
}: Props) {
  const allSlides = resolveSlides({ slides, backgroundImages, backgroundImage });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (allSlides.length < 2) return;
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq.matches) return;
    }
    const id = window.setInterval(() => {
      setActive(prev => (prev + 1) % allSlides.length);
    }, Math.max(2500, intervalMs));
    return () => window.clearInterval(id);
  }, [allSlides.length, intervalMs]);

  return (
    <section className="hero">
      <div className="hero-stack" aria-hidden>
        {allSlides.map((slide, i) => {
          const desktopPos = slide.position || 'center 35%';
          const mobilePos = slide.mobilePosition || desktopPos;
          const style = {
            backgroundImage: `url('${slide.src}')`,
            ['--hero-pos' as any]: desktopPos,
            ['--hero-pos-mobile' as any]: mobilePos,
            backgroundPosition: desktopPos,
          } as CSSProperties;
          return (
            <div
              key={`${slide.src}-${i}`}
              className={`hero-bg hero-bg-slide${i === active ? ' is-active' : ''}`}
              style={style}
            />
          );
        })}
      </div>
      <div className="hero-grain" />
      <div className="hero-content" data-parallax="0.4">
        {logoImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="hero-logo" src={logoImage} alt={title} />
        ) : null}
        <h1 className="hero-title">
          <span className="hero-title-text">{title}</span>
        </h1>
        <p className="hero-subtitle">
          <span className="hero-subtitle-text">{subtitle}</span>
        </p>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
