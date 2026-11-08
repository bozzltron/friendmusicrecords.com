# friend music records — Press Release Runbook

Step-by-step procedure for shipping a press release and rotating the artist EPK to a new song.

Use this for every single, album, video, signing, or label announcement. It is a companion to `docs/RUNBOOK.md` — follow the general development flow there, and use this document for the release-specific work.

---

## Golden Rules

- **`src/data/pressReleases.ts` is the single source of truth.** One entry drives the blog post, the `/press` index, `/press/[slug]`, and `/feed.xml`.
- **The press page is the blog.** There is no separate blog collection. Adding a press release entry *is* adding the blog post.
- **The current EPK must show the current release only.** Archived press releases stay in `pressReleases.ts`, but the EPK is a snapshot of the newest release.
- **Never leave the previous song in the current EPK.** Old artwork, copy, credits, and download links must be replaced, not layered on top.
- **Always lowercase "friend music records"** in user-facing copy.
- **Always work on a branch and run a build before publishing.**

---

## Phase 0 — Gather Assets and Copy

Do not start editing code until both assets below are final.

### 0.1 Required Assets

| Asset | Spec | Where it lives |
|-------|------|----------------|
| Cover artwork (master) | Square, 3000×3000 px or larger, PNG/TIFF/WebP master | External hi-res download (e.g. Proton Drive) |
| Cover artwork (web) | Square, 1600×1600 px or larger, `.webp`, optimized | `public/<artist>-<release>.webp` |
| Press photo (if new) | Landscape or portrait, high resolution, `.webp` | `public/<artist>-press-photo.webp` |
| Artist hero/banner (if new) | 1200×800 px or larger, `.webp` | `public/<artist>-<date>.webp` |
| EPK PDF | Regenerated with new artwork + new press release | `public/<artist>-EPK.pdf` |
| Press release PDF (optional) | 1-page, text-selectable, accessible | `public/<artist>-<release>-press-release.pdf` |
| Audio masters (optional) | Final WAV + MP3 | External download (e.g. Dropbox) |
| Optional social crop | 1200×630 px, `.webp` | `public/` |

**Asset rules:**

- Use a **new filename** for each release (e.g. `mozworth-why-not.webp`, not a reused `cover.webp`) so browsers, service workers, and CDNs do not serve stale art.
- Optimize to WebP before committing. Keep the master out of the repo.
- Record the dimensions and a descriptive alt text for each image.
- Artwork is **not** part of the generated PWA precache manifest (the precache covers built JS/CSS; public images are served from the network). Use a new filename or bump the PWA version so the new image is picked up rather than a stale cached copy. PDFs are not precached either — see Phase 5.1.

**Converting JPEG/PNG to WebP** (`cwebp` is installed):

```bash
# Square cover art — resize to 1600×1600, quality 82
cwebp -q 82 -metadata none -resize 1600 1600 input.jpg -o public/mozworth-<release>.webp

# Non-square image — cap width at 1600, preserve aspect ratio
cwebp -q 82 -metadata none -resize 1600 0 input.jpg -o public/mozworth-<release>.webp

# Verify
file public/mozworth-<release>.webp
```

- Use `-q 80–85` for artwork; raise only if gradients or fine texture band.
- `-metadata none` strips EXIF, including camera location data.
- Convert once from the highest-quality master, never from an already-compressed copy.

### 0.2 Required Copy

Collect and confirm all of the following:

- [ ] Headline / title
- [ ] Subtitle or deck (1 sentence)
- [ ] Release date (ISO `YYYY-MM-DD`)
- [ ] Song release date, if different from the announcement date
- [ ] Dateline city and date (e.g. `Austin, TX – September 23, 2026`)
- [ ] Body copy, including at least one pull quote
- [ ] Streaming / purchase links
- [ ] Artist boilerplate ("About mozworth")
- [ ] Label boilerplate ("About friend music records")
- [ ] Media contact (email, phone, website)
- [ ] Tags for the press page (e.g. `Release`, `mozworth`, `Single`, `` `<Song>` ``)
- [ ] Credits for the EPK (songwriting, performance, recording, mix, master, cover art)

Copy template:

