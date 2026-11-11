import {siPython,siC,siTypescript,siVite,siTailwindcss,siPytorch,siTensorflow,siHuggingface,siMysql,siLinux,siGit,siGithub,type SimpleIcon} from 'simple-icons';
import javaSvg from './icons/java.svg?raw';
import oracleSvg from './icons/oracle.svg?raw';
const icons:Record<string,SimpleIcon>={Python:siPython,C:siC,TypeScript:siTypescript,Vite:siVite,'Tailwind CSS':siTailwindcss,PyTorch:siPytorch,TensorFlow:siTensorflow,'Hugging Face Transformers':siHuggingface,MySQL:siMysql,Linux:siLinux,Git:siGit,GitHub:siGithub};
export function skillIcon(name:string) {
 const icon=icons[name];
 if(icon)return `<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" focusable="false" data-icon-source="simple-icons"><path d="${icon.path}"/></svg>`;
 if(name==='Java'||name==='Oracle')return (name==='Java'?javaSvg:oracleSvg.replace('viewBox="0 0 128 128"','viewBox="0 48 128 32"').replace('<svg ','<svg data-oracle="true" '))
   .replace('<svg ','<svg width="32" height="32" focusable="false" data-icon-source="devicon" ')
   .replace(/fill="#[A-Fa-f0-9]+"/g,'fill="currentColor"');
 // JSP has no standalone logo in the verified icon sets. Use the requested star fallback.
 return '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" focusable="false" data-icon-source="star-fallback"><path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3L2.9 9.4l6.3-.9Z"/></svg>';
}
