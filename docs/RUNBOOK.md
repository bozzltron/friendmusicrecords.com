# friend music records — Run Book

Standard operating procedure for making updates to the friend music records website.

---

## Development Flow

### 1. Receive Requirements
- Gather requirements from stakeholders, issues, or feature requests
- Clarify scope, acceptance criteria, and priority
- Document in a GitHub issue or project board

### 2. Context Gathering
- Review existing codebase structure (`src/routes`, `src/components`, `src/data`, `src/types`, `src/utils`)
- Check relevant documentation in `docs/` (BRAND.md, PROJECT_GUIDELINES.md, this RUNBOOK.md)
- Understand current patterns for:
  - Component composition
  - Data fetching/loading
  - Metadata and SEO
  - Structured data (JSON-LD)
  - Styling with TailwindCSS 4.x
  - TypeScript types

### 3. Write a Plan Doc (Only for Big Features)
**Most edits do NOT need a plan.** Skip to step 8 for routine changes.

**Create a plan document only when:**
- Feature spans multiple files/routes
- Requires new data structures or types
- Involves significant refactoring
- Impacts SEO, accessibility, or performance

**Plan doc location:** `docs/plans/<feature-name>.md`

**Plan doc structure:**
```markdown
# Plan: <Feature Name>

## Overview
Brief description of the feature

## Requirements
- Requirement 1
- Requirement 2

## Technical Approach
- Files to create/modify
- Data model changes
- Component architecture
- Routing changes

## Design Principles Alignment
- Brand consistency (lowercase, monospace)
- SEO/LLM optimization
- Accessibility (WCAG)
- Performance
- Responsive design

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Risks / Open Questions
- Risk 1
- Question 1
```

### 4. Remove Old Completed Plan Docs
- After a plan is fully implemented and merged, delete its plan doc
- Keep only active/in-progress plan docs in `docs/plans/`

### 5. Enrich the Plan with Requirements
- Add implementation details discovered during context gathering
- Reference specific files, functions, and patterns to use
- Note any dependencies or blockers

### 6. Double-Check Plan for Accuracy
- Verify all referenced files exist
- Confirm data models match existing types
- Ensure approach aligns with SolidStart conventions
- Check that routing/data loading patterns are correct

### 7. Double-Check Plan Aligns with Design Principles
Verify against **Primary Goals** (from PROJECT_GUIDELINES.md):
- [ ] Brand Consistency — lowercase brand name, monospace typography
- [ ] SEO Optimization — metadata, structured data, semantic HTML, robots.txt, sitemap.xml, RSS
- [ ] Performance — fast loading, optimized images, efficient code
- [ ] Accessibility — WCAG, ARIA, keyboard nav, color-scheme support
- [ ] Color Scheme Support — dark default, light on `prefers-color-scheme: light`
- [ ] Responsive Design — mobile-first, Tailwind breakpoints, fluid layouts, 44×44px tap targets
- [ ] Press & RSS — single source in `src/data/pressReleases.ts`
- [ ] LLM Optimization — structured data, semantic HTML, descriptive metadata, clear hierarchy

---

## Execution Phase

### 8. Execute the Plan
- Implement changes following the plan
- Write code incrementally
- Follow existing patterns in the codebase

### 9. Use npm to Run the Service and Test in Real Time
```bash
npm run dev      # Start dev server (vinxi dev)
# Test manually in browser at http://localhost:3000
```
- Test across breakpoints (mobile, tablet, desktop)
- Test dark/light mode switching
- Test keyboard navigation
- Verify structured data with browser dev tools

---

## Per-Phase / Per-Milestone Checklist

After each logical phase or milestone:

### 10. Code Review Against Design Principles
Self-review or peer review focusing on:
- Brand guidelines adherence (lowercase, monospace)
- Semantic HTML usage
- Structured data completeness
- Accessibility attributes
- Responsive behavior

### 11. Run Lint and Fix
```bash
npm run lint     # Check for issues
npm run lint:fix # Auto-fix where possible
```
- Resolve all remaining lint errors manually

### 12. Update Docs and Clean Docs Where Needed
- Update `docs/PROJECT_GUIDELINES.md` if conventions changed
- Update `docs/BRAND.md` if brand usage evolved
- Update this `RUNBOOK.md` if process changed
- Update README.md if user-facing changes
- Delete any obsolete documentation

