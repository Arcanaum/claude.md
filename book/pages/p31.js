// PAGE 31 — FACE TO FACE. Framed, short art box 720 x 440. NIGHT. On the ridge: the girl (mask pulled down),
// wobbling, facing the three brothers; Guu holds up the lost hood. The three dojos far below, over the eave.
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const F = R.LW.fine, IN = R.LW.in;
  const RY = 292; // top of the ridge = where everybody stands

  // ---------- sky ----------
  s += P.moon(566, 138, 120);
  // (craters re-placed so none of them sits half behind the girl)
  s += `<circle cx="566" cy="138" r="115" fill="#fff"/>`;
  s += R.ink(R.ell(632, 62, 18, 18)) + R.ink(R.ell(652, 200, 12, 12)) + R.ink(R.ell(492, 76, 9, 9));
  for (const [x, y, r] of [[40, 40, 12], [150, 70, 8], [262, 34, 11], [396, 120, 8], [420, 40, 9], [702, 40, 9], [22, 150, 8]]) s += P.star(x, y, r);

  // ---------- far below: the three dojos, glimpsed over the eave ----------
  s += P.dojoMini('tiger', 104, 398, 128) + P.dojoMini('crane', 344, 400, 128) + P.dojoMini('turtle', 584, 398, 128);
  s += R.ink('M-10 436L730 436', { w: IN });

  // crooked chimney, behind the ridge at the far right
  s += R.shape(R.poly([672, RY + 4], [666, RY - 62], [716, RY - 72], [722, RY + 4]));
  s += R.shape(R.xf(R.rrect(-33, -9, 66, 18, 5), R.chain(R.tr(691, RY - 70), R.rot(-11))));
  s += R.ink(`M669 ${RY - 36}L720 ${RY - 42}M671 ${RY - 14}L721 ${RY - 18}M694 ${RY - 39}L695 ${RY - 16}`, { w: F });

  // ---------- the roof: ridge + near slope + eave ----------
  const slope = `M-20 ${RY + 14}L740 ${RY + 14}L740 346Q360 330 -20 346Z`;
  s += R.shape(slope);
  s += `<clipPath id="p31r"><path d="${slope}"/></clipPath><g clip-path="url(#p31r)">${P.tiles(-12, RY + 22, 760, 40, { tw: 48, th: 26 })}</g>`;
  s += R.ink(slope, { w: R.LW.out });
  s += R.tube('M-20 346Q360 330 740 346', 8);
  s += R.shape(R.poly([-20, RY], [740, RY], [740, RY + 22], [-20, RY + 22]));
  s += R.ink(`M-20 ${RY + 11}L740 ${RY + 11}`, { w: F });

  // ---------- the brothers ----------
  const fy = RY + 2, bs = 1.0;
  s += R.paa({ x: 68, y: fy, s: bs, dir: 'right', expr: 'happy', look: [1, -0.6], headTilt: -4,
    armL: { a: [146, 22], over: true, hs: 1.15 }, armR: { a: [6, 4] } });
  s += R.choki({ x: 198, y: fy, s: bs, dir: 'right', expr: 'grin', look: [1, -0.6], lean: 3,
    armL: { a: [162, 0], over: true, hs: 1.1 }, armR: { a: [38, -82], hand: 'fist' } });
  const gx = 322;
  const guuO = { x: gx, y: fy, s: bs, dir: 'right', expr: 'determined', look: [1, -0.6], lean: 4, carryHood: false,
    armL: { a: [30, -70] }, armR: { a: [158, 0], over: true, hs: 1.15 }, legR: { foot: [24, -6] } };
  const gi = R.guu(guuO).info;
  s += P.lostHood(gi.wristR[0] + 14, gi.wristR[1] - 60, 84, { rotDeg: 10 });   // the hood, in his raised fist
  s += R.guu(guuO);

  // ---------- the girl: a head taller, mask pulled down, mid-wobble on one leg ----------
  const girlO = { x: 572, y: fy, s: 1.04, dir: 'left', expr: 'surprised', look: [-1, 0.5], lean: 9, headTilt: 6, shift: 4,
    armL: { a: [74, 14] }, armR: { a: [108, -24] },
    legR: { foot: [2, -6] }, legL: { a: [72, -108] } };
  const girl = R.girl(girlO);
  s += girl;
  // the mask-scarf bunched down around her neck
  const n = girl.info.neck, m = R.chain(R.tr(n[0], n[1] - 2), R.rot(9), R.sc(1.2));
  s += R.shape(R.xf('M20 12L44 6L40 22L50 34L26 26Z', m), { w: IN });
  s += R.union([{ d: R.xf(R.ell(-12, 14, 15, 9), m) }, { d: R.xf(R.ell(12, 15, 16, 9.5), m) }, { d: R.xf(R.ell(0, 10, 14, 8), m) }], { o: IN });
  s += R.ink(R.xf('M-16 15Q-6 20 4 14M6 18Q14 21 22 15', m), { w: F });
  // wobble marks
  s += R.ink('M666 70Q678 86 666 102M682 58Q698 86 682 114', { w: IN });
  s += R.ink('M462 216Q450 228 460 242M448 206Q432 228 446 250', { w: IN });
  return s;
};
