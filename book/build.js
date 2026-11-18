#!/usr/bin/env node
// Build the interior.  node build.js            -> out/interior.pdf + out/preview/*.png
//                      node build.js --only 7,8 -> out/preview/p07.png p08.png only (fast, for iterating)
'use strict';
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const R = require('./lib/rig'), P = require('./lib/props'), story = require('./story');
const OUT = path.join(__dirname, 'out'), PRE = path.join(OUT, 'preview');
fs.mkdirSync(PRE, { recursive: true });
const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const only = arg('--only') ? arg('--only').split(',').map(Number) : null;
const pad = n => String(n).padStart(2, '0');

const font = (file, fam, w, style = 'normal') => `@font-face{font-family:'${fam}';font-weight:${w};font-style:${style};src:url(data:font/woff2;base64,${fs.readFileSync(path.join(__dirname, 'fonts', file)).toString('base64')}) format('woff2');}`;
const FONTS = font('andika-latin-400-normal.woff2', 'Andika', 400) + font('andika-latin-700-normal.woff2', 'Andika', 700) +
  font('andika-latin-400-italic.woff2', 'Andika', 400, 'italic') + font('baloo-2-latin-700-normal.woff2', 'Baloo 2', 700) + font('baloo-2-latin-800-normal.woff2', 'Baloo 2', 800);

const CSS = `${FONTS}
@page{size:8.5in 11in;margin:0}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff}
.page{position:relative;width:8.5in;height:11in;overflow:hidden;page-break-after:always;break-after:page;background:#fff;color:#000;font-family:'Andika',sans-serif}
.art{position:absolute;left:0.75in;top:0.55in;width:7.2in;display:block}
.art.framed{border:0.045in solid #000;border-radius:0.22in;overflow:hidden}
.icon{position:absolute;right:0.42in;top:0.4in;width:0.95in;height:0.95in;border:0.04in solid #000;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center}
.icon svg{width:0.7in;height:0.7in}
.text{position:absolute;left:0.8in;width:7.1in;font-size:0.265in;line-height:1.4}
.text.compact{font-size:0.23in}
.text p{margin:0 0 0.11in;text-wrap:pretty}
.text b{font-weight:700}
.text .head{font-family:'Baloo 2';font-weight:800;font-size:0.36in;text-align:center;margin-bottom:0.06in}
.text .sub{font-family:'Baloo 2';font-weight:700;font-size:0.34in;text-align:center}
.text .center{text-align:center}
.text .small{font-size:0.2in}
.text .say{font-size:0.18in;font-style:italic;white-space:nowrap}
.text .who{display:flex;align-items:center;gap:0.12in;margin-bottom:0.05in}
.text .who svg,.hi{width:0.42in;height:0.42in;flex:none;vertical-align:middle}
.text .call{font-family:'Baloo 2';font-weight:800;font-size:0.42in;text-align:center;margin:0.02in 0 0.06in;letter-spacing:0.02in}
.text .goto{font-family:'Baloo 2';font-weight:700;font-size:0.225in;border:0.035in solid #000;border-radius:0.16in;padding:0.05in 0.2in;display:table;margin:0.12in auto 0;max-width:5.9in;text-align:center;text-wrap:balance}
.text .goto b{font-weight:800;font-size:0.29in}
.throw{margin-top:0.08in;border:0.045in solid #000;border-radius:0.22in;overflow:hidden}
.throw .row{display:flex;align-items:center;gap:0.16in;padding:0.07in 0.2in;border-top:0.03in solid #000}
.throw .row:first-child{border-top:0}
.throw .row svg{width:0.78in;height:0.78in;flex:none}
.throw .mid{flex:1;line-height:1.25}
.throw .nm{font-family:'Baloo 2';font-weight:800;font-size:0.3in}
.throw .ds{font-size:0.2in}
.throw .pg{font-family:'Baloo 2';font-weight:800;text-align:center;line-height:1;flex:none;border:0.035in solid #000;border-radius:0.14in;padding:0.05in 0.14in 0.02in}
.throw .pg small{display:block;font-size:0.15in;font-weight:700;letter-spacing:0.01in}
.throw .pg span{font-size:0.5in}
.aiko{text-align:center;font-size:0.185in;margin-top:0.07in}
.num{position:absolute;right:0.5in;bottom:0.4in;font-family:'Baloo 2';font-weight:800;font-size:0.36in;min-width:0.62in;height:0.62in;border:0.04in solid #000;border-radius:50%;display:flex;align-items:center;justify-content:center;padding-top:0.03in;background:#fff}
.verso{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:0.15in;font-size:0.17in;text-align:center;color:#000}
.verso svg{width:0.6in;height:0.6in}
.front{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:1in}
.front h1{font-family:'Baloo 2';font-weight:800;font-size:0.6in;margin:0 0 0.3in;line-height:1.05}
.front .line{width:5in;border-bottom:0.04in solid #000;height:0.9in;margin-bottom:0.5in}
.copy{justify-content:flex-end;font-size:0.165in;line-height:1.5;padding-bottom:1.1in}
.copy p{margin:0 0 0.12in;max-width:5.6in}
`;

const iconSvg = t => `<svg viewBox="0 0 100 100">${R.hand(t, 50, 50, 84, { o: 4.5 })}</svg>`;
const inlineIcons = h => h.replace(/\{\{(fist|v|palm)\}\}/g, (_, t) => iconSvg(t));

