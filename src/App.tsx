import { useEffect } from 'react';
import { Cursor } from './components/layout/Cursor';
import { Footer } from './components/layout/Footer';
import { Nav } from './components/layout/Nav';
import { Preloader } from './components/layout/Preloader';
import { SkipLink } from './components/layout/SkipLink';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { FAQ } from './components/sections/FAQ';
import { Hero } from './components/sections/Hero';
import { HowWeWork } from './components/sections/HowWeWork';
import { Insights } from './components/sections/Insights';
import { Reading } from './components/sections/Reading';
import { Results } from './components/sections/Results';
import { Services } from './components/sections/Services';
import { useLenis } from './hooks/useLenis';
import { ScrollTrigger } from './lib/gsap';

export default function App() {
  useLenis();

  // Recalculate scroll-trigger positions once web fonts have loaded and changed layout.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <Preloader />
      <SkipLink />
      <Cursor />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Services />
        <HowWeWork />
        <Results />
        <About />
        <Insights />
        <Reading />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
