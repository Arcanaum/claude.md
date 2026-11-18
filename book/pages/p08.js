// PAGE 8 — TIGER: CAUGHT. BUSY. The huge student mid-stomp, seen from the triplets' eye level.
const T = require('./_tiger');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FL = 470; // floor/wall line
  // ---- wall ----
  // ceiling beams
  s += R.shape(R.rrect(-20, -10, 760, 46, 0));
  s += R.ink('M-10 22L730 22', { w: R.LW.fine });
  for (const bx of [-14]) s += R.shape(R.rrect(bx, 36, 44, FL - 36, 0)) + R.ink(`M${bx + 14} 40L${bx + 14} ${FL}M${bx + 30} 40L${bx + 30} ${FL}`, { w: R.LW.fine });
  s += R.shape(R.rrect(-20, 58, 760, 18, 0), { w: R.LW.in });
  // wainscot rail
  s += R.shape(R.rrect(-20, FL - 34, 760, 34, 0));
  // racks of staffs
  s += T.rack(40, 120, 150, 300, 4);
  s += T.rack(628, 150, 170, 280, 4);
  s += T.banner(556, 92, 100, 230, { emblemSize: 70 });
  // ---- floor ----
  s += R.shape(R.rrect(-20, FL, 760, 300, 0));
  s += T.boards(FL, 700, { n: 12, cross: false });
  s += T.mat(120, 520, 470, 150, 90, { weave: 14 });

  // ---- the student ----
  const st = T.student({ x: 240, y: 606, s: 2.55, expr: { eyes: 'open', brows: 'angry', mouth: 'shout' }, look: [0.7, 1], headTilt: 10, lean: -2, shift: 4,
    legL: { foot: [-30, -6] }, footL: 'side', footDirL: -1,
    legR: { a: [100, -40] }, footR: 'none',
    armL: { a: [52, -100], hs: 1.5 }, armR: { a: [58, -112], hs: 1.5 } });
  s += st;
  s += T.sole(st.info.ankleR[0] + 6, st.info.ankleR[1] + 4, 2.6, 8);
  // whoosh marks round the raised foot
  

  // ---- the brothers, tiny, from behind ----
  s += R.paa({ x: 425, y: 682, s: 0.66, dir: 'back', lean: -6, armL: { a: [118, 45], hand: 'palm' }, armR: { a: [118, 45], hand: 'palm' } });
  s += R.guu({ x: 540, y: 678, s: 0.66, dir: 'back', armL: { a: [30, 10] }, armR: { a: [30, 10] } });
  s += R.choki({ x: 645, y: 682, s: 0.66, dir: 'back', lean: 8, armL: { a: [20, 0], hand: 'mitt' }, armR: { a: [20, 0], hand: 'mitt' } });
  // floor-shake marks by the planted foot
  s += R.ink('M52 600L30 588M48 640L22 644M70 668L52 686', { w: R.LW.out });
  return s;
};
