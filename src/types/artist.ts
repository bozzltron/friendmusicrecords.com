export interface Artist {
  id: string;
  slug: string;
  name: string;
  bio: {
    short: string;      // 2-3 sentences for cards
    full: string;       // Full bio for EPK
  };
  genre: string[];
  location: {
    city: string;
    state?: string;
    country: string;
  };
  image: {
    thumbnail: string;  // For cards
    hero: string;       // For EPK header
  };
  status: 'active' | 'upcoming' | 'alumni';
  featured: boolean;
  dateJoined: string;  // ISO date
  socialLinks?: {
    website?: string;
    bandcamp?: string;
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    instagram?: string;
    facebook?: string;
    bluesky?: string;
    tiktok?: string;
    soundcloud?: string;
  };
  contact?: {
    press?: string;
    booking?: string;
    general?: string;
  };
  epkPdf?: string;  // Path to EPK PDF file (e.g., '/mozworth-EPK.pdf')
}

