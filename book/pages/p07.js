// PAGE 7 — TIGER: ARRIVAL. OPEN. Three heads and six hands round a huge doorpost; empty floor; one enormous tiger banner.
const T = require('./_tiger');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FL = 520;
  // floor line + a few wide boards (low camera)
  s += R.ink(`M-10 ${FL}L730 ${FL}`, { w: R.LW.out });
  s += R.ink(`M150 ${FL}L20 700`, { w: R.LW.in });
  // the one enormous banner
  s += T.banner(235, 70, 290, 390, { emblemSize: 220 });

  // sound of the stomping inside
  s += P.hollow('STOMP!', 215, 645, 78, { rotDeg: -7 });
  s += R.ink('M40 560L62 580M372 560L352 580M30 668L52 660', { w: R.LW.out });

  // brothers behind the post: only the heads poke out (bodies clipped away / hidden), hands grip the post edge
  const px = 500, pw = 150;           // post left edge / width
  const bro = [
    ['choki', 215, 'surprised', 0],
    ['guu', 400, 'grin', 0],
    ['paa', 580, 'worried', 0],
  ];
  const sc = 1.3;
  const hands = [];
  bro.forEach(([who, cy, expr], i) => {
    const lean = -34, L = R.BUILD[who].TL + 35.2;
    const hx = px - 50, a = lean * Math.PI / 180;
    // place the feet so the head centre lands at (hx, cy)
    const hipX = hx - L * sc * Math.sin(a) * -1 * -1, hipY = cy + L * sc * Math.cos(a);
    const B = R.BUILD[who];
    const f = R[who]({ x: hipX, y: hipY + (B.th + B.sh + 5) * sc, s: sc, expr, dir: 'left', look: [-0.9, 0.1], headTilt: 22, lean,
      armL: { hand: 'none', behind: true, a: [-20, 0] }, armR: { hand: 'none', behind: true, a: [-20, 0] } });
    s += `<clipPath id="p7c${i}"><ellipse cx="${hx}" cy="${cy - 44 * sc}" rx="${74 * sc}" ry="${92 * sc}"/></clipPath><g clip-path="url(#p7c${i})">${f}</g>`;
    hands.push(cy);
  });
  // doorpost: huge, square, thick — runs off the top, bottom and right of the frame
  s += R.shape(R.rrect(px, -20, pw + 120, 740, 0));
  s += R.ink(`M${px + pw} -20L${px + pw} 720`, { w: R.LW.in });
  s += R.ink(`M${px + 40} 20Q${px + 52} 200 ${px + 38} 380M${px + 96} 300Q${px + 108} 480 ${px + 94} 690M${px + 70} 60L${px + 70} 150M${px + 28} 470L${px + 28} 600`, { w: R.LW.fine });
  s += R.shape(R.ell(px + 100, 180, 9, 15), { w: R.LW.fine });
  // six hands gripping the post edge (fingers wrapped round from behind)
  for (const cy of hands) {
    for (const dy of [-14, 46]) {
      const y = cy + dy;
      s += R.shape(`M${px} ${y}L${px + 30} ${y}Q${px + 44} ${y} ${px + 44} ${y + 12}L${px + 44} ${y + 34}Q${px + 44} ${y + 46} ${px + 30} ${y + 46}L${px} ${y + 46}Z`);
      s += R.ink(`M${px + 14} ${y + 11.5}L${px + 44} ${y + 11.5}M${px + 14} ${y + 23}L${px + 44} ${y + 23}M${px + 14} ${y + 34.5}L${px + 44} ${y + 34.5}`, { w: R.LW.fine });
    }
  }
  return s;
};
