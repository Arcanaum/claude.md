// Shared Tiger Dojo pieces (pages 7-12): the big student, the barrel, rope, staffs, racks, banner, floor.
'use strict';
const R = require('../lib/rig');
const P = require('../lib/props');
const { shape, ink, tube, ell, rrect, line, xf, chain, tr, rot, sc, mul, ap, LW } = R;
const r1 = R.r1;

// ---------- helpers ----------
// densify a smooth curve through pts (Catmull-Rom)
function dense(pts, n = 10) {
  if (pts.length < 3) { const [a, b] = pts, o = []; for (let i = 0; i <= n; i++) o.push([a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]); return o; }
  const Q = [pts[0], ...pts, pts[pts.length - 1]], out = [];
  for (let i = 1; i < Q.length - 2; i++) {
    const [p0, p1, p2, p3] = [Q[i - 1], Q[i], Q[i + 1], Q[i + 2]];
    for (let j = 0; j < n; j++) {
      const t = j / n, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(k => 0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3)));
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}
// A twisted rope through pts. w = thickness.
function rope(pts, w = 12, { ticks = true, n = 10 } = {}) {
  const D = dense(pts, n).map(p => [r1(p[0]), r1(p[1])]);
  let s = tube(line(...D), w);
  if (!ticks) return s;
  let acc = 0, next = w * 0.7, d = '';
  for (let i = 1; i < D.length; i++) {
    const a = D[i - 1], b = D[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 0.001;
    while (acc + L >= next) {
      const f = (next - acc) / L, p = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
      const t = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], nn = [-t[1], t[0]];
      const h = w / 2, k = w * 0.32;
      d += `M${r1(p[0] + nn[0] * h - t[0] * k)} ${r1(p[1] + nn[1] * h - t[1] * k)}L${r1(p[0] - nn[0] * h + t[0] * k)} ${r1(p[1] - nn[1] * h + t[1] * k)}`;
      next += w * 1.25;
    }
    acc += L;
  }
  return s + ink(d, { w: LW.fine });
}
// A coil of spare rope lying on the floor. (x,y) centre.
function coil(x, y, rx = 46, w = 11) {
  let s = '';
  const ry = rx * 0.42;
  for (let i = 0; i < 3; i++) {
    const pts = []; const yy = y - i * w * 0.95, rr = rx - i * 2;
    for (let a = 0; a < 360; a += 30) pts.push([x + rr * Math.cos(a * Math.PI / 180), yy + ry * Math.sin(a * Math.PI / 180)]);
    pts.push(pts[0]);
    s += rope(pts, w, { n: 4 });
  }
  s += shape(ell(x, y - 2 * w * 0.95, rx - 14, ry - 7), { w: LW.in });
  s += rope([[x + rx - 6, y + 4], [x + rx + 22, y + 16], [x + rx + 40, y + 6]], w, { n: 6 });
  return s;
}

// A wooden staff from a to b.
function staff(a, b, w = 11) {
  let s = tube(line(a, b), w);
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]), t = [(b[0] - a[0]) / L, (b[1] - a[1]) / L], n = [-t[1], t[0]];
  for (const f of [16, L - 16]) {
    const p = [a[0] + t[0] * f, a[1] + t[1] * f];
    s += ink(line([r1(p[0] + n[0] * w / 2), r1(p[1] + n[1] * w / 2)], [r1(p[0] - n[0] * w / 2), r1(p[1] - n[1] * w / 2)]), { w: LW.fine });
  }
  return s;
}
// End-on staff used as a roller under the barrel (a short log seen at an angle).
function roller(x, y, len = 150, w = 16) {
  let s = tube(line([x - len / 2, y], [x + len / 2, y]), w);
  s += shape(ell(x + len / 2, y, w * 0.34, w / 2), { w: LW.in });
  s += ink(line([x - len / 2 + 14, y - w / 2], [x - len / 2 + 14, y + w / 2]), { w: LW.fine });
  return s;
}

// Wall rack of staffs. (x,y) top-left of the rack; n staffs.
function rack(x, y, w, h, n = 5) {
  let s = '';
  // back rails
  s += shape(rrect(x, y + h * 0.18, w, 22, 4)) + shape(rrect(x, y + h * 0.72, w, 22, 4));
  const gap = w / (n + 0.4);
  for (let i = 0; i < n; i++) {
    const sx = x + gap * (i + 0.7);
    s += staff([sx, y], [sx, y + h], 12);
  }
  // front keepers (pegs) so the staffs sit "in" the rack
  for (let i = 0; i < n; i++) {
    const sx = x + gap * (i + 0.7);
    for (const fy of [0.18, 0.72]) s += shape(rrect(sx - 12, y + h * fy + 4, 24, 14, 4), { w: LW.in });
  }
  // bolts
  for (const fy of [0.18, 0.72]) s += R.dot(x + 9, y + h * fy + 11, 2.6) + R.dot(x + w - 9, y + h * fy + 11, 2.6);
  return s;
}

