import { For } from "solid-js";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import PressReleaseCard from "../../components/PressReleaseCard";
import { StandardMetadata } from "../../utils/metadata";
import { getLatestPressReleases } from "../../data/pressReleases";

export default function Press() {
  const pressReleases = getLatestPressReleases();

  return (
    <>
      <StandardMetadata
        title="press | friend music records"
        description="Latest news and press releases from friend music records. Stay updated on artist signings, new releases, and label announcements."
        url="https://www.friendmusicrecords.com/press"
        type="website"
        keywords="friend music records press, press releases, music news, artist announcements, record label news, indie music news, music label press"
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
          <div class="max-w-4xl mx-auto">
            {/* Heading */}
            <div class="mb-12 text-center">
              <h1 
                class="text-5xl font-mono mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Press Releases
              </h1>
              <p 
                class="text-xl"
                style={{ color: "var(--text-secondary)" }}
              >
                Latest news and announcements from friend music records.
              </p>
            </div>

            {/* Press Releases List */}
            <div>
              <For each={pressReleases}>
                {(pressRelease) => <PressReleaseCard pressRelease={pressRelease} />}
              </For>
            </div>

            {/* Empty State */}
            {pressReleases.length === 0 && (
              <div 
                class="text-center py-16 px-6 rounded-lg"
                style={{ 
                  "background": "var(--bg-secondary)",
                  "border": "1px solid var(--border-default)"
                }}
              >
                <p 
                  class="text-xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  No press releases yet. Check back soon for updates.
                </p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

