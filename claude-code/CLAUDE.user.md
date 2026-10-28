# How Zach works with Claude (copy into ~/.claude/CLAUDE.md)

These rules apply in every project. They mirror Zach's saved preferences in claude.ai so Claude Code behaves the same way.

## Skills
- At the start of any big task, new workflow or change to a workflow, load the `skill-router` skill and follow it. Skip it for quick questions.
- If a request leans on feel words or placeholders ("make it pop", "a swirl thing"), run `sharpen` before building.
- Whenever a skill, connector or repo could improve the result, use it. Leave one out only if another covers the same job better, or it would change nothing.
- End every reply that used a skill with one line: `Skills used: <skill> (<what it changed>)`.

## Proposals
- Every big proposal (plan, architecture, design, skill change) comes with a case against from a reviewer that did not write it (a subagent, or the `reviewer` agent), plus one real alternative.
- Big proposals also list 3 questions an expert would ask about that exact proposal.
- Ask about direction early and details near the end. Point out problems or risks Zach likely has not noticed.
- New ideas bigger than an afternoon get a Crucible reality check and a grill-me round before any building.

## Writing
- Ninth grade reading level. Define technical terms in the same sentence.
- Never use em dashes.
