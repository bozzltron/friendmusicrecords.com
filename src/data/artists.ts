import type { Artist } from '../types/artist';

export const artists: Artist[] = [
  {
    id: 'mozworth',
    slug: 'mozworth',
    name: 'mozworth',
    bio: {
      short: 'Austin-based indie alternative rock artist blending \'90s nostalgia with modern vulnerability. Guitar-driven songs about myth, nature, and the human experience.',
      full: `mozworth is the musical project of Austin-based singer-songwriter Michael "Boz" Bosworth. Drawing from the depths of '90s alternative rock and the vulnerability of modern indie, mozworth creates music that feels both timeless and urgently present.

With a self-titled debut album released in November 2024, mozworth has garnered attention from KUTX (Song of the Day) and international music publications including Plastic Magazine, The Big Takeover, and It's All Indie. His songwriting blends personal narrative with universal themes, crafted during isolated writing sessions in remote locations from Lake Superior to Colorado Springs to the Gulf Coast.

Now based in South Austin with his family, mozworth continues to evolve his sound alongside collaborators Mike Hall (drums), Mark Heaps (guitar), and Jack Schultz (bass), creating music that captures the complexity of modern life with honesty, melody, and raw power.

Under Friend Music Records, mozworth released his breakout single "Sandpiper" in September 2025, an ocean-soaked anthem inspired by myth, nature, and the quiet messengers all around us. The track showcases his signature blend of indie delicacy, rock muscle, psychedelic color, and surf finesse—earning critical acclaim from both domestic and international press.`
    },
    genre: ['Indie Rock', 'Alternative Rock', 'Indie Alternative'],
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
      bandcamp: 'https://mozworth.bandcamp.com',
      spotify: 'https://open.spotify.com/artist/19yvsMNCISApooxkEt0aMO',
      instagram: 'https://www.instagram.com/mozworthmusic/',
      bluesky: 'https://bsky.app/profile/mozworth.music',
      youtube: 'https://www.youtube.com/@mozworthmusic',
      facebook: 'https://www.facebook.com/mozworth'
    },
    contact: {
      press: 'ryan@pressjunkiepr.com',
      general: 'info@friendmusic.com'
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

