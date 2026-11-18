// Shared roof-drawing helpers for the ROOF CHASE pages (27-30) so the Great Hall roof looks the same everywhere.
// Matches P.greatHall: tiled planes, a ridge bar with round cap tiles and small horn ends, a crooked chimney.
'use strict';
const R = require('../lib/rig'), P = require('../lib/props');
const { shape, ink, tube, union, ell, rrect, line, poly, curve, xf, chain, tr, rot, sc, LW } = R;

let uid = 0;
const nid = () => 'roofclip' + (++uid);

// A tiled roof plane. pts = polygon [[x,y],...] in page coords (or a closed path string with opts.box=[x0,y0,x1,y1]).
// m = matrix for the tile grid (use R.chain(R.tr(..), skew...) to make rows follow a slope).
function plane(pts, { tw = 46, th = 34, m = R.I, outline = true, w = LW.out, box } = {}) {
  const id = nid(), im = R.inv(m);
  const d = typeof pts === 'string' ? pts : poly(...pts);
  const corners = typeof pts === 'string' ? [[box[0], box[1]], [box[2], box[1]], [box[2], box[3]], [box[0], box[3]]] : pts;
  const lp = corners.map(p => R.ap(im, p));
  const xs = lp.map(p => p[0]), ys = lp.map(p => p[1]);
  const x0 = Math.floor(Math.min(...xs) / tw) * tw - tw, x1 = Math.max(...xs) + tw;
  const y0 = Math.floor(Math.min(...ys) / (2 * th)) * 2 * th - 2 * th, y1 = Math.max(...ys) + th;
  let t = P.tiles(x0, y0, x1 - x0, y1 - y0, { tw, th });
  t = t.replace(/ d="([^"]+)"/g, (_, dd) => ` d="${xf(dd, m)}"`);
  let s = `<path d="${d}" fill="#fff"/>`;
  s += `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${t}</g>`;
  if (outline) s += ink(d, { w });
  return s;
}
// shear matrix: tile rows tilt so that x-axis follows a slope of `deg` (page degrees, + = down to the right)
const slopeM = (x, y, deg) => R.mul(tr(x, y), [1, Math.tan(deg * Math.PI / 180), 0, 1, 0, 0]);

// Ridge bar from p1 to p2 (its bottom edge), with round cap tiles on top and optional horn ends.
function ridge(p1, p2, { h = 30, capR = 20, horns = [true, true] } = {}) {
  const L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
  const m = chain(tr(p1[0], p1[1]), rot(Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180 / Math.PI));
  const X = d => xf(d, m);
  let s = '';
  const n = Math.max(1, Math.round(L / (capR * 2 + 6)));
  const step = L / n;
  for (let i = 0; i < n; i++) s += shape(X(ell(step * (i + 0.5), -h, capR, capR)), { w: LW.in });
  if (horns[0]) s += shape(X(`M8 0L-30 ${-h - 46}L34 ${-h}Z`));
  if (horns[1]) s += shape(X(`M${L - 8} 0L${L + 30} ${-h - 46}L${L - 34} ${-h}Z`));
  s += shape(X(poly([0, 0], [0, -h], [L, -h], [L, 0])));
  s += ink(X(line([6, -h / 2], [L - 6, -h / 2])), { w: LW.fine });
  return s;
}

// Eave edge from p1 to p2: a row of round tile ends over a board. r = tile-end radius.
function eave(p1, p2, { r = 16, board = 16 } = {}) {
  const L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
  const m = chain(tr(p1[0], p1[1]), rot(Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180 / Math.PI));
  const X = d => xf(d, m);
  let s = shape(X(poly([0, r * 0.5], [L, r * 0.5], [L, r * 0.5 + board], [0, r * 0.5 + board])), { w: LW.in });
  const n = Math.max(1, Math.round(L / (r * 2 + 5))), step = L / n;
  for (let i = 0; i < n; i++) s += shape(X(ell(step * (i + 0.5), 0, r, r)), { w: LW.in });
  return s;
}

// The crooked chimney. (x,y) = centre of its base, s = scale (1 => ~175 tall).
function chimney(x, y, s = 1, { lean = 6 } = {}) {
  const m = chain(tr(x, y), rot(lean), sc(s)), X = d => xf(d, m);
  let o = shape(X('M-36 6L-40 -70L-30 -150L34 -162L38 -74L36 6Z'));
  o += ink(X('M-39 -50L37 -56M-36 -100L36 -110M-2 -53L-1 -105M-20 2L-21 -51M16 2L17 -54M-16 -103L-14 -150M18 -108L19 -159'), { w: LW.in });
  o += shape(X('M-42 -146L44 -162L46 -184L-44 -168Z'));
  o += shape(X('M-22 -172L24 -180L22 -198L-20 -190Z'), { w: LW.in });
  return o;
}