```text
**FOR IMMEDIATE RELEASE**

**<Headline>**

*<Subtitle / deck>*

**Austin, TX – <Month D, YYYY>** — <Opening paragraph: who, what, when, where, why.>

<Body paragraphs. Include a pull quote in quotation marks.>

**<Song> drops <Month D, YYYY>**

For media inquiries, interviews, or press materials, please contact:

friend music records
info@friendmusicrecords.com
friendmusicrecords.com

**About mozworth**
<Artist boilerplate>

**About friend music records**
friend music records is an independent record label based in Austin, Texas, dedicated to helping friends publish their music.
```

> The press release renderer supports `**bold**`, `*italic*`, markdown images (`![alt](/path.webp)`), and `- ` lists. It does **not** support arbitrary HTML or nested markdown.

---

## Phase 1 — Add the New Blog Post (Press Release)

The blog post and the press release are the same object. Add it once, and the blog, detail page, sitemap, and RSS all pick it up.

### 1.1 Add artwork to `public/`

```bash
# Example: new release artwork
public/mozworth-<release>.webp
```

- Confirm the file opens and is optimized.
- Confirm the filename is lowercase and hyphenated (except files that already use mixed case — avoid changing existing filenames).
- Never overwrite an old release's artwork. Archive art stays for old posts.

### 1.2 Add the entry to `src/data/pressReleases.ts`

Add the new object at the **top** of the `pressReleases` array (newest first, matching the existing convention). Sorting is by `date`, not array order, so the date must also be correct.

```ts
{
  id: '<artist>-<release>-release',
  slug: '<artist>-<release>-release',
  title: '<Headline>',
  subtitle: '<Deck>',
  date: 'YYYY-MM-DD',
  artistId: '<artist-id>',        // must match an id in src/data/artists.ts
  excerpt: '<1–2 sentence summary for cards, RSS, and metadata>',
  content: `**FOR IMMEDIATE RELEASE**
...`,
  featured: true,
  tags: ['Release', '<artist>', 'Single', '<Song>'],
  // Optional:
  // coverImage: '/mozworth-<release>.webp',
  // pressReleasePdf: '/mozworth-<release>-press-release.pdf',
  // buyVinylUrl: 'https://...',
  // igPostUrl: 'https://...',
},
```

**Field rules:**

| Field | Rule |
|-------|------|
| `id` | Stable, unique, never reused |
| `slug` | Stable, unique, URL-safe; becomes `/press/<slug>` and the RSS GUID |
| `title` | Headline; keep under ~70 characters for SEO |
| `subtitle` | One sentence; optional but recommended |
| `date` | Press release / announcement date, ISO `YYYY-MM-DD`; must match the dateline. The song release date may be different and should be stated in the copy |
| `artistId` | Must exist in `src/data/artists.ts` or the "About the Artist" block disappears |
| `excerpt` | 1–2 sentences; used in cards, RSS `<description>`, and meta description |
| `content` | Full release copy; see formatting rules above |
| `featured` | `true` for the current release |
| `tags` | Include `Release` and the artist name; add release type and song/album |
| `coverImage` | Optional path to release artwork; used for the post image and social metadata |
| `pressReleasePdf` | Optional path to a downloadable PDF; rendered on the press post and EPK |

### 1.3 Add the post to the current `featured` rotation if needed

- `getFeaturedPressReleases()` filters on `featured`.
- If only the newest release should be "featured," set `featured: false` on the previous release.
- Archived releases should remain in the array. Do **not** delete old posts unless they were published in error.

### 1.4 Verify the blog post

Start the dev server:

```bash
npm run dev
```

Check:

- [ ] `/press` lists the new post first
- [ ] `/press/<slug>` renders the new copy
- [ ] Markdown bold, italic, images, and lists render correctly
- [ ] The "About the Artist" block appears and links to the EPK
- [ ] The date displays correctly (long form) and `<time datetime>` is the ISO date
- [ ] Tags render
- [ ] Buy / Instagram links appear only when their fields are set
- [ ] No placeholder text (`TBD`, `Lorem`, `[insert]`) remains

---

## Phase 2 — Update the RSS Feed

RSS is generated at request time from `pressReleases.ts`. **Do not edit `src/routes/feed.xml.ts` per release.**

### 2.1 Verify the generated feed

```bash
npm run build
npm run start
# In another terminal, use the port the server prints:
curl -s http://localhost:3000/feed.xml
```

