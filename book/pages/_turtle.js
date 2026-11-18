// Shared pieces for the TURTLE DOJO branch (pages 19-24): the old sensei, the bowl, the sparrow,
// the shell floor and the interior / garden furniture. Everything is scaled in JS so line weight stays constant.
'use strict';
const R = require('../lib/rig');
const P = require('../lib/props');
const { shape, ink, tube, union, ell, rrect, line, poly, curve, xf, chain, tr, rot, sc, ap, inv, LW } = R;

let uid = 0;
const nid = p => `tt${p || ''}${++uid}${Math.random().toString(36).slice(2, 6)}`;
// clip a piece of art to a rectangle (ids are unique across the whole book)
function clipRect(x, y, w, h, inner, r = 0) {
  const id = nid('c');
  return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`;
}

function ik(a, t, l1, l2, bend) {
  let dx = t[0] - a[0], dy = t[1] - a[1], d = Math.hypot(dx, dy) || 0.001;
  const max = l1 + l2 - 0.5, min = Math.abs(l1 - l2) + 0.5;
  if (d > max) { dx *= max / d; dy *= max / d; d = max; }
  if (d < min) { dx *= min / d; dy *= min / d; d = min; }
  const A = Math.acos((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)), ang = Math.atan2(dy, dx) + bend * A;
  return [[a[0] + l1 * Math.cos(ang), a[1] + l1 * Math.sin(ang)], [a[0] + dx, a[1] + dy]];
}

/* ------------------------------------------------------------------------------------------------
 THE OLD SENSEI — tiny, round, wrinkled, hair in a bun, always seated cross-legged on a flat cushion.
 Seated she is ~210*s tall: exactly a standing brother at the same s.
 o: x, y (floor under her, centre), s, flip, dir 'front'|'left'|'right'|'back', lean, headTilt,
    expr (rig expression name or {eyes,brows,mouth}; default gentle closed-eye smile), look,
    armL / armR: {at:[X,Y]} page coords | {to:[x,y]} torso coords; + hand, hs, rot, over, thumb
    cushion:false to drop the cushion.
 returns String with .info {head, top, wristL, wristR}
------------------------------------------------------------------------------------------------ */
function sensei(o = {}) {
  const s = o.s || 1, flip = o.flip ? -1 : 1, dir = o.dir || 'front', back = dir === 'back';
  const pm = chain(tr(o.x || 0, o.y || 0), sc(flip * s, s));
  const tm = chain(pm, tr(0, -36), rot(o.lean || 0));          // torso frame: hip (0,0), neck (0,-72)
  const hm = chain(tm, tr(0, -106), rot(o.headTilt || 0));     // head centre
  const L = d => xf(d, pm), T = d => xf(d, tm), H = d => xf(d, hm);
  const itm = inv(tm);
  let out = '';

  // cushion
  if (o.cushion !== false) {
    out += shape(L('M-112 3Q-114 -9 -98 -9L98 -9Q114 -9 112 3Q114 15 98 15L-98 15Q-114 15 -112 3Z'));
    out += ink(L('M-100 3L100 3'), { w: LW.fine });
    out += ink(L('M-112 3L-124 9M112 3L124 9'), { w: LW.in });
  }
  // lap: crossed legs under the robe
  if (!back) out += shape(L(ell(-36, -3, 15, 8)), { w: LW.in }) + shape(L(ell(36, -3, 15, 8)), { w: LW.in });
  out += shape(L('M-86 -12C-90 -36 -52 -48 0 -46C52 -48 90 -36 86 -12C84 3 40 4 0 1C-40 4 -84 3 -86 -12Z'));
  if (!back) out += ink(L('M-64 -22Q-18 -36 24 -9')) + ink(L('M64 -22Q30 -33 6 -21'));

  // arms
  function arm(side, spec) {
    spec = spec || {};
    const sh = [side * 34, -60];
    let t = spec.at ? ap(itm, spec.at) : spec.to ? [side * spec.to[0], spec.to[1]] : [side * 55, -12];
    const [el, wr] = ik(sh, t, 30, 28, (spec.bend || 1) * (spec.at ? -side * flip * flip : -side));
    const p = [sh, el, wr].map(q => ap(tm, q));
    // kimono sleeve: fat tube + a pouch that hangs straight down from the forearm
    const drop = (spec.drop == null ? 20 : spec.drop) * s;
    const pouch = poly([p[1][0], p[1][1]], [p[2][0], p[2][1]], [p[2][0] * 0.85 + p[1][0] * 0.15, p[2][1] * 0.85 + p[1][1] * 0.15 + drop], [p[1][0] * 0.75 + p[2][0] * 0.25, p[1][1] * 0.75 + p[2][1] * 0.25 + drop * 0.8]);
    let a = union([{ d: pouch }, { d: line(...p), w: 23 * s }]);
    const type = spec.hand || 'mitt';
    if (type !== 'none') {
      const ang = spec.rot != null ? spec.rot : Math.atan2(p[2][1] - p[1][1], p[2][0] - p[1][0]) * 180 / Math.PI + 90;
      const hmx = chain(tr(p[2][0], p[2][1]), rot(ang), sc(s * (spec.hs || 0.95)), tr(0, 6));
      a = R.handAt(type, hmx, { side: (spec.thumb != null ? spec.thumb : -side) * flip }) + a; // cuff covers the wrist
      if (spec.handOver) a = a.slice(a.indexOf('<path', 0)) && (union([{ d: pouch }, { d: line(...p), w: 23 * s }]) + R.handAt(type, hmx, { side: (spec.thumb != null ? spec.thumb : -side) * flip }));
    }
    // sleeve hem line near the wrist
    return { svg: a, over: !!spec.over, behind: !!spec.behind, wrist: p[2] };
  }
  const aL = arm(-1, o.armL), aR = arm(1, o.armR);
  out += [aL, aR].filter(a => a.behind).map(a => a.svg).join('');

  // torso: a soft round robe
  out += shape(T('M-30 -70Q-45 -66 -49 -40Q-55 -8 -51 6Q0 14 51 6Q55 -8 49 -40Q45 -66 30 -70Q0 -77 -30 -70Z'));
  if (!back) {
    out += ink(T('M-15 -73L5 -33')) + ink(T('M15 -73L-3 -44'));
    out += ink(T('M-8 -73L8 -44'), { w: LW.fine });
    out += shape(T('M-52 -27Q0 -20 52 -27L52 -5Q0 3 -52 -5Z'), { w: LW.in });      // obi
    out += ink(T('M-52 -16Q0 -9 52 -16'), { w: LW.fine });
    out += shape(T(ell(0, -12, 7, 6)), { w: LW.in });                              // obi knot bead
  } else {
    out += ink(T('M-17 -72Q0 -60 17 -72'));
    out += shape(T('M-52 -27Q0 -20 52 -27L52 -5Q0 3 -52 -5Z'), { w: LW.in });
    out += shape(T(rrect(-21, -36, 42, 38, 7)), { w: LW.in });                     // flat drum knot
    out += ink(T('M-21 -17L21 -17'), { w: LW.fine });
    const c = ap(tm, [0, -50]);
    if (s >= 1.1) out += P.emblem('turtle', c[0], c[1], 20 * s);
  }
  out += [aL, aR].filter(a => !a.behind && !a.over).map(a => a.svg).join('');

  // head
  const pin = tube(H('M-27 -57L27 -41'), 2.6 * s, { o: LW.in }) + shape(H(ell(-29, -58, 5, 5)), { w: LW.in });
  const bun = pin + shape(H(ell(0, -49, 18, 15))) + ink(H('M-9 -52Q0 -58 9 -52'), { w: LW.fine });
  if (back) {
    out += shape(H(ell(-40, 5, 6, 9)), { w: LW.in }) + shape(H(ell(40, 5, 6, 9)), { w: LW.in });
    out += bun + shape(H(ell(0, 0, 42, 39)));
    out += ink(H('M-28 16Q-22 -16 -6 -34M28 16Q22 -16 6 -34M0 26L0 -8'), { w: LW.fine });
    out += ink(H('M-14 31Q0 37 14 31'), { w: LW.in });
  } else {
    const fdx = dir === 'left' ? -7 : dir === 'right' ? 7 : 0;
    out += shape(H(ell(-40, 5, 6, 9)), { w: LW.in }) + shape(H(ell(40, 5, 6, 9)), { w: LW.in });
    out += bun + shape(H(ell(0, 0, 41, 38)));
    const lookMap = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    let look = o.look || [0, 0]; if (typeof look === 'string') look = lookMap[look];
    const expr = o.expr || { eyes: 'happy', brows: 'neutral', mouth: 'smile' };
    out += R.face(chain(hm, sc(0.84)), expr, { dx: fdx * flip * flip, dy: 4, look: [look[0] * flip, look[1]] });
    const F = d => xf(d, chain(hm, tr(fdx, 0)));
    out += ink(F('M25 5L32 2M25 9L32 11M-25 5L-32 2M-25 9L-32 11'), { w: LW.fine });   // crow's feet
    out += ink(F('M-14 17Q-19 23 -16 30M14 17Q19 23 16 30'), { w: LW.fine });          // smile lines
    out += ink(F('M-3 13Q0 17 3 13'), { w: LW.fine });                                 // little nose
    out += ink(F('M-10 -16Q0 -19 10 -16'), { w: LW.fine });                            // forehead line
    // hair: centre parting swept up to the bun
    out += shape(H('M-42 -1C-46 -34 -22 -41 0 -41C22 -41 46 -34 42 -1C37 -12 22 -23 0 -25C-22 -23 -37 -12 -42 -1Z'), { w: LW.in });
    out += ink(H('M0 -41L0 -25'), { w: LW.fine }) + ink(H('M-21 -37Q-23 -28 -31 -19M21 -37Q23 -28 31 -19'), { w: LW.fine });
  }
  out += [aL, aR].filter(a => a.over).map(a => a.svg).join('');
  const res = new String(`<g class="fig fig-sensei">${out}</g>`);
  res.info = { head: ap(hm, [0, 0]), top: ap(hm, [0, -64]), wristL: aL.wrist, wristR: aR.wrist, neck: ap(tm, [0, -72]) };
  return res;
}

/* ---------- THE BOWL: shallow, wide. (x,y) = centre of the rim, w = rim width ---------- */
function bowl(x, y, w = 120, { rotDeg = 0, ripples = 2, water = true } = {}) {
  const m = chain(tr(x, y), rot(rotDeg), sc(w / 100)); const B = d => xf(d, m);
  let s = shape(B(rrect(-17, 25, 34, 9, 3)), { w: LW.in });
  s += shape(B('M-50 0C-47 24 -24 31 0 31C24 31 47 24 50 0Z'));
  s += ink(B('M-45 13Q0 30 45 13'), { w: LW.fine });
  s += shape(B(ell(0, 0, 50, 11)));
  if (water) {
    s += ink(B(ell(0, 1.5, 42, 7)), { w: LW.in });
    if (ripples > 0) s += ink(B(ell(-6, 1.5, 24, 3.8)), { w: LW.fine });
    if (ripples > 1) s += ink(B('M-13 1.5Q-6 -0.5 1 1.5'), { w: LW.fine });
  }
  return s;
}
// a closed water-drop; (x,y) = round end, pointing away along angDeg (0 = tail up)
function drop(x, y, size = 26, angDeg = 0) {
  const m = chain(tr(x, y), rot(angDeg), sc(size / 26));
  return shape(xf('M0 -24C5 -12 10 -6 10 2C10 9 5 13 0 13C-5 13 -10 9 -10 2C-10 -6 -5 -12 0 -24Z', m), { w: LW.in });
}

/* ---------- THE SPARROW. (x,y) = where the feet touch, size = body length. Faces right; flip to face left.
   pose: 'stand' | 'land' (wings up) | 'drink' (head dipped) | 'fly' ---------- */
function sparrow(x, y, size = 60, { flip = false, pose = 'stand', rotDeg = 0 } = {}) {
  const k = size / 100, f = flip ? -1 : 1;
  const m = chain(tr(x, y), sc(f * k, k), tr(0, -34), rot(rotDeg + (pose === 'drink' ? 24 : 0)));
  const S = d => xf(d, m);
  let s = '';
  const up = pose === 'land' || pose === 'fly';
  if (up) s += shape(S('M-18 -12C-40 -34 -40 -62 -26 -80C-10 -66 -2 -40 0 -14Z'), { w: LW.in });   // far wing
  if (pose !== 'fly') s += ink(xf('M-4 -14L-6 0M-6 0L-14 2M-6 0L2 2M8 -14L10 0M10 0L2 2M10 0L18 2', chain(tr(x, y), sc(f * k, k))), { w: LW.in });
  s += union([
    { d: S('M-24 -8L-64 -14L-58 4L-26 12Z') },
    { d: S(ell(0, 0, 31, 24)) },
    { d: S(ell(27, -19, 17, 16)) },
  ]);
  s += shape(S('M42 -25L57 -18L42 -12Z'), { w: LW.in });
  s += R.dot(...ap(m, [31, -22]), Math.max(2, 3.2 * k));
  if (size >= 50) s += ink(S('M13 -28Q27 -33 41 -27'), { w: LW.fine }) + ink(S('M-58 -5L-36 -1'), { w: LW.fine });
  if (up) s += shape(S('M-14 -8C-22 -36 -10 -64 10 -78C22 -58 20 -30 12 -8Z'), { w: LW.in }) + ink(S('M-6 -40Q4 -44 14 -42M-4 -24Q4 -28 14 -26'), { w: LW.fine });
  else s += shape(S('M-24 -8C-10 -19 10 -13 14 -1C4 12 -14 13 -32 5Z'), { w: LW.in }) + ink(S('M-18 2Q-6 5 6 -1'), { w: LW.fine });
  return s;
}
// a small floating feather
function feather(x, y, size = 34, rotDeg = 0) {
  const m = chain(tr(x, y), rot(rotDeg), sc(size / 34));
  return shape(xf('M0 17C-9 8 -9 -8 0 -17C9 -8 9 8 0 17Z', m), { w: LW.in }) + ink(xf('M0 22L0 -10', m), { w: LW.fine });
}

/* ---------- THE SHELL FLOOR: a huge round turtle shell painted on the boards, seen from ground level.
   (cx,cy) centre, rx/ry of the outer ring. ---------- */
function shellFloor(cx, cy, rx, ry) {
  const m = chain(tr(cx, cy), sc(rx, ry));
  const pt = (r, aDeg) => { const a = aDeg * Math.PI / 180; return ap(m, [r * Math.cos(a), r * Math.sin(a)]).map(R.r1); };
  let s = shape(xf(ell(0, 0, 1, 1), m));
  s += shape(xf(ell(0, 0, 0.87, 0.87), m), { w: LW.in });
  const c = 0.28, d3 = c * Math.sqrt(3), r7 = c * Math.sqrt(7);
  const hex = (ox, oy) => { const p = []; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; p.push(ap(m, [ox + c * Math.cos(a), oy + c * Math.sin(a)]).map(R.r1)); } return poly(...p); };
  let d = hex(0, 0);
  for (let k = 0; k < 6; k++) {
    const th = (30 + 60 * k) * Math.PI / 180;
    d += hex(d3 * Math.cos(th), d3 * Math.sin(th));
    const off = Math.atan2(c * 0.5, d3 + c * Math.cos(Math.PI / 6)) * 180 / Math.PI; // angle of the two outer corners
    for (const sg of [-1, 1]) d += line(pt(r7, 30 + 60 * k + sg * off), pt(0.87, 30 + 60 * k + sg * off));
  }
  return s + ink(d, { w: LW.in });
}

/* ---------- interior pieces ---------- */
// a little cloud-pruned pine in a round pot. (x,y) = centre of the pot's base, k = scale (1 = ~190 tall)
function pottedPine(x, y, k = 1, { flip = false } = {}) {
  const m = chain(tr(x, y), sc((flip ? -1 : 1) * k, k)); const M = d => xf(d, m);
  const pad = (px, py, q = 1) => shape(M(xf('M-42 10C-52 -4 -40 -20 -24 -18C-18 -34 8 -36 14 -22C32 -28 48 -12 40 2C44 10 38 12 30 12L-34 12Q-40 12 -42 10Z', chain(tr(px, py), sc(q))))) +
    ink(M(xf('M-22 2L-18 -8M-6 3L-6 -9M10 2L14 -8', chain(tr(px, py), sc(q)))), { w: LW.fine });
  let s = tube(M('M0 -44C-6 -70 22 -84 14 -112C10 -128 -8 -134 -12 -150'), 9 * k);
  s += tube(M('M12 -96Q30 -100 40 -112'), 6 * k);
  s += pad(-12, -158, 1) + pad(46, -118, 0.8) + pad(-34, -96, 0.72);
  s += shape(M('M-40 -44C-42 -18 -30 0 -18 0L18 0C30 0 42 -18 40 -44Z'));
  s += shape(M(rrect(-46, -52, 92, 13, 6)), { w: LW.in });
  s += ink(M('M-34 -22Q0 -12 34 -22'), { w: LW.fine });
  return s;
}
// wall of little wooden drawers filling (x,y,w,h)
function drawers(x, y, w, h, cols, rows) {
  let s = shape(rrect(x, y, w, h, 6));
  const dw = (w - 8) / cols, dh = (h - 8) / rows;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const dx = x + 4 + c * dw, dy = y + 4 + r * dh;
    s += shape(rrect(dx + 3, dy + 3, dw - 6, dh - 6, 5), { w: LW.in });
    s += shape(ell(dx + dw / 2, dy + dh / 2, 5.5, 5.5), { w: LW.in });
  }
  return s;
}
function cup(x, y, k = 1) { // (x,y) = centre of the base
  const M = d => xf(d, chain(tr(x, y), sc(k)));
  return shape(M('M-15 -26L-12 -3Q-11 0 -8 0L8 0Q11 0 12 -3L15 -26Z'), { w: LW.in }) + shape(M(ell(0, -26, 15, 4.5)), { w: LW.in });
}
function teapot(x, y, k = 1) { // (x,y) = centre of the base
  const M = d => xf(d, chain(tr(x, y), sc(k)));
  let s = ink(M('M-14 -52C-34 -78 34 -78 14 -52'), { w: LW.out });                // bamboo handle
  s += shape(M('M26 -30L48 -44L50 -36L32 -16Z'), { w: LW.in });                    // spout
  s += shape(M(ell(0, -24, 31, 24)));
  s += shape(M(ell(0, -46, 15, 4.5)), { w: LW.in }) + shape(M(ell(0, -53, 5, 4.5)), { w: LW.in });
  s += ink(M('M-26 -14Q0 -4 26 -14'), { w: LW.fine });
  return s;
}
// low round-edged tea table. (x,y) = centre of the table top surface, w = width
function teaTable(x, y, w = 190, { things = true } = {}) {
  let s = '';
  s += shape(`M${x - w / 2 + 16} ${y + 12}Q${x - w / 2 + 8} ${y + 40} ${x - w / 2 + 22} ${y + 50}L${x - w / 2 + 40} ${y + 50}Q${x - w / 2 + 36} ${y + 30} ${x - w / 2 + 44} ${y + 12}Z`);
  s += shape(`M${x + w / 2 - 16} ${y + 12}Q${x + w / 2 - 8} ${y + 40} ${x + w / 2 - 22} ${y + 50}L${x + w / 2 - 40} ${y + 50}Q${x + w / 2 - 36} ${y + 30} ${x + w / 2 - 44} ${y + 12}Z`);
  s += shape(rrect(x - w / 2 + 12, y + 8, w - 24, 16, 5), { w: LW.in });
  s += shape(rrect(x - w / 2, y - 6, w, 17, 8));
  if (things) {
    s += teapot(x - w * 0.2, y - 6, 1) + cup(x + w * 0.14, y - 6, 1) + cup(x + w * 0.36, y - 6, 1);
    s += ink(`M${x + w * 0.14} ${y - 44}q-7 -9 0 -17q7 -9 0 -17`, { w: LW.in });
  }
  return s;
}
// stone water basin with a bamboo spout. (x,y) = centre of the base, k = scale (1 = ~130 wide)
function basin(x, y, k = 1) {
  const M = d => xf(d, chain(tr(x, y), sc(k)));
  let s = tube(M('M58 0L58 -92'), 9 * k) + tube(M('M70 -80L14 -66'), 8 * k);          // bamboo post + spout
  s += drop(x + 8 * k, y - 44 * k, 13 * k);
  s += shape(M('M-58 -4C-66 -24 -60 -46 -44 -50C-20 -58 24 -58 44 -50C60 -46 64 -22 56 -4C40 4 -42 4 -58 -4Z'));
  s += shape(M(ell(0, -43, 38, 10)), { w: LW.in }) + ink(M(ell(2, -42, 20, 4.5)), { w: LW.fine });
  s += ink(M('M-40 -16Q-30 -10 -22 -16M18 -22Q28 -14 38 -20'), { w: LW.fine });
  return s;
}
// sliding paper door panel (shoji): (x,y,w,h), cols x rows of panes above a solid kick board
function shoji(x, y, w, h, cols = 2, rows = 4) {
  let s = shape(rrect(x, y, w, h, 3));
  const kb = Math.min(h * 0.2, 90), ph = (h - kb - 12) / rows, pw = (w - 16) / cols;
  let d = '';
  for (let c = 1; c < cols; c++) d += `M${R.r1(x + 8 + c * pw)} ${y + 8}L${R.r1(x + 8 + c * pw)} ${R.r1(y + h - kb - 4)}`;
  for (let r = 1; r < rows; r++) d += `M${x + 8} ${R.r1(y + 8 + r * ph)}L${x + w - 8} ${R.r1(y + 8 + r * ph)}`;
  s += shape(rrect(x + 8, y + 8, w - 16, h - kb - 12, 2), { w: LW.in }) + ink(d, { w: LW.in });
  s += shape(rrect(x + 8, y + h - kb + 2, w - 16, kb - 10, 2), { w: LW.in });
  return s;
}
// round bush made of three bumps; (x,y) = centre of its base
function bush(x, y, w = 90) {
  const k = w / 90;
  return shape(xf('M-45 0C-56 -16 -44 -34 -28 -32C-24 -52 8 -56 16 -38C36 -44 52 -22 42 -6Q46 0 40 0Z', chain(tr(x, y), sc(k)))) +
    ink(xf('M-18 -14Q-10 -22 -2 -14M10 -20Q18 -28 26 -20', chain(tr(x, y), sc(k))), { w: LW.fine });
}
/* The garden seen through an opening (x,y,w,h): sky, round trees, the garden wall with a tiled cap,
   bushes and stepping stones. wallY = top of the wall cap. `behind` = art drawn between sky and wall
   (e.g. the Great Hall); `front` = art drawn on the garden ground (basin, sparrows). */
function garden(x, y, w, h, { wallY, wallH = 78, behind = '', front = '', cloud = true, trees = true, stones = true, bushes = true } = {}) {
  wallY = wallY == null ? y + h * 0.42 : wallY;
  let s = '';
  if (cloud) s += P.cloud(x + w * 0.3, y + 56, 110);
  s += behind;
  if (trees) {
    s += tube(`M${x + w - 36} ${wallY + 10}L${x + w - 40} ${wallY - 50}`, 9);
    s += shape(xf('M-45 0C-56 -16 -44 -34 -28 -32C-24 -52 8 -56 16 -38C36 -44 52 -22 42 -6Q46 0 40 0Z', chain(tr(x + w - 40, wallY - 40), sc(1.25))));
  }
  // wall
  s += shape(rrect(x - 10, wallY + 14, w + 20, wallH, 0));
  s += ink(`M${x - 10} ${wallY + wallH}L${x + w + 10} ${wallY + wallH}`, { w: LW.fine });
  let cap = `M${x - 14} ${wallY + 20}`; const n = Math.max(3, Math.round((w + 28) / 44)), tw = (w + 28) / n;
  for (let i = 0; i < n; i++) cap += `Q${R.r1(x - 14 + (i + 0.5) * tw)} ${wallY + 34} ${R.r1(x - 14 + (i + 1) * tw)} ${wallY + 20}`;
  cap += `L${x + w + 14} ${wallY}L${x - 14} ${wallY}Z`;
  s += shape(cap);
  // ground
  const gy = wallY + 14 + wallH;
  if (bushes) s += bush(x + 50, gy + 6, 96);
  if (stones) s += shape(ell(x + w * 0.56, gy + (y + h - gy) * 0.62, 44, 13), { w: LW.in }) + shape(ell(x + w * 0.34, gy + (y + h - gy) * 0.3, 30, 9), { w: LW.in });
  s += front;
  return clipRect(x, y, w, h, s);
}
// wooden frame around an opening: two posts and a lintel
function doorFrame(x, y, w, h, t = 14) {
  return shape(rrect(x - t, y - t, w + 2 * t, t, 3)) + shape(rrect(x - t, y - t, t, h + t, 3)) + shape(rrect(x + w, y - t, t, h + t, 3));
}

module.exports = { sensei, bowl, drop, sparrow, feather, shellFloor, pottedPine, drawers, cup, teapot, teaTable, basin, shoji, bush, garden, doorFrame, clipRect };
