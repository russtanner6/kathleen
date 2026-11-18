import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollEffects from '@/components/ScrollEffects';
import { getOfferingsPage, getSiteSettings } from '@/lib/content';

export function generateMetadata(): Metadata {
  const page = getOfferingsPage();
  return { title: page.meta.title, description: page.meta.description };
}

export default function OfferingsPage() {
  const page = getOfferingsPage();
  const settings = getSiteSettings();

  return (
    <>
      <Nav settings={settings} />
      <main className="page-wrap">
        <div className="page-inner">
          <p className="page-eyebrow reveal">{page.eyebrow}</p>
          <h1 className="page-title reveal reveal-delay-1">{page.title}</h1>
          <div className="page-rule reveal reveal-delay-2" />

          {page.sections.map((section, i) => (
            <div key={i} className="page-section">
              <h3 className="reveal">{section.heading}</h3>
              <ul className="offering-list">
                {section.items.map((item, j) => (
                  <li key={j} className="reveal">
                    <span className="offering-title">{item.title}</span>
                    <span>{item.body}</span>
                  </li>
                ))}
              </ul>
              {section.note && <p className="page-note reveal">{section.note}</p>}
            </div>
          ))}

          <div className="page-section" style={{ textAlign: 'center' }}>
            <a href="/#connect" className="page-cta">Contact Kathleen</a>
          </div>
        </div>
      </main>
      <Footer
        brand={settings.brand}
        copyright={settings.copyright}
        signature={settings.signature}
      />
      <ScrollEffects />
    </>
  );
}
