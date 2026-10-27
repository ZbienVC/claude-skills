# Sharpen library (starter)

The options Sharpen offers. Each family has regular options and wildcards (marked with the field they come from). The "Rules attached" column is copied into the brief whenever that option is picked.

This is a starter set. It grows in Specimen Atlas and through Crucible scouting, and only with Zach's approval. When the Atlas has a matching entry, prefer the Atlas version and link it.

## Vague word map
Which family to open for common blurry words. One word can open two families; pick the one the rest of the sentence points to.

Every term in the right column (separated by semicolons) has a row below.

| Zach says | Open this family | Usually means one of |
|---|---|---|
| pop, stand out, eye-catching | Surface and depth; Entrances and exits | pop in; glowing edge; stacked depth; one accent color |
| smooth, buttery, fluid | Timing | smooth glide; smooth spring |
| snappy, quick, crisp | Timing | quick and crisp; starts fast, settles |
| dramatic, epic, cinematic | Timing; Scroll and transitions | wind-up; slow, then rush; hold, then release; dolly zoom |
| bouncy, playful, fun | Timing; Interaction | bouncy; squash and stretch; game juice |
| floaty, dreamy, soft | Timing; Surface and depth | drift; blur to sharp; frosted glass |
| heavy, weighty, solid | Timing; 3D scenes | heavy landing; real bumping and falling |
| clean, minimal, simple | Screens and layout; Surface and depth | strict grid; one accent color; fewer things on screen |
| modern, sleek, premium | Surface and depth; Screens and layout | stacked depth; clear type scale; mixed-size tiles |
| overwhelming, cluttered, busy, too much | Screens and layout | fewer things on screen; clear hierarchy; grouped sections; filter and narrow; what needs me |
| alive, dynamic, moving | Entrances and exits; 3D scenes | drift; floating dots; moves with the scrollbar |
| swirl, spin, vortex | Entrances and exits | spiral down; drain away; tornado twist |
| explode, burst, shoot out | Entrances and exits; Timing | burst apart; slingshot; stream out |
| flows into, leads to, next section | Scroll and transitions | hold, then release; words ride along; fade between |
| dashboard, overview, home | Screens and layout | what needs me; numbers at a glance; mixed-size tiles |
| flow, steps, process (screens) | Screens and layout | step by step; show more on demand |
| flow, pipeline, system (backend) | Structure and architecture | run later, not now; things react to events; clear states and moves |
| agents, crew, work together | Structure and architecture | one boss, many helpers; send to the right specialist; pause for my yes |
| step on each other, collide, overlap, conflicts | Structure and architecture | claim before you work; one workspace each; shared handoff board; clear owners |
| 3D, depth, real | 3D scenes | spin it around; camera follows the scroll; real bumping and falling; real materials |

## Entrances and exits

