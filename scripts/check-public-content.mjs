import { readdir, readFile } from 'node:fs/promises';
const roots = ['src', 'dist', 'docs', 'README.md'];
const files=[];
async function collect(path) {
 const {stat}=await import('node:fs/promises');
 if((await stat(path)).isDirectory())for(const entry of await readdir(path))await collect(`${path}/${entry}`);
 else if(/\.(?:ts|js|html|json|md)$/.test(path))files.push(path);
}
for(const root of roots)await collect(root);
const findings=[];
for(const file of files){
 const text=(await readFile(file,'utf8')).replace(/<svg\b[\s\S]*?<\/svg>/gi,'');
 if(/\b01[016789][ -]?\d{3,4}[ -]?\d{4}\b/.test(text)||/href\s*=\s*["']tel:/i.test(text)||/\b(?:showPhone|profile\.phone)\b/.test(text))findings.push(file);
}
if(findings.length){console.error('Public contact privacy check failed (paths only):',findings);process.exitCode=1;}
else console.log(`PASS: ${files.length} source/build/document files checked; no personal telephone values, links or retired contact settings.`);
