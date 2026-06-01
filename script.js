// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    ring.style.width = '60px';
    ring.style.height = '60px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    ring.style.width = '40px';
    ring.style.height = '40px';
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Stagger project items
document.querySelectorAll('.project-item.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.1) + 's';
});

// Parallax hero bg text
const bgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (bgText) bgText.style.transform = `translateY(calc(-50% + ${y * 0.3}px))`;
}, { passive: true });

// Duplicate marquee for seamless loop
const track = document.getElementById('marquee');
if (track) {
  track.innerHTML += track.innerHTML;
}
