import { A } from "@solidjs/router";
import type { PressRelease } from "../types/pressRelease";

interface PressReleaseCardProps {
  pressRelease: PressRelease;
}

export default function PressReleaseCard(props: PressReleaseCardProps) {
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article 
      class="py-8 border-b transition-colors"
      style={{ "border-color": "var(--border-default)" }}
    >
      {/* Date */}
      <time 
        datetime={props.pressRelease.date}
        class="text-sm block mb-3"
        style={{ color: "var(--text-tertiary)" }}
      >
        {formatDate(props.pressRelease.date)}
      </time>

      {/* Title */}
      <h3 
        class="text-3xl font-mono mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        <A 
          href={`/press/${props.pressRelease.slug}`}
          class="hover:underline focus:outline-none focus:ring-2 rounded"
          style={{ "focus:ring-color": "var(--focus-ring)" }}
        >
          {props.pressRelease.title}
        </A>
      </h3>

      {/* Subtitle */}
      {props.pressRelease.subtitle && (
        <p 
          class="text-lg mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {props.pressRelease.subtitle}
        </p>
      )}

      {/* Excerpt */}
      <p 
        class="text-base leading-relaxed mb-4"
        style={{ color: "var(--text-secondary)" }}
      >
        {props.pressRelease.excerpt}
      </p>

      {/* Read More Link */}
      <A 
        href={`/press/${props.pressRelease.slug}`}
        class="inline-flex items-center text-base font-medium transition-colors focus:outline-none focus:ring-2 rounded px-3 py-2"
        style={{ 
          "color": "var(--text-primary)",
          "focus:ring-color": "var(--focus-ring)"
        }}
      >
        Read More →
      </A>
    </article>
  );
}

