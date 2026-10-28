---
name: skill-router
description: Finds and uses every skill, plugin and connector that fits a task without Zach naming them, checks again when the work changes direction, and ends with a one-line receipt of what each one changed. Use when a task is bigger than a quick answer, when a new workflow starts or an old one changes, or when Zach asks "which skill should I use", "use the best tools for this" or "what do I have for 3D". Not for quick questions, or when Zach already named the skill to use.
---

# Skill Router

Zach has hundreds of skills plus connectors and repos. He does not want to remember them. Claude already sees every installed skill's name and description, so the job here is not a lookup table. It is a habit: pick on purpose, use what helps, and show proof.

## The rules

1. **If a skill adds value, use it.** Whenever a skill, connector or repo could improve the result or speed up the work, use it. Leave a fitting skill out only when another one covers the same job better, or it would change nothing.
2. **Pick from what is in front of you.** Read the skill names and descriptions this session already lists and pick every one that fits. When nothing clearly fits, search Canopy with `canopy_find`. When a skill you need is not installed here (for example Atelier in a chat), read it with `canopy_get` and follow it.
3. **Ties go to Zach's own skills,** then a skill backed by a connected tool, then a partner plugin, then a generic built-in.
4. **A skill that needs a connector only counts if the connector is live.** If its tools are not in this session, say so and use the next best skill.
5. **Parked packs ask first.** Some packs are switched off on purpose (`references/parked.md`). When a job matches one, say which pack and why in one line and ask "switch it on?" Never pretend a parked skill ran.
6. **Teach as you go.** Every time you name a skill, add 6 to 10 plain words on what it is good for.

## Zach's house picks (his standing rules, always on)
- Feel words or a vague ask ("make it pop"): `sharpen` first.
- Anything he will look at: `design-taste` before and after, `atelier` to build it.
- A new idea bigger than an afternoon: Crucible reality check, then `grill-me`, before any building.
- Any big proposal: a case against from a reviewer that did not write it, one real alternative, and 3 expert questions.
- A job that matches a recipe in `references/recipes.md` (ship a feature, start a product idea, fix a live app): follow the recipe.

## Before, during, after
- **Before:** say the plan in one line before the first tool call: "Using sharpen, then atelier (look and layout) and dataviz (chart colors)."
- **During:** when the work turns (design to code, building to deploying, code to review), check again. Suggest at most 2 new skills, one line each. Use the obvious ones without asking.
- **Skip what keeps failing:** if `canopy_usage` shows a skill "changed nothing" twice on this kind of task, skip it and say so. Zach can say "bring it back" anytime.
- **After:** end every reply that used a skill with one line:

> Skills used: atelier (picked the look and type), dataviz (chart colors). Skipped: frontend-design (atelier covers it). Parked but would help: sales (lead routing for Herd).

Say when a skill loaded but changed nothing. When Canopy is in the session, send the receipt to `canopy_log_use` (one row per skill: name, what it did, `changed: false` when it changed nothing). In Claude Code with the zach-kit plugin, a hook logs uses automatically, so only the line is needed.
