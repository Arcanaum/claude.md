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
  const sc = 1.3;
  s += R.guu({ x: 680, y: GY + 4, s: sc, dir: 'left', expr: 'grin', look: [-0.8, -0.4], armL: { a: [20, 8] }, armR: { a: [24, 10] } });
  s += R.choki({ x: 580, y: GY - 6, s: sc, dir: 'left', expr: 'surprised', look: [-0.8, -0.2], armL: { a: [18, 6], hand: 'mitt' }, armR: { a: [16, 6], hand: 'mitt' } });
  const pa = R.paa({ x: 478, y: GY + 16, s: sc, dir: 'left', expr: 'happy', look: [-0.7, -0.5], lean: -4,
    armL: { to: [30, 6], hand: 'palm', rot: -70, hs: 1.15 }, armR: { to: [-40, 14], hand: 'palm', rot: -82, hs: 1.15, over: true } });
  s += pa;

  // ---- the student, kneeling ----
  const hand = [356, GY - 300];
  const st = T.student({ x: 172, y: GY + 20, s: 2.0, crouch: 44, lean: 14, dir: 'right', expr: 'happy', look: [0.8, 0.5], headTilt: 4,
    legR: { foot: [44, -6] }, footR: 'side', footDirR: 1,
    legL: { foot: [-62, -8], bend: -1 }, footL: 'side', footDirL: -1,
    armR: { at: hand, hand: 'none', bend: -1 }, armL: { a: [30, -70], hs: 1.4 } });
  s += st;
  // pinching hand (finger + thumb) and the single black thread hanging from it
  const w = st.info.wristR, k = 2.5;
  const m = R.chain(R.tr(w[0] + 14, w[1] + 12), R.rot(-38), R.sc(k));
  const tip = R.ap(m, [2, 27]);
  s += `<g transform="rotate(84 ${R.r1(tip[0])} ${R.r1(tip[1])})">${P.thread(tip[0] + 44, tip[1] + 6, 100)}</g>`;
  s += R.union([{ d: R.xf(R.ell(0, -4, 14, 13), m) }, { d: R.xf('M-7 4L1 24', m), w: 8 * k }, { d: R.xf('M11 0L4 24', m), w: 8 * k }]);
  s += R.ink(R.xf('M-12 -6Q-16 4 -10 8M2 6L3 12', m), { w: R.LW.in });
  return s;
};
