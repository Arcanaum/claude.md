// PAGE 11 — TIGER: THE SOLVE. BUSY. Choki's rope round the barrel, Paa's staff rollers, Guu's pulling FIST.
const T = require('./_tiger');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FL = 380, GY = 590;
  // ---- wall ----
  s += R.shape(R.rrect(-20, -10, 760, 40, 0));
  s += R.ink('M-10 16L730 16', { w: R.LW.fine });
  s += R.shape(R.rrect(-20, FL - 30, 760, 30, 0));
  s += T.rack(20, 66, 190, 262, 4);
  s += T.banner(352, 80, 92, 196, { emblemSize: 64 });
  // the rope Choki cut: still hanging on its wall peg, severed end frayed
  {
    const hx = 250, hy = 92;
    s += R.shape(R.rrect(hx - 9, hy - 18, 18, 30, 4), { w: R.LW.in });
    for (const [rx, ry] of [[19, 46], [13, 38]]) { const pts = []; for (let a = -90; a <= 270; a += 30) pts.push([hx + rx * Math.cos(a * Math.PI / 180), hy + ry + 4 + ry * Math.sin(a * Math.PI / 180)]); s += T.rope(pts, 11, { n: 4 }); }
    s += T.rope([[hx + 6, hy + 6], [hx + 12, hy + 110], [hx + 4, hy + 176]], 11, { n: 10 });
    const ex = hx + 4, ey = hy + 180;
    s += R.ink(`M${ex - 4} ${ey}L${ex - 14} ${ey + 22}M${ex - 1} ${ey}L${ex - 4} ${ey + 26}M${ex + 2} ${ey}L${ex + 6} ${ey + 25}M${ex + 4} ${ey}L${ex + 16} ${ey + 20}`, { w: R.LW.in });
    s += R.shape(R.rrect(hx - 8, hy - 6, 16, 14, 4), { w: R.LW.in });
    // snip marks
    s += R.ink(`M${ex + 26} ${ey + 2}L${ex + 44} ${ey - 6}M${ex + 28} ${ey + 16}L${ex + 46} ${ey + 20}M${ex - 26} ${ey + 4}L${ex - 42} ${ey - 4}`, { w: R.LW.in });
  }
  // ---- floor ----
  s += R.shape(R.rrect(-20, FL, 760, 320, 0));
  s += T.boards(FL, 700, { n: 13, cross: false });
  s += T.mat(170, 455, 500, 200, 120, { weave: 16 });

  // ---- rollers, barrel, rope ----
  const BX = 482, BW = 210, BH = 300;
  for (const rx of [240, 310, 380, 450, 520, 590]) s += T.roller(rx, GY + 4, 96);
  s += T.barrel(BX, GY - 16, BW, BH, { tilt: -3 });
  // speed lines behind the rolling barrel
  s += R.ink(`M${BX + 96} ${GY - 372}L${BX + 160} ${GY - 372}M${BX + 108} ${GY - 345}L${BX + 196} ${GY - 345}M${BX + 122} ${GY - 318}L${BX + 176} ${GY - 318}`, { w: R.LW.out });
  s += R.ink(`M${BX + 118} ${GY - 26}Q${BX + 136} ${GY - 10} ${BX + 128} ${GY + 12}M${BX + 140} ${GY - 34}Q${BX + 162} ${GY - 12} ${BX + 150} ${GY + 14}`, { w: R.LW.in });
  // the rope: once round the barrel's middle, then taut to Guu's fists
  const ry = GY - 16 - BH * 0.5, hw = T.barrel.hw(BW, 0.5) + 2;
  const fist = [262, ry - 2];
  s += T.rope([[BX + hw, ry - 4], [BX + hw * 0.5, ry + 12], [BX, ry + 17], [BX - hw * 0.5, ry + 12], [BX - hw - 6, ry - 4]], 13);
  s += T.rope([[BX - hw - 4, ry - 2], [fist[0], fist[1]], [110, ry + 30], [50, ry + 100], [30, ry + 190]], 13, { n: 14 });
  s += R.shape(R.ell(BX - hw - 5, ry - 3, 13, 15), { w: R.LW.in }) + R.ink(`M${BX - hw - 13} ${ry - 8}L${BX - hw + 3} ${ry + 3}`, { w: R.LW.fine });

  // ---- Choki, who cut it (two fingers = scissors) ----
  s += T.coil(560, GY + 80, 40, 11);
  s += R.choki({ x: 652, y: GY + 50, s: 1.12, dir: 'left', expr: 'smirk', look: [-0.8, 0], lean: -3,
    armL: { a: [132, 30], hand: 'v', hs: 1.45, over: true }, armR: { a: [16, 6], hand: 'mitt' } });

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
