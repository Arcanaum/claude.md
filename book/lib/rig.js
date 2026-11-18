// Guu Choki Paa — shared drawing rig.
// Everything is plain SVG strings. 100 units = 1 inch. Geometry is scaled in JS (not with
// SVG transforms) so line weight stays constant at any figure size.
'use strict';

const LW = { out: 4.2, in: 2.8, fine: 1.9 }; // ~3pt, 2pt, 1.4pt at print size
const INK = '#000';
const rad = d => d * Math.PI / 180;
const r1 = n => Math.round(n * 10) / 10;

// ---------- matrices: [a,b,c,d,e,f]  x' = a*x + c*y + e, y' = b*x + d*y + f ----------
const I = [1, 0, 0, 1, 0, 0];
const mul = (m, n) => [
  m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1],
  m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
  m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]];
const tr = (x, y) => [1, 0, 0, 1, x, y];
const rot = deg => { const c = Math.cos(rad(deg)), s = Math.sin(rad(deg)); return [c, s, -s, c, 0, 0]; };
const sc = (x, y = x) => [x, 0, 0, y, 0, 0];
const chain = (...ms) => ms.reduce(mul, I);
const ap = (m, p) => [m[0] * p[0] + m[2] * p[1] + m[4], m[1] * p[0] + m[3] * p[1] + m[5]];
const inv = m => {
  const det = m[0] * m[3] - m[1] * m[2];
  const a = m[3] / det, b = -m[1] / det, c = -m[2] / det, d = m[0] / det;
  return [a, b, c, d, -(a * m[4] + c * m[5]), -(b * m[4] + d * m[5])];
};
const mscale = m => Math.sqrt(Math.abs(m[0] * m[3] - m[1] * m[2]));

