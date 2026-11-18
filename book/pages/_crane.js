// Shared pieces for the CRANE DOJO branch (pages 13-18): the tall student, the spinning pole, interior pieces.
'use strict';
const R = require('../lib/rig');
const P = require('../lib/props');
const { shape, ink, tube, ell, rrect, line, curve, xf, ap, LW } = R;
const r1 = R.r1;

// ---------------------------------------------------------------- the tall student
// Head: long narrow face, sleek centre-parted hair, HIGH BUN with a hair stick, long neck.
function headStudent(hm, o) {
  const Pp = d => xf(d, hm); let s = '';
  const k = Math.hypot(hm[0], hm[1]);
  if (o.dir === 'back') {
    s += tube(Pp('M-30 -84L30 -62'), 3.2 * k, { o: LW.in });
    s += shape(Pp(ell(0, -66, 20, 18)));
    s += tube(Pp('M0 30L0 60'), 17 * k, { cap: 'butt' });
    s += shape(Pp('M-39 6C-46 -36 -22 -50 0 -50C22 -50 46 -36 39 6C36 30 20 44 0 44C-20 44 -36 30 -39 6Z'));
    return s;
  }
  s += tube(Pp('M0 30L0 60'), 17 * k, { cap: 'butt' });                    // neck
  s += tube(Pp('M-30 -84L30 -62'), 3.2 * k, { o: LW.in });                 // hair stick
  s += shape(Pp(ell(0, -66, 20, 18)));                                     // bun
  s += ink(Pp('M-10 -72Q0 -80 10 -72'), { w: LW.fine });
  s += shape(Pp(ell(-37, 8, 6, 9)), { w: LW.in }) + shape(Pp(ell(37, 8, 6, 9)), { w: LW.in });
  s += shape(Pp('M-37 0C-40 -34 -22 -48 0 -48C22 -48 40 -34 37 0C36 26 18 46 0 46C-18 46 -36 26 -37 0Z')); // face
  s += R.face(hm, o.expr, { dx: o.fdx * 0.8, dy: o.fdy + 1, look: o.look });
  s += shape(Pp('M-39 6C-48 -36 -24 -52 0 -52C24 -52 48 -36 39 6C35 -8 24 -24 0 -33C-24 -24 -35 -8 -39 6Z')); // hair
  s += shape(Pp(rrect(-9, -55, 18, 8, 3)), { w: LW.in });                  // bun tie
  return s;
}
const STUDENT_BUILD = { sw: 20, hem: 17, belly: 0, TL: 74, th: 78, sh: 76, armU: 41, armF: 39, armW: 10.5, legW: 12.5, hipW: 8,
  head: headStudent, hand: 'mitt', apron: null, extra: null };
// student(o): same options as the rig figures. About 310*s tall. Default hand size is reduced (adult proportions).
function student(o = {}) {
  const B = { ...STUDENT_BUILD, ...(o.build || {}) };
  const fig = R.figure({ who: 'choki', headScale: 0.62, hs: 0.62, expr: { eyes: 'half', brows: 'neutral', mouth: 'flat' }, ...o, build: B });
  if (o.dir === 'back' || o.skirt === false) return fig;
  // gi jacket skirt + belt knot, drawn in the torso frame (hip = origin, neck = (0,-TL))
  const Hh = fig.info.hip, N = fig.info.neck;
  const uy = [(Hh[0] - N[0]) / B.TL, (Hh[1] - N[1]) / B.TL], k = o.flip ? -1 : 1;
  const m = [k * uy[1], -k * uy[0], uy[0], uy[1], Hh[0], Hh[1]];
  const T = d => xf(d, m);
  let g = shape(T('M-17.6 -11L17.6 -11L24 25Q0 31 -24 25Z'));
  g += ink(T('M5 -11L-4 27'));
  g += shape(T('M-7 -13L-15 16L-8 13L-3 -12Z'), { w: LW.in }) + shape(T('M-2 -13L1 20L7 15L3 -12Z'), { w: LW.in });
  g += shape(T(ell(-2, -15, 6, 5)), { w: LW.in });
  const res = new String(String(fig).replace(/<\/g>$/, g + '</g>'));
  res.info = fig.info;
  return res;
}

