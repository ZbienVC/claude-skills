#!/usr/bin/env node
// Claude Code hook: every time Claude loads a skill, tell Canopy (in
// Switchyard) which skill, in which project, on which computer. This is how
// Canopy's "used 12 times in 30 days" counts stay honest without Claude having
// to remember to report.
//
// It never slows Claude down or blocks it: it gives up after 3 seconds and
// always exits quietly. Nothing is sent unless both settings below are set.
//
// Settings (in ~/.claude/settings.json under "env", or in your shell):
//   CANOPY_URL  your Switchyard address, like https://switchyard-production-02d8.up.railway.app
//   CANOPY_KEY  the same CANOPY_KEY that is set on Switchyard in Railway
//
// Hook it up (see README): a PostToolUse hook with the matcher "Skill".

import os from "node:os";

const url = process.env.CANOPY_URL;
const key = process.env.CANOPY_KEY;

async function readStdin() {
  let data = "";
  for await (const chunk of process.stdin) data += chunk;
  return data;
}

try {
  if (url && key) {
    const input = JSON.parse((await readStdin()) || "{}");
    const tool = input.tool_input ?? {};
    const skill = typeof tool.skill === "string" ? tool.skill : typeof tool.name === "string" ? tool.name : null;
    if (skill) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3000);
      await fetch(`${url.replace(/\/+$/, "")}/api/ingest/canopy/use`, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
        body: JSON.stringify({ skill, surface: "claude-code", project: input.cwd ?? null, device: os.hostname() }),
        signal: controller.signal,
      }).catch(() => undefined);
      clearTimeout(timer);
    }
  }
} catch {
  // A broken report must never get in Claude's way.
}
process.exit(0);
