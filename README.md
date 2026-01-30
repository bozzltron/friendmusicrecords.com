# friend music records

Independent record label website - dark minimalist design showcasing artists, releases, and label ethos.

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
- **Domain/URLs**: URLs and technical identifiers remain as-is (friendmusic.com)

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

## License

ISC
