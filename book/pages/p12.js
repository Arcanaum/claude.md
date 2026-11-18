// PAGE 12 — TIGER: THE CLUE. MEDIUM. The student kneels and holds out a black thread to Paa. Great Hall in the window.
const T = require('./_tiger');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FL = 520, GY = 640;
  // wall rail + floor
  s += R.ink(`M-10 ${FL}L730 ${FL}`, { w: R.LW.out });
  s += R.ink(`M-10 ${FL - 26}L730 ${FL - 26}`, { w: R.LW.in });
  // ---- window with the Great Hall roofline ----
  const wx = 318, wy = 48, ww = 280, wh = 250;
  s += R.shape(R.rrect(wx - 16, wy - 16, ww + 32, wh + 32, 4));
  s += `<clipPath id="p12w"><rect x="${wx}" y="${wy}" width="${ww}" height="${wh}"/></clipPath>`;
  let v = R.shape(R.rrect(wx, wy, ww, wh, 0), { w: R.LW.in });
  v += P.cloud(wx + 70, wy + 52, 96);
  v += P.greatHall(wx + ww / 2 + 22, wy + 128, 250);
  s += `<g clip-path="url(#p12w)">${v}</g>`;
  s += R.ink(R.rrect(wx, wy, ww, wh, 0), { w: R.LW.out });
  s += R.shape(R.rrect(wx - 30, wy + wh + 14, ww + 60, 20, 4));

  // ---- brothers ----
  const sc = 1.22;
  s += R.guu({ x: 670, y: GY + 4, s: sc, dir: 'left', expr: 'grin', look: [-0.8, -0.4], armL: { a: [20, 8] }, armR: { a: [24, 10] } });
  s += R.choki({ x: 592, y: GY - 6, s: sc, dir: 'left', expr: 'surprised', look: [-0.8, -0.2], armL: { a: [18, 6], hand: 'mitt' }, armR: { a: [16, 6], hand: 'mitt' } });
  const pa = R.paa({ x: 506, y: GY + 16, s: sc, dir: 'left', expr: 'happy', look: [-0.7, -0.5], lean: -4,
    armL: { to: [34, 26], hand: 'palm', rot: -70, hs: 1.15 }, armR: { to: [-36, 36], hand: 'palm', rot: -84, hs: 1.15 } });
  s += pa;

  // ---- the student, kneeling ----
  const st = T.student({ x: 128, y: GY + 20, s: 2.0, crouch: 44, lean: 14, dir: 'right', expr: 'happy', look: [0.8, 0.5], headTilt: 4,
    legR: { foot: [44, -6] }, footR: 'side', footDirR: 1,
    legL: { foot: [-62, -8], bend: -1 }, footL: 'side', footDirL: -1,
    armR: { a: [154, 2], hand: 'none' }, armL: { a: [30, -70], hs: 1.4 } });
  s += st;
  // pinching hand (finger + thumb) and the single black thread hanging from it
  const w = st.info.wristR;
  const tip = [w[0] + 40, w[1] + 64];
  s += `<g transform="rotate(90 ${R.r1(tip[0])} ${R.r1(tip[1])})">${P.thread(tip[0] + 46, tip[1], 104)}</g>`;
  s += R.union([
    { d: R.ell(w[0] + 22, w[1] + 6, 34, 30) },
    { d: R.line([w[0] + 34, w[1] + 20], [tip[0] + 3, tip[1] - 4]), w: 19 },
    { d: R.line([w[0] + 6, w[1] + 26], [tip[0] - 9, tip[1] - 2]), w: 19 },
  ]);
  s += R.ink(`M${w[0] + 30} ${w[1] - 8}Q${w[0] + 44} ${w[1] + 2} ${w[0] + 40} ${w[1] + 14}M${w[0] + 14} ${w[1] - 12}Q${w[0] + 26} ${w[1] - 2} ${w[0] + 24} ${w[1] + 8}`, { w: R.LW.in });
  return s;
};
