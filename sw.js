const V='sudoku-v12',F=['./','./index.html','./puzzles.js','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(u=>fetch(new Request(u,{cache:'reload'})).then(r=>{if(!r.ok)throw 0;return c.put(u,r)})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;
 e.respondWith(new Promise(res=>{let done=0;const fb=()=>caches.match(e.request,{ignoreSearch:true}).then(m=>{if(!done){done=1;res(m||Response.error())}});
  const t=setTimeout(()=>{caches.match(e.request,{ignoreSearch:true}).then(m=>{if(m&&!done){done=1;res(m)}})},4000);
  fetch(e.request,{cache:'no-cache'}).then(r=>{clearTimeout(t);if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}if(!done){done=1;res(r)}}).catch(()=>{clearTimeout(t);fb()})}))});
