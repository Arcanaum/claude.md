// PAGE 26 — THREE CLUES, ONE ROOF. BUSY. Framed 720 x 690. NIGHT. The Great Hall roof fills the page;
// a small masked figure wobbles on the ridge against the moon; the brothers look up from below.
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const F = R.LW.fine, IN = R.LW.in;
  const mir = (d) => R.xf(d, [-1, 0, 0, 1, 720, 0]); // mirror about x = 360

  // ---------- sky ----------
  s += P.moon(318, 150, 132);
  // (craters re-placed so none of them sits half behind the little figure)
  s += `<circle cx="318" cy="150" r="127" fill="#fff"/>`;
  s += R.ink(R.ell(228, 176, 22, 22)) + R.ink(R.ell(412, 158, 14, 14)) + R.ink(R.ell(246, 84, 9, 9));
  for (const [x, y, r] of [[52, 52, 15], [128, 142, 10], [36, 236, 12], [560, 44, 11], [616, 196, 10], [540, 150, 8], [84, 196, 8], [176, 30, 8]]) s += P.star(x, y, r);
  // pine bough reaching in from the top-right corner
  s += P.pine([[740, 20], [668, 70], [596, 92]], { w: 20, fans: [[604, 92, 52, 200], [650, 78, 54, 110], [690, 52, 52, 250], [712, 44, 56, 120]] });

  // ---------- the figure on the ridge (drawn before the ridge so her standing foot sits ON it) ----------
  const girl = R.girl({ x: 300, y: 194, s: 0.7, mask: true, expr: 'worried', lean: 9, headTilt: -8, shift: -4,
    armL: { a: [104, 24] }, armR: { a: [78, -34] },
    legL: { foot: [-4, -6] }, legR: { a: [78, -112] } });
  s += girl;
  // wobble marks
  s += R.ink('M206 92Q196 106 206 120M192 82Q178 106 192 130', { w: IN });
  s += R.ink('M398 62Q408 76 398 90M412 52Q426 76 412 100', { w: IN });

  // ---------- upper wall band (between the two roofs) ----------
  s += R.shape(R.poly([112, 318], [608, 318], [608, 410], [112, 410]));
  for (let x = 150; x < 580; x += 62) s += R.shape(R.rrect(x, 346, 40, 44, 4), { w: IN }) + R.ink(`M${x + 20} 346L${x + 20} 390M${x} 368L${x + 40} 368`, { w: F });

  // ---------- upper roof ----------
  const up = 'M150 212L570 212C590 284 640 334 706 350Q360 318 14 350C80 334 130 284 150 212Z';
  s += R.shape(up);
  s += `<clipPath id="p26u"><path d="${up}"/></clipPath><g clip-path="url(#p26u)">${P.tiles(-8, 214, 740, 150, { tw: 44, th: 29 })}</g>`;
  s += R.ink(up, { w: R.LW.out });
  s += R.tube('M14 350Q360 318 706 350', 9);           // eave rim
  // ridge, horns, crooked chimney (the Great Hall look)
  s += R.shape(R.poly([452, 196], [444, 128], [492, 118], [496, 196]));
  s += R.shape(R.xf(R.rrect(-31, -9, 62, 18, 5), R.chain(R.tr(468, 120), R.rot(-11))));
  s += R.ink('M447 152L494 146M449 174L495 170M470 149L471 172M459 127L460 150M482 124L483 147', { w: F });
  s += R.shape(R.poly([136, 216], [150, 190], [570, 190], [584, 216]));
  s += R.ink('M148 203L572 203', { w: F });
  const horn = 'M134 218L116 166L162 190Z';
  s += R.shape(horn) + R.shape(mir(horn));

  // ---------- hall wall, doors, lanterns ----------
  s += R.shape(R.poly([70, 500], [650, 500], [650, 700], [70, 700]));
  for (const x of [96, 624]) s += R.tube(`M${x} 520L${x} 700`, 20);                      // posts
  s += R.shape(R.poly([262, 548], [458, 548], [458, 700], [262, 700]));                  // door frame
  s += R.ink('M360 548L360 700', { w: IN });
  for (const x of [276, 374]) s += R.shape(R.rrect(x, 562, 70, 110, 4), { w: IN });
  s += R.ink('M118 600L250 600M470 600L602 600', { w: F });

  // ---------- lower roof ----------
  const lo = 'M96 402L624 402C650 476 700 526 772 542Q360 496 -52 542C20 526 70 476 96 402Z';
  s += R.shape(lo);
  s += `<clipPath id="p26l"><path d="${lo}"/></clipPath><g clip-path="url(#p26l)">${P.tiles(-60, 404, 840, 160, { tw: 54, th: 34 })}</g>`;
  s += R.ink(lo, { w: R.LW.out });
  s += R.tube('M-52 542Q360 496 772 542', 10);
  s += R.shape(R.poly([86, 408], [96, 390], [624, 390], [634, 408]), { w: IN });         // lower ridge strip
  // lanterns hanging from the eave
  for (const x of [156, 564]) {
    s += R.ink(`M${x} 528L${x} 546`, { w: IN });
    s += R.shape(R.ell(x, 572, 21, 26)) + R.ink(`M${x - 19} 562L${x + 19} 562M${x - 19} 582L${x + 19} 582`, { w: F });
    s += R.shape(R.rrect(x - 9, 543, 18, 7, 2), { w: IN }) + R.shape(R.rrect(x - 9, 596, 18, 7, 2), { w: IN });
  }

  // ---------- ground ----------
  s += R.ink('M-10 668L730 668', { w: R.LW.out });
  s += R.ink('M40 684L150 684M560 682L690 682', { w: IN });

  // ---------- the brothers, from behind, looking up ----------
  const by = 676, bs = 0.78;
  s += R.guu({ x: 236, y: by, s: bs, dir: 'back', lean: -4, headTilt: -12,
    armL: { a: [14, 6] }, armR: { a: [152, 6], hand: 'point', over: true } });
  s += R.choki({ x: 364, y: by, s: bs, dir: 'back', headTilt: -6, armL: { a: [14, 8] }, armR: { a: [14, 8] } });
  s += R.paa({ x: 492, y: by, s: bs, dir: 'back', headTilt: -10, lean: 3,
    armL: { a: [132, 30], over: true }, armR: { a: [18, 10] } });
  // bushes at the corners
  for (const k of [0, 1]) {
    const b = R.union([{ d: R.ell(30, 640, 38, 34) }, { d: R.ell(-4, 656, 30, 26) }, { d: R.ell(62, 660, 22, 20) }]) + R.ink('M14 630Q24 622 34 630M36 650Q46 642 56 650', { w: F });
    s += k ? `<g transform="matrix(-1 0 0 1 720 0)">${b}</g>` : b;
  }
  return s;
};
