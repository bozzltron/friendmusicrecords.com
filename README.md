# friend music records

Independent record label website - dark minimalist design showcasing artists, releases, and label ethos.

## Goals

### Primary Goals
- **Brand Consistency**: Maintain consistent lowercase brand name and monospace typography across all pages
- **SEO Optimization**: Optimize for search engines with proper metadata, structured data, and semantic HTML
- **Performance**: Fast loading times, optimized images, and efficient code
- **Accessibility**: WCAG compliant with proper ARIA labels, semantic HTML, and keyboard navigation
- **LLM Optimization**: Optimize content structure and metadata for Large Language Models (LLMs) and AI systems to accurately understand and represent the label's information

### LLM Optimization Goals

The site is optimized for LLMs and AI systems that may crawl and index the content. This ensures accurate information retrieval and representation when AI systems reference friend music records.

**Key Optimizations:**
- **Structured Data (JSON-LD)**: Comprehensive Schema.org markup for RecordLabel, MusicGroup, NewsArticle, and BreadcrumbList
- **Semantic HTML**: Proper use of semantic elements (`<article>`, `<header>`, `<section>`, `<nav>`, `<address>`, `<figure>`, `<time>`, etc.)
- **Descriptive Metadata**: Rich meta tags including abstract, topic, and summary for better content understanding
- **Clear Content Hierarchy**: Well-structured headings (h1-h6) that clearly indicate content importance
- **Descriptive Alt Text**: All images include detailed alt text that describes content and context
- **Explicit Relationships**: Clear relationships between entities (artists, releases, label) through structured data
- **Complete Information**: All key information (address, contact, genres, locations) is available in both human-readable and machine-readable formats
- **Breadcrumb Navigation**: Structured breadcrumb data for better navigation understanding
- **Contact Information**: Structured contact points with clear service types and areas served

## Brand Guidelines

### Brand Name

**CRITICAL**: The brand name "friend music records" is ALWAYS written in lowercase.

- ✅ Correct: "friend music records"
- ✅ Correct: "friend music" (short form)
- ❌ Incorrect: "Friend Music Records"
- ❌ Incorrect: "Friend Music"
- ❌ Incorrect: "FRIEND MUSIC RECORDS"

#### Exceptions

- **Legal/Formal contexts**: When legally required (contracts, legal documents), use proper capitalization
- **Structured Data**: Schema.org structured data may use proper capitalization for technical compliance
- **Domain/URLs**: URLs and technical identifiers remain as-is (friendmusicrecords.com)

### Typography

- **Primary Font**: Courier/monospace typewriter-inspired fonts
- **Font Stack**: `'Courier New', 'Courier', monospace`
- **Usage**: All body text, headings, and UI elements use monospace fonts for consistency with logo design

### Brand Voice

- Collaborative
- Friendly
- Authentic
- DIY/Independent spirit
- Community-focused

### Logo Usage

- Logo uses Courier font (typewriter-inspired)
- Always maintain aspect ratio
- Use appropriate sizing for context (not too large to avoid pixelation)

## Technology Stack

- **Framework**: SolidJS with SolidStart (SSR-enabled)
- **Styling**: TailwindCSS 4.x
- **Build Tool**: Vite with Vinxi
- **PWA**: Vite PWA plugin for offline support
- **TypeScript**: Full TypeScript support throughout
- **Node**: Requires Node.js >=22

## Development

```bash
npm install
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
npm run lint:fix # ESLint auto-fix
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── routes/         # File-based routing
│   ├── about.tsx  # About page
│   ├── artists/   # Artist pages
│   ├── press/     # Press release pages
│   └── contact.tsx
├── data/           # Static data files
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## LLM Optimization Best Practices

When adding new content or pages, follow these guidelines to maintain LLM optimization:

1. **Use Semantic HTML**: Always use appropriate semantic elements (`<article>`, `<section>`, `<header>`, `<nav>`, etc.)
2. **Add Structured Data**: Include relevant Schema.org structured data (JSON-LD) for all entities
3. **Descriptive Alt Text**: Write alt text that describes both the image content and its context
4. **Clear Headings**: Use proper heading hierarchy (h1 → h2 → h3) to indicate content structure
5. **Complete Metadata**: Include all relevant meta tags (description, keywords, abstract, topic)
6. **Explicit Relationships**: Use structured data to link related entities (artists ↔ label, releases ↔ artists)
7. **Time Elements**: Use `<time>` elements with `datetime` attributes for dates
8. **Address Elements**: Use `<address>` elements for contact information
9. **Breadcrumbs**: Include breadcrumb structured data for nested pages
10. **Descriptive Content**: Write clear, descriptive content that explains what the label does, who the artists are, and what releases are available

## License

ISC
