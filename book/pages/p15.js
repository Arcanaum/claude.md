// PAGE 15 — CRANE: THE TASK. MEDIUM. The spinning pole whirls; Choki cracks his knuckles; Guu and Paa flat against the wall.
const C = require('./_crane');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const y0 = 430;
  // --- partial background: wall line, one tall paper window, a few boards
  s += C.shoji(300, 70, 130, 290, { cols: 3, rows: 6 });
  s += C.floor({ y0, W, H, vx: 360, n: 7, seams: false });
  // --- Guu and Paa pressed back against the wall
  s += R.guu({ x: 548, y: 492, s: 1.15, expr: 'worried', look: [-0.9, 0.2], dir: 'left', lean: 3,
    armL: { a: [62, 8], hand: 'palm', rot: -100 }, armR: { a: [62, 8], hand: 'palm', rot: 100 } });
  s += R.paa({ x: 655, y: 500, s: 1.15, expr: 'surprised', look: [-0.9, 0.2], dir: 'left', lean: 4,
    armL: { a: [40, -110], hs: 0.9 }, armR: { a: [58, 8], rot: 100 } });
  // --- the pole
  s += C.pole({ x: 372, y: 610, h: 190, L: 250, phi: -22, dir: 1, slen: 120, sw: 22 });
  // --- Choki, eager, cracking his knuckles
  s += R.choki({ x: 118, y: 655, s: 1.55, expr: 'determined', dir: 'right', look: [0.8, 0], lean: 5,
    armL: { at: [150, 478], hand: 'fist', rot: 80, bend: -1 }, armR: { at: [168, 482], hand: 'palm', rot: -70, over: false },
    legL: { foot: [-26, -6] }, legR: { foot: [22, -6] } });
  return s;
};
