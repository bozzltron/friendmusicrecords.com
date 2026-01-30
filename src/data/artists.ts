import type { Artist } from '../types/artist';

export const artists: Artist[] = [
  {
    id: 'mozworth',
    slug: 'mozworth',
    name: 'mozworth',
    bio: {
      short: 'Austin-based four-piece indie alternative rock band blending \'90s nostalgia with modern vulnerability. Guitar-driven songs about myth, nature, and the human experience.',
      full: `mozworth is a four-piece indie alternative rock band based in Austin, Texas. Originally founded by Michael "Boz" Bosworth, the band now includes Mark Heaps on electric guitar, Jack Schultz on bass, and Mike Hall on drums. Drawing from the depths of '90s alternative rock and the vulnerability of modern indie, mozworth creates music that feels both timeless and urgently present.

With a self-titled debut album released in November 2024, mozworth has garnered attention from KUTX (Song of the Day) and international music publications including Plastic Magazine, The Big Takeover, and It's All Indie. Their songwriting blends personal narrative with universal themes, crafted through collaborative sessions that capture the complexity of modern life with honesty, melody, and raw power.

Under friend music records, mozworth released their breakout single "Sandpiper" in September 2025, an ocean-soaked anthem inspired by myth, nature, and the quiet messengers all around us. The track showcases their signature blend of indie delicacy, rock muscle, psychedelic color, and surf finesse—earning critical acclaim from both domestic and international press.`
    },
    genre: ['Indie Rock', 'Alternative Rock'],
    location: {
      city: 'Austin',
      state: 'TX',
      country: 'US'
    },
    image: {
      thumbnail: '/mozworth-logo.jpg',
      hero: '/mozworth-10-11-2025.webp'
    },
    status: 'active',
    featured: true,
    dateJoined: '2024-11-01',
    socialLinks: {
      website: 'https://mozworth.music',
      spotify: 'https://open.spotify.com/artist/19yvsMNCISApooxkEt0aMO',
      appleMusic: 'https://music.apple.com/us/artist/mozworth/1761894108',
      bandcamp: 'https://mozworth.bandcamp.com',
      youtube: 'https://www.youtube.com/@mozworthmusic',
      soundcloud: 'https://soundcloud.com/mozworth',
      instagram: 'https://www.instagram.com/mozworthmusic/',
      tiktok: 'https://www.tiktok.com/@mozworthmusic',
      bluesky: 'https://bsky.app/profile/mozworth.music',
      facebook: 'https://www.facebook.com/mozworth',
      reddit: 'https://www.reddit.com/user/mozworth/'
    },
    contact: {
      press: 'ryan@pressjunkiepr.com',
      general: 'info@friendmusicrecords.com'
    },
    epkPdf: '/mozworth-EPK.pdf'
  }
];

// Helper functions
export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find(artist => artist.slug === slug);
}

export function getFeaturedArtists(): Artist[] {
  return artists.filter(artist => artist.featured);
}

export function getActiveArtists(): Artist[] {
  return artists.filter(artist => artist.status === 'active');
}