| Plain name | Exact term | Feel | Rules attached |
|---|---|---|---|
| Fade up | `opacity + translateY fade-in` | Calm, safe default | Under 400ms for UI pieces |
| One after another | `staggered reveal` | Organized, rhythmic | 30 to 80ms between items |
| Letters arrive one by one | `split-text stagger` | Editorial, intentional | Keep the real text in the page for screen readers |
| Wipe in | `clip-path mask reveal` | Crisp, graphic | Animate the mask, not the layout |
| Pop in | `scale-in with overshoot (back-out)` | Lively, confident | Small scale change (0.9 to 1) |
| Blur to sharp | `blur-in (filter: blur to 0)` | Dreamy, focus pull | Avoid on large areas; costly on phones |
| Spiral down | `spiral tween (polar path)` | Hypnotic, pulled in | Calm mode: fade in place |
| Drain away | `radial collapse + rotation` | Like water circling a drain | Calm mode: fade out |
| Tornado twist | `helix path (3D perspective)` | Winding, powerful | Calm mode: fade in place |
| Slingshot | `overshoot launch (back-out easing)` | Pulls back, launches, settles | Overshoot under 10% |
| Stream out | `staggered emit along a path` | A ribbon of letters | Under 1.5s total |
| Drift | `ambient drift (slow noise-based motion)` | Alive, never still | Very slow; off in calm mode |
| Fall into a hole | `gravity well (scale-to-zero + stretch)` | Dramatic, final | Calm mode: fade out |
| Burst apart | `particle burst (radial scatter)` | Explosive, celebratory | Cap particle count on phones |
| Scramble into place | `text scramble / decode effect` | Techy, hacker | Real text must end readable within 1s |
| Line draws itself | `SVG stroke draw (stroke-dashoffset)` | Hand-made, precise | Works on outlines only |
| Shape becomes shape | `SVG path morph` | Smooth, magical | Paths need similar point counts |
| Murmuration (wildcard: nature) | `boids flocking (steering behaviors)` | Organic, alive | Under 300 agents on phones |
| Ink bloom (wildcard: physics) | `fluid advection / dye simulation` | Liquid, luxurious | GPU only; image fallback |
| Halftone dissolve (wildcard: print) | `halftone dot dissolve shader` | Printed, retro | Fallback: crossfade |
| Iris wipe (wildcard: film) | `circular clip-path iris` | Old cinema, playful | Keep under 600ms |
| Dither dissolve (wildcard: game design) | `ordered dither dissolve` | Pixel, nostalgic | Fallback: crossfade |

### Variants: Spiral down
| Variant | Exact term | Feel |
|---|---|---|
| Tight coil | `spiral tween, 4 to 6 turns` | Fast, like a drill |
| Lazy orbit | `spiral tween, 1 to 2 turns, long duration` | Calm, drifting |
| Comet trail | `spiral tween + motion trail` | Each letter drags a tail |
| Dust spiral | `glyph-to-particle spiral` | Letters crumble as they fall |

Fine-tune: turns (1 to 6, default 3), duration (0.8s to 2.4s, default 1.6s), trail length (0 to 100%, default 0).

### Variants: One after another
| Variant | Exact term | Feel |
|---|---|---|
| In reading order | `linear stagger` | Neat, predictable |
| From the center out | `stagger from center` | Radiating, focused |
| Random order | `random stagger` | Sparkly, loose |
| As a wave | `stagger with sine offset` | Rolling, musical |

Fine-tune: gap between items (20ms to 120ms, default 50ms), distance moved (0 to 40px, default 16px).

## Timing (easing)

| Plain name | Exact term | Feel | Rules attached |
|---|---|---|---|
| Starts fast, settles | `ease-out (cubic or quint)` | Natural for things arriving | Default for entrances |
| Quick and crisp | `short ease-out (150 to 250ms), no overshoot` | Snappy, efficient | Best for buttons and menus |
| Heavy landing | `ease-in with impact (small screen shake)` | Weighty, solid | Shake under 4px; off in calm mode |
| Starts slow, leaves fast | `ease-in` | Natural for things leaving | Default for exits |
| Smooth glide | `ease-in-out (cubic)` | Soft both ends | Good for moves on screen |
| Slow, then rush | `expo-in` | Tension, then snap | Use once per screen |
| Bouncy | `spring, low damping (overshoot)` | Playful, physical | Avoid on serious data |
| Smooth spring | `spring, high damping` | Natural, no wobble | Good default for drag and drop |
| Wind-up | `anticipation (back-in)` | Leans back before moving | Adds about 100ms |
| Overshoot landing | `back-out` | Lands past and settles | Small overshoot (under 10%) |
| Squash and stretch | `squash and stretch` | Cartoon, alive | Keep volume constant |
| Follow-through | `follow-through and overlapping action` | Parts settle at different times | Offset parts 40 to 80ms |
| Speed ramp (wildcard: film) | `speed ramp / time remap` | Fast, slow motion at the key moment, fast again | Slow part under 1s |
| On twos (wildcard: animation) | `steps() at 12 fps` | Stop-motion, handmade | Not for UI feedback |
| Hit-stop (wildcard: game design) | `hit-stop (brief freeze on impact)` | Punchy, impactful | Freeze 50 to 120ms |

