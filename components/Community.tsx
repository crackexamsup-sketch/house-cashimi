import React, { useState, useEffect } from 'react';
import { CommunityPost, CommunityComment, UserProfile } from '../types';
import { Heart, MessageSquare, Send, User, Hash, MoreHorizontal, Share2, Check, Trash2, Shield, WifiOff, Feather } from 'lucide-react';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  updateDoc, 
  doc, 
  arrayUnion, 
  increment,
  deleteDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

const AVATAR_COLORS = [
  'bg-red-900', 'bg-orange-800', 'bg-amber-700', 'bg-yellow-800', 
  'bg-lime-900', 'bg-green-800', 'bg-emerald-900', 'bg-teal-800', 
  'bg-cyan-900', 'bg-sky-800', 'bg-blue-900', 'bg-indigo-900', 
  'bg-violet-900', 'bg-purple-900', 'bg-fuchsia-900', 'bg-pink-900', 
  'bg-rose-900', 'bg-stone-700'
];

const Community: React.FC = () => {
  // Data State
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
  const [connectionError, setConnectionError] = useState(false);
  
  // User Identity State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [inputCodename, setInputCodename] = useState('');
  const [selectedAvatarColor, setSelectedAvatarColor] = useState(AVATAR_COLORS[0]);

  // Interaction State
  const [newPostContent, setNewPostContent] = useState('');
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Initialization & Real-time Listeners ---

  useEffect(() => {
    // 1. Load Local User Profile
    const savedProfile = localStorage.getItem('cashimi_user_profile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }

    // 2. Load Local Likes History
    const savedLikes = localStorage.getItem('cashimi_user_likes');
    if (savedLikes) {
      setLikedPostIds(new Set(JSON.parse(savedLikes)));
    }

    // 3. Subscribe to Firestore Updates
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const loadedPosts: CommunityPost[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Convert Firestore Timestamp to readable string
          let timeString = '방금 전';
          if (data.createdAt) {
             const date = (data.createdAt as Timestamp).toDate();
             const now = new Date();
             const diff = (now.getTime() - date.getTime()) / 1000 / 60; // minutes
             if (diff < 1) timeString = '방금 전';
             else if (diff < 60) timeString = `${Math.floor(diff)}분 전`;
             else if (diff < 1440) timeString = `${Math.floor(diff / 60)}시간 전`;
             else timeString = `${Math.floor(diff / 1440)}일 전`;
          }

          loadedPosts.push({
            id: doc.id,
            author: data.author,
            avatarColor: data.avatarColor,
            content: data.content,
            // image: data.image, // Deprecated functionality
            likes: data.likes || 0,
            comments: data.comments || [],
            timestamp: timeString,
            tags: data.tags || [],
            // Check ownership by simple author name match (Weak security, but sufficient for this demo)
            isMine: savedProfile ? JSON.parse(savedProfile).codename === data.author : false
          });
        });
        setPosts(loadedPosts);
        setConnectionError(false);
      }, (error) => {
        console.error("Firestore connection error:", error);
        setConnectionError(true);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Failed to initialize Firestore query:", err);
      setConnectionError(true);
    }
  }, []);

  // Save Likes locally when changed
  useEffect(() => {
    localStorage.setItem('cashimi_user_likes', JSON.stringify(Array.from(likedPostIds)));
  }, [likedPostIds]);

  // --- Handlers ---

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCodename.trim()) return;

    const newProfile: UserProfile = {
      codename: inputCodename.trim(),
      avatarColor: selectedAvatarColor,
      joinedAt: new Date().toISOString()
    };

    setUserProfile(newProfile);
    localStorage.setItem('cashimi_user_profile', JSON.stringify(newProfile));
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !userProfile || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "posts"), {
        author: userProfile.codename,
        avatarColor: userProfile.avatarColor,
        content: newPostContent,
        likes: 0,
        comments: [],
        createdAt: serverTimestamp(),
        tags: []
      });

      setNewPostContent('');
    } catch (error) {
      console.error("Error adding post: ", error);
      alert("전송 실패. Firebase 설정을 확인해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm("정말로 이 기록을 삭제하시겠습니까? (DB에서 영구 삭제됩니다)")) {
      try {
        await deleteDoc(doc(db, "posts", postId));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleLike = async (postId: string) => {
    const isAlreadyLiked = likedPostIds.has(postId);
    const postRef = doc(db, "posts", postId);
    
    // Update Local State for UI feedback
    const newLikedIds = new Set(likedPostIds);
    if (isAlreadyLiked) {
      newLikedIds.delete(postId);
    } else {
      newLikedIds.add(postId);
    }
    setLikedPostIds(newLikedIds);

    // Update Firestore
    try {
      await updateDoc(postRef, {
        likes: increment(isAlreadyLiked ? -1 : 1)
      });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleCreateComment = async (postId: string) => {
    if (!newCommentContent.trim() || !userProfile) return;

    const newComment: CommunityComment = {
      id: `c-${Date.now()}`,
      author: userProfile.codename,
      avatarColor: userProfile.avatarColor,
      content: newCommentContent,
      timestamp: new Date().toISOString(), // Use ISO string for array storage
    };

    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        comments: arrayUnion(newComment)
      });
      setNewCommentContent('');
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleShare = (postId: string) => {
    const fakeLink = `https://shadow-channel.net/p/${postId}`;
    navigator.clipboard.writeText(fakeLink);
    setCopiedId(postId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="community" className="relative py-20 md:py-32 bg-[#0a0a0a] border-t border-stone-900 min-h-screen">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-12 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
           <div className={`inline-flex items-center gap-2 mb-2 border px-4 py-1 rounded-full bg-black/50 backdrop-blur-sm ${connectionError ? 'border-red-900/50 text-red-500' : 'border-gold-900/50 text-gold-500'}`}>
              <span className="relative flex h-2 w-2">
                <span className={`relative inline-flex rounded-full h-2 w-2 ${connectionError ? 'bg-red-500' : 'bg-green-500'}`}></span>
                {!connectionError && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
              </span>
              <span className="text-xs tracking-widest uppercase font-mono">
                {connectionError ? 'Connection Lost (Check Firebase Config)' : 'Encrypted Connection Established'}
              </span>
           </div>
           <h2 className="font-display text-4xl md:text-6xl text-stone-200 mb-4">Shadow Channel</h2>
           <p className="font-serif text-stone-500 italic">"당신의 흔적을 남기세요."</p>
        </div>

        {connectionError && (
          <div className="max-w-2xl mx-auto mb-12 p-6 bg-red-900/20 border border-red-900/50 rounded flex flex-col items-center text-center">
            <WifiOff size={48} className="text-red-500 mb-4" />
            <h3 className="text-red-400 font-bold mb-2">데이터베이스 연결 실패</h3>
            <p className="text-stone-400 text-sm mb-4">
              `firebase.ts` 파일에 Firebase 프로젝트 설정키(API Key)가 올바르게 입력되었는지 확인해주세요.<br/>
              또한 Firestore Database가 '테스트 모드'로 생성되었는지 확인이 필요합니다.
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          
          {/* Write Column (Left) */}
          <div className="w-full lg:w-1/3 order-1">
             {userProfile ? (
              // LOGGED IN: Show Profile & Write Form
               <div className="lg:sticky lg:top-32 bg-[#111] border border-stone-800 p-6 shadow-2xl relative overflow-hidden group rounded-sm">
                  {/* User Profile Card */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-800">
                    <div className={`w-12 h-12 rounded-full ${userProfile.avatarColor} border-2 border-stone-800 shadow-lg flex items-center justify-center text-white/50`}>
                       <User size={24} />
                    </div>
                    <div>
                      <div className="text-xs text-stone-500 uppercase tracking-wider font-mono">Current Identity</div>
                      <div className="text-stone-200 font-bold font-kr">{userProfile.codename}</div>
                    </div>
                  </div>

                  <form onSubmit={handleCreatePost} className="space-y-4">
                     <div>
                        <textarea 
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          placeholder={`${userProfile.codename}님, 새로운 소식이 있나요?`}
                          disabled={isSubmitting}
                          className="w-full bg-[#050505] border border-stone-800 p-4 text-stone-300 focus:border-gold-600 outline-none transition-colors h-32 resize-none font-serif text-base leading-relaxed custom-scrollbar placeholder:text-stone-700"
                        />
                     </div>

                     <div className="flex items-center justify-end pt-2">
                        <button 
                            type="submit"
                            disabled={!newPostContent.trim() || isSubmitting}
                            className="px-6 py-2 bg-stone-900 border border-stone-700 text-stone-400 hover:text-gold-400 hover:border-gold-500 hover:bg-black transition-all uppercase tracking-widest text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                         >
                            {isSubmitting ? 'Sending...' : 'Broadcast'} <Send size={14} />
                         </button>
                     </div>
                  </form>
               </div>
             ) : (
              // NOT LOGGED IN: Show Embedded Registration Form
               <div className="lg:sticky lg:top-32 bg-[#111] border border-stone-800 p-8 shadow-2xl relative overflow-hidden group rounded-sm">
                  {/* Decorative Top Border */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-900 via-gold-500 to-gold-900"></div>
                  
                  <div className="text-center mb-6">
                     <Feather size={32} className="mx-auto text-gold-600 mb-3" />
                     <h3 className="font-display text-2xl text-stone-200">Guest Registration</h3>
                     <p className="text-stone-500 text-sm mt-2 font-serif">카시미 백작가의 이야기에 참여해보세요.</p>
                  </div>

                  <form onSubmit={handleRegister}>
                     <div className="mb-6">
                       <label className="block text-xs font-mono text-stone-500 uppercase mb-2 text-center">Nickname</label>
                       <input 
                         type="text" 
                         value={inputCodename}
                         onChange={(e) => setInputCodename(e.target.value)}
                         className="w-full bg-[#050505] border border-stone-700 p-3 text-stone-200 focus:border-gold-500 outline-none text-center font-bold tracking-widest text-base"
                         placeholder="닉네임 입력"
                         maxLength={12}
                       />
                     </div>

                     <div className="mb-8">
                       <label className="block text-xs font-mono text-stone-500 uppercase mb-3 text-center">Avatar Color</label>
                       <div className="grid grid-cols-6 gap-2">
                         {AVATAR_COLORS.map(color => (
                           <button
                             key={color}
                             type="button"
                             onClick={() => setSelectedAvatarColor(color)}
                             className={`w-8 h-8 rounded-full ${color} mx-auto transition-transform hover:scale-110 ${selectedAvatarColor === color ? 'ring-2 ring-gold-500 scale-110' : 'opacity-70'}`}
                           />
                         ))}
                       </div>
                     </div>

                     <button 
                       type="submit"
                       disabled={!inputCodename.trim()}
                       className="w-full py-3 bg-stone-900 border border-stone-700 text-stone-400 hover:text-gold-400 hover:border-gold-500 hover:bg-black transition-all uppercase tracking-widest text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       등록 완료 (Enter)
                     </button>
                  </form>
                  
                  <p className="text-center text-[10px] text-stone-600 mt-4 font-mono break-keep">
                    * 별도의 회원가입 없이 브라우저에 저장됩니다.
                  </p>
               </div>
             )}
          </div>

          {/* Feed Column (Right) */}
          <div className="w-full lg:w-2/3 order-2 space-y-6 pb-20">
             {posts.length === 0 && !connectionError && (
               <div className="text-center py-20 border border-stone-800 border-dashed rounded opacity-50">
                  <p className="text-stone-500">No signals detected yet...</p>
               </div>
             )}

             {posts.map((post) => (
               <div key={post.id} className="bg-[#111] border border-stone-800/60 p-6 md:p-8 hover:border-stone-700 transition-all duration-300 group rounded-sm shadow-xl">
                  
                  {/* Post Header */}
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${post.avatarColor || 'bg-stone-800'} border border-stone-700 flex items-center justify-center text-white/50 shadow-inner`}>
                           <User size={20} />
                        </div>
                        <div>
                           <div className="flex items-center gap-2">
                             <div className="font-kr font-bold text-stone-300 text-sm">{post.author}</div>
                             {post.isMine && (
                               <span className="text-[10px] bg-gold-900/30 text-gold-500 px-1.5 py-0.5 rounded border border-gold-900/50">ME</span>
                             )}
                           </div>
                           <div className="text-xs text-stone-600 font-mono">{post.timestamp}</div>
                        </div>
                     </div>
                     <div className="relative">
                        {post.isMine ? (
                          <button 
                            onClick={() => handleDeletePost(post.id)}
                            className="text-stone-700 hover:text-red-500 transition-colors p-1"
                            title="Delete Post"
                          >
                             <Trash2 size={18} />
                          </button>
                        ) : (
                          <button className="text-stone-700 hover:text-stone-400 cursor-not-allowed">
                             <MoreHorizontal size={20} />
                          </button>
                        )}
                     </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6 pl-13">
                     <p className="font-serif text-stone-400 leading-relaxed whitespace-pre-line text-sm md:text-base">
                        {post.content}
                     </p>
                     
                     {post.tags && (
                        <div className="flex gap-2 mt-4">
                           {post.tags.map(tag => (
                              <span key={tag} className="text-xs text-gold-600/70 font-mono flex items-center">
                                 <Hash size={10} className="mr-0.5" />{tag}
                              </span>
                           ))}
                        </div>
                     )}
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center gap-6 border-t border-stone-800 pt-4 text-stone-500">
                     <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 transition-colors group/like ${likedPostIds.has(post.id) ? 'text-red-500' : 'hover:text-red-400'}`}
                     >
                        <Heart size={18} className={likedPostIds.has(post.id) ? 'fill-red-500' : 'group-hover/like:fill-red-400/20'} />
                        <span className="text-xs font-mono">{post.likes}</span>
                     </button>
                     
                     <button 
                        onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)}
                        className={`flex items-center gap-2 transition-colors ${activeCommentId === post.id ? 'text-blue-400' : 'hover:text-blue-400'}`}
                     >
                        <MessageSquare size={18} />
                        <span className="text-xs font-mono">{post.comments.length}</span>
                     </button>

                     <button 
                        onClick={() => handleShare(post.id)}
                        className="flex items-center gap-2 hover:text-green-400 transition-colors ml-auto relative"
                        title="Copy Encrypted Link"
                     >
                        {copiedId === post.id ? (
                          <>
                             <Check size={18} className="text-green-500" />
                             <span className="absolute -top-8 right-0 bg-green-900/90 text-green-200 text-[10px] px-2 py-1 rounded whitespace-nowrap">
                                Copied
                             </span>
                          </>
                        ) : (
                          <Share2 size={18} />
                        )}
                     </button>
                  </div>

                  {/* Comments Section */}
                  {activeCommentId === post.id && (
                     <div className="mt-6 bg-[#050505] border border-stone-800 p-4 animate-fadeIn rounded-sm">
                        <div className="space-y-4 mb-4 max-h-60 overflow-y-auto custom-scrollbar">
                           {post.comments.length === 0 ? (
                              <p className="text-xs text-stone-600 italic text-center py-2">아직 댓글이 없습니다.</p>
                           ) : (
                              post.comments.map(comment => (
                                 <div key={comment.id} className="text-sm flex gap-3">
                                    <div className={`w-6 h-6 rounded-full shrink-0 ${comment.avatarColor || 'bg-stone-800'} flex items-center justify-center`}>
                                       <User size={12} className="text-white/50"/>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex justify-between items-baseline mb-1">
                                         <span className="font-kr font-bold text-stone-500 text-xs">
                                            {comment.author}
                                            {/* We don't track isMine for comments perfectly in this simple model, so omitting for now */}
                                         </span>
                                         <span className="font-mono text-[10px] text-stone-700">
                                            {/* Simple date formatting */}
                                            {comment.timestamp.includes('T') ? comment.timestamp.split('T')[0] : comment.timestamp}
                                         </span>
                                      </div>
                                      <p className="text-stone-400 font-serif leading-relaxed">{comment.content}</p>
                                    </div>
                                 </div>
                              ))
                           )}
                        </div>

                        {/* Add Comment Input */}
                        <div className="flex gap-2">
                           <input 
                              type="text" 
                              value={newCommentContent}
                              onChange={(e) => setNewCommentContent(e.target.value)}
                              placeholder={userProfile ? "댓글 달기..." : "로그인이 필요합니다"}
                              disabled={!userProfile}
                              className="flex-1 bg-transparent border-b border-stone-700 py-2 text-stone-300 text-base focus:border-gold-600 outline-none disabled:cursor-not-allowed disabled:placeholder:text-stone-700"
                              onKeyDown={(e) => e.key === 'Enter' && handleCreateComment(post.id)}
                           />
                           <button 
                              onClick={() => handleCreateComment(post.id)}
                              disabled={!userProfile || !newCommentContent.trim()}
                              className="text-gold-600 hover:text-gold-400 text-xs font-bold uppercase disabled:opacity-30"
                           >
                              Reply
                           </button>
                        </div>
                     </div>
                  )}

               </div>
             ))}
             
             {/* End of Feed */}
             <div className="text-center py-8 opacity-50">
                <Shield size={24} className="mx-auto text-stone-700 mb-2" />
                <p className="text-stone-700 text-xs font-mono">End of Secure Transmission</p>
             </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Community;