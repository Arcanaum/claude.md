// PAGE 5 — THE WIND-UP. MEDIUM, framed. Art box 720 x 690.
module.exports.art = (R, P, { W, H }) => {
  let s = '';

  // ---- far below: Great Hall behind, three dojos in front ----
  const gy = 668;
  s += R.ink(R.curve([[-10, 590], [120, 556], [300, 580], [470, 560], [620, 574], [730, 552]]));
  s += R.ink(`M-10 ${gy}L730 ${gy}`, { w: R.LW.out });
  s += P.greatHall(356, 488, 280);
  s += P.cloud(96, 512, 130) + P.cloud(628, 500, 120);
  s += P.dojoMini('tiger', 104, 626, 146);
  s += P.dojoMini('crane', 340, 626, 146);
  s += P.dojoMini('turtle', 576, 626, 146);

  // ---- the brothers on the branch, seen from behind, fists up ----
  const by = 408;
  const up = { hand: 'fist', hs: 1.5, rot: 0, over: true };
  const shake = (x, y) => R.ink(`M${x + 44} ${y - 14}L${x + 60} ${y - 24}M${x + 48} ${y + 8}L${x + 66} ${y + 8}M${x + 14} ${y - 46}L${x + 20} ${y - 62}M${x - 12} ${y - 46}L${x - 16} ${y - 62}`);
  const long = { armU: 30, armF: 28 }, longC = { armU: 34, armF: 32 }; // raised arms read better a touch longer
  const g = R.guu({ x: 122, y: by - 16, s: 1.3, dir: 'back', headTilt: -4, build: long, armR: { a: [125, 10], ...up }, armL: { a: [40, -90] } });
  const c = R.choki({ x: 340, y: by - 12, s: 1.3, dir: 'back', headTilt: -4, build: longC, armR: { a: [125, 10], ...up }, armL: { a: [18, 6], hand: 'mitt' } });
  const p = R.paa({ x: 556, y: by - 14, s: 1.3, dir: 'back', headTilt: -4, build: long, armR: { a: [125, 10], ...up }, armL: { a: [22, 8], hand: 'mitt' } });
  s += g + c + p;
  for (const f of [g, c, p]) s += shake(f.info.wristR[0], f.info.wristR[1] - 30);
  s += P.needles(708, by - 40, 46, -30, 7, 150);
  s += R.union([
    { d: R.curve([[-30, by - 12], [160, by + 4], [380, by + 6], [600, by - 4]]), w: 38 },
    { d: R.curve([[580, by - 4], [650, by - 14], [704, by - 36]]), w: 16 },
  ]);
  s += R.ink(`M30 ${by - 8}Q60 ${by - 3} 90 ${by - 3}M236 ${by + 10}Q270 ${by + 14} 300 ${by + 12}M440 ${by + 4}Q470 ${by + 6} 500 ${by + 3}`, { w: R.LW.fine });

  // ---- pine needles framing the top ----
  s += R.tube(R.curve([[-30, 26], [120, 8], [300, 18], [470, 6], [620, 18], [750, 4]]), 10);
  for (const [x, y, r, a] of [[30, 26, 62, 100], [118, 10, 70, 85], [212, 14, 60, 95], [300, 18, 66, 88], [392, 12, 58, 94], [476, 8, 68, 86], [566, 14, 60, 96], [644, 16, 66, 84], [706, 8, 60, 100]])
    s += P.needles(x, y, r, a, 9, 150);
  return s;
};
