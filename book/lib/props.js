// Shared props that must look identical wherever they appear.
'use strict';
const R = require('./rig');
const { shape, ink, tube, union, ell, rrect, line, poly, curve, xf, chain, tr, rot, sc, LW } = R;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// Hollow, colourable block letters (Baloo 2 ExtraBold).
function hollow(text, x, y, size, { rotDeg = 0, anchor = 'middle', w = LW.out, fill = '#fff', spacing = 0 } = {}) {
  return `<text x="${x}" y="${y}" font-family="'Baloo 2'" font-weight="800" font-size="${size}" text-anchor="${anchor}" letter-spacing="${spacing}" ` +
    `fill="${fill}" stroke="#000" stroke-width="${w}" stroke-linejoin="round" paint-order="stroke fill"${rotDeg ? ` transform="rotate(${rotDeg} ${x} ${y})"` : ''}>${esc(text)}</text>`;
}
// Solid small label text (Baloo 2 Bold) — for captions inside art.
function label(text, x, y, size = 24, { anchor = 'middle', weight = 700, family = "'Baloo 2'", italic = false, rotDeg = 0 } = {}) {
  return `<text x="${x}" y="${y}" font-family="${family}" font-weight="${weight}" font-size="${size}" text-anchor="${anchor}"${italic ? ' font-style="italic"' : ''} fill="#000"${rotDeg ? ` transform="rotate(${rotDeg} ${x} ${y})"` : ''}>${esc(text)}</text>`;
}

function moon(x, y, r = 60) {
  return shape(ell(x, y, r, r)) + ink(ell(x - r * 0.3, y - r * 0.2, r * 0.18)) + ink(ell(x + r * 0.25, y + r * 0.3, r * 0.12)) + ink(ell(x + r * 0.3, y - r * 0.38, r * 0.08));
}
function star(x, y, r = 10) {
  const p = []; for (let i = 0; i < 8; i++) { const a = Math.PI * i / 4 - Math.PI / 2, q = i % 2 ? r * 0.38 : r; p.push([R.r1(x + q * Math.cos(a)), R.r1(y + q * Math.sin(a))]); }
  return shape(poly(...p), { w: LW.in });
}
function cloud(x, y, w = 120) {
  const k = w / 120;
  return shape(xf('M-50 10C-66 10 -66 -12 -48 -12C-46 -30 -18 -34 -10 -18C0 -34 30 -30 30 -12C54 -16 62 10 44 10Z', chain(tr(x, y), sc(k))), { w: LW.in });
}

// The lost ninja hood (pages 4, 31, 32). (x,y) = centre, size = height.
function lostHood(x, y, size = 120, { rotDeg = 0, fill = '#fff', flutter = true } = {}) {
  const m = chain(tr(x, y), rot(rotDeg), sc(size / 100));
  let s = shape(xf('M-34 8C-40 -30 -20 -50 2 -50C26 -50 42 -30 36 6C34 22 30 34 26 44L14 34L4 48L-8 36L-20 48C-28 36 -32 22 -34 8Z', m), { fill });
  s += shape(xf('M-20 -12Q2 -22 24 -12Q28 0 24 10Q2 18 -20 10Q-24 0 -20 -12Z', m), { w: LW.in, fill: '#fff' });
  if (flutter) s += shape(xf('M34 -18L64 -30L58 -14L70 -2L36 -4Z', m), { fill, w: LW.in });
  return s;
}

// Rows of rounded roof tiles filling a w x h box whose top-left is (x,y). Clip it yourself if needed.
function tiles(x, y, w, h, { tw = 46, th = 34, stagger = true } = {}) {
  let s = '';
  for (let r = 0, yy = y; yy < y + h; r++, yy += th) {
    const off = stagger && r % 2 ? -tw / 2 : 0;
    for (let xx = x + off; xx < x + w; xx += tw) s += ink(`M${xx} ${yy}L${xx} ${yy + th * 0.45}Q${xx + tw / 2} ${yy + th * 1.15} ${xx + tw} ${yy + th * 0.45}L${xx + tw} ${yy}`, { w: LW.in });
  }
  return s;
}

