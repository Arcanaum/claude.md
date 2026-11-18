// PAGE 3 — HOW TO PLAY. OPEN. Art box 720 x 520. Three hands in a ring, three fat arrows: winner -> loser.
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  // A thick curved arrow as one closed, colourable shape. p0 -> p2 with control point p1 (quadratic).
  const arrow = (p0, p1, p2, { w = 34, head = 78, hl = 62 } = {}) => {
    const at = t => [(1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0], (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]];
    const N = 28, pts = [];
    for (let i = 0; i <= N; i++) pts.push(at(i / N));
    // cut the shaft where the head begins (hl units before the tip, measured along the curve)
    let len = 0, cut = N;
    for (let i = N; i > 0; i--) { len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (len >= hl) { cut = i - 1; break; } }
    const nrm = i => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(N, i + 1)], L = Math.hypot(b[0] - a[0], b[1] - a[1]); return [-(b[1] - a[1]) / L, (b[0] - a[0]) / L]; };
    const L = [], Rr = [];
    for (let i = 0; i <= cut; i++) { const n = nrm(i); L.push([pts[i][0] + n[0] * w / 2, pts[i][1] + n[1] * w / 2]); Rr.push([pts[i][0] - n[0] * w / 2, pts[i][1] - n[1] * w / 2]); }
    const c = pts[cut], tip = pts[N], hd = Math.hypot(tip[0] - c[0], tip[1] - c[1]), n = [-(tip[1] - c[1]) / hd, (tip[0] - c[0]) / hd];
    const all = [...L, [c[0] + n[0] * head / 2, c[1] + n[1] * head / 2], tip, [c[0] - n[0] * head / 2, c[1] - n[1] * head / 2], ...Rr.reverse()];
    return R.shape(R.poly(...all.map(p => [R.r1(p[0]), R.r1(p[1])])), { w: 5 });
  };
  // rock -> scissors, scissors -> paper, paper -> rock (clockwise)
  s += arrow([462, 64], [602, 62], [602, 238]);
  s += arrow([482, 444], [374, 500], [270, 444]);
  s += arrow([138, 238], [138, 62], [262, 64]);
  s += R.hand('fist', 362, 98, 158, { o: 5 });
  s += R.hand('v', 590, 384, 236, { o: 5 });
  s += R.hand('palm', 164, 384, 236, { o: 5, side: -1 });
  return s;
};
