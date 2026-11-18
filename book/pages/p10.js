// PAGE 10 — TIGER: THE TURN. OPEN. Guu alone, heaving against the barrel. It does not move.
const T = require('./_tiger');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const GY = 620;
  s += R.ink(`M-10 ${GY + 16}L730 ${GY + 16}`, { w: R.LW.out });
  // barrel, dead still
  s += T.barrel(540, GY + 10, 262, 390);
  // Guu, whole body one diagonal line
  const sc = 1.75;
  const drop = (x, y, k, r) => R.shape(R.xf('M0 -12Q9 2 6 8Q0 14 -6 8Q-9 2 0 -12Z', R.chain(R.tr(x, y), R.rot(r), R.sc(k))), { w: R.LW.in });
  // dust puffs + skid marks behind his feet
  s += P.cloud(62, GY - 4, 86) + P.cloud(20, GY - 34, 50);
  s += R.ink(`M10 ${GY + 36}L150 ${GY + 36}M60 ${GY + 54}L210 ${GY + 54}`, { w: R.LW.in });
  const g = R.guu({ x: 158, y: GY + 10, s: sc, spin: 40, dir: 'right', expr: { eyes: 'squeeze', brows: 'angry', mouth: 'teeth' }, lean: -22, headTilt: -6,
    armR: { at: [366, GY - 142], hand: 'palm', hs: 1.1, rot: 68 }, armL: { at: [362, GY - 84], hand: 'palm', hs: 1.1, rot: 80, behind: true },
    legL: { foot: [-6, 4], footRot: -34 }, legR: { foot: [30, -24], footRot: -44 } });
  s += g;
  // sweat flying off
  const [hx, hy] = g.info.head;
  s += drop(hx - 96, hy - 70, 1.5, -50) + drop(hx - 40, hy - 128, 1.7, -20) + drop(hx - 118, hy - 8, 1.3, -75);
  // strain marks between head and barrel
  s += R.ink(`M${hx + 40} ${hy - 104}L${hx + 54} ${hy - 126}M${hx + 72} ${hy - 96}L${hx + 92} ${hy - 112}`, { w: R.LW.out });
  return s;
};