// Paper lantern hanging from (x,y). s=1 => ~105 tall, 62 wide.
function lantern(x, y, s = 1, { rotDeg = 0 } = {}) {
  const m = chain(tr(x, y), rot(rotDeg), sc(s)), X = d => xf(d, m);
  let o = ink(X('M0 0L0 10'), { w: LW.in });
  o += ink(X('M0 92L0 108'), { w: LW.in });
  o += shape(X(ell(0, 50, 31, 36)));
  o += ink(X('M-28 36Q0 46 28 36M-28 64Q0 74 28 64'), { w: LW.fine });
  o += shape(X(rrect(-14, 8, 28, 10, 3)), { w: LW.in }) + shape(X(rrect(-12, 83, 24, 9, 3)), { w: LW.in });
  return o;
}
// A sagging string of lanterns from a to b. ts = positions along it (0..1).
function lanternString(a, b, sag, ts, s = 1) {
  const c = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + sag * 2];
  const at = t => [(1 - t) * (1 - t) * a[0] + 2 * t * (1 - t) * c[0] + t * t * b[0], (1 - t) * (1 - t) * a[1] + 2 * t * (1 - t) * c[1] + t * t * b[1]];
  let o = ink(`M${a[0]} ${a[1]}Q${c[0]} ${c[1]} ${b[0]} ${b[1]}`, { w: LW.out });
  for (const t of ts) { const p = at(t); o += lantern(R.r1(p[0]), R.r1(p[1]), s); }
  return o;
}

// A startled cat: back arched, tail up, facing picture-left (flip to face right). (x,y) = ground under it. s=1 => ~170 wide.
function cat(x, y, s = 1, { flip = false, rotDeg = 0 } = {}) {
  const m = chain(tr(x, y), rot(rotDeg), sc(flip ? -s : s, s)), X = d => xf(d, m);
  const k = s;
  let o = '';
  // tail (puffed) + legs + arched body share one outline
  o += union([
    { d: X(curve([[66, -78], [92, -104], [86, -140], [100, -176]])), w: 20 * k },
    { d: X('M-46 -50L-58 -6'), w: 17 * k }, { d: X('M-24 -46L-26 -4'), w: 17 * k },
    { d: X('M44 -46L40 -4'), w: 17 * k }, { d: X('M64 -50L74 -6'), w: 17 * k },
    { d: X('M-58 -52C-54 -104 4 -132 44 -112C78 -96 84 -66 76 -40L44 -38C28 -62 0 -64 -22 -38Z') },
  ]);
  // spiky fur along the arch
  o += ink(X('M-30 -112L-26 -128L-14 -120L-6 -138L6 -124L18 -138L26 -122L40 -130L44 -112'), { w: LW.in });
  // head
  o += shape(X('M-96 -92L-104 -126L-80 -108Z'), { w: LW.in }) + shape(X('M-44 -98L-40 -130L-62 -110Z'), { w: LW.in });
  o += shape(X(ell(-72, -76, 34, 30)));
  o += shape(X(ell(-86, -80, 8, 10)), { w: LW.fine }) + shape(X(ell(-62, -80, 8, 10)), { w: LW.fine });
  const p1 = R.ap(m, [-87, -79]), p2 = R.ap(m, [-63, -79]);
  o += R.dot(p1[0], p1[1], 3 * k) + R.dot(p2[0], p2[1], 3 * k);
  o += shape(X(ell(-75, -60, 6, 7)), { w: LW.fine });
  o += ink(X('M-98 -66L-122 -72M-98 -60L-122 -56M-50 -66L-28 -74M-50 -60L-28 -58'), { w: LW.fine });
  return o;
}

// A small puff of dust.
function puff(x, y, w = 50, rotDeg = 0) {
  const k = w / 60, m = chain(tr(x, y), rot(rotDeg), sc(k));
  return shape(xf('M-26 8C-36 6 -34 -10 -22 -9C-22 -22 -2 -24 2 -12C10 -22 28 -16 24 -4C34 -2 32 10 22 9Z', m), { w: LW.in });
}

// A loose roof tile (curved slab). (x,y) = centre.
function looseTile(x, y, s = 1, rotDeg = 0) {
  const m = chain(tr(x, y), rot(rotDeg), sc(s)), X = d => xf(d, m);
  return shape(X('M-32 -26L32 -26L32 4Q0 40 -32 4Z')) + ink(X('M-32 -14L32 -14'), { w: LW.in });
}

// Night sky: moon + stars. stars = [[x,y,r],...]
function sky(moon, stars = []) {
  let s = moon ? P.moon(moon[0], moon[1], moon[2] || 60) : '';
  for (const [x, y, r = 11] of stars) s += P.star(x, y, r);
  return s;
}

module.exports = { plane, slopeM, ridge, eave, chimney, lantern, lanternString, cat, puff, looseTile, sky };