// Hanging tiger banner. (x,y) = top centre of the pole, w x h cloth.
function banner(x, y, w, h, { cords = true, emblemSize } = {}) {
  let s = '';
  if (cords) s += rope([[x - w * 0.36, y], [x - w * 0.36, y - 400]], 7, { n: 12 }) + rope([[x + w * 0.36, y], [x + w * 0.36, y - 400]], 7, { n: 12 });
  const top = y + 6;
  s += shape(`M${x - w / 2} ${top}L${x + w / 2} ${top}L${x + w / 2} ${top + h}L${x} ${top + h - w * 0.22}L${x - w / 2} ${top + h}Z`);
  // wide square border stripe
  const b = Math.max(16, w * 0.09);
  s += ink(`M${x - w / 2 + b} ${top + 14}L${x - w / 2 + b} ${top + h - b * 1.9}L${x} ${top + h - w * 0.22 - b * 1.2}L${x + w / 2 - b} ${top + h - b * 1.9}L${x + w / 2 - b} ${top + 14}`);
  s += P.emblem('tiger', x, top + (h - w * 0.2) * 0.5, emblemSize || w * 0.62);
  // pole with square end caps
  s += tube(line([x - w / 2 - 22, y], [x + w / 2 + 22, y]), 14);
  s += shape(rrect(x - w / 2 - 34, y - 13, 18, 26, 4), { w: LW.in }) + shape(rrect(x + w / 2 + 16, y - 13, 18, 26, 4), { w: LW.in });
  return s;
}

// Floorboards receding from a horizon line y0 down to y1 (low camera: boards fan out).
function boards(y0, y1, { W = 720, n = 9, vx = 360, cross = true } = {}) {
  let d = '';
  for (let i = 0; i <= n; i++) {
    const xb = -500 + (W + 1000) * i / n;
    const xt = vx + (xb - vx) * 0.32;
    d += `M${r1(xt)} ${y0}L${r1(xb)} ${y1}`;
  }
  let s = ink(d, { w: LW.fine });
  if (cross) s += ink(`M-10 ${y0}L${W + 10} ${y0}`, { w: LW.out });
  return s;
}
// A floor mat (flat parallelogram) with woven texture. Corners: back-left (x,y), width w, depth d, skew k.
function mat(x, y, w, d, k = 40, { weave = 9 } = {}) {
  const A = [x, y], B = [x + w, y], C = [x + w + k, y + d], D = [x - k, y + d];
  let s = shape(R.poly(A, B, C, D));
  const e = 0.07;
  const lerp = (p, q, t) => [r1(p[0] + (q[0] - p[0]) * t), r1(p[1] + (q[1] - p[1]) * t)];
  // border band
  const a = lerp(lerp(A, D, 0.16), lerp(B, C, 0.16), e), b = lerp(lerp(A, D, 0.16), lerp(B, C, 0.16), 1 - e);
  const c = lerp(lerp(A, D, 0.84), lerp(B, C, 0.84), 1 - e), dd = lerp(lerp(A, D, 0.84), lerp(B, C, 0.84), e);
  s += ink(R.poly(a, b, c, dd));
  let t = '';
  for (let i = 1; i < weave; i++) { const f = e + (1 - 2 * e) * i / weave; const p = lerp(lerp(A, D, 0.16), lerp(B, C, 0.16), f), q = lerp(lerp(A, D, 0.84), lerp(B, C, 0.84), f); t += `M${p[0]} ${p[1]}L${q[0]} ${q[1]}`; }
  s += ink(t, { w: LW.fine });
  return s;
}

