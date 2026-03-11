import { For } from "solid-js";
import Layout from "../../components/Layout";
import ArtistCard from "../../components/ArtistCard";
import { StandardMetadata } from "../../utils/metadata";
import { getActiveArtists } from "../../data/artists";

// Artists page - displays all active artists
export default function Artists() {
  const artists = getActiveArtists();

  return (
    <>
      <StandardMetadata
        title="artists | friend music records"
        description="Meet the innovative artists on the friend music records roster. Independent musicians creating meaningful work across multiple genres."
        url="https://friendmusicrecords.com/artists"
        type="website"
        keywords="friend music records artists, indie artists, record label roster, independent musicians, music label artists, artist roster"
      />
      
      <Layout>
        <main
          id="main-content"
          class="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
          style={{ background: "var(--bg-primary)" }}
        >
          <div class="max-w-content mx-auto">
            {/* Heading */}
            <div class="mb-8 sm:mb-12 text-center">
              <h1 
                class="text-4xl sm:text-5xl font-mono mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Our Artists
              </h1>
              <div 
                class="text-xl"
                style={{ color: "var(--text-secondary)" }}
              >
                Meet the innovative musicians creating meaningful work with friend music records.
              </div>
            </div>

            {/* Artists Grid */}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <For each={artists}>
                {(artist) => <ArtistCard artist={artist} />}
              </For>
            </div>

            {/* Empty State */}
            {artists.length === 0 && (
              <div 
                class="text-center py-16 px-6 rounded-lg"
                style={{ 
                  "background": "var(--bg-secondary)",
                  "border": "1px solid var(--border-default)"
                }}
              >
                <p 
                  class="text-xl mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  We're currently building our roster.
                </p>
                <p 
                  class="text-lg mb-8"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Interested in working with us?
                </p>
                <a 
                  href="/contact"
                  class="inline-block px-8 py-3 rounded font-medium transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    "background": "var(--accent-primary)",
                    "color": "var(--bg-primary)"
                  }}
                >
                  Get in Touch
                </a>
              </div>
            )}
          </div>
        </main>
      </Layout>
    </>
  );
}

