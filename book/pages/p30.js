// PAGE 30 — PAA LEADS. BUSY. 720 x 690, palm badge top-right.
// Paa edges round the flat rim of the roof, one palm flat on the wall, turning back to show where to step — ACHOO!
const F = require('./_roof');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const { shape, ink, poly, rrect, LW } = R;
  const fy = 560;       // top of the flat ledge (where they walk)
  const cx = 566;       // the wall's corner post (right side)
  // night sky to the right of the corner
  s += F.sky([650, 236, 50], [[610, 150, 10], [690, 350, 9], [620, 420, 11], [686, 480, 8]]);
  // ---- upper-storey wall ----
  s += shape(poly([-10, 60], [cx, 60], [cx, fy], [-10, fy]), { w: LW.in });
  // beams
  s += shape(poly([-10, 118], [cx, 118], [cx, 146], [-10, 146]), { w: LW.in });      // head beam
  s += shape(poly([-10, 470], [cx, 470], [cx, 498], [-10, 498]), { w: LW.in });      // sill beam
  for (const x of [150, 372]) s += shape(poly([x, 146], [x + 28, 146], [x + 28, 470], [x, 470]), { w: LW.in });
  // window grids (rice-paper panes)
  const win = (x, y, w, h, nx, ny) => {
    let o = shape(rrect(x, y, w, h, 4));
    let d = '';
    for (let i = 1; i < nx; i++) d += `M${x + w * i / nx} ${y}L${x + w * i / nx} ${y + h}`;
    for (let j = 1; j < ny; j++) d += `M${x} ${y + h * j / ny}L${x + w} ${y + h * j / ny}`;
    return o + ink(d, { w: LW.in });
  };
  s += win(8, 176, 122, 190, 3, 4) + win(204, 176, 144, 190, 3, 4);
  // plank lines below the windows
  s += ink('M-10 400L150 400M178 400L372 400M400 400L' + (cx - 30) + ' 400M-10 436L150 436M178 436L372 436M400 436L' + (cx - 30) + ' 436', { w: LW.fine });
  // wood grain on beams
  s += ink('M40 132L120 132M230 132L330 132M430 132L500 132M60 484L130 484M260 484L340 484M440 484L510 484', { w: LW.fine });
  // corner post
  s += shape(poly([cx - 48, 60], [cx + 8, 60], [cx + 8, fy], [cx - 48, fy]));
  s += ink(`M${cx - 20} 90L${cx - 20} 250M${cx - 22} 420L${cx - 22} 540`, { w: LW.fine });
  // ---- upper roof eave overhanging at the top ----
  s += F.plane([[-10, -10], [730, -10], [730, 44], [-10, 44]], { tw: 76, th: 52, outline: false });
  s += F.eave([-20, 50], [740, 50], { r: 18, board: 16 });
  // hanging lantern under the eave
  s += F.lantern(456, 76, 0.78) + F.lantern(176, 76, 0.78);
  // ---- the flat ledge: lower roof rim ----
  s += F.plane([[-10, fy + 26], [730, fy + 26], [730, 700], [-10, 700]], { tw: 76, th: 52, outline: false });
  s += shape(poly([-10, fy], [730, fy], [730, fy + 28], [-10, fy + 28]));
  s += ink(`M20 ${fy + 14}L200 ${fy + 14}M260 ${fy + 14}L420 ${fy + 14}M470 ${fy + 14}L700 ${fy + 14}`, { w: LW.fine });
  // ---- brothers following, tiptoe ----
  s += R.guu({ x: 84, y: fy - 2, s: 1.2, dir: 'right', expr: 'worried', look: 'right', lean: 3,
    armL: { a: [24, -96], hand: 'fist' }, armR: { a: [30, -110], hand: 'fist' }, legL: { foot: [-24, -6] }, legR: { foot: [20, -6] } });
  s += R.choki({ x: 232, y: fy - 2, s: 1.2, dir: 'right', expr: 'doubtful', look: 'right', lean: 4,
    armL: { a: [70, 30] }, armR: { a: [30, -100] }, legL: { foot: [-8, -6] }, legR: { foot: [24, -20] } });
  // ---- Paa, leading, mid-sneeze: one palm flat on the corner post, the other showing where to step ----
  const p = R.paa({ x: 458, y: fy - 2, s: 1.6, dir: 'left', lean: -3, expr: { eyes: 'squeeze', brows: 'up', mouth: 'shout' },
    armR: { at: [cx - 16, 352], hand: 'palm', hs: 1.2, rot: 6 }, armL: { a: [46, 6], hand: 'palm' },
    legL: { foot: [-22, -6] }, legR: { foot: [24, -6] } });
  s += p;
  // sneeze: dust puffs + ACHOO!
  const h = p.info.head;
  s += F.puff(h[0] - 108, h[1] + 30, 46, -10) + F.puff(h[0] - 142, h[1] - 14, 36, 15) + F.puff(h[0] - 150, h[1] + 62, 32, 0);
  s += ink(`M${h[0] - 68} ${h[1] + 30}L${h[0] - 80} ${h[1] + 30}M${h[0] - 66} ${h[1] + 44}L${h[0] - 78} ${h[1] + 52}M${h[0] - 66} ${h[1] + 16}L${h[0] - 78} ${h[1] + 8}`, { w: LW.in });
  s += P.hollow('ACHOO!', 318, 236, 72, { rotDeg: -5 });
  return s;
};
