import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { StandardMetadata } from "../utils/metadata";

export default function About() {
  return (
    <>
      <StandardMetadata
        title="about | friend music records"
        description="Learn about friend music records. Friends helping friends publish their music. A collaborative approach to making and sharing music together."
        url="https://www.friendmusicrecords.com/about"
        type="website"
        keywords="about friend music records, collaborative music, independent music, music community, music collaboration, record label, austin music"
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
          style={{ "background": "var(--bg-primary)" }}
        >
          <article class="max-w-4xl mx-auto">
            {/* Heading */}
            <header class="mb-12 text-center">
              <h1 
                class="text-5xl font-mono mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                about
              </h1>
            </header>

            {/* Image */}
            <figure class="mb-12 flex flex-col items-center">
              <img 
                src="/jeffnmike.webp" 
                alt="Boz and Jeff in the mozworth studio in Austin, Texas 2024" 
                class="w-full max-w-2xl h-auto rounded-lg"
                width="1200"
                height="800"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
              <figcaption 
                class="mt-4 text-sm font-mono text-center"
                style={{ color: "var(--text-tertiary)" }}
              >
                Boz and Jeff in the mozworth studio in Austin, Texas 2024
              </figcaption>
            </figure>

            {/* Story */}
            <section 
              class="max-w-2xl mx-auto text-center mb-12"
              style={{ color: "var(--text-primary)" }}
            >
              <h2 class="sr-only">Origin Story</h2>
              <p 
                class="text-xl md:text-2xl leading-relaxed font-mono mb-8"
                style={{ color: "var(--text-primary)" }}
              >
                friend music records began with boz asking his friend jeff to produce a new record with him. boz and jeff put out the first mozworth record with the the help of a team of new friends. jeff was inspired by the process of the mozworth record and asked boz to put his record out. boz and jeff are putting out jeff's record. thus, the birth of friend music records. welcome!
              </p>
            </section>

            {/* Office Address */}
            <section 
              class="max-w-2xl mx-auto text-center"
              style={{ color: "var(--text-secondary)" }}
              aria-labelledby="office-address-heading"
            >
              <h2 id="office-address-heading" class="sr-only">Office Address</h2>
              <address 
                class="text-lg font-mono not-italic"
                style={{ color: "var(--text-secondary)" }}
              >
                <p class="mb-2">
                  <strong style={{ color: "var(--text-primary)" }}>friend music records</strong>
                </p>
                <p class="mb-2">9901 brodie lane suite 160-302</p>
                <p>austin, tx 78748</p>
                <p class="mt-4">
                  <a 
                    href="mailto:info@friendmusicrecords.com"
                    class="hover:underline"
                    style={{ color: "var(--text-primary)" }}
                  >
                    info@friendmusicrecords.com
                  </a>
                </p>
              </address>
            </section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}
