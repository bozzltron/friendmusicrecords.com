import { A } from "@solidjs/router";
import Layout from "../components/Layout";
import { StandardMetadata, createOrganizationData } from "../utils/metadata";

export default function Home() {
  return (
    <>
      <StandardMetadata
        title="friend music records | independent record label"
        description="Feel free to make a record with your friends. Independent record label celebrating collaborative music making. Friends helping friends publish their music."
        url="https://friendmusicrecords.com"
        type="website"
        keywords="independent record label, friend music records, collaborative music, jeff tweedy, feel free, indie rock, alternative rock, music label, record label, music distribution, independent music, diy music, austin music"
        image="https://friendmusicrecords.com/friendmusicrecords.webp"
        imageAlt="friend music records logo"
        structuredData={createOrganizationData()}
      />
      
      <Layout>
        <main
          id="main-content"
          class="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
          style={{ background: "var(--bg-primary)" }}
        >
          {/* Hero Section */}
          <header class="max-w-content mx-auto text-center mb-12 sm:mb-16">
            {/* Logo */}
            <div class="mb-6 flex justify-center">
              <img 
                src="/friendmusicrecords.webp" 
                alt="friend music records logo - independent record label based in Austin, Texas" 
                class="h-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px]"
                width="400"
                height="160"
                fetchpriority="high"
                loading="eager"
                decoding="async"
              />
            </div>
            
            {/* Jeff Tweedy Quote */}
            <blockquote 
              class="text-2xl md:text-3xl font-mono mb-6 leading-relaxed italic"
              style={{ color: "var(--text-primary)" }}
              cite="https://www.wilco.com"
            >
              "Feel free to make a record with your friends."
            </blockquote>
            
            <p 
              class="text-base mb-2"
              style={{ color: "var(--text-tertiary)" }}
            >
              — Jeff Tweedy, "Feel Free"
            </p>
          </header>

          {/* Newsletter Signup Section */}
          <section class="max-w-content mx-auto mb-24 sm:mb-32">
            <div 
              class="rounded-xl p-6 sm:p-8 md:p-12 border text-center"
              style={{ 
                "background": "var(--bg-secondary)",
                "border-color": "var(--border-default)"
              }}
            >
              <h2 
                class="text-2xl sm:text-3xl md:text-4xl font-mono mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                stay in the loop
              </h2>
              
              <p 
                class="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                join our newsletter for new releases, artist updates, and behind-the-scenes stories from friend music records.
              </p>
              
              <a 
                href="https://friendmusicrecords.beehiiv.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block px-8 py-4 rounded-md font-medium transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)]"
                style={{ 
                  "background": "var(--accent-primary)",
                  "color": "var(--bg-primary)",
                  "focus:ring-color": "var(--focus-ring)"
                }}
                aria-label="Subscribe to friend music records newsletter"
              >
                subscribe →
              </a>
              
              <p 
                class="text-sm mt-6"
                style={{ color: "var(--text-tertiary)" }}
              >
                no spam, just music. unsubscribe anytime.
              </p>
            </div>
          </section>

          {/* Featured Release Section */}
          <section class="max-w-content mx-auto mb-24 sm:mb-32">
            <h2 
              class="text-2xl sm:text-3xl font-mono text-center md:text-left mb-8 sm:mb-12"
              style={{ color: "var(--text-primary)" }}
            >
              Latest Release
            </h2>
            
            <div 
              class="rounded-xl p-6 sm:p-8 md:p-10 border"
              style={{ 
                "background": "var(--bg-secondary)",
                "border-color": "var(--border-default)"
              }}
            >
              <div class="flex flex-col md:flex-row gap-8 items-center">
                {/* Album Art */}
                <div class="flex-shrink-0">
                  <A href="/artists/mozworth">
                    <img 
src="/Why-Not.webp" 
                       alt="mozworth - Why Not single artwork"
                      class="w-64 h-64 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                      width="256"
                      height="256"
                      fetchpriority="high"
                      loading="eager"
                      decoding="async"
                    />
                  </A>
                </div>
                
                {/* Release Info */}
                <div class="flex-1 text-center md:text-left">
                  <p 
                    class="text-sm mb-2 uppercase tracking-wide"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    New Single
                  </p>
                  
                  <h3 
                    class="text-4xl font-mono mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Why Not
                  </h3>
                  
                  <p 
                    class="text-xl mb-8"
                    style={{ color: "var(--text-primary)" }}
                  >
                    by <A 
                      href="/artists/mozworth"
                      class="hover:underline"
                      style={{ color: "var(--text-primary)" }}
                      aria-label="View mozworth artist page"
                    >
                      mozworth
                    </A>
                  </p>
                  
                  <p 
                    class="text-base mb-16 leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    mozworth releases "Why Not," the first single from forthcoming album The Mountain & The Wolf. The track bridges the sonic gap from summer's "The Sky Is Falling" and "Sandpiper" to the evolving sound that will define the LP's 2027 release.
                  </p>
                  
                  <div class="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
                    <A 
                      href="/artists/mozworth"
                      class="px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2"
                      style={{ 
                        "background": "var(--accent-primary)",
                        "color": "var(--bg-primary)"
                      }}
                    >
                      View EPK
                    </A>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <div class="max-w-content mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Ethos Card */}
              <div 
                class="p-6 sm:p-8 rounded-lg border text-left"
                style={{ 
                  "background": "var(--bg-secondary)",
                  "border-color": "var(--border-default)"
                }}
              >
                <h3 
                  class="text-xl sm:text-2xl font-mono mb-4 text-center md:text-left"
                  style={{ color: "var(--text-primary)" }}
                >
                  About Us
                </h3>
                <p 
                  class="text-base mb-6 leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Friends helping friends publish their music. We believe in the power of collaboration and community in making great records.
                </p>
                <A 
                  href="/about"
                  class="inline-flex items-center font-medium focus:outline-none focus:ring-2 rounded"
                  style={{ 
                    "color": "var(--accent-primary)",
                    "focus:ring-color": "var(--focus-ring)"
                  }}
                >
                  Learn More →
                </A>
              </div>

              {/* Artists Card */}
              <div 
                class="p-6 sm:p-8 rounded-lg border text-left"
                style={{ 
                  "background": "var(--bg-secondary)",
                  "border-color": "var(--border-default)"
                }}
              >
                <h3 
                  class="text-xl sm:text-2xl font-mono mb-4 text-center md:text-left"
                  style={{ color: "var(--text-primary)" }}
                >
                  Our Artists
                </h3>
                <p 
                  class="text-base mb-6 leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Explore our roster of innovative artists creating music that matters. EPKs, bios, and press materials available.
                </p>
                <A 
                  href="/artists"
                  class="inline-flex items-center font-medium focus:outline-none focus:ring-2 rounded"
                  style={{ 
                    "color": "var(--accent-primary)",
                    "focus:ring-color": "var(--focus-ring)"
                  }}
                >
                  View Roster →
                </A>
              </div>

              {/* Press Card */}
              <div 
                class="p-6 sm:p-8 rounded-lg border text-left"
                style={{ 
                  "background": "var(--bg-secondary)",
                  "border-color": "var(--border-default)"
                }}
              >
                <h3 
                  class="text-xl sm:text-2xl font-mono mb-4 text-center md:text-left"
                  style={{ color: "var(--text-primary)" }}
                >
                  Latest News
                </h3>
                <p 
                  class="text-base mb-6 leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Press releases, artist announcements, and label news. Media inquiries welcome.
                </p>
                <A 
                  href="/press"
                  class="inline-flex items-center font-medium focus:outline-none focus:ring-2 rounded"
                  style={{ 
                    "color": "var(--accent-primary)",
                    "focus:ring-color": "var(--focus-ring)"
                  }}
                >
                  Read Press →
                </A>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

