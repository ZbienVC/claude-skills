# House rules file (SHARPEN.md)

Each project keeps its own rules in a `SHARPEN.md` file at the root of its repo. Claude Code reads it whenever it works on that project. Sharpen reads it before asking anything, warns when a pick breaks a rule, and adds new picks to its glossary.

Create the file the first time Sharpen runs in a project that has none. Start it with only the sections that have content. Add a rule only after Zach says yes.

## Template

```markdown
# Sharpen house rules: <project name>

These rules keep the project consistent. Every request follows them unless Zach approves an exception.

## Motion
- Timing family: <for example ease-out for entrances, ease-in for exits, expo for big moments; never bouncy>
- Longest effect: <for example 2.4s>
- Calm mode: <for example every effect has a reduced-motion fallback that fades in place>
- What moves: <for example headlines and hero only; body text stays still>

## Screens
- Layout patterns: <for example ranked needs-attention list, guided stepper>
- Never: <for example pill shapes, left-border stripes on cards>

## Surface
- Depth: <for example 4 elevation levels, used by role>
- Color: <palette names or tokens>

## Structure
- Architecture: <for example modular monolith, job queue for slow work>
- Agents: <for example orchestrator-workers with an approval gate>

## Exceptions
| Date | Pick | Rule it breaks | Why it was allowed |
|---|---|---|---|

## Glossary (this project)
| Zach's words | Exact term | Picked on |
|---|---|---|

## Recipes
| Name | Parts | Use it for |
|---|---|---|
```

## How rules grow
- When Zach picks the same kind of option 3 times in one project (for example expo timing), suggest it as a house rule. Add it only on his yes.
- When a rule keeps getting exceptions, suggest changing it.
- Rules about taste that apply to every project belong in his Canopy taste notes, not here.