// ---------- the barrel ----------
// Big wooden training barrel. (x,y) = bottom centre, w = widest width, h = height. Rope handle arches over the top.
function barrel(x, y, w = 190, h = 250, { handle = true, tilt = 0 } = {}) {
  const m = chain(tr(x, y), rot(tilt));
  const T = d => xf(d, m);
  const wt = w * 0.39, c = w * 0.61;     // half-width at ends, bezier control (bulge)
  const hw = t => (1 - t) * (1 - t) * wt + 2 * t * (1 - t) * c + t * t * wt;
  const yy = t => -h + h * t;
  let s = '';
  const sag = 13;
  if (handle) { // rope handle behind the rim, over the top
    const pts = [[-wt + 8, -h + 4], [-wt * 0.86, -h - 60], [0, -h - 92], [wt * 0.86, -h - 60], [wt - 8, -h + 4]].map(p => ap(m, p));
    s += rope(pts, 15);
  }
  s += shape(T(`M${-wt} ${-h}Q${-c} ${-h / 2} ${-wt} 0Q0 ${sag * 1.5} ${wt} 0Q${c} ${-h / 2} ${wt} ${-h}Q0 ${-h + sag} ${-wt} ${-h}Z`));
  // staves
  let d = '';
  for (const f of [-0.62, -0.22, 0.22, 0.62]) d += `M${r1(wt * f)} ${r1(-h + sag * 0.5 * (1 - f * f) + 2)}Q${r1(c * f)} ${-h / 2} ${r1(wt * f)} ${r1(sag * 0.75 * (1 - f * f))}`;
  s += ink(T(d));
  // wood grain
  s += ink(T(`M${-wt * 0.42} ${-h * 0.58}Q${-wt * 0.47} ${-h * 0.5} ${-wt * 0.42} ${-h * 0.42}M${wt * 0.02} ${-h * 0.64}Q${wt * 0.06} ${-h * 0.55} ${wt * 0.02} ${-h * 0.47}M${wt * 0.86} ${-h * 0.56}Q${wt * 0.92} ${-h * 0.48} ${wt * 0.87} ${-h * 0.4}M${-wt * 0.95} ${-h * 0.6}Q${-wt * 1.02} ${-h * 0.52} ${-wt * 0.96} ${-h * 0.45}`), { w: LW.fine });
  s += shape(T(ell(wt * 0.42, -h * 0.5, 5, 8)), { w: LW.fine });
  // lid (top) ellipse
  s += shape(T(ell(0, -h, wt, sag)));
  s += ink(T(ell(0, -h, wt - 9, sag - 5)), { w: LW.fine });
  // hoops
  for (const [t1, t2] of [[0.15, 0.27], [0.73, 0.85]]) {
    const a = hw(t1) + 3, b = hw(t2) + 3, y1 = yy(t1), y2 = yy(t2);
    s += shape(T(`M${r1(-a)} ${r1(y1)}Q0 ${r1(y1 + sag * 1.5)} ${r1(a)} ${r1(y1)}L${r1(b)} ${r1(y2)}Q0 ${r1(y2 + sag * 1.5)} ${r1(-b)} ${r1(y2)}Z`), { w: LW.in });
    for (const f of [-0.55, 0, 0.55]) { const p = ap(m, [a * f, (y1 + y2) / 2 + sag * 0.75 * (1 - f * f)]); s += R.dot(p[0], p[1], 3); }
  }
  if (handle) { // knots where the handle is tied on
    for (const sx of [-1, 1]) { const p = ap(m, [sx * (wt - 8), -h + 4]); s += shape(ell(r1(p[0]), r1(p[1]), 11, 10), { w: LW.in }); }
  }
  return s;
}
barrel.hw = (w, t) => { const wt = w * 0.39, c = w * 0.61; return (1 - t) * (1 - t) * wt + 2 * t * (1 - t) * c + t * t * wt; };