// Emblems for the three dojos. (x,y) = centre, size = height.
function emblem(kind, x, y, size = 100) {
  const m = chain(tr(x, y), sc(size / 100)); const P = d => xf(d, m); const big = size >= 140;
  if (kind === 'tiger') {
    let s = shape(P('M-34 -30L-24 -48L-10 -36Q0 -40 10 -36L24 -48L34 -30C44 -10 40 22 22 36Q0 50 -22 36C-40 22 -44 -10 -34 -30Z'));
    s += shape(P(ell(-15, -6, 6, 7)), { w: LW.in }) + shape(P(ell(15, -6, 6, 7)), { w: LW.in }) + R.dot(...R.ap(m, [-15, -5]), 2.6 * size / 100) + R.dot(...R.ap(m, [15, -5]), 2.6 * size / 100);
    s += shape(P('M-7 10L7 10L0 19Z'), { w: LW.in }) + ink(P('M0 19L0 26M-12 28Q-6 34 0 26Q6 34 12 28'));
    s += ink(P('M-6 -36L-3 -22M6 -36L3 -22M0 -38L0 -24')) + ink(P('M-38 -4L-26 0M-40 10L-27 10M38 -4L26 0M40 10L27 10'));
    s += ink(P('M-24 -19L-8 -13M24 -19L8 -13'), { w: LW.out });                       // fierce brows
    s += shape(P('M-9 29L-5 38L-2 29Z'), { w: LW.fine }) + shape(P('M9 29L5 38L2 29Z'), { w: LW.fine }); // fangs
    s += ink(P('M-34 22L-22 18M34 22L22 18M-30 -22L-22 -14M30 -22L22 -14'));
    return s;
  }
  if (kind === 'crane') {
    let s = shape(P('M-6 44L-2 10C-30 14 -46 -4 -50 -26C-34 -16 -22 -14 -8 -14C-6 -30 2 -44 16 -46C26 -47 32 -40 46 -38L30 -32C22 -30 16 -22 14 -12C30 -8 44 4 50 22C34 12 20 10 6 12L4 44Z'));
    s += R.dot(...R.ap(m, [18, -39]), 2.4 * size / 100);
    s += ink(P('M-36 -8Q-22 -2 -8 0M34 10Q20 4 8 2'));
    return s;
  }
  // turtle
  let s = shape(P(ell(0, 4, 40, 32)));
  s += shape(P(ell(0, -36, 11, 10)), { w: LW.in }) + shape(P(ell(-34, -20, 8, 7)), { w: LW.in }) + shape(P(ell(34, -20, 8, 7)), { w: LW.in }) + shape(P(ell(-34, 28, 8, 7)), { w: LW.in }) + shape(P(ell(34, 28, 8, 7)), { w: LW.in });
  s += shape(P(ell(0, 4, 40, 32)));
  s += ink(P('M0 -12L14 -4L14 12L0 20L-14 12L-14 -4Z')) + ink(P('M0 -12L0 -28M14 -4L34 -14M14 12L34 22M0 20L0 36M-14 12L-34 22M-14 -4L-34 -14'));
  return s;
}

// A small dojo seen from above/far away with its banner (pages 1, 4, 5, 31). (x,y) = centre of roof, w = roof width.
function dojoMini(kind, x, y, w = 150) {
  const k = w / 150; const m = chain(tr(x, y), sc(k)); const P = d => xf(d, m);
  let s = '';
  s += shape(P('M-52 6L52 6L52 44L-52 44Z'), { w: LW.in });               // wall
  s += shape(P('M-10 18L10 18L10 44L-10 44Z'), { w: LW.in });             // door
  s += shape(P('M-80 10Q-70 6 -60 -14Q0 -40 60 -14Q70 6 80 10Q0 -2 -80 10Z')); // roof
  s += ink(P('M-40 -14Q-44 -2 -48 5M-20 -22Q-22 -8 -24 2M0 -25L0 1M20 -22Q22 -8 24 2M40 -14Q44 -2 48 5'), { w: LW.fine });
  s += tube(xf('M70 44L70 -64', m), 3 * k, { o: LW.in });                  // banner pole
  s += shape(P('M73 -62L112 -62L112 -8L92 -18L73 -8Z'), { w: LW.in });   // banner
  s += emblem(kind, x + 92 * k, y - 38 * k, 30 * k);
  return s;
}

