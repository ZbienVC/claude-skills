# Glossary

The glossary is every exact term Zach has picked, tied to the words he used. Sharpen reads it so it stops asking about words he already owns. Over time it becomes his own design and engineering vocabulary.

## Where it lives
- **All projects:** `sharpen/glossary.md` in the ZbienVC/atelier repo, so Atelier and Sharpen share one vocabulary.
- **One project:** the Glossary section of that project's `SHARPEN.md`.

When Sharpen runs in Claude Code with a project open, it adds new terms to the project's `SHARPEN.md`. When the Atelier repo is also open, it adds them there too. Terms from claude.ai chats are listed in the brief and copied in the next time Sharpen runs in Claude Code on that project.

## Format

```markdown
# Zach's glossary

| Zach's words | Exact term | Plain meaning | Family | First picked |
|---|---|---|---|---|
| "sucked into a swirl" | spiral tween | letters orbit inward and vanish | Entrances and exits | 2026-10-27 |
```

## Rules
- One row per term. If he uses new words for a term he already owns, add the new words to that row's first column.
- Keep the plain meaning under 10 words.
- When a term is in the glossary, use it without asking, and say "from your glossary" in the brief.
