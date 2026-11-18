// PAGE 11 — TIGER: THE SOLVE. BUSY. Choki's rope round the barrel, Paa's staff rollers, Guu's pulling FIST.
const T = require('./_tiger');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FL = 380, GY = 590;
  // ---- wall ----
  s += R.shape(R.rrect(-20, -10, 760, 40, 0));
  s += R.ink('M-10 16L730 16', { w: R.LW.fine });
  s += R.shape(R.rrect(-20, FL - 30, 760, 30, 0));
  s += T.rack(36, 66, 250, 262, 5);
  s += T.banner(370, 80, 104, 200, { emblemSize: 70 });
  // ---- floor ----
  s += R.shape(R.rrect(-20, FL, 760, 320, 0));
  s += T.boards(FL, 700, { n: 13, cross: false });
  s += T.mat(170, 455, 500, 200, 120, { weave: 16 });

  // ---- rollers, barrel, rope ----
  const BX = 468, BW = 210, BH = 300;
  for (const rx of [215, 290, 365, 440, 515, 590]) s += T.roller(rx, GY + 4, 96);
  s += T.barrel(BX, GY - 6, BW, BH);
  // speed lines behind the rolling barrel
  s += R.ink(`M${BX + 130} ${GY - 250}L${BX + 190} ${GY - 250}M${BX + 142} ${GY - 205}L${BX + 215} ${GY - 205}M${BX + 130} ${GY - 60}L${BX + 180} ${GY - 60}`, { w: R.LW.out });
  // the rope: once round the barrel's middle, then taut to Guu's fists
  const ry = GY - 6 - BH * 0.5, hw = T.barrel.hw(BW, 0.5) + 2;
  const fist = [226, ry - 2];
  s += T.rope([[BX + hw, ry - 4], [BX + hw * 0.5, ry + 12], [BX, ry + 17], [BX - hw * 0.5, ry + 12], [BX - hw, ry - 4]], 13);
  s += T.rope([[BX - hw + 4, ry - 2], [fist[0], fist[1]], [78, ry + 30], [40, ry + 86], [58, ry + 150]], 13, { n: 14 });
  s += R.shape(R.ell(BX - hw + 2, ry - 3, 13, 15), { w: R.LW.in }) + R.ink(`M${BX - hw - 6} ${ry - 8}L${BX - hw + 10} ${ry + 3}`, { w: R.LW.fine });

  // ---- Choki with the rope he cut ----
  s += T.coil(640, GY + 78, 44, 11);
  const c = R.choki({ x: 650, y: GY + 30, s: 1.12, dir: 'left', expr: 'smirk', look: [-0.8, 0], lean: -4,
    armL: { a: [150, 20], hand: 'v', hs: 1.5, over: true }, armR: { a: [40, -60], hand: 'fist' } });
  s += c;

  // ---- Guu pulls: the FIST ----
  const g = R.guu({ x: 118, y: GY + 44, s: 1.42, spin: -20, dir: 'right', expr: 'determined', look: [0.8, 0], lean: 6, headTilt: 14,
    armR: { at: fist, hand: 'fist', hs: 2.0, rot: 8, over: true }, armL: { at: [fist[0] - 78, fist[1] + 20], hand: 'fist', hs: 1.3, rot: 8 },
    legL: { foot: [-20, 2], footRot: 10 }, legR: { foot: [30, -16], footRot: 30 } });
  s += g;
  s += R.ink(`M${fist[0] + 6} ${fist[1] - 62}L${fist[0] + 12} ${fist[1] - 84}M${fist[0] + 38} ${fist[1] - 50}L${fist[0] + 56} ${fist[1] - 66}M${fist[0] - 26} ${fist[1] - 60}L${fist[0] - 36} ${fist[1] - 80}`, { w: R.LW.out });

  // ---- Paa lays the next staff ----
  const pa = R.paa({ x: 330, y: 690, s: 1.12, crouch: 34, dir: 'left', expr: 'happy', look: [-0.6, 0.6], lean: -14,
    armL: { to: [34, 40], hand: 'palm' }, armR: { to: [-10, 44], hand: 'palm' }, legL: { foot: [-30, -6] }, legR: { foot: [30, -6] } });
  s += T.roller(238, 648, 110);
  s += pa;
  return s;
};
