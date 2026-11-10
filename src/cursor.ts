/** One arrow, a bounded canvas petal trail, and short tip-origin click ripples. */
export function initCursor() {
  const canvas = document.querySelector<HTMLCanvasElement>('#cursor-trail');
  const arrow = document.querySelector<HTMLElement>('#custom-cursor');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !arrow || !ctx) return; // Keep the native cursor on unsupported clients.
  const fine = matchMedia('(pointer: fine) and (hover: hover)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const lifetime = 580;
  type Point = { x: number; y: number; t: number };
  let points: Point[] = [];
  let ripples: Point[] = [];
  let frame = 0;
  let active = false;
  let latest: Point = { x: 0, y: 0, t: 0 };
  let hover = false;
  let dpr = 1;
  const allowed = () => fine.matches && !reduced.matches;
  const editable = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [data-native-cursor], video, iframe, embed';
  const textArea = 'p, h1, h2, h3, h4, li, dd, dt, figcaption, td, th, pre, code, .hero-identity, .detail-subtitle';

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas!.width = Math.round(innerWidth * dpr);
    canvas!.height = Math.round(innerHeight * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (active || ripples.length) schedule();
  }
  function reset() {
    active = false;
    root.classList.remove('custom-cursor-active');
    arrow!.hidden = true;
    points = [];
    ripples = [];
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    ctx!.clearRect(0, 0, innerWidth, innerHeight);
  }
  function nativeAt(target: EventTarget | null) {
    if (!(target instanceof Element)) return true;
    if (target.closest(editable)) return true;
    if (document.getSelection()?.toString()) return true;
    // Selectable article text keeps its familiar I-beam; links/buttons retain the arrow.
    return !!target.closest(textArea) && !target.closest('a, button, [role="button"]');
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
  function spline(a: Point, b: Point, c: Point, d: Point, t: number) {
    const t2 = t * t, t3 = t2 * t;
    const axis = (k: 'x' | 'y') => 0.5 * ((2 * b[k]) + (-a[k] + c[k]) * t + (2*a[k]-5*b[k]+4*c[k]-d[k])*t2 + (-a[k]+3*b[k]-3*c[k]+d[k])*t3);
    return { x: axis('x'), y: axis('y') };
  }
  function draw(now: number) {
    frame = 0;
    ctx!.clearRect(0, 0, innerWidth, innerHeight);
    points = points.filter(p => now - p.t < lifetime).slice(-48);
    ripples = ripples.filter(p => now - p.t < 430);
    if (active) {
      // SVG tip (3, 2) is the pointer hotspot. Scaling uses that same origin.
      arrow!.style.transform = `translate3d(${latest.x-3}px,${latest.y-2}px,0) scale(${hover ? 1.08 : 1})`;
    }
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[Math.max(0, i-1)], b = points[i], c = points[i+1], d = points[Math.min(points.length-1, i+2)];
      const distance = Math.hypot(c.x-b.x,c.y-b.y);
      if (distance < 0.5) continue;
      const steps = Math.min(5, Math.max(1, Math.ceil(distance/9)));
      for (let s=0; s<steps; s++) {
        const t = s / steps;
        const time = b.t + (c.t-b.t)*t;
        const life = Math.max(0, 1-(now-time)/lifetime);
        if (life <= 0) continue;
        const p = spline(a,b,c,d,t), q = spline(a,b,c,d,Math.min(1,t+.06));
        // Overlapping tapered petals vary in width along the spline, never a line stroke.
        const petal = .65 + .35 * Math.sin((i+t)*.82);
        const width = (4 + Math.min(distance*.2,7)) * petal * life;
        const length = (10 + Math.min(distance*.4,15)) * (.4 + life*.6);
        ctx!.save();
        ctx!.translate(p.x,p.y);
        ctx!.rotate(Math.atan2(q.y-p.y,q.x-p.x));
        ctx!.filter = `blur(${(.35+(1-life)*1.2).toFixed(1)}px)`;
        const g = ctx!.createRadialGradient(length*.25,0,0,0,0,length);
        g.addColorStop(0,`rgba(60,211,231,${(.38*life*life).toFixed(3)})`);
        g.addColorStop(.45,`rgba(38,185,210,${(.22*life*life).toFixed(3)})`);
        g.addColorStop(1,'rgba(27,167,194,0)');
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.ellipse(0,0,length,width,0,0,Math.PI*2);
        ctx!.fill();
        ctx!.restore();
      }
    }
    for (const r of ripples) {
      const t = (now-r.t)/430;
      ctx!.beginPath();
      ctx!.arc(r.x,r.y,3+24*(1-Math.pow(1-t,2)),0,Math.PI*2);
      ctx!.strokeStyle = `rgba(54,200,224,${.62*(1-t)*(1-t)})`;
      ctx!.lineWidth = 1;
      ctx!.stroke();
      if (t < .3) {
        ctx!.beginPath();ctx!.arc(r.x,r.y,2*(1-t/.3),0,Math.PI*2);
        ctx!.fillStyle = `rgba(224,253,255,${1-t/.3})`;ctx!.fill();
      }
    }
    // No perpetual idle animation: stop once the last trail/ripple has disappeared.
    if (points.length || ripples.length) schedule();
  }
  window.addEventListener('pointermove', e => {
    if (!allowed() || e.pointerType !== 'mouse' || nativeAt(e.target)) { reset(); return; }
    const now = performance.now();
    hover = !!(e.target instanceof Element && e.target.closest('a,button,[role="button"],.skill-card,.project-card'));
    if (!active) {
      active = true;
      arrow.hidden = false;
      root.classList.add('custom-cursor-active');
    }
    latest = { x:e.clientX, y:e.clientY, t:now };
    const last = points.at(-1);
    if (!last || Math.hypot(last.x-latest.x,last.y-latest.y) > 2) {
      points.push(latest);
      if (points.length>48) points.shift();
    }
    schedule();
  }, {passive:true});
  window.addEventListener('pointerdown', e => {
    if (!active || !allowed() || e.pointerType !== 'mouse' || e.button !== 0 || nativeAt(e.target)) return;
    ripples.push({x:e.clientX,y:e.clientY,t:performance.now()});
    ripples = ripples.slice(-4);
    schedule();
  }, {passive:true});
  document.addEventListener('pointerleave', reset);
  document.addEventListener('selectionchange',()=>{ if(document.getSelection()?.toString()) reset(); });
  document.addEventListener('focusin',e=>{ if(e.target instanceof Element && e.target.closest(editable)) reset(); });
  document.addEventListener('visibilitychange',()=>{ if(document.hidden) reset(); });
  window.addEventListener('blur', reset);
  window.addEventListener('scroll', reset, {passive:true});
  window.addEventListener('resize',resize,{passive:true});
  fine.addEventListener('change',reset);
  reduced.addEventListener('change',reset);
  resize();
}