// Transform a path that uses only absolute M L C Q Z commands.
function xf(d, m) {
  const t = d.match(/[MLCQZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) || [];
  let out = '', i = 0;
  while (i < t.length) {
    const k = t[i];
    if (/[MLCQZ]/i.test(k)) { out += k.toUpperCase(); i++; continue; }
    const p = ap(m, [parseFloat(t[i]), parseFloat(t[i + 1])]);
    out += r1(p[0]) + ' ' + r1(p[1]) + ' '; i += 2;
  }
  return out.trim();
}

// ---------- path builders (absolute commands only) ----------
const line = (...pts) => 'M' + pts.map(p => p[0] + ' ' + p[1]).join('L');
const poly = (...pts) => line(...pts) + 'Z';
function ell(cx, cy, rx, ry = rx) {
  const k = 0.5523;
  return `M${cx - rx} ${cy}C${cx - rx} ${cy - ry * k} ${cx - rx * k} ${cy - ry} ${cx} ${cy - ry}` +
    `C${cx + rx * k} ${cy - ry} ${cx + rx} ${cy - ry * k} ${cx + rx} ${cy}` +
    `C${cx + rx} ${cy + ry * k} ${cx + rx * k} ${cy + ry} ${cx} ${cy + ry}` +
    `C${cx - rx * k} ${cy + ry} ${cx - rx} ${cy + ry * k} ${cx - rx} ${cy}Z`;
}
function rrect(x, y, w, h, r = 6) {
  r = Math.min(r, w / 2, h / 2);
  return `M${x + r} ${y}L${x + w - r} ${y}Q${x + w} ${y} ${x + w} ${y + r}L${x + w} ${y + h - r}` +
    `Q${x + w} ${y + h} ${x + w - r} ${y + h}L${x + r} ${y + h}Q${x} ${y + h} ${x} ${y + h - r}` +
    `L${x} ${y + r}Q${x} ${y} ${x + r} ${y}Z`;
}
// smooth open curve through points (Catmull-Rom -> cubic)
function curve(pts, closed = false) {
  if (pts.length < 3) return line(...pts);
  const P = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M${P[1][0]} ${P[1][1]}`;
  for (let i = 1; i < P.length - 2; i++) {
    const [p0, p1, p2, p3] = [P[i - 1], P[i], P[i + 1], P[i + 2]];
    d += `C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ` +
      `${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`;
  }
  return d + (closed ? 'Z' : '');
}

// ---------- emitters ----------
// A closed, colourable shape with an outline.
const shape = (d, { fill = '#fff', w = LW.out, stroke = INK } = {}) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
// An interior / detail line.
const ink = (d, { w = LW.in, stroke = INK, dash } = {}) =>
  `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const dot = (x, y, r) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="${INK}"/>`;
// An outlined "tube" (limb, rope, branch, finger) along path d: width w, outline o.
const tube = (d, w, { fill = '#fff', o = LW.out, cap = 'round' } = {}) =>
  `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${r1(w + 2 * o)}" stroke-linecap="${cap}" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="${fill}" stroke-width="${r1(w)}" stroke-linecap="${cap}" stroke-linejoin="round"/>`;
// Several pieces merged into one silhouette with a single shared outline.
// item: {d, w} = tube of width w ; {d} = filled closed shape ; optional fill per item.
function union(items, { o = LW.out, fill = '#fff' } = {}) {
  let a = '', b = '';
  for (const it of items) {
    const f = it.fill || fill;
    if (it.w) {
      a += `<path d="${it.d}" fill="none" stroke="${INK}" stroke-width="${r1(it.w + 2 * o)}" stroke-linecap="round" stroke-linejoin="round"/>`;
      b += `<path d="${it.d}" fill="none" stroke="${f}" stroke-width="${r1(it.w)}" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      a += `<path d="${it.d}" fill="${INK}" stroke="${INK}" stroke-width="${r1(2 * o)}" stroke-linejoin="round"/>`;
      b += `<path d="${it.d}" fill="${f}"/>`;
    }
  }
  return a + b;
}
const g = (inner, attrs = '') => `<g ${attrs}>${inner}</g>`;

// ---------- hands ----------
// Local frame: wrist at (0,0), fingers point to -y. m places it on the page.
// type: fist | v | palm | point | mitt     side: 1 = thumb on +x, -1 = thumb on -x
function handAt(type, m, { side = 1, fill = '#fff', o = LW.out, detail = true } = {}) {
  const mm = mul(m, sc(side, 1));
  const k = mscale(m);
  const P = d => xf(d, mm);
  const big = k > 1.6; // extra detail lines only when the hand is large
  let s = '';
  const inl = d => ink(P(d), { w: big ? LW.in : LW.fine });
  if (type === 'fist' || type === 'grip') {
    s += shape(P(rrect(-13, -27, 26, 26, 9)), { fill, w: o });
    if (detail) s += inl('M-6.5 -27L-6.5 -19') + inl('M0 -27L0 -18.5') + inl('M6.5 -27L6.5 -19');
    s += union([{ d: P('M13 -9Q6 -14 -4 -10'), w: 8.5 * k }], { o: o * 0.85, fill });
  } else if (type === 'v') {
    s += union([
      { d: P(rrect(-12, -21, 24, 20, 8)) },
      { d: P('M-5 -17L-12 -50'), w: 9.5 * k },
      { d: P('M5 -17L12 -50'), w: 9.5 * k },
    ], { o, fill });
    if (detail) s += inl('M0 -21L0 -27');
    if (detail && big) s += inl('M-10.5 -41L-7 -41.8') + inl('M10.5 -41L7 -41.8');
    s += union([{ d: P('M12 -7Q5 -12 -3 -9'), w: 8 * k }], { o: o * 0.85, fill });
  } else if (type === 'palm') {
    s += union([
      { d: P(rrect(-14, -23, 28, 22, 9)) },
      { d: P('M-10.5 -20L-15 -45'), w: 7.4 * k },
      { d: P('M-3.6 -21L-5 -52'), w: 7.6 * k },
      { d: P('M3.6 -21L5 -52'), w: 7.6 * k },
      { d: P('M10.5 -20L15 -46'), w: 7.4 * k },
      { d: P('M12 -8L27 -21'), w: 8.6 * k },
    ], { o, fill });
    if (detail && big) s += inl('M-8 -12Q0 -6 8 -13') + inl('M-7 -23L-7 -20') + inl('M0 -24L0 -20.5') + inl('M7 -23L7 -20');
  } else if (type === 'point') {
    s += union([
      { d: P(rrect(-12, -22, 24, 21, 8)) },
      { d: P('M-5 -18L-6 -50'), w: 9.5 * k },
    ], { o, fill });
    if (detail) s += inl('M1 -22L1 -15') + inl('M7 -21L7 -15');
    s += union([{ d: P('M12 -7Q5 -12 -2 -9'), w: 8 * k }], { o: o * 0.85, fill });
  } else { // mitt: relaxed simple hand
    s += union([
      { d: P(ell(0, -13, 11.5, 13.5)) },
      { d: P('M9 -10L16 -17'), w: 7.5 * k },
    ], { o, fill });
  }
  return s;
}
// Standalone hand for icons and the big throw pages. (x,y) = centre of the hand, size = height in units.
function hand(type, x, y, size = 60, { rotDeg = 0, side = 1, fill = '#fff', cuff = false, o } = {}) {
  const HH = { fist: 30, grip: 30, mitt: 30, v: 54, palm: 56, point: 54 }[type] || 54; // natural height of each shape
  const k = size / HH;
  const m = chain(tr(x, y), rot(rotDeg), sc(k), tr(0, HH / 2 + (type === 'mitt' ? -1 : 1)));
  let s = '';
  if (cuff) { // a short sleeve cuff below the wrist
    s += shape(xf(rrect(-15, -3, 30, 22, 5), m), { w: o || LW.out, fill });
    s += ink(xf('M-15 6L15 6', m));
  }
  return s + handAt(type, m, { side, fill, o: o || LW.out });
}

// ---------- faces ----------
const EXPR = {
  happy: { eyes: 'open', brows: 'neutral', mouth: 'smile' },
  grin: { eyes: 'open', brows: 'neutral', mouth: 'grin' },
  determined: { eyes: 'open', brows: 'angry', mouth: 'grin' },
  serious: { eyes: 'open', brows: 'angry', mouth: 'flat' },
  surprised: { eyes: 'wide', brows: 'up', mouth: 'o' },
  worried: { eyes: 'open', brows: 'worried', mouth: 'wavy' },
  doubtful: { eyes: 'half', brows: 'worried', mouth: 'flat' },
  strain: { eyes: 'squeeze', brows: 'angry', mouth: 'teeth' },
  laugh: { eyes: 'happy', brows: 'neutral', mouth: 'grin' },
  calm: { eyes: 'closed', brows: 'neutral', mouth: 'smile' },
  sad: { eyes: 'open', brows: 'worried', mouth: 'frown' },
  shout: { eyes: 'open', brows: 'up', mouth: 'shout' },
  whisper: { eyes: 'wide', brows: 'up', mouth: 'small' },
  ouch: { eyes: 'squeeze', brows: 'worried', mouth: 'o' },
  smirk: { eyes: 'half', brows: 'neutral', mouth: 'smirk' },
};
// hm = head matrix (head centre at 0,0; radius ~44). dx shifts features for 3/4 views.
function face(hm, expr, { dx = 0, dy = 0, look = [0, 0], skin = '#fff' } = {}) {
  const e = typeof expr === 'string' ? (EXPR[expr] || EXPR.happy) : { ...EXPR.happy, ...expr };
  const P = d => xf(d, mul(hm, tr(dx, dy)));
  const k = mscale(hm);
  const fine = Math.max(LW.fine, Math.min(LW.in, LW.in * k * 0.9));
  let s = '';
  const ex = 17, ey = 5;
  for (const sgn of [-1, 1]) {
    const cx = sgn * ex - (dx ? Math.sign(dx) * 0 : 0);
    if (e.eyes === 'open' || e.eyes === 'wide' || e.eyes === 'half') {
      const ry = e.eyes === 'wide' ? 11.5 : 9.5, rx = e.eyes === 'wide' ? 9 : 7.6;
      s += shape(P(ell(cx, ey, rx, ry)), { w: fine, fill: '#fff' });
      const pr = e.eyes === 'wide' ? 3.6 : 4.8;
      const c = ap(mul(hm, tr(dx, dy)), [cx + look[0] * 2.4, ey + 1 + look[1] * 2.6]);
      s += dot(c[0], c[1], pr * k);
      if (k > 0.9) { const h = ap(mul(hm, tr(dx, dy)), [cx + look[0] * 2.4 + 1.6, ey - 0.8 + look[1] * 2.6]); s += `<circle cx="${r1(h[0])}" cy="${r1(h[1])}" r="${r1(1.4 * k)}" fill="#fff"/>`; }
      if (e.eyes === 'half') s += shape(P(`M${cx - 9} ${ey - 11}L${cx + 9} ${ey - 11}L${cx + 9} ${ey - 2}L${cx - 9} ${ey - 2}Z`), { fill: skin, w: 0, stroke: 'none' }) + ink(P(`M${cx - 8.2} ${ey - 2}L${cx + 8.2} ${ey - 2}`), { w: fine });
    } else if (e.eyes === 'happy') {
      s += ink(P(`M${cx - 8} ${ey + 3}Q${cx} ${ey - 9} ${cx + 8} ${ey + 3}`), { w: fine });
    } else if (e.eyes === 'closed') {
      s += ink(P(`M${cx - 8} ${ey}Q${cx} ${ey + 8} ${cx + 8} ${ey}`), { w: fine });
    } else if (e.eyes === 'squeeze') {
      s += ink(P(`M${cx - sgn * 8} ${ey - 6}L${cx + sgn * 6} ${ey + 1}L${cx - sgn * 8} ${ey + 7}`), { w: fine });
    }
    const by = ey - 17;
    if (e.brows === 'angry') s += ink(P(`M${cx - sgn * 8} ${by + 5}L${cx + sgn * 9} ${by - 2}`), { w: fine });
    else if (e.brows === 'worried') s += ink(P(`M${cx - sgn * 8} ${by - 3}L${cx + sgn * 9} ${by + 3}`), { w: fine });
    else if (e.brows === 'up') s += ink(P(`M${cx - 8} ${by - 2}Q${cx} ${by - 9} ${cx + 8} ${by - 2}`), { w: fine });
    else s += ink(P(`M${cx - 8} ${by + 1}Q${cx} ${by - 4} ${cx + 8} ${by + 1}`), { w: fine });
  }
  const my = 25;
  const M = {
    smile: () => ink(P(`M-10 ${my - 2}Q0 ${my + 8} 10 ${my - 2}`), { w: fine }),
    grin: () => shape(P(`M-12 ${my - 4}Q0 ${my - 1} 12 ${my - 4}Q9 ${my + 10} 0 ${my + 10}Q-9 ${my + 10} -12 ${my - 4}Z`), { w: fine }),
    flat: () => ink(P(`M-8 ${my + 1}L8 ${my + 1}`), { w: fine }),
    frown: () => ink(P(`M-9 ${my + 5}Q0 ${my - 4} 9 ${my + 5}`), { w: fine }),
    wavy: () => ink(P(`M-10 ${my + 2}Q-5 ${my - 3} 0 ${my + 2}Q5 ${my + 7} 10 ${my + 2}`), { w: fine }),
    o: () => shape(P(ell(0, my + 2, 5.5, 7)), { w: fine }),
    small: () => shape(P(ell(0, my + 2, 3.6, 4)), { w: fine }),
    shout: () => shape(P(ell(0, my + 2, 9.5, 10.5)), { w: fine }),
    smirk: () => ink(P(`M-8 ${my + 2}Q2 ${my + 6} 10 ${my - 4}`), { w: fine }),
    teeth: () => shape(P(rrect(-11, my - 4, 22, 11, 4)), { w: fine }) + ink(P(`M-11 ${my + 1.5}L11 ${my + 1.5}`), { w: LW.fine }) + ink(P(`M-4 ${my - 4}L-4 ${my + 7}`), { w: LW.fine }) + ink(P(`M4 ${my - 4}L4 ${my + 7}`), { w: LW.fine }),
  };
  s += (M[e.mouth] || M.smile)();
  return s;
}

// ---------- heads ----------
function headGuu(hm, o) {
  const P = d => xf(d, hm); const c = o.colors; let s = '';
  if (o.dir === 'back') {
    s += shape(P('M-45 12L-58 -6L-44 -12L-56 -34L-36 -34L-40 -60L-18 -46L-8 -72L6 -48L24 -68L28 -42L50 -52L44 -26L58 -14L45 12L36 34L24 26L14 40L2 28L-10 40L-22 27L-34 35Z'), { fill: c.hair });
    s += shape(P('M-47 -14Q0 -24 47 -14L47 -4Q0 -14 -47 -4Z'), { fill: c.band, w: LW.in });
    s += shape(P('M-6 -22L6 -22L5 -8L-5 -8Z'), { fill: c.band, w: LW.in });
    s += shape(P('M-4 -9L-16 22L-4 16Z'), { fill: c.band, w: LW.in }) + shape(P('M4 -9L15 26L1 17Z'), { fill: c.band, w: LW.in });
    return s;
  }
  s += shape(P(ell(-45, 6, 7, 10)), { fill: c.skin, w: LW.in }) + shape(P(ell(45, 6, 7, 10)), { fill: c.skin, w: LW.in });
  s += shape(P(ell(0, 0, 46, 42)), { fill: c.skin });
  s += face(hm, o.expr, { dx: o.fdx, dy: o.fdy, look: o.look, skin: c.skin });
  // spiky crown
  s += shape(P('M-46 -6L-60 -20L-44 -24L-54 -46L-33 -40L-34 -66L-14 -48L-2 -74L10 -48L30 -66L31 -40L53 -46L44 -24L60 -18L46 -6L36 -16L26 -6L14 -18L2 -7L-10 -18L-22 -7L-34 -16Z'), { fill: c.hair });
  // headband + knot (picture right)
  s += shape(P('M-46 -15Q0 -27 46 -15L46 -5Q0 -17 -46 -5Z'), { fill: c.band, w: LW.in });
  s += shape(P('M46 -12L66 -24L62 -8Z'), { fill: c.band, w: LW.in }) + shape(P('M46 -9L68 2L54 6Z'), { fill: c.band, w: LW.in });
  s += shape(P(ell(47, -10, 5, 6)), { fill: c.band, w: LW.in });
  return s;
}
function headChoki(hm, o) {
  const P = d => xf(d, hm); const c = o.colors; let s = '';
  const knot = shape(P('M-7 -50L-22 -72L-9 -68L-8 -90L0 -72L9 -92L9 -68L23 -74L7 -50Z'), { fill: c.hair }) +
    shape(P(rrect(-9, -56, 18, 9, 3)), { fill: c.band, w: LW.in });
  if (o.dir === 'back') {
    s += knot;
    s += shape(P('M-46 4L-58 -8L-46 -16L-54 -32L-38 -36Q0 -64 38 -36L54 -32L46 -16L58 -8L46 4L40 30L28 22L18 38L6 26L-6 38L-18 24L-30 34L-40 24Z'), { fill: c.hair });
    return s;
  }
  s += shape(P(ell(-45, 6, 7, 10)), { fill: c.skin, w: LW.in }) + shape(P(ell(45, 6, 7, 10)), { fill: c.skin, w: LW.in });
  s += shape(P(ell(0, 0, 46, 42)), { fill: c.skin });
  s += face(hm, o.expr, { dx: o.fdx, dy: o.fdy, look: o.look, skin: c.skin });
  s += knot;
  s += shape(P('M-47 2L-59 -8L-47 -15L-56 -30L-40 -35Q0 -62 40 -35L56 -30L47 -15L59 -8L47 2L38 -9L30 -24L20 -4L10 -23L0 -2L-10 -23L-20 -5L-30 -24L-39 -9Z'), { fill: c.hair });
  return s;
}
function headPaa(hm, o) {
  const P = d => xf(d, hm); const c = o.colors; let s = '';
  // hood with a soft point at the back-top
  const hood = 'M-53 4C-56 -34 -30 -56 0 -56C14 -56 24 -52 32 -46L46 -58L44 -36C52 -24 55 -10 53 4C51 30 30 46 0 46C-30 46 -51 30 -53 4Z';
  if (o.dir === 'back') {
    s += shape(P(hood), { fill: c.hood });
    s += ink(P('M0 -56Q4 0 0 46'));
    return s;
  }
  s += shape(P(hood), { fill: c.hood });
  s += shape(P(ell(0, 6, 39, 35)), { fill: c.skin, w: LW.in });
  s += face(hm, o.expr, { dx: o.fdx * 0.7, dy: o.fdy + 3, look: o.look, skin: c.skin });
  // soft curly fringe peeking out of the hood
  s += shape(P('M-37 -4C-36 -22 -20 -30 0 -30C20 -30 36 -22 37 -4C32 -6 30 -12 26 -15C24 -8 16 -8 13 -15C11 -8 2 -8 0 -15C-2 -8 -11 -8 -13 -15C-16 -8 -24 -8 -26 -15C-30 -12 -32 -6 -37 -4Z'), { fill: c.hair, w: LW.in });
  return s;
}
function headGirl(hm, o) {
  const P = d => xf(d, hm); const c = o.colors; let s = '';
  // short bob with a small side tail. o.mask = ninja scarf over nose and mouth.
  if (o.dir === 'back') {
    s += shape(P('M-48 26C-56 -30 -30 -52 0 -52C30 -52 56 -30 48 26L34 34L22 26L10 36L-2 26L-14 36L-26 26L-38 34Z'), { fill: c.hair });
    if (o.mask) s += shape(P('M-49 8Q0 16 49 8L48 20Q0 28 -48 20Z'), { fill: c.hood, w: LW.in }) + shape(P('M-4 14L-14 44L-2 38Z'), { fill: c.hood, w: LW.in }) + shape(P('M4 14L13 46L0 38Z'), { fill: c.hood, w: LW.in });
    return s;
  }
  s += shape(P('M-48 28C-58 -30 -30 -52 0 -52C30 -52 58 -30 48 28L30 30L30 -6L-30 -6L-30 30Z'), { fill: c.hair });
  s += shape(P(ell(0, 0, 44, 41)), { fill: c.skin });
  s += face(hm, o.expr, { dx: o.fdx, dy: o.fdy, look: o.look, skin: c.skin });
  if (o.mask) s += shape(P('M-43 12Q0 20 43 12C40 32 22 42 0 42C-22 42 -40 32 -43 12Z'), { fill: c.hood, w: LW.in }) + ink(P('M-30 26Q0 33 30 26'), { w: LW.fine });
  s += shape(P('M-46 0C-48 -34 -26 -50 0 -50C26 -50 48 -34 46 0C40 -8 34 -20 30 -28C18 -16 -6 -12 -24 -18C-30 -12 -38 -6 -46 0Z'), { fill: c.hair });
  s += shape(P('M44 -22L66 -30L60 -14L70 -2L52 -6Z'), { fill: c.hair, w: LW.in });
  return s;
}

// ---------- builds ----------
const WHITE = { skin: '#fff', hair: '#fff', band: '#fff', hood: '#fff', tunic: '#fff', pants: '#fff', belt: '#fff', apron: '#fff', feet: '#fff', bag: '#fff' };
const BUILD = {
  guu: { sw: 30, hem: 31, belly: 3, TL: 56, th: 27, sh: 25, armU: 25, armF: 23, armW: 18, legW: 21, hipW: 14, head: headGuu, hand: 'fist', apron: 'hex', extra: 'pouch' },
  choki: { sw: 21, hem: 21, belly: 0, TL: 58, th: 29, sh: 28, armU: 27, armF: 25, armW: 13, legW: 14.5, hipW: 9.5, head: headChoki, hand: 'v', apron: 'stripe', extra: 'sash' },
  paa: { sw: 26, hem: 31, belly: 7, TL: 57, th: 27, sh: 25, armU: 25, armF: 23, armW: 15.5, legW: 18, hipW: 12.5, head: headPaa, hand: 'palm', apron: 'tri', extra: 'bag' },
  girl: { sw: 22, hem: 23, belly: 0, TL: 72, th: 44, sh: 42, armU: 34, armF: 31, armW: 13, legW: 15, hipW: 10, head: headGirl, hand: 'mitt', apron: null, extra: 'wraps' },
};
const HR = 44; // head radius in figure units

function ik(a, t, l1, l2, bend) {
  let dx = t[0] - a[0], dy = t[1] - a[1];
  let d = Math.hypot(dx, dy) || 0.001;
  const max = l1 + l2 - 0.5, min = Math.abs(l1 - l2) + 0.5;
  if (d > max) { dx *= max / d; dy *= max / d; d = max; }
  if (d < min) { dx *= min / d; dy *= min / d; d = min; }
  const tt = [a[0] + dx, a[1] + dy];
  const A = Math.acos((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d));
  const base = Math.atan2(dy, dx);
  const ang = base + bend * A;
  return [[a[0] + l1 * Math.cos(ang), a[1] + l1 * Math.sin(ang)], tt];
}

/*
 figure(opts) -> SVG string.  See book/DRAWING-GUIDE.md for the full option list.
*/
function figure(o) {
  const who = o.who || 'guu';
  const B = { ...BUILD[who], ...(o.build || {}) };
  const c = { ...WHITE, ...(o.colors || {}) };
  const s = o.s || 1, flip = o.flip ? -1 : 1;
  const dir = o.dir || 'front';
  const back = dir === 'back';
  const lw = o.lw || LW.out;
  const pm = chain(tr(o.x || 0, o.y || 0), rot(o.spin || 0), sc(flip * s, s)); // figure-local -> page
  const hipY = -(B.th + B.sh + 5) + (o.crouch || 0);
  const tm = chain(pm, tr(o.shift || 0, hipY), rot(o.lean || 0)); // torso frame: hip (0,0), neck (0,-TL)
  const headC = [0, -B.TL - HR * 0.80];
  const hm = chain(tm, tr(headC[0], headC[1]), rot(o.headTilt || 0), sc((o.headScale || 1)));
  const toPage = (m, p) => ap(m, p);
  const itm = inv(tm), ipm = inv(pm);
  const P = d => xf(d, tm);

  // ---- arms (in torso frame) ----
  function arm(side, spec, defHand) {
    spec = spec || {};
    const sh = [side * (B.sw - 4), -B.TL + 11];
    let el, wr;
    if (spec.at) { [el, wr] = ik(sh, ap(itm, spec.at), B.armU, B.armF, (spec.bend || 1) * side * flip * -1 * flip); }
    else if (spec.to) { [el, wr] = ik(sh, [sh[0] + side * spec.to[0], sh[1] + spec.to[1]], B.armU, B.armF, (spec.bend || 1) * -side); }
    else {
      const a = spec.a || [12, 8];
      const A = rad(a[0]), F = rad(a[0] + a[1]);
      el = [sh[0] + side * B.armU * Math.sin(A), sh[1] + B.armU * Math.cos(A)];
      wr = [el[0] + side * B.armF * Math.sin(F), el[1] + B.armF * Math.cos(F)];
    }
    const pts = [sh, el, wr].map(p => ap(tm, p));
    const d = line(...pts);
    let out = tube(d, B.armW * s, { fill: c.tunic, o: lw });
    // cuff
    const v = [wr[0] - el[0], wr[1] - el[1]], L = Math.hypot(v[0], v[1]) || 1;
    const n = [-v[1] / L, v[0] / L], cp = [el[0] + v[0] * 0.72, el[1] + v[1] * 0.72];
    if (s >= 0.7 && who !== 'girl') out += ink(line(ap(tm, [cp[0] + n[0] * B.armW / 2, cp[1] + n[1] * B.armW / 2]), ap(tm, [cp[0] - n[0] * B.armW / 2, cp[1] - n[1] * B.armW / 2])), { w: LW.in });
    if (who === 'girl' && s >= 0.7) for (const f of [0.45, 0.62, 0.79]) { const q = [el[0] + v[0] * f, el[1] + v[1] * f]; out += ink(line(ap(tm, [q[0] + n[0] * B.armW / 2, q[1] + n[1] * B.armW / 2]), ap(tm, [q[0] - n[0] * B.armW / 2, q[1] - n[1] * B.armW / 2])), { w: LW.fine }); }
    // hand
    const type = spec.hand || defHand;
    if (type !== 'none') {
      const pw = pts[2], pe = pts[1];
      const ang = spec.rot != null ? spec.rot : Math.atan2(pw[1] - pe[1], pw[0] - pe[0]) * 180 / Math.PI + 90;
      const hs = s * (spec.hs || o.hs || 1);
      const hmx = chain(tr(pw[0], pw[1]), rot(ang), sc(hs), tr(0, 5));
      const thumb = (spec.thumb != null ? spec.thumb : -side) * flip;
      out += handAt(type, hmx, { side: thumb, fill: c.skin, o: lw });
    }
    return { svg: out, behind: !!spec.behind, over: !!spec.over, wrist: pts[2], elbow: pts[1] };
  }
  // ---- legs (hip joints in figure-local frame) ----
  function leg(side, spec) {
    spec = spec || {};
    const hip = [side * B.hipW + (o.shift || 0), hipY + 2];
    let kn, an;
    if (spec.at) [kn, an] = ik(hip, ap(ipm, spec.at), B.th, B.sh, (spec.bend || 1) * -side);
    else if (spec.a) {
      const A = rad(spec.a[0]), F = rad(spec.a[0] + spec.a[1]);
      kn = [hip[0] + side * B.th * Math.sin(A), hip[1] + B.th * Math.cos(A)];
      an = [kn[0] + side * B.sh * Math.sin(F), kn[1] + B.sh * Math.cos(F)];
    } else {
      const f = spec.foot || [side * (B.hipW + 3), -6];
      [kn, an] = ik(hip, f, B.th, B.sh, (spec.bend || 1) * -side);
    }
    const pts = [hip, kn, an].map(p => ap(pm, p));
    let out = tube(line(...pts), B.legW * s, { fill: c.pants, o: lw });
    const v = [an[0] - kn[0], an[1] - kn[1]], L = Math.hypot(v[0], v[1]) || 1, n = [-v[1] / L, v[0] / L];
    if (s >= 0.7) for (const f of who === 'girl' ? [0.4, 0.58, 0.76] : [0.62, 0.8]) {
      const q = [kn[0] + v[0] * f, kn[1] + v[1] * f];
      out += ink(line(ap(pm, [q[0] + n[0] * B.legW / 2, q[1] + n[1] * B.legW / 2]), ap(pm, [q[0] - n[0] * B.legW / 2, q[1] - n[1] * B.legW / 2])), { w: LW.fine });
    }
    // foot
    const fr = spec.footRot != null ? spec.footRot : (back ? 0 : side * -14);
    const fm = chain(pm, tr(an[0], an[1]), rot(fr));
    const fx = back ? 0 : side * 5;
    out += shape(xf(ell(fx, 4, back ? 10.5 : 14, 8), fm), { fill: c.feet, w: lw });
    if (s >= 1 && !back) out += ink(xf(`M${fx - 9} 0Q${fx} 5 ${fx + 9} 0`, fm), { w: LW.fine });
    return { svg: out, behind: !!spec.behind, ankle: pts[2] };
  }

  const aL = arm(-1, o.armL, o.handL || B.hand), aR = arm(1, o.armR, o.handR || B.hand);
  const lL = leg(-1, o.legL), lR = leg(1, o.legR);

  // ---- torso ----
  const { sw, hem, belly, TL } = B;
  const torsoD = `M${-sw} ${-TL + 13}Q${-sw} ${-TL} ${-sw + 11} ${-TL}L${sw - 11} ${-TL}Q${sw} ${-TL} ${sw} ${-TL + 13}` +
    `Q${sw + belly + (hem - sw) * 0.6} ${-TL * 0.42} ${hem} 9Q0 15 ${-hem} 9Q${-sw - belly - (hem - sw) * 0.6} ${-TL * 0.42} ${-sw} ${-TL + 13}Z`;
  let torso = shape(P(torsoD), { fill: c.tunic, w: lw });
  const wy = -19; // belt top
  const bx = (y) => { const t = (y + TL) / (TL + 9); return sw + (hem - sw) * t + belly * Math.sin(Math.PI * t) * 0.9; };
  if (!back) {
    torso += ink(P(`M${sw * 0.5} ${-TL + 1}L-3 ${wy}`)) + ink(P(`M${-sw * 0.5} ${-TL + 1}L${1.5} ${-TL + 17}`));
    if (B.apron) {
      const aw = sw * 0.47;
      torso += shape(P(`M${-aw} ${wy + 8}L${aw} ${wy + 8}L${aw + 1} 13Q0 18 ${-aw - 1} 13Z`), { fill: c.apron, w: LW.in });
      if (s >= 1.15) {
        if (B.apron === 'hex') torso += ink(P('M0 -6L6.5 -2.2L6.5 5.4L0 9.2L-6.5 5.4L-6.5 -2.2Z'), { w: LW.fine });
        if (B.apron === 'tri') torso += ink(P('M-8 9L0 -5L8 9Z'), { w: LW.fine });
        if (B.apron === 'stripe') torso += ink(P('M-3.5 -10L-3.5 13'), { w: LW.fine }) + ink(P('M3.5 -10L3.5 13'), { w: LW.fine });
      }
    }
  } else if (who !== 'girl') {
    torso += ink(P(`M0 ${-TL + 2}L0 ${wy}`), { w: LW.fine });
  }
  // belt
  const b1 = bx(wy), b2 = bx(wy + 8);
  torso += shape(P(`M${-b1} ${wy}L${b1} ${wy}L${b2} ${wy + 8}L${-b2} ${wy + 8}Z`), { fill: c.belt, w: LW.in });
  if (B.extra === 'pouch') { // Guu: pouch on HIS left hip (picture right when facing us)
    const px = (back ? -1 : 1) * (b2 - 3);
    torso += shape(P(rrect(px - 8, wy + 5, 17, 17, 5)), { fill: c.bag, w: LW.in }) + ink(P(`M${px - 8} ${wy + 12}Q${px} ${wy + 16} ${px + 9} ${wy + 12}`), { w: LW.fine });
  }
  if (B.extra === 'sash') { // Choki: long sash tail
    const sx = (back ? 1 : -1) * (b1 - 4);
    torso += shape(P(`M${sx - 4} ${wy + 6}L${sx + 4} ${wy + 6}L${sx + 9} ${wy + 34}L${sx - 1} ${wy + 30}L${sx - 8} ${wy + 36}Z`), { fill: c.belt, w: LW.in });
    torso += shape(P(ell(sx, wy + 4, 5, 5)), { fill: c.belt, w: LW.in });
  }
  if (B.extra === 'bag') { // Paa: side bag on HIS right hip (picture left), strap over his right shoulder
    const k = back ? 1 : -1;
    torso += ink(P(`M${k * (sw - 8)} ${-TL + 1}L${k * (b1 + 1)} ${wy}`), { w: LW.in }) + ink(P(`M${k * (sw - 14)} ${-TL + 1}L${k * (b1 - 6)} ${wy}`), { w: LW.in });
    const px = k * (b2 + 1);
    torso += shape(P(rrect(px - 11, wy + 2, 22, 20, 6)), { fill: c.bag, w: LW.in }) + ink(P(`M${px - 11} ${wy + 10}Q${px} ${wy + 16} ${px + 11} ${wy + 10}`), { w: LW.fine });
  }
  if (o.carryHood) { // the lost hood hanging from Guu's belt (picture-left hip): hood shape with its eye opening
    const k = back ? 1 : -1, hx = k * (b1 + 1), hy = wy + 3;
    torso += shape(P(`M${hx - 11} ${hy + 2}C${hx - 12} ${hy - 8} ${hx + 12} ${hy - 8} ${hx + 11} ${hy + 2}L${hx + 13} ${hy + 30}L${hx + 6} ${hy + 24}L${hx} ${hy + 34}L${hx - 6} ${hy + 24}L${hx - 13} ${hy + 30}Z`), { fill: c.lost || '#fff', w: LW.in });
    if (s >= 0.9) torso += shape(P(`M${hx - 7} ${hy + 6}Q${hx} ${hy + 2} ${hx + 7} ${hy + 6}Q${hx + 8} ${hy + 11} ${hx + 7} ${hy + 15}Q${hx} ${hy + 18} ${hx - 7} ${hy + 15}Q${hx - 8} ${hy + 11} ${hx - 7} ${hy + 6}Z`), { fill: '#fff', w: LW.fine }); }
  if (B.extra === 'wraps') torso += ink(P(`M${sw * 0.5} ${-TL + 1}L-3 ${wy}`)) + ink(P(`M${-sw * 0.5} ${-TL + 1}L${1.5} ${-TL + 17}`));
  if (who === 'paa' && !back) torso += shape(P(`M${-sw * 0.72} ${-TL + 2}Q0 ${-TL + 17} ${sw * 0.72} ${-TL + 2}Q0 ${-TL + 8} ${-sw * 0.72} ${-TL + 2}Z`), { fill: c.hood, w: LW.in });

  // ---- head ----
  const fdx = dir === 'left' ? -9 : dir === 'right' ? 9 : 0;
  const lookMap = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  let look = o.look || [0, 0];
  if (typeof look === 'string') look = lookMap[look] || [0, 0];
  const head = B.head(hm, { dir, expr: o.expr || 'happy', fdx: fdx * flip * flip, fdy: (o.look === 'up' ? -5 : o.look === 'down' ? 4 : 0), look: [look[0] * flip, look[1]], colors: c, mask: o.mask });

  // ---- assemble ----
  const legs = [lL, lR];
  let out = '';
  out += [aL, aR].filter(a => a.behind).map(a => a.svg).join('');
  out += legs.filter(l => l.behind).map(l => l.svg).join('');
  out += legs.filter(l => !l.behind).map(l => l.svg).join('');
  out += torso;
  out += [aL, aR].filter(a => !a.behind && !a.over).map(a => a.svg).join('');
  out += head;
  out += [aL, aR].filter(a => a.over).map(a => a.svg).join('');
  const info = { wristL: aL.wrist, wristR: aR.wrist, ankleL: lL.ankle, ankleR: lR.ankle, head: ap(hm, [0, 0]), top: ap(hm, [0, -70]), hip: ap(tm, [0, 0]), neck: ap(tm, [0, -B.TL]) };
  const res = new String(`<g class="fig fig-${who}">${out}</g>`);
  res.info = info;
  return res;
}
const bro = (who, o = {}) => figure({ ...o, who });
const guu = (o) => bro('guu', { carryHood: true, ...o }), choki = (o) => bro('choki', o), paa = (o) => bro('paa', o), girl = (o) => bro('girl', o);

// Cover palette (the interior is always white).
const PALETTE = {
  guu: { skin: '#F6C9A0', hair: '#2B2320', band: '#C8432B', tunic: '#8A4B2A', pants: '#4A3B33', belt: '#E0A63C', apron: '#E9D7B4', feet: '#3A2F2A', bag: '#C98B4A' },
  choki: { skin: '#F6C9A0', hair: '#2B2320', band: '#E0A63C', tunic: '#454C5E', pants: '#2E3442', belt: '#C8432B', apron: '#D9DEE8', feet: '#22262F' },
  paa: { skin: '#F6C9A0', hair: '#3A2A22', hood: '#2F4A7A', tunic: '#EFE2C4', pants: '#2F4A7A', belt: '#5E8C6A', apron: '#F7F0DC', feet: '#263B5E', bag: '#B8793E' },
  girl: { skin: '#F6C9A0', hair: '#2B2320', hood: '#2A2A33', tunic: '#2A2A33', pants: '#2A2A33', belt: '#C8432B', feet: '#1F1F26' },
};

module.exports = { LW, INK, I, mul, tr, rot, sc, chain, ap, inv, xf, line, poly, ell, rrect, curve, shape, ink, dot, tube, union, g, hand, handAt, face, figure, bro, guu, choki, paa, girl, PALETTE, EXPR, BUILD, r1 };