The feed and sitemap are server routes, not static files in `.output/public/` — fetch them from the running server (or the deployed site).

Check:

- [ ] New release appears as the first `<item>`
- [ ] `<link>` and `<guid>` are `https://friendmusicrecords.com/press/<slug>`
- [ ] `<pubDate>` is RFC 822 format (`toUTCString()` output), not ISO
- [ ] `<description>` matches the new `excerpt`
- [ ] `<lastBuildDate>` is current
- [ ] No duplicate or reused GUIDs
- [ ] Old entries are still present

Optionally validate with <https://validator.w3.org/feed/>.

---

## Phase 3 — Update the EPK with New Artwork and New Press Release

The EPK is **not** driven by `pressReleases.ts`. It is hand-built in `src/routes/artists/[slug].tsx` with sections gated on `artist.id === 'mozworth'`. Every release-specific block must be updated manually.

> If this is the first release for a new artist, the release-specific blocks will not render at all. Extend or duplicate the gated sections rather than assuming they exist.

### 3.1 Edit points in `src/routes/artists/[slug].tsx`

| EPK section | What to update |
|-------------|----------------|
| **Banner image** | `artist.image.hero` and its alt text (usually via `src/data/artists.ts`) |
| **Featured Release** | Cover `src` + alt, `<h3>` title, `<time datetime>` + display date, blurb, "More Info" link |
| **Download Assets** | Hi-res cover link, WAV/MP3 links, download filenames, aria-labels, visible labels |
| **Press Release** | Full headline, dateline, body paragraphs, boilerplate, contact block |
| **Credits** | Heading (`Credits - <Song>`) and every credit line (songwriting, lyrics, composition, performance, recording, mix, master, cover art) |
| **About / Bio** | Only if the artist bio changed |

Notes:

- The "More Info" button uses `artistPressReleases()[0]?.slug`, which automatically points at the newest press release. Confirm it resolves to the new one.
- The EPK press release copy is duplicated from `pressReleases.ts`. Update both, or the EPK and blog will disagree.
- Search for the old song title after editing — see Phase 4.

### 3.2 Update `src/data/artists.ts` if artist assets changed

```ts
image: {
  thumbnail: '/mozworth-logo.jpg',
  hero: '/mozworth-<new-hero>.webp'
},
epkPdf: '/mozworth-EPK.pdf'
```

- Update `hero` only when there is a new banner/press photo.
- Keep `thumbnail` stable unless the logo changes.
- If the PDF filename changes, update `epkPdf` to match.

### 3.3 Regenerate the EPK PDF

The static PDF at `public/mozworth-EPK.pdf` must match the HTML EPK. It is not generated by the site build.

- [ ] New cover artwork embedded
- [ ] New press release copy embedded
- [ ] New credits embedded
- [ ] Date and contact details current
- [ ] File replaced at `public/mozworth-EPK.pdf` (or a new filename referenced in `artists.ts`)
- [ ] PDF opens and text is selectable/searchable
- [ ] File size is reasonable (compress if over ~10 MB)

> PDFs are not in the PWA precache glob. If the filename stays the same, replace the file and hard-refresh; if you need to guarantee a fresh copy for everyone, use a new filename.

### 3.4 Update the home page featured release

The home page has its own hard-coded "New Single" block in `src/routes/index.tsx`:

- [ ] Cover artwork `src` + alt text
- [ ] Release title
- [ ] Release blurb
- [ ] "View EPK" link still points to `/artists/<artist>`
- [ ] `fetchpriority` / `loading` attributes remain on the hero image

If the home page still advertises the previous song, the release is not finished.

---

## Phase 4 — Rotation Check: Previous Song Gone, New Song Fully Integrated

This is the most error-prone step. The old press release should remain in the archive, but the **current EPK** and **home featured module** must contain only the new release.

### 4.1 Search for the previous release

Run a repo-wide search for the previous song title, slug, and artwork filename:

```bash
# Song title (case-insensitive, fixed string)
grep -rniF "<previous song title>" src docs README.md --exclude='*.pdf'

# Previous slug
grep -rnF "<previous-slug>" src docs README.md

# Previous artwork filename
grep -rnF "<previous-artwork-filename>" src docs README.md

# Previous EPK download label / aria text
grep -rnF "<previous song title> Cover Art" src
```

