import { Show } from "solid-js";
import { useParams, A } from "@solidjs/router";
import { StandardMetadata, createPressReleaseData } from "../../utils/metadata";
import { getPressReleaseBySlug } from "../../data/pressReleases";
import { getArtistBySlug } from "../../data/artists";

export default function PressReleasePage() {
  const params = useParams();
  const pressRelease = getPressReleaseBySlug(params.slug);
  
  // Get associated artist if this is an artist press release
  const artist = () => pressRelease?.artistId ? getArtistBySlug(pressRelease.artistId) : undefined;

  // If press release not found, show 404
  if (!pressRelease) {
    return (
      <div class="min-h-screen flex items-center justify-center bg-bg-primary text-text-primary">
        <div class="text-center">
          <h1 class="text-4xl font-mono font-bold mb-4">Press Release Not Found</h1>
          <p class="text-text-secondary mb-8">The press release you're looking for doesn't exist.</p>
          <A href="/press" class="px-6 py-3 bg-transparent text-white rounded-md border border-border-default hover:border-border-hover hover:bg-bg-tertiary transition-colors">
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
        url={`https://www.friendmusic.com/press/${pressRelease.slug}/`}
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
          url: `https://www.friendmusic.com/press/${pressRelease.slug}/`
        })}
      />

      <div class="min-h-screen bg-bg-primary text-text-primary py-12">
        <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-bg-secondary text-white px-4 py-2 rounded border border-border-default focus:outline-none focus:ring-2 focus:ring-focus-ring z-50">Skip to main content</a>
        
        <main id="main-content" class="container mx-auto max-w-4xl px-4" role="main">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" class="mb-8 text-sm">
            <ol class="flex items-center space-x-2 text-text-secondary">
              <li><A href="/" class="hover:text-accent-primary">Home</A></li>
              <li aria-hidden="true">→</li>
              <li><A href="/press" class="hover:text-accent-primary">Press</A></li>
              <li aria-hidden="true">→</li>
              <li class="text-text-primary" aria-current="page">{pressRelease.title}</li>
            </ol>
          </nav>

          {/* Header */}
          <header class="mb-8 text-center">
            <div class="flex flex-wrap justify-center gap-2 mb-4">
              {pressRelease.tags.map(tag => (
                <span class="px-3 py-1 bg-bg-secondary border border-border-default rounded-full text-xs text-text-secondary">
                  {tag}
                </span>
              ))}
            </div>
            <h1 class="text-4xl md:text-5xl font-mono font-bold mb-4">{pressRelease.title}</h1>
            <Show when={pressRelease.subtitle}>
              <p class="text-xl text-text-secondary mb-4 italic">{pressRelease.subtitle}</p>
            </Show>
            <time datetime={pressRelease.date} class="text-text-tertiary">
              {new Date(pressRelease.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
          </header>

          {/* Main Content */}
          <article class="bg-bg-secondary rounded-xl p-8 md:p-12 border border-border-default mb-8">
            <div class="prose prose-invert prose-lg max-w-none">
              {/* Split content by paragraphs and render with proper spacing */}
              {pressRelease.content.split('\n\n').map(paragraph => {
                // Check if it's a heading (starts with **)
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  const text = paragraph.replace(/\*\*/g, '');
                  return <p class="font-bold text-xl mb-4 mt-6 first:mt-0">{text}</p>;
                }
                // Check if it's italic (starts with *)
                if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                  const text = paragraph.replace(/\*/g, '');
                  return <p class="italic text-text-secondary mb-4">{text}</p>;
                }
                // Check if it's a list
                if (paragraph.includes('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                  return (
                    <ul class="list-disc list-inside mb-4 space-y-2">
                      {items.map(item => (
                        <li class="text-text-primary leading-relaxed">{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                // Regular paragraph
                return <p class="text-text-primary leading-relaxed mb-4">{paragraph}</p>;
              })}
            </div>
          </article>

          {/* Artist Link */}
          <Show when={artist()}>
            <div class="bg-bg-secondary rounded-xl p-8 border border-border-default mb-8">
              <h2 class="text-2xl font-mono font-bold mb-6">About the Artist</h2>
              <div class="flex items-center gap-4 mb-4">
                <img 
                  src={artist()!.image.thumbnail} 
                  alt={artist()!.name} 
                  class="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 class="text-xl font-semibold">{artist()!.name}</h3>
                  <p class="text-text-secondary text-sm">{artist()!.genre.join(' • ')}</p>
                </div>
              </div>
              <p class="text-text-primary leading-relaxed mb-4">{artist()!.bio.short}</p>
              <A 
                href={`/artists/${artist()!.slug}`}
                class="inline-block px-6 py-3 bg-transparent text-white rounded-md font-semibold border border-border-default hover:border-border-hover hover:bg-bg-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring"
              >
                View Full EPK
              </A>
            </div>
          </Show>

          {/* Back to Press */}
          <div class="text-center">
            <A 
              href="/press"
              class="inline-block px-6 py-3 bg-transparent text-white border border-border-default rounded-md hover:border-border-hover hover:bg-bg-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              ← Back to All Press Releases
            </A>
          </div>
        </main>
      </div>
    </>
  );
}

