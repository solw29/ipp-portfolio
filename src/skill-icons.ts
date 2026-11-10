import {siPython,siTypescript,siVite,siTailwindcss,siHtml5,siPytorch,siTensorflow,siPandas,siNumpy,siGit,siGithub,siNotion,type SimpleIcon} from 'simple-icons';
const icons:Record<string,SimpleIcon>={Python:siPython,TypeScript:siTypescript,Vite:siVite,'Tailwind CSS':siTailwindcss,'HTML/CSS':siHtml5,PyTorch:siPytorch,'TensorFlow/Keras':siTensorflow,Pandas:siPandas,NumPy:siNumpy,Git:siGit,GitHub:siGithub,Notion:siNotion};
export function skillIcon(name:string) {
 const icon=icons[name];
 if(icon)return `<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" focusable="false" data-icon-source="simple-icons">${/* Names are separately visible; purely decorative brand shapes. */''}<path d="${icon.path}"/></svg>`;
 const path=['Oracle','SQL'].includes(name)?'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>':'<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>';
 return `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" focusable="false" data-icon-source="generic">${path}</svg>`;
}
