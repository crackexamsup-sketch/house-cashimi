import React, { useState } from 'react';
import Intro from './components/Intro';
import Hero from './components/Hero';
import Prologue from './components/Prologue';
import Characters from './components/Characters';
import Gallery from './components/Gallery';
import World from './components/World';
import Community from './components/Community';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    
    if (id === 'home') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
       return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (showIntro) {
    return <Intro onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-stone-200 selection:bg-gold-500 selection:text-black">
      <ScrollProgress />

      {/* Minimal Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center mix-blend-difference">
        <div className="font-display font-bold text-xl tracking-widest text-stone-300">
          CASHIMI
        </div>
        
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-stone-300 hover:text-white transition-colors p-2"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div className={`fixed inset-0 z-30 bg-black/95 transition-transform duration-500 ease-in-out flex flex-col items-center justify-center gap-8 md:gap-12 ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
         <a href="#" onClick={(e) => scrollToSection(e, 'home')} className="font-display text-3xl md:text-4xl text-stone-400 hover:text-gold-400 transition-colors">Home</a>
         <a href="#prologue" onClick={(e) => scrollToSection(e, 'prologue')} className="font-display text-3xl md:text-4xl text-stone-400 hover:text-gold-400 transition-colors">Story</a>
         <a href="#characters" onClick={(e) => scrollToSection(e, 'characters')} className="font-display text-3xl md:text-4xl text-stone-400 hover:text-gold-400 transition-colors">The Twins</a>
         <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="font-display text-3xl md:text-4xl text-stone-400 hover:text-gold-400 transition-colors">Gallery</a>
         <a href="#world" onClick={(e) => scrollToSection(e, 'world')} className="font-display text-3xl md:text-4xl text-stone-400 hover:text-gold-400 transition-colors">Archives</a>
         <a href="#community" onClick={(e) => scrollToSection(e, 'community')} className="font-display text-3xl md:text-4xl text-stone-400 hover:text-gold-400 transition-colors">Community</a>
      </div>

      <main>
        <Hero />
        <Prologue />
        <Characters />
        <Gallery />
        <World />
        <Community />
      </main>

      <Footer />
    </div>
  );
};

export default App;