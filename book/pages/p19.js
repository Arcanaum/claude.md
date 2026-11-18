// PAGE 19 — TURTLE: ARRIVAL. OPEN. The brothers peek round the open sliding door; the hall is nearly empty:
// the old sensei with her back to them and the huge shell painted on the floor.
const T = require('./_turtle');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FY = 392;
  s += R.ink(`M150 ${FY}L730 ${FY}`, { w: R.LW.out });
  // round window, low on the far wall
  s += R.shape(R.ell(452, 236, 74, 74)) + R.shape(R.ell(452, 236, 60, 60), { w: R.LW.in });
  // the shell
  s += T.shellFloor(452, 548, 318, 112);
  s += T.sensei({ x: 452, y: 540, s: 1.42, dir: 'back' });
  // the brothers, stacked at the door edge
  const sc = 1.42;
  s += R.choki({ x: 118, y: 500, s: sc, lean: 30, headTilt: -14, dir: 'right', look: 'right', expr: 'whisper', armL: { a: [20, 0], hand: 'none' }, armR: { a: [20, 0], hand: 'none' } });
  s += R.paa({ x: 96, y: 610, s: sc, lean: 32, headTilt: -12, dir: 'right', look: 'right', expr: 'happy', armL: { a: [20, 0], hand: 'none' }, armR: { a: [20, 0], hand: 'none' } });
  s += R.guu({ x: 110, y: 716, s: sc, lean: 34, headTilt: -12, crouch: 20, dir: 'right', look: 'right', expr: 'surprised', armL: { a: [20, 0], hand: 'none' }, armR: { a: [20, 0], hand: 'none' } });
  // the sliding door they hide behind + door post
  s += T.shoji(-40, -20, 150, 740, 2, 5);
  s += R.shape(R.rrect(108, -20, 22, 740, 3));
  // hands on the door edge
  s += R.hand('v', 132, 318, 62, { rotDeg: 82, side: -1 });
  s += R.hand('palm', 134, 452, 66, { rotDeg: 84, side: -1 });
  s += R.hand('fist', 134, 590, 46, { rotDeg: 90, side: -1 });
  return s;
};
