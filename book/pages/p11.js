// PAGE 11 — TIGER: THE SOLVE. BUSY. Choki's rope round the barrel, Paa's staff rollers, Guu's pulling FIST.
const T = require('./_tiger');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FL = 380, GY = 590;
  // ---- wall ----
  s += R.shape(R.rrect(-20, -10, 760, 40, 0));
  s += R.ink('M-10 16L730 16', { w: R.LW.fine });
  s += R.shape(R.rrect(-20, FL - 30, 760, 30, 0));
  s += T.rack(30, 66, 215, 262, 4);
  s += T.banner(338, 80, 96, 200, { emblemSize: 66 });
  // ---- floor ----
  s += R.shape(R.rrect(-20, FL, 760, 320, 0));
  s += T.boards(FL, 700, { n: 13, cross: false });
  s += T.mat(170, 455, 500, 200, 120, { weave: 16 });

  // ---- rollers, barrel, rope ----
  const BX = 482, BW = 210, BH = 300;
  for (const rx of [240, 310, 380, 450, 520, 590]) s += T.roller(rx, GY + 4, 96);
  s += T.barrel(BX, GY - 6, BW, BH);
  // speed lines behind the rolling barrel
  s += R.ink(`M${BX + 130} ${GY - 250}L${BX + 190} ${GY - 250}M${BX + 142} ${GY - 285}L${BX + 215} ${GY - 285}`, { w: R.LW.out });
  // the rope: once round the barrel's middle, then taut to Guu's fists
  const ry = GY - 6 - BH * 0.5, hw = T.barrel.hw(BW, 0.5) + 2;
  const fist = [262, ry - 2];
  s += T.rope([[BX + hw, ry - 4], [BX + hw * 0.5, ry + 12], [BX, ry + 17], [BX - hw * 0.5, ry + 12], [BX - hw, ry - 4]], 13);
  s += T.rope([[BX - hw + 4, ry - 2], [fist[0], fist[1]], [110, ry + 30], [50, ry + 100], [30, ry + 190]], 13, { n: 14 });
  s += R.shape(R.ell(BX - hw + 2, ry - 3, 13, 15), { w: R.LW.in }) + R.ink(`M${BX - hw - 6} ${ry - 8}L${BX - hw + 10} ${ry + 3}`, { w: R.LW.fine });

  // ---- Choki with the rope he cut ----
  s += T.coil(548, GY + 74, 42, 11);
  const c = R.choki({ x: 652, y: GY + 52, s: 1.12, dir: 'left', expr: 'smirk', look: [-0.8, 0], lean: 3,
    armR: { a: [140, 25], hand: 'v', hs: 1.45, over: true }, armL: { a: [50, 20], hand: 'none' } });
  const cw = c.info.wristL;
  s += T.rope([[cw[0] + 4, cw[1] - 26], [cw[0], cw[1]], [cw[0] - 20, cw[1] + 46], [560, GY + 46]], 11, { n: 10 });
  s += R.ink(`M${cw[0] + 4} ${cw[1] - 30}L${cw[0] - 4} ${cw[1] - 42}M${cw[0] + 6} ${cw[1] - 30}L${cw[0] + 6} ${cw[1] - 44}M${cw[0] + 8} ${cw[1] - 30}L${cw[0] + 16} ${cw[1] - 41}`, { w: R.LW.fine });
  s += c;
  s += R.hand('fist', cw[0], cw[1], 36, { rotDeg: -100, side: 1 });

  // ---- Guu pulls: the FIST ----
  const g = R.guu({ x: 158, y: GY + 44, s: 1.42, spin: -20, dir: 'right', expr: 'determined', look: [0.8, 0], lean: 6, headTilt: 14,
    armR: { at: fist, hand: 'fist', hs: 2.0, rot: 8, over: true }, armL: { at: [fist[0] - 78, fist[1] + 20], hand: 'fist', hs: 1.3, rot: 8 },
    legL: { foot: [-20, 2], footRot: 10 }, legR: { foot: [30, -16], footRot: 30 } });
  s += g;
  s += R.ink(`M${fist[0] + 6} ${fist[1] - 62}L${fist[0] + 12} ${fist[1] - 84}M${fist[0] + 38} ${fist[1] - 50}L${fist[0] + 56} ${fist[1] - 66}M${fist[0] - 26} ${fist[1] - 60}L${fist[0] - 36} ${fist[1] - 80}`, { w: R.LW.out });

  // ---- Paa lays the next staff ----
  const pa = R.paa({ x: 372, y: 684, s: 1.12, crouch: 24, dir: 'left', expr: 'happy', look: [-0.6, 0.6], lean: -14,
    armL: { to: [36, 12], hand: 'none' }, armR: { to: [-30, 20], hand: 'none' }, legL: { foot: [-30, -6] }, legR: { foot: [30, -6] } });
  s += pa;
  const a = pa.info.wristL, b = pa.info.wristR;
  const ux = (b[0] - a[0]), uy = (b[1] - a[1]), L = Math.hypot(ux, uy);
  s += T.staff([a[0] - ux / L * 62, a[1] - uy / L * 62], [b[0] + ux / L * 46, b[1] + uy / L * 46], 14);
  const ang = Math.atan2(uy, ux) * 180 / Math.PI;
  s += R.hand('fist', a[0], a[1], 36, { rotDeg: ang, side: 1 }) + R.hand('fist', b[0], b[1], 36, { rotDeg: ang, side: 1 });
  return s;
};
