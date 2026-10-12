import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../art/galaxies/index.html',import.meta.url),'utf8');
const code=html.split('// <galaxy-engine>')[1]?.split('// </galaxy-engine>')[0];
const engine=()=>{assert(code,'galaxy engine block exists');return new Function(`${code};return {W,H,LOOP,PALETTE,GALAXIES,piece};`)();};

test('the collection holds the four galaxies, in order',()=>{
 assert.deepEqual(engine().GALAXIES.map(g=>g.id),['triangulum','sculptor','andromeda','pinwheel']);
});
test('each galaxy draws valid frames that move and close their loop',()=>{
 const {W,H,LOOP,PALETTE,GALAXIES,piece}=engine();
 assert(PALETTE.length<=64,'palette fits the atlas index');
 for(const g of GALAXIES){
  const frame=piece(g.id),ca=new Uint8Array(W*H),cb=new Uint8Array(W*H),cm=new Uint8Array(W*H);
  const a=frame(0,ca).slice(),b=frame(LOOP,cb).slice(),m=frame(LOOP/3,cm).slice();
  assert.equal(a.length,W*H,g.id);assert(a.every(v=>v>=0&&v<=3),g.id);assert(ca.every(v=>v<PALETTE.length),g.id);
  assert.deepEqual(b,a,`${g.id} loop seam`);assert.deepEqual(cb,ca,`${g.id} loop seam colour`);
  const moved=m.reduce((n,v,k)=>n+(v!==a[k]||cm[k]!==ca[k]),0);assert(moved>W*H*0.01,`${g.id} animates`);
  assert(a.filter(v=>v===3).length>W*H*0.005,`${g.id} has bright light`);
 }
});
test('frames are deterministic and the galaxies are distinct',()=>{
 const {W,H,GALAXIES,piece}=engine(),seen=new Set();
 for(const g of GALAXIES){const c=new Uint8Array(W*H),a=piece(g.id)(7,c).join(''),b=piece(g.id)(7,new Uint8Array(W*H)).join('');assert.equal(a,b,g.id);seen.add(a);}
 assert.equal(seen.size,GALAXIES.length);
});
test('the page credits its reference photographers and ships no photograph',()=>{
 for(const name of ['Chuhong Yu','Mark McComiskey'])assert(html.includes(name));
 assert(!/\.(jpe?g|png|webp)["')]/i.test(html));assert(html.includes('prefers-reduced-motion'));
});
