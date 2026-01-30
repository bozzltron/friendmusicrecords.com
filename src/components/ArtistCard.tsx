import { A } from "@solidjs/router";
import type { Artist } from "../types/artist";

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard(props: ArtistCardProps) {
  const locationStr = props.artist.location.state 
    ? `${props.artist.location.city}, ${props.artist.location.state}`
    : props.artist.location.city;

  return (
    <A 
      href={`/artists/${props.artist.slug}`}
      class="block"
    >
      <article 
        class="rounded-lg overflow-hidden transition-all duration-200 hover:transform hover:-translate-y-1"
        style={{ 
          "background": "var(--bg-secondary)",
          "border": "1px solid var(--border-default)"
        }}
      >
        {/* Artist Image */}
        <div 
          class="aspect-square w-full flex items-center justify-center"
          style={{ "background": "var(--bg-tertiary)" }}
        >
          <img 
            src={props.artist.image.thumbnail} 
            alt={props.artist.name}
            class="w-24 h-24 object-contain"
          />
        </div>

        {/* Content */}
        <div class="p-6">
          {/* Artist Name */}
          <h3 
            class="text-2xl font-mono mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {props.artist.name}
          </h3>

          {/* Genre & Location */}
          <p 
            class="text-sm mb-4"
            style={{ color: "var(--text-tertiary)" }}
          >
            {props.artist.genre.join(', ')} • {locationStr}
          </p>

          {/* Bio Excerpt */}
          <p 
            class="text-base leading-relaxed mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            {props.artist.bio.short}
          </p>

          {/* View EPK Link */}
          <span 
            class="inline-flex items-center text-base font-medium transition-colors"
            style={{ 
              "color": "var(--text-primary)"
            }}
          >
            View EPK →
          </span>
        </div>
      </article>
    </A>
  );
}