// The Great Hall — the tall roof the girl practises on. Same silhouette on 12, 18, 24 (through a window)
// and as the building on 26-31. (x,y) = centre of the ridge, w = full width of the lower roof.
function greatHall(x, y, w = 300, { body = true } = {}) {
  const k = w / 300; const m = chain(tr(x, y), sc(k)); const P = d => xf(d, m);
  let s = '';
  if (body) s += shape(P('M-96 96L96 96L96 150L-96 150Z'), { w: LW.in }) + shape(P('M-60 20L60 20L60 62L-60 62Z'), { w: LW.in });
  s += shape(P('M-150 100Q-128 92 -112 62L112 62Q128 92 150 100Q0 84 -150 100Z'));      // lower roof
  s += shape(P('M-104 26Q-86 18 -72 -8Q0 -30 72 -8Q86 18 104 26Q0 12 -104 26Z'));        // upper roof
  s += shape(P('M-66 -10L-58 -22L58 -22L66 -10Z'), { w: LW.in });                          // ridge
  s += shape(P('M-70 -8L-78 -30L-60 -22Z'), { w: LW.in }) + shape(P('M70 -8L78 -30L60 -22Z'), { w: LW.in }); // ridge horns
  s += shape(P('M30 -22L30 -44L46 -48L46 -22Z'), { w: LW.in });                            // crooked chimney
  s += ink(P('M-40 -6Q-46 8 -52 18M-14 -12Q-16 4 -18 15M14 -12Q16 4 18 15M40 -6Q46 8 52 18'), { w: LW.fine });
  s += ink(P('M-80 68Q-88 82 -96 92M-40 66Q-44 80 -48 89M0 64L0 87M40 66Q44 80 48 89M80 68Q88 82 96 92'), { w: LW.fine });
  return s;
}

// A pine bough: a thick branch along pts with needle fans. pts = [[x,y],...]
function pine(pts, { w = 26, fans = [] } = {}) {
  let s = tube(curve(pts), w);
  for (const [fx, fy, fr = 60, fa = -90] of fans) s += needles(fx, fy, fr, fa);
  return s;
}
function needles(x, y, r = 60, angDeg = -90, n = 9, spread = 150) {
  let d = '';
  for (let i = 0; i < n; i++) { const a = (angDeg - spread / 2 + spread * i / (n - 1)) * Math.PI / 180; d += `M${x} ${y}L${R.r1(x + r * Math.cos(a))} ${R.r1(y + r * Math.sin(a))}`; }
  return ink(d, { w: LW.in });
}

// The three clues.
function thread(x, y, size = 80) { const k = size / 80; return ink(xf('M-36 6C-20 -22 -6 22 8 -4C18 -22 30 -6 36 -14', chain(tr(x, y), sc(k))), { w: LW.out }); }
function paperCrane(x, y, size = 80) {
  const P = d => xf(d, chain(tr(x, y), sc(size / 80)));
  return shape(P('M-40 -6L-8 4L-2 -34L12 2L40 -22L22 14L2 30L-14 14Z')) + ink(P('M-8 4L2 30M12 2L2 30M-8 4L12 2'), { w: LW.in });
}
function bell(x, y, size = 80) {
  const P = d => xf(d, chain(tr(x, y), sc(size / 80)));
  return shape(P(ell(0, -30, 7, 7)), { w: LW.in }) + shape(P('M-6 -24C-26 -20 -26 4 -30 18L30 18C26 4 26 -20 6 -24Z')) + shape(P(rrect(-34, 16, 68, 9, 4)), { w: LW.in }) + shape(P(ell(0, 31, 7, 7)), { w: LW.in });
}

module.exports = { hollow, label, moon, star, cloud, lostHood, tiles, emblem, dojoMini, greatHall, pine, needles, thread, paperCrane, bell, esc };
