// PAGE 8 — TIGER: CAUGHT. BUSY. The huge student mid-stomp, seen from the triplets' eye level.
const T = require('./_tiger');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FL = 470; // floor/wall line
  // ---- wall ----
  // ceiling beams
  s += R.shape(R.rrect(-20, -10, 760, 46, 0));
  s += R.ink('M-10 22L730 22', { w: R.LW.fine });
  for (const bx of [50]) s += R.shape(R.rrect(bx, 36, 44, FL - 36, 0)) + R.ink(`M${bx + 14} 40L${bx + 14} ${FL}M${bx + 30} 40L${bx + 30} ${FL}`, { w: R.LW.fine });
  // wainscot rail
  s += R.shape(R.rrect(-20, FL - 34, 760, 34, 0));
  // racks of staffs
  s += T.rack(108, 120, 150, 300, 4);
  s += T.rack(585, 150, 170, 280, 4);
  s += T.banner(492, 92, 112, 240, { emblemSize: 76 });
  // ---- floor ----
  s += R.shape(R.rrect(-20, FL, 760, 300, 0));
  s += T.boards(FL, 700, { n: 12, cross: false });
  s += T.mat(120, 520, 470, 150, 90, { weave: 14 });

  // ---- the student ----
  const st = T.student({ x: 262, y: 606, s: 2.55, expr: { eyes: 'open', brows: 'angry', mouth: 'shout' }, look: [0.7, 1], headTilt: 10, lean: -2, shift: 4,
    legL: { foot: [-30, -6] }, footL: 'side', footDirL: -1,
    legR: { a: [82, -62] }, footR: 'none',
    armL: { a: [52, -100], hs: 1.5 }, armR: { a: [58, -112], hs: 1.5 } });
  s += st;
  s += T.sole(st.info.ankleR[0] + 6, st.info.ankleR[1] + 10, 2.7, 6);
  // whoosh marks round the raised foot
  s += R.ink('M560 470L590 490M505 500L505 528M440 492L420 514', { w: R.LW.out });

  // ---- the brothers, tiny, from behind ----
  s += R.paa({ x: 440, y: 674, s: 0.72, dir: 'back', lean: -6, armL: { a: [150, 10], hand: 'palm', over: true }, armR: { a: [150, 10], hand: 'palm', over: true } });
  s += R.guu({ x: 545, y: 670, s: 0.72, dir: 'back', armL: { a: [30, 10] }, armR: { a: [30, 10] } });
  s += R.choki({ x: 645, y: 674, s: 0.72, dir: 'back', lean: 8, armL: { a: [20, 0], hand: 'mitt' }, armR: { a: [20, 0], hand: 'mitt' } });
  return s;
};
