// PAGE 16 — CRANE: THE TURN. OPEN. Choki mid-air, legs still running, the beam catching him square in the belly. WHAP!
const C = require('./_crane');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const by = 468;                       // beam height at Choki
  // --- bare floor: one line and a small shadow under him
  s += R.ink(`M-10 652L${W + 10} 652`, { w: R.LW.out });
  s += R.ink(R.ell(352, 671, 86, 11), { w: R.LW.in });
  // --- WHAP!
  s += P.hollow('WHAP!', 236, 138, 128, { rotDeg: -6, w: 5, spacing: 4 });
  // --- Choki, folded round the beam, legs still running
  s += R.choki({ x: 352, y: 628, s: 1.9, expr: 'ouch', lean: -7, headTilt: -5,
    armL: { a: [112, 30], hand: 'v', rot: -64 }, armR: { a: [108, 34], hand: 'v', rot: 60 },
    legL: { a: [72, -70], footRot: 10 }, legR: { a: [22, 78], footRot: -50 } });
  // --- the beam, across his belly, streamers flying on past him
  s += C.pole({ x: 860, y: by + 190, h: 190, La: 800, Lb: 60, phi: 2, ry: 0.3, dir: -1, parts: 'beam', arcs: false, stream: 'a', slen: 130, sw: 26, beamW: 22 });
  // impact ticks either side of the belly
  s += R.ink(`M250 ${by - 26}L214 ${by - 46}M246 ${by + 32}L212 ${by + 54}M456 ${by - 30}L492 ${by - 52}M460 ${by + 30}L496 ${by + 50}`, { w: R.LW.out });
  // speed lines of the swing
  s += R.ink(`M560 ${by - 74}L700 ${by - 80}M600 ${by - 48}L705 ${by - 52}M580 ${by + 52}L705 ${by + 58}`, { w: R.LW.in });
  
  return s;
};
