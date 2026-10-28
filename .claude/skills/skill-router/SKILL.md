---
name: skill-router
description: Finds the right skills, plugins and connectors for a build, design, research, writing or ops task from a fixed lane table, uses every one that adds value, suggests more as the work changes direction, and ends with a one-line receipt. Use when a task is bigger than a quick answer or several skills could fit, for example "make this look amazing", "use the best tools for this", "which skill should I use" or "what do I have for 3D". Not for quick questions, or when Zach already named the skill to use.
---

# Skill Router

Zach has hundreds of skills plus a stack of connectors and repos. He does not want to remember them. This skill makes sure the right ones get used every time they can make the work better, and teaches him what each one is good for along the way.

## The rules

1. **If a skill adds value, use it.** Zach's standing rule: whenever a skill, connector or repo could improve the result or speed up the work, use it. Do not hold back to save effort. The only reason to leave a fitting skill out is that another skill already covers the same job better, or it would change nothing.
2. **Look up, do not guess.** Find the task's lane in the tables below and use its skills. When no lane fits, read skill descriptions (Canopy's `canopy_find` helps) and say so in the receipt.
3. **A skill that needs a connector only counts if the connector is live.** If its tools are not in this session, use the fallback in the same row.
4. **Parked packs ask first.** Some packs are switched off on purpose (list below). When a job matches one, say which pack and why in one line, and ask "switch it on?" Never pretend a parked skill ran.
5. **Teach as you go.** Every time you name a skill, add 6 to 10 plain words on what it is good for.

Tie-breaks when two skills do the same job: Zach's own skills, then a skill backed by a connected tool, then a partner plugin, then a generic built-in.

## Before starting
1. **Vague request?** If it leans on feel words or placeholders ("make it pop", "a swirl thing", "kind of dramatic"), run `sharpen` first and route from its brief.
2. **Know the project.** If the work belongs to one of Zach's projects, recall what you know about it and its plans (memory, the project's `SHARPEN.md`, Switchyard). Plans count: "another game someday" is a reason to mention a game skill.
3. **Say the plan in one line** before the first tool call: "Design lane B: sharpen first, then atelier (look and layout), atelier-fx (motion), dataviz (chart colors)."

## During the work: check in when the work turns
Check quietly when the work changes direction, for example design to code, building to deploying, building to writing copy, one screen to a new feature, or code to a review. At each turn:
- Look up the new lane. If it brings skills not already in use, suggest them: at most 2 at a time, each with one line on what it adds.
- Use the obvious ones without asking (for example `engineering:code-review` before a merge). Ask only when a skill would change the plan or a parked pack is involved.
- If nothing new fits, say nothing.

## After finishing: the receipt
End every reply that used a skill with one line:

> Skills used: atelier (picked the look and type), dataviz (chart colors). Skipped: frontend-design (atelier covers it). Parked but would help: sales (lead routing for Herd).

If a skill was loaded but changed nothing, say that too. When the Canopy connector is in the session, also send the receipt to `canopy_log_use` (one row per skill: name, what it did, `changed: false` when it changed nothing). In Claude Code, a hook logs uses automatically, so only the line is needed.

---

## Parked packs (switched off on purpose)
| Pack | Switch on for |
|---|---|
| Sales | Herd work: lead routing, outreach, deal reviews |
| Content intelligence (Adology) | Hookline and GrowthOS research on hooks, creators, audiences |
| Adobe for creativity | Photo batch edits and resizing for Reflect Medical marketing |
| Legal | Contracts, the Reflect sale, operating agreements |
| AITOPIA | Hookline video, tested against what Hookline already makes |
| Atria, AdMakeAI | Ad research and Meta ads for GrowthOS clients |
| Customer support | Support desks once an app has users |
| Blueprint Studio | Brand image sets for Reflect or GrowthOS clients |
| Appllama | Zach's first phone app |
| 21st | Fast screen prototypes from ready-made parts |
| Abracadabrax, ManyMotions | AI video, music and presenter videos for Hookline |

Removed for good: Zoom, Unity, Productivity.

## Lane table: design and visual work

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

## Lane table: everything else

| Job | Use | Not this one |
|---|---|---|
| Big unclear request | `intake` first (short setup questions), then route | |
| Can't describe what I want | `sharpen` (picks instead of words) | |
| Sharpen or fix one of my skills | `sharpen`, skill mode (guided workbench) | |
| Which skills or packs should be on | Canopy (`canopy_overview`, `canopy_usage`) | |
| Edit Zach's own writing | `no-ai-slop` (keeps his voice) | `humanizer` is for text with no personal voice |
| Competitor research for a product | `product-management:competitive-brief` | `marketing:competitive-brief` is for messaging |
| Make sense of interview or survey notes | `product-management:synthesize-research` | `design:research-synthesis` only inside a design project |
| Spec or plan a feature | `product-management:write-spec` (clear requirements) | |
| Score or rank leads | Parked: Sales. Ask to switch on for Herd. | `small-business:lead-triage` needs HubSpot |
| Cold email or follow-up | `small-business:outreach-composer` (drafts outreach) | |
| Numbers question on a dataset | `data:analyze` (answers from the data) | |
| Reconcile, close the month, journal entries | `finance:reconciliation`, `finance:close-management`, `finance:journal-entry` | |
| Bills to pay, invoices to chase | `small-business:ap-processor`, `small-business:invoice-chase` | |
| Process docs, vendor reviews, runbooks | `operations:process-doc`, `operations:vendor-review`, `operations:runbook` | |
| Find something across email, docs and chat | `enterprise-search:search` (one search, all sources) | |
| Code review before merge | `engineering:code-review` (catches bugs before shipping) | |
| Something broke | `engineering:debug` (finds the cause) | |
| Architecture or system design | `engineering:system-design` (structure and tradeoffs) | |
| Build or change an app, API, login or deploy | `build-standards` (asks the safety level once per project) | |
| Pick the model and effort for a big job | `model-router` (cheapest model that keeps quality) | |
| Is this idea worth building | Crucible `crucible_reality_check` (Build, Reshape or Skip) | |
| Plan a decision together | `grill-me` (rounds of questions with recommendations) | `intake` is for quick setup questions |
| Chat is long or moving to Claude Code | `handoff` | |
| Lost my place, wrap up, resume | `save-point` | |
| What is unfinished | `loose-ends` | |
| Social posts on a schedule | `postiz:postiz` (posts to 28 platforms) | |

## When nothing fits
Say "No lane fits this." Pick the skills that clearly add value by reading their descriptions, name them in the receipt, and suggest a new row for this table so next time is not a guess.

## Writing rules
Ninth grade reading level. Never use em dashes.
