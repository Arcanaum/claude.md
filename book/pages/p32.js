// PAGE 32 — THREE ENDINGS. MEDIUM. UNFRAMED 720 x 800: three stacked panels, one per winner.
module.exports.art = (R, P, { W, H }) => {
  const F = R.LW.fine, IN = R.LW.in;
  const PH = 256, RY = 214;                      // panel height, ridge top (everyone stands here)
  const cap = (lines) => lines.map((t, i) => P.label(t, 164, 34 + i * 27, 21, { anchor: 'start', family: "'Andika'", weight: 400 })).join('');

  // the mask-scarf bunched down around the girl's neck (same as page 31)
  const scarf = (girl, lean, k) => {
    const n = girl.info.neck, m = R.chain(R.tr(n[0], n[1] - 2), R.rot(lean), R.sc(k));
    return R.shape(R.xf('M20 12L44 6L40 22L50 34L26 26Z', m), { w: IN }) +
      R.union([{ d: R.xf(R.ell(-12, 14, 15, 9), m) }, { d: R.xf(R.ell(12, 15, 16, 9.5), m) }, { d: R.xf(R.ell(0, 10, 14, 8), m) }], { o: IN });
  };
  const wob = (x, y, k) => R.ink(`M${x} ${y}Q${x + 9 * k} ${y + 12} ${x} ${y + 24}M${x + 13 * k} ${y - 9}Q${x + 26 * k} ${y + 12} ${x + 13 * k} ${y + 33}`, { w: IN });

  // shared scenery for one panel: moon behind the girl, stars, two brothers peeking over the far side, ridge + tiles
  const scene = (n, gxMoon, stars, peek) => {
    let s = '';
    s += P.moon(gxMoon, 196, 74);
    for (const [x, y, r] of stars) s += P.star(x, y, r);
    s += peek;
    const slope = `M-20 ${RY + 12}L740 ${RY + 12}L740 270L-20 270Z`;
    s += R.shape(slope) + P.tiles(-10, RY + 18, 740, 30, { tw: 46, th: 28 });
    s += R.shape(R.poly([-20, RY], [740, RY], [740, RY + 18], [-20, RY + 18]));
    s += R.ink(`M-20 ${RY + 9}L740 ${RY + 9}`, { w: F });
    return s;
  };
  const badge = (n, type) =>
    R.shape(R.ell(48, 46, 32, 32)) + P.hollow(String(n), 48, 63, 50, { w: 3.4 }) + R.hand(type, 116, 46, 60);
  const panel = (i, inner) => {
    const y0 = i * 272;
    const fr = R.rrect(3, 3, 714, PH - 6, 20);
    return `<g transform="translate(0 ${y0})"><clipPath id="p32c${i}"><path d="${fr}"/></clipPath>` +
      `<g clip-path="url(#p32c${i})">${inner}</g>${R.ink(fr, { w: 5 })}</g>`;
  };
  const fy = RY + 2, pk = 0.66, py = RY + 44;   // peeking brothers stand lower, on the far slope

  // ================= 1 — GUU: the hood held out like a challenge; she laughs =================
  let a = scene(1, 292, [[540, 36, 9], [706, 176, 7], [150, 110, 8], [400, 40, 7]],
    R.choki({ x: 70, y: py, s: pk, dir: 'right', expr: 'grin', look: 'right' }) +
    R.paa({ x: 180, y: py, s: pk, dir: 'right', expr: 'happy', look: 'right' }));
  const g1 = { x: 446, y: fy, s: 0.86, dir: 'right', expr: 'determined', look: 'right', carryHood: false, lean: -3,
    legL: { foot: [-27, -6] }, legR: { foot: [27, -6] }, armL: { a: [36, -78] }, armR: { a: [92, -4], hs: 1.2 } };
  const w1 = R.guu(g1).info.wristR;
  a += P.lostHood(w1[0] + 14, w1[1] + 30, 76, { rotDeg: -6 }) + R.guu(g1);
  const girl1 = R.girl({ x: 630, y: fy, s: 0.82, dir: 'left', expr: 'laugh', lean: 8, headTilt: 8, shift: 3,
    armL: { a: [128, 24] }, armR: { a: [84, -30] }, legR: { foot: [2, -6] }, legL: { a: [58, -104] } });
  a += girl1 + scarf(girl1, 8, 0.8) + wob(694, 58, 1);
  a += badge(1, 'fist') + cap(['“Next time,” said Guu,', '“we race you up.”']);

  // ================= 2 — CHOKI: hood tied on backwards; he is doubled over laughing =================
  let b = scene(2, 292, [[694, 40, 9], [520, 150, 8], [704, 180, 7], [150, 110, 8], [530, 50, 7]],
    R.guu({ x: 70, y: py, s: pk, dir: 'right', expr: 'grin', look: 'right', carryHood: false }) +
    R.paa({ x: 180, y: py, s: pk, dir: 'right', expr: 'laugh' }));
  b += R.choki({ x: 392, y: fy, s: 0.86, dir: 'right', expr: 'laugh', lean: 38, headTilt: -14, crouch: 8, shift: -8,
    armL: { a: [20, -100], hand: 'fist' }, armR: { a: [34, -112], hand: 'fist' }, legL: { foot: [-20, -6] }, legR: { foot: [16, -6] } });
  // she wobbles on one leg, grinning; the hood is perched on her hair the wrong way round, tail flap sticking up
  const girl2 = R.girl({ x: 612, y: fy, s: 0.78, expr: 'grin', look: [-0.8, 0.3], lean: -6, headTilt: -6, shift: -3, crouch: 5,
    armL: { a: [100, 28] }, armR: { a: [82, -32] }, legL: { foot: [-2, -6] }, legR: { a: [62, -104] } });
  const h2 = girl2.info.head;
  b += girl2 + scarf(girl2, -6, 0.8) + wob(700, 110, 1);
  b += P.lostHood(h2[0] + 15, h2[1] - 30, 58, { rotDeg: -104 });
  b += badge(2, 'v') + cap(['“Now you’re a real ninja,”', 'said Choki. “Sort of.”']);

  // ================= 3 — PAA: the hood offered on two open palms; she reaches with both hands =================
  let c = scene(3, 292, [[700, 30, 9], [560, 40, 8], [706, 180, 7], [150, 110, 8]],
    R.guu({ x: 70, y: py, s: pk, dir: 'right', expr: 'happy', look: 'right', carryHood: false }) +
    R.choki({ x: 180, y: py, s: pk, dir: 'right', expr: 'happy', look: 'right' }));
  const p3 = { x: 436, y: fy, s: 0.88, dir: 'right', expr: 'happy', look: [1, -0.5], lean: 7,
    armR: { a: [86, 2], rot: 90, hs: 1.15, thumb: -1 }, armL: { a: [8, 4], hand: 'none', behind: true } };
  const w3 = R.paa(p3).info.wristR;
  // his far arm and palm (drawn behind him), so the hood rests on TWO open palms
  c += R.tube(R.line([w3[0] - 52, w3[1] - 4], [w3[0] + 2, w3[1] - 17]), 13.6);
  c += R.hand('palm', w3[0] + 28, w3[1] - 17, 57, { rotDeg: 90, side: -1 });
  c += R.paa(p3);
  c += P.lostHood(w3[0] + 36, w3[1] - 54, 66, { rotDeg: 0, flutter: false });
  const girl3 = R.girl({ x: 654, y: fy, s: 0.82, dir: 'left', expr: 'happy', look: [-1, 0.4], lean: -10, headTilt: -4, shift: 2,
    armL: { a: [72, 8] }, armR: { a: [-58, -30] }, legR: { foot: [3, -6] }, legL: { a: [-40, 96], behind: true } });
  c += girl3 + scarf(girl3, -10, 0.8) + wob(560, 150, -1);
  c += badge(3, 'palm') + cap(['“Come down and practice', 'with us,” said Paa.']);

  return panel(0, a) + panel(1, b) + panel(2, c);
};
