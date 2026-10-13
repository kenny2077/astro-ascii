import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const path=new URL('../art/solar-system/index.html',import.meta.url);
function engine(){assert(existsSync(path),'solar-system artwork exists');const code=readFileSync(path,'utf8').split('// <solar-engine>')[1]?.split('// </solar-engine>')[0];assert(code,'testable rendering engine exists');return new Function(`${code};return {BODIES,renderBody,LOOP,shadeColor,setTextures,materialUV,satellites,spinLongitude};`)();}
function fixtures(e){const maps={};for(const id of [...e.BODIES.map(b=>b.id),'earth_clouds','saturn_ring']){const width=64,height=32,data=new Uint8ClampedArray(width*height*4);for(let y=0;y<height;y++)for(let x=0;x<width;x++){const k=(y*width+x)*4;data[k]=80+x*2;data[k+1]=70+y*3;data[k+2]=60+x;data[k+3]=255;}maps[id]={width,height,data};}e.setTextures(maps);return e;}
test('collection contains the Sun and exactly eight planets in order',()=>{
 const {BODIES}=engine();assert.deepEqual(BODIES.map(b=>b.id),['sun','mercury','venus','earth','mars','jupiter','saturn','uranus','neptune']);
 assert.equal(BODIES.filter(b=>b.kind==='planet').length,8);
});
test('all scenes are deterministic and close the complete orbit loop',()=>{const {BODIES,renderBody,LOOP}=fixtures(engine());for(const b of BODIES){assert.deepEqual(renderBody(b.id,0,100,80),renderBody(b.id,LOOP,100,80));assert.notDeepEqual(renderBody(b.id,0,100,80),renderBody(b.id,3,100,80));}});
test('natural rotation and satellite directions are correct',()=>{const {spinLongitude,satellites}=engine();assert(spinLongitude('earth',3)>0);assert(spinLongitude('venus',3)<0);assert(spinLongitude('uranus',3)<0);assert.deepEqual(satellites('mercury',0),[]);assert.deepEqual(satellites('venus',0),[]);assert.equal(satellites('earth',0).length,1);assert.equal(satellites('mars',0).length,2);assert.equal(satellites('jupiter',0).length,4);assert.equal(satellites('neptune',0)[0].name,'Triton');assert(satellites('neptune',0)[0].direction<0);});
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

test('no emissive particle renderer remains',()=>{const html=readFileSync(path,'utf8');assert(!html.includes('effectParticles'));assert(!html.includes('q.alpha'));});

test('lighting is stable over time and never hides the reference features',()=>{
 const {BODIES}=engine();const source=readFileSync(path,'utf8');assert(!source.includes('swing*Math.sin'));assert(!source.includes('.88+.12*Math.cos'));
});
test('a uniformly colored rocky sphere has identical illumination while rotating',()=>{
 const e=engine(),data=new Uint8ClampedArray(16*8*4);for(let k=0;k<data.length;k+=4)data.set([160,140,120,255],k);
 e.setTextures({mercury:{width:16,height:8,data}});
 const a=e.renderBody('mercury',0,100,80),b=e.renderBody('mercury',20,100,80);
 for(let y=25;y<55;y++)for(let x=35;x<65;x++){const k=(y*100+x)*3;assert.deepEqual(a.slice(k,k+3),b.slice(k,k+3));}
});
test('satellite depth matches the ring plane and prograde agrees with surface rotation',()=>{
 const {satellites}=engine();
 for(const [id,tilt,flatten] of [['saturn',-.38,.40],['uranus',1.4,.28]])for(const t of [0,20,60]){const m=satellites(id,t)[0],v=m.x*Math.sin(tilt)+m.y*Math.cos(tilt);assert(Math.abs(m.z+v*Math.sqrt(1-flatten*flatten)/flatten)<1e-10);}
 for(const [id,sign] of [['earth',-1],['neptune',1]]){const a=satellites(id,0)[0],b=satellites(id,.01)[0];const ax=a.x*Math.cos(.13)-a.y*Math.sin(.13),bx=b.x*Math.cos(.13)-b.y*Math.sin(.13);const angular=a.z*(bx-ax)-ax*(b.z-a.z);assert.equal(Math.sign(angular),sign,id);}
});
