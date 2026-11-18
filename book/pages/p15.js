// PAGE 15 — CRANE: THE TASK. MEDIUM. The spinning pole whirls; Choki cracks his knuckles; Guu and Paa flat against the wall.
const C = require('./_crane');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const y0 = 452;
  // --- partial background: wall line, one tall paper window, a lantern, a few boards
  s += C.shoji(300, 92, 132, 250, { cols: 3, rows: 5 });
  s += C.floor({ y0, W, H, vx: 366, n: 7, seams: false });
  s += C.ceiling(40, W, { n: 6 });
  s += C.lantern(150, 40, 84, { w: 46, h: 96 });
  // --- Guu and Paa pressed back against the wall
  s += R.guu({ x: 602, y: 492, s: 1.08, expr: 'worried', look: [-0.9, 0.3], dir: 'left',
    armL: { a: [56, 6], hand: 'palm', rot: -110, hs: 0.9 }, armR: { a: [40, -100], hand: 'fist', hs: 0.9 } });
  s += R.paa({ x: 676, y: 500, s: 1.08, expr: 'surprised', look: [-0.9, 0.3], dir: 'left',
    armL: { a: [36, -112], hs: 0.85 }, armR: { a: [56, 6], rot: 110, hs: 0.9 } });
  // --- the pole
  s += C.pole({ x: 362, y: 590, h: 180, L: 172, phi: -8, ry: 0.3, dir: 1, slen: 104, sw: 22, arcSpan: 110 });
  // --- Choki, eager, cracking his knuckles
  s += R.choki({ x: 128, y: 668, s: 1.4, expr: 'determined', dir: 'right', look: [0.9, -0.1], lean: 4,
    armL: { at: [112, 580], hand: 'fist', rot: 90, over: true }, armR: { at: [152, 592], hand: 'palm', rot: -8, over: true },
    legL: { foot: [-26, -6] }, legR: { foot: [22, -6] } });
  s += R.ink('M196 520L214 508M202 540L224 536M198 560L218 568', { w: R.LW.in });
  return s;
};
