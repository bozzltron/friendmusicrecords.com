import { A } from "@solidjs/router";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { StandardMetadata } from "../utils/metadata";

export default function NotFound() {
  return (
    <>
      <StandardMetadata
        title="page not found | friend music records"
        description="The page you're looking for doesn't exist."
        url="https://friendmusicrecords.com/404"
        type="website"
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
          class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
          style={{ "background": "var(--bg-primary)" }}
        >
          <div class="max-w-content-narrow mx-auto text-center">
            {/* Error Message */}
            <h1 
              class="text-5xl sm:text-6xl font-mono mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              404
            </h1>
            
            <h2 
              class="text-2xl sm:text-3xl font-mono mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Page Not Found
            </h2>
            
            <p 
              class="text-lg mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              The page you're looking for doesn't exist or has been moved.
            </p>

            {/* Navigation Options */}
            <div class="flex flex-wrap justify-center gap-4">
              <A 
                href="/"
                class="px-6 py-3 rounded font-medium transition-colors focus:outline-none focus:ring-2"
                style={{ 
                  "background": "var(--accent-primary)",
                  "color": "var(--bg-primary)",
                  "focus:ring-color": "var(--focus-ring)"
                }}
              >
                Go Home
              </A>
              <A 
                href="/artists"
                class="px-6 py-3 rounded font-medium transition-colors focus:outline-none focus:ring-2"
                style={{ 
                  "background": "transparent",
                  "color": "var(--text-primary)",
                  "border": "1px solid var(--border-hover)",
                  "focus:ring-color": "var(--focus-ring)"
                }}
              >
                View Artists
              </A>
              <A 
                href="/press"
                class="px-6 py-3 rounded font-medium transition-colors focus:outline-none focus:ring-2"
                style={{ 
                  "background": "transparent",
                  "color": "var(--text-primary)",
                  "border": "1px solid var(--border-hover)",
                  "focus:ring-color": "var(--focus-ring)"
                }}
              >
                Latest Press
              </A>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

