// PAGE 4 — THE HOOD. MEDIUM, framed. Art box 720 x 690.
module.exports.art = (R, P, { W, H }) => {
  let s = '';

  // ---- far below: hills, Great Hall and the three dojo roofs, small ----
  s += R.ink(R.curve([[-10, 408], [110, 386], [260, 398], [420, 382], [600, 398], [730, 378]]));
  s += P.greatHall(220, 340, 170);
  s += P.dojoMini('tiger', 88, 424, 96);
  s += P.dojoMini('crane', 220, 424, 96);
  s += P.dojoMini('turtle', 352, 424, 96);
  s += P.cloud(630, 330, 120) + P.cloud(84, 268, 110);

  // ---- the branch with the snagged hood ----
  const by = 140;
  s += P.needles(96, by - 2, 50, -150, 7, 150) + P.needles(34, by + 44, 50, 160, 7, 150);
  s += R.union([
    { d: R.curve([[760, by - 40], [600, by - 6], [430, by + 4], [250, by + 2]]), w: 40 },
    { d: R.curve([[280, by + 2], [180, by + 16], [100, by + 34], [44, by + 44]]), w: 18 },
    { d: R.curve([[210, by + 8], [160, by + 2], [104, by]]), w: 12 },
  ]);
  s += R.ink(`M660 ${by - 18}Q620 ${by - 6} 586 ${by - 2}M540 ${by + 10}Q510 ${by + 12} 480 ${by + 12}M370 ${by}Q350 ${by + 2} 332 ${by}`, { w: R.LW.fine });
  s += P.lostHood(420, by + 128, 208, { rotDeg: -8 });
  s += R.union([{ d: R.curve([[452, by + 14], [446, by + 40], [432, by + 64]]), w: 12 }, { d: R.line([444, by + 44], [462, by + 60]), w: 9 }]);   // the snag twig, hooked through the hood
  // flutter marks
  s += R.ink(`M576 ${by + 62}Q592 ${by + 56} 608 ${by + 62}M584 ${by + 100}Q602 ${by + 94} 620 ${by + 102}M286 ${by + 150}Q300 ${by + 142} 314 ${by + 150}`);

  // ---- pine needles framing the top ----
  s += R.tube(R.curve([[-30, 26], [120, 8], [300, 18], [470, 6], [620, 18], [750, 4]]), 10);
  for (const [x, y, r, a] of [[30, 26, 62, 100], [118, 10, 70, 85], [212, 14, 60, 95], [300, 18, 66, 88], [392, 12, 58, 94], [476, 8, 68, 86], [566, 14, 60, 96], [644, 16, 66, 84], [706, 8, 60, 100]])
    s += P.needles(x, y, r, a, 9, 150);

  // ---- the brothers climbing up into frame over a lower branch ----
  const ly = 664, sc = 1.42;
  s += R.guu({ x: 128, y: 788, s: sc, carryHood: false, expr: 'surprised', look: [0.7, -1], headTilt: -4,
    armL: { a: [10, 0], hand: 'none' }, armR: { a: [112, 10], hand: 'point', rot: 24, over: true, hs: 1.3 } });
  s += R.choki({ x: 400, y: 795, s: sc, expr: 'grin', look: [0.1, -1], armL: { a: [10, 0], hand: 'none' }, armR: { a: [10, 0], hand: 'none' } });
  s += R.paa({ x: 622, y: 792, s: sc, expr: 'surprised', look: [-0.7, -1], headTilt: 4, armL: { a: [10, 0], hand: 'none' }, armR: { a: [10, 0], hand: 'none' } });
  s += R.tube(R.curve([[-30, ly + 10], [180, ly - 4], [420, ly + 6], [600, ly - 2], [750, ly + 8]]), 40);
  s += R.ink(`M90 ${ly + 6}Q120 ${ly + 2} 150 ${ly + 2}M340 ${ly + 12}Q370 ${ly + 14} 400 ${ly + 14}M580 ${ly + 6}Q610 ${ly + 4} 640 ${ly + 6}`, { w: R.LW.fine });
  // gripping hands on top of the branch
  s += R.hand('fist', 34, ly - 14, 60, { rotDeg: 180 });
  s += R.hand('fist', 292, ly - 14, 58, { rotDeg: 180 });
  s += R.hand('fist', 512, ly - 16, 60, { rotDeg: 180 });
  return s;
};
