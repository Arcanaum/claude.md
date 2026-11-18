#!/usr/bin/env node
// Full-wrap KDP cover: back + spine + front, 0.125in bleed. node cover.js -> out/cover.pdf, out/preview/cover.png
'use strict';
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const R = require('./lib/rig'), P = require('./lib/props'), story = require('./story');

const PAGES = 66;                         // interior page count
const SPINE = PAGES * 0.002252;           // in, white paper B&W
const BLEED = 0.125, TW = 8.5, TH = 11;
const W = (BLEED * 2 + TW * 2 + SPINE) * 100, H = (TH + BLEED * 2) * 100; // units (100/in)
const bx = BLEED * 100, fx = bx + TW * 100 + SPINE * 100;                 // back trim-left, front trim-left
const C = { night: '#1B2748', night2: '#27386B', cream: '#FFF4D6', gold: '#FFC93C', roof: '#B5503A', roofD: '#8E3B2A', wall: '#F1E3C2', ink: '#14182B' };
const recolor = (svg, fill) => String(svg).replace(/fill="#fff"/g, `fill="${fill}"`);
const font = (file, fam, w) => `@font-face{font-family:'${fam}';font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(path.join(__dirname, 'fonts', file)).toString('base64')}) format('woff2');}`;

function stars(x0, x1, y0, y1, n, seed) {
  let s = '', r = seed;
  const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < n; i++) s += recolor(P.star(x0 + rnd() * (x1 - x0), y0 + rnd() * (y1 - y0), 7 + rnd() * 9), C.cream);
  return s;
}
function roofBand(x, w, yTop) { // tiled roof filling from yTop to the bottom edge, with a ridge beam
  const id = 'c' + Math.round(x);
  return `<clipPath id="${id}"><rect x="${x}" y="${yTop}" width="${w}" height="${H - yTop}"/></clipPath>` +
    `<rect x="${x}" y="${yTop}" width="${w}" height="${H - yTop}" fill="${C.roof}"/>` +
    `<g clip-path="url(#${id})">${P.tiles(x - 30, yTop + 26, w + 60, H - yTop, { tw: 74, th: 54 })}</g>` +
    R.shape(R.rrect(x - 20, yTop - 14, w + 40, 44, 12), { fill: C.roofD });
}

function art() {
  let s = `<rect width="${W}" height="${H}" fill="${C.night}"/>`;
  // ---------- FRONT ----------
  const cx = fx + 425;
  s += stars(fx + 240, fx + 400, 340, 440, 4, 7);
  s += `<circle cx="${fx + 585}" cy="${485}" r="165" fill="${C.cream}" stroke="${C.ink}" stroke-width="5"/>`;
  s += `<circle cx="${fx + 500}" cy="${440}" r="24" fill="none" stroke="#E8D9A8" stroke-width="5"/><circle cx="${fx + 660}" cy="${395}" r="16" fill="none" stroke="#E8D9A8" stroke-width="5"/>`;
  // the masked girl, small, wobbling in front of the moon
  s += R.girl({ x: fx + 572, y: 548, s: 0.62, mask: true, lean: 8, expr: 'surprised', legR: { a: [75, -115] }, armL: { a: [100, 10] }, armR: { a: [92, -14] }, colors: R.PALETTE.girl });
  s += R.shape(R.rrect(fx + 500, 546, 150, 20, 8), { fill: C.roofD });
  // title
  s += P.hollow('GUU, CHOKI, PAA', cx, 170, 104, { fill: C.gold, w: 14 }).replace('stroke="#000"', `stroke="${C.ink}"`);
  s += P.hollow('AND THE NINJA ON THE ROOF', cx, 250, 52, { fill: C.cream, w: 10 }).replace('stroke="#000"', `stroke="${C.ink}"`);
  // roof + brothers
  s += roofBand(-20, W + 40, 930);
  const y = 928, k = 1.95;
  s += R.guu({ x: fx + 170, y, s: k, expr: 'determined', armR: { a: [150, 20], hs: 1.3, over: true }, armL: { a: [40, -80], hand: 'fist' }, colors: { ...R.PALETTE.guu, lost: '#2A2A33' } });
  s += R.choki({ x: fx + 425, y, s: k, expr: 'smirk', lean: -3, armL: { a: [152, 14], hs: 1.3, over: true }, armR: { a: [40, -80], hand: 'fist' }, colors: R.PALETTE.choki });
  s += R.paa({ x: fx + 672, y, s: k, expr: 'happy', armR: { a: [150, 16], hs: 1.3, over: true }, armL: { a: [34, 10] }, colors: R.PALETTE.paa });
  // ---------- BACK ----------
  s += stars(bx + 40, bx + 810, 560, 640, 9, 3);
  for (const [t, i] of [['fist', 0], ['v', 1], ['palm', 2]]) s += R.hand(t, bx + 205 + i * 220, 760, 150, { fill: '#F6C9A0', cuff: false, o: 5 });
  return s;
}

