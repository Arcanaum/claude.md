// PAGE 1 — TITLE. OPEN, unframed. Art box 720 x 850.
module.exports.art = (R, P, { W, H }) => {
  let s = '';

  // ---- far below: Great Hall behind, three dojos in front ----
  const gy = 816;
  s += R.ink(`M14 ${gy}L706 ${gy}`, { w: R.LW.out });
  s += P.greatHall(352, 626, 262);
  s += P.dojoMini('tiger', 104, 776, 138);
  s += P.dojoMini('crane', 336, 776, 138);
  s += P.dojoMini('turtle', 568, 776, 138);
  s += R.ink(`M60 ${gy + 20}L150 ${gy + 20}M290 ${gy + 22}L410 ${gy + 22}M540 ${gy + 20}L650 ${gy + 20}`);

  // ---- the brothers on the branch, seen from behind ----
  const by = 552;
  s += R.guu({ x: 168, y: by - 16, s: 1.2, dir: 'back', carryHood: false, armL: { a: [48, -100] }, armR: { a: [48, -100] } });
  s += R.choki({ x: 356, y: by - 12, s: 1.2, dir: 'back', headTilt: -5, armL: { a: [52, 12], hand: 'point' }, armR: { a: [14, 6] } });
  s += R.paa({ x: 540, y: by - 14, s: 1.2, dir: 'back', headTilt: 5, armL: { a: [20, 6] }, armR: { a: [22, 8] } });
  // branch: thick from the left edge, thinning to twigs with needle fans on the right
  s += P.needles(700, by - 34, 44, -20, 7, 150) + P.needles(676, by + 22, 40, 50, 7, 140);
  s += R.union([
    { d: R.curve([[-30, by - 10], [160, by + 4], [380, by + 6], [560, by - 2]]), w: 36 },
    { d: R.curve([[540, by - 2], [620, by - 10], [692, by - 30]]), w: 16 },
    { d: R.curve([[580, by], [630, by + 10], [670, by + 20]]), w: 10 },
  ]);
  s += R.ink(`M40 ${by - 6}Q70 ${by - 2} 96 ${by - 2}M250 ${by + 10}Q290 ${by + 14} 320 ${by + 12}M430 ${by + 2}Q460 ${by + 4} 486 ${by + 2}M110 ${by + 12}Q130 ${by + 15} 150 ${by + 14}`, { w: R.LW.fine });

  // ---- title ----
  s += P.hollow('GUU, CHOKI, PAA', 360, 176, 84, { w: 5 });
  s += P.hollow('AND THE NINJA ON THE ROOF', 360, 240, 46);

  // ---- pine needles framing the top ----
  s += R.tube(R.curve([[-30, 30], [120, 12], [300, 22], [470, 10], [620, 22], [750, 8]]), 10);
  for (const [x, y, r, a] of [[30, 30, 62, 100], [118, 14, 70, 85], [212, 18, 60, 95], [300, 22, 66, 88], [392, 16, 58, 94], [476, 12, 68, 86], [566, 18, 60, 96], [644, 20, 66, 84], [706, 12, 60, 100]])
    s += P.needles(x, y, r, a, 9, 150);
  return s;
};