## Scroll and transitions

| Plain name | Exact term | Feel | Rules attached |
|---|---|---|---|
| Layers at different speeds | `parallax` | Depth while scrolling | Under 3 layers; off in calm mode |
| Hold, then release | `pinned section (ScrollTrigger pin)` | Story beat, cinematic | Keep pins short on phones |
| Moves with the scrollbar | `scroll-scrubbed animation` | In control, tactile | Must work scrolling backward |
| Sideways track | `pinned horizontal scroll` | Gallery, showcase | Show a progress hint |
| Clicks into place | `scroll snap (CSS scroll-snap)` | Paged, deliberate | Never trap the user |
| Cards stack up | `sticky stacking cards` | Layered, collecting | 3 to 6 cards |
| Words ride along | `shared-element transition (View Transitions API / FLIP)` | Continuous, connected | Fallback: crossfade |
| Fade between | `crossfade` | Gentle | 200 to 400ms |
| Panel grows into page | `container transform` | Spatial, clear | Same corner radius start to end |
| Dolly zoom (wildcard: film) | `dolly zoom (vertigo effect)` | Unsettling, dramatic | Use once; off in calm mode |
| Page turn (wildcard: print) | `page curl (3D rotateY)` | Bookish, tactile | Fallback: slide |
| Match cut (wildcard: film) | `match cut (shape-matched transition)` | Clever, seamless | Shapes must line up |

## Screens and layout

| Plain name | Exact term | Feel | Rules attached |
|---|---|---|---|
| Mixed-size tiles | `bento grid` | Modern, scannable | Avoid identical tiles in rows |
| Strict grid | `12-column grid with a fixed spacing scale` | Orderly, calm | Every gap comes from the scale |
| One accent color | `single accent + neutral palette` | Clean, focused | Accent only on the main action and alerts |
| Fewer things on screen | `information density reduction (one job per screen)` | Calm, focused | Move rare tools behind a menu, never delete them |
| Clear hierarchy | `visual hierarchy (type scale + weight + size)` | Easy to scan | One biggest thing per screen |
| Clear type scale | `modular type scale (for example 1.25 ratio)` | Refined, consistent | 5 to 7 sizes total |
| Grouped sections | `grouping by proximity + section headers` | Organized | Related things touch; groups are spaced apart |
| Filter and narrow | `faceted filters + saved views` | In control of big data | Show active filters as removable chips |
| Tidy data table | `data table with sticky header, sort and density toggle` | Pro, readable | Numbers right-aligned in tabular figures |
| Two halves | `split screen` | Bold, focused | Stack on phones |
| List plus detail | `master-detail` | Fast to work through | Keep selection visible |
| Side settings panel | `inspector panel` | Pro tool | Collapsible |
| Search everything | `command palette (cmdk)` | Power user | Shortcut shown in UI |
| Step by step | `guided stepper (wizard)` | Calm, goal-first | Show progress and next step |
| Show more on demand | `progressive disclosure` | Uncluttered | Never hide the main action |
| What needs me | `ranked needs-attention list` | Clear priorities | One button per row |
| Numbers at a glance | `KPI strip (instrument strip)` | Command center | 3 to 5 numbers, not cards |
| Waiting placeholders | `skeleton loading` | Smooth wait | Match the real layout |
| Nothing here yet | `designed empty state` | Helpful | Say how to add the first item |
| Board of columns | `kanban board` | Work in stages | Drag with keyboard too |
| Zoom around a big space (wildcard: maps) | `zoomable UI (ZUI, spatial canvas)` | Exploratory | Always a way back to overview |
| Heads-up display (wildcard: game design) | `HUD overlay` | Immersive, live | Keep text large and few |
| Contact sheet (wildcard: photography) | `contact sheet grid` | Compare many at once | Click to enlarge |
| Card catalog (wildcard: libraries) | `index drawer navigation` | Tactile, archival | Search as backup |

