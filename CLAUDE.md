# Portfolio: working notes

Static portfolio site for www.ivan-alfonsoburgos.com. Plain HTML, CSS and JavaScript, with no build step and no dependencies.

## Before any visual or content change

Read `DESIGN.md` first and follow it: tokens, components, motion, accessibility and the rules in §8. If a change adds or alters a token, component or pattern, update `DESIGN.md` in the same change.

## Where things live

- `js/projects.js`: the project list plus site settings (nav pages, email, socials). Add, remove or reorder projects here only.
- `css/style.css`: all styles, with tokens in `:root`.
- `js/site.js`: renders the nav, footer, project cards, case-study sidebar and "More projects" carousel, and runs the animations.
- New case study: copy `project-template.html` (steps in `README.md`).
- `_redirects`: Netlify redirects for old Framer URLs.

## Checking changes

Preview with any local static server from this folder, for example `python3 -m http.server 8080`. Check 1440×900, 1280×800, 1024 wide, tablet (~900) and phone (375), and confirm the console has no errors.

## Publishing (only when asked)

- **GitHub:** `ivan13f/portfolio` (private), branch `main`. A plain `git push` can stall waiting for the macOS Keychain, so push with:
  `GIT_TERMINAL_PROMPT=0 git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push origin main`
- **Netlify:** site `ivan-alfonsoburgos` (id `8469c014-55e5-4c54-84a6-7c8d5fd355d0`), custom domain `www.ivan-alfonsoburgos.com`. The bare domain redirects to www, and HTTPS is forced. The site is not linked to GitHub, so deploys are manual:
  1. Copy only the site files into a temporary folder: `git ls-files`, minus `*.md` and `.gitignore`. This leaves out these notes and the local `.claude` and `.netlify` folders.
  2. Run `npx --yes netlify-cli@27.14.2 deploy --prod --dir <that folder> --site 8469c014-55e5-4c54-84a6-7c8d5fd355d0`.
- **DNS** (GoDaddy, managed by the owner): `A @ → 75.2.60.5`, `CNAME www → ivan-alfonsoburgos.netlify.app`.
- The "Powered by Netlify" badge is switched off (`built_with_badge_enabled: false`).
