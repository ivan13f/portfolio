# I-AB portfolio: design system

The rules behind www.ivan-alfonsoburgos.com. `css/style.css` holds the actual values; this file explains what they're for and how to use them.

**Read this before every visual or content change.** If a change adds or alters a token, component or pattern, update this file in the same change.

---

## 1. Character

- **Quiet, editorial, warm.** A warm off-white canvas, white cards with hairline borders, and near-black text. The interface stays neutral: color comes from each project's accent and from the work itself (maps, charts, dashboards).
- **One typeface.** Inter does everything, and weight sets the hierarchy: 400 for reading, 500 for interface labels, 600 for headings, 700 only for the logo. Georgia appears only in persona names, as an editorial accent.
- **Generous space.** Large vertical gaps (80–120px), left-aligned layouts, and text columns of at most 628px.
- **Soft, sparing motion.** Elements slide in once, on page load or when scrolled into view. Hover states lift with a small spring. Only two things loop: the green "available" pulse and the hero tagline.

---

## 2. Tokens

All tokens are CSS custom properties on `:root` in `css/style.css`. Use a token rather than a raw hex value. If a new value is needed, add a token and list it here.

### 2.1 Color

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FAF9F5` | Page background, nav background, dropdown trigger |
| `--surface` | `#FFFFFF` | Cards, dropdown panels, accordions |
| `--ink` | `#212121` | All primary text, dark button, footer background (utility `.c-ink`) |
| `--muted` | `#807F7F` | Secondary text: descriptions, fact values, accordion answers, Impressum body, the second half of two-tone leads (utility `.c-muted`) |
| `--soft` | `#999897` | Hero tagline only (large text) |
| `--line` | `#E7E5DC` | Every border and divider |
| `--hover` | `#F1EFE9` | Hover background: section index links, closed accordion, carousel arrows |
| `--active` | `#F2F0EA` | Current item: active section index link, current dropdown item |
| `--fact` | `#F4F4F4` | Quick-facts bar, default tile background, image placeholders |
| `--trigger-hover` | `#F5F5F5` | Nav dropdown trigger on hover or open |
| `--footer` / `--footer-ink` | `#212121` / `#F5F5F5` | Footer background and text (headings and big links are `#FFF`) |
| `--green` | `#058F13` | "Available for work" dot only |

Two fixed values sit outside the tokens: the dark button text is `#F4F4F4`, and the lightbox backdrop is `rgba(33,33,33,.7)`.

### 2.2 Project accents

Each project has one accent color, set in `js/projects.js` (`accent`). It's applied as `--accent`: inline on each project card, and on `<body>` for case-study pages (set by `site.js`). Everything accent-colored derives from it:

- **Chip and live-button background:** `color-mix(in srgb, var(--accent) 25%, transparent)`; the live button goes to 35% on hover
- **Chip and live-button border and text:** `var(--accent)`
- **Numbered badges:** filled with `var(--accent)`, with white text

| Project | Accent |
|---|---|
| Housing Observatory | `#9F693C` |
| Affordable for Whom? | `#D4583B` |
| *(Framer projects not ported: Aside `#8B80CC`, On Site `#FB5C1F`, Spotlight `#8C7822`)* | |

Content colors that only apply inside one case study are set inline in that page's HTML, not as tokens:

- **Housing Observatory persona cards:** Newcomer `#C8440A`, Resident `#2952CC`, Researcher `#1A6B5C`
- **Housing Observatory dbt layer tiles** (background / border):
  - Staging: `#D6EAF8` / `#1D4E89`
  - Intermediate: `#D1F2EB` / `#0E6655`
  - Mart: `#DCCCFF` / `#874FFF`

When choosing a new accent, see §7: darker accents keep text readable.

### 2.3 Typography

Font stack: `"Inter", system-ui, -apple-system, "Segoe UI", sans-serif`, loaded from Google Fonts at weights 400, 500, 600 and 700. Antialiased. Body text is 16px with a line height of 1.5.

