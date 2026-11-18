#!/usr/bin/env node
// Builds out/proof.html — a front-to-back proof page (published as an Artifact with the preview PNGs alongside).
'use strict';
const fs = require('fs'), path = require('path');
const { execFileSync } = require('child_process');
const story = require('./story');
const OUT = path.join(__dirname, 'out'), PRE = path.join(OUT, 'preview');
const pad = n => String(n).padStart(2, '0');

// split the cover wrap preview into back and front panels
execFileSync('python3', ['-c', `
from PIL import Image
im=Image.open(r'${path.join(PRE, 'cover.png')}'); w,h=im.size
k=w/17.399; b=0.125*k
im.crop((int(b),int(b),int(b+8.5*k),int(h-b))).save(r'${path.join(PRE, 'cover-back.png')}')
im.crop((int(w-b-8.5*k),int(b),int(w-b),int(h-b))).save(r'${path.join(PRE, 'cover-front.png')}')
`]);

const groups = [
  ['Front matter', 'Everyone reads these', [1, 2, 3, 4, 5, 6]],
  ['Tiger Dojo', 'Guu wins the first throw', [7, 8, 9, 10, 11, 12]],
  ['Crane Dojo', 'Choki wins the first throw', [13, 14, 15, 16, 17, 18]],
  ['Turtle Dojo', 'Paa wins the first throw', [19, 20, 21, 22, 23, 24]],
  ['The paths meet', 'Everyone reads these', [25, 26, 27]],
  ['Roof chase', 'One page, picked by the second throw', [28, 29, 30]],
  ['Ending', 'The third throw picks the picture', [31, 32]],
];
const byN = Object.fromEntries(story.pages.map(p => [p.n, p]));
const card = n => { const p = byN[n]; return `<button class="pg" data-src="p${pad(n)}.png" data-cap="Page ${n} · ${p.name}"><img src="p${pad(n)}.png" alt="Page ${n}: ${p.name}" loading="lazy" width="816" height="1056"><span class="cap"><b>${n}</b> ${p.name.replace(/^(Tiger|Crane|Turtle): /, '')}<i>${p.density.toLowerCase()}</i></span></button>`; };