### 13. Commit
```bash
git add -A
git commit -m "feat: <descriptive message>

- Detail 1
- Detail 2

Refs: #<issue-number>"
```
- Use conventional commits (feat, fix, docs, refactor, chore, etc.)
- Reference related issue/PR number

---

## Post-Implementation / Pre-Release Checklist

Once the plan is done or all phases/milestones complete:

### 14. Holistic Code Review — Best Solution for Goals
- Does this solve the original problem optimally?
- Are there simpler alternatives?
- Is technical debt introduced? Can it be avoided?

### 15. Code Review — Best Solution for the Stack
- SolidJS/SolidStart idioms followed?
- Vinxi/Vite patterns used correctly?
- TailwindCSS 4.x best practices?
- TypeScript types strict and accurate?
- No unnecessary dependencies added?

### 16. Code Review — Design Principles Compliance
Final verification of all Primary Goals:
- [ ] Brand Consistency
- [ ] SEO Optimization
- [ ] Performance
- [ ] Accessibility
- [ ] Color Scheme Support
- [ ] Responsive Design
- [ ] Press & RSS
- [ ] LLM Optimization

### 17. Review All Metadata for Accuracy and Consistency
- Page titles and descriptions
- Open Graph / Twitter Card tags
- JSON-LD structured data (RecordLabel, MusicGroup, NewsArticle, BreadcrumbList)
- Canonical URLs
- `robots.txt` and `sitemap.xml` entries
- RSS feed (`/feed.xml`) validity

### 18. Update PWA Cache Key
- Bump version in `package.json` (triggers new service worker cache)
- Or update `workbox.cacheId` in `app.config.ts` if manual control needed
- Verify `registerType: 'autoUpdate'` is set (currently configured)

### 19. Clean Code — Remove Dead Code
- Remove unused imports
- Remove unused components, functions, types, or variables
- Remove commented-out code blocks
- Remove unreachable code
- Remove unused CSS classes (Tailwind purges automatically, but check custom CSS)
- Check for and remove duplicate code — extract to shared utilities/components

### 20. Review Google Analytics Setup
- GA measurement ID present in `app.config.ts` or layout
- Events firing correctly (page_view, clicks, etc.)
- Enhanced measurement enabled
- No PII collected

### 21. Generate RSS and Ensure Valid and Accurate
```bash
npm run build
# Verify /feed.xml output
# Validate with RSS validator (e.g., validator.w3.org/feed/)
```
- All press releases appear
- Dates in RFC 822 format
- GUIDs unique and stable
- Content matches press release data

### 22. Commit (Final Polish)
```bash
git add -A
git commit -m "chore: final polish for <feature>

- Lint fixes
- Doc updates
- Metadata verification
- RSS validation"
```

### 23. Push
```bash
git push origin main
# Or push to feature branch and open PR
```
- Deploy triggers automatically (configured in hosting platform)
- Verify production deployment

---

## Quick Reference Commands

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Production server | `npm run start` |
| Lint check | `npm run lint` |
| Lint auto-fix | `npm run lint:fix` |

---

## Key Files to Know

| Purpose | File(s) |
|---------|---------|
| Brand rules | `docs/BRAND.md` |
| Project conventions | `docs/PROJECT_GUIDELINES.md` |
| Press releases (single source) | `src/data/pressReleases.ts` |
| Site metadata utils | `src/utils/metadata.tsx` |
| Types: Press Release | `src/types/pressRelease.ts` |
| Types: Artist | `src/types/artist.ts` |
| Global layout/SEO | `src/app.tsx` |
| Global styles | `src/app.css` |
| Tailwind config | `tailwind.config.js` |
| App/Vinxi config | `app.config.ts` |
| ESLint config | `eslint.config.js` |

---

## Reminders

- **Always** use lowercase "friend music records" in user-facing content
- **Always** use monospace font stack
- **Always** add structured data for new entities
- **Always** test dark/light mode and responsive breakpoints
- **Never** commit lint errors
- **Never** leave stale plan docs in `docs/plans/`
- **Press releases** → single source in `src/data/pressReleases.ts` → drives press pages + RSS

---

*Keep this run book updated as the project evolves.*