import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToPrologue = () => {
    const prologue = document.getElementById('prologue');
    prologue?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex flex-col md:flex-row bg-[#050505]">
      
      {/* Visual Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/darkfantasy/1920/1080')] bg-cover bg-center opacity-40 grayscale mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]"></div>
      </div>

      {/* Main Layout Grid */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
        
        {/* Left: English Title & Decoration */}
        <div className="w-full md:w-1/2 min-h-[60vh] md:h-screen flex flex-col justify-center px-6 md:px-20 border-r border-stone-900/50 pt-20 md:pt-0">
          <div className="mb-6 flex items-center gap-4">
             <div className="h-[1px] w-8 md:w-12 bg-gold-500"></div>
             <span className="text-gold-500 uppercase tracking-[0.4em] text-[10px] md:text-xs">Visual Novel Project</span>
          </div>

          <h1 className="font-display text-5xl md:text-8xl lg:text-9xl text-stone-200 leading-[0.9]">
            House <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700 italic pr-4">Cashimi</span>
          </h1>
          
          <p className="mt-6 md:mt-8 text-stone-400 font-serif leading-loose max-w-md border-l border-gold-900 pl-6 italic text-sm md:text-base">
            "피는 물보다 진하지만, 황금은 피보다 빛난다."<br/>
            오르테나 왕국 동부, 탐욕의 도시 <span className="text-gold-400">천류(天流)</span>의 주인.
          </p>

          <div className="mt-8 md:mt-12 flex items-center gap-6">
             <button 
                onClick={scrollToPrologue}
                className="px-6 py-3 md:px-8 md:py-4 border border-stone-700 text-stone-300 hover:border-gold-500 hover:text-gold-400 transition-colors duration-500 font-display tracking-widest uppercase text-xs md:text-sm"
             >
                Enter The Estate
             </button>
          </div>
        </div>

        {/* Right: Vertical Korean Text & Symbolism */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-screen flex items-center justify-center md:justify-end md:pr-32 relative overflow-hidden bg-gradient-to-t from-[#050505] to-transparent md:bg-none">
           
           {/* Decorative Circle */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[500px] md:h-[500px] border border-stone-800 rounded-full opacity-20 animate-[spin_60s_linear_infinite]"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[480px] md:h-[480px] border border-gold-900/30 rounded-full"></div>

           {/* 
              Vertical Text Container 
           */}
           <div className="writing-vertical flex flex-col gap-6 md:gap-12 z-10 select-none pointer-events-none items-center justify-center h-full max-h-screen py-10 md:py-20">
              <h2 className="font-kr font-bold text-4xl md:text-7xl text-stone-800 mix-blend-difference drop-shadow-md whitespace-nowrap">
                카시미 백작가
              </h2>
              <p className="font-kr font-light text-stone-500 text-xs md:text-base tracking-[0.5em] opacity-60 whitespace-nowrap">
                명예보다는 돈, 돈보다는 목숨
              </p>
           </div>
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-700 animate-bounce hidden md:block">
        <ArrowDown size={20} strokeWidth={1} />
      </div>
    </section>
  );
};

export default Hero;