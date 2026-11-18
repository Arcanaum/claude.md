// PAGE 18 — CRANE: THE CLUE. MEDIUM. The student on one knee holds out a folded paper crane to Paa's open hands. Great Hall in the window.
const C = require('./_crane');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const y0 = 548;
  // --- tall open window with the Great Hall roofline
  const wx = 346, wy = 78, ww = 200, wh = 256;
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
  // --- the student, down on one knee
  const st = C.student({ x: 214, y: 650, s: 1.72, dir: 'right', crouch: 86, lean: 9, look: [0.8, 0.7],
    expr: { eyes: 'open', brows: 'neutral', mouth: 'smile' },
    armR: { at: [414, 492] }, armL: { a: [20, -30] },
    legL: { foot: [-108, -8], footRot: -80, bend: -1 }, legR: { foot: [64, -6], footRot: 14 } });
  s += st;
  // --- the paper crane
  s += P.paperCrane(st.info.wristR[0] + 22, st.info.wristR[1] - 62, 112);
  // --- Paa, both hands open
  s += R.paa({ x: 590, y: 650, s: 1.42, dir: 'left', expr: 'surprised', look: [-0.8, -0.5], lean: -5,
    armL: { at: [494, 516], rot: -78, hs: 1.1, over: true }, armR: { at: [524, 556], rot: -78, hs: 1.1, over: true } });
  return s;
};