| Role | Class / selector | Size / line height | Weight | Tracking | Phone (<810) |
|---|---|---|---|---|---|
| Logo "I-AB" | `.logo` | 48 / 1 | 700 | −0.06em | same |
| Hero headline | `.t-display` | 42 / 1.2 | 600 | 0 | 36 |
| Hero tagline | `.ticker` | 38 / 1.2 | 600 | 0 | 32 |
| Page title, footer "Say Hello" | `.t-page` | 32 / 1.5 | 600 | −0.01em | 28 |
| Section title, project card title | `.t-h2` | 29 / 1.5 | 600 | −0.01em | same |
| Case-study sidebar title | `.case-card h1` | 29 / 1.2 | 600 | −0.01em | same |
| Carousel card title | `.mcard__info h3` | 27 / 1.5 | 600 | −0.01em | same |
| Lead text, case-study section heading | `.t-lead`, `.cs-head h2` | 26 / 1.5 | 600 | −0.01em | 22 |
| Question tile title | `.tile__q` | 23 / 1.5 | 600 | −0.01em | same |
| Accordion question | `.acc__head` | 20 / 1.5 | 600 | −0.01em | same |
| Persona question | `.persona__q` | 20 / 1.5 | 400 | 0 | same |
| Tile title | `.tile__title` | 18 / 1.5 | 600 | −0.01em | same |
| Body | `body`, `.t-body`, `.prose` | 16 / 1.5 | 400 | 0 | same |
| Small: eyebrows, nav, buttons, chips, card descriptions | `.t-small` | 14 / 1.5 | 400 (500 for nav, chips and the dark button) | 0 (descriptions −0.01em) | same |
| Extra small: footer meta, fact labels, "Available" pill | `.t-xs` | 13 / 1.5 | 400–500 | −0.01em | same |
| Persona name | `.persona__name` | Georgia 27 / 1.5 | 400 | −0.01em | same |
| Big numbers (risk-score tiles, arc list) | `.tile__big`, `.arc__num` | 29 | 600 | −0.01em | same |

Rules:
- Headings are in sentence case. Uppercase appears only through CSS (`text-transform`) on outline buttons, link-card labels and "Scroll for more"; the HTML keeps normal case.
- **Two-tone lead:** a lead paragraph opens with its key sentence in ink and continues in the secondary gray: `<p class="t-lead c-muted"><span class="c-ink">Key sentence.</span> The rest…</p>`. This is used for the Home "About me" teaser. The About intro follows the same idea across two paragraphs: an ink statement, then a `--muted` lead.
- Use bold (`<strong>`, 600) inside body text to highlight key terms, the way the case studies name data sources and concepts. Italic (`<em>`) is for foreign terms and caveats.
- Each page has exactly one `<h1>`: the hero headline on Home, the page title on About, Works and Imprint, and the sidebar title on case studies (rendered by `site.js`).

### 2.4 Spacing

The scale in use is 4 · 8 · 10 · 12 · 16 · 20 · 24 · 30 · 40 · 60 · 80 · 120 px. Stick to it.

| Context | Value |
|---|---|
| Page gutter (`--gutter`) | 60 desktop · 30 tablet · 16 phone |
| Between paragraphs (`.prose > * + *`) | 12 |
| Card padding | 24 (case card, index, tiles, accordion, note); 20 on large cards (project, link and carousel cards) |
| Grid and column gaps | 40 (`.cols-2`, `.cols-3`, case layout, hero row); 20 for tight variants and on phones |
| Inside a case-study section (`.cs-section`) | 40 by default · `--tight` 20 · `--mid` 60 · `--loose` 80 |
| Between case-study blocks (`.case-content`) | 80 |
| Between case-study sections (`.cs-sections`) | 120 (80 on phones) |
| Home sections | 80 above and below each divider; project cards 60 apart |
| Top padding, simple pages (`.page`) | nav height + 109 = 193 |
| Top padding, case studies (`.case`) | 122 |

