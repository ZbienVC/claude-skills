#!/usr/bin/env node
// Claude Code hook: when a message looks like a big task (building, redesigning,
// planning, a new or changed workflow), remind Claude to load the skill-router
// first, and Sharpen when the request leans on vague feel words. Short questions
// get no reminder, so it never adds noise to quick chats.
//
// It only adds a short note to Claude's context. It never blocks a message and
// always exits quietly.
//
// Hook it up (see README): a UserPromptSubmit hook.

async function readStdin() {
  let data = "";
  for await (const chunk of process.stdin) data += chunk;
  return data;
}

const BIG = /\b(build|rebuild|redesign|refactor|create|make|set ?up|plan|migrate|workflow|pipeline|architecture|feature|page|app|dashboard|agent|automate|overhaul|launch|ship)\b/i;
const VAGUE = /\b(pop|clean|modern|sleek|smooth|dramatic|premium|playful|alive|vibe|feel|kind of|sort of|something like|swirl|thing)\b/i;
const SKIP = /\b(skill-router|\/sharpen|sharpen this)\b/i;

try {
  const input = JSON.parse((await readStdin()) || "{}");
  const prompt = typeof input.prompt === "string" ? input.prompt : "";
  const words = prompt.trim().split(/\s+/).filter(Boolean).length;
  const looksBig = words >= 25 || (words >= 8 && BIG.test(prompt));

  if (looksBig && !SKIP.test(prompt)) {
    const notes = ["This looks like a big task: load the skill-router skill first and follow it (say the skills you will use in one line before the first tool call)."];
    if (VAGUE.test(prompt)) notes.push("The request uses feel words: run the sharpen skill before building.");
    process.stdout.write(
      JSON.stringify({ hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: notes.join(" ") } })
    );
  }
} catch {
  // Never get in the way of a message.
}
process.exit(0);
