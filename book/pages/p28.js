// PAGE 28 — GUU LEADS. BUSY. 720 x 690, fist badge top-right.
// Seen from below: Guu crawls straight up the steep tiles (from behind), Choki and Paa each hang on to an ankle
// and look back at the loose tile skidding away. Tiny masked girl wobbling on the ridge far above.
const F = require('./_roof');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  // night sky
  s += F.sky([120, 60, 52], [[250, 40, 12], [330, 86, 9], [560, 60, 10], [40, 150, 9]]);
  // tiny girl on the ridge, seen from behind, wobbling on one leg
  s += R.girl({ x: 452, y: 124, s: 0.45, dir: 'back', mask: true, lean: 9, armL: { a: [100, 10] }, armR: { a: [75, 30] }, legR: { a: [50, -80] } });
  // the steep roof: tiles everywhere
  s += F.plane([[-10, 150], [730, 150], [730, 700], [-10, 700]], { tw: 72, th: 50, outline: false });
  s += F.ridge([-40, 158], [760, 158], { h: 30, capR: 21, horns: [false, false] });

  // Guu, from behind, crawling up
  const g = R.guu({ x: 372, y: 478, s: 1.5, dir: 'back', lean: -5,
    armL: { a: [152, 14], hand: 'grip', over: true }, armR: { a: [118, 58], hand: 'grip', over: true },
    legL: { a: [42, -30] }, legR: { a: [62, -84] } });
  s += g;
  const aL = g.info.ankleL, aR = g.info.ankleR;
  // brothers hanging on, looking down at the tile
  s += R.choki({ x: aL[0] - 62, y: aL[1] + 172, s: 1.15, lean: 10, expr: 'surprised', look: [0.8, 1],
    armR: { at: [aL[0] - 2, aL[1] + 6], hand: 'grip', over: true }, armL: { a: [118, 30], hand: 'v' },
    legL: { a: [16, 10] }, legR: { a: [-8, 30] } });
  s += R.paa({ x: aR[0] + 70, y: aR[1] + 190, s: 1.15, lean: -12, expr: 'worried', look: [-0.8, 1],
    armL: { at: [aR[0] + 2, aR[1] + 6], hand: 'grip', over: true }, armR: { a: [112, 40], hand: 'palm' },
    legL: { a: [-6, 26] }, legR: { a: [20, 8] } });

  // the loose tile skidding away + CLACK
  s += R.ink('M352 532L346 560M384 530L388 556M368 526L368 548', { w: R.LW.in });
  s += F.looseTile(366, 598, 1.25, 14);
  s += P.hollow('CLACK', 372, 678, 50, { rotDeg: -4 });
  s += P.hollow('CLACK', 96, 420, 34, { rotDeg: -12 });
  s += P.hollow('CLACK', 640, 330, 30, { rotDeg: 10 });
  return s;
};
