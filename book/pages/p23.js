// PAGE 23 — TURTLE: THE SOLVE. BUSY. Guu makes a table of his back under Paa's forearms, Choki scratches the itch
// with two fingers, Paa stands perfectly still — and the sparrow lands on the rim to drink.
const T = require('./_turtle');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FY = 410, G = 622, sc = 1.7, px = 452;
  // ---- garden through the wide-open doors ----
  const gx0 = 96, gw = 528;
  const front = T.basin(gx0 + 84, FY - 10, 0.9) + T.bush(gx0 + 300, FY - 60, 110) + T.bush(gx0 + 470, FY - 40, 120) +
    T.sparrow(gx0 + 250, FY - 14, 44, { flip: true });
  s += T.garden(gx0, 40, gw, FY - 40, { wallY: 196, wallH: 84, front, bushes: false, stones: false,
    behind: T.sparrow(gx0 + 250, 150, 46, { pose: 'fly', flip: true, rotDeg: -10 }) });
  s += T.sparrow(gx0 + 372, 198, 44);
  s += T.doorFrame(gx0, 40, gw, FY - 40);
  s += T.shoji(-30, 26, 114, FY - 26, 2, 4) + T.shoji(636, 26, 114, FY - 26, 2, 4);
  // ---- floor ----
  s += R.ink(`M-10 ${FY}L730 ${FY}`, { w: R.LW.out });
  s += T.shellFloor(380, 628, 400, 100);
  // ---- Paa: perfectly still ----
  const bx = px - 96 * sc, wy = G - 93 * sc;
  const paa = R.paa({ x: px, y: G, s: sc, expr: 'calm',
    armL: { at: [px - 66 * sc, wy], hand: 'palm', rot: -92, thumb: 1, hs: 1.05 }, armR: { at: [px - 50 * sc, wy + 12], hand: 'palm', rot: -96, thumb: 1, hs: 1.05 } });
  s += paa;
  // ---- Guu: a table under Paa's forearms ----
  const gx = px - 44 * sc;
  s += R.guu({ x: gx, y: G + 6, s: sc, dir: 'left', lean: -95, headTilt: 62, expr: 'grin', look: [-0.6, -0.8],
    legL: { foot: [-20, -6] }, legR: { foot: [16, -6] },
    armL: { at: [gx - 64 * sc, G - 34 * sc] }, armR: { at: [gx - 30 * sc, G - 28 * sc] } });
  // forearms + hands again, on top of Guu's back
  // ---- the bowl and the sparrow ----
  const by = wy - 44;
  s += T.bowl(bx, by, 170);
  s += T.sparrow(bx - 74, by + 2, 78, { pose: 'land', rotDeg: 16 });
  // ---- Choki on tiptoe, two fingers on the itchy nose ----
  const h = paa.info.head;
  s += R.choki({ x: 654, y: G - 12, s: sc, dir: 'left', look: 'left', lean: -6, expr: 'smirk',
    legL: { foot: [-12, -6], footRot: 50 }, legR: { foot: [12, -6], footRot: 40 },
    armL: { at: [h[0] + 118, h[1] + 44], hand: 'v', rot: -84, hs: 1.25, over: true, thumb: 1 }, armR: { a: [30, 50], hand: 'mitt' } });
  // feathers drifting down
  s += T.feather(150, 330, 34, 30) + T.feather(210, 250, 30, -40) + T.feather(96, 470, 30, 70);
  return s;
};
