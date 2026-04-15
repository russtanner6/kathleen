import { getHomeData, getSiteSettings } from '@/lib/content';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import BlockRenderer from '@/components/BlockRenderer';
import ScrollEffects from '@/components/ScrollEffects';

export default function HomePage() {
  const home = getHomeData();
  const settings = getSiteSettings();

  return (
    <>
      <Nav settings={settings} />
      <BlockRenderer blocks={home.blocks} />
      <Footer brand={settings.brand} copyright={settings.copyright} />
      <ScrollEffects />
    </>
  );
}