## Surface and depth

| Plain name | Exact term | Feel | Rules attached |
|---|---|---|---|
| Stacked depth | `layered elevation (shadow scale)` | Real, premium | 3 to 5 levels, used by role |
| Frosted glass | `glassmorphism (backdrop-filter blur)` | Light, airy | Keep text contrast; costly on phones |
| Pressed and raised | `bevel and inner shadow` | Physical, tactile | Subtle; avoid soft-plastic look |
| Film grain | `noise / grain texture` | Warm, analog | Very low opacity |
| Two-color image | `duotone` | Graphic, bold | Check both themes |
| Soft color clouds | `gradient mesh` | Lush, modern | Avoid the purple-to-blue default |
| Glowing edge | `rim light / outer glow` | Energetic | One glowing thing per view |
| Paper and print (wildcard: print) | `risograph texture with misregistration` | Handmade, zine | Keep text crisp |
| Brushed metal (wildcard: industrial design) | `anisotropic brushed metal` | Engineered, solid | Use on few surfaces |

For full art styles (shaders, ASCII, pixel art, generative patterns), open Specimen Atlas.

## Interaction

| Plain name | Exact term | Feel | Rules attached |
|---|---|---|---|
| Lifts on hover | `hover lift (translate + shadow)` | Responsive | Not the only cue; phones have no hover |
| Pulls toward cursor | `magnetic button` | Playful, premium | Small pull (under 10px) |
| Throw and glide | `inertia / momentum scrolling` | Physical | Respect calm mode |
| Stretchy edges | `rubber banding (overscroll)` | iOS-like, soft | Short return |
| Swipe away | `swipe to dismiss` | Fast triage | Always offer undo |
| Drag a number | `scrubbable number input` | Pro, quick tuning | Typing still allowed |
| Instant result | `optimistic UI` | Fast | Roll back clearly on failure |
| Take it back | `undo toast` | Safe | 5 to 10 seconds |
| Game juice (wildcard: game design) | `juice: screen shake, particles, sound` | Satisfying | Use on wins only; off in calm mode |
| Jog wheel (wildcard: audio hardware) | `rotary dial / jog wheel control` | Precise, tactile | Keyboard fallback |

## 3D scenes

| Plain name | Exact term | Feel | Rules attached |
|---|---|---|---|
| Spin it around | `orbit camera (OrbitControls)` | Explore an object | Pair with steerable-3d-scene |
| Slow showcase spin | `turntable` | Product hero | Pause on interaction |
| Camera follows the scroll | `scroll-driven camera rail (spline path)` | Guided journey | Image fallback on low-end devices |
| Real bumping and falling | `rigid-body physics (Rapier / cannon-es)` | Tactile, fun | Solid things never pass through each other |
| Thousands of copies | `instanced meshes` | Massive, fast | One draw call |
| Floating dots | `GPU particles (points)` | Atmospheric | Cap count on phones |
| Glowing highlights | `bloom (post-processing)` | Cinematic | Low threshold costs speed |
| Blurry background | `depth of field` | Photographic | Keep the subject sharp |
| Real materials | `PBR materials + HDRI lighting` | Realistic | Compress textures |
| Cartoon shading | `toon / cel shading` | Illustrated | Outline pass optional |
| Miniature world (wildcard: photography) | `tilt-shift blur` | Toy-like | Works best from above |
| Diorama (wildcard: model making) | `diorama framing (cutaway box)` | Crafted, contained | Tablecloth or base, never floating |
| God rays (wildcard: film) | `volumetric light shafts` | Epic, holy | GPU heavy; fallback |

Every 3D entry also carries: cap device pixel ratio at 2, pause drawing when off screen, show a still image when WebGL is missing.

## Structure and architecture

