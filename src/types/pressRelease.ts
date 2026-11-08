export interface PressRelease {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  date: string;        // Press release / announcement date, ISO format
  artistId?: string;   // If artist-specific
  excerpt: string;     // 2-3 sentences for cards
  content: string;     // Full content
  featured: boolean;
  tags: string[];
  coverImage?: string;  // Optional release artwork for blog post + social metadata
  pressReleasePdf?: string; // Optional downloadable press release PDF
  buyVinylUrl?: string; // External vinyl purchase link
  igPostUrl?: string;   // Instagram post URL
}

