# claude-skills

Zach's own Claude skills and a Claude Code agent pack. The goal of everything here: get the same or better results while spending fewer tokens.

## What's inside

| Path | What it is |
|---|---|
| `.claude/skills/model-router/` | Picks the cheapest model and effort level that still gets top quality, and sends side work to the right helper. |
| `.claude/skills/handoff/` | Tells you when to stay, compact, start a fresh chat, or move to Claude Code, and writes the handoff for you. |
| `.claude/skills/no-ai-slop/` | Edits a draft so it sounds like a person wrote it, or flags the AI-slop lines without rewriting. Adapted from Peter Yang's no-ai-slop (MIT). |
| `.claude/skills/steerable-3d-scene/` | Builds a 3D view you can steer with a mouse, a trackpad or two thumbs (spin, tilt, pinch, twist, a button pad), with readable name tags. Includes the engine from the Switchyard redesign. |
| `.claude/skills/data-city-map/` | Decides what a 3D map means: shape = kind, size = amount of code, color = group, color strength = how recently touched. The Switchyard "city" rules. |
| `.claude/skills/command-center-screens/` | Layouts for status, inbox and crew pages that answer "what is wrong and what do I do first" fast: ranked lists, flick cards, one gauge strip. |
| `.claude/skills/skill-router/` | Picks the right skills for a big task from a lookup table, uses every one that adds value, suggests more as the work changes, and ends with a receipt. |
| `claude-code/CLAUDE.user.md` | Zach's standing rules for Claude Code (auto-routing, case against, writing rules), to copy into `~/.claude/CLAUDE.md`. |
| `.claude/skills/arena/` | Makes many copies of Claude (100, or 16 with `--quick`) answer the same task with different strategies, attack each other, and get judged in a bracket until one answer is left. Claude Code only (needs Python and helper agents). Copied unchanged from Jake Schincariol's arena-skill (MIT); see `SOURCE.md` in its folder. |
| `.claude/skills/sharpen/` | Turns vague words in a request ("a swirl thing", "make it pop") into exact terms you pick from, then writes a precise brief to build from. Also sharpens a skill's own instructions with you. Comes with a starter library, a per-project house rules file (`SHARPEN.md`) and a glossary format. |
| `agents/` | Four Claude Code helpers (subagents), each locked to a model and effort level. |
| `.claude-plugin/` | Makes this repo a plugin marketplace with one plugin, `zach-kit`. See "Install everything once". |
| `hooks/route-big-tasks.mjs` | Reminds Claude Code to load the skill router (and Sharpen) when a message looks like a big task. |
| `hooks/canopy-skill-use.mjs` | Tells Canopy each time Claude Code loads a skill, so you can see which skills get used. |

## The agent pack

A subagent is a helper Claude that works in its own separate conversation and sends back a short summary. Each file's settings block at the top locks in which model it uses.

| Agent | Model | Effort | Job |
|---|---|---|---|
| `Explore` | Haiku | n/a | Read-only code search. Replaces the built-in Explore, which otherwise runs on your main model. |
| `bulk-editor` | Haiku | n/a | One exact change across many files. Skips anything customers will read. |
| `builder` | Sonnet | high | Builds from an approved plan. Stops instead of touching money, auth, or migrations. |
| `reviewer` | Opus | high | Fresh-eyes review of a finished change before you ship it. Never edits. |

The plugin installs the four agents in Claude Code as `zach-kit:Explore`, `zach-kit:builder`, `zach-kit:bulk-editor` and `zach-kit:reviewer`. The plugin's `Explore` does not replace the built-in one.

## Install everything once (plugin)

This repo is a plugin marketplace. A marketplace is a list of plugins Claude can install from GitHub, and a plugin is one bundle of skills, helper agents and hooks. The whole repo is one plugin called `zach-kit`.

**Best way, once for every device:** on claude.ai open Customize, then Plugins, then Add, then Add marketplace, and enter `ZbienVC/claude-skills`. Turn on "Sync automatically". The skills then show up in Claude chat (web, desktop and phone), in Cowork, and in Claude Code on any computer signed in with the same claude.ai account. New commits here reach every device on their own. Chat skips the hooks and agents; Claude Code loads them.

**Claude Code only, one computer:**

```
claude plugin marketplace add ZbienVC/claude-skills
claude plugin install zach-kit@zbien-skills
```

Claude Code asks for the Canopy key the first time (it is stored in the computer's secure store, not in a file). Leave it empty to skip the skill-use log on that computer.

Skills from the plugin show up as `zach-kit:<name>`, for example `zach-kit:sharpen`.

If you copied skills, the agents or the hooks into `~/.claude/` by hand before, delete those copies so nothing runs twice.

## Skill-use hook (Claude Code)

`hooks/canopy-skill-use.mjs` tells Canopy every time Claude Code loads a skill, so Canopy can show which skills you actually use and which never earn their keep. It gives up after 3 seconds and never blocks Claude. The plugin sets it up for you; the only input is the Canopy key.

Claude chats on claude.ai have no hooks, so there the skill router calls `canopy_log_use` at the end of a job instead.

## Auto-routing in Claude Code

Two pieces make Claude Code pick the right skills on big tasks without being asked, the same way claude.ai does through saved preferences.

1. **Standing rules:** copy the text of `claude-code/CLAUDE.user.md` into `~/.claude/CLAUDE.md` (Windows: `C:\Users\<you>\.claude\CLAUDE.md`). Claude Code reads that file in every project.
2. **Big-task nudge:** the plugin turns on `hooks/route-big-tasks.mjs` for you. It adds a one-line reminder to load `skill-router` (and `sharpen` when the message uses feel words) only when a message looks like a big task. Quick questions get nothing. It never blocks a message.

## Rules for anything added here
- Ninth grade reading level. Define technical terms in the same sentence.
- Never use em dashes.
- Check each skill's name and description with Canopy (`canopy_score`) until it grades strong before saving.

Model prices and settings in these files were checked against Anthropic's docs in October 2026. Re-check them when a new model ships.
