// PAGE 17 — CRANE: THE SOLVE. BUSY. Guu blocks the pole with his shoulder, Paa chops "GO!" with a flat open palm, Choki streaks through.
const C = require('./_crane');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const y0 = 392;
  // --- full background
  s += C.shoji(24, 92, 120, 232, { cols: 3, rows: 5 });
  s += C.shoji(262, 92, 150, 232, { cols: 4, rows: 5 });
  s += C.shoji(530, 130, 170, 194, { cols: 4, rows: 4 });
  s += R.shape(`M-10 344L${W + 10} 344L${W + 10} 356L-10 356Z`, { w: R.LW.in });
  s += C.floor({ y0, W, H, vx: 350, n: 13 });
  s += C.ceiling(44, W, { n: 8 });
  s += C.lantern(204, 44, 70, { w: 40, h: 80 });
  s += C.lantern(470, 44, 70, { w: 40, h: 80 });
  // --- the pole, stopped short against Guu
  const pl = C.pole({ x: 352, y: 606, h: 172, La: 200, Lb: 124, phi: -2, ry: 0.3, dir: 1, slen: 84, sw: 21, arcSpan: [0, 58], stream: 'b', postW: 28 });
  s += pl;
  // stutter marks round the hub and the blocked end
  s += R.ink('M316 392L326 404L314 412M388 390L378 402L390 412M352 380L352 366M330 384L322 372M374 384L382 372', { w: R.LW.in });
  // --- Guu, braced, the beam on his shoulder
  s += R.guu({ x: 106, y: 572, s: 1.36, dir: 'right', expr: 'strain', lean: 17, headTilt: -16,
    armL: { at: [198, 470], hand: 'none' }, armR: { at: [236, 462], hand: 'none' },
    legL: { foot: [-48, -6] }, legR: { foot: [30, -6] } });
  // the blocked end of the beam rests on his shoulder, tight against his neck; both fists brace it there
  const ax = pl.a[0], ay = pl.a[1], hx = pl.hub[0] - 22, hy = pl.hub[1];
  s += R.tube(R.line([ax, ay], [hx, hy]), 15, { cap: 'butt' }) + R.shape(R.ell(ax, ay, 9, 10.5));
  s += R.hand('fist', 202, ay + 4, 44, { rotDeg: -8 }) + R.hand('fist', 242, ay + 3, 44, { rotDeg: 6, side: -1 });
  s += R.ink(`M${ax - 6} ${ay - 26}L${ax - 14} ${ay - 46}M${ax + 16} ${ay - 26}L${ax + 22} ${ay - 46}M${ax - 26} ${ay - 16}L${ax - 46} ${ay - 26}`, { w: R.LW.out });
  // --- Paa, off to one side: flat open palm raised beside his head, chopping down. GO!
  s += R.paa({ x: 650, y: 556, s: 1.3, dir: 'left', expr: 'shout', look: [-0.8, 0.3], build: { armU: 33, armF: 31 },
    armL: { at: [520, 318], hand: 'palm', hs: 1.6, rot: -14, over: true }, armR: { a: [26, -100], hand: 'fist' } });
  s += R.ink('M506 236Q548 208 596 226M520 214Q550 196 584 204', { w: R.LW.out });
  // --- Choki, streaking through low, arms back like wings
  s += R.choki({ x: 414, y: 674, s: 1.22, lean: 52, headTilt: -34, crouch: 14, dir: 'right', expr: 'determined', look: [0.9, 0],
    armL: { a: [98, 6], hand: 'v', hs: 0.9 }, armR: { a: [-78, -8], hand: 'v', hs: 0.9, behind: true },
    legL: { a: [58, -20], footRot: 30 }, legR: { a: [46, -96], footRot: -10 } });
  s += R.ink('M96 630L250 630M140 654L300 654M70 676L270 676M330 560L250 560M352 584L290 584', { w: R.LW.in });
  return s;
};
