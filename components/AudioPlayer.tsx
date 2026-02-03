import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';

interface AudioPlayerProps {
  initialAutoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ initialAutoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Royalty-free dark classical/ambient music placeholder
  // In a real project, replace this with your hosted file path
  const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/10/25/audio_55a29737b4.mp3?filename=mystery-124236.mp3";

  useEffect(() => {
    if (initialAutoPlay && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Auto-play prevented by browser policy:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [initialAutoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-500 ease-out ${isHovered ? 'translate-x-0' : 'translate-x-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio 
        ref={audioRef} 
        src={MUSIC_URL} 
        loop 
        onEnded={() => setIsPlaying(false)}
      />

      {/* Track Info (Expands on Hover) */}
      <div className={`overflow-hidden transition-all duration-500 bg-black/80 backdrop-blur-md border border-stone-800 rounded-l-full h-12 flex items-center
        ${isHovered ? 'w-48 opacity-100 px-4' : 'w-0 opacity-0 px-0'}
      `}>
        <div className="whitespace-nowrap overflow-hidden">
           <div className="flex flex-col">
              <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Now Playing</span>
              <div className="flex items-center gap-2">
                 <span className="text-xs text-gold-500 font-display animate-pulse-slow">House Cashimi Theme</span>
              </div>
           </div>
        </div>
      </div>

      {/* Main Control Button */}
      <button 
        onClick={togglePlay}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 shadow-2xl group
          ${isPlaying 
            ? 'bg-gold-900/20 border-gold-600 text-gold-500' 
            : 'bg-black/80 border-stone-700 text-stone-500 hover:border-stone-500'
          }
        `}
      >
        {/* Spinning Vinyl Effect */}
        <div className={`absolute inset-0 rounded-full border border-dashed border-current opacity-30 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}></div>
        
        {isPlaying ? (
           <div className="flex gap-0.5 items-end h-4 mb-1">
             <div className="w-1 bg-current animate-[music-bar_1s_ease-in-out_infinite]"></div>
             <div className="w-1 bg-current animate-[music-bar_1.2s_ease-in-out_infinite] delay-75"></div>
             <div className="w-1 bg-current animate-[music-bar_0.8s_ease-in-out_infinite] delay-150"></div>
           </div>
        ) : (
           <Music size={20} />
        )}

        {/* Mini Mute Button Overlay */}
        <div 
          onClick={toggleMute}
          className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-[10px] hover:text-white transition-colors cursor-pointer ${isHovered ? 'scale-100' : 'scale-0'}`}
        >
          {isMuted ? <VolumeX size={10} /> : <Volume2 size={10} />}
        </div>
      </button>

      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;