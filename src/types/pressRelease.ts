export interface PressRelease {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  date: string;        // ISO date format
  artistId?: string;   // If artist-specific
  excerpt: string;     // 2-3 sentences for cards
  content: string;     // Full content
  featured: boolean;
  tags: string[];
}

