---
name: steerable-3d-scene
description: Builds a three.js scene people can steer by mouse, trackpad and touch: drag to spin and tilt, two-finger pinch to zoom, twist to turn, a hold-to-repeat nav pad, smooth glide, drawing only when something moves, flat name tags that dodge each other, and a spring rise when 3D turns on. Use when adding a 3D view or 3D toggle to an app, for example "make this map 3D", "I can't pinch or spin it on my phone", "add a 3D mode I can navigate" or "the 3D view is hard to control". Comes with a tested reference engine and a headless screenshot check. Not for deciding what shapes and colors mean (use data-city-map) or for decorative hero animations and shaders.
---

# Steerable 3D scene

A 3D view only earns its place if a person can steer it without thinking, on a mouse, a trackpad and two thumbs. This skill is the engine Zach approved in the Switchyard and Nightshift redesign (October 2026, the "Signal box, daylight" prototype). Its 3D Yard city, 3D Canopy and Crew constellation all run on it. Earlier 3D views felt "underdone" and "hard to expand and control". Everything below fixes that.

Pair it with `data-city-map`, which decides what the shapes, sizes and colors mean.

## The rules

1. **Every input works, and they all feel the same.**
   - One finger or left drag: spin (turn around) and tilt (look more from above or from the side).
   - Two fingers together: pinch to zoom, twist to turn, move both up or down to tilt, slide sideways to pan (move the view).
   - Trackpad: a two-finger swipe spins and tilts, and pinching (the browser reports it as Ctrl plus wheel) zooms.
   - Mouse wheel: zooms. Tell a mouse wheel apart from a trackpad by `deltaMode === 1`, or by a whole-number `deltaY` of 40 or more with `deltaX === 0`.
   - Right-drag, middle-drag, Shift-drag or Shift-scroll: pan.
   - Arrow keys turn and tilt; `+` and `-` zoom.
   - An on-screen pad with six buttons: turn left, tilt up, turn right, reset, tilt down, top view. The four arrow buttons repeat while held (every 180 ms).
