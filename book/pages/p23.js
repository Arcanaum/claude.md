// PAGE 23 — TURTLE: THE SOLVE. BUSY. Guu makes a table of his back under Paa's forearms, Choki scratches the itch
// with two fingers, Paa stands perfectly still — and the sparrow lands on the rim to drink.
const T = require('./_turtle');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FY = 410, G = 622, sc = 1.7, px = 426;
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
  // ---- Paa: perfectly still ----
  const bx = px - 96 * sc, wy = G - 93 * sc;
  const paa = R.paa({ x: px, y: G, s: sc, expr: 'calm',
    armL: { at: [px - 66 * sc, wy], hand: 'palm', rot: -92, thumb: 1, hs: 1.05 }, armR: { at: [px - 50 * sc, wy + 12], hand: 'palm', rot: -96, thumb: 1, hs: 1.05 } });
  s += paa;
  // ---- Guu: a leapfrog table under Paa's forearms ----
  const gx = px - 60 * sc;
  s += R.guu({ x: gx, y: G + 6, s: sc, dir: 'left', lean: -92, headTilt: 60, expr: 'grin', look: [-0.6, -0.8],
    legL: { foot: [-22, -6] }, legR: { foot: [14, -6] },
    armL: { at: [gx - 86 * sc, G + 2], rot: 180 }, armR: { at: [gx - 56 * sc, G + 8], rot: 180 } });
  // Paa's forearms again, resting on top of Guu's back
  s += T.clipRect(0, wy - 70, px - 33 * sc, 122, paa);
  // ---- the bowl and the sparrow ----
  const by = wy - 44;
  s += T.bowl(bx, by, 170);
  s += T.sparrow(bx - 70, by + 2, 92, { pose: 'land', rotDeg: 16 });
  // ---- Choki on tiptoe, two fingers on the itchy nose ----
  const h = paa.info.head;
  s += R.choki({ x: 646, y: G - 12, s: sc, dir: 'left', look: 'left', lean: 6, headTilt: 6, expr: 'smirk',
    legL: { foot: [-12, -6], footRot: 50 }, legR: { foot: [12, -6], footRot: 40 },
    armL: { at: [h[0] + 124, h[1] + 49], hand: 'v', rot: -91, hs: 1.3, over: true, thumb: 1 }, armR: { a: [24, 14], hand: 'mitt' } });
  // feathers drifting down
  s += T.feather(140, 322, 34, 30) + T.feather(250, 262, 30, -40) + T.feather(330, 292, 30, 70);
  return s;
};
