import { profile, type Project } from './data';
export const escapeHtml = (s: string) => s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export const arrow = '<span aria-hidden="true">↗</span>';
export const tags = (values:string[])=>`<div class="tags">${values.map(t=>`<span>${escapeHtml(t)}</span>`).join('')}</div>`;
export const badge = (p:Project)=>`<span class="status ${p.ongoing?'ongoing':''}"><i aria-hidden="true"></i>${escapeHtml(p.status)}</span>`;
export function header(base:string,detail:boolean) {
 const menus=[['About','about'],['Skills','skills'],['Projects','projects'],['Timeline','timeline'],['Contact','contact']];
 return `<a class="skip-link" href="#main">본문 바로가기</a><header class="site-header"><div class="nav-wrap"><a class="wordmark" href="${base}#home" aria-label="CY. 정유진 홈">CY<span>.</span></a><nav id="nav" aria-label="주 메뉴">${menus.map(([label,id])=>`<a href="${detail?base:''}#${id}">${label}</a>`).join('')}<span class="nav-indicator" aria-hidden="true"></span></nav><div class="header-actions"><a class="header-github" href="${profile.github}" target="_blank" rel="noopener noreferrer" aria-label="정유진 GitHub 새 창">GitHub ${arrow}</a><button class="theme-toggle" type="button" aria-label="밝은 테마로 전환" aria-pressed="true"><span aria-hidden="true">◐</span></button><button class="menu-toggle" aria-expanded="false" aria-controls="nav" aria-label="메뉴 열기"><span></span><span></span></button></div></div></header>`;
}
export function footer(base:string) {
 return `<footer class="site-footer container"><a class="wordmark" href="${base}#home" aria-label="CY. 정유진 홈">CY<span>.</span></a><p>© ${new Date().getFullYear()} 정유진<span>Designed with intent. Built with TypeScript.</span></p><a class="back-top" href="#main">BACK TO TOP <span aria-hidden="true">↑</span></a></footer>`;
}
export function contact() {
 return `<section id="contact" class="section contact container"><div class="contact-title"><span class="eyebrow">05 / CONTACT</span><h2>LET’S<br><span>CONNECT</span><span class="cyan">.</span></h2><p>함께 구현하고, 함께 배울 다음 이야기를 기다립니다.<br>프로젝트와 개발 경험에 대해 편하게 연락해 주세요.</p><a class="button primary" href="mailto:${profile.email}">이메일 보내기 ${arrow}</a></div><div class="contact-details"><div class="contact-row"><span class="eyebrow">EMAIL</span><a href="mailto:${profile.email}">${profile.email} ${arrow}</a><button class="copy-email" type="button" aria-label="이메일 주소 복사">복사</button></div><div class="contact-row"><span class="eyebrow">GITHUB</span><a href="${profile.github}" target="_blank" rel="noopener noreferrer">github.com/solw29 ${arrow}</a></div><div class="contact-row"><span class="eyebrow">PHONE</span><a href="tel:${profile.phone.replaceAll('-','')}">${profile.phone} ${arrow}</a></div><p id="copy-feedback" class="copy-feedback" role="status" aria-live="polite"></p><p class="contact-note"><span aria-hidden="true">↳</span> 작은 시도에서 시작해,<br>끝까지 구현하는 개발자가 되겠습니다.</p></div></section>`;
}
export function cursorMarkup() {
 return `<canvas id="cursor-trail" aria-hidden="true"></canvas><div id="custom-cursor" aria-hidden="true" hidden><svg width="30" height="38" viewBox="0 0 30 38" fill="none"><path d="M3 2 L3 29 L10.2 22.5 L16.2 35 L21.1 32.6 L15.1 20.5 L25.8 20.3 Z" fill="#F5F6F0" stroke="#22BBD4" stroke-width="1.6" stroke-linejoin="miter"/></svg></div>`;
}
