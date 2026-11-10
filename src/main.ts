import { initCursor } from './cursor';
import { profile } from './data';

initCursor(); // Cursor must not depend on unrelated gallery/navigation initialization.

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(pointer: fine) and (hover: hover)');
const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('#nav');
const header = document.querySelector<HTMLElement>('.site-header');
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('#nav > a')];
navLinks.forEach((a,i)=>a.style.setProperty('--nav-index',String(i)));
function closeMenu(returnFocus=false) {
 const wasOpen = toggle?.getAttribute('aria-expanded')==='true';
 toggle?.setAttribute('aria-expanded','false');
 toggle?.setAttribute('aria-label','메뉴 열기');
 nav?.classList.remove('open');
 if(wasOpen && returnFocus) toggle?.focus();
}
toggle?.addEventListener('click',event=>{
 const open=toggle.getAttribute('aria-expanded')!=='true';
 toggle.setAttribute('aria-expanded',String(open));
 toggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');
 nav?.classList.toggle('open',open);
 if(open && event.detail===0)requestAnimationFrame(()=>requestAnimationFrame(()=>{
  if(toggle.getAttribute('aria-expanded')==='true')navLinks[0]?.focus({preventScroll:true});
 }));
});
navLinks.forEach(a=>a.addEventListener('click',()=>{
 const wasOpen=toggle?.getAttribute('aria-expanded')==='true';
 closeMenu();
 if(wasOpen && a.hash){const target=document.querySelector<HTMLElement>(a.hash);if(target){target.tabIndex=-1;target.focus({preventScroll:true})}}
}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu(true)});
document.addEventListener('click',e=>{if(e.target instanceof Node&&!nav?.contains(e.target)&&!toggle?.contains(e.target))closeMenu()});
const indicator = document.querySelector<HTMLElement>('.nav-indicator');
function positionIndicator() {
 const current=navLinks.find(a=>a.hasAttribute('aria-current'));
 if(!current || !indicator){if(indicator)indicator.style.opacity='0';return}
 indicator.style.width=`${current.offsetWidth}px`;
 indicator.style.transform=`translateX(${current.offsetLeft}px)`;
 indicator.style.opacity='1';
}
function setActive(id:string) {
 navLinks.forEach(a=>{if(a.hash===`#${id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
 positionIndicator();
}
// Keep header and section tracking in one scheduled read per scroll frame.
const sections=[...document.querySelectorAll<HTMLElement>('main > section[id]')];
let scrollFrame=0;
function updateScroll() {
 scrollFrame=0;
 header?.classList.toggle('is-scrolled',scrollY>16);
 let current='home';
 const boundary=Math.min(innerHeight*.35,260);
 for(const s of sections){if(s.getBoundingClientRect().top<=boundary)current=s.id}
 if(innerHeight+scrollY>=document.documentElement.scrollHeight-6 && sections.length)current=sections.at(-1)!.id;
 setActive(current);
}
window.addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll)},{passive:true});
window.addEventListener('resize',()=>{positionIndicator();if(innerWidth>760)closeMenu()},{passive:true});
void document.fonts.ready.then(positionIndicator);
updateScroll();

const themeToggle=document.querySelector<HTMLButtonElement>('.theme-toggle');
function setTheme(dark:boolean) {
 document.documentElement.dataset.theme=dark?'dark':'light';
 document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#0D1117':'#f7f9fc');
 themeToggle?.setAttribute('aria-pressed',String(dark));
 themeToggle?.setAttribute('aria-label',dark?'밝은 테마로 전환':'Graphite Cyan 다크 테마로 전환');
 try{localStorage.setItem('portfolio-theme-editorial',dark?'dark':'light')}catch{/* Storage is optional. */}
}
setTheme(document.documentElement.dataset.theme!=='light');
themeToggle?.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme!=='dark'));

const revealTargets=[...document.querySelectorAll<HTMLElement>(
 '.section-heading .eyebrow,.section-heading h2,.section-heading>p,.about-title>.eyebrow,.about-title>h2,.section-aside,.about-body>p,.about-facts,.skill-card,.project-card,.timeline-item,.contact-title>*,.contact-row'
)];
const revealObserver = new IntersectionObserver(entries=>{
 entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}});
},{threshold:.06,rootMargin:'0px 0px -24px 0px'});
if(!reducedMotion.matches) {
 const sectionIndexes=new Map<Element,number>();
 revealTargets.forEach(el=>{
  const section=el.closest('.section')!;
  const index=sectionIndexes.get(section) ?? 0;
  sectionIndexes.set(section,index+1);
  el.classList.add('reveal-ready');
  el.style.setProperty('--reveal-delay',`${Math.min(index,4)*80}ms`);
  revealObserver.observe(el);
 });
}
reducedMotion.addEventListener('change',()=>{
 if(reducedMotion.matches){revealObserver.disconnect();revealTargets.forEach(el=>el.classList.add('is-visible'))}
});
document.addEventListener('focusin',e=>{
 if(e.target instanceof Element){let node:Element|null=e.target;while(node){if(node.classList.contains('reveal-ready'))node.classList.add('is-visible');node=node.parentElement}}
});

const filters=document.querySelector<HTMLElement>('.project-filters');
const grid=document.querySelector<HTMLElement>('.project-grid');
const cards=[...document.querySelectorAll<HTMLElement>('.project-card')];
if(filters && grid){
 filters.hidden=false;
 filters.querySelectorAll<HTMLButtonElement>('button[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  const category=button.dataset.filter!;
  if(button.getAttribute('aria-pressed')==='true')return;
  const old=new Map(cards.filter(c=>!c.hidden).map(c=>[c,c.getBoundingClientRect()]));
  cards.forEach(card=>card.getAnimations().forEach(a=>a.cancel()));
  filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  grid.classList.toggle('is-filtered',category!=='all');
  let visibleCount=0;
  cards.forEach(card=>{
   card.hidden=category!=='all'&&!card.dataset.categories?.split(' ').includes(category);
   if(!card.hidden){visibleCount++;card.classList.add('is-visible')}
  });
  if(!reducedMotion.matches){
   cards.filter(c=>!c.hidden).forEach(card=>{
    const previous=old.get(card),now=card.getBoundingClientRect();
    card.animate(previous?[
     {transform:`translate(${previous.left-now.left}px,${previous.top-now.top}px)`,opacity:1},
     {transform:'translate(0,0)',opacity:1}
    ]:[{transform:'translateY(14px)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:320,easing:'cubic-bezier(.2,.8,.2,1)'});
   });
  }
  const status=document.querySelector('#filter-status');
  if(status)status.textContent=`${button.childNodes[0]?.textContent?.trim()} 프로젝트 ${visibleCount}개 표시`;
 }));
}
// Pointer-local border highlights update CSS once per frame, never add DOM nodes.
let hoverFrame=0;
let hoverCard:HTMLElement|null=null;
let hoverX=0,hoverY=0;
document.addEventListener('pointermove',e=>{
 if(!finePointer.matches||reducedMotion.matches||e.pointerType!=='mouse')return;
 const target=e.target instanceof Element?e.target.closest<HTMLElement>('.skill-card,.project-card'):null;
 if(!target)return;
 hoverCard=target;hoverX=e.clientX;hoverY=e.clientY;
 if(!hoverFrame)hoverFrame=requestAnimationFrame(()=>{
  hoverFrame=0;if(!hoverCard)return;
  const r=hoverCard.getBoundingClientRect();
  hoverCard.style.setProperty('--mouse-x',`${hoverX-r.left}px`);
  hoverCard.style.setProperty('--mouse-y',`${hoverY-r.top}px`);
 });
},{passive:true});

const copy=document.querySelector<HTMLButtonElement>('.copy-email');
const feedback=document.querySelector<HTMLElement>('#copy-feedback');
copy?.addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText(profile.email);if(feedback)feedback.textContent='이메일 주소를 복사했습니다.'}
 catch{if(feedback)feedback.textContent='자동 복사를 사용할 수 없습니다. 이메일 주소를 선택해 복사해 주세요.'}
});
