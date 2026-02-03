import React, { useEffect, useState } from 'react';
import { INTRO_TEXTS } from '../constants';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= INTRO_TEXTS.length) {
      setTimeout(onComplete, 1000);
      return;
    }

    // Reading time adjusted for horizontal text (slightly faster than vertical)
    const timer = setTimeout(() => {
      setStep(prev => prev + 1);
    }, 2500); 

    return () => clearTimeout(timer);
  }, [step, onComplete]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer overflow-hidden" 
      onClick={onComplete}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,40,40,0.4),_transparent_70%)] animate-pulse"></div>

      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        {INTRO_TEXTS.map((text, index) => {
          return (
            <div
              key={index}
              className={`absolute transition-all duration-1000 ease-in-out font-kr font-light text-center max-w-5xl px-4
                ${index === step ? 'opacity-100 blur-0 scale-100 translate-y-0' : 'opacity-0 blur-sm scale-95'}
                ${index < step ? '-translate-y-8' : ''}
                ${index > step ? 'translate-y-8' : ''}
                text-2xl md:text-4xl tracking-widest leading-relaxed
              `}
              style={{ 
                color: index % 2 === 0 ? '#e5e5e5' : '#D4AF37', // Alternate White and Gold
                textShadow: index % 2 !== 0 ? '0 0 20px rgba(212, 175, 55, 0.3)' : 'none'
              }}
            >
              {text}
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-12 w-full text-center">
        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-stone-700 to-transparent mx-auto mb-4"></div>
        <p className="text-stone-600 text-xs tracking-[0.5em] uppercase font-display animate-pulse">Click to Enter</p>
      </div>
    </div>
  );
};

export default Intro;