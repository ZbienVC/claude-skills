# claude-skills

Zach's own Claude skills and a Claude Code agent pack. The goal of everything here: get the same or better results while spending fewer tokens.

## What's inside

| Path | What it is |
|---|---|
| `.claude/skills/model-router/` | Picks the cheapest model and effort level that still gets top quality, and sends side work to the right helper. |
| `.claude/skills/handoff/` | Tells you when to stay, compact, start a fresh chat, or move to Claude Code, and writes the handoff for you. |
| `agents/` | Four Claude Code helpers (subagents), each locked to a model and effort level. |

## The agent pack

A subagent is a helper Claude that works in its own separate conversation and sends back a short summary. Each file's settings block at the top locks in which model it uses.

| Agent | Model | Effort | Job |
|---|---|---|---|
| `Explore` | Haiku | n/a | Read-only code search. Replaces the built-in Explore, which otherwise runs on your main model. |
| `bulk-editor` | Haiku | n/a | One exact change across many files. Skips anything customers will read. |
| `builder` | Sonnet | high | Builds from an approved plan. Stops instead of touching money, auth, or migrations. |
| `reviewer` | Opus | high | Fresh-eyes review of a finished change before you ship it. Never edits. |

### Install the agents
Copy the four files into your user agents folder so they work in every project:

- Mac or Linux: `~/.claude/agents/`
- Windows: `C:\Users\<you>\.claude\agents\`

If that folder didn't exist before, restart Claude Code once so it notices the new folder.

If the Haiku `Explore` ever starts missing things, delete `Explore.md` and Claude Code goes back to its built-in version.

## Install the skills
- **claude.ai**: save them from Settings, or from the skill card in the chat where they were made.
- **Claude Code**: they load on their own when you work inside this repo. To use them everywhere, copy each skill folder into `~/.claude/skills/`.

## Rules for anything added here
- Ninth grade reading level. Define technical terms in the same sentence.
- Never use em dashes.
- Check each skill's name and description with Canopy (`canopy_score`) until it grades strong before saving.

Model prices and settings in these files were checked against Anthropic's docs in October 2026. Re-check them when a new model ships.
