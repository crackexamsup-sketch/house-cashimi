import React, { useState, useEffect, useMemo } from 'react';
import { CHARACTERS, PROLOGUE_SCRIPT } from '../constants';
import { Play } from 'lucide-react';

// --- Sub-component for Smooth Image Transition ---
const CharacterSprite = ({ src, alt, className, style, isSpeaking }: { src: string, alt: string, className: string, style?: React.CSSProperties, isSpeaking: boolean }) => {
  const [activeSlot, setActiveSlot] = useState(0);
  const [sources, setSources] = useState([src, src]); // Two slots for buffering

  // Handle source change with dual-buffer for cross-fade
  useEffect(() => {
    if (src !== sources[activeSlot]) {
      const nextSlot = activeSlot === 0 ? 1 : 0;
      setSources(prev => {
        const newSrcs = [...prev];
        newSrcs[nextSlot] = src;
        return newSrcs;
      });
      setActiveSlot(nextSlot);
    }
  }, [src, activeSlot, sources]);

  return (
    <div className={`relative w-full h-full ${isSpeaking ? 'animate-breathe' : ''}`}>
      {/* Slot 0 */}
      <img 
        src={sources[0]} 
        alt={alt}
        className={`${className} absolute inset-0 transition-opacity duration-700 ease-in-out`}
        style={{ ...style, opacity: activeSlot === 0 ? 1 : 0 }}
      />
      {/* Slot 1 */}
      <img 
        src={sources[1]} 
        alt={alt}
        className={`${className} absolute inset-0 transition-opacity duration-700 ease-in-out`}
        style={{ ...style, opacity: activeSlot === 1 ? 1 : 0 }}
      />
    </div>
  );
};

