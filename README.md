# I-AB portfolio

A hand-built copy of the Framer site at ivan-alfonsoburgos.com. It's plain HTML, CSS and JavaScript: no framework, no build step and no dependencies. Any static host can serve this folder as it is.

## What's where

```
index.html                 Home
about.html                 About
works.html                 Selected Works
housing-observatory.html   Case study
affordable-for-whom.html   Case study
imprint.html               Impressum
project-template.html      Starting point for a new case study (not linked anywhere)
design-system.html         Visual design system reference, kept off the live site (rules in DESIGN.md)

js/projects.js             ← the list of projects + site settings (email, socials, nav)
js/site.js                 nav, footer, cards, sidebar, animations
css/style.css              all styles; colour tokens and animation curves at the top
assets/img, assets/video   media downloaded from the Framer site
```

## Editing

**Add, remove or reorder projects** in `js/projects.js`. These all update from that one list:

- the second-level nav dropdown (Selected Works › project)
- the project cards on Home and Selected Works
- the sidebar card on each case-study page
- the "More projects" carousel

A new case study needs one entry in `projects.js` plus a `<slug>.html` page. Copy `project-template.html` to start. Every `<section>` with an `id` and a `data-toc="Label"` attribute gets a link in the sidebar index, which highlights as you scroll.

**Case-study sidebar layout:** on desktop the sidebar (title card, section index, "See live project" button) is always exactly as tall as the hero image or video beside it, with the title card taking up any extra space. It stays fixed while the content scrolls. Heroes are cropped to 966 × 746. To use a different shape, change `--hero-ratio` on `.case` in `css/style.css`. Below 1024px the sidebar stacks above the content.

**Home only shows some projects?** Add `data-limit="3"` to `<div class="project-list" data-project-list>` in `index.html`.

## How the navigation works

| | Desktop (≥ 810px) | Phone (< 810px) |
|---|---|---|
| Level 1 | Home · About · Selected Works dropdown, opens on hover | Same dropdown, opens on tap |
| Level 2 | On project pages a breadcrumb appears: `Selected Works › Project ▾`, listing every project | Projects appear as a sub-list inside the level-1 dropdown on Works and project pages |

Keyboard: Tab to a trigger, Enter opens it, arrow keys move through the items, Esc closes.

## Animations (matched to the Framer settings)

| Effect | Where | Timing |
|---|---|---|
| Slide in on load | nav, "Available" pill (from above); hero text (from the left); hero card (from below) | 0.6s, `cubic-bezier(.44,0,.56,1)` |
| Reveal on scroll, once | project cards (rise 150px); About teaser (text rises, card slides in from the right) | 0.8s, `cubic-bezier(.12,.23,.5,1)` |
| Rotating tagline | hero | holds each line 4s, springs up over about 0.4s |
| Pulse | green "available" dot | 1s scale ×2 and fade, then a 0.3s pause |
| Dropdown | nav | 0.25s fade; chevron flips 180° with a spring |
| Card hover | project cards, link cards | layered shadow, spring |
| Accordion | About | spring height and chevron |

All motion turns off for visitors with "reduce motion" enabled.

## Previewing locally

Use any static server from this folder, for example:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Hosting

Each of these is free for a site this size:

- **Netlify:** drag this folder onto app.netlify.com/drop. Connect a Git repo later if you want automatic deploys.
- **Cloudflare Pages:** create a project, upload the folder (or connect a repo). No build command, and the output directory is `/`.
- **GitHub Pages:** push the folder to a repo, then turn on Settings → Pages → "Deploy from branch".
- **Vercel:** `npx vercel` from this folder, or import the repo. Framework preset "Other".

All four serve `about.html` at `/about` too, so existing links to the Framer URLs keep working. To keep the domain, point `www.ivan-alfonsoburgos.com` at the new host in your DNS settings, and only cancel the Framer plan after the new site is live.

### Notes

- **Analytics:** the Framer site loads Google Analytics (`G-7NK1SLQ5YM`), and this copy doesn't. To keep it, paste the gtag snippet into each page's `<head>`, ideally behind a consent banner. If you drop it, remove the Google Analytics paragraph from `imprint.html`.
- **Media size:** the videos are about 22 MB and `ho-wireframes.gif` is 8.5 MB. Converting that GIF to MP4 or WebM would make the case study load much faster.
