
export enum CharacterRole {
  Protagonist = "Protagonist",
  Antagonist = "Antagonist",
  Support = "Support"
}

export interface CharacterStats {
  rank: string; // e.g. "3성역 (대가)"
  str: string; // Force/Physical
  int: string; // Intelligence/Strategy
  cha: string; // Influence/Charm
  special: string; // Special Ability Name
}

export interface VoiceLine {
  label: string; 
  text: string;
}

export interface Relationship {
  targetId: string;
  name: string;
  relation: string; 
  description: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  engName: string;
  title: string;
  description: string; // Short summary
  quote: string;
  colorTheme: string; 
  imagePlaceholder: string; // Default Image
  expressions?: { [key: string]: string }; // Optional: Map of expression names to URLs
  
  // Data Sections
  stats: CharacterStats;
  
  personalInfo: {
    age: string;
    height: string;
    appearance: string;
    personality: string;
    likes: string[];
    dislikes: string[];
  };

  combatInfo: {
    style: string;
    weakness: string;
    weapon: string;
    abilities: string[]; // List of skills
  };

  history: string; // Background story

  voiceLines: VoiceLine[];
  relationships: Relationship[];
  
  episode: {
    title: string;
    content: string;
  };
}

export interface WorldLore {
  title: string;
  subtitle: string;
  content: string; // Summary for the card
  tags: string[];
  // New extended fields
  details: string[]; // Detailed paragraphs
  secretNote: string; // Confidential information
  clearanceLevel?: string; // Flavor text
}

// New Types for Prologue
export interface DialogueFrame {
  id: number;
  speakerId: 'lin' | 'ran' | 'narrator';
  text: string;
  expression?: string; // Key matching the character's expressions map
}

// Updated Types for Real Community
export interface UserProfile {
  codename: string;
  avatarColor: string; // Hex color code or gradient class
  joinedAt: string;
}

export interface CommunityComment {
  id: string;
  author: string;
  avatarColor?: string;
  content: string;
  timestamp: string;
  isMine?: boolean;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatarColor?: string; // For the profile pic circle
  content: string;
  image?: string; // Base64 image data
  likes: number;
  comments: CommunityComment[];
  timestamp: string;
  tags?: string[];
  isMine?: boolean; // To allow deletion
}

// Gallery Types
export interface GalleryItem {
  url: string;
  title: string;
}

export interface GalleryData {
  lin: {
    daily: GalleryItem[];
    r18: GalleryItem[];
  };
  ran: {
    daily: GalleryItem[];
    r18: GalleryItem[];
  };
}