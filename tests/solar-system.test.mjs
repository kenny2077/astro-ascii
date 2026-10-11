import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const path=new URL('../art/solar-system/index.html',import.meta.url);
function engine(){assert(existsSync(path),'solar-system artwork exists');const code=readFileSync(path,'utf8').split('// <solar-engine>')[1]?.split('// </solar-engine>')[0];assert(code,'testable rendering engine exists');return new Function(`${code};return {BODIES,renderBody,LOOP};`)();}
test('collection contains the Sun and exactly eight planets in order',()=>{
 const {BODIES}=engine();assert.deepEqual(BODIES.map(b=>b.id),['sun','mercury','venus','earth','mars','jupiter','saturn','uranus','neptune']);
 assert.equal(BODIES.filter(b=>b.kind==='planet').length,8);
});
test('all nine bodies produce bounded, nonempty, moving and exactly looping frames',()=>{
 const {BODIES,renderBody,LOOP}=engine();
 for(const b of BODIES){const a=renderBody(b.id,0,80,64),end=renderBody(b.id,LOOP,80,64),mid=renderBody(b.id,5,80,64);
 assert.equal(a.length,80*64*3,b.id);assert(a.some(v=>v>80),b.id);assert.deepEqual(a,end,`${b.id} seam`);assert(a.some((v,i)=>v!==mid[i]),`${b.id} motion`);assert(a.every(Number.isFinite),b.id);
 }
});
test('Saturn rings occupy space beyond the planetary sphere',()=>{
 const {renderBody}=engine();const p=renderBody('saturn',0,160,128);let outer=0;for(let y=0;y<128;y++)for(let x=0;x<160;x++)if(Math.hypot(x-80,y-64)>40&&Math.max(...p.slice((y*160+x)*3,(y*160+x)*3+3))>45)outer++;
 assert(outer>100,'rings remain visible beyond globe');
});
