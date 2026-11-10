# Home redesign, draft 1

`redesign/index.html` on the branch `redesign/home`. It is a standalone page: it reads the project list from `js/projects.js` and the images from `assets/`, but uses none of `css/style.css` or `js/site.js`, so the live site is untouched.

To view it, run `python3 -m http.server 8080` from the repo root and open `http://localhost:8080/redesign/`.

---

## The idea

**The interface is grey and black. Colour appears only where there is data.**

This is the main rule in data visualization (context in grey, the thing you are looking at in colour), applied to the whole site. It does three jobs at once:

- **It sets the tone.** A neutral canvas with precise black type reads as sleek and technical, not warm and friendly.
- **It makes the work glow.** Your maps and charts are the only saturated things on the page, so they win every time.
- **It shows what you do.** You never have to say "I'm a data person", because the page itself behaves like a chart.

---

## What I took from the references

**rauno.me**
- A light grey canvas with very large type and nothing else competing.
- Craft in small interactive details rather than decoration: a "Copy email" button that answers "Copied", and a live Berlin clock.
- One bold geometric element. Rauno uses circles; here it is the unit chart.

**Accurat**
- The work shown as a catalogue: sharp-cornered images with no card chrome, and a short caption underneath.
- A second "machine" voice in a monospace face, for numbers.
- Data as identity. Their site has no illustration; the visual language *is* data.

**What I left out:** Rauno's horizontal scrolling (recruiters skim vertically) and Accurat's all-caps labels (they slow reading and look like a template).

---

## Decisions

### 1. The hero is a chart of your work
Under the headline sits a band of **846 squares, one per place** in the data behind your four projects:

| Project | Squares | Source |
|---|---|---|
| Uneven Ground | 173 countries | TRIP dataset, per the case study |
| Housing Observatory | 58 neighbourhoods | Berlin Prognoseräume |
| Affordable for Whom? | 542 planning areas | Berlin Planungsräume |
| Barcelona Green Spaces | 73 neighbourhoods | project summary |

**Why:** the earlier feedback said the biggest gap was that the site isn't itself data viz. A generative or decorative D3 piece would look clever but say nothing. This is a real unit chart built from real counts, and it says something true: you work with places, at many scales, from countries down to blocks of a city. The footnote "Berlin appears twice, at two scales" is a small data-nerd detail that gives the page personality.

**It also navigates.** Hovering a block (or a label, or tabbing to one) greys out the others, the readout changes from "n = 846" to "n = 542 of 846", and clicking opens the project. This is brushing and linking, the same interaction you would build into a dashboard.

**Labels hang from the band on leader lines,** like annotations on a printed chart. A small script tries every arrangement and picks the one where no label overlaps and no leader line cuts through another label. On phones, where they can't fit, they turn into a two-column legend.

### 2. Type: one family at two widths, plus a mono for numbers
- **Archivo**, a variable grotesk with a width axis. Headings are set at 116% width, weight 500, with tight tracking. Body text uses the normal width.
- **Fragment Mono**, only for numbers and measurements: counts, the clock, "n = 846" and the coordinates.

**Why:** wide letterforms are the lettering of technical drawings and map title blocks, which ties the type to your architecture and urban research background. They also feel engineered and slightly futuristic without being gimmicky. Using one family keeps it calm. Width does the job that two typefaces would otherwise do.

The mono has one rule: **words are set in the grotesk, measurements in the mono.** It is never used for labels or decoration, so every time it appears it signals data.

**Scale:** 12 (mono), 14, 16, 20 to 24, 32 to 48, 40 to 100. The headline is 100px at 1440 wide, up from 42. That jump, against the 12px numbers, produces the "edge". The earlier feedback found the hierarchy too timid, with nine sizes but no real contrast.

