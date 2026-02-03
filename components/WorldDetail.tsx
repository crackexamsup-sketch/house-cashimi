import React, { useEffect, useState } from 'react';
import { WorldLore } from '../types';
import { X, FileText, Fingerprint, ShieldAlert, Hash, Eye, AlertTriangle } from 'lucide-react';

interface WorldDetailProps {
  lore: WorldLore;
  index: number;
  onClose: () => void;
}

const WorldDetail: React.FC<WorldDetailProps> = ({ lore, index, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => setIsVisible(true));
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500); // Wait for exit animation
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-500" 
        onClick={handleClose}
      ></div>

      {/* Document Modal */}
      <div className={`relative w-full max-w-5xl bg-[#111] border border-stone-800 shadow-2xl flex flex-col md:flex-row overflow-hidden transition-all duration-700 transform ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-12'}`}>
        
        {/* Decorative Top Border (Mobile) / Left Border (Desktop) */}
        <div className="h-2 w-full md:w-2 md:h-auto bg-gradient-to-b from-gold-600 via-stone-800 to-stone-900"></div>

        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-red-500 transition-colors bg-black/40 rounded-full border border-stone-800/50"
        >
          <X size={24} />
        </button>

        {/* Left Side: Metadata Panel */}
        <div className="hidden md:flex w-[280px] bg-[#0a0a0a] border-r border-stone-800 flex-col p-8 justify-between shrink-0 select-none relative overflow-hidden">
           
           {/* Background Pattern */}
           <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

           <div>
              <div className="flex items-center gap-2 text-gold-600 mb-8 pb-4 border-b border-stone-800">
                 <ShieldAlert size={20} />
                 <span className="font-mono text-xs tracking-widest uppercase font-bold">Confidential</span>
              </div>
              
              <div className="space-y-6 font-mono text-xs text-stone-500">
                 <div>
                    <div className="uppercase tracking-wider mb-1 opacity-50 text-[10px]">Archive Reference</div>
                    <div className="text-stone-300 text-sm">ARC-{String(index + 1).padStart(3, '0')}-X</div>
                 </div>
                 <div>
                    <div className="uppercase tracking-wider mb-1 opacity-50 text-[10px]">Last Updated</div>
                    <div className="text-stone-300">Year 293, 3rd Era</div>
                 </div>
                 <div>
                    <div className="uppercase tracking-wider mb-1 opacity-50 text-[10px]">Security Clearance</div>
                    <div className="text-red-400 border border-red-900/30 bg-red-900/10 px-2 py-1 inline-block mt-1">
                      {lore.clearanceLevel || "Level 3 (Restricted)"}
                    </div>
                 </div>
              </div>
           </div>

           <div className="opacity-10 relative">
              <Fingerprint size={160} className="text-stone-700 absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3" />
           </div>
        </div>

        {/* Right Side: Main Content */}
        <div className="flex-1 overflow-y-auto max-h-[85vh] custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
           
           <div className="p-8 md:p-12 pb-24">
              
              {/* Header */}
              <div className="mb-10 border-b border-stone-800 pb-6 relative">
                  <div className="inline-block px-2 py-1 bg-[#151515] border border-stone-800 text-[10px] font-mono text-stone-500 mb-4">
                    DECLASSIFIED DOCUMENT
                  </div>

                  <h1 className="font-display text-4xl md:text-5xl text-stone-100 mb-2 leading-tight">{lore.title}</h1>
                  <h2 className="font-kr text-gold-500/80 text-lg md:text-xl tracking-wide uppercase mb-6">{lore.subtitle}</h2>
                  
                  {/* Summary Box */}
                  <div className="bg-stone-900/30 border-l-2 border-stone-600 p-4 pl-6">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1 block">Abstract</span>
                    <p className="font-serif text-stone-400 italic text-sm md:text-base leading-relaxed">
                      {lore.content}
                    </p>
                  </div>

                  {/* Stamp Effect */}
                  <div className="absolute top-0 right-0 border-4 border-stone-800/30 text-stone-800/30 font-black text-4xl p-2 rotate-[-15deg] pointer-events-none select-none hidden md:block z-0">
                    ARCHIVED
                  </div>
              </div>

              {/* Detailed Content */}
              <div className="mb-12">
                  <h3 className="flex items-center gap-3 font-display text-stone-300 text-lg uppercase tracking-widest mb-6">
                    <FileText size={18} className="text-gold-600"/> 
                    Detailed Report
                  </h3>
                  <div className="font-serif text-stone-300 leading-loose text-lg space-y-6 text-justify">
                      {lore.details?.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                  </div>
              </div>

              {/* Secret Section (Interactive) */}
              {lore.secretNote && (
                <div className="mt-12 relative group">
                  <div className="absolute -inset-1 bg-red-900/20 blur-sm rounded-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  
                  <div className={`relative border border-red-900/50 bg-[#0f0505] overflow-hidden transition-all duration-500 ${showSecret ? 'p-6' : 'p-4 cursor-pointer hover:bg-[#1a0505]'}`} onClick={() => !showSecret && setShowSecret(true)}>
                    
                    {/* Header for Secret Box */}
                    <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-[0.2em] font-bold">
                          <AlertTriangle size={16} /> Eyes Only // Level 5
                       </div>
                       {!showSecret && <Eye size={16} className="text-red-500/50 animate-pulse" />}
                    </div>

                    {/* Content */}
                    <div className="relative">
                       <p className={`font-serif text-red-200/90 leading-relaxed text-lg italic transition-all duration-700 ${showSecret ? 'blur-0 select-text' : 'blur-sm select-none line-clamp-2'}`}>
                          "{lore.secretNote}"
                       </p>
                       
                       {/* Overlay when locked */}
                       {!showSecret && (
                          <div className="absolute inset-0 flex items-center justify-center">
                             <span className="bg-red-950/80 text-red-400 border border-red-800 px-4 py-1 text-xs font-mono uppercase tracking-widest backdrop-blur-sm">
                                Click to Decrypt
                             </span>
                          </div>
                       )}
                    </div>

                  </div>
                </div>
              )}

              {/* Footer Tags */}
              <div className="mt-16 pt-8 border-t border-stone-800 flex flex-wrap gap-2">
                  <div className="w-full flex items-center gap-2 text-stone-600 font-mono text-xs mb-2">
                    <Hash size={14} /> LINKED KEYWORDS
                  </div>
                  {lore.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-stone-900 border border-stone-800 text-stone-500 text-sm font-mono hover:text-gold-400 hover:border-gold-500/50 transition-colors cursor-default">
                        #{tag}
                    </span>
                  ))}
              </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default WorldDetail;