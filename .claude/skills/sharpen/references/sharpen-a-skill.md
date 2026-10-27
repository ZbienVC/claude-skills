# Sharpen a skill

Use this when Zach says "sharpen my <skill> skill", or when Canopy or Crucible flags a skill that never fires or does not help. Zach sharpens alongside you. You find and propose; he decides. Nothing is saved without his yes.

## 1. Gather evidence first
Read the skill in full (`canopy_get`, or the file in its repo). Then collect what actually happened with it:
- `canopy_usage`: how often it fired and the "why" notes on each use.
- For Atelier: its open issues and session logs from atelier-log.
- Any corrections Zach made in chats where the skill ran, when they are in front of you.

Sort the skill's problems into two kinds:
- **Never fires.** The name and description do not match how Zach asks. Fix the description.
- **Fires but does not help.** The instructions inside are vague or wrong. Fix the instructions.

## 2. Find the blurry instructions
Mark instructions that two good builders would follow differently, such as "make it polished", "keep it clean", "use good spacing" or "add some motion". For each one, write 3 exact replacements plus 1 wildcard, the same way Sharpen does for requests. Use `references/library.md` terms where they fit. Attach the rules that come with each option.

Also mark:
- Steps that the evidence shows getting skipped or failing.
- Rules that clash with each other or with his taste notes.
- Strong parts the evidence shows working (keep and protect these; for example Atelier's Stranger test).

## 3. Show a before-and-after list
Show every proposed change as a numbered before-and-after pair, grouped by section, with one line of evidence each. Ask him to answer in one line, like "yes to all but 3, use 4b for 4". Wait for his answer. This applies to name and description changes too.

## 4. Save and check
- Apply only the approved changes.
- For the name and description, run `canopy_score` until it grades strong.
- Save with `canopy_save_skill` only after his yes, or commit to the skill's repo on a branch and open a pull request.
- Add a line to the repo's CHANGELOG.
- Log the session with `canopy_log_use`.

## Limits
- At most 12 changes per session, so review stays easy.
- Never remove a working part without evidence that it hurts.
- Never retire a skill here. Retiring needs 3 recorded uses that did not help, and his yes.