### 3. Colour
| Token | Value | Use |
|---|---|---|
| `--canvas` | `#EBEBEA` | Page. A neutral grey, not the warm off-white of the current site. |
| `--ink` | `#000000` | Text. |
| `--ink-2` | `#595958` | Secondary text. **5.6:1** contrast, which fixes the 2.7:1 grey on the current site. |
| `--line` / `--off` | `#C4C4C1` / `#D3D3D0` | Hairlines, and data that is out of focus. |
| `--signal` | `#0050F0` | The only interface colour: email, availability, focus rings, text selection. **5.1:1** contrast on the canvas. |
| Project accents | from `projects.js` | Only on data: chart squares and the small key beside each title. |

**Why blue:** none of your four project colours is blue, so it can never be mistaken for data. Blue is also the colour people already read as "you can click this", and it supports "trustworthy". As requested, there is no dark mode.

### 4. Layout
A 12-column grid that uses the full width. Selected work sits in **two columns, with the right one dropped**, a staggered catalogue borrowed from Accurat. This fixes the 416px empty strip that the earlier feedback found beside the project cards, and gives the page rhythm without adding decoration.

### 5. Project tiles
No card, border, radius, shadow or pills. Each one is the image (always cropped to **4:3**, so different thumbnails look like one set), then the title, the place count in mono, the summary and the tools in plain text.

The small square before the title uses the project's colour, the same one as its block in the hero chart, so the two connect. On hover the square stretches into a short bar, and the image moves very slightly.

### 6. About as a spec sheet
A statement, one line on your background, and then a table (Background, Analysis, Visualization, Design, Based in) ruled like an architectural title block. Recruiters scan for tools, so the table puts them where scanning finds them. All entries come from your case studies' quick facts.

### 7. Contact
Your email, very large, in signal blue: the biggest blue thing on the page is the thing to click. Next to it are a "Copy email" button that answers "Copied" (a Rauno-style detail with a real use, since many people don't use mailto) and the social links. The base row ends with Berlin's coordinates in mono.

### 8. Motion
- **On load, one moment only:** the headline rises in 0.5s and the squares sweep in from left to right like a chart drawing itself. The page is settled by about 0.9s. (The earlier feedback found the current headline still half-faded after 3s.)
- **Nothing animates on scroll.** No looping animations.
- Everything else responds to the visitor: chart highlighting, the tile bar, link colours and the copy confirmation.
- `prefers-reduced-motion` turns off the entrance completely.

### 9. Accessibility
- All text reaches at least 4.5:1 contrast.
- Every link and button is at least 44px tall on phones. The earlier feedback counted 12 under 40.
- Focus rings are visible, in signal blue.
- There is a skip link.
- The chart has a text alternative listing every count, and its labels are real links, so keyboard users get the same highlighting.

---

## How this answers the earlier feedback

| Feedback | In this draft |
|---|---|
| Generic and friendly, not futuristic | Grey canvas, wide grotesk, mono numbers, one electric blue, sharp corners |
| The site isn't data viz | The hero is a unit chart of your own work, with brushing and linking |
| Timid hierarchy | 100px headline against 12px data |
| Faint grey text | Secondary text at 5.6:1 |
| Slow intro | Settled in under 1s, once |
| Empty strip beside the cards | Full-width, staggered two-column catalogue |
| Cards feel like a template | No chrome, one crop ratio, captions instead of pills |
| Small tap targets | All at least 44px |

---

## Open questions and next steps

1. **Check the counts.** 173, 58, 542 and 73 come from your case-study text. If Barcelona or Uneven Ground use a different count in the final data, change `META` near the top of the script.
2. **Chart copy.** "One square, one place." is the chart title. If it's too playful for you, "Places in my projects' data" is the plain version.
3. **The blue.** `#0050F0` is the one strong colour. Change `--signal` to try another. Keep it out of your project colours' hue range.
4. **Without JavaScript** the chart and tiles don't render, as on the current site. If this direction is adopted, the tiles should be static HTML.
5. **Before adopting it,** `DESIGN.md` and `design-system.html` would need the new tokens, type and components. They describe the current site and were left unchanged on purpose.
6. **Next pages:** the Works page could reuse the catalogue as is. Case studies could pick up the type, colours and spec-table pattern.