### 2.5 Radius

| Radius | Used on |
|---|---|
| 4 | Section index links |
| 8 | Buttons, dropdown triggers and items, inner card images, facts bar |
| 10 | Dropdown panel |
| 16 | Case card, section index, hero, `.cs-media`, accordion, callout, note, about photo, lightbox image |
| 20 | Project cards, link cards, carousel cards, tiles, persona cards, "Available" pill |
| 50% | Badges, "+" button, carousel arrows, arc numbers, pulse dot |

### 2.6 Borders

- Cards: `1px solid var(--line)`. Hairlines: `0.5px` on dropdown triggers and the callout.
- **Framer draws borders inside the box.** To keep its inner spacing, take 1px off the padding of a bordered element: 20px cards use `padding: 19px`, and 24px cards use `23px`. New bordered cards follow the same rule.

### 2.7 Elevation

No shadows at rest. Elevation only appears on hover or for overlays.

| Token | Use |
|---|---|
| `--shadow-card` | Project card and carousel card on hover |
| `--shadow-card-lg` | Link cards (hero, About teaser) on hover |
| `--shadow-menu` (`0 10px 20px rgba(0,0,0,.05)`) | Dropdown panel |

Stacking order: nav `50`, dropdown panel `2` (inside the nav), lightbox `100`.

### 2.8 Motion

| Effect | Duration | Easing token | How to apply | Where |
|---|---|---|---|---|
| Slide in on page load | 0.6s | `--ease-appear` `(.44,0,.56,1)` | `data-appear="down"` (from −150px y, fades in) · `"right"` (from −150px x, fades in) · `"up"` (from +150px y, no fade) | Home and About only: nav (`<body data-nav-appear>`), hero pieces, About intro |
| Reveal on scroll, once | 0.8s | `--ease-reveal` `(.12,.23,.5,1)` | `data-reveal` (rises 150px and fades in) · `data-reveal="left"` (from +150px x) | Project cards (added automatically), Home About teaser |
| Spring (hover, chevrons, accordion, tagline) | 0.4–0.5s | `--ease-spring` `(.34,1.4,.64,1)` ≈ spring with bounce 0.2 | transitions in CSS | Card shadows, dropdown chevron (flips 180°), "+" rotates 90°, arrow nudges 3px, accordion height |
| Color and background fades | 0.2–0.3s | `ease` | transitions in CSS | Hover backgrounds, dropdown panel fade, lightbox |
| Hero tagline | holds each line 4s, then 0.5s spring | — | `data-ticker`, with one `.ticker__line` per line | Home hero |
| Availability pulse | 1.3s loop | linear | CSS keyframes `pulse` | "Available for work" pill |

Rules:
- Appear and reveal styles only apply under `html.js`, so content is never hidden when JavaScript doesn't run.
- Don't add new looping animations, and reveal each element at most once.
- Travel distance for slide-ins is always 150px.
- `prefers-reduced-motion: reduce` turns off all slide-ins, reveals, loops and smooth scrolling, and shows video controls instead of autoplaying. Every new animation must respect this.

---

## 3. Layout and breakpoints

| Breakpoint | Width | What changes |
|---|---|---|
| Desktop | ≥ 1024px | Full layout. Case studies have the sticky sidebar. |
| Tablet | 810–1023px | Gutter 30. Case-study sidebar stacks above the content. Nav unchanged. |
| Phone | < 810px | Gutter 16. Nav collapses (see §4.1). All multi-column grids become one column. Project cards stack with the image on top. Type scales down (see §2.3). |

