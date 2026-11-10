import { createServer } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';
const server = await createServer({ configFile: false, server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
try {
 const { renderPage } = await server.ssrLoadModule('/src/render.ts');
 const { allProjects } = await server.ssrLoadModule('/src/data.ts');
 await writeFile('index.html', renderPage());
 for (const p of allProjects) {
  await mkdir(`projects/${p.slug}`, {recursive:true});
  await writeFile(`projects/${p.slug}/index.html`,renderPage(p.slug));
 }
} finally { await server.close(); }
