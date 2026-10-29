# Portfolio: working notes

Static portfolio site for www.ivan-alfonsoburgos.com. Plain HTML, CSS and JavaScript, with no build step and no dependencies.

## Before any visual or content change

Read `DESIGN.md` first and follow it: tokens, components, motion, accessibility and the rules in §8. If a change adds or alters a token, component or pattern, update `DESIGN.md` in the same change.

`design-system.html` is the visual reference. When the design changes, update its demos and add a dated entry to its changelog (newest first). The owner may paste change notes copied from that page. They name items by code (e.g. "C7 Project card"), and the codes match the sections of `DESIGN.md`.

## Where things live

- `js/projects.js`: the project list plus site settings (nav pages, email, socials). Add, remove or reorder projects here only.
- `css/style.css`: all styles, with tokens in `:root`.
- `js/site.js`: renders the nav, footer, project cards, case-study sidebar and "More projects" carousel, and runs the animations.
- New case study: copy `project-template.html` (steps in `README.md`).
- `_redirects`: redirect rules for old Framer URLs. The Pages workflow turns each rule into a redirect page.
- `.github/workflows/pages.yml`: publishes the site to GitHub Pages on every push to `main`.

## Checking changes

Preview with any local static server from this folder, for example `python3 -m http.server 8080`. Check 1440×900, 1280×800, 1024 wide, tablet (~900) and phone (375), and confirm the console has no errors.

## Publishing (only when asked)

- **GitHub:** `ivan13f/portfolio` (public), branch `main`. A plain `git push` can stall waiting for the macOS Keychain, so push with:
  `GIT_TERMINAL_PROMPT=0 git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push origin main`
- **Hosting:** GitHub Pages, built from GitHub Actions (`.github/workflows/pages.yml`). **Pushing to `main` publishes the live site**, so commit and push only when asked, and check the change locally first. After a push, follow the run with `gh run watch --repo ivan13f/portfolio` (or `gh run list`).
- The workflow uploads `git ls-files` minus `*.md`, `design-system.html`, `project-template.html`, `_redirects`, `.gitignore` and `.github/`, then generates redirect pages from `_redirects`.
- **Custom domain:** `www.ivan-alfonsoburgos.com`, set in the repo's Pages settings (no `CNAME` file needed for Actions deploys). HTTPS is enforced. GitHub redirects the bare domain to www.
- **DNS** (GoDaddy, managed by the owner): `A @ → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153`, `CNAME www → ivan13f.github.io`.
- **Old host:** the Netlify site was deleted on 2026-10-29, and the Netlify account has no sites left. GitHub Pages is the only host.