| Plain name | Exact term | Feel | Rules attached |
|---|---|---|---|
| One app, neat inside | `modular monolith` | Simple to run | Best default for a solo builder |
| Run later, not now | `job queue + worker` | Reliable background work | Retries with backoff |
| On a schedule | `cron / scheduled job` | Hands-off | Log every run |
| Tell me when it happens | `webhook` | Real-time handoff | Verify signatures |
| Things react to events | `event-driven (pub/sub)` | Loose, scalable | Overkill for small apps |
| Clear states and moves | `state machine` | No impossible states | Draw the diagram first |
| Same request twice is safe | `idempotency keys` | Safe retries | Required for payments |
| Slow down abusers | `rate limiting` | Protective | Per user and per IP |
| Each customer sees only theirs | `row-level security (multi-tenant)` | Safe by default | Test with two accounts |
| Flip features on and off | `feature flags` | Safe launches | Remove old flags |
| Who did what | `audit log` | Trust, compliance | Never editable |
| One boss, many helpers | `orchestrator-workers (agents)` | Splits big jobs | Boss checks every result |
| Send to the right specialist | `router pattern (agents)` | Efficient | Fallback route for unknowns |
| Draft, judge, redo | `evaluator-optimizer loop` | Higher quality | Cap the number of loops |
| Pause for my yes | `human-in-the-loop approval gate` | Safe automation | Nothing ships without the yes |
| Claim before you work | `task claiming with leases (locks that expire)` | No double work | Lease times out if an agent dies |
| One workspace each | `one git branch or worktree per agent` | No overwritten files | Merge through review, never directly |
| Shared handoff board | `blackboard / shared task board` | Everyone sees who has what | One owner per card |
| Clear owners | `ownership map (who may touch which files or systems)` | No turf fights | Checked before every write |
| Kitchen brigade (wildcard: restaurants) | `stations + expediter (orchestrator)` | Fast, clear roles | One expediter only |
| Air traffic control (wildcard: aviation) | `queue + clearance + separation rules` | Calm under load | Explicit hold states |
| Assembly line (wildcard: manufacturing) | `staged pipeline with quality gates` | Steady output | Stop the line on a defect |
| Immune system (wildcard: biology) | `watchdog agents + quarantine` | Self-healing | Humans see every quarantine |

### Variants: One boss, many helpers
| Variant | Exact term | Feel |
|---|---|---|
| Boss plans, helpers build | `planner-executor` | Clear plan up front |
| Boss splits, helpers work in parallel, boss merges | `fan-out / fan-in` | Fast on big jobs |
| Boss plus a checker | `orchestrator + reviewer agent` | Fewer mistakes |
| Kitchen brigade (wildcard: restaurants) | `stations + expediter` | Each helper owns one station |

Fine-tune: helpers at once (1 to 6, default 3), checks per result (0 to 2, default 1), approval needed before (nothing, writes, shipping; default shipping).

## Variants for screens

### Variants: What needs me
| Variant | Exact term | Feel |
|---|---|---|
| Ranked list | `priority-ranked list, one action per row` | Work top to bottom |
| Swipe through | `flick-card decision desk with undo` | Fast triage |
| Grouped by urgency | `now / today / later buckets` | Calm planning |
| Air traffic board (wildcard: aviation) | `departures-board status list` | Live, glanceable |

Fine-tune: rows shown before "show more" (5 to 20, default 8), sort by (urgency, money, age; default urgency).

### Variants: Fewer things on screen
| Variant | Exact term | Feel |
|---|---|---|
| One job per page | `task-focused screens` | Each page answers one question |
| Summary first, detail on click | `overview-then-detail (drill-down)` | Calm top level |
| Hide the rare stuff | `progressive disclosure into menus` | Clean, nothing lost |
| Cockpit (wildcard: aviation) | `primary flight display layout` | Most vital numbers in the center |

## Diagram types (for "draw me how it works")
| Plain name | Exact term |
|---|---|
| Boxes and arrows | `flowchart` |
| Lanes per person or system | `swimlane diagram` |
| Who talks to whom, in order | `sequence diagram` |
| States and moves | `state diagram` |
| Zoom levels of a system | `C4 model (context, container, component)` |
| Tables and links | `entity relationship diagram (ERD)` |
