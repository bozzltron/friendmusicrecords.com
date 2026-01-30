import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { StandardMetadata } from "../utils/metadata";

export default function Contact() {
  return (
    <>
      <StandardMetadata
        title="contact | friend music records"
        description="Get in touch with friend music records. Press and media inquiries welcome."
        url="https://friendmusicrecords.com/contact"
        type="website"
        keywords="contact friend music records, press inquiries, media contact, record label contact, music label contact, artist submissions"
      />
      
      <div class="flex flex-col min-h-screen">
        <a 
          href="#main-content" 
          class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 px-4 py-2 rounded focus:outline-none focus:ring-2 z-50"
          style={{ 
            "background": "var(--accent-primary)",
            "color": "var(--bg-primary)",
            "focus:ring-color": "var(--focus-ring)"
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
          <div class="max-w-3xl mx-auto">
            {/* Heading */}
            <div class="mb-12 text-center">
              <h1 
                class="text-5xl font-mono mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Get in Touch
              </h1>
              <p 
                class="text-xl"
                style={{ color: "var(--text-secondary)" }}
              >
                We'd love to hear from you.
              </p>
            </div>

            {/* Contact Sections */}
            <div class="space-y-8">
              {/* Press Inquiries */}
              <section 
                class="p-8 rounded-lg text-center"
                style={{ 
                  "background": "var(--bg-secondary)",
                  "border": "1px solid var(--border-default)"
                }}
              >
                <h2 
                  class="text-2xl font-mono mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  Press & Media
                </h2>
                <p 
                  class="text-lg mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  For press inquiries, interviews, or promotional materials:
                </p>
                <a 
                  href="mailto:info@friendmusicrecords.com"
                  class="text-xl font-medium hover:underline focus:outline-none focus:ring-2 rounded px-2 py-1"
                  style={{ 
                    "color": "var(--text-primary)",
                    "focus:ring-color": "var(--focus-ring)"
                  }}
                >
                  info@friendmusicrecords.com
                </a>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