### 4.2 Expected vs. unexpected matches

| Match | Expected? | Action |
|-------|-----------|--------|
| Previous press release entry in `src/data/pressReleases.ts` | ✅ Yes | Leave it — it is the archive |
| Previous song mentioned inside a new release's body copy (as back catalog) | ✅ Sometimes | Keep only if intentional and accurate |
| Previous artwork filename in an archived post | ✅ Yes | Leave it |
| Previous song in `src/routes/artists/[slug].tsx` Featured Release | ❌ No | Replace |
| Previous song in EPK Download Assets | ❌ No | Replace |
| Previous song in EPK Press Release block | ❌ No | Replace |
| Previous song in EPK Credits | ❌ No | Replace |
| Previous song in `src/routes/index.tsx` home featured block | ❌ No | Replace |
| Previous artwork referenced anywhere as the current cover | ❌ No | Replace |

### 4.3 EPK rotation checklist

Open `/artists/mozworth` and confirm:

- [ ] Featured Release shows the **new** cover art
- [ ] Featured Release title is the **new** song
- [ ] Release date matches the new release
- [ ] Blurb describes the new release
- [ ] "More Info" opens the new press release
- [ ] Download Assets offers the **new** cover art (correct filename, link, and aria-label)
- [ ] Press Release block headline is the new headline
- [ ] Press Release dateline matches the new date
- [ ] Press Release body is the new copy (no leftover old paragraphs)
- [ ] Credits heading names the new song
- [ ] Every credit line is accurate for the new release
- [ ] EPK PDF matches the page
- [ ] No old artwork, old download link, or old "New Single" label remains

---

## Phase 5 — Final PWA, SEO, Metadata, and Accessibility Checks

### 5.1 PWA

The site uses `vite-plugin-pwa` with `registerType: 'autoUpdate'` in `app.config.ts`.

- [ ] Bump `version` in `package.json` (e.g. `1.0.5` → `1.0.6`) so the new service worker cache is published
- [ ] Run `npm run build`
- [ ] Confirm the service worker and manifest are generated in the build output
- [ ] `public/manifest.json` still has the correct name, icons, theme, and start URL
- [ ] Test an offline load after the first visit
- [ ] Confirm the new artwork is served fresh (no stale cached cover)
- [ ] If the EPK PDF filename changed, confirm the new path is used

### 5.2 SEO

- [ ] `/press/<slug>` has a unique `<title>` and `<meta name="description">`
- [ ] Canonical URL is `https://friendmusicrecords.com/press/<slug>/`
- [ ] Open Graph and Twitter Card tags are present
- [ ] `og:image` resolves to a real, absolute image URL (prefer `https://friendmusicrecords.com/...`)
- [ ] `og:image` is a sensible social crop (1200×630 recommended) and `imageAlt` is descriptive

> Known gap: the press and EPK routes currently pass site-relative image paths to `StandardMetadata`. Confirm the image still resolves in social previews; prefer an absolute URL if you are touching that code.
- [ ] `NewsArticle` JSON-LD has the correct `headline`, `description`, `datePublished`, `image`, and `url`
- [ ] `BreadcrumbList` JSON-LD is correct
- [ ] `/sitemap.xml` includes `/press/<slug>` with the right `lastmod`
- [ ] `/feed.xml` includes the new item (Phase 2)
- [ ] `robots.txt` still points at the sitemap
- [ ] RSS autodiscovery link is present in the page head
- [ ] The new page is not `noindex`
- [ ] Structured data validates (e.g. Google Rich Results Test)

### 5.3 Metadata

- [ ] Release date is ISO in data and displays correctly on the page
- [ ] Announcement date and song release date are both accurate and not conflated
- [ ] `<time datetime="YYYY-MM-DD">` matches the release date
- [ ] Dateline in the copy matches the release date
- [ ] Title and description are within reasonable lengths (title ≤ ~70 chars, description ≤ ~160 chars)
- [ ] All links (streaming, purchase, Instagram, artist site) resolve
- [ ] Contact email and phone are current
- [ ] Artist and label boilerplate are current
- [ ] Artwork filenames and alt text are correct
- [ ] No duplicate or conflicting metadata between EPK and press post

### 5.4 Accessibility

