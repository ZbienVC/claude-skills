# Where this skill came from

- Author: Jake Schincariol (https://opusjake.ai)
- Original repo: https://github.com/Jakeschincariol/arena-skill
- Copied from commit `df07b8e518e10cdecd8cd7712d9958b6f396250e` (2026-09-26)
- License: MIT. The author's license is kept next to the skill in `LICENSE`, as MIT requires.

## What was copied
`SKILL.md`, `bracket.py`, `rubric.md` and `strategies.json` from `skills/arena/`, unchanged.
The author's tests and plugin files were left out because this kit already is the plugin.

## Safety check done before copying (2026-10-29)
- `bracket.py` only uses Python's built-in tools (argparse, json, math, os, random, re, sys, time).
  It never goes online, never runs other programs, and never reads secrets or settings.
- It only writes inside the `.arena/` folder of the folder you run it in.
- No hidden text, no auto-run commands, no tool grants in the skill.

## Updating it later
To take a newer version, copy the four files again from a newer commit, read the diff first,
and change the commit above. Do not edit `SKILL.md`'s template blocks: `bracket.py` reads them.
