import React, { useEffect, useState } from 'react';
import { CharacterProfile } from '../types';
import { X, Quote, Mic, Heart, ThumbsDown, User, Lock, BookOpen, Sword, Skull, FileText } from 'lucide-react';

interface CharacterDetailProps {
  character: CharacterProfile;
  onClose: () => void;
}

type TabType = 'profile' | 'combat' | 'social' | 'secret';

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);

  useEffect(() => {
    // Ensure animation plays after mount
    const timer = setTimeout(() => setIsVisible(true), 10);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 600);
  };

  const isLin = character.id === 'lin';
  const themeColor = isLin ? 'text-purple-400' : 'text-blue-400';
  const themeBorder = isLin ? 'border-purple-800' : 'border-blue-800';
  const themeBg = isLin ? 'bg-purple-900/10' : 'bg-blue-900/10';
  const themeAccent = isLin ? 'text-purple-200' : 'text-blue-200';

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      
      {/* Background Layer */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity duration-700" onClick={handleClose}>
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 scale-110 blur-2xl"
            style={{ backgroundImage: `url(${character.imagePlaceholder})` }}
         ></div>
      </div>

      {/* Main Container */}
      <div className={`relative w-full h-full md:w-[95vw] md:h-[95vh] flex flex-col md:flex-row bg-[#080808] border border-stone-800 shadow-2xl overflow-hidden transition-transform duration-700 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        
        {/* Close Button - Optimized for Mobile Touch Area */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 text-stone-500 hover:text-white transition-colors bg-black/50 rounded-full border border-stone-800 backdrop-blur-sm"
        >
          <X size={24} />
        </button>

        {/* --- LEFT PANEL: SUMMARY & NAV --- */}
        <div className="w-full md:w-[320px] lg:w-[360px] h-auto md:h-full bg-stone-950/90 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col relative z-20 shrink-0">
            <div className="p-6 lg:p-8 pb-4">
                <div className={`text-xs uppercase tracking-[0.3em] ${themeColor} mb-2`}>{character.engName}</div>
                <h1 className="font-kr font-bold text-3xl lg:text-4xl text-stone-100 leading-tight mb-2">{character.name}</h1>
                <p className="font-serif text-stone-400 italic text-sm">{character.title}</p>
                <div className="mt-4 inline-block px-3 py-1 bg-stone-900 border border-stone-800 text-xs text-gold-500 font-mono rounded">
                  {character.stats.rank}
                </div>
            </div>

            {/* Navigation Menu - Scrollable on Mobile */}
            <div className="flex-1 flex flex-row md:flex-col gap-2 p-4 md:p-6 overflow-x-auto md:overflow-visible no-scrollbar">
                <NavButton 
                   active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} 
                   icon={<BookOpen size={18}/>} label="PROFILE" desc="기본 정보"
                />
                <NavButton 
                   active={activeTab === 'combat'} onClick={() => setActiveTab('combat')} 
                   icon={<Sword size={18}/>} label="COMBAT" desc="전투 정보"
                />
                <NavButton 
                   active={activeTab === 'social'} onClick={() => setActiveTab('social')} 
                   icon={<User size={18}/>} label="SOCIAL" desc="관계 및 보이스"
                />
                <NavButton 
                   active={activeTab === 'secret'} onClick={() => setActiveTab('secret')} 
                   icon={<FileText size={18}/>} label="SECRET" desc="비밀 파일"
                />
            </div>
        </div>

        {/* --- MIDDLE PANEL: CONTENT AREA --- */}
        <div className="flex-1 h-full bg-[#0a0a0a] relative overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 lg:p-12 pb-32">
               
               {/* TAB 1: PROFILE */}
               {activeTab === 'profile' && (
                 <div className="space-y-10 animate-fadeIn max-w-3xl mx-auto">
                    {/* Quote */}
                    <div className={`relative pl-6 border-l-2 ${themeBorder}`}>
                       <p className="font-serif text-xl md:text-2xl text-stone-200 italic leading-relaxed">"{character.quote}"</p>
                    </div>

                    {/* Basic Info Grid */}
                    <div className="grid grid-cols-2 gap-4 md:gap-6 bg-stone-900/30 p-4 md:p-6 border border-stone-800/50">
                       <InfoRow label="Age" value={character.personalInfo.age} />
                       <InfoRow label="Height/Weight" value={character.personalInfo.height} />
                       <div className="col-span-2">
                          <InfoRow label="Appearance" value={character.personalInfo.appearance} />
                       </div>
                    </div>

                    {/* Narrative Description */}
                    <div>
                       <SectionTitle title="Overview" />
                       <p className="font-serif text-stone-400 leading-loose text-base md:text-lg text-justify">
                          {character.description}
                       </p>
                       <div className="mt-6 p-4 md:p-6 bg-stone-900/20 border-l border-stone-800">
                          <h4 className="text-sm font-display text-stone-500 uppercase mb-2">Background</h4>
                          <p className="font-serif text-stone-400 text-sm leading-7">
                            {character.history}
                          </p>
                       </div>
                    </div>

                    {/* Likes / Dislikes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                       <PreferenceBox title="Likes" items={character.personalInfo.likes} icon={<Heart size={16}/>} color="text-green-400" />
                       <PreferenceBox title="Dislikes" items={character.personalInfo.dislikes} icon={<ThumbsDown size={16}/>} color="text-red-400" />
                    </div>
                 </div>
               )}

               {/* TAB 2: COMBAT */}
               {activeTab === 'combat' && (
                 <div className="space-y-10 animate-fadeIn max-w-3xl mx-auto">
                    <SectionTitle title="Combat Analysis" />
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                       <StatBox label="Force" value={character.stats.str} />
                       <StatBox label="Intellect" value={character.stats.int} />
                       <StatBox label="Influence" value={character.stats.cha} />
                    </div>

                    {/* Combat Details */}
                    <div className="space-y-6 font-serif text-stone-300">
                       <div className="bg-stone-900/30 p-4 md:p-6 border border-stone-800">
                          <h4 className="font-display text-gold-500 mb-2 text-lg">Combat Style</h4>
                          <p className="leading-relaxed">{character.combatInfo.style}</p>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-stone-900/30 p-4 md:p-6 border border-stone-800">
                             <h4 className="font-display text-stone-500 mb-2 text-sm uppercase">Weakness</h4>
                             <p className="text-red-300/80">{character.combatInfo.weakness}</p>
                          </div>
                          <div className="bg-stone-900/30 p-4 md:p-6 border border-stone-800">
                             <h4 className="font-display text-stone-500 mb-2 text-sm uppercase">Weaponry</h4>
                             <p>{character.combatInfo.weapon}</p>
                          </div>
                       </div>

                       <div>
                          <h4 className={`font-display ${themeColor} mb-4 text-xl mt-4`}>Special Abilities</h4>
                          <ul className="space-y-3">
                             {character.combatInfo.abilities.map((ability, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-stone-400">
                                   <span className="mt-1.5 w-1.5 h-1.5 bg-stone-600 rounded-full shrink-0"></span>
                                   <span>{ability}</span>
                                </li>
                             ))}
                          </ul>
                       </div>
                    </div>
                 </div>
               )}

               {/* TAB 3: SOCIAL */}
               {activeTab === 'social' && (
                 <div className="space-y-12 animate-fadeIn max-w-3xl mx-auto">
                    
                    {/* Relationships */}
                    <div>
                       <SectionTitle title="Relationship Network" />
                       <div className="grid gap-4">
                          {character.relationships.map((rel, idx) => (
                             <div key={idx} className="flex flex-col md:flex-row gap-4 bg-stone-900/20 border border-stone-800 p-5 items-start hover:bg-stone-900/40 transition-colors">
                                <div className="min-w-[140px] flex items-center gap-2 text-stone-200 font-bold font-kr">
                                   <User size={16} className="text-stone-600" />
                                   {rel.name}
                                </div>
                                <div className="flex-1">
                                   <div className={`text-xs uppercase tracking-wider ${themeColor} mb-2 font-display`}>{rel.relation}</div>
                                   <p className="text-sm text-stone-400 font-serif leading-relaxed">"{rel.description}"</p>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* Voice Lines */}
                    <div>
                       <SectionTitle title="Voice Logs" />
                       <div className="space-y-3">
                          {character.voiceLines.map((line, idx) => (
                             <div key={idx} className="group relative bg-stone-900/40 border-l-2 border-stone-800 p-4 pl-6 hover:border-gold-500 transition-colors">
                                <div className="text-[10px] uppercase tracking-widest text-stone-600 mb-1 group-hover:text-gold-500/70">{line.label}</div>
                                <div className="flex gap-4">
                                   <Mic size={14} className="mt-1 text-stone-700 group-hover:text-stone-400 shrink-0" />
                                   <p className="font-serif text-stone-300 italic group-hover:text-white transition-colors">
                                      "{line.text}"
                                   </p>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
               )}

               {/* TAB 4: SECRET (EPISODE) */}
               {activeTab === 'secret' && (
                 <div className="h-full flex flex-col animate-fadeIn max-w-3xl mx-auto">
                    <SectionTitle title="Confidential File" />
                    
                    <div 
                       className="flex-1 relative group cursor-pointer border border-stone-800 bg-[#0c0c0c]"
                       onClick={() => setIsSecretUnlocked(true)}
                    >
                       {/* Locked State Overlay */}
                       {!isSecretUnlocked && (
                          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050505]/90 backdrop-blur-sm transition-opacity duration-500 hover:bg-[#050505]/80">
                             <div className="p-6 border border-stone-700/50 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Lock size={32} className="text-stone-500" />
                             </div>
                             <h3 className="text-xl font-display text-stone-300 tracking-widest uppercase mb-2">Classified Episode</h3>
                             <p className="text-xs font-mono text-stone-600">Click to decrypt data segment</p>
                          </div>
                       )}

                       {/* Content (Blurred if locked) */}
                       <div className={`p-8 md:p-12 transition-all duration-1000 ${!isSecretUnlocked ? 'blur-md opacity-30 grayscale' : 'blur-0 opacity-100'}`}>
                          <div className="flex justify-between items-start border-b border-stone-800 pb-6 mb-8">
                             <div>
                                <div className="text-xs font-mono text-red-500 mb-2 uppercase tracking-widest">Top Secret // Level 5</div>
                                <h2 className="text-2xl md:text-3xl font-kr text-stone-200">{character.episode.title}</h2>
                             </div>
                             <div className="hidden md:block text-right">
                                <div className="text-xs font-mono text-stone-600">DATE: [REDACTED]</div>
                                <div className="text-xs font-mono text-stone-600">LOC: [REDACTED]</div>
                             </div>
                          </div>
                          
                          <div className="font-serif text-stone-300 leading-loose text-base md:text-lg space-y-6">
                             {character.episode.content}
                          </div>

                          <div className="mt-12 pt-6 border-t border-stone-800 flex justify-end">
                             <div className="border-2 border-red-900/30 text-red-900/50 font-display font-bold text-3xl md:text-4xl p-4 rotate-12 select-none">
                                CONFIRMED
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               )}

            </div>
        </div>

        {/* --- RIGHT PANEL: ARTWORK (Desktop Only) --- */}
        <div className="hidden lg:block w-[400px] xl:w-[500px] h-full relative border-l border-stone-800 bg-[#050505] shrink-0">
           {/* Background Glow */}
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full ${themeBg} blur-[120px] opacity-60`}></div>
           
           {/* Character Art */}
           <div 
             className="absolute bottom-0 right-0 w-full h-[105%] bg-contain bg-no-repeat bg-center transition-transform duration-1000 hover:scale-105 origin-bottom"
             style={{ backgroundImage: `url(${character.imagePlaceholder})` }}
           ></div>
           
           {/* Vertical Name Overlay */}
           <div className="absolute top-12 right-12 z-10 writing-vertical text-stone-700/30 font-kr font-bold text-6xl select-none pointer-events-none mix-blend-overlay">
              {character.name.split(' ')[0]}
           </div>
        </div>

      </div>
    </div>
  );
};

