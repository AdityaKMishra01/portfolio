/* ── CURSOR ── */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx+'px'; cur.style.top = my+'px'; });
(function animRing() {
  rx += (mx - rx) * .15; ry += (my - ry) * .15;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.btn,.project-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.style.transform='translate(-50%,-50%) scale(2.2)'; cur.style.background='var(--gold)'; });
  el.addEventListener('mouseleave', () => { cur.style.transform='translate(-50%,-50%) scale(1)'; cur.style.background='var(--accent)'; });
});

/* ── PARTICLES ── */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resizeCanvas() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resizeCanvas(); window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random()*W; this.y = Math.random()*H;
    this.vx = (Math.random()-.5)*.4; this.vy = (Math.random()-.5)*.4;
    this.r = Math.random()*2+1;
    this.alpha = Math.random()*.5+.15;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x<0||this.x>W||this.y<0||this.y>H) this.reset();
  }
}
for (let i=0;i<90;i++) particles.push(new Particle());

function drawParticles() {
  ctx.clearRect(0,0,W,H);
  for (let i=0;i<particles.length;i++) {
    particles[i].update();
    ctx.beginPath();
    ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(180,120,30,${particles[i].alpha})`;
    ctx.fill();
    for (let j=i+1;j<particles.length;j++) {
      const dx = particles[i].x-particles[j].x, dy = particles[i].y-particles[j].y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if (dist<110) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(180,120,30,${.18*(1-dist/110)})`;
        ctx.lineWidth = .7;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ── MARQUEE ── */
const tags = ['Besant Technologies','SQL','Python','Power BI','Excel','EDA','DAX','DGCA Analytics','UIDAI Dashboard','ETL Pipelines','Data Warehousing','KPI Reporting'];
const track = document.getElementById('marquee');
const items = [...tags,...tags].map(t => `<span class="marquee-item"><span class="marquee-dot"></span>${t}</span>`).join('');
track.innerHTML = items + items; // double for infinite scroll

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ── SKILL BARS ── */
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target;
      fill.style.width = fill.dataset.w + '%';
      barObs.unobserve(fill);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bar-fill').forEach(el => barObs.observe(el));
