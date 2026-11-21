import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollEffects from '@/components/ScrollEffects';
import { getSimplePage, getSiteSettings } from '@/lib/content';

export function generateMetadata(): Metadata {
  const page = getSimplePage('heart-work');
  return { title: page.meta.title, description: page.meta.description };
}

export default function HeartWorkPage() {
  const page = getSimplePage('heart-work');
  const settings = getSiteSettings();

  return (
    <>
      <Nav settings={settings} />
      <main className="page-wrap">
        <div className="page-inner">
          <p className="page-eyebrow reveal">{page.eyebrow}</p>
          <h1 className="page-title reveal reveal-delay-1">{page.title}</h1>
          <div className="page-rule reveal reveal-delay-2" />

          <div className="page-body reveal reveal-delay-1" style={{ textAlign: 'center' }}>
            {page.intro && <p>{page.intro}</p>}
            {page.comingSoonNote && <p className="page-note">{page.comingSoonNote}</p>}
          </div>

          <div className="page-section" style={{ textAlign: 'center' }}>
            <a href="/#connect" className="page-cta">Inquire about a Piece</a>
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