Key widths:
- **Content:** max `1440px` (`--max`), centered
- **Project cards:** max `904px`, left-aligned (not centered)
- **Text columns:** `628px` max
- **Home hero text:** `653px`
- **Link cards:** `432px`
- **Case study:** sidebar `299px` + `40px` gap + content; hero ratio `966 / 746` (`--hero-ratio`)
- **Nav:** fixed, `84px` tall (`--nav-h`)

Horizontal overflow is clipped with `overflow-x: clip` on `html` and `body`, so slide-in start positions never widen the page and sticky positioning keeps working. Don't change this to `hidden`.

---

## 4. Components

### 4.1 Navigation (two levels)

Built by `site.js` from `SITE.pages` and `PROJECTS` in `js/projects.js`. Never hand-write nav markup.

- **Layout:** logo, 30px gap, crumbs, then the dark "Get in touch ↗︎" button on the right.
- **Level 1:** a dropdown with Home · About · Selected Works. Its label shows the current section: Home and Imprint show "Home", About shows "About", Works and case studies show "Selected Works".
- **Level 2:** only on case studies. A separator chevron (rotated −90°, `--muted`) is followed by a second dropdown, labelled with the current project and listing all projects.
- **Trigger:** 36px tall; min-width 175 (level 2: 235); padding `4px 24px`; `0.5px` border in `--line`; background `--bg`, which changes to `--trigger-hover` on hover or open. Label 14/500. The 20px chevron flips 180° with a spring when open.
- **Panel:** white, radius 10, `--shadow-menu`, 10px below the trigger. Level 1: padding `24px 16px`, gap 16. Level 2: padding `16px 8px`, gap 10. Items are 36px tall, radius 8, centered 14/500, with a `--bg` hover; the current item uses `--active`. It fades in over 0.25s while moving 4px.
- **Behavior:**
  - Desktop opens on hover, with a 140ms close delay and an invisible 10px hover bridge.
  - Click or tap toggles it. A mouse click on a menu already opened by hover keeps it open.
  - Keyboard: Enter opens, ↑/↓ move through items, Esc closes, and the menu closes when focus leaves it.
- **Phone:** the CTA, separator and level-2 dropdown are hidden. On Works and case-study pages, the project list appears as a sub-list inside the level-1 dropdown, below a divider (smaller, `--muted`, current item in ink). The panel aligns right and is at least 230 wide.

### 4.2 Buttons

| Variant | Class | Specs |
|---|---|---|
| Dark CTA | `.btn.btn--dark` | 36h, min-width 170, `--ink` background, `#F4F4F4` text 14/500, radius 8, hover `#3A3A3A` |
| Outline | `.btn.btn--outline` (+ `.btn--lg` for 50h) | Transparent, `1px --line`, ink 14/400 uppercase, radius 8, hover `--surface`. Arrow as text "→". |
| Live project | `.live-btn` | Full width, 48h, accent tint background (25%, 35% on hover), `1px` accent border, accent text 16/600, radius 8. Label "See live project ↗︎". |

External links open in a new tab with `rel="noopener"`, and email links use `mailto:`. The "↗︎" arrow marks links that leave the site or open email.

### 4.3 Chips

`.chips > .chip`: padding `4px 12px`, radius 16, `1px` accent border, 25% accent background, accent text 14/500, gap 12, wrapping. A project's chips come from `tags` (cards) or `pageTags` (case-study sidebar) in `projects.js`. Use them for tools and disciplines, three per project at most.

### 4.4 "Available for work" pill

`.available`: radius 20, `1px --line`, padding `3px 12px`, 13/500. An 8px `--green` dot carries a pulsing copy of itself (scale ×2, fading to 0.1). Shown in the Home hero only. Remove it if no longer available.

### 4.5 Hero tagline (ticker)

`.ticker[data-ticker]` holds one `.ticker__line` per line. Lines start with an en dash and a space ("– blending design…"). The box takes the height of the tallest line and clips. Each line holds for 4s, then the next springs up from below while the old one lifts out. It pauses while the tab is hidden. Without JS, only the first line shows. Keep it to 3–5 lines.

