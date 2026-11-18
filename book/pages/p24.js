// PAGE 24 — TURTLE: THE CLUE. MEDIUM. The sensei presses a small brass bell into Paa's hand.
// Behind her the doors stand open to the garden, and above the garden wall: the Great Hall.
const T = require('./_turtle');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FY = 440, G = 616, sc = 1.42;
  // ---- open doors, garden, Great Hall ----
  const dx = 96, dy = 44, dw = 420, dh = FY - dy;
  s += T.garden(dx, dy, dw, dh, { wallY: 250, wallH: 80, trees: false, cloud: false, stones: false, bushes: false,
    behind: P.cloud(dx + 60, 96, 100) + P.cloud(dx + 372, 150, 84) + P.greatHall(dx + 215, 122, 300),
    front: T.bush(dx + 372, FY - 34, 110) });
  s += T.sparrow(dx + 70, 252, 44);
  s += T.doorFrame(dx, dy, dw, dh);
  s += T.shoji(-22, dy - 14, 104, dh + 14, 2, 4) + T.shoji(530, dy - 14, 120, dh + 14, 2, 4);
  // ---- floor ----
  s += R.ink(`M-10 ${FY}L730 ${FY}`, { w: R.LW.out });
  s += T.shellFloor(330, 636, 400, 96);
  // ---- figures ----
  const bx = 318, by = G - 104 * sc;
  s += R.choki({ x: 664, y: G - 26, s: sc, dir: 'left', look: [-1, 0.3], lean: -6, expr: 'grin', armL: { a: [20, 20], hand: 'mitt' }, armR: { a: [150, 15], over: true } });
  s += R.guu({ x: 566, y: G, s: sc, dir: 'left', look: [-1, 0.3], lean: -5, expr: 'happy', armL: { a: [25, -110] }, armR: { a: [20, 20] } });
  const sen = T.sensei({ x: 150, y: G + 6, s: sc, dir: 'right', lean: 6, armR: { at: [bx - 22, by - 78], hand: 'none' }, armL: { to: [20, -9] } });
  const paa = R.paa({ x: 442, y: G, s: sc, dir: 'left', look: [-1, 0.5], expr: 'grin', lean: -3,
    armL: { at: [bx + 50, by + 50], hand: 'palm', rot: -98, thumb: 1, hs: 1.25 }, armR: { a: [22, 16], hand: 'mitt' } });
  s += paa + sen;
  // the bell, her hand on top of it
  s += P.bell(bx, by + 8, 92);
  s += R.hand('mitt', bx - 6, by - 50, 46, { rotDeg: 160, side: 1 });
  // ring marks
  s += R.ink(`M${bx + 48} ${by - 22}q12 -8 10 -22M${bx + 62} ${by - 6}q16 -8 16 -26M${bx - 50} ${by + 40}q-10 10 -4 22`, { w: R.LW.in });
  return s;
};
