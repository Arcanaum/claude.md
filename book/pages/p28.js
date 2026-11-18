// PAGE 28 — GUU LEADS. BUSY. 720 x 690, fist badge top-right.
// Seen from below: Guu crawls straight up the steep tiles (from behind), Choki and Paa each hang on to an ankle
// and look back at the loose tile skidding away. Tiny masked girl wobbling on the ridge far above.
const F = require('./_roof');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  // night sky
  s += F.sky([116, 70, 54], [[250, 40, 12], [330, 100, 9], [560, 70, 10], [30, 150, 9]]);
  // tiny girl on the ridge, seen from behind, wobbling on one leg
  s += R.girl({ x: 452, y: 152, s: 0.56, mask: true, lean: 9, expr: 'surprised', look: 'down', armL: { a: [100, 10] }, armR: { a: [75, 30] }, legR: { a: [50, -80] } });
  // the steep roof: tiles everywhere
  s += F.plane([[-10, 177], [730, 177], [730, 700], [-10, 700]], { tw: 72, th: 50, outline: false });
  s += F.ridge([-40, 185], [760, 185], { h: 30, capR: 21, horns: [false, false] });

  // Guu, from behind, crawling up. (Legs/arms slightly stretched via the rig's `build` option so the chain reads.)
  const gs = 1.32, gx = 372;
  const guuO = { x: gx, y: 487, s: gs, dir: 'back', lean: -4, build: { th: 34, sh: 32 },
    armL: { a: [104, 62], hand: 'grip' }, armR: { a: [92, 40], hand: 'grip' },
    legL: { a: [24, -8], footRot: 10 }, legR: { a: [34, -44], footRot: -10 } };
  const g = R.guu(guuO);
  const aL = g.info.ankleL, aR = g.info.ankleR;
  // brothers hanging on to an ankle each, looking back down at the tile (drawn first, Guu's legs in front)
  const bs = 1.05, long = { armU: 31, armF: 29 };
  const c = R.choki({ x: aL[0] - 88, y: aL[1] + 160, s: bs, lean: -8, expr: 'surprised', look: [0.8, 1], build: long,
    armR: { at: [aL[0] - 6, aL[1] + 4], hand: 'none' }, armL: { a: [112, 40], hand: 'v' },
    legL: { a: [18, 6] }, legR: { a: [-10, 30] } });
  const p = R.paa({ x: aR[0] + 92, y: aR[1] + 164, s: bs, lean: 8, expr: 'worried', look: [-0.8, 1], build: long,
    armL: { at: [aR[0] + 6, aR[1] + 4], hand: 'none' }, armR: { a: [108, 44], hand: 'palm' },
    legL: { a: [-8, 28] }, legR: { a: [20, 6] } });
  s += c + p + g;
  s += R.hand('fist', c.info.wristR[0] + 4, c.info.wristR[1] - 4, 36, { rotDeg: 60, side: -1 });
  s += R.hand('fist', p.info.wristL[0] - 4, p.info.wristL[1] - 4, 36, { rotDeg: -60, side: 1 });

  // the loose tile skidding away + CLACK
  s += R.ink('M352 560L346 588M384 558L388 584M368 554L368 576', { w: R.LW.in });
  s += F.looseTile(366, 628, 1.3, -18) + F.puff(312, 652, 36, -20) + F.puff(424, 646, 32, 15);
  s += P.hollow('CLACK', 108, 388, 62, { rotDeg: -12 });
  s += P.hollow('CLACK', 606, 330, 62, { rotDeg: 10 });
  return s;
};