### 4.6 Link card

`.link-card`: white, radius 20, `1px --line`, padding 19, max-width 432, content aligned right. It holds an image (ratio `392/366`, radius 8, cover) and a label (14px uppercase + 20px arrow icon). On hover, `--shadow-card-lg` appears and the arrow nudges 3px. Used for the Home hero (→ Works) and the Home About teaser (→ About).

### 4.7 Project card

`.pcard > .pcard__box`, rendered from `projects.js` (never hand-write one). White, radius 20, `1px --line`, padding 19, 520 tall, max-width 904.
- **Left column (346 wide):** padding `24px 16px`, gap 24. Title (`.t-h2`), summary (14px `--muted`), chips.
- **Right:** image (radius 8, cover) with a white 40px "+" circle in the bottom right.
- **Hover:** `--shadow-card`, and the "+" rotates 90°.
- **Scroll:** reveals once (`data-reveal`).
- **Phone:** image on top (4:3), text below.

### 4.8 Case-study sidebar

`<aside class="case-side" data-case-side>`, built by `site.js`. It contains:
1. **Case card:** title (29/1.2/600), summary (16 `--muted`), chips from `pageTags`. It takes up any extra height.
2. **Section index** (`.toc`): one link per `<section id data-toc="Label">` on the page. Links are 32h, radius 4, padding `4px 12px 4px 22px`, with a `--hover` background on hover. As you scroll, the section reaching the top 35% of the window is highlighted (`--active` background, weight 600). Omitted if no section has `data-toc`.
3. **Live button**, if the project has `live`.

**Height rule:** on desktop, the sidebar is always exactly as tall as the hero next to it, and it stays sticky (120px from the top) while the content scrolls.
- CSS derives the height from `--hero-ratio`.
- If the sidebar's content is taller than that (narrower desktops), `site.js` sets `--case-h` and the hero grows to match, cropping its image or video with `object-fit: cover`.
- On short windows, the sticky offset shrinks so the live button stays visible.
- Below 1024px the sidebar stacks above the content.

Keep `.cs-hero` as the first block of `.case-content`, and don't remove `min-width: 0` from `.case-side`: a long label would widen the sidebar and shrink the hero.

### 4.9 Case-study content blocks

| Block | Markup | Specs |
|---|---|---|
| Hero | `.cs-hero > img/video` | Ratio 966:746, radius 16, cover. Export media at least 1932×1492. Video: `muted loop playsinline preload="metadata" data-autoplay`. |
| Quick facts | `dl.facts` with 4 × `div > dt + dd` | Always Type · Category · Timeframe · Tools. `--fact` background, `1px --line`, radius 8, padding `12px 24px`; dt 13 ink, dd 14 `--muted`; 2 columns on phones. |
| Section | `section.cs-section#id[data-toc]` | `scroll-margin-top: 120px`. Gap modifiers `--tight`, `--mid`, `--loose`. |
| Section heading | `header.cs-head > p.eyebrow + h2` | Eyebrow 14px ink (repeats the index label); h2 26/600. Max 628. |
| Grouped heading and text | `.stack` (gap 20) / `.stack--40` | |
| Body text | `.prose` | Max 628, paragraphs 12 apart, disc bullets indented 20. |
| Media | `.cs-media > img/video` | Full width, radius 16. Add `data-zoom` to an image to open it in the lightbox on click (optionally `data-zoom="larger.png"`). |
| Inset image | `.inset-img` | 350 wide image, indented 24px; for small UI details. |
| Callout | `aside.callout > img + .prose` | 60px icon, `0.5px --line` border, radius 16, padding `24px 20px`. For definitions ("What is a…?"). |
| Note | `p.note > em` | White card, `1px --line`, radius 16, padding 24. One caveat or key takeaway in italics. |
| Tile | `.tile` | `--fact` background, `1px --line`, radius 20, padding 24, gap 12. Set `--tile-bg` / `--tile-border` inline for colored tiles. Variants: numbered (`.tile--drs` + `.tile__big`), question (`.badge--lg` + `.tile__q`). |
| Grids | `.cols-2`, `.cols-3` | Gap 40, single column on phones. |
| Persona card | `article.persona` with `style="--accent:…"` | Accent background, `#F5F5F5` text, radius 20, padding 24, gap 50, min-height 394. Number in a 33px outlined circle, Georgia name, 14px description, 20px quoted question. |
| Numbered step | `.step > .badge + .prose` | 30px accent badge, 30 gap. Pair with `.annotated` to point at parts of an image. |
| Annotated image | `figure.annotated > img + .badge×n` | Badges positioned with `left`/`top` in % of the image, with a white halo. |
| Arc list | `ol.arc > li.arc__row > .arc__num + p` | 60px outlined circles with 29/600 numbers. For a 3–5 step narrative. |
| Concept row | `.concept > .cs-head + .concept__row` | Two equal columns (text + image or text + text), gap 40 (20 inline for text + text). |