// ---------------------------------------------------------------- cloth ribbon (closed, colourable)
function ribbon(pts, w) {
  const L = [], Rr = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
    const n = [-dy / l, dx / l];
    L.push([r1(pts[i][0] + n[0] * w / 2), r1(pts[i][1] + n[1] * w / 2)]);
    Rr.push([r1(pts[i][0] - n[0] * w / 2), r1(pts[i][1] - n[1] * w / 2)]);
  }
  const e = pts[pts.length - 1], p = pts[pts.length - 2];
  const notch = [r1(e[0] - (e[0] - p[0]) * 0.35), r1(e[1] - (e[1] - p[1]) * 0.35)];
  const back = curve(Rr.slice().reverse()).replace(/^M/, 'L');
  return shape(curve(L) + `L${notch[0]} ${notch[1]}` + back + 'Z', { w: LW.in });
}
// streamers(E, T, len): three ribbons tied at E, trailing along unit vector T.
function streamers(E, T, len = 110, { w = 19, n = 3, wave = 1 } = {}) {
  let s = '';
  const N = [-T[1], T[0]];
  const order = n === 3 ? [-1, 1, 0] : [0, 1];
  for (const j of order) {
    const pts = [];
    const fan = j * 0.33, c = Math.cos(fan), sn = Math.sin(fan);
    const D = [T[0] * c - T[1] * sn, T[0] * sn + T[1] * c];
    const ll = len * (j === 0 ? 1 : 0.82);
    for (let i = 0; i <= 5; i++) {
      const t = i / 5, a = wave * 11 * Math.sin(t * 6.6 + j * 2.1 + 0.6) * t;
      pts.push([E[0] + D[0] * ll * t + N[0] * a, E[1] + D[1] * ll * t + N[1] * a + 14 * t * t]);
    }
    s += ribbon(pts, w);
  }
  return s;
}

// ---------------------------------------------------------------- the spinning practice pole
// (x,y) = centre of the base on the floor. h = height of the beam above the floor. L = half-length of the beam.
// phi = rotation angle of the beam (deg; 0 = flat across the picture, 90 = pointing at us). ry = perspective squash.
// dir = +1 / -1 spin direction (decides where streamers and arcs trail). La/Lb override the two half-lengths.
// Returns a String with .a .b (beam ends) and .hub.
function pole({ x, y, h = 150, L = 220, La, Lb, phi = 12, ry = 0.3, dir = 1, postW = 24, beamW = 15, arcs = true, stream = true, slen = 110, sw = 19, arcSpan = 46, parts = 'all' }) {
  const f = phi * Math.PI / 180;
  const hub = [x, y - h];
  const end = (l, sgn) => [r1(hub[0] + sgn * l * Math.cos(f)), r1(hub[1] + sgn * l * ry * Math.sin(f))];
  const a = end(La || L, -1), b = end(Lb || L, 1);
  // tangent for trailing
  const tan = sgn => { const tx = -sgn * Math.sin(f), ty = sgn * ry * Math.cos(f), l = Math.hypot(tx, ty) || 1; return [-dir * tx / l, -dir * ty / l]; };
  let back = '', front = '';
  // motion arcs (ellipse of the sweep)
  if (arcs) {
    for (const [sgn, l] of [[-1, La || L], [1, Lb || L]]) {
      for (const [k, sp] of [[1.0, arcSpan], [0.86, arcSpan * 0.7]]) {
        const a0 = f + (sgn < 0 ? Math.PI : 0), a1 = a0 - dir * sp * Math.PI / 180 * 1.0, a2 = a0 - dir * 8 * Math.PI / 180;
        const p = t => [r1(hub[0] + l * k * Math.cos(t)), r1(hub[1] + l * k * ry * Math.sin(t))];
        const p1 = p(a1), p2 = p(a2);
        back += ink(`M${p1[0]} ${p1[1]}A${r1(l * k)} ${r1(l * k * ry)} 0 0 ${dir > 0 ? 1 : 0} ${p2[0]} ${p2[1]}`, { w: LW.in });
      }
    }
  }
  // base
  let post = '';
  post += shape(ell(x, y, 62, 17));
  post += shape(`M${x - 40} ${y - 4}L${x - 30} ${y - 30}L${x + 30} ${y - 30}L${x + 40} ${y - 4}Q${x} ${y + 10} ${x - 40} ${y - 4}Z`);
  post += tube(line([x, y - 30], [x, y - h + 6]), postW, { cap: 'butt' });
  post += ink(line([x - postW * 0.18, y - 42], [x - postW * 0.18, y - h + 40]), { w: LW.fine });
  post += ink(line([x - postW / 2, y - h * 0.5], [x + postW / 2, y - h * 0.5])) + ink(line([x - postW / 2, y - h * 0.5 - 12], [x + postW / 2, y - h * 0.5 - 12]));
  // beam
  const beam = tube(line(a, b), beamW);
  const hubS = shape(rrect(x - postW / 2 - 7, y - h - 15, postW + 14, 30, 7)) + shape(ell(x, y - h - 15, postW / 2 + 7, 7)) + shape(ell(x, y - h - 22, 8, 6), { w: LW.in });
  // binding + streamers at each end
  let str = '';
  for (const [e, sgn] of [[a, -1], [b, 1]]) {
    if (stream === true || stream === (sgn < 0 ? 'a' : 'b')) {
      const t = tan(sgn);
      str += streamers(e, t, slen, { w: sw });
      str += shape(ell(e[0], e[1], beamW * 0.75, beamW * 0.75), { w: LW.in });
    }
  }
  const res = new String(parts === 'post' ? post : parts === 'beam' ? back + beam + hubS + str : back + post + beam + hubS + str);
  res.a = a; res.b = b; res.hub = hub;
  return res;
}

