// PAGE 23 — TURTLE: THE SOLVE. BUSY. Guu makes a table of his back under Paa's forearms, Choki scratches the itch
// with two fingers, Paa stands perfectly still — and the sparrow lands on the rim to drink.
const T = require('./_turtle');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FY = 410, G = 622, sc = 1.7, px = 384;
  // ---- garden through the wide-open doors ----
  const gx0 = 96, gw = 528;
  const front = T.bush(gx0 + 60, FY - 44, 120) + T.bush(gx0 + 250, FY - 70, 100) + T.bush(gx0 + 470, FY - 40, 120);
  s += T.garden(gx0, 40, gw, FY - 40, { wallY: 196, wallH: 84, front, bushes: false, stones: false,
    behind: T.sparrow(gx0 + 250, 150, 46, { pose: 'fly', flip: true, rotDeg: -10 }) });
  s += T.sparrow(gx0 + 372, 198, 44) + T.sparrow(gx0 + 60, 198, 44, { flip: true });
  s += T.doorFrame(gx0, 40, gw, FY - 40);
  s += T.shoji(-30, 26, 114, FY - 26, 2, 4) + T.shoji(636, 26, 114, FY - 26, 2, 4);
  // ---- floor ----
  s += R.ink(`M-10 ${FY}L730 ${FY}`, { w: R.LW.out });
  s += T.shellFloor(380, 628, 400, 100);
  // ---- Paa: perfectly still, front-on, the bowl held out in front of his chest ----
  const U = sc, bx = px - 134 * U, wy = G - 78 * U, by = wy - 46;
  const paa = R.paa({ x: px, y: G, s: sc, expr: 'calm', build: { armU: 43, armF: 41 },
    armL: { at: [px - 102 * U, wy], hand: 'palm', rot: -92, thumb: 1, hs: 1.05 }, armR: { at: [px - 70 * U, wy + 10], hand: 'none', behind: true } });
  // ---- Guu: standing upright just behind the arms, both fists pushing up under Paa's forearm ----
  const gx = px - 96 * U;
  s += R.guu({ x: gx, y: G - 8, s: sc, expr: 'determined', look: [-0.5, 0.6],
    armL: { at: [gx - 6 * U, G - 62 * U], hand: 'none' }, armR: { at: [gx + 30 * U, G - 66 * U], hand: 'none' } });
  s += paa;
  s += R.hand('fist', gx - 4 * U, G - 62 * U, 30 * U) + R.hand('fist', gx + 32 * U, G - 69 * U, 30 * U);
  s += R.ink(`M${gx - 34 * U} ${G - 58 * U}l-10 8M${gx - 30 * U} ${G - 46 * U}l-12 3M${gx + 56 * U} ${G - 52 * U}l8 9`, { w: R.LW.in });
  // ---- the bowl and the sparrow ----
  s += T.bowl(bx, by, 140);
  s += T.sparrow(bx - 52, by + 2, 78, { pose: 'land', rotDeg: 12 });
  // ---- Choki on tiptoe, two fingers on the itchy nose ----
  const h = paa.info.head;
  s += R.choki({ x: px + 190, y: G - 12, s: sc, dir: 'left', look: 'left', lean: 4, headTilt: 5, expr: 'smirk',
    legL: { foot: [-12, -6], footRot: 50 }, legR: { foot: [12, -6], footRot: 40 },
    armL: { at: [h[0] + 124, h[1] + 49], hand: 'v', rot: -91, hs: 1.3, over: true, thumb: 1 }, armR: { a: [14, 10], hand: 'mitt' } });
  // feathers drifting down
  s += T.feather(120, 300, 32, 30) + T.feather(300, 300, 30, -40) + T.feather(470, 264, 30, 70);
  return s;
};