2. **Smooth, not twitchy.** Keep two camera states: where the camera is (`st`) and where it is heading (`g`). Every frame, move `st` toward `g` by `1 - 0.00006^dt`. After a drag, keep the spin going with inertia (velocity × 6.5, fading by `0.04^dt`).
3. **Draw only when something moves.** Use one `requestAnimationFrame` loop that stops once the camera is still and no animation reports it is busy. Stop when the tab is hidden or the view is off screen. Watch the host with a `ResizeObserver`.
4. **Words stay flat and readable.** Never paint names onto 3D faces, and never draw dark outlines on boxes. Each name is an HTML tag placed over the canvas at its projected point. Place tags in priority order: selected, hovered, broken, then by activity. If a tag would overlap one already placed, try one or two rows up, then hide it. When zoomed far out, hide low-priority tags.
5. **Light like daylight, not a game.** Use these exact settings:
   - Tone mapping: NoToneMapping, with sRGB output.
   - Hemisphere light 0.72 (sky #ffffff, ground #c3ccd3), sun 1.05 (#fff2e4) with soft shadows (PCFSoft, 2048 map, bias -0.0005, normalBias 0.8, radius 5), ambient 0.12.
   - A ShadowMaterial ground at opacity 0.16, plus a faint grid at opacity 0.05.
   - Fog set to the page background color: near = distance × 1.05, far = distance × 3.4.
   - In dark mode: hemisphere 0.5, sun 0.85, ground shadow 0.32.
   - **three r155 or newer** uses physically based light units by default, so these numbers look dimmer there. Tune by eye against a screenshot, or start near hemisphere 2.2 and sun 3.0.
6. **Fit the camera to the content, not to a sphere.** For a box of width `bw` and depth `bd` seen at tilt `pol`, with `tv = tan(fov/2)` and `th = tv × aspect`: `dist = max((bw/2)/th, (bd×cos(pol)×0.5 + bd×0.18)/tv) × pad`. Use pad 1.0 to 1.12 on desktop and about 0.85 on phones (frame a single district there).
7. **The entrance tells the story.** When 3D turns on:
   - Snap the camera to top-down (tilt 0.14), then glide to the working tilt (about 0.95).
   - Grow every block from the ground with a spring: `v += (120×(1-r) - 19×v)×dt`.
   - Show connections once the rise passes 0.85, and show tags once it passes 0.55.
   - Show a one-time hint card with the controls.
8. **Respect people.**
   - Reduced motion: no swoop, no springs, no moving cars, no auto spin.
   - No WebGL: show a plain message and keep the 2D view.
   - On touch, the canvas needs `touch-action: none`.
   - Ignore pointer events that start on buttons, legends or the pad.
9. **Picking.** Raycast only against a short list of pickable meshes (`setPicks`). Hover runs at most once per frame. A tap is a press that moved less than 4 px; anything more is a drag.

## Reference engine

Ported from the approved prototype (plain three.js, no React). In React, create it in a `useEffect`, keep it in a ref, and dispose of it on unmount.

```js
import * as THREE from "three";
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const RM = matchMedia("(prefers-reduced-motion: reduce)");

export function roundSlab(w, d, h, r) { // rounded corners in plan, straight sides; group 0 = top and bottom, group 1 = sides
  const s = new THREE.Shape(), x = -w / 2, y = -d / 2; r = Math.min(r, w / 2 - .01, d / 2 - .01);
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + d - r);
  s.quadraticCurveTo(x + w, y + d, x + w - r, y + d); s.lineTo(x + r, y + d); s.quadraticCurveTo(x, y + d, x, y + d - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: false, curveSegments: 5 }); g.rotateX(-Math.PI / 2); return g; // sits on y = 0, grows up
}

export function createScene(host, o = {}) {
  const ev = o.events || host;
  const R = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  R.setPixelRatio(Math.min(2, devicePixelRatio || 1)); R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
  R.outputColorSpace = THREE.SRGBColorSpace; R.toneMapping = THREE.NoToneMapping;
  const cv = R.domElement; cv.style.touchAction = "none"; host.appendChild(cv);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(o.fov || 30, 1, 10, 30000), span = o.span || 1600;
  const hemi = new THREE.HemisphereLight(0xffffff, 0xc3ccd3, .72), amb = new THREE.AmbientLight(0xffffff, .12);
  const sun = new THREE.DirectionalLight(0xfff2e4, 1.05); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -.0005; sun.shadow.normalBias = .8; sun.shadow.radius = 5;
  Object.assign(sun.shadow.camera, { left: -span, right: span, top: span, bottom: -span, near: 10, far: span * 8 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(span * 6, span * 6), new THREE.ShadowMaterial({ opacity: .16 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; ground.position.y = -.5;
  const grid = new THREE.GridHelper(span * 6, Math.round(span * 6 / 100), 0, 0); grid.material.transparent = true; grid.material.opacity = .05;
  scene.add(hemi, amb, sun, sun.target, ground, grid); scene.fog = new THREE.Fog(0xffffff, 1, 2);

  const st = { x: 0, z: 0, az: o.az ?? -.3, pol: o.pol ?? .9, dist: o.dist ?? 2400 }, g = { ...st }, vel = { az: 0, pol: 0 };
  const lim = { pol: o.polLim || [.08, 1.36], dist: [o.minDist || 250, o.maxDist || 8000] };
  let W = 1, H = 1, raf = 0, active = false, anim = 0, lastInput = 0, last = performance.now(), picks = [];
  const frames = [], ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), tmp = new THREE.Vector3();
  const size = () => { const r = host.getBoundingClientRect(); if (r.width < 2) return; W = r.width; H = r.height; R.setSize(W, H, false);
    cv.style.width = W + "px"; cv.style.height = H + "px"; cam.aspect = W / H; cam.updateProjectionMatrix(); loop(); };
  const ro = new ResizeObserver(size); ro.observe(host);
  function place() { const sp = Math.sin(st.pol);
    cam.position.set(st.x + st.dist * sp * Math.sin(st.az), st.dist * Math.cos(st.pol), st.z + st.dist * sp * Math.cos(st.az)); cam.lookAt(st.x, 0, st.z);
    sun.position.set(st.x - span * .55, span * 1.25, st.z + span * .45); sun.target.position.set(st.x, 0, st.z);
    scene.fog.near = st.dist * 1.05; scene.fog.far = st.dist * 3.4; }
  function frame(now) { raf = 0; if (!active || document.hidden) return; const dt = Math.min(.05, (now - last) / 1000) || .016; last = now;
    if (!drag && !gest) { g.az += vel.az * dt; g.pol = clamp(g.pol + vel.pol * dt, ...lim.pol); const k = Math.pow(.04, dt); vel.az *= k; vel.pol *= k; }
    if (o.autoSpin && !RM.matches && !drag && !gest && now - lastInput > 3000) g.az += o.autoSpin * dt;
    const k = RM.matches ? 1 : 1 - Math.pow(.00006, dt); let moving = false;
    for (const key in st) { const d = g[key] - st[key]; st[key] += d * k; if (Math.abs(d) > (key === "dist" ? .4 : key === "x" || key === "z" ? .25 : .0004)) moving = true; }
    place(); let busy = false; for (const f of frames) if (f(dt, now)) busy = true; R.render(scene, cam);
    if (moving || busy || now < anim || Math.abs(vel.az) > .002 || Math.abs(vel.pol) > .002 || (o.autoSpin && !RM.matches)) loop(); }
  function loop() { if (!raf && active) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function panBy(dx, dy) { const s = st.dist * .00105, ca = Math.cos(st.az), sa = Math.sin(st.az), t = Math.max(.35, Math.cos(st.pol * .6));
    g.x -= ca * dx * s + sa * dy * s / t; g.z -= -sa * dx * s + ca * dy * s / t;
    if (o.bounds) { g.x = clamp(g.x, o.bounds[0], o.bounds[2]); g.z = clamp(g.z, o.bounds[1], o.bounds[3]); } }
  function pick(cx, cy) { const r = cv.getBoundingClientRect(); ndc.set((cx - r.left) / r.width * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, cam); const hit = ray.intersectObjects(picks, false)[0]; return hit ? hit.object.userData : null; }

  // input
  const P = new Map(); let drag = null, gest = null, hoverQ = 0;
  const skip = e => o.ignore && e.target.closest(o.ignore);
  ev.addEventListener("pointerdown", e => { if (!active || skip(e)) return; ev.setPointerCapture?.(e.pointerId); P.set(e.pointerId, { x: e.clientX, y: e.clientY });
    lastInput = performance.now(); vel.az = vel.pol = 0;
    if (P.size === 2) { const [a, b] = [...P.values()]; gest = { d: Math.hypot(a.x - b.x, a.y - b.y), ang: Math.atan2(b.y - a.y, b.x - a.x), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 }; drag = null; return; }
    drag = { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, moved: false, pan: e.button === 2 || e.button === 1 || e.shiftKey, target: e.target, lx: 0, ly: 0, lt: performance.now() }; });
  ev.addEventListener("pointermove", e => { if (!active) return; if (P.has(e.pointerId)) P.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (gest && P.size >= 2) { const [a, b] = [...P.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y), ang = Math.atan2(b.y - a.y, b.x - a.x), mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      g.dist = clamp(g.dist * gest.d / Math.max(10, d), ...lim.dist); let da = ang - gest.ang; if (da > Math.PI) da -= 2 * Math.PI; if (da < -Math.PI) da += 2 * Math.PI;
      g.az -= da; g.pol = clamp(g.pol - (my - gest.my) * .004, ...lim.pol); panBy(mx - gest.mx, 0); gest = { d, ang, mx, my }; lastInput = performance.now(); loop(); return; }
    if (drag) { const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY;
      if (!drag.moved && Math.abs(e.clientX - drag.sx) + Math.abs(e.clientY - drag.sy) > 4) { drag.moved = true; o.onHover?.(null); } if (!drag.moved) return;
      const now = performance.now(), dtm = Math.max(8, now - drag.lt); drag.lt = now; drag.lx = dx / dtm; drag.ly = dy / dtm;
      if (drag.pan) panBy(dx, dy); else { g.az -= dx * .0065; g.pol = clamp(g.pol - dy * .005, ...lim.pol); } lastInput = now; loop(); return; }
    if (o.onHover && e.pointerType !== "touch" && !hoverQ) hoverQ = requestAnimationFrame(() => { hoverQ = 0;
      const lab = o.labelHit && e.target.closest(o.labelHit); o.onHover(lab ? { label: lab } : pick(e.clientX, e.clientY)); }); });
  const up = e => { if (!P.has(e.pointerId)) return; P.delete(e.pointerId); if (P.size < 2) gest = null;
    if (drag) { if (!drag.moved) { const lab = o.labelHit && drag.target.closest?.(o.labelHit); o.onTap?.(lab ? { label: lab } : pick(e.clientX, e.clientY)); }
      else if (!drag.pan && !RM.matches) { vel.az = -drag.lx * 6.5; vel.pol = -drag.ly * 5; } } drag = null; loop(); };
  ev.addEventListener("pointerup", up); ev.addEventListener("pointercancel", up);
  ev.addEventListener("contextmenu", e => { if (active) e.preventDefault(); });
  ev.addEventListener("wheel", e => { if (!active) return; e.preventDefault(); lastInput = performance.now();
    const mouse = e.deltaMode === 1 || (!e.ctrlKey && e.deltaX === 0 && Math.abs(e.deltaY) >= 40 && Number.isInteger(e.deltaY));
    if (e.ctrlKey || mouse) g.dist = clamp(g.dist * Math.exp(e.deltaY * (e.ctrlKey ? .011 : .0013)), ...lim.dist);
    else if (e.shiftKey) panBy(-e.deltaX, -e.deltaY);
    else { g.az -= e.deltaX * .0042; g.pol = clamp(g.pol + e.deltaY * .0028, ...lim.pol); } loop(); }, { passive: false });

  const home = { ...g };
  return {
    scene, cam, R, sun, hemi, amb, ground,
    get W() { return W; }, get H() { return H; }, get state() { return st; }, get goal() { return g; },
    setActive(v) { active = v; cv.style.display = v ? "block" : "none"; if (v) { size(); loop(); } },
    onFrame(f) { frames.push(f); }, setPicks(a) { picks = a; }, loop, kick(ms) { anim = Math.max(anim, performance.now() + ms); loop(); },
    project(x, y, z) { tmp.set(x, y, z).project(cam); return { x: (tmp.x + 1) / 2 * W, y: (1 - tmp.y) / 2 * H, vis: tmp.z < 1 && tmp.z > -1 }; },
    fit(b, opt = {}) { const bw = b[2] - b[0], bd = b[3] - b[1], tv = Math.tan(cam.fov * Math.PI / 360), th = tv * (W / H), pol = opt.pol ?? g.pol;
      g.x = (b[0] + b[2]) / 2; g.z = (b[1] + b[3]) / 2 + bd * .04;
      g.dist = clamp(Math.max((bw / 2) / th, (bd * Math.cos(pol) * .5 + bd * .18) / tv) * (opt.pad || 1.02), ...lim.dist);
      if (opt.az != null) g.az = opt.az; if (opt.pol != null) g.pol = opt.pol; Object.assign(home, g); if (opt.snap) Object.assign(st, g); loop(); },
    snapTo(p) { Object.assign(st, p); Object.assign(g, p); loop(); }, to(p) { Object.assign(g, p); loop(); },
    rotate(d) { g.az += d; lastInput = performance.now(); loop(); }, tilt(d) { g.pol = clamp(g.pol + d, ...lim.pol); loop(); },
    zoom(f) { g.dist = clamp(g.dist * f, ...lim.dist); loop(); }, reset() { Object.assign(g, home); vel.az = vel.pol = 0; loop(); },
    fog(c) { scene.fog.color = new THREE.Color(c); },
    dispose() { cancelAnimationFrame(raf); ro.disconnect(); R.dispose(); cv.remove(); },
  };
}
```

**Nav pad:** six buttons in a 3 by 2 grid in the bottom right corner (about 38 × 36 px each), with a blurred, nearly opaque sheet background. Wire them to `rotate(±.35)`, `tilt(∓.16)`, `reset()` and `to({ pol: .1 })`. Repeat the four arrow buttons on a 180 ms interval while held. Stop pointer events on the pad from reaching the canvas.

**Name tags:** every frame, project each item's roof point with `project()`. Place tags with the rule-4 collision check. Cache each tag's width and height once, and only move tags with `transform: translate(...)`.

**Theme changes:** recolor materials and fog from the page's CSS variables. Read them once per theme change, not every frame.

## Check it before showing anyone

- Take screenshots headless with Playwright Chromium and these flags: `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader`. Without them WebGL is off in a headless browser.
- Script a drag (`mouse.down`, `move` with steps, `up`) and wheel events, then screenshot after each one. Confirm there are no page errors.
- Simulate a two-finger pinch with two pointer streams, or say plainly that touch was not tested on a real device.
- Check light, dark and phone width (390 px): tags readable, nothing overlapping the pad or legend, and the frame rate calm when idle (no loop running).
