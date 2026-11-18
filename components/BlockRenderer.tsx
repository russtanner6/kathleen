import Hero from './Hero';
import About from './About';
import Offerings from './Offerings';
import Wholeness from './Wholeness';
import EarthStrip from './EarthStrip';
import Testimonials from './Testimonials';
import Creations from './Creations';
import Contact from './Contact';
import Tagline from './Tagline';
import Welcome from './Welcome';
import Section from './Section';
import Foundation from './Foundation';

export default function BlockRenderer({ blocks }: { blocks: any[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block?.hidden) return null;
        const key = `${block._template}-${i}`;
        switch (block._template) {
          case 'welcome':
            return <Welcome key={key} {...block} />;
          case 'section':
            return <Section key={key} {...block} />;
          case 'foundation':
            return <Foundation key={key} {...block} />;
          case 'hero':
            return <Hero key={key} {...block} />;
          case 'about':
            return <About key={key} {...block} />;
          case 'offerings':
            return <Offerings key={key} {...block} />;
          case 'wholeness':
            return <Wholeness key={key} {...block} />;
          case 'earthStrip':
            return <EarthStrip key={key} {...block} />;
          case 'testimonials':
            return <Testimonials key={key} {...block} />;
          case 'creations':
            return <Creations key={key} {...block} />;
          case 'contact':
            return <Contact key={key} {...block} />;
          case 'tagline':
            return <Tagline key={key} {...block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
