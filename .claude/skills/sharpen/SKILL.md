---
name: sharpen
description: Turns Zach's vague words into exact terms he picks from, then hands Claude a precise brief. Use when a request for a look, motion, screen, 3D scene or system structure leans on feel words or placeholders ("make it pop", "a swirl thing", "kind of dramatic", "clean and modern", "something like that"), and when Zach says "/sharpen", "sharpen this", "what's the word for" or "I can't describe it". Also runs a guided skill workbench on "sharpen my skill" or "work on my skills". Do not use for requests that are already specific, bug fixes or quick questions, or for tightening prose (use no-ai-slop).
---

# Sharpen

Zach knows what he wants when he sees it, but often not the word for it. Sharpen finds the blurry parts of a request, shows him a few exact options for each, lets him pick, and turns his picks into a brief that any skill or Claude Code can build from. He should never have to learn the vocabulary first. He learns it by picking.

Two modes:
- **Sharpen a request** (most of the time). Steps below.
- **Skill workbench.** Zach says "sharpen my <skill> skill", "work on my skills" or "skill workbench", or Canopy, Crucible or the router points at a skill that never fires or does not help. Follow the guided walkthrough in `references/sharpen-a-skill.md`.

## When to step in
Step in when the request is about how something looks, moves, is laid out, behaves, or is structured, and at least one phrase would make two good builders produce clearly different things. Typical signs:
- Feel words: pop, clean, modern, smooth, dramatic, sleek, alive, premium, playful, heavy, floaty.
- Placeholders: "a swirl thing", "that effect where", "something like", "kind of", "sort of".
- Borrowed descriptions: "like Apple's site", "like a video game menu".
- Structure words with many meanings: "dashboard", "flow", "pipeline", "agent setup", "backend".

Stay out when:
- The request is already specific, or the project's house rules or glossary already settle the phrase (see "Use what is already decided").
- It is a quick question, a bug fix, or plain writing.
- Zach says "just build it" or "you decide". Then make the picks yourself, mark each one "Claude's pick" in the brief, and keep going.

Never sharpen more than 4 phrases in one pass. Pick the 4 that would change the result the most. Leave the rest to the creative freedom dial.

**Keep it to 2 rounds.** Round 1 is the options for every phrase at once. Round 2 is the brief, which also carries the "go deeper" offer and the creative freedom dial. Zach should reach a buildable brief after two replies. Going deeper is the only thing that adds a round, and only when he asks for it.

## Use what is already decided
Before asking anything, look for decisions Zach already made, in this order:
1. **The project's house rules.** A `SHARPEN.md` file at the root of the project repo. Format: `references/house-rules.md`.
2. **His glossary.** `sharpen/glossary.md` in the ZbienVC/atelier repo, plus the Glossary section of the project's `SHARPEN.md`. Format: `references/glossary.md`.
3. **His taste notes.** Call `canopy_taste` (action get) when the Canopy connector is there. Never offer anything on the never list. Lean toward his loves.

If a phrase is settled by any of these, use the settled term and do not ask. Mention it in the brief as "from your house rules" or "from your glossary".

Files you cannot reach (for example in a claude.ai chat with no repo attached) are skipped quietly. Say once, in the brief, which sources you could not read.

## Step 1: Find the blurry phrases
Quote each phrase exactly as Zach wrote it. For each, decide which family it belongs to, using the "Vague word map" in `references/library.md`. The families are the library's headings: Entrances and exits, Timing, Scroll and transitions, Screens and layout, Surface and depth, Interaction, 3D scenes, and Structure and architecture.

Splitting rules:
- A blend like "smooth but kind of dramatic" stays one phrase. The options should each be a different way to blend the two feelings.
- Two phrases that open the same family and mean nearly the same thing ("cleaner" and "more modern") become one phrase. Quote both.
- Never offer the same option under two phrases.

## Step 2: Offer options
For each phrase, give **3 regular options plus 1 wildcard**, taken from `references/library.md`:
- **Regular options** are the most likely meanings, ordered from closest to Zach's words to most distinct. Make them truly different from each other, not three shades of one idea.
- **The wildcard** comes from outside his usual world: film, physics, nature, print, game design, architecture, music, and the like. Label it "You may not know this one: <field>". The wildcard may come from his taste "avoid" list once in a while, so his taste keeps growing. Never from the never list.
- **Each option** shows: a plain name (2 to 4 words), the exact term in `code` style, and one short line on how it feels. Add "Breaks a house rule" when it clashes with `SHARPEN.md`.

