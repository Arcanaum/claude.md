// PAGE 14 — CRANE: CAUGHT. BUSY. The tall student frozen in crane stance, looking down her nose at the tiny brothers.
const C = require('./_crane');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const y0 = 500; // wall / floor line
  // --- back wall
  s += R.shape(`M-10 458L${W + 10} 458L${W + 10} 470L-10 470Z`, { w: R.LW.in });
  s += C.shoji(28, 100, 150, 330, { cols: 3, rows: 6 });
  s += C.shoji(578, 100, 150, 330, { cols: 3, rows: 6 });
  s += C.swordRack(196, 322, 150, 3, 40);
  s += C.floor({ y0, W, H, vx: 400, n: 14 });
  s += C.ceiling(46, W, { n: 8 });
  s += C.lantern(300, 46, 62, { w: 42, h: 84 });
  s += C.lantern(556, 46, 62, { w: 42, h: 84 });
  // --- the student, one leg, arms spread
  s += C.student({ x: 428, y: 640, s: 1.8, dir: 'left', look: [-0.8, 1], headTilt: 6,
    armL: { a: [102, 14], rot: 185, hand: 'palm', hs: 0.5 }, armR: { a: [102, 14], rot: 175, hand: 'palm', hs: 0.5 },
    legR: { a: [80, -100], footRot: 30 }, legL: { foot: [-2, -6], footRot: 0 } });
  // --- the brothers, tiny, caught
  s += R.paa({ x: 66, y: 664, s: 0.82, dir: 'right', look: [0.7, -1], expr: 'worried', armL: { a: [28, -115], hs: 0.8 }, armR: { a: [28, -115], hs: 0.8 } });
  s += R.guu({ x: 160, y: 668, s: 0.82, dir: 'right', look: [0.7, -1], expr: 'surprised', armL: { a: [35, 20] }, armR: { a: [35, 20] } });
  s += R.choki({ x: 258, y: 662, s: 0.82, dir: 'right', look: [0.6, -1], expr: 'whisper', lean: -8, armL: { a: [30, 10], hand: 'fist' }, armR: { a: [30, -110], hand: 'fist' } });
  return s;
};
