// Quick visual test of the rig: node lib/test-sheet.js <out.png>
const R = require('./rig');
const { chromium } = require('playwright');
(async () => {
  let s = '';
  const names = ['guu', 'choki', 'paa'];
  names.forEach((n, i) => {
    s += R.bro(n, { x: 150 + i * 230, y: 420, s: 1.9, armR: { a: [150, 20] }, armL: { a: [20, 10], hand: 'mitt' } });
    s += R.bro(n, { x: 150 + i * 230, y: 780, s: 1.5, dir: 'back', armL: { a: [30, 0] }, armR: { a: [30, 0] } });
  });
  s += R.girl({ x: 800, y: 420, s: 1.9, expr: 'worried', legR: { a: [70, -120] }, armL: { a: [95, 0] }, armR: { a: [100, -10] }, lean: 6 });
  s += R.girl({ x: 800, y: 780, s: 1.5, hood: 'up', armL: { a: [95, 0] }, armR: { a: [100, -10] } });
  ['fist', 'v', 'palm', 'point', 'mitt'].forEach((t, i) => { s += R.hand(t, 100 + i * 170, 960, 130, { cuff: true }); });
  const exprs = Object.keys(R.EXPR);
  exprs.forEach((e, i) => { s += R.guu({ x: 60 + i * 62, y: 1180, s: 0.6, expr: e }); });
  s += R.paa({ x: 950, y: 1000, s: 1.2, crouch: 22, lean: 10, armL: { to: [30, -30] }, armR: { to: [35, 10] }, expr: 'surprised', dir: 'left' });
  s += R.choki({ x: 950, y: 1180, s: 1, legL: { a: [40, -60] }, legR: { a: [30, 40] }, lean: 15, armL: { a: [110, 30] }, armR: { a: [70, -40] }, expr: 'laugh' });
  const html = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1050 1220" width="1050" height="1220" style="background:#fff">${s}</svg>`;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1050, height: 1220 } });
  await p.setContent(`<body style="margin:0">${html}</body>`);
  await p.screenshot({ path: process.argv[2] || 'sheet.png' }); await b.close();
})();
