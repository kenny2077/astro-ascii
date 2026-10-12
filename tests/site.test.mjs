import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
test('preview entry point parses and all artwork destinations exist',()=>{
 const root=new URL('../',import.meta.url),html=readFileSync(new URL('index.html',root),'utf8');
 for(const [,script] of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(script);
 for(const path of ['art/solar-system/index.html','art/black-hole/index.html','art/photo-study/index.html']){assert(html.includes(path));assert(existsSync(new URL(path,root)));}
 assert(existsSync(new URL('.nojekyll',root)));
});
