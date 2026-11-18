// PAGE 18 — CRANE: THE CLUE. MEDIUM. The student on one knee holds out a folded paper crane to Paa's open hands. Great Hall in the window.
const C = require('./_crane');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const y0 = 548;
  // --- tall open window with the Great Hall roofline
  const wx = 300, wy = 78, ww = 200, wh = 256;
  s += C.ceiling(40, W, { n: 6 });
  s += C.lantern(120, 40, 78, { w: 46, h: 96 });
  s += R.shape(R.rrect(wx - 14, wy - 14, ww + 28, wh + 28, 4));
  s += `<clipPath id="p18win"><rect x="${wx}" y="${wy}" width="${ww}" height="${wh}"/></clipPath>`;
  s += `<g clip-path="url(#p18win)">` + R.shape(R.rrect(wx, wy, ww, wh, 0), { w: R.LW.in }) +
    P.cloud(wx + 62, wy + 44, 96) + P.cloud(wx + 152, wy + 84, 70) +
    P.greatHall(wx + ww / 2, wy + 158, 222) + `</g>`;
  s += R.ink(R.rrect(wx, wy, ww, wh, 0), { w: R.LW.in });
  s += R.shape(R.rrect(wx - 26, wy + wh + 12, ww + 52, 16, 4));          // sill
  // --- floor
  s += C.floor({ y0, W, H, vx: 380, n: 7, seams: false });
  // --- Choki and Guu watching, behind Paa
  s += R.choki({ x: 666, y: 628, s: 1.0, dir: 'left', expr: 'grin', look: [-0.9, 0.2], lean: -5,
    armL: { a: [30, -100], hand: 'fist' }, armR: { a: [4, 4], hs: 0.85 } });
  s += R.guu({ x: 576, y: 636, s: 1.0, dir: 'left', expr: 'surprised', look: [-0.9, 0.2],
    armL: { a: [20, 10] }, armR: { a: [20, 10] } });
  // --- the student, down on one knee
  const st = C.student({ x: 186, y: 652, s: 1.6, dir: 'right', crouch: 86, lean: 9, look: [0.8, 0.7],
    expr: { eyes: 'open', brows: 'neutral', mouth: 'smile' },
    armR: { at: [372, 500], hand: 'none' }, armL: { a: [20, -30] },
    legL: { foot: [-98, -8], footRot: -80, bend: -1 }, legR: { foot: [64, -6], footRot: 14 } });
  s += st;
  // --- the paper crane, pinched in her fingers
  const wr = st.info.wristR;
  s += P.paperCrane(wr[0] + 20, wr[1] - 46, 100);
  s += R.hand('mitt', wr[0] + 12, wr[1] - 6, 42, { rotDeg: 50 });
  // --- Paa, both hands open
  s += R.paa({ x: 482, y: 654, s: 1.18, dir: 'left', expr: 'surprised', look: [-0.8, -0.5], lean: -4,
    armL: { at: [416, 548], rot: -78, hs: 1.05, over: true }, armR: { at: [440, 580], rot: -78, hs: 1.05, over: true } });
  return s;
};
