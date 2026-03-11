import Layout from "../components/Layout";
import { StandardMetadata } from "../utils/metadata";
import { LABEL } from "../data/label";

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
      
      <Layout>
        <main
          id="main-content"
          class="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
          style={{ background: "var(--bg-primary)" }}
        >
          <div class="max-w-content-narrow mx-auto">
            {/* Heading */}
            <div class="mb-8 sm:mb-12 text-center">
              <h1 
                class="text-4xl sm:text-5xl font-mono mb-4"
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
              {/* Mail Address */}
              <section 
                class="p-8 rounded-lg text-center"
                style={{ 
                  "background": "var(--bg-secondary)",
                  "border": "1px solid var(--border-default)"
                }}
                aria-labelledby="mail-address-heading"
              >
                <h2 
                  id="mail-address-heading"
                  class="text-2xl font-mono mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  Mail Address
                </h2>
                <address
                  class="text-lg font-mono not-italic"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <p class="mb-2">
                    <strong style={{ color: "var(--text-primary)" }}>{LABEL.name}</strong>
                  </p>
                  <p class="mb-2">{LABEL.address.street}</p>
                  <p>
                    {LABEL.address.city}, {LABEL.address.state} {LABEL.address.postalCode}
                  </p>
                </address>
              </section>

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
                  href={`mailto:${LABEL.email}`}
                  class="text-xl font-medium hover:underline focus:outline-none focus:ring-2 rounded px-2 py-1"
                  style={{
                    color: "var(--text-primary)",
                    "focus:ring-color": "var(--focus-ring)",
                  }}
                >
                  {LABEL.email}
                </a>
              </section>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