function throwBlock(rows) {
  return `<div class="throw">` + rows.map(([t, name, pg, desc]) =>
    `<div class="row">${iconSvg(t)}<div class="mid"><div class="nm">${name} wins</div><div class="ds">${desc}</div></div><div class="pg"><small>GO TO PAGE</small><span>${pg}</span></div></div>`).join('') +
    `</div><div class="aiko">${story.AIKO}</div>`;
}

function storyPage(p) {
  const artH = p.artH || 690;
  let art;
  const f = path.join(__dirname, 'pages', `p${pad(p.n)}.js`);
  try {
    delete require.cache[require.resolve(f)];
    const mod = require(f);
    art = String(mod.art(R, P, { W: 720, H: artH, page: p }));
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') { console.error(`p${p.n}: ${e.stack}`); process.exitCode = 1; }
    art = `<rect x="10" y="10" width="700" height="${artH - 20}" fill="none" stroke="#000" stroke-dasharray="12 10" stroke-width="3"/>` + P.label(`ART TO COME — page ${p.n}: ${p.name}`, 360, artH / 2, 26);
  }
  const framed = p.frame !== false;
  const top = 0.55 + artH / 100 + 0.14;
  let h = `<section class="page story" id="p${p.n}" data-n="${p.n}">`;
  h += `<svg class="art${framed ? ' framed' : ''}" style="height:${artH / 100}in" viewBox="0 0 720 ${artH}" xmlns="http://www.w3.org/2000/svg">${art}</svg>`;
  if (p.icon) h += `<div class="icon">${iconSvg(p.icon)}</div>`;
  h += `<div class="text${p.throwBlock ? ' compact' : ''}" style="top:${top}in">${inlineIcons(p.pre || p.text || '')}${p.throwBlock ? throwBlock(p.throwBlock) : ''}</div>`;
  h += `<div class="num">${p.n}</div></section>`;
  return h;
}
const verso = () => `<section class="page verso">${iconSvg('palm')}<div>This side is blank on purpose,<br>so your colors won’t show through.</div></section>`;

function frontMatter() {
  const trio = `<svg viewBox="0 0 600 260" style="width:5.4in">${R.guu({ x: 130, y: 250, s: 1.05 })}${R.choki({ x: 300, y: 250, s: 1.05 })}${R.paa({ x: 470, y: 250, s: 1.05 })}</svg>`;
  return `<section class="page front"><h1>This book belongs to</h1><div class="line"></div>${trio}<p style="font-size:0.22in;margin-top:0.3in">Color the pictures. Throw your hand. Choose the way!</p></section>` +
    `<section class="page front copy"><p><b>${story.title}</b><br>${story.subtitle}</p>
<p>Copyright © 2026 ${story.imprint}. All rights reserved. No part of this book may be reproduced without written permission from the publisher, except for brief quotations in reviews.</p>
<p>Story and illustrations were created by the publisher with the assistance of AI tools.</p>
<p>Pictures are printed on one side of the paper only. For markers, slip a spare sheet behind the page you are coloring.</p>
<p>First edition, 2026.<br>Published by ${story.imprint}.</p></section>`;
}

(async () => {
  const pages = story.pages.filter(p => !only || only.includes(p.n));
  let body = only ? '' : frontMatter();
  for (const p of pages) body += storyPage(p) + (only ? '' : verso());
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${body}</body></html>`;
  fs.writeFileSync(path.join(OUT, only ? 'partial.html' : 'interior.html'), html);
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: Number(arg('--scale') || 1) });
  await pg.setContent(html, { waitUntil: 'load' });
  await pg.evaluate(() => document.fonts.ready);
  // centre each page's art + text block vertically in the space above the page number
  await pg.evaluate(() => { for (const s of document.querySelectorAll('.page.story')) {
    const r = s.getBoundingClientRect(), t = s.querySelector('.text'), a = s.querySelector('.art'), ic = s.querySelector('.icon');
    const free = (r.top + 10.25 * 96) - t.getBoundingClientRect().bottom; if (free < 20) continue;
    const d = Math.min(free / 2, 1.1 * 96);
    for (const e of [t, a, ic]) if (e) e.style.top = (parseFloat(getComputedStyle(e).top) + d) + 'px'; } });
  // overflow check: text must end above the page-number badge / bottom margin
  const over = await pg.evaluate(() => [...document.querySelectorAll('.page.story')].map(s => {
    const t = s.querySelector('.text').getBoundingClientRect(), r = s.getBoundingClientRect();
    return { n: +s.dataset.n, bottomIn: +((t.bottom - r.top) / 96).toFixed(2) };
  }).filter(x => x.bottomIn > 10.5));
  if (over.length) { console.error('TEXT OVERFLOW (bottom > 10.5in):', JSON.stringify(over)); process.exitCode = 1; }
  if (!only) {
    await pg.pdf({ path: path.join(OUT, 'interior.pdf'), width: '8.5in', height: '11in', printBackground: true, preferCSSPageSize: true });
    console.log('wrote out/interior.pdf');
  }
  if (only || process.argv.includes('--png')) {
    for (const p of pages) { await (await pg.$(`#p${p.n}`)).screenshot({ path: path.join(PRE, `p${pad(p.n)}.png`) }); }
    console.log('wrote previews:', pages.map(p => `out/preview/p${pad(p.n)}.png`).join(' '));
  }
  await b.close();
})();
