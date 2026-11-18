// PAGE 2 — MEET THE BROTHERS (model sheet). MEDIUM. Art box 720 x 560.
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const y = 520, sc = 1.42;
  // simple ground line
  s += R.ink(`M24 ${y + 14}L696 ${y + 14}`, { w: R.LW.out });
  s += R.ink(`M90 ${y + 30}L200 ${y + 30}M300 ${y + 30}L420 ${y + 30}M520 ${y + 30}L630 ${y + 30}`, { w: R.LW.in });
  // Guu: rock. Fist punched up on the picture-left (away from his headband knot).
  s += R.guu({ x: 154, y, s: sc, expr: 'determined', carryHood: false, headTilt: 5,
    armL: { a: [114, 6], hs: 1.6, rot: -8, over: true }, armR: { a: [30, -20], hand: 'fist' } });
  // Choki: scissors. Two fingers up on the picture-right.
  s += R.choki({ x: 346, y, s: sc, expr: 'smirk', headTilt: -5,
    armR: { a: [114, 6], hs: 1.3, rot: 5, over: true }, armL: { a: [24, 10], hand: 'mitt' } });
  // Paa: paper. Open palm waving on the picture-right.
  s += R.paa({ x: 574, y, s: sc, expr: 'happy', headTilt: -5,
    armR: { a: [114, 6], hs: 1.3, rot: 12, over: true }, armL: { a: [24, 10], hand: 'mitt' } });
  s += P.hollow('GUU', 150, 118, 72) + P.hollow('CHOKI', 352, 84, 72) + P.hollow('PAA', 580, 118, 72);
  return s;
};
