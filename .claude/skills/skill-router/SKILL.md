---
name: skill-router
description: Finds the right skills, plugins and connectors for a build, design, research, writing or ops task from a fixed lane table, uses every one that adds value, suggests more as the work changes direction, and ends with a one-line receipt. Use when a task is bigger than a quick answer or several skills could fit, for example "make this look amazing", "use the best tools for this", "which skill should I use" or "what do I have for 3D". Not for quick questions, or when Zach already named the skill to use.
---

# Skill Router

Zach has hundreds of skills plus a stack of connectors and repos. He does not want to remember them. This skill makes sure the right ones get used every time they can make the work better, and teaches him what each one is good for along the way.

## The rules

1. **If a skill adds value, use it.** Zach's standing rule: whenever a skill, connector or repo could improve the result or speed up the work, use it. Do not hold back to save effort. The only reason to leave a fitting skill out is that another skill already covers the same job better, or it would change nothing.
2. **Look up, do not guess.** Find the task's lane in the lookup tables (listed below) and use its skills. When no lane fits, read skill descriptions (Canopy's `canopy_find` helps) and say so in the receipt.
3. **A skill that needs a connector only counts if the connector is live.** If its tools are not in this session, use the fallback in the same row.
4. **Parked packs ask first.** Some packs are switched off on purpose (see `references/parked.md`). When a job matches one, say which pack and why in one line, and ask "switch it on?" Never pretend a parked skill ran.
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

## Recipes come first
If the job matches a recipe in `references/recipes.md`, follow it step by step: shipping a feature in one of Zach's apps, starting a new product idea, or something broken in a live app. Recipes have a short "small run" for jobs of about an hour or less.

## The lookup tables (read only the one you need)
- `references/lanes-design.md`: anything Zach will look at (pages, apps, dashboards, 3D, images, video, print, art, Figma, design checks).
- `references/lanes-other.md`: writing, research, planning, finance and ops, engineering, workflows.
- `references/parked.md`: when a job might match a pack that is switched off on purpose.
- `references/recipes.md`: step-by-step skill plans for the 3 recipes above.

Open one file, find the lane, and stop reading. Do not load them all for one task.

## Safety valve
Receipts are evidence. Before using a skill, check Canopy (`canopy_usage`) when it is in the session: if that skill was logged as "changed nothing" twice on the same kind of task, skip it for this task type and say so in the receipt ("Skipped: X, changed nothing the last 2 times on this kind of task"). Zach can say "bring it back" anytime.

## Keeping the tables fresh
Once a week (during Crucible's scouting run or when Zach asks), propose table changes as one short before-and-after batch: new skills worth adding, skills to drop because receipts show they change nothing, and lanes that keep getting "No lane fits". Change nothing without his yes.

## When nothing fits
Say "No lane fits this." Pick the skills that clearly add value by reading their descriptions, name them in the receipt, and suggest a new row for this table so next time is not a guess.

## Writing rules
Ninth grade reading level. Never use em dashes.
