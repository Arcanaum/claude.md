// PAGE 20 — TURTLE: CAUGHT. BUSY. The sensei has turned round, seated, at the brothers' eye level.
const T = require('./_turtle');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FY = 452, G = 606, sc = 1.3;
  // ---- back wall ----
  s += T.drawers(-10, 150, 236, 302, 4, 5);
  s += R.shape(R.rrect(-10, 136, 246, 16, 4), { w: R.LW.in });
  s += T.pottedPine(56, 136, 0.62) + T.cup(132, 136, 1.1) + T.cup(170, 136, 1.1);
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
  s += T.pottedPine(560, FY + 4, 1.1);
  // ---- floor ----
  s += R.ink(`M-10 ${FY}L730 ${FY}`, { w: R.LW.out });
  s += T.shellFloor(330, 628, 420, 104);
  // ---- figures ----
  s += T.sensei({ x: 160, y: G + 6, s: sc, expr: { eyes: 'half', brows: 'neutral', mouth: 'smile' }, look: 'right' });
  s += R.choki({ x: 664, y: G - 6, s: sc, dir: 'left', expr: 'surprised', look: 'left', lean: 7, armL: { a: [150, 10], over: true }, armR: { a: [120, 40] }, legR: { foot: [20, -6] } });
  s += R.guu({ x: 560, y: G, s: sc, dir: 'left', expr: 'surprised', look: 'left', lean: 5, armL: { a: [60, -110] }, armR: { a: [70, -100] } });
  s += R.paa({ x: 450, y: G + 4, s: sc, dir: 'left', expr: 'surprised', look: 'left', lean: 6, armL: { a: [115, 40] }, armR: { a: [125, 30] } });
  s += T.teaTable(318, 640, 170);
  return s;
};
