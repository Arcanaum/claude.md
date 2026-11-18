// PAGE 19 — TURTLE: ARRIVAL. OPEN. The brothers peek round the open sliding door; the hall is nearly empty:
// the old sensei with her back to them and the huge shell painted on the floor.
const T = require('./_turtle');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FY = 404, sc = 1.4;
  s += R.ink(`M90 ${FY}L730 ${FY}`, { w: R.LW.out });
  // the shell + the sensei in the middle of it, her back to us
  s += T.shellFloor(478, 560, 300, 104);
  s += T.sensei({ x: 478, y: 548, s: sc, dir: 'back' });
  // the brothers, stacked at the door edge
  const none = { a: [14, 4], hand: 'none' };
  s += R.choki({ x: 74, y: 500, s: sc, lean: 22, headTilt: -10, dir: 'right', look: 'right', expr: 'whisper', armL: none, armR: none });
  s += R.paa({ x: 92, y: 612, s: sc, lean: 26, headTilt: -12, dir: 'right', look: 'right', expr: 'happy', armL: none, armR: none, legL: { foot: [-44, -6] }, legR: { foot: [-22, -6] } });
  s += R.guu({ x: 232, y: 668, s: sc, lean: 14, headTilt: -4, crouch: 44, dir: 'right', look: 'right', expr: 'surprised',
    legL: { foot: [-32, -6] }, legR: { foot: [32, -6] }, armL: { a: [20, -30] }, armR: { a: [30, -40] } });
  // the sliding door they hide behind
  s += T.shoji(-50, -20, 146, 740, 2, 5);
  // hands on the door edge
  s += R.hand('v', 116, 200, 64, { rotDeg: 78, side: -1 });
  s += R.hand('palm', 118, 506, 62, { rotDeg: 84, side: -1 });
  return s;
};
