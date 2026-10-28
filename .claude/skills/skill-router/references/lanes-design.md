# Design and visual lanes

Read for anything Zach will look at: pages, apps, dashboards, 3D, images, video, print, generative art, Figma, design checks.

**Every design lane starts and ends with `design-taste`:** read the taste lists before, ask for a quick rating after.

**A. "I don't know exactly what I want yet."**
- `sharpen` (turns feel words into exact picks), then `crucible-studio` (three directions tuned to Zach's taste).
- In Claude Code with Atelier: Atelier's "show me directions" path.
- End with Zach picking a direction. Do not build first.
- References: the Mobbin connector (real app screens and flows).

**B. Build a web page, site, web app or tool UI.**
- Lead: `atelier` (identity, layout, anti-slop rules, Stranger test).
- With it: `atelier-fx` (motion, 3D, effects) for React or Next.js apps that need movement.
- With it: `artifact-design` (page rules) when the output is an artifact.
- Fallback when Atelier is missing: `frontend-design` (distinctive layout and type).
- Parked: 21st (ready-made components).

**C. Dashboard, status page, inbox, crew or ops screen.**
- Lead: `command-center-screens` (answer first, act fast). With it: `dataviz` (chart rules) for any chart.
- Ask: does it need to be a Dashboard artifact? If the numbers must be traceable, yes.

**D. Anything 3D.**
- What shapes and colors mean: `data-city-map`.
- How people steer it: `steerable-3d-scene` (drag, pinch, touch).
- Quick preview in chat: the Three.js 3D Viewer connector.
- Web games (Three.js, React Three Fiber, Colyseus): `steerable-3d-scene`, plus the web game skill once scouting finds one.

**E. Mobile app screens.**
- Parked: Appllama (native app screens). Until switched on: `atelier` with the Mobbin connector for real-app references.

**F. Images, icons, logos, hero art, product shots.**
- Simple shapes and backgrounds: plain CSS or SVG.
- Art as PNG or PDF: `canvas-design`.
- Parked: Blueprint Studio (on-brand image sets), AITOPIA (image generation).

**G. Video, voice, music.**
- Code-drawn animated film with a synced soundtrack: `animation-studio`.
- Zach's TikTok pipeline: the Hookline connector.
- HTML video projects: the HyperFrames connector.
- Voiceover and speech: the ElevenLabs connector.
- Parked: AITOPIA, Abracadabrax, ManyMotions (AI footage, music, presenters); Adobe (cutting footage).

**H. Static print and art pieces.**
- Poster, flyer, one-pager to edit: the Design artifact type.
- Art as a PNG or PDF: `canvas-design`.

**I. Generative art.**
- Quick interactive sketch: `algorithmic-art`.
- Long-form or on-chain drop with seeds and traits: `genart:genart`.
- Style references: Specimen Atlas.

**J. Figma.** When a Figma file or figma.com link is involved, the matching `figma:` skill is required before its tool.

**K. Check a design before shipping.** Use all that apply: `design:design-critique` (hierarchy, usability), `design:accessibility-review` (contrast, keyboard), `design:ux-copy` (buttons, errors, empty states). Strangers' first impression: Crucible's outside view.
