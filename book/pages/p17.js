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
  const pl = C.pole({ x: 352, y: 606, h: 172, La: 204, Lb: 150, phi: -2, ry: 0.3, dir: 1, slen: 96, sw: 21, arcSpan: [0, 58], stream: 'b', postW: 28 });
  s += pl;
  // stutter marks round the hub and the blocked end
  s += R.ink('M316 392L326 404L314 412M388 390L378 402L390 412M352 380L352 366M330 384L322 372M374 384L382 372', { w: R.LW.in });
  // --- Guu, braced, the beam on his shoulder
  s += R.guu({ x: 108, y: 570, s: 1.36, dir: 'right', expr: 'strain', lean: 15,
    armL: { at: [196, 452], hand: 'none' }, armR: { at: [250, 446], hand: 'none' },
    legL: { foot: [-46, -6] }, legR: { foot: [30, -6] } });
  // the blocked end of the beam lies across his shoulder; his fists clamp it
  const ax = pl.a[0], ay = pl.a[1], hx = pl.hub[0] - 22, hy = pl.hub[1];
  s += R.tube(R.line([ax, ay], [hx, hy]), 15, { cap: 'butt' }) + R.shape(R.ell(ax, ay, 9, 10.5));
  s += R.hand('fist', 204, ay + 1, 46, { rotDeg: 0 }) + R.hand('fist', 256, ay + 1, 46, { rotDeg: 0 });
  s += R.ink('M196 320L212 298M222 340L244 324M168 308L172 286', { w: R.LW.out });
  // --- Paa, off to one side: flat open palm chopping down. GO!
  s += R.paa({ x: 652, y: 552, s: 1.3, dir: 'left', expr: 'shout', look: [-0.8, 0.4], lean: -4,
    armL: { a: [158, 14], hand: 'palm', hs: 1.75, rot: -16, over: true }, armR: { a: [30, -105], hand: 'fist' } });
  s += R.ink('M518 236Q504 286 516 334M496 254Q486 290 494 322', { w: R.LW.out });
  // --- Choki, streaking through low, arms back like wings
  s += R.choki({ x: 414, y: 674, s: 1.22, lean: 52, headTilt: -34, crouch: 14, dir: 'right', expr: 'determined', look: [0.9, 0],
    armL: { a: [98, 6], hand: 'v', hs: 0.9 }, armR: { a: [-78, -8], hand: 'v', hs: 0.9, behind: true },
    legL: { a: [58, -20], footRot: 30 }, legR: { a: [46, -96], footRot: -10 } });
  s += R.ink('M96 630L250 630M140 654L300 654M70 676L270 676M330 560L250 560M352 584L290 584', { w: R.LW.in });
  return s;
};
