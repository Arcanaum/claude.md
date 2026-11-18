// PAGE 22 — TURTLE: THE TURN. OPEN. Paa alone: bowl wobbling, water over the rim, itchy nose, whole body fidgeting.
const T = require('./_turtle');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const sc = 2.4, G = 646, px = 492;
  s += P.hollow('SLOSH!', 214, 146, 104, { rotDeg: -9, w: 5 });
  // ground: just a short floor line and shadow dashes
  s += R.ink(`M250 ${G + 26}L690 ${G + 26}`, { w: R.LW.out }) + R.ink(`M300 ${G + 46}L420 ${G + 46}M520 ${G + 46}L610 ${G + 46}`, { w: R.LW.in });
  const bx = 240, by = G - 104 * sc;
  const paa = R.paa({ x: px, y: G, s: sc, lean: 7, headTilt: -9, shift: 4, expr: { eyes: 'squeeze', brows: 'worried', mouth: 'wavy' },
    legR: { a: [38, -78], footRot: 20 }, legL: { foot: [-18, -6] },
    armL: { at: [bx + 74, by + 52], hand: 'palm', rot: -104, thumb: 1, hs: 1.1 }, armR: { at: [bx + 104, by + 70], hand: 'palm', rot: -98, thumb: 1, hs: 1.1 } });
  s += paa;
  const h = paa.info.head;
  // the itch: wiggle marks round the nose
  const nx = h[0] - 3, ny = h[1] + 49;
  s += R.ink(`M${nx - 6} ${ny - 4}q6 9 12 0`, { w: R.LW.in });
  s += R.ink(`M${nx - 13} ${ny - 1}q-4 -6 -8 0q-4 6 -8 0q-4 -6 -8 0M${nx + 13} ${ny - 1}q4 -6 8 0q4 6 8 0q4 -6 8 0`, { w: R.LW.in });
  // the bowl, tipping
  s += T.bowl(bx, by, 210, { rotDeg: -15, ripples: 1 });
  // water arcing over the low rim
  s += R.shape(`M${bx - 100} ${by + 12}C${bx - 128} ${by - 62} ${bx - 206} ${by - 44} ${bx - 204} ${by + 34}C${bx - 204} ${by + 66} ${bx - 162} ${by + 66} ${bx - 166} ${by + 36}C${bx - 170} ${by + 4} ${bx - 140} ${by - 4} ${bx - 84} ${by + 36}Z`, { w: R.LW.in });
  s += T.drop(bx - 200, by + 118, 34, 8) + T.drop(bx - 140, by + 140, 28, -6) + T.drop(bx - 176, by + 200, 26, 4);
  s += T.drop(bx - 60, by - 62, 30, 150) + T.drop(bx + 14, by - 84, 26, 172) + T.drop(bx + 70, by - 92, 22, 200);
  // wobble marks round the bowl and the shaking arms and knee
  s += R.ink(`M${bx + 118} ${by - 34}q10 -10 2 -22M${bx + 136} ${by - 22}q12 -10 4 -24M${bx - 22} ${by + 96}q-12 8 -6 22M${bx + 12} ${by + 104}q-12 8 -6 22`, { w: R.LW.in });
  s += R.ink(`M${px + 118} ${G - 100}q10 10 0 20M${px + 134} ${G - 108}q10 10 0 20M${px - 96} ${G - 60}q-10 10 0 20M${px - 112} ${G - 68}q-10 10 0 20`, { w: R.LW.in });
  // sweat drops
  s += T.drop(h[0] + 132, h[1] - 80, 24, 28) + T.drop(h[0] + 150, h[1] - 30, 20, 50);
  return s;
};
