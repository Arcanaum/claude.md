# Drawing guide — Guu, Choki, Paa and the Ninja on the Roof

Coloring book for ages 6–8, Amazon KDP paperback, 8.5 × 11 in, black line art on white, printed one-sided.
Every page is code: `pages/pNN.js` returns SVG for the art box; `story.js` holds the final text (do not edit it);
`build.js` lays the page out. `lib/rig.js` (R) draws the characters, `lib/props.js` (P) the shared props.

## Page file

```js
// pages/p07.js
module.exports.art = (R, P, { W, H, page }) => {   // W = 720, H = page.artH (default 690). 100 units = 1 inch.
  let s = '';
  // background first, then things in front (painter's order — every shape has an opaque white fill)
  return s;
};
```

Render and LOOK at it (Read the PNG) after every change: `node build.js --only 7` → `out/preview/p07.png`.
Add `--scale 2` for a sharper preview. Iterate until it reads clearly; expect 3–6 rounds per page.

- Framed pages (default) are clipped to a rounded frame: draw right to the edges (even past them) so the scene fills the box.
  Unframed pages (`frame:false` in story.js: 1, 2, 3, 6, 32) must keep all art inside 0..W × 0..H.
- Branch pages have a hand badge overlapping the top-right corner of the art box: keep faces and key props
  out of the region x > 610, y < 110.
- No text in the art except sound effects / titles as hollow letters via `P.hollow(...)`. Story text is added by the build.

## Coloring-book rules (hard)

- Pure black lines on white. No grey, no gradients, no opacity, no filters, no hatching-as-shading.
- Use the emitters so line weight is consistent: `R.shape` (closed colourable region, heavy outline 4.2),
  `R.ink` (interior line 2.8, `{w:R.LW.fine}` = 1.9 for texture), `R.tube` (outlined limb/rope/pole/branch),
  `R.union` (several pieces sharing one outline). Never go thinner than 1.9.
- Every region a child is meant to color must be CLOSED and at least ~25 units across (a fingertip). Texture lines
  (wood grain, tile rows, mat weave) are fine as open lines. Small solid-black dots (pupils) are OK; no large black fills.
- Density must match the page's label: OPEN = 1–2 figures, big simple shapes, lots of white, almost no background.
  MEDIUM = figures + 1–2 props + partial background. BUSY = full environment with pattern and texture.
- Figures should be BIG: main characters typically `s` 1.3–2.4 (a brother is ~205·s units tall, ~95·s wide incl. hair).
- The three brothers are **dwarf-sized**: waist-high to adults. Adults tower (3–4× their height on the page, often cropped
  by the frame) — except the Turtle sensei, who is seated at their eye level.

## Characters (R)

`R.guu(o)`, `R.choki(o)`, `R.paa(o)`, `R.girl(o)` → SVG string (also has `.info` with page coords of
`wristL, wristR, ankleL, ankleR, head, top, hip, neck`). Never redraw the brothers by hand; always use the rig.

Told apart by silhouette: **Guu** wide, spiky hair, headband with knot, belt pouch, default hands = fists.
**Choki** narrow, topknot + jagged fringe, long sash tail, default hands = two fingers. **Paa** round, hood, side bag,
default hands = open palms. **Girl** (pages 26–32 only): a head taller, bob hair with side tail, plain black-ninja suit
with wrapped arms/legs, `mask:true` = scarf over nose and mouth. She is NEVER steady: always wobbling on one leg.
Guu carries the lost hood tucked in his belt automatically (`carryHood:false` to remove — pages 1–4 and 32).

Options (all optional):

| option | meaning |
|---|---|
| `x, y` | where the feet stand (page coords). `s` scale. `flip:true` mirror. `spin` rotate whole figure (deg, about the feet). |
| `dir` | `'front'` (default), `'left'`/`'right'` (face turned), `'back'` (seen from behind). |
| `lean` | torso+head lean in degrees (+ = toward picture right). `headTilt` extra head tilt. `crouch` lowers hips by N units (knees bend). `shift` moves hips sideways. |
| `expr` | happy, grin, determined, serious, surprised, worried, doubtful, strain, laugh, calm, sad, shout, whisper, ouch, smirk — or `{eyes, brows, mouth}`. |
| `look` | `'up'|'down'|'left'|'right'` or `[dx,dy]` (−1..1) pupil direction. |
| `armL`, `armR` | L = the arm on the picture-left side (before flip). One of: `{a:[A,B]}` angles: A = upper arm from hanging straight down, swinging outward (90 = straight out sideways, 180 = straight up), B = extra elbow bend the same way (negative folds the forearm back inward/across the body); `{to:[dx,dy]}` hand target relative to the shoulder, dx>0 = outward, dy<0 = up (reach ≈ 48); `{at:[X,Y]}` hand target in page coords (reach ≈ 48·s from the shoulder — it clamps). Extras: `hand:'fist'|'v'|'palm'|'point'|'mitt'|'grip'|'none'`, `hs` hand size multiplier, `rot` hand rotation in page degrees (0 = fingers up), `thumb:1|-1`, `behind:true` (draw behind body), `over:true` (draw in front of the head — use it whenever a raised hand should not be hidden by the head), `bend:-1` flip elbow direction. |
| `legL`, `legR` | `{foot:[x,y]}` ankle position in figure-local units (origin between the feet, y<0 up; default `[∓(hip+3), -6]`), or `{a:[A,B]}` angles like arms, or `{at:[X,Y]}` page coords. Extras: `footRot`, `behind`, `bend:-1`. |
| `colors` | only for the cover. Interior stays white. |

