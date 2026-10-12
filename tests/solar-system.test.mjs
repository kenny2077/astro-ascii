import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const path=new URL('../art/solar-system/index.html',import.meta.url);
function engine(){assert(existsSync(path),'solar-system artwork exists');const code=readFileSync(path,'utf8').split('// <solar-engine>')[1]?.split('// </solar-engine>')[0];assert(code,'testable rendering engine exists');return new Function(`${code};return {BODIES,renderBody,LOOP,shadeColor,setTextures,materialUV};`)();}
function fixtures(e){const maps={};for(const id of [...e.BODIES.map(b=>b.id),'earth_clouds','saturn_ring']){const width=64,height=32,data=new Uint8ClampedArray(width*height*4);for(let y=0;y<height;y++)for(let x=0;x<width;x++){const k=(y*width+x)*4;data[k]=80+x*2;data[k+1]=70+y*3;data[k+2]=60+x;data[k+3]=255;}maps[id]={width,height,data};}e.setTextures(maps);return e;}
test('collection contains the Sun and exactly eight planets in order',()=>{
 const {BODIES}=engine();assert.deepEqual(BODIES.map(b=>b.id),['sun','mercury','venus','earth','mars','jupiter','saturn','uranus','neptune']);
 assert.equal(BODIES.filter(b=>b.kind==='planet').length,8);
});
test('fixed-view material frames loop without adding objects outside the source silhouette',()=>{
 const {BODIES,renderBody,LOOP}=fixtures(engine());
 for(const body of BODIES){const a=renderBody(body.id,0,80,64),b=renderBody(body.id,LOOP,80,64),mid=renderBody(body.id,6,80,64);assert.deepEqual(a,b);assert.equal(a.length,80*64*3);for(let k=0;k<a.length;k+=3)if(a[k]===8&&a[k+1]===11&&a[k+2]===17)assert.deepEqual(mid.slice(k,k+3),a.slice(k,k+3),body.id);}
});
test('rocky terrain, Uranus and Saturn rings are stable; clouds deform locally',()=>{
 const {materialUV,BODIES}=engine();
 for(const id of ['mercury','mars','uranus'])for(const t of [0,6,12])assert.deepEqual(materialUV(id,.4,.6,t),[.4,.6]);
 for(const id of ['earth','jupiter','saturn','venus','neptune','sun']){const p=materialUV(id,.37,.61,6);assert(Math.abs(p[0]-.37)<=.009);assert(Math.abs(p[1]-.61)<=.004);assert.notDeepEqual(p,[.37,.61],id);}
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

test('no emissive particle renderer remains',()=>{const html=readFileSync(path,'utf8');assert(!html.includes('effectParticles'));assert(!html.includes('q.alpha'));});
