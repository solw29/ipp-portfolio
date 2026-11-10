import {allProjects} from './data';
import {header,footer,cursorMarkup,escapeHtml as e} from './ui';
import {home} from './home';
import {detail} from './project-page';

export function renderPage(slug?:string) {
 const project=allProjects.find(p=>p.slug===slug);
 const base=project?'../../':'./';
 const title=project?`${project.title} | 정유진 포트폴리오`:'정유진 | SW Developer Portfolio';
 const description=project?project.summary:'동덕여자대학교 데이터사이언스 전공·컴퓨터학 복수전공 정유진의 SW개발 포트폴리오. 웹 프로토타입과 데이터·AI 프로젝트의 구현, 실험, 검증 과정을 소개합니다.';
 return `<!doctype html>
<html lang="ko" data-theme="dark">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#0D1117"><title>${e(title)}</title>
<meta name="description" content="${e(description)}">
<meta property="og:type" content="website"><meta property="og:title" content="${e(title)}"><meta property="og:description" content="${e(description)}">
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
<script>try{if(localStorage.getItem('portfolio-theme-editorial')==='light')document.documentElement.dataset.theme='light'}catch{}</script>
<link rel="stylesheet" href="${base}src/style.css"><script type="module" src="${base}src/main.ts"></script>
</head><body>${header(base,!!project)}${project?detail(project,base):home(base)}${footer(base)}${cursorMarkup()}</body></html>`;
}
