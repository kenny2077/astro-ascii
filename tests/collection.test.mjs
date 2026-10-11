import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync, existsSync} from 'node:fs';
import {resolve, dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8');
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name.startsWith('.')?[]:e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]);}

test('all artwork scripts parse and contain no embedded reference photos',()=>{
 for(const path of files(join(root,'art')).filter(p=>p.endsWith('.html'))){
  const html=readFileSync(path,'utf8');
  assert(!/data:image\/(jpeg|png|webp);base64,/.test(html),path);
  assert(!/\/Users\/|__SOURCE__/.test(html),path);
  for(const [,script] of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(script,{filename:path});
 }
});

test('local Markdown links resolve',()=>{
 for(const path of files(root).filter(p=>p.endsWith('.md'))){
  for(const [,target] of readFileSync(path,'utf8').matchAll(/\]\(([^)]+)\)/g)){
   if(/^(https?:|#)/.test(target))continue;
   assert(existsSync(resolve(dirname(path),target.split('#')[0])),`${path}: ${target}`);
  }
 }
});

test('black-hole frames have valid bounds, animate, and close their loop',()=>{
 const code=read('art/black-hole/index.html').split('// <piece>')[1].split('// </piece>')[0];
 const p=new Function(`${code};return {W,H,LOOP,PALETTE,make:gargantua};`)();
 const frame=p.make(),colors=new Uint8Array(p.W*p.H);
 const a=frame(0,colors).slice(),ca=colors.slice();
 assert.equal(a.length,p.W*p.H);
 assert(a.every(v=>v>=0&&v<=3));assert(ca.every(v=>v<p.PALETTE.length));
 const b=frame(p.LOOP,colors).slice();assert.deepEqual(b,a);assert.deepEqual(colors,ca);
 const c=frame(p.LOOP/3,colors).slice();assert(c.some((v,i)=>v!==a[i])||colors.some((v,i)=>v!==ca[i]));
});

test('photo renderer keeps import local and source imagery optional',()=>{
 const html=read('art/photo-study/index.html');
 assert(html.includes('type="file"'));assert(html.includes('URL.createObjectURL(file)'));
 assert(!/\bfetch\(|XMLHttpRequest|sendBeacon/.test(html));
 assert(html.includes('prefers-reduced-motion'));assert(html.includes('animationStarted'));
});
