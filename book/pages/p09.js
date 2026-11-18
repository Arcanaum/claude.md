// PAGE 9 — TIGER: THE TASK. MEDIUM. The big barrel; Guu rubs his palms; Choki and Paa trade a doubtful look.
const T = require('./_tiger');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FL = 500, GY = 610;
  // partial background: wall rail, one rack, floor line, mat
  s += R.ink(`M-10 ${FL}L730 ${FL}`, { w: R.LW.out });
  s += T.rack(430, 70, 190, 300, 4);
  s += T.mat(20, 545, 310, 110, 60, { weave: 8 });
  // the student's huge pointing hand coming in from the top-left corner
  s += R.tube('M-80 -70L60 56', 96);
  s += R.ink('M16 82L84 14', { w: R.LW.in });
  s += R.hand('point', 114, 114, 150, { rotDeg: 136, side: -1 });
  // barrel
  s += T.barrel(168, GY, 226, 330);
  // Guu, delighted, rubbing his palms
  const sc = 1.22;
  s += R.guu({ x: 420, y: GY + 8, s: sc, dir: 'left', expr: 'grin', look: [-0.8, -0.2], lean: -4,
    armL: { to: [-2, 30], hand: 'palm', rot: -62, hs: 1.05, over: true }, armR: { to: [-40, 26], hand: 'palm', rot: -38, hs: 1.05, over: true, thumb: -1 } });
  s += R.ink(`M322 ${GY - 150}L310 ${GY - 162}M312 ${GY - 128}L296 ${GY - 130}`, { w: R.LW.in });
  // Choki and Paa exchange a look
  s += R.choki({ x: 545, y: GY + 14, s: sc, dir: 'right', expr: 'doubtful', look: [0.9, 0], headTilt: 6, armL: { a: [24, -60], hand: 'mitt' }, armR: { a: [10, 4], hand: 'mitt' } });
  s += R.paa({ x: 658, y: GY + 10, s: sc, dir: 'left', expr: 'worried', look: [-0.9, 0], headTilt: -6, armL: { a: [34, -80], hand: 'mitt' }, armR: { a: [34, -80], hand: 'mitt' } });
  return s;
};
