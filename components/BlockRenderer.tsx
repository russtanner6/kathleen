import Hero from './Hero';
import About from './About';
import Offerings from './Offerings';
import Wholeness from './Wholeness';
import EarthStrip from './EarthStrip';
import Testimonials from './Testimonials';
import Creations from './Creations';
import Contact from './Contact';

/**
 * Maps a block _template string to the component that renders it.
 * Kathleen can reorder blocks in home.json; this renders them in order.
 */
export default function BlockRenderer({ blocks }: { blocks: any[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        const key = `${block._template}-${i}`;
        switch (block._template) {
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
          default:
            return null;
        }
      })}
    </>
  );
}