// ---------- the big student ----------
// Square-jawed head with a round top-bun, thick brows and a nose (no triplet has a nose).
function headStudent(hm0, o) {
  const hm = mul(hm0, tr(0, 6));
  const T = d => xf(d, hm); let s = '';
  // neck
  s += shape(T('M-21 28L-24 62Q0 70 24 62L21 28Z'));
  if (o.dir === 'back') {
    s += shape(T(ell(0, -58, 16, 14)));
    s += shape(T('M-41 -28Q-44 -48 0 -48Q44 -48 41 -28L43 14Q41 38 20 46L-20 46Q-41 38 -43 14Z'));
    s += shape(T(rrect(-10, -50, 20, 8, 3)), { w: LW.in });
    return s;
  }
  s += shape(T(ell(-45, 4, 7, 11)), { w: LW.in }) + shape(T(ell(45, 4, 7, 11)), { w: LW.in });
  s += shape(T(ell(0, -60, 17, 15)));                                        // bun
  s += shape(T('M-41 -28Q-44 -48 0 -48Q44 -48 41 -28L43 14Q41 38 20 46L-20 46Q-41 38 -43 14Z')); // square head
  s += R.face(hm, o.expr, { dx: o.fdx, dy: o.fdy - 3, look: o.look });
  const fm = mul(hm, tr(o.fdx || 0, (o.fdy || 0) - 3));
  const F = d => xf(d, fm);
  // thick brows over the rig brows
  s += shape(F('M-28 -17L-8 -11L-8 -4L-28 -9Z'), { w: LW.fine, fill: '#000' }) + shape(F('M28 -17L8 -11L8 -4L28 -9Z'), { w: LW.fine, fill: '#000' });
  s += ink(F('M-5 13Q0 21 6 13'));                                           // nose
  // hairline cap + bun tie
  s += shape(T('M-42 -20Q-45 -49 0 -49Q45 -49 42 -20Q22 -33 0 -33Q-22 -33 -42 -20Z'));
  s += shape(T(rrect(-11, -53, 22, 9, 3)), { w: LW.in });
  // sideburns
  s += ink(T('M-42 -20L-38 -4M42 -20L38 -4'));
  return s;
}
const SB = { sw: 47, hem: 40, belly: 5, TL: 74, th: 36, sh: 34, armU: 34, armF: 31, armW: 28, legW: 31, hipW: 20, head: headStudent, hand: 'fist', apron: null, extra: null };

// Big bare foot seen from the side. (ax,ay) = ankle; dirSign = +1 toes to picture right.
function bigFoot(ax, ay, k, dirSign = 1, rotDeg = 0) {
  const m = chain(tr(ax, ay), rot(rotDeg), sc(dirSign * k, k));
  let s = shape(xf('M-17 -14L15 -14Q42 -6 47 8Q48 19 36 19L-14 19Q-23 19 -21 4Z', m));
  s += ink(xf('M30 19L30 9M38 18L38 9', m), { w: LW.fine });
  return s;
}
// Big bare foot seen from the front (toes toward us).
function frontFoot(ax, ay, k, rotDeg = 0) {
  const m = chain(tr(ax, ay), rot(rotDeg), sc(k));
  let s = shape(xf('M-17 -12L17 -12L22 10Q22 20 12 20L-12 20Q-22 20 -22 10Z', m));
  s += ink(xf('M-11 20L-11 11M-3 20L-3 10M5 20L5 10M13 20L13 11', m), { w: LW.fine });
  return s;
}
// Sole of a raised foot, coming at the viewer. (x,y) centre of the sole, k scale.
function sole(x, y, k, rotDeg = 0) {
  const m = chain(tr(x, y), rot(rotDeg), sc(k));
  let s = shape(xf('M-20 -22C-26 -4 -22 26 -8 34C6 40 20 30 22 10C24 -4 22 -16 18 -24C8 -34 -12 -34 -20 -22Z', m));
  [[-18, -36, 6], [-7, -42, 6.5], [5, -43, 7], [17, -38, 8.5]].forEach(([tx, ty, tr_]) => { s += shape(xf(ell(tx, ty, tr_, tr_ + 1.5), m), { w: LW.in }); });
  s += ink(xf('M-12 -8Q0 -2 14 -10M-8 16Q0 20 10 14', m), { w: LW.fine });
  return s;
}

/* student(o): same options as the rig figures, plus footL / footR = 'side' | 'front' | 'none' (default 'front'),
   footDirL / footDirR = ±1 for side feet. Height ≈ 245·s. */
function student(o = {}) {
  const f = R.figure({ who: 'guu', build: SB, headScale: 0.74, hs: 1.55, expr: 'serious', ...o });
  const s = o.s || 1; let out = String(f);
  const foot = (kind, an, dirSign, r) => kind === 'none' ? '' : kind === 'side' ? bigFoot(an[0], an[1], s, dirSign, r || 0) : frontFoot(an[0], an[1], s, r || 0);
  const flip = o.flip ? -1 : 1;
  out += foot(o.footL || 'front', f.info.ankleL, (o.footDirL || -1) * flip, o.footRotL);
  out += foot(o.footR || 'front', f.info.ankleR, (o.footDirR || 1) * flip, o.footRotR);
  const res = new String(out); res.info = f.info; return res;
}

module.exports = { dense, rope, coil, staff, roller, rack, banner, boards, mat, barrel, student, sole, bigFoot, frontFoot, SB };