// ---------------------------------------------------------------- interior pieces
// Floorboards in perspective below the wall line y0, plus skirting board.
function floor({ y0, W = 720, H = 690, vx = 360, vy, n = 9, seams = true, skirt = true }) {
  vy = vy == null ? y0 - 260 : vy;
  let s = '', d = '';
  if (skirt) s += shape(`M-10 ${y0 - 16}L${W + 10} ${y0 - 16}L${W + 10} ${y0}L-10 ${y0}Z`, { w: LW.in });
  else s += ink(`M-10 ${y0}L${W + 10} ${y0}`, { w: LW.out });
  const xs = [];
  for (let i = -n; i <= n * 2; i++) {
    const xb = vx + (i - n / 2) * (W / n) * 1.9;          // x at the bottom edge
    const t = (y0 - vy) / (H + 10 - vy);
    const xt = vx + (xb - vx) * t;
    if (xt < -5 || xt > W + 5) continue;
    d += `M${r1(xt)} ${y0}L${r1(xb)} ${H + 10}`; xs.push([xt, xb]);
  }
  s += ink(d, { w: LW.in });
  if (seams) {
    let e = '';
    for (let i = 0; i < xs.length - 1; i++) {
      const t = [0.35, 0.7, 0.5, 0.2, 0.82, 0.6, 0.3, 0.75, 0.45][i % 9];
      const yy = y0 + (H - y0) * t, f = (yy - y0) / (H + 10 - y0);
      const xa = xs[i][0] + (xs[i][1] - xs[i][0]) * f, xb2 = xs[i + 1][0] + (xs[i + 1][1] - xs[i + 1][0]) * f;
      e += `M${r1(xa)} ${r1(yy)}L${r1(xb2)} ${r1(yy)}`;
    }
    s += ink(e, { w: LW.fine });
  }
  return s;
}
// Rice-paper window / screen grid. Panes should stay >= 25 units.
function shoji(x, y, w, h, { cols = 3, rows = 5, frame = 9, kick = 0 } = {}) {
  let s = shape(rrect(x - frame, y - frame, w + 2 * frame, h + 2 * frame, 3));
  const gh = h - kick - (kick ? frame : 0);
  s += shape(rrect(x, y, w, gh, 1), { w: LW.in });
  let d = '';
  for (let i = 1; i < cols; i++) d += `M${r1(x + w * i / cols)} ${y}L${r1(x + w * i / cols)} ${y + gh}`;
  for (let j = 1; j < rows; j++) d += `M${x} ${r1(y + gh * j / rows)}L${x + w} ${r1(y + gh * j / rows)}`;
  s += ink(d, { w: LW.in });
  if (kick) s += shape(rrect(x, y + h - kick, w, kick, 1), { w: LW.in });
  return s;
}
// Tall narrow paper lantern hanging on a cord from (x, y0). Body top at y1.
function lantern(x, y0, y1, { w = 44, h = 92 } = {}) {
  let s = ink(`M${x} ${y0}L${x} ${y1}`, { w: LW.in });
  s += shape(rrect(x - w / 2, y1 + 6, w, h, w * 0.42));
  let d = '';
  for (let i = 1; i <= 3; i++) { const yy = y1 + 6 + h * i / 4; const inset = i === 2 ? 0 : 2.5; d += `M${x - w / 2 + inset} ${r1(yy)}Q${x} ${r1(yy + 7)} ${x + w / 2 - inset} ${r1(yy)}`; }
  s += ink(d, { w: LW.fine });
  s += shape(rrect(x - w * 0.3, y1, w * 0.6, 10, 3), { w: LW.in }) + shape(rrect(x - w * 0.3, y1 + h + 2, w * 0.6, 10, 3), { w: LW.in });
  s += ink(`M${x} ${y1 + h + 12}L${x} ${y1 + h + 26}M${x - 6} ${y1 + h + 26}L${x - 7} ${y1 + h + 44}M${x} ${y1 + h + 26}L${x} ${y1 + h + 46}M${x + 6} ${y1 + h + 26}L${x + 7} ${y1 + h + 44}`, { w: LW.in });
  return s;
}
// Long hanging crane scroll. (x, y) = top centre of the top rod; w = paper width; h = paper length.
function scroll(x, y, w, h, { emblem = null } = {}) {
  let s = '';
  s += ink(`M${x - w * 0.36} ${y}L${x} ${y - 30}L${x + w * 0.36} ${y}`, { w: LW.in });
  s += shape(ell(x, y - 31, 5, 5), { w: LW.in });
  s += shape(rrect(x - w / 2, y + 4, w, h, 2));
  s += ink(rrect(x - w / 2 + 11, y + 34, w - 22, h - 68, 2), { w: LW.in });
  const es = emblem || Math.min(w - 26, 130);
  s += shape(ell(x + w * 0.12, y + h * 0.2, w * 0.15, w * 0.15), { w: LW.in });        // sun
  s += P.emblem('crane', x, y + h * 0.45, es);
  let d = '';
  for (let i = 0; i < 3; i++) { const yy = r1(y + h * 0.7 + i * 24), x0 = x - w * 0.3 + i * 5, ww = w * 0.2; d += `M${r1(x0)} ${yy}Q${r1(x0 + ww / 2)} ${yy - 12} ${r1(x0 + ww)} ${yy}Q${r1(x0 + ww * 1.5)} ${yy + 12} ${r1(x0 + ww * 2)} ${yy}Q${r1(x0 + ww * 2.5)} ${yy - 12} ${r1(x0 + ww * 3)} ${yy}`; }
  s += ink(d, { w: LW.in });                                                           // water
  s += tube(`M${x - w / 2 - 12} ${y}L${x + w / 2 + 12} ${y}`, 7, { o: LW.in });
  s += tube(`M${x - w / 2 - 14} ${y + h + 6}L${x + w / 2 + 14} ${y + h + 6}`, 10, { o: LW.in });
  return s;
}
// Wall rack of wooden practice swords. (x,y) top-left, w wide; n swords stacked.
function swordRack(x, y, w, n = 3, gap = 40) {
  let s = '';
  const h = gap * n + 16;
  for (const px of [x + w * 0.2, x + w * 0.8]) s += shape(rrect(px - 9, y, 18, h, 4), { w: LW.in });
  for (let i = 0; i < n; i++) {
    const yy = y + 26 + gap * i;
    const d = `M${x} ${yy + 3}Q${x + w * 0.5} ${yy - 7} ${x + w} ${yy - 2}`;
    s += tube(d, 9, { o: LW.in });
    // guard + grip marks
    const gx = x + w * 0.27;
    s += shape(rrect(gx - 4, yy - 12, 8, 22, 3), { w: LW.in });
    s += ink(`M${x + w * 0.07} ${yy - 3}L${x + w * 0.07} ${yy + 7}M${x + w * 0.14} ${yy - 4}L${x + w * 0.14} ${yy + 6}`, { w: LW.fine });
    for (const px of [x + w * 0.2, x + w * 0.8]) s += shape(rrect(px - 6, yy + 6, 12, 9, 3), { w: LW.in });
  }
  return s;
}
// Ceiling: a heavy beam across the top with rafter ends below it.
function ceiling(y, W = 720, { n = 7, drop = 16 } = {}) {
  let s = '';
  for (let i = 0; i < n; i++) { const xx = (i + 0.5) * W / n; s += shape(rrect(xx - 11, y - 4, 22, drop + 6, 3), { w: LW.in }); }
  s += shape(`M-10 ${y - 30}L${W + 10} ${y - 30}L${W + 10} ${y}L-10 ${y}Z`);
  s += ink(`M-10 ${y - 15}L${W + 10} ${y - 15}`, { w: LW.fine });
  return s;
}

module.exports = { student, pole, streamers, ribbon, floor, shoji, lantern, scroll, swordRack, ceiling, STUDENT_BUILD };
