// PAGE 25 — WHAT DID YOU FIND? MEDIUM. Framed 720 x 690. Daytime alley; Paa's big empty hands = draw-in space.
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const F = R.LW.fine;

  // ---------- alley: two dojo walls in perspective, a strip of ground between ----------
  // far end of the alley (daylight) with a low fence and a cloud
  s += P.cloud(262, 196, 96) + P.cloud(470, 236, 80);
  s += R.shape(R.poly([170, 330], [550, 330], [550, 405], [170, 405]), { w: R.LW.in });
  let fence = '';
  for (let x = 200; x < 550; x += 32) fence += `M${x} 330L${x} 405`;
  s += R.ink(fence, { w: F });
  // ground
  s += R.shape(R.poly([170, 405], [550, 405], [760, 700], [-40, 700]), { w: R.LW.in });
  s += R.ink('M250 405L120 700M360 405L360 700M470 405L600 700', { w: F });
  s += R.ink('M133 470L587 470M82 560L638 560', { w: F });
  // walls
  const wall = (k) => { // k = 1 left wall, -1 right wall (mirrored about x = 360)
    const X = x => 360 - k * (360 - x);
    let w = R.shape(R.poly([X(-10), -10], [X(170), 150], [X(170), 405], [X(-10), 700]));
    // planks converge toward the far end
    let d = '';
    for (const x of [22, 58, 92, 122, 148]) { const t = (x + 10) / 180; d += `M${X(x)} ${-10 + 160 * t}L${X(x)} ${700 - 295 * t}`; }
    w += R.ink(d, { w: F });
    // a rail along the wall
    w += R.ink(`M${X(-10)} 372L${X(170)} 306M${X(-10)} 396L${X(170)} 318`, { w: R.LW.in });
    // eave: roof edge with tile ends
    w += R.shape(R.poly([X(-10), -40], [X(196), 142], [X(196), 164], [X(-10), 4]), { w: R.LW.in });
    return w;
  };
  s += wall(1) + wall(-1);

  // ---------- the huddle ----------
  const fy = 476, sc = 1.55;
  s += R.guu({ x: 172, y: fy + 6, s: sc, lean: 13, headTilt: 10, expr: 'surprised', look: [0.9, 1], dir: 'right',
    armL: { a: [20, 10] }, armR: { a: [8, 6], behind: true }, legL: { foot: [-22, -6] } });
  s += R.choki({ x: 552, y: fy + 6, s: sc, lean: -13, headTilt: -10, expr: 'grin', look: [-0.9, 1], dir: 'left',
    armR: { a: [22, 12] }, armL: { a: [8, 6], behind: true }, legR: { foot: [20, -6] } });
  s += R.paa({ x: 360, y: fy, s: sc, expr: 'happy', look: 'down', headTilt: 0,
    armL: { a: [20, 0], hand: 'none' }, armR: { a: [20, 0], hand: 'none' } });

  // ---------- Paa's big cupped hands, held out to the reader (EMPTY: the child draws in them) ----------
  const cx = 360, cy = 544;
  const T = d => R.xf(d, R.tr(cx, cy));
  // sleeves coming forward from his shoulders
  for (const k of [-1, 1]) {
    const a = [cx + k * 36, 336], b = [cx + k * 84, cy - 92];
    s += R.tube(R.line(a, [cx + k * 74, 392], b), 48);
    s += R.shape(R.xf(R.rrect(-38, -15, 76, 30, 9), R.chain(R.tr(b[0], b[1] - 6), R.rot(k * -8))), { w: R.LW.in });
  }
  // two separate hands, little-finger edges touching in the middle, each with its thumb on the outside
  for (const k of [-1, 1]) {
    const M = R.chain(R.tr(cx, cy), R.rot(k * -4));
    const items = [{ d: R.xf(R.rrect(k > 0 ? 3 : -167, -122, 164, 200, 44), M) }];
    const fx = [139, 103, 67, 32], fl = [112, 122, 116, 102];          // short, curled-up fingertips toward the reader
    fx.forEach((x, i) => items.push({ d: R.xf(`M${k * x} 40L${k * x} ${fl[i]}`, M), w: 30 }));
    items.push({ d: R.xf(`M${k * 140} 0L${k * 186} -40L${k * 204} -92`, M), w: 38 });   // thumb
    s += R.union(items);
    s += R.ink(R.xf(`M${k * 150} 34Q${k * 132} 22 ${k * 128} -6`, M), { w: R.LW.in });   // thumb-root crease
    for (const x of [121, 85, 49.5]) s += R.ink(R.xf(`M${k * x} 62L${k * x} 78`, M), { w: R.LW.in });
  }
  // "draw here" dashed outline: 268 x 152 of clear white
  s += R.ink(T(R.rrect(-136, -98, 272, 154, 30)), { w: F, dash: '11 10' });

  // ---------- the three possible clues, in little frames along the top ----------
  const frame = (x, y, rotDeg, inner) => {
    const m = R.chain(R.tr(x, y), R.rot(rotDeg));
    return R.shape(R.xf(R.rrect(-56, -56, 112, 112, 20), m)) + R.ink(R.xf(R.rrect(-47, -47, 94, 94, 14), m), { w: F }) + inner;
  };
  s += frame(84, 78, -5, P.thread(84, 80, 78));
  s += frame(360, 72, 3, P.paperCrane(360, 74, 78));
  s += frame(636, 78, 5, P.bell(636, 78, 74));
  return s;
};
