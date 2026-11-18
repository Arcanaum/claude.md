// PAGE 27 — JAN-KEN-PO! second choice. OPEN. Art box 720 x 430.
// The three brothers crouched at the eave of the Great Hall roof, each throwing a different hand (fist / two fingers / open palm), moon behind,
// the steep roof rising to the right, the courtyard far below.
const F = require('./_roof');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const ey = 300; // eave line
  // sky
  s += F.sky([266, 78, 72], [[44, 50, 12], [108, 120, 9], [560, 96, 8], [684, 50, 10]]);
  // far below: tiny dojo roofs and a lantern string
  s += P.dojoMini('tiger', 84, 394, 104) + P.dojoMini('crane', 290, 398, 104) + P.dojoMini('turtle', 496, 394, 104);
  s += F.lanternString([596, 352], [730, 346], 12, [0.3, 0.75], 0.42);
  // the roof rising behind them: a band of tiles up to the ridge
  const ty = 206;
  s += F.plane([[-10, ty], [730, ty], [730, ey], [-10, ey]], { tw: 80, th: 52, outline: false });
  s += F.ridge([-40, ty + 4], [760, ty + 4], { h: 24, capR: 19, horns: [false, false] });
  s += F.eave([-20, ey + 6], [740, ey + 6], { r: 17, board: 16 });
  // brothers
  const y = ey - 2, sc = 1.22;
  s += R.guu({ x: 150, y, s: sc, crouch: 26, dir: 'right', expr: 'determined', look: 'right', lean: 5,
    build: { armU: 30, armF: 28 }, armR: { at: [262, 176], hand: 'fist', hs: 1.7, rot: 24 }, armL: { a: [30, -70], hand: 'fist' }, legL: { foot: [-30, -6] }, legR: { foot: [30, -6] } });
  s += R.paa({ x: 584, y, s: sc, crouch: 26, dir: 'left', expr: 'grin', look: 'left', lean: -5,
    build: { armU: 30, armF: 28 }, armL: { at: [492, 176], hand: 'palm', hs: 1.5, rot: -10 }, armR: { a: [30, -60], hand: 'fist' }, legL: { foot: [-28, -6] }, legR: { foot: [28, -6] } });
  s += R.choki({ x: 366, y, s: sc, crouch: 26, expr: 'determined', lean: 0,
    armR: { a: [166, 2], hand: 'v', hs: 1.5, over: true, rot: -4 }, armL: { a: [34, -70], hand: 'fist' }, legL: { foot: [-24, -6] }, legR: { foot: [24, -6] } });
  return s;
};