const CSS = `${font('andika-latin-400-normal.woff2', 'Andika', 400)}${font('andika-latin-700-normal.woff2', 'Andika', 700)}${font('baloo-2-latin-700-normal.woff2', 'Baloo 2', 700)}${font('baloo-2-latin-800-normal.woff2', 'Baloo 2', 800)}
@page{size:${W / 100}in ${H / 100}in;margin:0}
html,body{margin:0;padding:0}
.cover{position:relative;width:${W / 100}in;height:${H / 100}in;overflow:hidden;font-family:'Andika',sans-serif;color:${C.cream}}
.cover>svg{position:absolute;inset:0;width:100%;height:100%}
.t{position:absolute}
.tag{left:${(fx + 60) / 100}in;width:7.3in;top:2.72in;text-align:center;font-family:'Baloo 2';font-weight:700;font-size:0.36in}
.badge{left:${(fx + 45) / 100}in;top:3.1in;width:1.75in;height:1.75in;border-radius:50%;background:${C.gold};color:${C.ink};border:0.05in solid ${C.ink};display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Baloo 2';font-weight:800;line-height:1.02;text-align:center;transform:rotate(-9deg)}
.badge b{font-size:0.33in}.badge span{font-size:0.2in;font-weight:700}
.imp{left:${(fx + 60) / 100}in;width:7.3in;bottom:0.42in;text-align:center;font-family:'Baloo 2';font-weight:700;font-size:0.2in;color:${C.cream};letter-spacing:0.03in}
.back{left:${(bx + 70) / 100}in;top:0.95in;width:7.1in}
.back h2{font-family:'Baloo 2';font-weight:800;font-size:0.54in;line-height:1.08;margin:0 0 0.22in;color:${C.gold}}
.back p{font-size:0.235in;line-height:1.45;margin:0 0 0.16in}
.back ul{font-size:0.225in;line-height:1.5;margin:0.1in 0 0;padding-left:0.3in}
.back b{color:#fff}
.names{left:${(bx + 95) / 100}in;top:8.32in;width:6.6in;display:flex;font-family:'Baloo 2';font-weight:800;font-size:0.3in;color:${C.gold}}
.names div{width:2.2in;text-align:center}
.imp2{left:${(bx + 70) / 100}in;bottom:0.5in;font-family:'Baloo 2';font-weight:700;font-size:0.2in;color:${C.cream};line-height:1.3}
.guides div{position:absolute;border:1px dashed #0ff;pointer-events:none}`;

const html = guides => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="cover">
<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${art()}</svg>
<div class="t tag">A janken adventure — you choose the way</div>
<div class="t badge"><b>COLORING<br>BOOK</b><span>Ages 6–8</span></div>
<div class="t imp">${story.imprint.toUpperCase()}</div>
<div class="t back"><h2>Rock, paper, scissors —<br>YOU choose the way!</h2>
<p>Three small brothers. One lost ninja hood. Three dojos to search.</p>
<p><b>Guu</b> is a rock. <b>Choki</b> is scissors. <b>Paa</b> is paper. Every time the brothers must choose, they throw <b>janken</b> — and you throw too. The winning hand picks the page!</p>
<ul><li><b>32 pages</b> to color, with bold, easy lines</li><li><b>27 ways</b> through one story — play it again and again</li><li>Three dojos, three tests, and a surprise on the roof</li><li>Pictures printed on <b>one side only</b></li></ul></div>
<div class="t names"><div>GUU</div><div>CHOKI</div><div>PAA</div></div>
<div class="t imp2">${story.imprint}<br>A choose-your-way coloring adventure · Ages 6–8</div>
${guides ? `<div class="guides"><div style="left:${bx / 100}in;top:${BLEED}in;width:${TW}in;height:${TH}in"></div><div style="left:${fx / 100}in;top:${BLEED}in;width:${TW}in;height:${TH}in"></div><div style="left:${(bx + TW * 100 - 225) / 100}in;top:${BLEED + TH - 1.45}in;width:2in;height:1.2in;border-color:#f0f"></div></div>` : ''}
</div></body></html>`;

(async () => {
  const out = path.join(__dirname, 'out'); fs.mkdirSync(path.join(out, 'preview'), { recursive: true });
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: Math.round(W * 0.96), height: Math.round(H * 0.96) } });
  await pg.setContent(html(false), { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready);
  await pg.pdf({ path: path.join(out, 'cover.pdf'), width: `${W / 100}in`, height: `${H / 100}in`, printBackground: true, preferCSSPageSize: true });
  await pg.screenshot({ path: path.join(out, 'preview', 'cover.png') });
  await pg.setContent(html(true), { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready);
  await pg.screenshot({ path: path.join(out, 'preview', 'cover-guides.png') });
  await b.close();
  console.log(`cover ${(W / 100).toFixed(3)} x ${(H / 100).toFixed(3)} in, spine ${SPINE.toFixed(4)} in`);
})();