How to show them:
- **Multiple-choice tool available** (AskUserQuestion in Claude Code, or an option-card tool in chat): one question per phrase, all phrases in one round (up to 4). Put the closest option first. The tool adds "Other" by itself.
- **Inline visual tool available, and a phrase is about motion or look:** you may also draw one small looping sample per option, so he can see the difference. Keep samples tiny and side by side.
- **Neither:** a short numbered list per phrase (1a, 1b, 1c, 1d) and ask him to reply like "1b 2d 3a".

Under the options, in one line, offer the ways out: "None of these, show 4 more" and "You decide". Add "Sketch it" only when the tldraw connector is there.

## Step 3: Go deeper (only when he asks)
In the brief, offer to go deeper on the one pick that will most shape the result. If he says yes, there are up to 3 levels:
1. **Style family** (the pick he already made).
2. **Variant**: 3 or 4 named versions of that pick, plus a wildcard when one fits. Use the library's "Variants" tables. When the library has none for that pick, write 3 variants yourself that differ in one clear way (speed, density, scale, strictness), and mark them "new, not in the library yet".
3. **Fine-tune**: 2 or 3 settings with plain names, a default and a range (for example turns 1 to 6, duration 0.8s to 2.4s). Respect limits from the house rules.

Never go past level 3.

## Step 4: Check house rules
Compare every pick with the project's `SHARPEN.md`. If a pick breaks a rule, say which rule in one line and offer two choices: "Keep it, just this once" (logged as an exception) or "Pick again". Never change a house rule without his yes.

## Step 5: Write the brief
Show the brief before any building starts, and wait for his "go" (or edits). Use this shape:

```
## Sharpened brief: <short name>

| You said | Exact term | Source |
|---|---|---|
| "sucked into a swirl thing" | spiral tween · comet trail · 3.5 turns · 1.8s | your pick (level 3) |
| "shoot out" | overshoot easing (back-out) | your pick |
| "the next section" | pinned section, scroll-scrubbed | house rules |

**Build:** <2 to 4 sentences, written as the instruction Claude Code will follow, using the exact terms.>
**Rules attached:** <the guardrails from the library for each pick, plus any house rules that apply.>
**Exceptions:** <any "just this once" picks, or "none".>
**Creative freedom:** Exactly this | Clean it up | Run with it   (default: Clean it up)
**New words for your glossary:** <terms he picked today>
**Go deeper?** <the one pick worth tuning, and what its variants would be, in one line>
**Not checked:** <only sources that exist but could not be reached, for example "your glossary (Atelier repo not open here)". Leave this line out when nothing was missed. A project with no SHARPEN.md yet is not "not checked"; say "No house rules yet" instead.>
```

Creative freedom meanings:
- **Exactly this:** build only what the brief says. No extra effects.
- **Clean it up:** keep the intent. Small polish is fine (timing, spacing, depth). Name any addition.
- **Run with it:** treat the brief as a starting point. Add ideas freely, and list each one so he can veto it.

When he approves, hand the brief to the skill doing the work (Atelier for visual work, steerable-3d-scene for 3D controls, and so on) or use it as the instructions for Claude Code.

## Step 6: Save what was learned
- **Claude Code with the project repo open:** add new picks to the Glossary section of the project's `SHARPEN.md`. If the file does not exist, create it with only the Glossary section and say so in one line. Never write house rules into it without his yes. If the ZbienVC/atelier repo is also open, add them to `sharpen/glossary.md` there too. Add any new house rule only after he says yes.
- **claude.ai with no repo:** keep the "New words for your glossary" line in the brief. They get copied into the repo the next time Sharpen runs in Claude Code on that project.
- **Recipes:** if he says "save this as a recipe" or loves a combination, add it to the Recipes section of `SHARPEN.md` with a short name he picks (offer 3 names).

## Receipt
End the reply where the brief was approved with one line:
`Skills used: Sharpen (<n> phrases sharpened, <n> went deeper, <n> new glossary words)`
If the Canopy connector is there, also call `canopy_log_use` with skill "sharpen", what it did, and whether it changed the result.

## Writing rules
- Ninth grade reading level. When you use an exact term, its plain name sits right next to it.
- Never use em dashes.
- Keep options short enough to read on a phone. No paragraphs inside options.
