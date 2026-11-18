// PAGE 11 — TIGER: THE SOLVE. BUSY. Choki's rope round the barrel, Paa's staff rollers, Guu's pulling FIST.
const T = require('./_tiger');
module.exports.art = (R, P, { W, H }) => {
  let s = '';
  const FL = 400, GY = 600;
  // ---- wall ----
  s += R.shape(R.rrect(-20, -10, 760, 40, 0));
  s += R.shape(R.rrect(-20, FL - 30, 760, 30, 0));
  s += T.rack(40, 70, 230, 270, 5);
  s += T.banner(385, 78, 110, 220, { emblemSize: 74 });
  // ---- floor ----
  s += R.shape(R.rrect(-20, FL, 760, 320, 0));
  s += T.boards(FL, 700, { n: 13, cross: false });
  s += T.mat(150, 470, 520, 190, 110, { weave: 16 });

  // rollers (staffs) under and ahead of the barrel
  const BX = 500, BY = GY - 14;
  for (const rx of [262, 336, 410, 484, 558]) s += T.roller(rx, GY + 4 + (rx % 3), 0, 0) || '';
  return s;
};
