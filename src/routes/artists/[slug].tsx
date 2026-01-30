import { Show, For } from "solid-js";
import { useParams, A } from "@solidjs/router";
import { StandardMetadata, createArtistData } from "../../utils/metadata";
import { getArtistBySlug } from "../../data/artists";
import { pressReleases } from "../../data/pressReleases";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

export default function ArtistEPK() {
  const params = useParams();
  const artist = getArtistBySlug(params.slug);

  // Get press releases for this artist
  const artistPressReleases = () => 
    pressReleases
      .filter(pr => pr.artistId === artist?.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // If artist not found, show 404
  if (!artist) {
    return (
      <div class="min-h-screen flex items-center justify-center bg-bg-primary text-text-primary">
        <div class="text-center">
          <h1 class="text-4xl font-bold mb-4">Artist Not Found</h1>
          <p class="text-text-secondary mb-8">The artist you're looking for doesn't exist.</p>
          <A href="/artists" class="px-6 py-3 bg-transparent text-white rounded-md border border-border-default hover:border-border-hover hover:bg-bg-tertiary transition-colors">
            View All Artists
          </A>
        </div>
      </div>
    );
  }

  return (
    <>
      <StandardMetadata
        title={`${artist.name} - Electronic Press Kit | friend music records`}
        description={artist.bio.short}
        url={`https://www.friendmusic.com/artists/${artist.slug}/`}
        type="music.musician"
        keywords={`${artist.name}, press kit, EPK, electronic press kit, ${artist.genre.join(', ')}, ${artist.location.city}, friend music records, record label artist, indie artist`}
        author={artist.name}
        image={artist.image.hero}
        imageAlt={`${artist.name} official press photo`}
        structuredData={createArtistData({
          name: artist.name,
          url: `https://www.friendmusic.com/artists/${artist.slug}/`,
          image: artist.image.hero,
          description: artist.bio.full,
          genre: artist.genre,
          location: artist.location,
        })}
      />

      <div class="flex flex-col min-h-screen">
        <a 
          href="#main-content" 
          class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 px-4 py-2 rounded focus:outline-none focus:ring-2 z-50"
          style={{ 
            "background": "var(--accent-primary)",
            "color": "var(--bg-primary)"
          }}
        >
          Skip to main content
        </a>

        <Navigation />
        
        <main 
          id="main-content" 
          class="flex-1 px-4 py-16" 
          role="main"
          style={{ "background": "var(--bg-primary)" }}
        >
          <div class="max-w-5xl mx-auto">
            <div 
              class="rounded-xl p-6 md:p-10 border" 
              style={{ 
                "background": "var(--bg-secondary)", 
                "border-color": "var(--border-default)" 
              }}
            >
              
              {/* Hero Section */}
              <div class="text-center mb-10">
                <img 
                  src={artist.image.thumbnail} 
                  alt={`${artist.name} logo`} 
                  class="w-32 mb-4 mx-auto"
                  width="128"
                  height="128"
                  loading="eager"
                  fetchpriority="high"
                />
                <h1 class="text-4xl md:text-5xl font-bold mb-2">Press Kit</h1>
                <div class="text-text-secondary text-lg text-center">
                  {artist.location.city}-based {artist.genre[0]} Artist
                </div>
              </div>

              {/* Banner Image */}
              <Show when={artist.id === 'mozworth'}>
                <div class="mb-12 -mx-6 md:-mx-10">
                  <img 
                    src={artist.image.hero}
                    alt={`${artist.name} press photo`}
                    class="w-full h-auto rounded-lg"
                    width="1200"
                    height="800"
                    loading="eager"
                    fetchpriority="high"
                  />
                </div>
              </Show>

              {/* Featured Single */}
              <Show when={artist.id === 'mozworth'}>
                <section 
                  class="mb-12 p-6 rounded-lg border" 
                  style={{ 
                    "background": "var(--bg-secondary)", 
                    "border-color": "var(--border-default)" 
                  }}
                  aria-labelledby="featured-release-heading"
                >
                  <h2 id="featured-release-heading" class="text-2xl font-bold mb-6 text-accent-primary">Featured Release</h2>
                  <article class="flex flex-col md:flex-row gap-6 items-center">
                    <img
                      src="/storyofanartist.webp"
                      alt="Story of an Artist cover art"
                      class="w-full md:w-80 h-[420px] rounded-lg shadow-lg object-cover"
                      loading="lazy"
                    />
                    <div class="flex-1">
                      <h3 class="text-3xl font-bold mb-4">Story of an Artist</h3>
                      <p class="text-text-secondary mb-2">
                        <span class="sr-only">Release type:</span>Single 
                        <span aria-hidden="true"> • </span>
                        <span class="sr-only">Released on:</span>
                        <time datetime="2026-01-22">Released January 22, 2026</time>
                      </p>
                      <p class="text-text-primary/90 mb-4 leading-relaxed">
                        A dreamy DIY reinterpretation of Daniel Johnston's classic, honoring the original by digging deep into Daniel's own inspiration and playing in the spirit of his heroes. Released on Hi, How Are You Day—a celebration of Daniel's birthday and Austin's city-wide reminder to check in on friends' mental health.
                      </p>
                      <A 
                        href={`/press/${artistPressReleases()[0]?.slug}`}
                        class="inline-block px-6 py-3 bg-transparent text-white rounded-full font-semibold border border-border-default hover:border-border-hover hover:bg-bg-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring"
                        aria-label="View more information about Story of an Artist"
                      >
                        More Info
                      </A>
                    </div>
                  </article>
                </section>
              </Show>

              {/* Quick Links */}
              <section class="mb-12" aria-labelledby="quick-links-heading">
                <h2 id="quick-links-heading" class="text-2xl font-bold mb-8 text-accent-primary">Quick Links</h2>
                <nav aria-label="Press kit quick links">
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Show when={artist.socialLinks?.spotify}>
                      <a 
                        href={artist.socialLinks!.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 bg-transparent text-white rounded-lg border border-border-default hover:border-border-hover hover:bg-bg-primary transition-colors font-medium text-center focus:outline-none focus:ring-2 focus:ring-focus-ring"
                      >
                        Spotify
                      </a>
                    </Show>
                    <Show when={artist.socialLinks?.bandcamp}>
                      <a 
                        href={artist.socialLinks!.bandcamp}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 bg-transparent text-white rounded-lg border border-border-default hover:border-border-hover hover:bg-bg-primary transition-colors font-medium text-center focus:outline-none focus:ring-2 focus:ring-focus-ring"
                      >
                        Bandcamp
                      </a>
                    </Show>
                    <Show when={artist.socialLinks?.youtube}>
                      <a 
                        href={artist.socialLinks!.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 bg-transparent text-white rounded-lg border border-border-default hover:border-border-hover hover:bg-bg-primary transition-colors font-medium text-center focus:outline-none focus:ring-2 focus:ring-focus-ring"
                      >
                        YouTube
                      </a>
                    </Show>
                    <Show when={artist.socialLinks?.instagram}>
                      <a 
                        href={artist.socialLinks!.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 bg-transparent text-white rounded-lg border border-border-default hover:border-border-hover hover:bg-bg-primary transition-colors font-medium text-center focus:outline-none focus:ring-2 focus:ring-focus-ring"
                      >
                        Instagram
                      </a>
                    </Show>
                    <Show when={artist.socialLinks?.bluesky}>
                      <a 
                        href={artist.socialLinks!.bluesky}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 bg-transparent text-white rounded-lg border border-border-default hover:border-border-hover hover:bg-bg-primary transition-colors font-medium text-center focus:outline-none focus:ring-2 focus:ring-focus-ring"
                      >
                        Bluesky
                      </a>
                    </Show>
                    <Show when={artist.contact?.press}>
                      <a 
                        href="/contact"
                        class="px-4 py-3 bg-transparent text-white rounded-lg border border-border-default hover:border-border-hover hover:bg-bg-primary transition-colors font-medium text-center focus:outline-none focus:ring-2 focus:ring-focus-ring"
                      >
                        Contact
                      </a>
                    </Show>
                  </div>
                </nav>
              </section>

              {/* Download Assets */}
              <Show when={artist.id === 'mozworth'}>
                <section 
                  class="mb-12 p-6 rounded-lg border" 
                  style={{ 
                    "background": "var(--bg-secondary)", 
                    "border-color": "var(--border-default)" 
                  }}
                  aria-labelledby="download-assets-heading"
                >
                  <h2 id="download-assets-heading" class="text-2xl font-bold mb-6 text-accent-primary">Download Assets</h2>
                  <p class="text-text-secondary mb-4">High-resolution press materials for media use</p>
                  <nav aria-label="Downloadable press materials">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <a 
                        href="/storyofanartist.webp" 
                        download="mozworth-story-of-an-artist-cover-art.webp"
                        class="flex items-center px-4 py-3 bg-transparent text-white rounded-lg border border-border-default hover:border-border-hover hover:bg-bg-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-focus-ring"
                        aria-label="Download Story of an Artist cover art (high-resolution image)"
                      >
                        <div>
                          <div class="font-semibold">Story of an Artist Cover Art</div>
                          <div class="text-xs opacity-70">High-resolution image</div>
                        </div>
                      </a>
                      <a 
                        href="/mozworth-press-photo.webp" 
                        download="mozworth-press-photo.webp"
                        class="flex items-center px-4 py-3 bg-transparent text-white rounded-lg border border-border-default hover:border-border-hover hover:bg-bg-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-focus-ring"
                        aria-label="Download official mozworth press photo (high-resolution)"
                      >
                        <div>
                          <div class="font-semibold">Press Photo</div>
                          <div class="text-xs opacity-70">Official artist photo</div>
                        </div>
                      </a>
                      <Show when={artist.epkPdf}>
                        <a 
                          href={artist.epkPdf!}
                          download={`${artist.slug}-epk.pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="flex items-center px-4 py-3 bg-transparent text-white rounded-lg border border-border-default hover:border-border-hover hover:bg-bg-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-focus-ring"
                          aria-label={`Download ${artist.name} electronic press kit (PDF)`}
                        >
                          <div>
                            <div class="font-semibold">EPK PDF</div>
                            <div class="text-xs opacity-70">Complete press kit document</div>
                          </div>
                        </a>
                      </Show>
                      <a 
                        href="/contact"
                        class="flex items-center px-4 py-3 bg-transparent text-white rounded-lg border border-border-default hover:border-border-hover hover:bg-bg-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-focus-ring"
                        aria-label="Contact Friend Music Records for press materials"
                      >
                        <div>
                          <div class="font-semibold">Contact for Materials</div>
                          <div class="text-xs opacity-70">friend music records</div>
                        </div>
                      </a>
                    </div>
                  </nav>
                </section>
              </Show>

              {/* Press Release */}
              <Show when={artist.id === 'mozworth'}>
                <section 
                  id="press-release" 
                  class="mb-12 p-6 rounded-lg border" 
                  style={{ 
                    "background": "var(--bg-secondary)", 
                    "border-color": "var(--border-default)" 
                  }}
                  aria-labelledby="press-release-heading"
                >
                  <h2 id="press-release-heading" class="text-2xl font-bold mb-6 text-accent-primary">Press Release</h2>
                  <article class="prose prose-invert max-w-none text-text-primary/90 leading-relaxed">
                    <p class="font-bold mb-4">FOR IMMEDIATE RELEASE</p>
                    <p class="mb-4 text-xl font-semibold">mozworth – Indie‑Alt Rock Outfit Releases a New Cover of Daniel Johnston's "Story of an Artist"</p>
                    <p class="mb-4"><strong>Austin, TX – January 9, 2026</strong></p>
                    <p class="mb-4">South‑Austin band mozworth is proud to announce the digital release of their re‑imagined version of Daniel Johnston's classic <em>Story of an Artist</em>. The track drops on January 22, 2026—the day that celebrates both Johnston's birthday and Austin's "Hi, How Are You Day," a city‑wide reminder to check in on friends' mental health. By pairing the tribute with this civic observance, mozworth hopes to honor Daniel's legacy in song and in community.</p>
                    <p class="mb-4">The song has long spoke to Michael Bosworth. "It is such a vivid picture of Daniel's experience. It contains some profound perspectives along with some deep pain. Sonically, it's beautiful." he says. "I remember working on the demo and getting caught up with emotion. I was able to connect with his pain."</p>
                    <p class="mb-4">Paying homage to Daniel isn't new for mozworth. Last year was the first release of this kind with "Walking The Cow". "Story of an Artist" is the second installment. "We knew we were going to record this song early and I had a demo but we waited till late in the year to get recording", says Michael Bosworth. "We quickly realized that everyone's schedules were too fragmented for a traditional in‑person studio day." Instead, they pieced the song together digitally.</p>
                    <p class="mb-4">They had a demo, but they needed drums. They needed Mike. When Mike heard the demo, he heard the Beatles—a natural homage, given Daniel Johnston's lifelong admiration for the Fab Four. The band embraced the idea, swapping their usual twin‑electric‑guitar attack for a mandolin and upright bass.</p>
                    <p class="mb-4">Each member showed up with their instrument, wrote their part, and recorded it on the spot. Mark Heaps on mandolin. Jack Schultz on upright bass. Michael Bosworth on electric guitar. "These guys showed up really having no idea what to play and reacting to the recording. There is a spontaneity to it. A trust in our intuition that brings some magic.", says Michael Bosworth.</p>
                    <p class="mb-4">Mandolin, bass, guitar, and vocals were recorded at mozworth's South‑Austin space; drums and auxiliary percussion at Mike Hall's home studio. A brief nod to the gear: a set of vintage microphones and preamps borrowed from friend Josh Wolfer to give this release a new sound. Mixing and mastering were handled by Steven Glaze at Tone Freq Studios.</p>
                    <p class="mb-4">mozworth's <em>Story of an Artist</em> is a dreamy DIY reinterpretation that honors the original by digging deep into Daniel's own inspiration and playing in the spirit of his heroes.</p>
                    <p class="mb-4">January 22 is Hi, How Are You Day in Austin and several other cities, a grassroots campaign encouraging residents to reach out to friends and family about mental‑health wellbeing.</p>
                    <p class="mb-4">mozworth is currently booking dates in the Austin area to support the release and they are in the process of recording their next full length album expected late 2026.</p>
                    <p class="mb-6 font-semibold">Story of an Artist releases January 22, 2026</p>
                    <p class="mb-4">For media inquiries, interviews, or press materials, please contact:</p>
                    <p class="mb-1">friend music records PR<br />email: <a href="mailto:info@friendmusic.com" class="text-accent-primary underline hover:no-underline">info@friendmusic.com</a><br />phone: +1 (515) 418‑7894</a></p>
                  </article>
                </section>
              </Show>

              {/* Press Coverage */}
              <Show when={artist.id === 'mozworth'}>
                <section 
                  class="mb-12 p-6 rounded-lg border" 
                  style={{ 
                    "background": "var(--bg-secondary)", 
                    "border-color": "var(--border-default)" 
                  }}
                  aria-labelledby="press-coverage-heading"
                >
                  <h2 id="press-coverage-heading" class="text-2xl font-bold mb-6 text-accent-primary">Press Coverage</h2>
                  <div class="space-y-6">
                    <div class="border-b border-border-default pb-6 last:border-b-0 last:pb-0">
                      <h3 class="text-xl font-semibold mb-3">Plastic Magazine</h3>
                      <p class="text-text-secondary text-sm mb-3">September 22, 2025</p>
                      <p class="text-text-primary/80 mb-3 leading-relaxed">
                        Plastic Magazine praises "Sandpiper" as "a spectacular alternative jam that's timeless and truly absorbing throughout," highlighting the track's "intricate ebb and flow between the mellow verses and charge of exhilarating choruses." The review celebrates mozworth's "songwriting flair and performance talent" and calls it "an incredible display" of his musical evolution.
                      </p>
                      <a 
                        href="https://plasticmag.co.uk/2025/09/mozworth-drops-new-single-sandpiper/" 
                        target="_blank" 
                        rel="noopener" 
                        class="text-accent-primary hover:no-underline underline font-medium"
                      >
                        Read Full Review →
                      </a>
                    </div>
                    <div class="border-b border-border-default pb-6 last:border-b-0 last:pb-0">
                      <h3 class="text-xl font-semibold mb-3">The Big Takeover</h3>
                      <p class="text-text-secondary text-sm mb-3">September 17, 2025</p>
                      <p class="text-text-primary/80 mb-3 leading-relaxed">
                        The Big Takeover praises "Sandpiper" for its depth and duality, describing it as music that "ebbs and flows between folky understatement and the roar of rock and roll at its finest" and calling it "a blend of indie delicacy, rock muscle, psychedelic colour, and surf finesse."
                      </p>
                      <a 
                        href="https://bigtakeover.com/recordings/mozworth-sandpiper-balanced-scale-media" 
                        target="_blank" 
                        rel="noopener" 
                        class="text-accent-primary hover:no-underline underline font-medium"
                      >
                        Read Full Review →
                      </a>
                    </div>
                    <div class="border-b border-border-default pb-6 last:border-b-0 last:pb-0">
                      <h3 class="text-xl font-semibold mb-3">It's All Indie</h3>
                      <p class="text-text-secondary text-sm mb-3">September 14, 2025</p>
                      <p class="text-text-primary/80 mb-3 leading-relaxed">
                        It's All Indie describes "Sandpiper" as "a clear-cut slice of shimmering indie-pop with a slightly scuzzy undertone of grunge guitar sounds" and praises the track as "a breezy indie-pop gem with grungy undertones, jangly new-wave hooks, and lush melodies."
                      </p>
                      <a 
                        href="https://www.itsallindie.com/2025/09/mozworth-reveals-bold-new-single.html" 
                        target="_blank" 
                        rel="noopener" 
                        class="text-accent-primary hover:no-underline underline font-medium"
                      >
                        Read Full Review →
                      </a>
                    </div>
                  </div>
                  <div class="mt-6">
                    <a 
                      href="https://mozworth.music/press" 
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-block px-6 py-3 bg-transparent text-white rounded-full font-semibold border border-border-default hover:border-border-hover hover:bg-bg-tertiary transition-colors"
                    >
                      View All Press Coverage
                    </a>
                  </div>
                </section>
              </Show>

              {/* Credits */}
              <Show when={artist.id === 'mozworth'}>
                <section 
                  class="mb-12 p-6 rounded-lg border" 
                  style={{ 
                    "background": "var(--bg-secondary)", 
                    "border-color": "var(--border-default)" 
                  }}
                  aria-labelledby="credits-heading"
                >
                  <h2 id="credits-heading" class="text-2xl font-bold mb-6 text-accent-primary">Credits - Story of an Artist</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-text-primary/90">
                    <div>
                      <p class="mb-2">Written by Daniel Johnston</p>
                      <p class="mb-2">Arrangement by Michael Bosworth</p>
                      <p class="mb-2">Produced by Michael Bosworth</p>
                    </div>
                    <div>
                      <p class="mb-2">Electric Guitar and Vocals performed by Michael Bosworth</p>
                      <p class="mb-2">Mandolin performed by Mark Heaps</p>
                      <p class="mb-2">Upright Bass performed by Jack Schultz</p>
                      <p class="mb-2">Drums and Auxiliary Percussion performed by Mike Hall</p>
                    </div>
                    <div class="md:col-span-2">
                      <p class="mb-2">Recorded by Michael Bosworth (mandolin, bass, guitar, vocals at mozworth's South-Austin space) and Mike Hall (drums and auxiliary percussion at Mike Hall's home studio)</p>
                      <p class="mb-2">Mixed and Mastered by Steven Glaze at <a href="https://stevenglaze.com/" target="_blank" rel="noopener" class="text-accent-primary underline hover:no-underline">Tone Freq Studios</a></p>
                      <p class="mb-2">Vintage microphones and preamps borrowed from Josh Wolfer</p>
                    </div>
                  </div>
                </section>
              </Show>

              {/* Artist Bio */}
              <section 
                class="mb-12 p-6 rounded-lg border" 
                style={{ 
                  "background": "var(--bg-secondary)", 
                  "border-color": "var(--border-default)" 
                }}
                aria-labelledby="about-heading"
              >
                <h2 id="about-heading" class="text-2xl font-bold mb-6 text-accent-primary">About {artist.name}</h2>
                <div class="text-text-primary/90 leading-relaxed space-y-4">
                  <For each={artist.bio.full.split('\n\n')}>
                    {(paragraph) => <p>{paragraph}</p>}
                  </For>
                </div>
              </section>

              {/* Contact */}
              <Show when={artist.contact}>
                <section 
                  class="mb-12 p-6 rounded-lg border text-center" 
                  style={{ 
                    "background": "var(--bg-secondary)", 
                    "border-color": "var(--border-default)" 
                  }}
                  aria-labelledby="contact-heading"
                >
                  <h2 id="contact-heading" class="text-2xl font-bold mb-6 text-accent-primary">Media Contact</h2>
                  <div class="text-text-primary/90 mb-4">For interviews, press materials, or media inquiries:</div>
                  <div class="text-lg mb-4">
                    <p class="font-semibold">friend music records</p>
                    <p class="text-text-secondary">Austin, TX</p>
                    <a href="mailto:info@friendmusic.com" class="text-accent-primary hover:no-underline underline">info@friendmusic.com</a>
                    <p class="mt-2">
                      <a href="https://www.friendmusic.com" target="_blank" rel="noopener" class="text-accent-primary hover:no-underline underline">www.friendmusic.com</a>
                    </p>
                  </div>
                  <a 
                    href="/contact"
                    class="inline-block px-8 py-3 bg-transparent text-white rounded-full font-semibold border border-border-default hover:border-border-hover hover:bg-bg-tertiary transition-colors"
                  >
                    Contact Us
                  </a>
                </section>
              </Show>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

