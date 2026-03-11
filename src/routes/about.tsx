import Layout from "../components/Layout";
import { StandardMetadata } from "../utils/metadata";
import { LABEL } from "../data/label";

export default function About() {
  return (
    <>
      <StandardMetadata
        title="about | friend music records"
        description="Learn about friend music records. Friends helping friends publish their music. A collaborative approach to making and sharing music together."
        url="https://friendmusicrecords.com/about"
        type="website"
        keywords="about friend music records, collaborative music, independent music, music community, music collaboration, record label, austin music"
      />
      
      <Layout>
        <main
          id="main-content"
          class="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
          style={{ background: "var(--bg-primary)" }}
        >
          <article class="max-w-content mx-auto">
            {/* Heading */}
            <header class="mb-8 sm:mb-12 text-center">
              <h1 
                class="text-4xl sm:text-5xl font-mono mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                about
              </h1>
            </header>

            {/* Image */}
            <figure class="mb-8 sm:mb-12 flex flex-col items-center">
              <img 
                src="/jeffnmike.webp" 
                alt="Boz and Jeff in the mozworth studio in Austin, Texas 2024" 
                class="w-full max-w-content-narrow h-auto rounded-lg"
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
              class="max-w-content-narrow mx-auto text-left mb-8 sm:mb-12"
              style={{ color: "var(--text-primary)" }}
              aria-labelledby="origin-story-heading"
            >
              <h2 id="origin-story-heading" class="sr-only">Origin Story</h2>
              <p 
                class="text-lg sm:text-xl md:text-2xl leading-relaxed font-mono mb-8"
                style={{ color: "var(--text-primary)" }}
              >
                It began with boz asking his friend jeff to produce a new record with him. boz and jeff put out the first mozworth record with the help of a team of new friends. jeff was inspired by the process of the mozworth record and asked boz to put his record out. boz and jeff are putting out jeff's record. thus, the birth of friend music records. welcome!
              </p>
            </section>

            {/* Office Address */}
            <section 
              class="max-w-content-narrow mx-auto text-center"
              style={{ color: "var(--text-secondary)" }}
              aria-labelledby="office-address-heading"
            >
              <h2 id="office-address-heading" class="sr-only">Office Address</h2>
              <address
                class="text-lg font-mono not-italic"
                style={{ color: "var(--text-secondary)" }}
              >
                <p class="mb-2">
                  <strong style={{ color: "var(--text-primary)" }}>{LABEL.name}</strong>
                  <span style={{ color: "var(--text-tertiary)" }}> · founded 2026</span>
                </p>
                <p class="mb-2">{LABEL.address.street}</p>
                <p>
                  {LABEL.address.city}, {LABEL.address.state} {LABEL.address.postalCode}
                </p>
                <p class="mt-4">
                  <a
                    href={`mailto:${LABEL.email}`}
                    class="hover:underline"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {LABEL.email}
                  </a>
                </p>
              </address>
            </section>
          </article>
        </main>
      </Layout>
    </>
  );
}
