---
name: handoff
description: Builds a paste-ready handoff and tells Zach when to stay, compact, start a fresh chat, or move to Claude Code, without being asked. Use when a chat runs long or drifts topics, when the next step is building code in a repo, or when Zach says "move this to Claude Code", "start a new chat", or "should I compact". Do not use for end-of-session saves or resuming; use save-point.
---

# Handoff

Zach should never have to ask for a handoff or write one. When moving is the better call, say so in one line and give him everything ready to paste. When staying is better, stay and say nothing.

## Watch for these signals
Check quietly every few turns. Do not announce the check. You cannot see exact context size in claude.ai, so use these rough signs instead.

**Move to Claude Code** when:
- The next step edits more than a couple of files, runs tests or builds, or lives in a repo (a project's code folder on GitHub).
- You are writing code blocks for Zach to copy into files by hand.

**Start a fresh chat** (claude.ai) when any of these is true:
- The topic changed to something unrelated.
- The chat is long: roughly 20 or more back-and-forth turns, or 3 or more big pastes, files or long tool results.
- You see drift: you contradicted an earlier decision, forgot a constraint, Zach corrected the same thing twice, or you are not sure what was decided.

**Stay** when:
- It is the same task, it is going well, and it is close to done.
- The task is small. A two-file fix can stay in chat.

## Decide
Slash commands (like `/compact`) are typed by Zach, not by you. When one is the answer, give him the exact command to type.

| Situation | Do this |
|---|---|
| Same task, on track | Stay |
| Claude Code, same task, context getting big | Tell Zach to type `/compact focus on <task>` so the summary keeps what matters |
| Claude Code, same task, but drifting or confused | Write the handoff, have Zach type `/clear` (wipes the conversation), then paste the handoff |
| Claude Code, switching to unrelated work | Run save-point's checkpoint, then have Zach type `/clear` |
| Claude Code, need to read lots of files or logs | Send it to a subagent (a helper that works in its own separate conversation) instead of reading it in the main chat |
| claude.ai, same project, chat long or drifting | New chat in the same Project (a claude.ai folder that keeps files and instructions across chats), opened with a handoff |
| claude.ai, next step is code in a repo | Move to Claude Code with a handoff |
| Work Zach will come back to for weeks | Keep it in a claude.ai Project, with STATUS.md (save-point's one-page progress file) and key decisions as project files |

## Compact or start fresh?
`/compact` (Claude Code) swaps the conversation for a structured summary.
- **It keeps**: your requests, key decisions, files touched, errors and fixes, open tasks. It also reloads CLAUDE.md (the repo's standing instructions file), the plan, up to five recently edited files, and skills used so far.
- **It loses**: exact tool output, exact wording of old messages, and the reasoning steps. It also resets the prompt cache (the saved copy that makes repeat messages cheap).

Compact when the same task continues and a summary is enough. Start fresh with a handoff when exact details matter, when the chat has drifted, or when the next task is different. A handoff written on purpose beats an automatic summary because you choose what survives. Rules that must survive any compaction belong in the repo's root CLAUDE.md, not in chat.

## Build the handoff
When moving is right, do all of this in one reply without asking first:

1. **One line on why**: "Moving to Claude Code is the better call here because the next step is editing six files and running the tests."
2. **The handoff prompt in one code block**, ready to paste. Aim for under 3,000 characters.
3. **A deep link** when moving to Claude Code and the GitHub repo is known: `claude-cli://open?repo=<owner/name>&q=<URL-encoded prompt>`. Clicking it opens Claude Code in that repo with the prompt typed in but not sent. Limits: it works only on a computer where Claude Code has already run in that repo, the prompt can be at most 5,000 characters, and GitHub pages show these links as plain text. If the link fails or the prompt is long, Zach pastes the code block instead.
4. **A HANDOFF.md file** only when the handoff will not fit in the prompt. Send the file, make the prompt start with "Read HANDOFF.md first", and offer to commit it to the repo at `docs/handoff/`. Commit only after Zach says yes.
5. **Progress file**: if the project uses STATUS.md, run save-point's checkpoint so `resume` works later.

### Handoff prompt template
```
# Handoff: <task> (from <chat or project>, <date>)

## Goal
<one or two lines: what done looks like>

## Where things stand
- Done: <finished items>
- Current step: <what was in progress>

## Decisions already made (do not reopen)
- <decision> because <reason>

## Tried and did not work
- <attempt> failed because <reason>

## Constraints
- Stack, files to touch, files NOT to touch
- Style: no em dashes; explain at a ninth grade level

## Next steps
1. <next action>
2. <after that>

## Open questions for Zach
- <question>

## Assumed and skipped
- Assumed: <guesses the next session should confirm>
- Skipped: <what was left out on purpose>

## Where to look
- Repo, branch, key file paths, docs

## First action
<the exact first move, for example: "Read STATUS.md and src/lib/billing.ts, then show a plan before editing.">

## Model hint
<for example: Opus on medium; switch to high when the migration step starts>
```

### Rules for the handoff
- Facts and decisions with reasons. Mark guesses as guesses.
- Point to file paths. Do not paste whole files.
- Include what failed so the next session does not repeat it.
- Leave out chit-chat, dead ends that taught nothing, and anything already in CLAUDE.md.

## Do not
- Suggest moving more than once per topic if Zach says no.
- Move just because the chat is long when the task is nearly done and on track.
- Make Zach download a file when a paste-ready block would do.

## Style
Ninth grade reading level. Define any technical term in the same sentence. Never use em dashes. Always say what you assumed and what you skipped.