Tips: sitting/kneeling = `crouch` 30–50 with feet moved out; running = `lean` 15–25 with one leg `{a:[40,-70]}` and the other
`{a:[-30,30]}`; crawling/lying = `spin` ±70–90 plus arm/leg targets. Hands are big on purpose; make the janken hand the
clearest thing on the figure. Use `.info.wristR` etc. to attach ropes, bowls, props exactly at a hand.

Standalone hands: `R.hand(type, x, y, size, {rotDeg, side, cuff})` — (x,y) = centre.

Geometry helpers: `R.line(...pts)`, `R.poly(...pts)`, `R.ell(cx,cy,rx,ry)`, `R.rrect(x,y,w,h,r)`, `R.curve(pts, closed)`,
`R.xf(d, matrix)` with `R.chain(R.tr(x,y), R.rot(deg), R.sc(k))`. Paths passed to `R.xf` may use only absolute `M L C Q Z`.
Plain SVG (`<path>`, `<circle>`, `<clipPath>`, `<g clip-path>`) is fine too — keep strokes black, fills `#fff`, round joins.

## Shared props (P) — use these, do not redraw

`P.hollow(text,x,y,size,{rotDeg,anchor})` hollow block letters · `P.label(...)` solid caption text (use sparingly) ·
`P.lostHood(x,y,size,{rotDeg})` · `P.greatHall(x,y,w,{body})` the tall roof where the girl practises (see below) ·
`P.dojoMini(kind,x,y,w)` small far-away dojo with banner, kind = tiger|crane|turtle · `P.emblem(kind,x,y,size)` the dojo's
animal emblem (use it on banners, scrolls, floors — same emblem at any size) · `P.tiles(x,y,w,h,{tw,th})` roof-tile rows ·
`P.moon`, `P.star`, `P.cloud` · `P.pine(pts,{w,fans})`, `P.needles(x,y,r,angDeg)` · `P.thread`, `P.paperCrane`, `P.bell` (the clues).

## Story facts that must stay consistent

- Geography: one tall pine; below it three dojos side by side — Tiger (left), Crane (middle), Turtle (right) — and behind
  them, taller than all three, the **Great Hall** (`P.greatHall`). The girl practises on the Great Hall roof.
- Time: pages 1–25 are DAYTIME (no moon or stars). Pages 26–32 are night (moon, stars).
- The hood: found on p.4, in Guu's belt from p.5 to p.31, handed back on p.32.
- The girl wears a mask-scarf (her hood is the lost one) on 26 and 28–30; she pulls it down on 31; unmasked on 32.
  No name, crest or badge on her anywhere.
- Pages 12, 18, 24 each show the same `P.greatHall(...)` roofline through a window/door.
- Hidden hand-shapes, drawn prominently but never labelled: p.11 Guu's pulling hand = tight fist; p.17 Paa's flat open
  palm chopping down for "GO!"; p.23 Choki scratching Paa's nose with two fingers.
- Each dojo feels different. Tiger: loud, wide, square, thick; low camera; big male student; tiger banner, wall racks of staffs.
  Crane: silent, tall, narrow, thin; tall frames; tall female student; rice-paper window grids, long crane scroll.
  Turtle: warm, low, round; ground-level camera; tiny old female sensei (seated, brothers' height); hexagon shell floor, garden.

## Done means

Each page: renders without error, matches its brief and density, brothers identifiable by silhouette, nothing important
cut by the frame or hidden under the corner badge, no overlapping muddle of figures, no tiny uncolorable slivers as the
main subject, and you have looked at the final PNG yourself. Do not edit `lib/`, `story.js` or `build.js` (other artists
are using them at the same time) — if something there is broken or missing, work around it in your page file and report it.
