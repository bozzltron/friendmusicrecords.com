# friend music records — Project Guidelines

Human-readable project conventions for developers and AI assistants.

## Primary Goals

- **Brand Consistency**: Maintain consistent lowercase brand name and monospace typography across all pages
- **SEO Optimization**: Optimize for search engines with proper metadata, structured data, and semantic HTML; maintain robots.txt and sitemap.xml; add RSS feed link to all pages
- **Performance**: Fast loading times, optimized images, and efficient code
- **Accessibility**: WCAG compliant with proper ARIA labels, semantic HTML, keyboard navigation, and color-scheme support (dark default, light mode when user prefers)
- **Color Scheme Support**: Dark mode by default; light mode when the user's system preference is light
- **Responsive Design**: Mobile-first with Tailwind breakpoints, fluid layouts, appropriate tap targets, and consistent content width
- **Press & RSS**: Maintain a press page with an RSS feed. Single source of truth in `src/data/pressReleases.ts`; RSS generated at build from the same data.
- **LLM Optimization**: Optimize content structure and metadata for Large Language Models

## Technology Stack

- **Framework**: SolidJS with SolidStart (SSR-enabled)
- **Styling**: TailwindCSS 4.x
- **Build Tool**: Vite with Vinxi
- **PWA**: Vite PWA plugin for offline support
- **TypeScript**: Full TypeScript support throughout
- **Node**: Requires Node.js >=22

## Content Width

- `max-w-content` (60rem / 960px) — primary content
- `max-w-content-narrow` (48rem / 768px) — focused sections (contact, newsletter)

## Adding a Press Release

1. Open `src/data/pressReleases.ts`
2. Add a new object to the `pressReleases` array with: `id`, `slug`, `title`, `date`, `excerpt`, `content`, `featured`, `tags`
3. Run build — press page and RSS feed update automatically

No separate RSS generation step. Same data drives both.