// --- Sub Components ---

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; desc: string }> = ({ active, onClick, icon, label, desc }) => (
   <button 
      onClick={onClick}
      className={`group flex items-center gap-4 p-4 min-w-[140px] md:min-w-0 md:w-full text-left transition-all duration-300 border-b-2 md:border-b-0 md:border-l-2 shrink-0
         ${active ? 'bg-stone-900/80 border-gold-500' : 'border-transparent hover:bg-stone-900/40 hover:border-stone-700'}
      `}
   >
      <div className={`transition-colors ${active ? 'text-gold-400' : 'text-stone-600 group-hover:text-stone-400'}`}>
         {icon}
      </div>
      <div>
         <div className={`font-display text-sm md:text-base font-bold tracking-wider ${active ? 'text-stone-200' : 'text-stone-500 group-hover:text-stone-300'}`}>
            {label}
         </div>
         <div className="text-[10px] text-stone-600 group-hover:text-stone-500 font-kr truncate max-w-[150px]">
            {desc}
         </div>
      </div>
   </button>
);

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
   <h3 className="flex items-center gap-4 mb-8">
      <span className="w-1 h-5 bg-gold-600"></span>
      <span className="font-display text-xl text-stone-200 uppercase tracking-[0.2em]">{title}</span>
      <span className="flex-grow h-[1px] bg-stone-800"></span>
   </h3>
);

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
   <div>
      <div className="text-[10px] text-stone-500 uppercase tracking-wider mb-1 font-mono">{label}</div>
      <div className="text-stone-300 font-serif text-sm">{value}</div>
   </div>
);

const PreferenceBox: React.FC<{ title: string; items: string[]; icon: React.ReactNode; color: string }> = ({ title, items, icon, color }) => (
   <div className="bg-stone-900/20 p-6 border border-stone-800/50">
      <div className={`flex items-center gap-2 mb-4 ${color} font-display text-lg`}>
         {icon} {title}
      </div>
      <div className="flex flex-wrap gap-2">
         {items.map(item => (
            <span key={item} className="px-3 py-1 bg-black/40 text-stone-400 text-sm border border-stone-800 rounded-sm">
               {item}
            </span>
         ))}
      </div>
   </div>
);

const StatBox: React.FC<{ label: string; value: string }> = ({ label, value }) => (
   <div className="bg-stone-900/40 p-4 border border-stone-800 text-center">
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">{label}</div>
      <div className="font-mono text-gold-400 text-sm font-bold">{value}</div>
   </div>
);

export default CharacterDetail;