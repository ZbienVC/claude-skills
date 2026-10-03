---
name: command-center-screens
description: Builds ops and command-center screens that answer first and act fast: a status page with one sentence, three numbers, a ranked needs-attention list with one button per row and a spend pace chart with a forecast; a flick-card decision desk with spring physics and undo; one instrument strip instead of many stat cards; and an agent constellation. Use when building or cleaning up a dashboard, inbox, status or crew page, for example "this page has too many cards", "make the inbox nicer to clear", "the uptime section is useless" or "make the status page more useful". Not for marketing pages, flat charts alone, or 3D camera code (use steerable-3d-scene).
---

# Command-center screens

These patterns come from Zach's Nightshift and Switchyard redesign (October 2026). They were approved after he said the old Crew page had "a lot of cards", the Pulse uptime section was not useful and its charts were "not designed in the most useful way", and the Inbox was "decent" but plain. He kept the flickable accept and decline cards on purpose.

## The test every screen must pass

Within five seconds, a person can answer three questions: **Is anything wrong? What should I do first? Where do I click?** If a section answers none of these, cut it or move it into the side panel.

## Look (Signal box, daylight)

- Light pewter and paper surfaces, white cards with soft shadows.
- One ember accent (#F0642A), spent only on what needs the person. Dark mode is neutral graphite, never navy.
- Archivo for titles in sentence case, Figtree for reading, mono only for small numbers.
- Plain words at a ninth grade level, no em dashes.

## Pattern 1: an answer-first status page (Pulse)

Top to bottom:

1. **Hero band.**
   - One plain sentence ("All 6 sites are up. 2 projects are broken."), plus a reason line that names the cause and the fix.
   - A breathing status orb (a sphere-shaded circle, green, amber or red) on the left.
   - Three numbers on the right: sites up, broken projects, month forecast.
   - A faint gradient of the status color across the band.
2. **Needs attention.** A numbered, ranked list that mixes every kind of problem: broken deploys, failing checks, spend running hot, outages, slow pages, renewals, tests that never run.
   - Each row: rank, lamp, a bold title, one plain reason, and **one** button ("Decide in Inbox" or "Open project").
   - The top two are primary buttons, and broken rows get a faint red wash.
3. **Spend pace** (next to it):
   - The chart shows the running total by day: this month solid, a dashed forecast (today's total plus remaining days at last month's daily rate), last month in gray, and a dashed budget line with the area above it shaded faintly red.
   - Label the end values ("$73?", "Sep $68"), today's dot ("$41 today") and the budget on the left so the labels never collide.
   - Under it, one bar per provider: this month over last month.
4. **Sites:** a grid of tiles. Each has a lamp, name, host, speed in ms (big), a 24-hour speed line with outages shaded red, uptime, visits with a colored change, and a padlock warning under 14 days.
5. **Deploys this week:** 7 day columns, one rounded square per deploy, red with a halo when it failed. Each square opens its project.
6. **Most problems in code:** the top 6 projects as segmented bars (serious, medium, low). Counts only; details stay behind sign-in.

Drop: big uptime tables, stacked monthly bars with no forecast, and bars grouped by zone that nobody acts on.

## Pattern 2: the decision desk (Inbox)

- **Cards with weight.**
  - The top three cards are a real stack (offsets y 22/11/0 px, slight rotations, scale .92/.96/1).
  - Each settles on a spring: velocity += (target - position) × .0012 × dt, damped by .86^(dt/16).
  - Throw right to accept and left to decline: the throw counts past 100 px or a speed of 0.8 px per ms.
  - Accept and Decline stamps fade in as the card leans.
- **The top card is alive.** It tilts toward the pointer (rotateX and rotateY up to about 7 and 9 degrees, inside a `perspective(1000px)` tray) and catches a soft white sheen at the pointer (a radial gradient blended with soft-light). While dragging it leans into the throw.
- **Each kind has a color** on a 5 px top edge and an icon tile: fix red (wrench), merge green (merge), idea purple (bulb), approval ember (check), question amber (question mark).
- **Big round buttons** under the stack: Decline (an X in a red outline), Later (a smaller clock), Accept (a filled green gradient check). Keys D, L and A; J and K move through the list.
- **Undo on every decision** from the toast. Piles count accepted, declined and later.
- **A "While you were away" band** with a soft gradient from ember to blue. It shows a progress ring that fills as today's cards get decided, a one-line overnight summary, and a midnight-to-7 AM timeline of runs as colored dots with tooltips.
- **The queue beside the desk** is grouped (Fixes, Ready to merge, Approvals and questions, Ideas), with an icon tile per row. Keep the list order equal to the reading order so J and K feel right.

## Pattern 3: one instrument strip, not a wall of cards (Crew)

- Replace separate stat cards with **one card split into four instruments** by thin dividers.
- Each instrument has a half-circle gauge, a big number, a bold label and a one-line meaning. Needles swing in on a spring, one after another, 90 ms apart.
- Next to the strip goes a **3D constellation** (built with `steerable-3d-scene`):
  - The Inbox is an ember well in the center with a glow.
  - Agents are glossy orbs on pedestals in a ring around it: working agents amber and glowing, watching teal, idle gray, off faint.
  - Projects are blocks on an outer ring.
  - Arched amber beams run from working agents to their project. Thinner ember beams run from agents with cards into the well. A glow sprite travels along each beam.
  - It spins slowly on its own (0.07 radians per second) until touched.
- Beside it goes a **grouped roster**: Working (rows with the plan step "Step 2 of 4" and a progress bar), Standing by (two-column chips), Off. Pointing at a roster row highlights that orb.

## Shared rules

- Any thing (project, agent, card, site) opens in **one** side panel with the same layout. The panel starts closed.
- The hero's sentence and the ranked list are built from the same data, so they never disagree.
- Reduced motion: no springs, swings, sheen or auto spin; cards snap into place.
- Phone: everything is one column, the desk comes before the queue, and the 3D view drops to about 430 px tall.
- Before showing anyone, check screenshots in light, dark and at 390 px width.
