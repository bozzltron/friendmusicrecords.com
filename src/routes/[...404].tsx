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
        <Navigation />
        
        <main 
          class="flex-1 flex items-center justify-center px-4 py-16"
          style={{ "background": "var(--bg-primary)" }}
        >
          <div class="max-w-2xl mx-auto text-center">
            {/* Error Message */}
            <h1 
              class="text-6xl font-mono mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              404
            </h1>
            
            <h2 
              class="text-3xl font-mono mb-6"
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

