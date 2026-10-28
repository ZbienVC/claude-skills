# Skill workbench (sharpen a skill)

A guided walkthrough for improving one of Zach's skills together with him. You find the problems and propose fixes. He decides. Nothing is saved without his yes.

Use it when Zach says "sharpen my <skill> skill", "work on my skills", "skill workbench" or "which skills need work", or when Canopy, Crucible or the router flags a skill that never fires or does not help.

Every screen follows the same shape: one short heading that says where he is ("Step 2 of 5: pick a goal"), the decision in front of him, options as cards or a numbered list, and one recommended choice marked first. Never show a wall of text. Never ask more than one kind of question per screen.

## Step 1 of 5: pick a skill
Skip this step if he named the skill.

Otherwise pull `canopy_overview` and `canopy_usage`, then show up to 9 skills in three short groups. Each row says the problem in plain words and the suggested action.

```
Worth sharpening first
- atelier: used 6 times this month, every time it helped. Make it even better.
Not firing
- loose-ends: never used in 30 days. Its description may not match how you ask.
Weak descriptions
- atelier-evolve: scores 45. Claude can't tell when to use it.
```

Recommend one (usually the most used skill with a known weak spot) and let him pick.

## Step 2 of 5: the health card
Read the skill in full (`canopy_get`, or the file in its repo). Gather evidence:
- `canopy_usage`: how often it fired, and the "why" note on each use.
- For Atelier: open issues and atelier-log session notes.
- Corrections Zach made in chats where it ran, when they are in front of you.

Show one compact card:

```
atelier · score 70 (okay) · used 6 times in 30 days · helped 6 of 6
Working well: the Stranger test (caught 9 real problems in one session)
Problems found:
1. Description has no example phrases, so it may miss some requests.
2. "Keep spacing generous" clashes with your "no lots of empty space" rule.
3. "Add tasteful motion" is blurry: two builders would do different things.
```

Keep it to the 3 to 6 problems with the most evidence. Protect what is working; name it first.

## Step 3 of 5: pick a goal
Ask what this session is for. Options, recommended first:
- **Fire at the right times** (fix the name and description).
- **Do better work** (fix the blurry or wrong instructions inside).
- **Both.**
- **Just tidy** (small clarity fixes only).

## Step 4 of 5: walk through the fixes
Show the fixes in screens of up to 4, grouped by section of the skill. For each fix:
- **Before:** the exact current line, quoted.
- **Options:** 3 exact rewrites plus 1 wildcard idea from another field, using terms from `references/library.md` where they fit, with the rules attached. Recommended option first. Always include "Keep as is".
- **Why:** one line of evidence (a use note, a correction, a score factor).

Use the multiple-choice tool when present (one question per fix, up to 4 per screen). Otherwise number them (1a, 1b...) and ask for a one-line reply like "1b 2a 3 keep 4c".

At most 3 screens (12 fixes) per session, so review stays easy. If more fixes exist, list them under "Next session".

## Step 5 of 5: review and save
1. Show the full before-and-after list of every chosen change, numbered, and wait for one-line approval ("yes to all but 3"). This applies to name and description changes too.
2. For the name and description, run `canopy_score` until it grades strong.
3. Save:
   - **Skills in a GitHub repo:** commit on a branch and open a pull request, or use `canopy_save_skill` after his yes.
   - **Skills saved in his Claude account:** read the current SKILL.md in full, then use `propose_skills` with the complete updated file so he saves it from the card.
4. Add a line to the repo's CHANGELOG when there is one.
5. Log the session with `canopy_log_use`.

## After saving: prove it
Offer one quick test: run the improved skill on a real past request from the evidence and show what changed, side by side, in a few lines. If the skill was "not firing", give Zach one sentence he can type to trigger it, so he learns when to use it.

## Limits
- Never remove a working part without evidence that it hurts.
- Never retire a skill here. Retiring needs 3 recorded uses that did not help, and his yes.
- One skill per session.
