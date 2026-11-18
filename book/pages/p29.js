// PAGE 29 — CHOKI LEADS. BUSY. 720 x 690, two-finger badge top-right.
// Choki runs the ridge like a tightrope; Guu and Paa scramble up behind; a startled cat shoots out from behind
// the crooked chimney. MEOW!
const F = require('./_roof');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const ry = 452; // bottom edge of the ridge bar
  const top = ry - 34; // where feet stand
  // night sky
  s += F.sky([112, 104, 66], [[250, 50, 12], [40, 250, 9], [330, 130, 8], [560, 60, 11], [690, 250, 9], [470, 300, 8]]);
  s += P.cloud(240, 300, 110);
  // chimney (behind the ridge)
  s += F.chimney(630, ry - 6, 1.2, { lean: 7 });
  // the masked girl, far along the roof, wobbling on the chimney top — she has turned around
  s += R.girl({ x: 658, y: 216, s: 0.56, mask: true, lean: -8, expr: 'surprised', look: 'left', armL: { a: [105, 10] }, armR: { a: [70, 30] }, legL: { a: [50, -80] } });
  // brothers scrambling up from the far side of the ridge (their hands are drawn after the ridge, hooked over it)
  s += R.guu({ x: 76, y: ry + 6, s: 1.2, expr: 'strain', lean: 6, look: 'right',
    armL: { at: [26, top - 2], hand: 'none' }, armR: { at: [138, top - 2], hand: 'none' } });
  s += R.paa({ x: 220, y: ry + 44, s: 1.2, expr: 'surprised', lean: -4, look: 'right',
    armL: { at: [166, top - 2], hand: 'none' }, armR: { at: [278, top - 2], hand: 'none' } });
  // front roof plane + ridge
  s += F.plane([[-10, ry - 4], [730, ry - 4], [730, 700], [-10, 700]], { tw: 76, th: 52, outline: false });
  s += F.ridge([-40, ry], [760, ry], { h: 34, capR: 22, horns: [false, false] });
  s += R.hand('fist', 28, top - 4, 40, { rotDeg: 170 }) + R.hand('fist', 136, top - 4, 40, { rotDeg: 190, side: -1 });
  s += R.hand('palm', 168, top + 8, 62, { rotDeg: 172 }) + R.hand('palm', 276, top + 8, 62, { rotDeg: 188, side: -1 });
  // lanterns strung below
  s += F.lanternString([-10, 520], [730, 536], 30, [0.1, 0.3, 0.5, 0.7, 0.9], 1.05);
  // the cat
  s += F.cat(540, top - 22, 0.95, { rotDeg: -8 });
  s += P.hollow('MEOW!', 510, 178, 58, { rotDeg: -7 });
  // Choki, tightrope-running
  s += R.choki({ x: 336, y: top - 20, s: 1.6, dir: 'right', expr: 'surprised', look: 'right', lean: -9,
    armL: { a: [122, 24] }, armR: { a: [58, 34] },
    legL: { foot: [4, -6], footRot: 10 }, legR: { a: [58, -84] } });
  return s;
};
