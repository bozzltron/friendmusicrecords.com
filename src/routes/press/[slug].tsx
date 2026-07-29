import { Show } from "solid-js";
import { useParams, A } from "@solidjs/router";
import Layout from "../../components/Layout";
import { StandardMetadata, createPressReleaseData, createBreadcrumbData } from "../../utils/metadata";
import { getPressReleaseBySlug } from "../../data/pressReleases";
import { getArtistById } from "../../data/artists";

export default function PressReleasePage() {
  const params = useParams();
  const pressRelease = getPressReleaseBySlug(params.slug);
  
  // Get associated artist if this is an artist press release
  const artist = () => pressRelease?.artistId ? getArtistById(pressRelease.artistId) : undefined;

  // If press release not found, show 404
  if (!pressRelease) {
    return (
      <div 
        class="min-h-screen flex items-center justify-center"
        style={{ "background": "var(--bg-primary)", "color": "var(--text-primary)" }}
      >
        <div class="text-center">
          <h1 class="text-4xl font-mono mb-4" style={{ color: "var(--text-primary)" }}>Press Release Not Found</h1>
          <p class="mb-8" style={{ color: "var(--text-secondary)" }}>The press release you're looking for doesn't exist.</p>
          <A 
            href="/press" 
            class="px-6 py-3 rounded-md transition-colors focus:outline-none focus:ring-2"
            style={{ 
              "background": "transparent",
              "color": "var(--text-primary)",
              "border": "1px solid var(--border-default)",
              "focus:ring-color": "var(--focus-ring)"
            }}
          >
            View All Press Releases
          </A>
        </div>
      </div>
    );
  }

  return (
    <>
      <StandardMetadata
        title={`${pressRelease.title} | friend music records`}
        description={pressRelease.excerpt}
        url={`https://friendmusicrecords.com/press/${pressRelease.slug}/`}
        type="article"
        keywords={`${pressRelease.tags.join(', ')}, press release, friend music records, austin music, indie music news, record label press`}
        author="friend music records"
        image={artist()?.image.hero}
        imageAlt={pressRelease.title}
        publishedDate={pressRelease.date}
        structuredData={createPressReleaseData({
          headline: pressRelease.title,
          description: pressRelease.excerpt,
          datePublished: pressRelease.date,
          image: artist()?.image.hero,
          url: `https://friendmusicrecords.com/press/${pressRelease.slug}/`
        })}
        breadcrumbData={createBreadcrumbData([
          { name: "Home", url: "https://friendmusicrecords.com" },
          { name: "Press", url: "https://friendmusicrecords.com/press" },
          { name: pressRelease.title, url: `https://friendmusicrecords.com/press/${pressRelease.slug}/` }
        ])}
      />

      <Layout>
        <main
          id="main-content"
          class="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
          role="main"
          style={{ background: "var(--bg-primary)" }}
        >
          <div class="max-w-content mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" class="mb-8 text-sm">
              <ol class="flex items-center space-x-2" style={{ color: "var(--text-secondary)" }}>
                <li><A href="/" class="hover:underline" style={{ color: "var(--text-secondary)" }}>Home</A></li>
                <li aria-hidden="true">→</li>
                <li><A href="/press" class="hover:underline" style={{ color: "var(--text-secondary)" }}>Press</A></li>
                <li aria-hidden="true">→</li>
                <li style={{ color: "var(--text-primary)" }} aria-current="page">{pressRelease.title}</li>
              </ol>
            </nav>

            {/* Buy on Vinyl CTA */}
            <Show when={pressRelease?.buyVinylUrl}>
              {(url) =>
                <div class="text-center mb-8">
                  <a
                    href={url()}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block px-8 py-4 rounded-lg font-bold text-lg transition-colors focus:outline-none focus:ring-2"
                    style={{
                      "background": "var(--vinyl-cta-bg)",
                      "color": "var(--vinyl-cta-text)"
                    }}
                  >
                    Buy on Vinyl
                  </a>
                </div>
              }
            </Show>

            {/* Header */}
            <header class="mb-8 text-center">
              <div class="flex flex-wrap justify-center gap-2 mb-4">
                {pressRelease.tags.map(tag => (
                  <span 
                    class="px-3 py-1 rounded-full text-xs"
                    style={{ 
                      "background": "var(--bg-secondary)",
                      "border": "1px solid var(--border-default)",
                      "color": "var(--text-secondary)"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 class="text-4xl md:text-5xl font-mono mb-4" style={{ color: "var(--text-primary)" }}>{pressRelease.title}</h1>
              <Show when={pressRelease.subtitle}>
                <p class="text-xl mb-4 italic" style={{ color: "var(--text-secondary)" }}>{pressRelease.subtitle}</p>
              </Show>
              <time datetime={pressRelease.date} style={{ color: "var(--text-tertiary)" }}>
                {new Date(pressRelease.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
            </header>

            {/* Main Content */}
            <article 
              class="rounded-xl p-8 md:p-12 mb-8"
              style={{ 
                "background": "var(--bg-secondary)",
                "border": "1px solid var(--border-default)"
              }}
            >
              <div class="prose prose-invert prose-lg max-w-none">
                {/* Split content by paragraphs and render with proper spacing */}
                {pressRelease.content.split('\n\n').map(paragraph => {
                  // Check if it's a heading (starts with **)
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    const text = paragraph.replace(/\*\*/g, '');
                    return <p class="font-bold text-xl mb-4 mt-6 first:mt-0 font-mono" style={{ color: "var(--text-primary)" }}>{text}</p>;
                  }
                  // Check if it's italic (starts with *)
                  if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                    const text = paragraph.replace(/\*/g, '');
                    return <p class="italic mb-4" style={{ color: "var(--text-secondary)" }}>{text}</p>;
                  }
                  // Check if it's an image (markdown format)
                  if (paragraph.includes('![') && paragraph.includes('](') && paragraph.includes(')')) {
                    const altText = paragraph.match(/!\[(.*?)\]/)?.[1] || '';
                    const src = paragraph.match(/\((.*?)\)/)?.[1] || '';
                    return <img src={src} alt={altText} class="my-6 rounded-lg shadow-md max-w-full h-auto" />;
                  }
                  // Check if it's a list
                  if (paragraph.includes('- ')) {
                    const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                    return (
                      <ul class="list-disc list-inside mb-4 space-y-2">
                        {items.map(item => (
                          <li class="leading-relaxed" style={{ color: "var(--text-primary)" }}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  // Regular paragraph
                  return <p class="leading-relaxed mb-4 font-mono" style={{ color: "var(--text-primary)" }}>{paragraph}</p>;
                })}
              </div>
            </article>

            {/* Instagram Post Link */}
            <Show when={pressRelease?.igPostUrl}>
              {(igUrl) =>
                <div class="text-center mb-8">
                  <a
                    href={igUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 text-base transition-colors underline hover:no-underline focus:outline-none focus:ring-2 rounded px-3 py-2"
                    style={{ "color": "var(--text-secondary)" }}
                  >
                    View on Instagram
                  </a>
                </div>
              }
            </Show>

            {/* Call to Action Button */}
            <Show when={pressRelease?.buyVinylUrl}>
              {(url) =>
                <div class="text-center mb-8">
                  <a
                    href={url()}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block px-8 py-4 rounded-lg font-bold text-lg transition-colors focus:outline-none focus:ring-2"
                    style={{
                      "background": "var(--vinyl-cta-bg)",
                      "color": "var(--vinyl-cta-text)"
                    }}
                  >
                    Buy on Vinyl
                  </a>
                </div>
              }
            </Show>

            {/* Artist Link */}
            <Show when={artist()}>
              <div 
                class="rounded-xl p-8 mb-8"
                style={{ 
                  "background": "var(--bg-secondary)",
                  "border": "1px solid var(--border-default)"
                }}
              >
                <h2 class="text-2xl font-mono mb-6" style={{ color: "var(--text-primary)" }}>About the Artist</h2>
                <div class="flex items-center gap-4 mb-4">
                  <img 
                    src={artist()!.image.thumbnail} 
                    alt={artist()!.name} 
                    class="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 class="text-xl font-mono" style={{ color: "var(--text-primary)" }}>{artist()!.name}</h3>
                    <p class="text-sm" style={{ color: "var(--text-secondary)" }}>{artist()!.genre.join(' • ')}</p>
                  </div>
                </div>
                <p class="leading-relaxed mb-4 font-mono" style={{ color: "var(--text-primary)" }}>{artist()!.bio.short}</p>
                <A 
                  href={`/artists/${artist()!.slug}`}
                  class="inline-block px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2"
                  style={{ 
                    "background": "transparent",
                    "color": "var(--text-primary)",
                    "border": "1px solid var(--border-default)",
                    "focus:ring-color": "var(--focus-ring)"
                  }}
                >
                  View Full EPK
                </A>
              </div>
            </Show>

            {/* Back to Press */}
            <div class="text-center">
              <A 
                href="/press"
                class="inline-block px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2"
                style={{ 
                  "background": "transparent",
                  "color": "var(--text-primary)",
                  "border": "1px solid var(--border-default)",
                  "focus:ring-color": "var(--focus-ring)"
                }}
              >
                ← Back to All Press Releases
              </A>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
