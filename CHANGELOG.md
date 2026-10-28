# Changelog

A running list of what changed in this repo and when. Newest entries go at the top.

## 2026-10-28
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
