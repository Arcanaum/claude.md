// PAGE 21 — TURTLE: THE TASK. MEDIUM. The sensei sets a shallow bowl of water on Paa's open palms.
const T = require('./_turtle');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FY = 430, G = 612, sc = 1.5;
  // partial background: wall line, round window, one potted pine, a slice of the shell floor
  s += R.shape(R.ell(250, 190, 96, 96)) + R.shape(R.ell(250, 190, 80, 80), { w: R.LW.in });
  s += T.clipRect(170, 110, 160, 160, P.pine([[150, 250], [230, 214], [300, 222], [350, 190]], { w: 12, fans: [[236, 208, 44, -90], [300, 216, 40, -80]] }) + T.sparrow(262, 205, 46, { flip: true }), 80);
  s += R.ink(`M-10 ${FY}L730 ${FY}`, { w: R.LW.out });
  s += T.shellFloor(300, 640, 400, 96);
  const by = G - 100 * sc, bx = 292;
  // onlookers
  s += R.choki({ x: 668, y: G - 8, s: sc, dir: 'left', look: [-1, 0.3], lean: -9, expr: { eyes: 'wide', brows: 'up', mouth: 'small' }, armL: { a: [30, -100], hand: 'mitt' }, armR: { a: [18, 20], hand: 'mitt' } });
  s += R.guu({ x: 566, y: G, s: sc, dir: 'left', look: [-1, 0.3], lean: -10, expr: { eyes: 'wide', brows: 'up', mouth: 'smile' }, armL: { a: [25, -110] }, armR: { a: [20, 20] } });
  // the sensei, leaning forward
  const sen = T.sensei({ x: 112, y: G + 6, s: sc, dir: 'right', lean: 7, armR: { at: [bx - 62, by + 6] }, armL: { at: [bx - 78, by + 30], behind: true } });
  // Paa: both arms straight out, palms up
  const paa = R.paa({ x: 440, y: G, s: sc, dir: 'left', look: [-1, 0.4], expr: 'whisper', lean: -3,
    armL: { at: [bx + 46, by + 44], hand: 'palm', rot: -96, thumb: 1, hs: 1.1 }, armR: { at: [bx + 70, by + 52], hand: 'palm', rot: -100, thumb: 1, hs: 1.1 } });
  s += paa + sen;
  s += T.bowl(bx, by, 150);
  // little "set down" marks
  s += R.ink(`M${bx - 40} ${by - 34}L${bx - 46} ${by - 54}M${bx} ${by - 38}L${bx} ${by - 60}M${bx + 40} ${by - 34}L${bx + 46} ${by - 54}`, { w: R.LW.in });
  return s;
};
