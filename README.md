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
| `.claude/skills/skill-router/` | Picks the right skills for a big task from a lookup table, uses every one that adds value, suggests more as the work changes, and ends with a receipt. Same text as the copy saved in Zach's Claude account. |
| `claude-code/CLAUDE.user.md` | Zach's standing rules for Claude Code (auto-routing, case against, writing rules), to copy into `~/.claude/CLAUDE.md`. |
| `.claude/skills/sharpen/` | Turns vague words in a request ("a swirl thing", "make it pop") into exact terms you pick from, then writes a precise brief to build from. Also sharpens a skill's own instructions with you. Comes with a starter library, a per-project house rules file (`SHARPEN.md`) and a glossary format. |
| `agents/` | Four Claude Code helpers (subagents), each locked to a model and effort level. |
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

### Install the agents
Copy the four files into your user agents folder so they work in every project:

- Mac or Linux: `~/.claude/agents/`
- Windows: `C:\Users\<you>\.claude\agents\`

If that folder didn't exist before, restart Claude Code once so it notices the new folder.

If the Haiku `Explore` ever starts missing things, delete `Explore.md` and Claude Code goes back to its built-in version.

## Install the skills
- **claude.ai**: save them from Settings, or from the skill card in the chat where they were made.
- **Claude Code**: they load on their own when you work inside this repo. To use them everywhere, copy each skill folder into `~/.claude/skills/`.

## Skill-use hook (Claude Code)

`hooks/canopy-skill-use.mjs` tells Canopy every time Claude Code loads a skill, so Canopy can show which skills you actually use and which never earn their keep. It gives up after 3 seconds and never blocks Claude.

Set it up once per computer:

1. Copy `hooks/canopy-skill-use.mjs` to `~/.claude/hooks/` (Windows: `C:\Users\<you>\.claude\hooks\`).
2. Add this to `~/.claude/settings.json` (merge it with anything already there). The key is the same `CANOPY_KEY` set on Switchyard in Railway.

```json
{
  "env": {
    "CANOPY_URL": "https://switchyard-production-02d8.up.railway.app",
    "CANOPY_KEY": "paste the CANOPY_KEY here"
  },
  "hooks": {
    "PostToolUse": [
      { "matcher": "Skill", "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/canopy-skill-use.mjs" }] }
    ]
  }
}
```

3. Restart Claude Code. Uses show up in Canopy (ask Claude "which skills do I actually use", or look for "Used Nx" on a skill card).

Claude chats on claude.ai have no hooks, so there the skill router calls `canopy_log_use` at the end of a job instead.

## Auto-routing in Claude Code

Two pieces make Claude Code pick the right skills on big tasks without being asked, the same way claude.ai does through saved preferences.

1. **Standing rules:** copy the text of `claude-code/CLAUDE.user.md` into `~/.claude/CLAUDE.md` (Windows: `C:\Users\<you>\.claude\CLAUDE.md`). Claude Code reads that file in every project.
2. **Big-task nudge:** copy `hooks/route-big-tasks.mjs` to `~/.claude/hooks/`, then add this next to the existing hooks in `~/.claude/settings.json`:

```json
"UserPromptSubmit": [
  { "hooks": [{ "type": "command", "command": "node ~/.claude/hooks/route-big-tasks.mjs" }] }
]
```

The hook adds a one-line reminder to load `skill-router` (and `sharpen` when the message uses feel words) only when a message looks like a big task. Quick questions get nothing. It never blocks a message.

To use the router itself in Claude Code, copy `.claude/skills/skill-router/` into `~/.claude/skills/`.

## Rules for anything added here
- Ninth grade reading level. Define technical terms in the same sentence.
- Never use em dashes.
- Check each skill's name and description with Canopy (`canopy_score`) until it grades strong before saving.

Model prices and settings in these files were checked against Anthropic's docs in October 2026. Re-check them when a new model ships.
