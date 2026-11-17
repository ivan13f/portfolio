/*
  Single source of truth for the portfolio's projects.

  Everything that lists projects reads from here:
    - the second-level nav dropdown (Selected Works › <project>)
    - the project cards on the Home and Selected Works pages
    - the sidebar card on each case-study page
    - the "More projects" carousel at the bottom of each case study

  To add a project:   copy an entry, give it a new `slug`, and create `<slug>.html`
                      (start from project-template.html).
  To add one without a case study: set `external: true`. Its cards and nav item then
                      link straight to `live` in a new tab, and it needs no `<slug>.html`.
  To add an Other Project (smaller card under "Other Projects" on Selected Works only):
                      add `group: "other"` and put it with the others at the end.
  To remove one:      delete its entry (and its .html file if you like).
  To reorder:         reorder the entries.
*/
window.PROJECTS = [
  {
    slug: "uneven-ground",
    title: "Uneven Ground",
    summary:
      "An exploration of the Trans Rights Indicator Project, a record built to follow the legal status of trans people worldwide.",
    tags: ["Python", "Data Story", "D3.js"],
    pageTags: ["Data Story", "Python", "D3.js"],
    accent: "#5A37D1",
    cover: "assets/img/uneven-ground-cover.jpg",
    card: "assets/img/uneven-ground-card.jpg",
    live: "https://uneven-ground.ivan-alfonsoburgos.com/",
    liveLabel: "See live project ↗︎",
  },
  {
    slug: "housing-observatory",
    title: "Housing Observatory",
    summary:
      "An interactive dashboard examining rental affordability, purchase accessibility, and displacement pressure across Berlin's 58 neighbourhoods.",
    // Chips on the Home / Works cards
    tags: ["Data Viz", "Tableau", "D3.js"],
    // Chips in the case-study sidebar (falls back to `tags`)
    pageTags: ["dbt", "Tableau", "D3.js"],
    accent: "#9F693C",
    cover: "assets/img/housing-observatory-cover.png", // Home / Works card + case-study hero
    card: "assets/img/housing-observatory-cover.png", // "More projects" carousel
    live: "https://housing-observatory-cnz.pages.dev",
    liveLabel: "See live project ↗︎",
  },
  {
    slug: "affordable-for-whom",
    title: "Affordable for Whom?",
    summary: "Exploring Rental Affordability in Berlin (2013 to 2023)",
    tags: ["Python", "Data Viz", "Geoanalysis"],
    accent: "#D4583B",
    cover: "assets/img/affordable-cover.png",
    card: "assets/img/affordable-card.png",
    live: "https://ivan13f.github.io/affordable-for-whom/",
    liveLabel: "See live project ↗︎",
  },
  {
    slug: "barcelona-green-spaces",
    title: "Barcelona Green Spaces",
    summary:
      "An interactive map of how green each of Barcelona's 73 neighbourhoods is, and what kind of green it has, through four indicators built on the city's open data.",
    tags: ["Data Viz", "Geoanalysis", "MapLibre"],
    accent: "#3F7D5A",
    cover: "assets/img/barcelona-green-cover.jpg",
    live: "https://ivan13f.github.io/how-green-is-your-neighbourhood/#12.46/41.39686/2.17551",
    external: true,
  },

  /* Other Projects: earlier UX case studies, marked `group: "other"`. They get smaller cards in
     their own section at the bottom of Selected Works, and stay out of Home, the nav on the data
     projects and their "More projects" carousel. On their own pages the nav lists this group. */
  {
    slug: "onsite",
    group: "other",
    title: "On Site",
    summary:
      "Geo-location of historical imagery, stories, audio tours and AR Experiences for curious Berliners.",
    tags: ["UX Design", "User Research", "UI Design"],
    accent: "#C94A14",
    cover: "assets/img/onsite-cover.jpg", // Other Projects card
    card: "assets/img/onsite-card.jpg", // "More projects" carousel
    // No `live`: the Figma prototype is embedded in the page, as on the original
  },
  {
    slug: "aside",
    group: "other",
    title: "Aside",
    summary: "Money-saving App to simplify and motivate through visualisations.",
    tags: ["UX Design", "UI Design", "Branding"],
    accent: "#6E62B8",
    cover: "assets/img/aside-cover.jpg",
    card: "assets/img/aside-card.jpg",
  },
  {
    slug: "spotlight",
    group: "other",
    title: "Spotlight",
    summary: "One place with all stages in town, ticketing service and easy ticket exchange platform.",
    tags: ["UI Design", "Prototyping"],
    accent: "#80701F",
    cover: "assets/img/spotlight-cover.jpg",
    card: "assets/img/spotlight-card.jpg",
  },
];

/* Site-wide settings used by the nav and footer. */
window.SITE = {
  name: "I-AB",
  email: "ivan13f@gmail.com",
  city: "Berlin",
  timeZone: "Europe/Berlin",
  socials: [
    { label: "Behance", href: "https://www.behance.net/ivan-alfonsoburgos" },
    { label: "Linkedin", href: "https://www.linkedin.com/in/ivan-alfonsoburgos/" },
    { label: "GitHub", href: "https://github.com/ivan13f" },
  ],
  // First-level navigation. `match` lists the page keys (body[data-page]) that count as "current".
  pages: [
    { key: "home", label: "Home", href: "index.html", match: ["home", "imprint"] },
    { key: "about", label: "About", href: "about.html", match: ["about"] },
    { key: "works", label: "Selected Works", href: "works.html", match: ["works", "project"] },
  ],
};
