import React, { useState } from 'react';
import { WORLD_LORE } from '../constants';
import { WorldLore } from '../types';
import WorldDetail from './WorldDetail';
import { ZoomIn } from 'lucide-react';

const World: React.FC = () => {
  const [selectedLore, setSelectedLore] = useState<WorldLore | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleLoreClick = (lore: WorldLore, index: number) => {
    setSelectedLore(lore);
    setSelectedIndex(index);
  };

  return (
    <>
      <section id="world" className="relative py-32 bg-[#080808]">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-stone-800 pb-8">
            <div>
              <h2 className="text-gold-500 text-sm tracking-[0.5em] uppercase mb-4">World Archives</h2>
              <h3 className="text-5xl md:text-6xl font-display text-stone-200">The Setting</h3>
            </div>
            <p className="text-stone-500 font-serif italic max-w-sm text-right mt-8 md:mt-0">
              "법칙이 흐트러진 곳에 요괴가 깃들고, <br/>규율이 선 곳에 신령이 깃든다."
            </p>
          </div>

          {/* Masonry-style / Dossier Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORLD_LORE.map((lore, index) => (
              <div 
                key={index}
                onClick={() => handleLoreClick(lore, index)}
                className={`relative bg-[#0c0c0c] border border-stone-800/60 p-8 cursor-pointer group transition-all duration-500 hover:z-10
                  ${index === 0 ? 'lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-[#0c0c0c] to-[#151515]' : ''}
                  hover:scale-[1.02] hover:shadow-2xl hover:border-gold-600/50 hover:bg-[#111]
                `}
              >
                {/* Paper Clip Visual */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-[#080808] bg-stone-800 group-hover:bg-gold-600 transition-colors duration-500"></div>

                {/* Hover Indicator Icon */}
                <div className="absolute top-4 right-4 text-gold-500 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                   <ZoomIn size={24} />
                </div>

                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-mono text-stone-600 group-hover:text-gold-500/80 transition-colors">REF-0{index + 1}</span>
                  <div className="w-2 h-2 rounded-full bg-stone-800 group-hover:bg-gold-500 transition-colors shadow-[0_0_10px_rgba(212,175,55,0.5)] opacity-50 group-hover:opacity-100"></div>
                </div>

                <h4 className={`font-serif text-stone-200 mb-2 group-hover:text-gold-200 transition-colors ${index === 0 ? 'text-3xl' : 'text-xl'}`}>
                  {lore.title}
                </h4>
                <p className="text-gold-600/70 text-xs uppercase tracking-wider mb-6 border-b border-stone-800 pb-2 inline-block group-hover:border-gold-600/50 transition-colors">
                  {lore.subtitle}
                </p>

                <p className={`font-light text-stone-400 leading-relaxed line-clamp-4 group-hover:text-stone-300 transition-colors ${index === 0 ? 'text-base' : 'text-sm'}`}>
                  {lore.content}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                   {lore.tags.slice(0, 3).map(tag => (
                     <span key={tag} className="text-[10px] uppercase tracking-wider text-stone-500 border border-stone-800 px-2 py-1 group-hover:border-stone-700 transition-colors">
                       {tag}
                     </span>
                   ))}
                   {lore.tags.length > 3 && (
                      <span className="text-[10px] text-stone-600 px-1 py-1">+{lore.tags.length - 3}</span>
                   )}
                </div>

                {/* Read More Overlay (appears on hover) */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                   <span className="text-gold-400 font-mono text-xs uppercase tracking-widest border-b border-gold-400/50 pb-1">Access File</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Decorative Quote at bottom */}
          <div className="mt-32 text-center">
              <p className="font-display font-bold text-3xl md:text-5xl text-stone-800 select-none italic">
                "Cash before honor. Life before cash."
              </p>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedLore && (
        <WorldDetail 
          lore={selectedLore} 
          index={selectedIndex}
          onClose={() => setSelectedLore(null)} 
        />
      )}
    </>
  );
};

export default World;