const html = `<title>Ninja on the Roof Proof</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Andika:wght@400;700&family=Baloo+2:wght@600;800&display=swap">
<style>
/* Layout: a printer's proof — cover pair on top, then every sheet in reading order grouped by story branch, then the upload sheet. */
:root{--bg:#F3EEE2;--panel:#FFFDF7;--ink:#161B33;--muted:#5C6078;--line:#D9D1BD;--night:#1B2748;--gold:#B67A00;--roof:#A94430;--sheet:#fff;
  --display:'Baloo 2','Trebuchet MS',sans-serif;--body:'Andika','Verdana',sans-serif}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--bg:#121933;--panel:#1B2548;--ink:#F4EEDC;--muted:#A9B0CC;--line:#33406E;--night:#0C1226;--gold:#FFC93C;--roof:#E0735C;--sheet:#fff;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#121933;--panel:#1B2548;--ink:#F4EEDC;--muted:#A9B0CC;--line:#33406E;--night:#0C1226;--gold:#FFC93C;--roof:#E0735C;--sheet:#fff;color-scheme:dark}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font-family:var(--body);font-size:16px;line-height:1.55;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:28px 64px}
main{max-width:1120px;margin:0 auto;display:flex;flex-direction:column;gap:44px}
h1,h2,h3{font-family:var(--display);font-weight:800;line-height:1.1;margin:0;text-wrap:balance}
h1{font-size:clamp(30px,5vw,46px)}
h2{font-size:26px}
h3{font-size:19px}
p{margin:0;max-width:68ch}
.eyebrow{font-family:var(--display);font-weight:600;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--roof)}
.lede{color:var(--muted);font-size:17px;margin-top:10px}
.spec{display:flex;flex-wrap:wrap;gap:8px 22px;margin-top:16px;font-size:14px;color:var(--muted)}
.spec b{color:var(--ink);font-weight:700}
.covers{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;max-width:760px}
.covers figure{margin:0}
.covers figcaption{font-size:14px;color:var(--muted);margin-top:8px}
.pg{all:unset;cursor:zoom-in;display:block;min-width:0}
.pg:focus-visible{outline:3px solid var(--gold);outline-offset:3px;border-radius:4px}
.pg img,.covers img{display:block;width:100%;height:auto;background:var(--sheet);border:1px solid var(--line);border-radius:3px;box-shadow:0 1px 0 var(--line),0 8px 18px -12px rgba(0,0,0,.45)}
.cap{display:flex;gap:6px;align-items:baseline;font-size:13.5px;margin-top:7px;color:var(--ink)}
.cap b{font-family:var(--display);font-weight:800;font-size:16px;min-width:1.5em}
.cap i{margin-left:auto;font-style:normal;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.group{display:flex;flex-direction:column;gap:14px}
.ghead{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 14px;border-bottom:2px solid var(--ink);padding-bottom:6px}
.ghead span{color:var(--muted);font-size:14px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:22px 16px}
.note{background:var(--panel);border:1px solid var(--line);border-radius:6px;padding:16px 18px}
.note p+p{margin-top:8px}
.path{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-family:var(--display);font-weight:600;font-size:15px;margin-top:12px}
.path span{border:2px solid var(--ink);border-radius:999px;padding:1px 12px;background:var(--panel)}
.path em{font-style:normal;color:var(--muted)}
.tw{overflow-x:auto}
table{border-collapse:collapse;width:100%;font-size:14.5px;min-width:520px}
th,td{text-align:left;padding:8px 12px 8px 0;border-bottom:1px solid var(--line);vertical-align:top}
th{font-family:var(--display);font-weight:600;font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
td:first-child{font-weight:700;white-space:nowrap}
ul{margin:8px 0 0;padding-left:20px;max-width:70ch}
li{margin-bottom:6px}
dialog{border:0;padding:0;background:transparent;max-width:min(94vw,820px);width:100%}
dialog::backdrop{background:rgba(8,11,26,.82)}
dialog img{display:block;width:100%;height:auto;max-height:86vh;object-fit:contain;background:#fff;border-radius:4px}
dialog .bar{display:flex;justify-content:space-between;align-items:center;gap:12px;color:#F4EEDC;font-family:var(--display);font-weight:600;padding:8px 2px}
dialog button{font:inherit;color:#161B33;background:#FFC93C;border:0;border-radius:999px;padding:4px 16px;cursor:pointer}
dialog button:focus-visible{outline:3px solid #fff;outline-offset:2px}
</style>
<main>
<header>
  <div class="eyebrow">Printer's proof · ${story.imprint}</div>
  <h1>${story.title}</h1>
  <p class="lede">The whole book in the order it will be bound, from front cover to back cover. Tap any page to enlarge it.</p>
  <div class="spec"><span><b>8.5 × 11 in</b> paperback</span><span><b>32</b> pictures to color</span><span><b>66</b> interior pages</span><span>Black line art, <b>one side only</b></span><span>Color wrap cover</span></div>
</header>

<section class="group">
  <div class="ghead"><h2>Covers</h2><span>Full-color wrap, 17.399 × 11.25 in with bleed</span></div>
  <div class="covers">
    <figure><button class="pg" data-src="cover-front.png" data-cap="Front cover"><img src="cover-front.png" alt="Front cover" width="816" height="1056"></button><figcaption>Front cover</figcaption></figure>
    <figure><button class="pg" data-src="cover-back.png" data-cap="Back cover"><img src="cover-back.png" alt="Back cover" width="816" height="1056"></button><figcaption>Back cover. Amazon prints its barcode bottom right.</figcaption></figure>
  </div>
</section>

<section class="note">
  <h3>How a reader moves through it</h3>
  <p>Every picture sits on a right-hand page with a blank back, so markers cannot spoil the next picture. A book opens with a name page and the copyright page, then the 32 pictures below.</p>
  <div class="path"><span>1–6</span><em>throw</em><span>7–12 or 13–18 or 19–24</span><em>then</em><span>25–27</span><em>throw</em><span>28 or 29 or 30</span><em>then</em><span>31</span><em>throw</em><span>32, picture 1, 2 or 3</span></div>
</section>

${groups.map(([t, sub, ns]) => `<section class="group"><div class="ghead"><h2>${t}</h2><span>${sub}</span></div><div class="grid">${ns.map(card).join('')}</div></section>`).join('\n')}

<section class="group">
  <div class="ghead"><h2>Upload sheet for Amazon KDP</h2><span>What the two print files are, and what is left for you</span></div>
  <div class="tw"><table>
    <tr><th>Item</th><th>This book</th><th>Status</th></tr>
    <tr><td>Interior file</td><td>interior.pdf · 66 pages · 8.5 × 11 in · no bleed · vector line art · fonts embedded</td><td>Built and checked</td></tr>
    <tr><td>Cover file</td><td>cover.pdf · 17.399 × 11.25 in · spine 0.1486 in · no spine text</td><td>Built. Confirm the size in KDP's cover calculator</td></tr>
    <tr><td>Paper and ink</td><td>Black and white interior, white paper</td><td>Choose at upload</td></tr>
    <tr><td>AI disclosure</td><td>Text and pictures were made with AI tools</td><td>Answer yes at upload</td></tr>
    <tr><td>Low-content box</td><td>A story coloring book is not low-content</td><td>Leave unticked</td></tr>
    <tr><td>ISBN and imprint</td><td>Free KDP ISBN shows "Independently published"</td><td>Buy your own ISBN to show ${story.imprint}</td></tr>
    <tr><td>Printed proof</td><td>Check the gutter, line weight and barcode area on paper</td><td>Order one before going live</td></tr>
  </table></div>
</section>

<section class="note">
  <h3>Open points</h3>
  <ul>
    <li>ChatGPT's 24 pictures were not seen. They live only on the Mac, so they were judged from their captions: they illustrate a different, straight-line story and fit none of these 32 pages.</li>
    <li>The brothers follow the written notes about your reference art, not the art itself. Send the reference picture and they can be matched.</li>
    <li>Page numbers 1–32 are story numbers on right-hand pages. KDP prefers sequential numbering, so a reviewer may ask about it.</li>
    <li>KDP's own help pages could not be opened from this session. Margins, spine width and prices come from search excerpts and memory.</li>
  </ul>
</section>
</main>
<dialog id="zoom"><div class="bar"><span id="zcap"></span><button id="zclose" type="button">Close</button></div><img id="zimg" alt=""></dialog>
<script>
const dlg=document.getElementById('zoom'),zi=document.getElementById('zimg'),zc=document.getElementById('zcap');
document.querySelectorAll('.pg').forEach(b=>b.addEventListener('click',()=>{zi.src=b.dataset.src;zi.alt=b.dataset.cap;zc.textContent=b.dataset.cap;dlg.showModal();}));
document.getElementById('zclose').addEventListener('click',()=>dlg.close());
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();});
</script>
`;
fs.writeFileSync(path.join(OUT, 'proof.html'), html);
console.log('wrote out/proof.html');
