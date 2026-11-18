// PAGE 15 — CRANE: THE TASK. MEDIUM. The spinning pole whirls; Choki cracks his knuckles; Guu and Paa flat against the wall.
const C = require('./_crane');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const y0 = 418;
  // --- partial background: wall line, one tall paper window, a few boards
  s += C.shoji(316, 52, 120, 236, { cols: 3, rows: 5 });
  s += C.floor({ y0, W, H, vx: 360, n: 7, seams: false });
  // --- Guu and Paa pressed back against the wall
  s += R.guu({ x: 588, y: 468, s: 1.05, expr: 'worried', look: [-0.9, 0.3], dir: 'left',
    armL: { a: [58, 6], hand: 'palm', rot: -110, hs: 0.9 }, armR: { a: [58, 6], hand: 'palm', rot: 110, hs: 0.9 } });
  s += R.paa({ x: 676, y: 474, s: 1.05, expr: 'surprised', look: [-0.9, 0.3], dir: 'left',
    armL: { a: [36, -112], hs: 0.85 }, armR: { a: [56, 6], rot: 110, hs: 0.9 } });
  // --- the pole
  s += C.pole({ x: 366, y: 520, h: 168, L: 186, phi: 17, dir: -1, slen: 96, sw: 21, arcSpan: 62 });
  // --- Choki, eager, cracking his knuckles
  s += R.choki({ x: 122, y: 660, s: 1.5, expr: 'determined', dir: 'right', look: [0.9, -0.1], lean: 4,
    armL: { at: [112, 548], hand: 'fist', rot: 90, over: true }, armR: { at: [150, 548], hand: 'palm', rot: -12, hs: 1.05, over: true },
    legL: { foot: [-26, -6] }, legR: { foot: [22, -6] } });
  s += R.ink('M186 500L204 488M192 520L214 516M188 540L208 548', { w: R.LW.in });
  return s;
};
