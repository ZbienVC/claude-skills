# Where this skill came from

- Author: Julio Barbosa (juliobsz, https://github.com/juliobsz)
- Original repo: https://github.com/juliobsz/skills
- Copied from commit `add880bd6ec9f5592a1482846fc0dd282c9161bc` (2026-10-26)
- License: MIT. The author's license is kept next to the skill in `LICENSE`, as MIT requires.

## What was copied
The whole `awwwards/` folder: `SKILL.md`, 15 files in `references/` and 7 scripts in `scripts/`.
Nothing was changed. The author's companion skill `jury` (scores a site without changing it),
the tests and the plugin files were left out.

## Safety check done before copying (2026-11-04)
- No hidden characters, no auto-run hooks, no tool grants in the skill.
- No script runs other programs or reads secrets. The only setting read is where Playwright
  keeps its browsers.
- What goes online, and only when Claude runs that step:
  - `font.mjs` downloads the font you pick from Fontshare or Google Fonts into the project.
  - `photos.mjs` downloads placeholder photos from picsum.photos (free Unsplash photos), only
    for photo-heavy sites with no images provided.
  - `shoot.mjs` downloads the axe-core accessibility checker from jsdelivr if the project
    does not have it, and refuses to run it unless it matches a pinned fingerprint (sha384).
  - `audit.mjs` and `shoot.mjs` otherwise only visit the local site on 127.0.0.1.
- The skill tells Claude to install packages in the site project it builds (`gsap`, `lenis`,
  `ogl`, `playwright`, `axe-core`), and Playwright's Chromium once if missing. It deploys only
  after the user says so.

## Updating it later
Copy the folder again from a newer commit, read the diff first, redo the safety check above
and change the commit here.
