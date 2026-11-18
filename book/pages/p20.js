// PAGE 20 — TURTLE: CAUGHT. BUSY. The sensei has turned round, seated, at the brothers' eye level.
const T = require('./_turtle');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FY = 452, G = 606, sc = 1.2;
  // ---- back wall ----
  s += T.drawers(-10, 150, 236, 302, 3, 4);
  s += R.shape(R.rrect(-10, 136, 246, 16, 4), { w: R.LW.in });
  s += T.pottedPine(46, 136, 0.6) + T.cup(104, 136, 1.05) + T.cup(138, 136, 1.05) + T.pottedPine(192, 136, 0.52, { flip: true });
  // door to the garden
  const dx = 262, dy = 78, dw = 250, dh = FY - dy;
  const front = T.basin(dx + 62, FY - 14, 0.82) + T.sparrow(dx + 44, FY - 59, 44, { pose: 'drink' }) +
    T.sparrow(dx + 196, FY - 22, 46, { flip: true });
  s += T.garden(dx, dy, dw, dh, { wallY: 232, wallH: 70, front, bushes: false, stones: false,
    behind: T.sparrow(dx + 150, 150, 46, { pose: 'fly', rotDeg: -12 }) });
  s += T.sparrow(dx + 112, 234, 44);
  s += T.doorFrame(dx, dy, dw, dh);
  // right wall: round window + tall potted pine
  s += R.shape(R.ell(628, 236, 62, 62)) + R.shape(R.ell(628, 236, 50, 50), { w: R.LW.in });
  s += R.ink('M628 186L628 286M578 236L678 236', { w: R.LW.in });
  // ---- floor ----
  s += R.ink(`M-10 ${FY}L730 ${FY}`, { w: R.LW.out });
  s += T.shellFloor(330, 628, 420, 104);
  // ---- figures ----
  s += T.sensei({ x: 136, y: G + 6, s: sc, dir: 'right' });
  s += R.choki({ x: 634, y: G - 4, s: sc, dir: 'left', expr: 'surprised', look: 'left', lean: 5, armL: { a: [20, 30], hand: 'mitt' }, armR: { a: [158, 10], over: true, hs: 1.15 }, legR: { foot: [20, -6] } });
  s += R.guu({ x: 522, y: G, s: sc, dir: 'left', expr: 'surprised', look: 'left', lean: 3, armL: { a: [28, -120] }, armR: { a: [30, -120] } });
  s += R.paa({ x: 408, y: G + 4, s: sc, dir: 'left', expr: 'surprised', look: 'left', lean: 5, armL: { a: [120, 40] }, armR: { a: [40, -115] } });
  s += T.teaTable(290, 650, 150);
  return s;
};
