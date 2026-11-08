import { Show, For } from "solid-js";
import { useParams, A } from "@solidjs/router";
import Layout from "../../components/Layout";
import { StandardMetadata, createArtistData, createBreadcrumbData } from "../../utils/metadata";
import { getArtistBySlug } from "../../data/artists";
import { pressReleases } from "../../data/pressReleases";

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
      <div 
        class="min-h-screen flex items-center justify-center"
        style={{ "background": "var(--bg-primary)", "color": "var(--text-primary)" }}
      >
        <div class="text-center">
          <h1 class="text-4xl font-mono mb-4" style={{ color: "var(--text-primary)" }}>Artist Not Found</h1>
          <p class="mb-8" style={{ color: "var(--text-secondary)" }}>The artist you're looking for doesn't exist.</p>
          <A 
            href="/artists" 
            class="px-6 py-3 rounded-md transition-colors focus:outline-none focus:ring-2"
            style={{ 
              "background": "transparent",
              "color": "var(--text-primary)",
              "border": "1px solid var(--border-default)"
            }}
          >
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
        url={`https://friendmusicrecords.com/artists/${artist.slug}/`}
        type="music.musician"
        keywords={`${artist.name}, press kit, EPK, electronic press kit, ${artist.genre.join(', ')}, ${artist.location.city}, friend music records, record label artist, indie artist`}
        author={artist.name}
        image={artist.image.hero}
        imageAlt={`${artist.name} official press photo`}
        structuredData={createArtistData({
          name: artist.name,
          url: `https://friendmusicrecords.com/artists/${artist.slug}/`,
          image: artist.image.hero,
          description: artist.bio.full,
          genre: artist.genre,
          location: artist.location,
        })}
        breadcrumbData={createBreadcrumbData([
          { name: "Home", url: "https://friendmusicrecords.com" },
          { name: "Artists", url: "https://friendmusicrecords.com/artists" },
          { name: artist.name, url: `https://friendmusicrecords.com/artists/${artist.slug}/` }
        ])}
      />

      <Layout>
        <main
          id="main-content"
          class="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
          role="main"
          style={{ background: "var(--bg-primary)" }}
        >
          <div class="max-w-content mx-auto">
            <div 
              class="rounded-xl p-4 sm:p-6 md:p-10 border" 
              style={{ 
                "background": "var(--bg-secondary)", 
                "border-color": "var(--border-default)" 
              }}
            >
              
              {/* Hero Section */}
              <div class="text-center mb-8 sm:mb-10">
                <img 
                  src={artist.image.thumbnail} 
                  alt={`${artist.name} logo`} 
                  class="w-32 h-32 mb-4 mx-auto object-contain"
                  width="128"
                  height="128"
                  loading="eager"
                  fetchpriority="high"
                />
                <h1 class="text-4xl md:text-5xl font-mono mb-2" style={{ color: "var(--text-primary)" }}>Press Kit</h1>
                <div class="text-lg text-center" style={{ color: "var(--text-secondary)" }}>
                  {artist.location.city}-based {artist.genre[0]} Band
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
                  <h2 id="featured-release-heading" class="text-2xl font-mono mb-6" style={{ color: "var(--accent-primary)" }}>Featured Release</h2>
                  <article class="flex flex-col md:flex-row gap-6 items-center">
                    <img
                      src="/mozworth-push.webp"
                      alt="mozworth - Push single cover art"
                      class="w-full md:w-80 h-auto rounded-lg shadow-lg object-cover"
                      width="320"
                      height="320"
                      loading="lazy"
                      decoding="async"
                    />
                    <div class="flex-1">
                      <h3 class="text-3xl font-mono mb-4" style={{ color: "var(--text-primary)" }}>Push</h3>
                      <p class="mb-2" style={{ color: "var(--text-tertiary)" }}>
                        <span class="sr-only">Release type:</span>Single 
                        <span aria-hidden="true"> • </span>
                        <span class="sr-only">Released on:</span>
                        <time datetime="2026-11-24">Released November 24, 2026</time>
                      </p>
                      <p class="mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        mozworth returns with "Push," a Texas-meets-surf rock anthem recorded live at 5th Street Studios — a bold sonic evolution ahead of The Mountain & The Wolf.
                      </p>
                      <Show when={artistPressReleases()[0]?.slug}>
                        <A 
                          href={`/press/${artistPressReleases()[0]?.slug}`}
                          class="inline-block px-6 py-3 rounded-full font-medium transition-colors focus:outline-none focus:ring-2"
                          style={{ 
                            "background": "transparent",
                            "color": "var(--text-primary)",
                            "border": "1px solid var(--border-default)",
                            "focus:ring-color": "var(--focus-ring)"
                          }}
                          aria-label="View more information about Push"
                        >
                          More Info
                        </A>
                      </Show>
                    </div>
                  </article>
                </section>
              </Show>

              {/* Quick Links */}
              <section class="mb-12" aria-labelledby="quick-links-heading">
                <h2 id="quick-links-heading" class="text-2xl font-mono mb-8" style={{ color: "var(--accent-primary)" }}>Quick Links</h2>
                <nav aria-label="Press kit quick links">
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Show when={artist.socialLinks?.website}>
                      <a 
                        href={artist.socialLinks!.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 rounded-lg transition-colors font-medium text-center focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                      >
                        Website
                      </a>
                    </Show>
                    <Show when={artist.socialLinks?.spotify}>
                      <a 
                        href={artist.socialLinks!.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 rounded-lg transition-colors font-medium text-center focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                      >
                        Spotify
                      </a>
                    </Show>
                    <Show when={artist.socialLinks?.appleMusic}>
                      <a 
                        href={artist.socialLinks!.appleMusic}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 rounded-lg transition-colors font-medium text-center focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                      >
                        Apple Music
                      </a>
                    </Show>
                    <Show when={artist.socialLinks?.bandcamp}>
                      <a 
                        href={artist.socialLinks!.bandcamp}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 rounded-lg transition-colors font-medium text-center focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                      >
                        Bandcamp
                      </a>
                    </Show>
                    <Show when={artist.socialLinks?.youtube}>
                      <a 
                        href={artist.socialLinks!.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 rounded-lg transition-colors font-medium text-center focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                      >
                        YouTube
                      </a>
                    </Show>
                    <Show when={artist.socialLinks?.soundcloud}>
                      <a 
                        href={artist.socialLinks!.soundcloud}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 rounded-lg transition-colors font-medium text-center focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                      >
                        SoundCloud
                      </a>
                    </Show>
                    <Show when={artist.socialLinks?.instagram}>
                      <a 
                        href={artist.socialLinks!.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 rounded-lg transition-colors font-medium text-center focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                      >
                        Instagram
                      </a>
                    </Show>
                    <Show when={artist.socialLinks?.tiktok}>
                      <a 
                        href={artist.socialLinks!.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 rounded-lg transition-colors font-medium text-center focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                      >
                        TikTok
                      </a>
                    </Show>
                    <Show when={artist.socialLinks?.bluesky}>
                      <a 
                        href={artist.socialLinks!.bluesky}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 rounded-lg transition-colors font-medium text-center focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                      >
                        Bluesky
                      </a>
                    </Show>
                    <Show when={artist.socialLinks?.facebook}>
                      <a 
                        href={artist.socialLinks!.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 rounded-lg transition-colors font-medium text-center focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                      >
                        Facebook
                      </a>
                    </Show>
                    <Show when={artist.socialLinks?.reddit}>
                      <a 
                        href={artist.socialLinks!.reddit}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-4 py-3 rounded-lg transition-colors font-medium text-center focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                      >
                        Reddit
                      </a>
                    </Show>
                    <Show when={artist.contact?.press}>
                      <a 
                        href="/contact"
                        class="px-4 py-3 rounded-lg transition-colors font-medium text-center focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
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
                  <h2 id="download-assets-heading" class="text-2xl font-mono mb-6" style={{ color: "var(--accent-primary)" }}>Download Assets</h2>
                  <p class="mb-4" style={{ color: "var(--text-secondary)" }}>High-resolution press materials for media use</p>
                  <nav aria-label="Downloadable press materials">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <a 
                        href="https://www.dropbox.com/scl/fi/zq27huc2xwwy13d57c0t5/Push-Cover-Art.jpg?rlkey=8h8hljty3phobaii1jvndhc9i&st=wpzyqskm&dl=1"
                        download="mozworth-push-cover-art.jpg"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center px-4 py-3 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                        aria-label="Download Push cover art (high-resolution JPG)"
                      >
                        <div>
                          <div class="font-semibold" style={{ color: "var(--text-primary)" }}>Push Cover Art</div>
                          <div class="text-xs" style={{ color: "var(--text-tertiary)" }}>High-resolution JPG</div>
                        </div>
                      </a>
                      <a 
                        href="https://www.dropbox.com/scl/fi/fp6f62abc20t3r517e7h0/Push-Final.wav?rlkey=2k7ssp4zhh3lp20sb45lka18r&st=67lxpm6u&dl=1"
                        download="mozworth-push.wav"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center px-4 py-3 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                        aria-label="Download Push audio (WAV)"
                      >
                        <div>
                          <div class="font-semibold" style={{ color: "var(--text-primary)" }}>Push (WAV)</div>
                          <div class="text-xs" style={{ color: "var(--text-tertiary)" }}>Uncompressed audio</div>
                        </div>
                      </a>
                      <a 
                        href="https://www.dropbox.com/scl/fi/cpr5ji2d0y93nb08vctx9/Push-Final.mp3?rlkey=s03w1mtk6ik7f7ouzd0rwr985&st=hg0hoe17&dl=1"
                        download="mozworth-push.mp3"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center px-4 py-3 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2"
                        style={{
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                        aria-label="Download Push audio (MP3)"
                      >
                        <div>
                          <div class="font-semibold" style={{ color: "var(--text-primary)" }}>Push (MP3)</div>
                          <div class="text-xs" style={{ color: "var(--text-tertiary)" }}>Compressed audio</div>
                        </div>
                      </a>
                      <a
                        href="https://www.dropbox.com/scl/fo/t7d3tpxqq9rf7ja34z7qb/AISJSdLskxzhudp9iSgPZVw?rlkey=cb2nryj6jpdac219rryegft2c&st=80d4smux&dl=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center px-4 py-3 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2"
                        style={{
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                        aria-label="Open mozworth press photos folder (high-resolution)"
                      >
                        <div>
                          <div class="font-semibold" style={{ color: "var(--text-primary)" }}>Press Photos</div>
                          <div class="text-xs" style={{ color: "var(--text-tertiary)" }}>High-resolution photo set</div>
                        </div>
                      </a>
                      <Show when={artistPressReleases().find(pr => pr.pressReleasePdf)}>
                        {(pr) => (
                          <a
                            href={pr().pressReleasePdf!}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center px-4 py-3 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2"
                            style={{
                              "background": "transparent",
                              "color": "var(--text-primary)",
                              "border": "1px solid var(--border-default)",
                              "focus:ring-color": "var(--focus-ring)"
                            }}
                            aria-label={`Download press release PDF for ${pr().title}`}
                          >
                            <div>
                              <div class="font-semibold" style={{ color: "var(--text-primary)" }}>Press Release</div>
                              <div class="text-xs" style={{ color: "var(--text-tertiary)" }}>PDF download</div>
                            </div>
                          </a>
                        )}
                      </Show>
                      <a
                        href="/contact"
                        class="flex items-center px-4 py-3 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2"
                        style={{ 
                          "background": "transparent",
                          "color": "var(--text-primary)",
                          "border": "1px solid var(--border-default)",
                          "focus:ring-color": "var(--focus-ring)"
                        }}
                        aria-label="Contact friend music records for press materials"
                      >
                        <div>
                          <div class="font-semibold" style={{ color: "var(--text-primary)" }}>Contact for Materials</div>
                          <div class="text-xs" style={{ color: "var(--text-tertiary)" }}>friend music records</div>
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
                  <h2 id="press-release-heading" class="text-2xl font-mono mb-6" style={{ color: "var(--accent-primary)" }}>Press Release</h2>
                  <article class="max-w-none leading-relaxed space-y-4" style={{ color: "var(--text-primary)" }}>
                    <p class="font-bold">FOR IMMEDIATE RELEASE</p>
                    <p class="text-xl font-semibold">mozworth Drops New Single "Push" — A Bold Sonic Evolution</p>
                    <p><strong>Austin, TX – November 6, 2026</strong></p>
                    <p>Following the release of "Why Not" (October 22, 2026) which Cougar Microbes noted, "teases a new and exciting direction ahead of their upcoming album", mozworth is proud to announce "Push." This isn't just a follow-up—it's a declaration: mozworth has arrived.</p>
                    <p>While prepping for the new album, the band's rehearsal recordings brought the awareness that their sound had outgrown the home studio. They selected 5th Street Studios and recording engineer Ryan Huseman in Austin, Texas to live track and capture this raw power.</p>
                    <p>"Push" is, on the surface, a song about surfing. Underneath, it delves into something far deeper.</p>
                    <p>Hammer-on guitar riffs from Michael "Boz" Bosworth cut through feedback, bringing in an eager Mike Hall on drums that immediately build tension. The track explodes into "Texas-meets-surf" guitar work courtesy of Mark Heaps and then settles into a wide stereo verse complete with shimmering, reverb-drenched guitar bending with the waves. Jack Schultz colors the track with a bass as active as the ocean. The track bounces between two sonic landscapes: dry ripping guitar riffs with a fully engaged rock lineup and seaside verses that create space to think. It crescendos in a wall of sound that demonstrates just how powerful this group is. This band is in full send. "Push" is the journey.</p>
                    <p>The song was mixed and mastered by Steve Glaze at Tone Freq Studios. Steve has grown with the band, mixing every mozworth track to date. He is now in place to refine their latest work.</p>
                    <p>Stay tuned for more music leading toward the full-length release of The Mountain & The Wolf in 2027.</p>
                    <p class="font-semibold">Push drops November 24, 2026</p>
                    <hr class="my-4" style={{ "border-color": "var(--border-default)" }} />
                    <p>mozworth is a four-piece indie alternative rock band based in Austin, Texas. Originally founded by Michael "Boz" Bosworth, the band now includes Mark Heaps on electric guitar, Jack Schultz on bass, and Mike Hall on drums. Drawing from the depths of '90s alternative rock and the vulnerability of modern indie, mozworth creates music that feels both timeless and urgently present.</p>
                    <p>With a self-titled debut album released in November 2024, mozworth has garnered attention from KUTX (Song of the Day), international music publications, and radio. Their sound is progressing from early introspection and newly unleashed creativity only met by their raw power.</p>
                    <p class="mt-4">For media inquiries, interviews, or press materials, please contact:</p>
                    <p>friend music records PR<br />email: <a href="mailto:info@friendmusicrecords.com" style={{ color: "var(--accent-primary)" }} class="underline hover:no-underline">info@friendmusicrecords.com</a><br />phone: +1 (515) 418‑7894</p>
                  </article>
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
                  <h2 id="credits-heading" class="text-2xl font-mono mb-6" style={{ color: "var(--accent-primary)" }}>Credits - Push</h2>
                  <div class="space-y-2" style={{ color: "var(--text-secondary)" }}>
                    <p class="mb-2">Songwriting by Michael Bosworth</p>
                    <p class="mb-2">Lyrics by Michael Bosworth</p>
                    <p class="mb-2">Composed by Michael Bosworth, Mark Heaps, Jack Schultz, and Mike Hall</p>
                    <p class="mb-2">Produced by mozworth</p>
                    <p class="mb-2">Guitar and Vocals performed by Michael Bosworth</p>
                    <p class="mb-2">Guitar performed by Mark Heaps</p>
                    <p class="mb-2">Bass performed by Jack Schultz</p>
                    <p class="mb-2">Drums performed by Mike Hall</p>
                    <p class="mb-2">Recorded by Ryan Huseman at 5th Street Studios</p>
                    <p class="mb-2">Mixed by Steven Glaze at <a href="https://stevenglaze.com/" target="_blank" rel="noopener" class="underline hover:no-underline" style={{ color: "var(--accent-primary)" }}>Tone Freq Studios</a></p>
                    <p class="mb-2">Mastered by Steven Glaze at <a href="https://stevenglaze.com/" target="_blank" rel="noopener" class="underline hover:no-underline" style={{ color: "var(--accent-primary)" }}>Tone Freq Studios</a></p>
                    <p class="mb-2">Cover art by Mark Heaps</p>
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
                <h2 id="about-heading" class="text-2xl font-mono mb-6" style={{ color: "var(--accent-primary)" }}>About {artist.name}</h2>
                <div class="leading-relaxed space-y-4" style={{ color: "var(--text-secondary)" }}>
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
                  <h2 id="contact-heading" class="text-2xl font-mono mb-6" style={{ color: "var(--accent-primary)" }}>Media Contact</h2>
                  <div class="mb-4" style={{ color: "var(--text-secondary)" }}>For interviews, press materials, or media inquiries:</div>
                  <div class="text-lg mb-4" style={{ color: "var(--text-primary)" }}>
                    <p class="font-semibold">friend music records</p>
                    <p style={{ color: "var(--text-secondary)" }}>Austin, TX</p>
                    <a href="mailto:info@friendmusicrecords.com" class="underline hover:no-underline" style={{ color: "var(--accent-primary)" }}>info@friendmusicrecords.com</a>
                    <p class="mt-2">
                      <a href="https://friendmusicrecords.com" target="_blank" rel="noopener" class="underline hover:no-underline" style={{ color: "var(--accent-primary)" }}>friendmusicrecords.com</a>
                    </p>
                  </div>
                  <a 
                    href="/contact"
                    class="inline-block px-8 py-3 rounded-full font-medium transition-colors focus:outline-none focus:ring-2"
                    style={{ 
                      "background": "transparent",
                      "color": "var(--text-primary)",
                      "border": "1px solid var(--border-default)",
                      "focus:ring-color": "var(--focus-ring)"
                    }}
                  >
                    Contact Us
                  </a>
                </section>
              </Show>

            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

