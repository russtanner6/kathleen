import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollEffects from '@/components/ScrollEffects';
import { getAboutPage, getSiteSettings } from '@/lib/content';

export function generateMetadata(): Metadata {
  const page = getAboutPage();
  return { title: page.meta.title, description: page.meta.description };
}

export default function AboutPage() {
  const page = getAboutPage();
  const settings = getSiteSettings();

  return (
    <>
      <Nav settings={settings} />
      <main className="page-wrap">
        <div className="page-inner">
          <p className="page-eyebrow reveal">{page.eyebrow}</p>
          <h1 className="page-title reveal reveal-delay-1">{page.title}</h1>
          <div className="page-rule reveal reveal-delay-2" />

          <div className="about-grid">
            {page.portraitImage && (
              <div className="about-portrait-full reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={page.portraitImage} alt="Kathleen" />
              </div>
            )}
            <div className="page-body reveal reveal-delay-1">
              {page.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="page-section" style={{ textAlign: 'center' }}>
            <a href="/#connect" className="page-cta">Connect with Kathleen</a>
          </div>
        </div>
      </main>
      <Footer
        brand={settings.brand}
        copyright={settings.copyright}
        signature={settings.signature}
        tagline={settings.tagline}
      />
      <ScrollEffects />
    </>
  );
}