- [ ] Exactly one `<h1>` on each page; heading levels are ordered
- [ ] All meaningful images have descriptive alt text
- [ ] Decorative images use `alt=""`
- [ ] Cover art includes `width`/`height` or aspect-ratio styling to prevent layout shift
- [ ] Download links have clear visible labels and `aria-label`s
- [ ] Every interactive element is reachable and operable by keyboard
- [ ] Focus rings are visible in both dark and light mode
- [ ] Link text is meaningful out of context (no "click here")
- [ ] Tap targets are at least 44×44 px on touch devices
- [ ] Text contrast passes WCAG AA in both color schemes
- [ ] Page works in dark mode (default) and light mode (`prefers-color-scheme: light`)
- [ ] No new accessibility regressions in the press post, EPK, or home page

### 5.5 Content, Build, and Lint

- [ ] Brand name is lowercase everywhere in user-facing copy
- [ ] Spelling and grammar checked
- [ ] No placeholder text
- [ ] No broken relative paths or mixed-case filename mistakes
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] No new console errors in the browser
- [ ] Test at mobile, tablet, and desktop widths

---

## Phase 6 — Commit and Publish

```bash
git add -A
git commit -m "feat: add [artist] '[song]' press release and rotate EPK

- Add artwork for [song]
- Add press release / blog post
- Verify RSS and sitemap output
- Update EPK artwork, copy, credits, and downloads
- Remove previous song from current EPK and home feature
- Bump PWA cache version
- SEO, metadata, and accessibility checks"
```

- [ ] Push to `main` or open a PR per the main runbook
- [ ] Verify the production deployment
- [ ] Open the live press post and EPK
- [ ] Confirm the live RSS feed shows the new item
- [ ] Hard-refresh / reinstall the PWA to confirm the new artwork

---

## Quick Reference

| Task | File / Command |
|------|----------------|
| Add the blog post + press release | `src/data/pressReleases.ts` |
| Press release type | `src/types/pressRelease.ts` |
| Press index | `src/routes/press/index.tsx` |
| Press detail page | `src/routes/press/[slug].tsx` |
| RSS feed source | `src/routes/feed.xml.ts` (generated — do not edit per release) |
| Sitemap source | `src/routes/sitemap.xml.ts` (generated) |
| EPK page | `src/routes/artists/[slug].tsx` |
| Artist data / hero / EPK PDF path | `src/data/artists.ts` |
| Home featured release | `src/routes/index.tsx` |
| Metadata + JSON-LD helpers | `src/utils/metadata.tsx` |
| PWA config | `app.config.ts` |
| PWA cache version | `package.json` (`version`) |
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Production server | `npm run start` |
| Lint | `npm run lint` |

---

## Common Failure Modes

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| New post missing from `/press` | Date is older than other releases, or entry falls outside the top 5 returned by `getLatestPressReleases()` | Verify `date` and the helper's limit |
| New post missing from RSS | Site not rebuilt/deployed, or entry malformed | Run `npm run build`, fetch `/feed.xml` from the server |
| RSS date invalid | `date` is not a parseable ISO value | Fix `date` to `YYYY-MM-DD`; the feed formats it with `toUTCString()` |
| EPK still shows old song | Hard-coded section not updated | Search the old title across `src/` (Phase 4) |
| EPK "More Info" points to old post | Date order wrong or old release newer | Verify `date` and sort order |
| Old artwork still appears | Reused filename or service worker cache | Use a new filename, bump version, hard-refresh |
| EPK PDF stale | PDF not regenerated or cached | Replace the PDF / use a new filename |
| Home page advertises old single | `src/routes/index.tsx` not updated | Update the featured block |
| Structured data warnings | Missing image/date/headline | Check `createPressReleaseData()` inputs |
| PWA serves old assets | Version not bumped | Bump `package.json` version and rebuild |

---

## Reminders

- **Press entry = blog post.** Do not create a second content type for the same release.
- **Archive old releases, rotate the EPK.** Old posts stay; the EPK only shows the current release.
- **Update EPK copy in two places** — `pressReleases.ts` and `artists/[slug].tsx` — until the EPK is refactored to read from data.
- **Regenerate the EPK PDF manually.** It is not part of the site build.
- **Bump the PWA version on every release.**
- **Search for the old song before shipping.**

---

*Keep this run book updated as the EPK and press pipeline evolve.*
