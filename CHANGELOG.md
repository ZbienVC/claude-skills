# Changelog

A running list of what changed in this repo and when. Newest entries go at the top.

## 2026-10-29
- arena: rewrote the skill's description so it scores 100 in Canopy (was 70). It now lists phrases that should start it and says not to use it for a quick retry, since it needs Claude Code and costs 91 to 595 sub-agent calls.
- Added the arena skill (`.claude/skills/arena/`), copied unchanged from Jake Schincariol's arena-skill at commit df07b8e (MIT license kept in the folder). Runs a tournament of helper agents on one task. Works in Claude Code; chat can't launch the helper agents it needs.

## 2026-10-28
- skill-router is now a short rule instead of a lookup table: Claude picks from the skills it already sees by name and description, reads a missing one (like Atelier in chat) through Canopy, and keeps Zach's house picks, the recipes, the parked list and the receipt. Removed `references/lanes-design.md` and `references/lanes-other.md`.
- The repo is now a plugin marketplace with one plugin, `zach-kit` (all skills, the four agents and both hooks). Add it once on claude.ai (Customize, Plugins, Add marketplace) and it syncs to every device; no more copying files per computer. The Canopy skill-use hook now reads the key Claude Code asks for when the plugin is turned on.
- Added auto-routing for Claude Code: `hooks/route-big-tasks.mjs` (reminds Claude to load skill-router, and sharpen on feel words, when a message looks like a big task) and `claude-code/CLAUDE.user.md` (standing rules to copy into `~/.claude/CLAUDE.md`). Added `skill-router` to the repo.
- skill-router: split into a short core plus lookup tables (about half the size per use), added a safety valve for skills that change nothing, a weekly table refresh, and 3 workflow recipes (ship a feature, start a new product idea, something broke).
- Sharpen's skill mode is now a guided 5-step skill workbench: pick a skill, see its health card, pick a goal, walk through fixes in small screens, then review and save. Description now also triggers on "work on my skills".

## 2026-10-27
- Added the Sharpen skill (`.claude/skills/sharpen/`): finds the vague phrases in a request, offers 3 exact options plus 1 wildcard for each, and writes a brief in 2 rounds. Includes a starter library across motion, timing, scroll, screens, surface, interaction, 3D and architecture, a house rules file format, a glossary format and a "sharpen a skill" mode. Scored 100 in Canopy.

## 2026-10-14
- Added this changelog so changes to skills, agents and hooks are easy to track over time.

## 2026-10-11
- Added the Canopy skill-use hook for Claude Code (`hooks/canopy-skill-use.mjs`), which tells Canopy each time a skill gets loaded.

## Earlier
- Started the repo with the model-router and handoff skills, then added no-ai-slop, steerable-3d-scene, data-city-map and command-center-screens.
- Added the four-agent pack for Claude Code: Explore, bulk-editor, builder and reviewer.
