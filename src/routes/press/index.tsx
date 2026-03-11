import { For } from "solid-js";
import Layout from "../../components/Layout";
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
        url="https://friendmusicrecords.com/press"
        type="website"
        keywords="friend music records press, press releases, music news, artist announcements, record label news, indie music news, music label press"
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
                Press Releases
              </h1>
              <p 
                class="text-xl"
                style={{ color: "var(--text-secondary)" }}
              >
                Latest news and announcements from friend music records.
              </p>
              <p class="mt-4 text-sm" style={{ color: "var(--text-tertiary)" }}>
                <a
                  href="/feed.xml"
                  class="hover:underline"
                  style={{ color: "var(--accent-primary)" }}
                >
                  RSS feed
                </a>
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
      </Layout>
    </>
  );
}

