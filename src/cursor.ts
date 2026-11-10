/** One arrow, a bounded canvas petal trail, and short tip-origin click ripples. */
export function initCursor() {
  const canvas = document.querySelector<HTMLCanvasElement>('#cursor-trail');
  const arrow = document.querySelector<HTMLElement>('#custom-cursor');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !arrow || !ctx) return; // Keep the native cursor on unsupported clients.
  const fine = matchMedia('(any-pointer: fine) and (any-hover: hover)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const lifetime = 580;
  type Point = { x: number; y: number; t: number };
  let points: Point[] = [];
  let ripples: Point[] = [];
  let frame = 0;
  let active = false;
  let mouseSeen = false;
  let hasPosition = false;
  let latest: Point = { x: 0, y: 0, t: 0 };
  let hover = false;
  let dpr = 1;
  const allowed = () => (fine.matches || mouseSeen) && !reduced.matches;
  const editable = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [data-native-cursor], video, iframe, embed';


  // Rasterize layered petals once; avoid repeated blur/gradient work in the frame loop.
  const petalStamp = document.createElement('canvas');
  petalStamp.width = 160;
  petalStamp.height = 100;
  const stamp = petalStamp.getContext('2d');
  if (stamp) {
    stamp.translate(80, 50);
    for (const [angle,alpha,offset,scale] of [[-.16,.55,-4,1.1],[.20,.35,5,.9],[0,.65,0,.65]]) {
      stamp.save();
      stamp.rotate(angle);
      stamp.globalAlpha=alpha;
      stamp.filter='blur(1px)';
      const gradient=stamp.createRadialGradient(14,0,0,0,0,70);
      gradient.addColorStop(0,'rgba(60,211,231,.65)');
      gradient.addColorStop(.45,'rgba(38,185,210,.36)');
      gradient.addColorStop(1,'rgba(27,167,194,0)');
      stamp.fillStyle=gradient;
      stamp.beginPath();
      stamp.ellipse(-6,offset,63,22*scale,0,0,Math.PI*2);
      stamp.fill();
      stamp.restore();
    }
  }

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas!.width = Math.round(innerWidth * dpr);
    canvas!.height = Math.round(innerHeight * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (active || ripples.length) schedule();
  }
  function hideArrow() {
    active = false;
    root.classList.remove('custom-cursor-active');
    arrow!.hidden = true;
    // Existing petals/ripples finish fading when entering native controls or selecting.
  }
  function clearTrail() {
    points = [];
    ripples = [];
    ctx!.clearRect(0, 0, innerWidth, innerHeight);
  }
  function reset() {
    hideArrow();
    clearTrail();
    hasPosition = false;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  }
  function nativeAt(target: EventTarget | null) {
    return !(target instanceof Element) || !!target.closest(editable) ||
      !!document.getSelection()?.toString();
  }
  function showAt(target: EventTarget | null) {
    if (!hasPosition || !allowed() || nativeAt(target)) { hideArrow(); return; }
    active = true;
    hover = !!(target instanceof Element && target.closest('a,button,[role="button"],.skill-card,.project-card'));
    arrow!.style.transform = `translate3d(${latest.x-3}px,${latest.y-2}px,0) scale(${hover ? 1.08 : 1})`;
    arrow!.hidden = false;
    root.classList.add('custom-cursor-active');
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
      const steps = Math.min(3, Math.max(1, Math.ceil(distance/12)));
      for (let s=0; s<steps; s++) {
        const t = s / steps;
        const time = b.t + (c.t-b.t)*t;
        const life = Math.max(0, 1-(now-time)/lifetime);
        if (life <= 0) continue;
        const p = spline(a,b,c,d,t), q = spline(a,b,c,d,Math.min(1,t+.06));
        // Overlapping tapered petals vary in width along the spline, never a line stroke.
        const petal = .65 + .35 * Math.sin((i+t)*.82);
        const width = (10 + Math.min(distance*.3,12)) * petal * life;
        const length = (16 + Math.min(distance*.5,22)) * (.4 + life*.6);
        ctx!.save();
        ctx!.translate(p.x,p.y);
        ctx!.rotate(Math.atan2(q.y-p.y,q.x-p.x));
        ctx!.globalAlpha=life*life;
        ctx!.drawImage(petalStamp,-length*1.3,-width*1.8,length*2.6,width*3.6);
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
    if (e.pointerType !== 'mouse') { reset(); return; }
    mouseSeen = true; // Actual mouse use also supports devices whose primary pointer is touch.
    hasPosition = true;
    latest = { x:e.clientX, y:e.clientY, t:performance.now() };
    showAt(e.target);
    if (!active) return;
    const last = points.at(-1);
    if (last && Math.hypot(last.x-latest.x,last.y-latest.y)>180) points=[];
    if (!last || Math.hypot(last.x-latest.x,last.y-latest.y)>1) {
      points.push(latest);
      if (points.length>48) points.shift();
    }
    schedule();
  }, {passive:true});
  window.addEventListener('pointerdown', e => {
    if(e.pointerType!=='mouse'){reset();return;}
    mouseSeen=true;
    hasPosition=true;
    latest={x:e.clientX,y:e.clientY,t:performance.now()};
    showAt(e.target);
    if (!active || e.button !== 0) return;
    ripples.push({...latest});
    ripples = ripples.slice(-4);
    schedule();
  }, {passive:true});
  document.addEventListener('pointerleave', reset);
  document.addEventListener('selectionchange',()=>{
    showAt(document.elementFromPoint(latest.x,latest.y));
  });
  document.addEventListener('focusin',e=>{ if(e.target instanceof Element && e.target.closest(editable)) hideArrow(); });
  document.addEventListener('visibilitychange',()=>{ if(document.hidden) reset(); });
  window.addEventListener('blur', reset);
  window.addEventListener('scroll',()=>{
    // Canvas coordinates are viewport-local. Discard stale page traces, keep the tip anchored.
    clearTrail();
    showAt(document.elementFromPoint(latest.x,latest.y));
  },{passive:true});
  window.addEventListener('resize',resize,{passive:true});
  fine.addEventListener('change',()=>{if(!allowed())reset()});
  reduced.addEventListener('change',reset);
  resize();
}
