import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const path=new URL('../art/solar-system/index.html',import.meta.url);
function engine(){assert(existsSync(path),'solar-system artwork exists');const code=readFileSync(path,'utf8').split('// <solar-engine>')[1]?.split('// </solar-engine>')[0];assert(code,'testable rendering engine exists');return new Function(`${code};return {BODIES,renderBody,LOOP,shadeColor,setTextures};`)();}
function fixtures(e){const maps={};for(const id of [...e.BODIES.map(b=>b.id),'earth_clouds','saturn_ring']){const width=64,height=32,data=new Uint8ClampedArray(width*height*4);for(let y=0;y<height;y++)for(let x=0;x<width;x++){const k=(y*width+x)*4;data[k]=80+x*2;data[k+1]=70+y*3;data[k+2]=60+x;data[k+3]=255;}maps[id]={width,height,data};}e.setTextures(maps);return e;}
test('collection contains the Sun and exactly eight planets in order',()=>{
 const {BODIES}=engine();assert.deepEqual(BODIES.map(b=>b.id),['sun','mercury','venus','earth','mars','jupiter','saturn','uranus','neptune']);
 assert.equal(BODIES.filter(b=>b.kind==='planet').length,8);
});
test('all nine bodies produce bounded, nonempty, moving and exactly looping frames',()=>{
 const {BODIES,renderBody,LOOP}=fixtures(engine());
 for(const b of BODIES){const a=renderBody(b.id,0,80,64),end=renderBody(b.id,LOOP,80,64),mid=renderBody(b.id,5,80,64);
 assert.equal(a.length,80*64*3,b.id);assert(a.some(v=>v>80),b.id);assert.deepEqual(a,end,`${b.id} seam`);assert(a.some((v,i)=>v!==mid[i]),`${b.id} motion`);assert(a.every(Number.isFinite),b.id);
 }
});
test('Saturn rings occupy space beyond the planetary sphere',()=>{
 const {renderBody}=fixtures(engine());const p=renderBody('saturn',0,160,128);let outer=0;for(let y=0;y<128;y++)for(let x=0;x<160;x++)if(Math.hypot(x-80,y-64)>40&&Math.max(...p.slice((y*160+x)*3,(y*160+x)*3+3))>45)outer++;
 assert(outer>100,'rings remain visible beyond globe');
});
test('lighting never clips pale material into white or increases source channels',()=>{
 const {shadeColor}=engine();for(const light of [0,.4,.8,1]){const c=shadeColor([235,211,169],light);assert(c.every((v,i)=>v<=[235,211,169][i]));if(light>0)assert(c[0]>c[1]&&c[1]>c[2]);else assert.deepEqual(c,[0,0,0]);}
});
test('solar-system page offers only the dot rendering and local credited textures',()=>{
 const html=readFileSync(path,'utf8');assert(!html.includes('id="style"'));assert(!html.includes('Strict ASCII'));assert(html.includes('textures.js'));assert(existsSync(new URL('../art/solar-system/TEXTURES.md',import.meta.url)));
});
test('offline texture pack contains valid image bytes for all bodies and overlays',()=>{
 const pack=new Function(readFileSync(new URL('../art/solar-system/textures.js',import.meta.url),'utf8')+';return SOLAR_TEXTURES;')();
 for(const id of [...engine().BODIES.map(b=>b.id),'earth_clouds','saturn_ring']){
  assert(pack[id],id);const bytes=Buffer.from(pack[id].split(',')[1],'base64');assert(bytes.length>1000,id);
  assert.equal(bytes.subarray(0,2).toString('hex'),id==='saturn_ring'?'8950':'ffd8',id);
 }
});
