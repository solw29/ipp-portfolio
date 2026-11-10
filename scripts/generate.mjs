import { createServer } from 'vite';
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
let revision=process.env.VERCEL_GIT_COMMIT_SHA || 'unknown';
if(revision==='unknown'){try{revision=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim()}catch{}}
const withRevision=html=>html.replace('<head>',`<head><meta name="build-revision" content="${revision}">`);
const server = await createServer({ configFile: false, server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
try {
 const { renderPage } = await server.ssrLoadModule('/src/render.ts');
 const { allProjects } = await server.ssrLoadModule('/src/data.ts');
 await writeFile('index.html', withRevision(renderPage()));
 for (const p of allProjects) {
  await mkdir(`projects/${p.slug}`, {recursive:true});
  await writeFile(`projects/${p.slug}/index.html`,withRevision(renderPage(p.slug)));
 }
} finally { await server.close(); }