### 4.10 Accordion (About)

`.acc[data-acc] > button.acc__head + .acc__body > div > p`. White, radius 16, `1px --line`. Header padding 24, question 20/600, 24px chevron (points down when closed, up when open). A closed card shows a `--hover` background on hover. The body opens with a spring height change; answers are 16px `--muted`. Several can be open at once.

### 4.11 "More projects" carousel

`<section data-more-projects>` at the bottom of each case study, built from every project except the current one. It's removed if no other projects exist.
- **Header:** outline button "More projects →" (50h) linking to Works, with prev/next arrow buttons that only appear when the cards overflow.
- **Cards** (`.mcard`): 408 wide, white, radius 20, padding 19. Image at ratio `368/459` (portrait; uses `card`, falling back to `cover`), title 27/600, summary `--muted`. Hover adds `--shadow-card` and lifts the card 4px.
- **Scrolling:** horizontal with scroll-snap and no visible scrollbar.

### 4.12 Footer

Built by `site.js`. Background `--ink`, padding `100px gutter 60px`, a 4-column grid with gap 40.
- **Columns 1–2:** "Say Hello" (`.t-page`, white) and a line with an underlined "Get in touch↗" mailto link.
- **Columns 3–4:** "Send me a Message" with the email (`.t-lead`), then "Or connect with me on Socials" with Behance, LinkedIn and GitHub links (`.t-lead`).
- **Bottom row (13px):**
  - "© {current year} Iván Alfonso Burgos"
  - "Berlin" + live Berlin time (`Europe/Berlin`, updates every 15s)
  - "Made with ♡︎︎ from scratch"
  - "Imprint↗", right-aligned
- **Links:** fade to 70% opacity on hover.
- **Phone:** one column.

### 4.13 Lightbox

Click-to-enlarge for `img[data-zoom]`. Backdrop `rgba(33,33,33,.7)`, image up to 1200px wide with radius 16, scaling up from 0.96 with a spring. Click or Esc closes it, and focus returns to the image. Zoomable images are keyboard-focusable and show a zoom-in cursor.

---

## 5. Page templates

| Page | Structure |
|---|---|
| Home (`index.html`) | Full-height hero aligned to the bottom: "Available" pill, headline, tagline, "Scroll for more ↓" on the left; link card to Works on the right. Then a divider, "Overview / Selected Works" with project cards and a "View all projects →" button, then a divider and the "About me" lead with a link card to About. Then the footer. |
| Selected Works (`works.html`) | Page title, then project cards (all projects). |
| About (`about.html`) | Two columns: intro (32px statement + 26px `--muted` lead) and a black-and-white portrait (ratio 633/400). Then the accordion (4 questions) beside a bordered card saying "Currently open for new opportunities…". |
| Case study (`<slug>.html`) | Sidebar + content. Content order: hero → quick facts → sections (each with an `id`, `data-toc`, eyebrow and h2) → usually ends with "Retrospective / What I learned". Then "More projects" and the footer. Start from `project-template.html`. |
| Imprint (`imprint.html`) | Title + date, then an address card (300 wide) beside the legal text (14px `--muted`, headings in ink). |

