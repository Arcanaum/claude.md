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
  const bx = px, by = G - 84 * sc, hy = G - 64 * sc;
  const paa = R.paa({ x: px, y: G, s: sc, expr: 'calm',
    armL: { at: [px - 20 * sc, hy], hand: 'palm', rot: 70, thumb: -1 }, armR: { at: [px + 20 * sc, hy], hand: 'palm', rot: -70, thumb: 1 } });
  s += paa;
  // ---- the bowl and the sparrow ----
  s += T.bowl(bx, by, 132);
  s += T.sparrow(bx - 36, by + 2, 72, { pose: 'land', rotDeg: 12 });
  // ---- Guu: crouched beside him, both fists up under Paa's elbow and forearm ----
  s += R.guu({ x: px - 206, y: G + 2, s: sc, dir: 'right', look: [1, -0.5], lean: 8, crouch: 24, expr: 'determined', build: { armU: 31, armF: 29 },
    legL: { foot: [-24, -6] }, legR: { foot: [24, -6] },
    armL: { at: [px - 62 * sc, G - 56 * sc], rot: 0, over: true }, armR: { at: [px - 42 * sc, G - 50 * sc], rot: 0, over: true } });
  // ---- Choki on tiptoe, two fingers on the itchy nose ----
  const h = paa.info.head;
  s += R.choki({ x: px + 196, y: G - 12, s: sc, dir: 'left', look: 'left', lean: 4, headTilt: 5, expr: 'smirk',
    legL: { foot: [-12, -6], footRot: 50 }, legR: { foot: [12, -6], footRot: 40 },
    armL: { at: [h[0] + 124, h[1] + 49], hand: 'v', rot: -91, hs: 1.3, over: true, thumb: 1 }, armR: { a: [14, 10], hand: 'mitt' } });
  // feathers drifting down
  s += T.feather(130, 262, 32, 30) + T.feather(300, 300, 30, -40) + T.feather(470, 264, 30, 70);
  return s;
};
