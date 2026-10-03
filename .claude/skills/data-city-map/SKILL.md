---
name: data-city-map
description: Turns a set of things (projects, repos, skills, services) into a readable 3D city: shape shows the kind, height and width show size, color shows the group, color strength shows how recently it was touched, rings and roof lamps show crew work and health, groups become districts of square lots, and links become arcs. Use when deciding what a 3D map or board should encode, for example "make each project a building", "size things by how big the codebase is", "show what was touched recently" or "give the 3D blocks a meaning". Includes the encoding rules, formulas and legend wording. Not for camera controls or WebGL setup (use steerable-3d-scene) or for flat charts.
---

# Data city map

The idea Zach liked: "a little bit of a city, each building is a project, and the buildings are all different shapes, sizes and colors", but only if every difference means something. A city view works when someone can glance at it and answer "what is big, what is fresh, what kind is it, and what is broken" without reading a single label. These are the encodings from the approved Switchyard 3D Yard (October 2026). Build the scene itself with `steerable-3d-scene`.

## One channel, one meaning

Pick exactly one meaning per visual channel and never reuse a channel:

| Channel | Meaning | Why |
|---|---|---|
| Shape | Kind of thing | Read from the outline at any distance |
| Height and footprint | Size (amount of code, items held, score) | Big things should look big |
| Hue (which color) | Group or zone | Matches the 2D map, so places stay familiar |
| Color strength | How recently it was touched | Fresh work pops, old work fades |
| Roof lamp | Health | Small, always in the same spot |
| Ring at the base | Someone (the crew) worked here lately | Separates crew work from your own |
| Arcs between roofs | Connections | Lifted off the ground so they never cut through buildings |

Five shapes at most. A sixth shape makes the city noisy rather than more informative.

## The five building kinds (for code projects)

Read the kind from what the project runs, not from its name. In Switchyard that is the `runtimes` list in `data/projects/<repo>.json`. Check these in order:

1. First runtime is `skill` or `library`, or everything is a `static` page on `github-releases`: **kit**, a 4-sided pyramid rotated 45 degrees.
2. First runtime is `desktop` or `cli`: **tool**, a six-sided prism.
3. Has a front end (`frontend`/`static`) and a back end (`backend`/`worker`/`bot`): **full app**, a stepped tower (lower box at 68% of the height plus a box 62% as wide on top). A `frontend` whose name mentions "api" (Next.js API routes) also counts as a full app.
4. Front end only: **website**, a wide low block (1.32 × 0.82 of the footprint).
5. Back end only: **server or bot**, a round silo with a slightly wider, lighter cap ring 10 units below the top.

For other kinds of data, change the shape map to suit it, but keep it to five shapes or fewer and always explain it in the legend. In the approved 3D Canopy, tiles stay rounded blocks (long name tiles leave no room for round shapes), and height carries the meaning:
- skills: 12 + trigger score × 1.15;
- connectors: 24 + log2(tools + 1) × 13;
- packs: 18 + sqrt(skills in pack) × 15.

## Formulas

- **Size** `s = sqrt(count / maxCount)`. Use the square root so one giant does not flatten everyone else. For code, count files (from `data/scan.json`).
  - Height = 22 + 250·s.
  - Footprint = min(lot × 0.74, 44 + 80·s).
- **Freshness** from days since the last commit:
  - 3 days or less: 1.0
  - 7 or less: 0.9
  - 14 or less: 0.76
  - 30 or less: 0.6
  - 60 or less: 0.42
  - older: 0.26
- **Body color** = mix(group color, light block gray `--blk-front`, 0.42 + 0.56 × freshness). Old things stay visible but pale, never invisible.
- **Roof color** = mix(body, `--blk-top`, 0.62). Resting or archived things are 82% opaque.
- **Roof lamp** (a small sphere 9 units above the roof): green running, amber needs a look, gray resting, red broken. A broken building's lamp pulses, and its body glows faintly red in the Health lens.
- **Crew ring:** a thin amber torus (#F5A524, slightly glowing) around the base when an agent is on it now or touched it this week.
- **Arcs:** a quadratic curve from roof to roof, peaking 24 + min(240, distance × 0.16) above the taller roof. Live links are thick, dark and carry small ember "cars" (a sphere plus a glow sprite). Copied code is thin and gray. Ideas are ember.

## Layout: districts of square lots

A long 2D card layout does not fit round or pointed buildings. In 3D, each group becomes a raised plinth (the same rectangle as in 2D), filled with square lots:

- columns = round(sqrt(n × width / height)), rows = ceil(n / columns), with 14 units of padding;
- place items in reading order, so the city still matches the 2D map roughly.

Keep the zone name tag at the plinth's front edge.

## Lenses (one control, "Color by")

- **Health (default):** the encodings above, plus moving cars on live links.
- **Activity:** body color switches to a five-step blue ramp of recent work.
- **Crew:** buildings with an agent on them now turn ember, ones touched this week turn half ember, and the rest go quiet. Amber fireflies orbit the buildings being worked on.

Hovering a building lifts it 16 units and dims everything not connected to it (opacity 0.2, connected arcs glow ember). The hover card shows name, one-line summary, status, last push, kind (with its shape icon) and size ("651 files").

## Legend wording (plain, always on screen)

- Row 1: Running, Needs a look, Broken, Resting, Connected, Copied code.
- Row 2: the five shape icons named "Full app", "Website", "Server or bot", "Tool", "Kit", then "Taller = more code", "Strong color = touched lately", "Crew worked here".
- Hide row 2 on phones; the hover card carries the same facts.
- Draw the shape icons as tiny 14 px SVGs: two stacked rectangles, one wide rectangle, a cylinder, a hexagon, a triangle.

## Do not

- Do not encode the same fact twice (height already means size, so do not also color by size).
- Do not let old items vanish. Fading below about 40% strength makes them unreadable.
- Do not paint names on faces. Use flat tags (see `steerable-3d-scene`).
- Do not add shapes for languages or frameworks on top of the five kinds. Zach wanted it "more interesting, not overwhelming".