---

## 6. Content and assets

- **Voice:** first person, plain and specific. Section headings are claims or questions ("Who is it for?", "Public Data. Private Effort."). The eyebrow names the section; the h2 says something about it.
- **Project summary** (`projects.js` → `summary`): one sentence of about 10–25 words, saying what was built and for whom.
- **Images:**
  - Case-study hero: 966:746, exported at 2× (1932×1492 or larger).
  - Project card image: landscape; it's cropped to fill.
  - Carousel `card` image: portrait (368:459).
  - Compress everything. Prefer MP4 over GIF for anything animated (one GIF on the site is 8.5 MB).
- **File names:** `assets/img/<project-prefix>-<what>.png` (e.g. `ho-dbt-dag.png`, `afw-lor.png`) and `assets/video/<prefix>-<what>.mp4`.
- **Alt text:** describe what the image shows and why it matters. Use `alt=""` for decorative images, such as icons beside text that already says the same thing.
- **Videos:** always `muted loop playsinline preload="metadata" data-autoplay`. They play only while on screen.
- **Projects:** add, remove or reorder them only in `js/projects.js`. Cards, nav, sidebars and the carousel all follow from it.

---

## 7. Accessibility

Contrast, measured against WCAG 2.1, where small text needs 4.5:1 and large text 3:1:

| Pair | Ratio | Status |
|---|---|---|
| `--ink` on `--bg` / white | 15.3 / 16.1 | ✅ |
| Footer text on `--footer` | 14.8 | ✅ |
| `--muted` on `--bg` / white / `--fact` | 3.8 / 4.0 / 3.6 | ⚠️ below 4.5 for small text |
| `--soft` on `--bg` (hero tagline, 38px) | 2.7 | ⚠️ below 3 even for large text |
| Chip text on its tint: Housing / Affordable | 3.2 / 2.8 | ⚠️ |
| White badge text on accent: Housing / Affordable | 4.6 / 4.0 | ✅ / ⚠️ |
| Persona text: orange / blue / green | 4.5 / 6.1 / 5.8 | ✅ |

The ⚠️ pairs come from the original Framer design and are kept for visual fidelity. **Don't spread them further:**
- New small text should use `--ink`, or a color that reaches 4.5:1.
- Keep `--soft` for the hero tagline only.
- When choosing a new project accent, aim for at least 4.5:1 for white text on the accent, and check the chip contrast. Deeper, darker tones work better than bright ones.

Other rules:
- Visible focus: `outline: 2px solid var(--ink)` with a 3px offset. Don't remove it.
- Every interactive element is a real `<a>` or `<button>`. Dropdowns and accordions update `aria-expanded`, and the current page uses `aria-current`.
- One `<h1>` per page, with headings in order.
- Respect `prefers-reduced-motion` (see §2.8).

---

## 8. Rules for changes

1. Read this file first. Afterwards, update it if any token, component or pattern changed.
2. Plain HTML, CSS and JS only: no framework, no build step, no dependencies.
3. New colors, radii, shadows and easings become tokens in `:root`. No raw values in component rules. The exception is per-project content colors, which are set inline.
4. Projects come only from `js/projects.js`; never hand-write cards, nav entries or carousel items.
5. Anything hidden for an animation must be scoped under `html.js`.
6. Reuse the existing components in §4 before inventing new ones. If a new one is needed, follow these tokens and document it here.
7. Check every change at 1440×900, 1280×800, 1024 wide, tablet (~900), and phone (375). Also check reduced motion, keyboard use of the nav, and that the console has no errors.
