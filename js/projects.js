/*
  Single source of truth for the portfolio's projects.

  Everything that lists projects reads from here:
    - the second-level nav dropdown (Selected Works › <project>)
    - the project cards on the Home and Selected Works pages
    - the sidebar card on each case-study page
    - the "More projects" carousel at the bottom of each case study

  To add a project:   copy an entry, give it a new `slug`, and create `<slug>.html`
                      (start from project-template.html).
  To remove one:      delete its entry (and its .html file if you like).
  To reorder:         reorder the entries.
*/
window.PROJECTS = [
  {
    slug: "housing-observatory",
    title: "Housing Observatory",
    summary:
      "An interactive dashboard examining rental affordability, purchase accessibility, and displacement pressure across Berlin's 58 neighbourhoods.",
    // Chips on the Home / Works cards
    tags: ["Data Viz", "Tableau", "dbt"],
    // Chips in the case-study sidebar (falls back to `tags`)
    pageTags: ["Python", "dbt", "Tableau"],
    accent: "#9F693C",
    cover: "assets/img/housing-observatory-cover.png", // Home / Works card + case-study hero
    card: "assets/img/housing-observatory-cover.png", // "More projects" carousel
    live: "https://public.tableau.com/app/profile/ivan.alfonso.burgos/viz/HousingObservatory/View_01?publish=yes",
    liveLabel: "See live project ↗︎",
  },
  {
    slug: "affordable-for-whom",
    title: "Affordable for Whom?",
    summary: "Exploring Rental Affordability in Berlin (2013–2023)",
    tags: ["Python", "Data Viz", "Geoanalysis"],
    accent: "#D4583B",
    cover: "assets/img/affordable-cover.png",
    card: "assets/img/affordable-card.png",
    live: "https://ivan13f.github.io/affordable-for-whom/",
    liveLabel: "See live project ↗︎",
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
