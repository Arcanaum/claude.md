// PAGE 13 — CRANE: ARRIVAL. OPEN. Three heads stacked in the gap of a paper screen door; tall empty hall, one long crane scroll.
const C = require('./_crane');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const yF = 618;                 // floor line
  const dT = 62;                  // door top
  const gL = 184, gR = 322;       // the gap
  const S = 1.5;
  const feet = (headY, TL) => headY + (57 + TL + 35.2) * S;
  // --- what is in the gap: the brothers, stacked, each peeking round a door edge. Clipped to the opening.
  s += `<clipPath id="p13gap"><rect x="${gL}" y="${dT}" width="${gR - gL}" height="${yF - dT}"/></clipPath>`;
  const peek = { eyes: 'wide', brows: 'up', mouth: 'small' };
  let g = '';
  const LN = 13, off = TL => Math.sin(LN * Math.PI / 180) * (TL + 35.2) * S;
  // two fingers up behind the top of his head, like ears
  g += R.hand('v', gL + 44, 170, 104, { rotDeg: 10, cuff: true });
  g += R.choki({ x: gL - 10 - off(58) * 0.4, y: feet(262, 58), s: S, lean: LN * 0.4, dir: 'right', expr: { eyes: 'wide', brows: 'up', mouth: 'smirk' }, look: [0.8, 0.5],
    armR: { a: [10, 5], hand: 'none' }, armL: { a: [10, 5] } });
  g += R.guu({ x: gR + 6 + off(56), y: feet(412, 56), s: S, flip: true, lean: LN, dir: 'right', expr: peek, look: [0.8, 0.1] });
  g += R.paa({ x: gL - 6 - off(57), y: feet(538, 57), s: S, lean: LN, dir: 'right', expr: peek, look: [0.8, -0.3] });
  s += `<g clip-path="url(#p13gap)">${g}</g>`;
  // --- floor line and a few quiet boards
  s += R.ink(`M-10 ${yF}L${W + 10} ${yF}`, { w: R.LW.out });
  s += R.ink(`M254 ${yF}L200 ${H + 10}M470 ${yF}L540 ${H + 10}M640 ${yF}L${W + 40} ${H + 10}M70 ${yF}L-60 ${H + 10}`, { w: R.LW.in });
  // --- the sliding paper doors (left panel, right panel) and lintel
  s += C.shoji(16, dT + 12, gL - 16 - 12, yF - dT - 24, { cols: 2, rows: 6, frame: 12, kick: 96 });
  s += C.shoji(gR + 12, dT + 12, 132, yF - dT - 24, { cols: 2, rows: 6, frame: 12, kick: 96 });
  s += R.shape(`M-10 ${dT - 30}L${W + 10} ${dT - 30}L${W + 10} ${dT}L-10 ${dT}Z`);   // lintel / ceiling beam
  // --- one long crane scroll on the far wall
  s += C.scroll(590, 128, 124, 420);
  return s;
};
