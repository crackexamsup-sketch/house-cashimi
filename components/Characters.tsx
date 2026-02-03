import React, { useState } from 'react';
import { CHARACTERS } from '../constants';
import { Crown, Skull, Zap, ZoomIn } from 'lucide-react';
import { CharacterProfile } from '../types';
import CharacterDetail from './CharacterDetail';

const Characters: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedChar, setSelectedChar] = useState<CharacterProfile | null>(null);

  const lin = CHARACTERS.find(c => c.id === 'lin')!;
  const ran = CHARACTERS.find(c => c.id === 'ran')!;

  return (
    <>
      <section id="characters" className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col md:flex-row border-t border-stone-900">
        
        {/* LIN SECTION (LEFT) */}
        <div 
          className={`relative h-1/2 md:h-full transition-all duration-700 ease-in-out overflow-hidden group border-b md:border-b-0 md:border-r border-stone-900 cursor-pointer touch-manipulation
            ${hoveredId === 'lin' ? 'md:w-[65%]' : hoveredId === 'ran' ? 'md:w-[35%]' : 'md:w-[50%]'}
            w-full
          `}
          onMouseEnter={() => setHoveredId('lin')}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => setSelectedChar(lin)}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 md:scale-105 group-hover:scale-110 opacity-50 md:opacity-40 md:group-hover:opacity-60"
            style={{ backgroundImage: `url(${lin.imagePlaceholder})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-lin-purple/90 via-black/40 to-transparent mix-blend-multiply"></div>
          
          {/* Visual Cue for Click (Always visible on mobile, hover on desktop) */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
             <div className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-white/70 bg-black/40 md:bg-black/20 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full border border-white/10">
                <ZoomIn size={12} className="md:w-3.5 md:h-3.5" /> <span className="hidden md:inline">View Profile</span><span className="md:hidden">Profile</span>
             </div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 p-6 md:p-16 flex flex-col justify-end md:justify-center items-start">
             <span className="text-purple-400 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-1 md:mb-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">The Snake of Desire</span>
             <h2 className="text-4xl md:text-7xl font-kr font-bold text-white mb-2 md:mb-4 drop-shadow-lg">{lin.name}</h2>
             <p className="text-stone-300 font-display italic text-lg md:text-2xl mb-2 md:mb-6 opacity-80 md:group-hover:text-purple-200 transition-colors">"{lin.quote}"</p>
             
             {/* Hidden on mobile default, visible on hover/desktop */}
             <div className={`max-w-md text-stone-400 font-serif leading-relaxed transition-all duration-500 ${hoveredId === 'lin' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden md:block'}`}>
                <p className="mb-6 line-clamp-3 hidden md:block">{lin.description}</p>
                
                <div className="grid grid-cols-2 gap-2 md:gap-4 border-t border-purple-500/30 pt-2 md:pt-4">
                   <div className="text-[10px] md:text-xs uppercase tracking-widest text-purple-400">Special Ability</div>
                   <div className="font-kr text-stone-200 col-span-2 text-sm md:text-lg">{lin.stats.special}</div>
                   <div className="flex gap-2 text-[10px] md:text-xs text-stone-500"><Crown size={12}/> Force: {lin.stats.str}</div>
                   <div className="flex gap-2 text-[10px] md:text-xs text-stone-500"><Skull size={12}/> Cunning: {lin.stats.int}</div>
                </div>
             </div>
          </div>
        </div>

        {/* RAN SECTION (RIGHT) */}
        <div 
          className={`relative h-1/2 md:h-full transition-all duration-700 ease-in-out overflow-hidden group cursor-pointer touch-manipulation
            ${hoveredId === 'ran' ? 'md:w-[65%]' : hoveredId === 'lin' ? 'md:w-[35%]' : 'md:w-[50%]'}
            w-full
          `}
          onMouseEnter={() => setHoveredId('ran')}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => setSelectedChar(ran)}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 md:scale-105 group-hover:scale-110 opacity-50 md:opacity-40 md:group-hover:opacity-60"
            style={{ backgroundImage: `url(${ran.imagePlaceholder})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-ran-blue/90 via-black/40 to-transparent mix-blend-multiply"></div>

          {/* Visual Cue for Click */}
          <div className="absolute top-4 left-4 md:top-8 md:left-auto md:right-8 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
             <div className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-white/70 bg-black/40 md:bg-black/20 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full border border-white/10">
                <ZoomIn size={12} className="md:w-3.5 md:h-3.5" /> <span className="hidden md:inline">View Profile</span><span className="md:hidden">Profile</span>
             </div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 p-6 md:p-16 flex flex-col justify-end md:justify-center items-end text-right">
             <span className="text-blue-400 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-1 md:mb-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">The Ghost of Silence</span>
             <h2 className="text-4xl md:text-7xl font-kr font-bold text-white mb-2 md:mb-4 drop-shadow-lg">{ran.name}</h2>
             <p className="text-stone-300 font-display italic text-lg md:text-2xl mb-2 md:mb-6 opacity-80 md:group-hover:text-blue-200 transition-colors">"{ran.quote}"</p>
             
             <div className={`max-w-md text-stone-400 font-serif leading-relaxed transition-all duration-500 ${hoveredId === 'ran' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden md:block'}`}>
                <p className="mb-6 line-clamp-3 hidden md:block">{ran.description}</p>
                
                <div className="grid grid-cols-2 gap-2 md:gap-4 border-t border-blue-500/30 pt-2 md:pt-4 dir-rtl">
                   <div className="col-span-2 text-right text-[10px] md:text-xs uppercase tracking-widest text-blue-400">Special Ability</div>
                   <div className="col-span-2 font-kr text-stone-200 text-sm md:text-lg">{ran.stats.special}</div>
                   <div className="flex gap-2 justify-end text-[10px] md:text-xs text-stone-500">Force: {ran.stats.str} <Zap size={12}/></div>
                   <div className="flex gap-2 justify-end text-[10px] md:text-xs text-stone-500">Cunning: {ran.stats.int} <Skull size={12}/></div>
                </div>
             </div>
          </div>
        </div>

        {/* Central Divider Text (Absolute) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 mix-blend-exclusion text-white/50 text-6xl md:text-9xl font-display opacity-50 md:opacity-100">
          &
        </div>

      </section>

      {/* Detail Modal */}
      {selectedChar && (
        <CharacterDetail 
          character={selectedChar} 
          onClose={() => setSelectedChar(null)} 
        />
      )}
    </>
  );
};

export default Characters;