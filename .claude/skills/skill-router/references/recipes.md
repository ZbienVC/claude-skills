# Workflow recipes

Step-by-step skill plans for the jobs Zach repeats most where skills pay off most. When a job matches a recipe, follow it step by step instead of picking lanes one at a time. Announce the recipe in one line at the start ("Recipe: ship a feature, full run"), and name each step's skills as you reach it.

**Small jobs** (about an hour or less) run only the steps marked **(small)**. Say "small run" in the one-line plan.

Each step lists what to use and what it adds. Skip a step only when it clearly adds nothing here, and say so in the receipt.

---

## Recipe 1: Ship a feature in one of Zach's apps
Use for any new feature, screen, page or change in Herd, Hookline, Homebase, Crucible, Switchyard, Nightshift, Feast League, Wake Rush, Reflect, GrowthOS, Ultro and the rest.

1. **Shape the idea (small)**
   - `sharpen` when the request uses feel words. Turns them into exact picks.
   - `grill-me` when the feature is big or the direction is unclear. Settles decisions before building.
2. **Plan**
   - `product-management:write-spec`: clear requirements and "done when" lines.
   - `engineering:system-design`: how the pieces fit, only when data, APIs or new services change.
   - A case-against review from a fresh subagent or the `reviewer` agent, plus one real alternative.
3. **Design** (skip for back-end only work)
   - `design-taste`: read the taste lists first.
   - `atelier` (plus `atelier-fx` for motion or 3D): the look, layout and Stranger test.
   - `command-center-screens` for dashboards, inboxes and status pages.
4. **Build (small)**
   - `build-standards`: the project's safety level and build rules.
   - `model-router`: the cheapest model and effort that keep top quality.
5. **Check (small)**
   - `engineering:code-review`: bugs and risky changes before merge.
   - `design:accessibility-review`: contrast and keyboard, when screens changed.
   - Crucible `crucible_outside_view`: strangers' first impression, for anything users see.
6. **Ship**
   - `engineering:deploy-checklist`: what to check before and after going live.
   - Receipt, then `save-point` if the work continues later.

---

## Recipe 2: Start a new product idea
Use when Zach brings a new app, tool, business or feature idea bigger than an afternoon of work.

1. **Say it clearly**
   - `sharpen` if the idea is described in feel words.
2. **Is it worth it?**
   - Crucible `crucible_reality_check`: what exists, gaps, demand and money, the case against. Build, Reshape or Skip.
   - `product-management:competitive-brief`: deeper look at the closest rivals, when the check says Build or Reshape.
3. **Decide together**
   - `grill-me`: rounds of questions with recommended answers until every decision is settled. Include the reality check's case against.
4. **Write it down**
   - A Docs artifact plan with every decision and a build order.
   - Log the key calls in Crucible's decision log (`crucible_decisions`) with a "revisit when" line.
5. **First proof**
   - The smallest test that could kill the idea cheaply (a mockup, a weekend test, a landing page) before the full build. Then hand off to Recipe 1.

---

## Recipe 3: Something broke in a live app
Use when an app is down, erroring, slow, or doing the wrong thing for users.

1. **See it (small)**
   - Pull real evidence first: Railway logs and deploy diagnosis (Railway connector), Vercel runtime errors and logs (Vercel connector), Nightshift's watch status.
   - `engineering:incident-response`: when users are affected right now. Sets the order: stop the harm, then fix.
2. **Find the cause (small)**
   - `engineering:debug`: narrows the cause from the evidence instead of guessing.
3. **Fix (small)**
   - `build-standards`: keep the fix inside the project's safety rules.
   - Smallest safe change. Roll back first if a recent deploy caused it.
4. **Check (small)**
   - `engineering:code-review` on the fix.
   - `engineering:testing-strategy`: a test that would have caught this, so it cannot come back quietly.
5. **Learn**
   - A short postmortem through `engineering:incident-response`: what broke, why, what stops it next time.
   - If the cause was a call Zach made, add it to the decision journal (`crucible_decisions`).
