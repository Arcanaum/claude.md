// PAGE 6 — JAN-KEN-PO! (first choice). OPEN signature page. Art box 720 x 520. Three hands only + hollow "PO!".
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const HH = { fist: 30, v: 54, palm: 56 };
  // a big hand with a short sleeve cuff that stays inside the box. (x,y) = centre of the hand.
  const big = (type, x, y, size, rotDeg, side) => {
    const k = size / HH[type];
    const m = R.chain(R.tr(x, y), R.rot(rotDeg), R.sc(k), R.tr(0, HH[type] / 2 + 1));
    const cw = type === 'fist' ? 10 : 10.5, ch = type === 'fist' ? 7.5 : 9;
    let c = R.shape(R.xf(R.rrect(-cw - 2.5, -1, 2 * cw + 5, ch, 2.5), m), { w: 5 });
    c += R.ink(R.xf(`M${-cw - 2.5} ${ch * 0.45}L${cw + 2.5} ${ch * 0.45}`, m), { w: R.LW.in });
    return c + R.hand(type, x, y, size, { rotDeg, side, o: 5 });
  };
  s += P.hollow('PO!', 366, 218, 290, { w: 5, spacing: 14 });
  // shout marks around the word
  let d = '';
  for (const [a, r1, r2] of [[-158, 318, 350], [-146, 322, 356], [-34, 322, 356], [-22, 318, 350]]) {
    const c = Math.cos(a * Math.PI / 180), q = Math.sin(a * Math.PI / 180);
    d += `M${R.r1(360 + r1 * c)} ${R.r1(230 + r1 * 0.72 * q)}L${R.r1(360 + r2 * c)} ${R.r1(230 + r2 * 0.72 * q)}`;
  }
  s += R.ink(d, { w: R.LW.out });
  s += big('fist', 120, 376, 178, 0, 1);
  s += big('v', 362, 334, 266, 0, 1);
  s += big('palm', 606, 350, 236, 0, -1);
  return s;
};
