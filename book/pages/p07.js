// PAGE 7 — TIGER: ARRIVAL. OPEN. Three heads and six hands round a huge doorpost; empty floor; one enormous tiger banner.
const T = require('./_tiger');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FL = 520;
  // floor line + a few wide boards (low camera)
  s += R.ink(`M-10 ${FL}L730 ${FL}`, { w: R.LW.out });
  s += R.ink(`M150 ${FL}L20 700M330 ${FL}L290 700M500 ${FL}L560 700M640 ${FL}L800 700`, { w: R.LW.in });
  // the one enormous banner
  s += T.banner(300, 70, 300, 400, { emblemSize: 230 });

  // brothers behind the post: bodies first (hidden), then the post, then hands on top
  const px = 520, pw = 150;           // post left edge / width
  const bro = [
    ['choki', 150, 'surprised', 6],
    ['guu', 330, 'grin', -4],
    ['paa', 505, 'worried', 5],
  ];
  const sc = 1.25;
  const hands = [];
  for (const [who, hy, expr, tilt] of bro) {
    // head pokes out to the left of the post; the figure stands behind it
    const f = R[who]({ x: px + 18, y: hy + 250 * sc, s: sc, expr, look: [-0.8, 0.1], headTilt: -10 + tilt, lean: -16,
      armL: { hand: 'none' }, armR: { hand: 'none' } });
    s += f;
    hands.push([who, f.info.head]);
  }
  // doorpost: huge, square, thick — runs off the top, bottom and right of the frame
  s += R.shape(R.rrect(px, -20, pw + 120, 740, 0));
  s += R.ink(`M${px + pw} -20L${px + pw} 720`, { w: R.LW.in });
  s += R.ink(`M${px + 40} 20Q${px + 52} 200 ${px + 38} 380M${px + 96} 300Q${px + 108} 480 ${px + 94} 690M${px + 70} 60L${px + 70} 150M${px + 28} 470L${px + 28} 600`, { w: R.LW.fine });
  s += R.shape(R.ell(px + 100, 180, 9, 15), { w: R.LW.fine });
  // six hands gripping the post edge
  const HT = { choki: 'grip', guu: 'grip', paa: 'grip' };
  for (const [who, h] of hands) {
    for (const dy of [34, 78]) s += R.hand(HT[who], px + 10, h[1] + dy * sc * 0.8, 44, { rotDeg: -90, side: dy > 50 ? 1 : -1 });
  }
  return s;
};
