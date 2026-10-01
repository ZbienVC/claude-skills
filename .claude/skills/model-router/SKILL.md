---
name: model-router
description: Routes each piece of work to the cheapest model and effort level that keeps top quality (Haiku, Sonnet, Opus, Fable; low to max). Use when planning multi-step work, before spawning subagents or Crucible runs, or when Zach asks "which model should I use", "is high effort worth it", or "save tokens on this". Do not use for handing work to a new chat or Claude Code; use handoff.
---

# Model router

Goal: the same or better quality for fewer tokens (tokens are the chunks of text Claude reads and writes, and what usage is billed by). Quality wins every tie. If you are not sure a cheaper setup can do a piece well, use the stronger one.

## Rule one: keep the thinking on Opus, push the doing down
- The main thread (talking to Zach, judgment calls, planning, final review) stays on Opus 5.5.
- Hand off to a subagent (a helper Claude that works in its own separate conversation and sends back a summary) only pieces that are **clear** and **checkable**. Checkable means you can prove the result is right: tests pass, numbers tie out, the file exists, the list matches the source.
- Downshift only the kinds of work listed in the "Good for" column below. If a piece is not on the list, it stays on Opus.
- Cheap models fail on vague prompts much more than on hard ones. A tight work order is what makes downshifting safe.

## Tier table
Prices are per million tokens, input / output. Checked against Anthropic's docs in October 2026. If a new model ships, re-check before trusting this table.

| Model | Good for | Keep it away from |
|---|---|---|
| **Haiku 4.5** ($1 / $5, fastest, 200K context window (how much text it can hold at once), knowledge stops Feb 2025, no effort setting) | Finding files or text, pulling fields out of a doc, reformatting, labeling a list by a fixed rule, summarizing one document for internal use, bulk edits that follow an exact pattern | Judgment, design, current facts without search, money logic, security, anything a customer sees |
| **Sonnet 5.5** ($2 / $10) | Building a feature from a clear plan, writing tests, fixing a bug whose cause is known, research sweeps, cleanup scripts, internal drafts that Opus will polish. Run Sonnet builders at high effort | Ambiguous problems, architecture, hunting an unknown bug in messy code, final writing |
| **Opus 5.5** ($4 / $20) | Planning, architecture, unknown bugs, product and design calls, money and billing logic, auth, data migrations, anything a customer will see, reviewing other agents' work | Bulk mechanical work Haiku can do |
| **Fable 5.1** ($10 / $50, can bill extra usage credits on some plans) | Long solo runs, root-cause hunts across a big system, problems where Opus at xhigh already fell short | Anything Opus handles. Never the default |

## Effort levels
Effort is how hard the model thinks before answering. More effort means more tokens. Opus 5.5 ships at **medium** on purpose: in Anthropic's testing, Opus 5.5 at medium matched or beat Opus 5 at high on coding and knowledge work. Start at medium and move up for a reason.

- **low**: quick back and forth that Zach checks each time. Brainstorms, renames, tiny edits.
- **medium**: the default. Clear-scope work, building a planned feature, normal questions.
- **high**: correctness really matters or edge cases are likely. Bugs in existing code, billing or commission math, migrations, auth, anything shipping to users.
- **xhigh**: a hard problem that already failed at high.
- **max**: almost never. Anthropic warns it can overthink. Only for security hunts or a problem Zach wants solved without him.
- One turn only: in Claude Code, putting the word `ultrathink` in a prompt asks for deeper thinking on that turn without changing the session setting.

Escalation ladder for a stuck problem: Opus medium, then high, then xhigh, then Fable. Do not skip rungs.

## Hidden costs to avoid
- **Switching mid-task breaks the cache.** The prompt cache is a saved copy of the conversation that makes each new message cheap. Changing the model or effort mid-session throws it away, so the next message costs full price. Change settings only at task boundaries (when one job ends and the next starts), never in the middle of one.
- **Explore runs on the main model.** In Claude Code, the built-in Explore search agent uses whatever model the main chat uses (it ran on Haiku before Claude Code v2.1.198). On Opus, every file search is an Opus search. The agent pack's Explore override puts it back on Haiku. If its searches start missing things, delete the override.
- **Subagents are not free.** Each one loads its own copy of CLAUDE.md (the project's standing instructions file) and setup. Do not spawn one for a two-file lookup. Spawn one when the work would flood the main chat with output nobody will reread: logs, big searches, test runs.

## How to route a task
Do this quietly. Show only the result.

1. Split the request into pieces.
2. For each piece ask three things: Is it clear? Is it checkable? Is a mistake easy to undo and quick to catch?
3. Yes to all three, and the work type is in a cheaper tier's "Good for" column: use that tier. Anything else: Opus.
4. **Never downshift** these: money, billing and commission math, auth and security, database migrations or deletes, anything you cannot undo, design and UX calls, words Zach or a customer will read as final, and the final review.
5. Write each handoff like a work order: the goal, exact files or inputs, what done looks like, what not to touch, and the output format.
6. Check every cheap result before using it. That check is the proof that quality held. If a piece fails its check once, rerun it one tier up. Do not patch a weak result by hand over and over.
7. Mention routing to Zach only when it matters, in one line: a real cost saving, or a downshift on something he would care about.

## What each place lets you control
- **claude.ai chat**: Zach picks the main model and effort in the picker. You cannot change them. You can pass `model` (haiku, sonnet, opus or fable) when you spawn an agent, and you can suggest a picker change at the start of a session in one line.
- **Claude Code**: subagent files set `model` and `effort` in their frontmatter (the settings block at the top of the file). Use the agent pack: Explore and bulk-editor on Haiku, builder on Sonnet, reviewer on Opus. The `opusplan` model setting uses Opus while planning, then Sonnet to build.
- **Crucible**: each specialist has a brain size (fast, balanced or deep) set in Crucible Settings, not from chat. Read the report cards in `crucible_crew`. An agent whose work keeps getting sent back is wasting money: give it a bigger brain or a sharper brief. A cheap agent that keeps failing costs more than a strong one that works the first time.

## When to tell Zach to change the picker
Say it once, at the start, in one line. Only when it clearly fits.
- **Sonnet, medium**: a chat that is mostly quick questions, rewording or simple lookups.
- **Opus, medium**: normal building, planning and writing. The everyday default.
- **Opus, high**: debugging, finance logic, migrations, anything going to a customer.
- **Fable**: only after Opus at xhigh came up short on the same problem.

## Style
Ninth grade reading level. Define any technical term in the same sentence. Never use em dashes. Do not narrate routing. Always say what you assumed and what you skipped.
