import React, { useState } from 'react';
import { GALLERY_CONTENT } from '../constants';
import { Lock, Eye, X, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../types';

type CharacterTab = 'lin' | 'ran';
type ModeTab = 'daily' | 'r18';

const Gallery: React.FC = () => {
  const [activeChar, setActiveChar] = useState<CharacterTab>('lin');
  const [activeMode, setActiveMode] = useState<ModeTab>('daily');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const images = GALLERY_CONTENT[activeChar][activeMode];
  const isEmpty = images.length === 0;
  const isLocked = activeMode === 'r18' && isEmpty; // Example logic: R18 is locked if empty

  const bgImage = "https://i.ifh.cc/r21XQm.webp";

  return (
    <>
      <section id="gallery" className="relative min-h-screen py-20 bg-[#050505] overflow-hidden">
        
        {/* Background Layer with Parallax-like feel */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-20 transition-all duration-700"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-[#050505]/80"></div>

        <div className="relative z-10 container mx-auto px-4 md:px-12">
          
          {/* Header */}
          <div className="text-center mb-12 animate-fadeIn">
            <h2 className="text-gold-500 text-sm tracking-[0.5em] uppercase mb-4">Visual Archives</h2>
            <h3 className="text-4xl md:text-6xl font-display text-stone-200">The Gallery</h3>
            <p className="mt-4 text-stone-500 font-serif italic">"그녀들의 일상, 그리고 감춰진 비밀."</p>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-8 mb-16">
            
            {/* Character Switcher */}
            <div className="flex p-1 bg-stone-900/50 border border-stone-800 rounded-full backdrop-blur-sm">
              <button
                onClick={() => setActiveChar('lin')}
                className={`px-8 py-2 rounded-full font-kr font-bold transition-all duration-300 ${activeChar === 'lin' ? 'bg-purple-900/80 text-purple-200 shadow-lg shadow-purple-900/20' : 'text-stone-500 hover:text-stone-300'}`}
              >
                린 카시미
              </button>
              <button
                onClick={() => setActiveChar('ran')}
                className={`px-8 py-2 rounded-full font-kr font-bold transition-all duration-300 ${activeChar === 'ran' ? 'bg-blue-900/80 text-blue-200 shadow-lg shadow-blue-900/20' : 'text-stone-500 hover:text-stone-300'}`}
              >
                란 카시미
              </button>
            </div>

            {/* Mode Switcher (Underline style) */}
            <div className="flex gap-12 border-b border-stone-800">
              <button
                onClick={() => setActiveMode('daily')}
                className={`pb-4 text-sm uppercase tracking-widest transition-all ${activeMode === 'daily' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-stone-600 hover:text-stone-400'}`}
              >
                Daily Life
              </button>
              <button
                onClick={() => setActiveMode('r18')}
                className={`pb-4 text-sm uppercase tracking-widest transition-all flex items-center gap-2 ${activeMode === 'r18' ? 'text-red-500 border-b-2 border-red-500' : 'text-stone-600 hover:text-red-900/50'}`}
              >
                Secret (18+) <Lock size={12} />
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="min-h-[50vh]">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center h-full py-20 border border-dashed border-stone-800 bg-stone-900/20 rounded-lg">
                <Lock size={48} className={`mb-4 ${isLocked ? 'text-red-900' : 'text-stone-700'}`} />
                <h4 className="text-xl font-display text-stone-400 mb-2">
                  {isLocked ? "Access Denied" : "No Data Found"}
                </h4>
                <p className="text-stone-600 font-serif">
                  {isLocked ? "이 구역은 아직 해금되지 않았습니다." : "아직 기록된 이미지가 없습니다."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-stone-800 bg-stone-900 cursor-pointer shadow-lg hover:border-gold-600/50 transition-all duration-300"
                    onClick={() => setSelectedImage(img)}
                  >
                    {/* Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${img.url})` }}
                    ></div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    
                    {/* Hover Info */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-[10px] uppercase tracking-wider text-gold-500 font-mono mb-1 block">
                          No. {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h5 className="font-kr font-bold text-stone-100">{img.title}</h5>
                      </div>
                      
                      {/* Zoom Icon */}
                      <div className="absolute top-4 right-4 text-white/70">
                        <Eye size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md animate-fadeIn p-4 md:p-10"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-stone-400 hover:text-white transition-colors">
            <X size={32} />
          </button>

          <div 
            className="relative max-w-full max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
          >
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain shadow-2xl border border-stone-800"
            />
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-kr font-bold text-stone-200 mb-2">{selectedImage.title}</h3>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-stone-800 rounded-full bg-stone-900/50">
                <ImageIcon size={14} className="text-gold-500" />
                <span className="text-xs text-stone-500 uppercase tracking-widest font-mono">Original Quality</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;