const Prologue: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const currentFrame = PROLOGUE_SCRIPT[currentIndex];
  const isFinished = currentIndex >= PROLOGUE_SCRIPT.length;
  
  // Calculate Current Expression based on history
  const getExpressionForCharacter = (charId: string) => {
    let latestExpr = null;
    for (let i = currentIndex; i >= 0; i--) {
        const frame = PROLOGUE_SCRIPT[i];
        if (frame.speakerId === charId && frame.expression) {
            latestExpr = frame.expression;
            break;
        }
    }

    const char = CHARACTERS.find(c => c.id === charId)!;
    if (latestExpr && char.expressions?.[latestExpr]) {
        return char.expressions[latestExpr];
    }
    return char.imagePlaceholder;
  };

  const linSrc = getExpressionForCharacter('lin');
  const ranSrc = getExpressionForCharacter('ran');

  // Typewriter Effect
  useEffect(() => {
    if (isFinished) return;
    
    setDisplayedText('');
    setIsTyping(true);
    let charIndex = 0;
    const text = currentFrame.text;
    
    const interval = setInterval(() => {
      if (charIndex <= text.length) {
        setDisplayedText(text.slice(0, charIndex));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30); 

    return () => clearInterval(interval);
  }, [currentIndex, isFinished, currentFrame]);

  const handleNext = () => {
    if (isFinished) return;

    if (isTyping) {
      setDisplayedText(currentFrame.text);
      setIsTyping(false);
    } else {
      if (currentIndex < PROLOGUE_SCRIPT.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        const charSection = document.getElementById('characters');
        charSection?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (isFinished) return null;

  const isLinSpeaking = currentFrame.speakerId === 'lin';
  const isRanSpeaking = currentFrame.speakerId === 'ran';

  return (
    <section id="prologue" className="relative w-full h-screen bg-[#050505] overflow-hidden select-none" onClick={handleNext}>
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1.0); }
          50% { transform: scale(1.02); }
        }
        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }
      `}</style>
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[url('https://i.ifh.cc/lnPytv.webp')] bg-cover bg-center opacity-30 blur-sm animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
      
      {/* Particles/Grain */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

      {/* Characters Container */}
      <div className="absolute inset-0 flex justify-between items-end px-0 md:px-20 pb-0 z-10">
        
        {/* LIN Sprite (Left) */}
        <div className={`relative w-1/2 md:w-1/2 h-[80%] md:h-full transition-all duration-700 transform origin-bottom
           ${isLinSpeaking ? 'scale-110 z-20 brightness-110 drop-shadow-[0_0_15px_rgba(147,51,234,0.2)]' : 'scale-95 md:scale-95 z-10 brightness-50 grayscale-[0.6]'}
        `}>
           <CharacterSprite 
             src={linSrc}
             alt="Lin"
             isSpeaking={isLinSpeaking}
             className="object-contain object-bottom w-full h-full"
             style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
           />
        </div>

        {/* RAN Sprite (Right) */}
        <div className={`relative w-1/2 md:w-1/2 h-[80%] md:h-full transition-all duration-700 transform origin-bottom
           ${isRanSpeaking ? 'scale-110 z-20 brightness-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'scale-95 md:scale-95 z-10 brightness-50 grayscale-[0.6]'}
        `}>
           <div className="w-full h-full flex justify-end">
             <div className="w-full h-full relative">
                <CharacterSprite 
                  src={ranSrc}
                  alt="Ran"
                  isSpeaking={isRanSpeaking}
                  className="object-contain object-bottom w-full h-full"
                  style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
                />
             </div>
           </div>
        </div>
      </div>

      {/* Dialogue Interface */}
      <div className="absolute bottom-0 left-0 w-full p-2 pb-6 md:p-12 z-30 flex justify-center">
        <div className="w-full max-w-5xl relative">
            
            {/* Name Tag */}
            <div className={`absolute -top-6 md:-top-10 left-2 md:left-8 bg-black border border-stone-600 px-6 py-1 md:px-8 md:py-2 transform -skew-x-12 z-20 shadow-lg transition-colors duration-500
               ${isLinSpeaking ? 'border-purple-800 bg-purple-950/20' : isRanSpeaking ? 'border-blue-800 bg-blue-950/20' : 'border-stone-800'}
            `}>
               <span className={`font-kr font-bold text-lg md:text-xl tracking-widest transition-colors duration-300 ${isLinSpeaking ? 'text-purple-400' : isRanSpeaking ? 'text-blue-400' : 'text-stone-400'}`}>
                  {isLinSpeaking ? '린 카시미' : isRanSpeaking ? '란 카시미' : '...'}
               </span>
            </div>

            {/* Text Box */}
            <div className={`bg-black/90 border backdrop-blur-md p-6 md:p-10 min-h-[160px] md:min-h-[180px] shadow-2xl rounded-sm relative group cursor-pointer transition-colors duration-500 z-10
              ${isLinSpeaking ? 'border-purple-900/50 hover:border-purple-500/30' : isRanSpeaking ? 'border-blue-900/50 hover:border-blue-500/30' : 'border-stone-800'}
            `}>
               
               <p className="font-serif text-lg md:text-2xl text-stone-200 leading-relaxed drop-shadow-md">
                  {displayedText}
                  <span className={`inline-block w-2 h-5 bg-gold-500 ml-1 align-middle animate-pulse ${isTyping ? 'opacity-100' : 'opacity-0'}`}></span>
               </p>

               {/* Click Indicator */}
               <div className={`absolute bottom-4 right-4 md:bottom-6 md:right-8 text-gold-500 animate-bounce ${isTyping ? 'hidden' : 'block'}`}>
                  <Play size={20} fill="currentColor" className="rotate-90" />
               </div>

               {/* Quick Menu */}
               <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-4 text-stone-600 opacity-50 hover:opacity-100 transition-opacity">
                  <span className="text-[10px] md:text-xs uppercase tracking-widest hover:text-stone-400 cursor-pointer">Auto</span>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest hover:text-stone-400 cursor-pointer">Skip</span>
               </div>
            </div>

        </div>
      </div>

    </section>
  );
};

export default Prologue;