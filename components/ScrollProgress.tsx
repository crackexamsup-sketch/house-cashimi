import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-stone-900/50">
      <div 
        className="h-full bg-gradient-to-r from-gold-900 via-gold-500 to-gold-200 shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      ></div>
    </div>
  );
};

export default ScrollProgress;