/* ============================================================
   BURAK KOCAGÖL · PERSONAL WEBSITE
   script.js
   ============================================================ */

/* ── Navbar: scroll state ─────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const burgerBtn = document.getElementById('burgerBtn');
const navMenu   = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Mobile navigation toggle ─────────────────────────────── */
burgerBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    burgerBtn.classList.toggle('open', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        burgerBtn.classList.remove('open');
        burgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

/* ── Scroll-reveal (Intersection Observer) ───────────────── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Stagger siblings that are still hidden
        const parent   = entry.target.parentElement;
        const siblings = Array.from(parent.querySelectorAll('.reveal:not(.visible)'));
        const idx      = siblings.indexOf(entry.target);

        setTimeout(() => {
            entry.target.classList.add('visible');
        }, Math.max(0, idx) * 90);

        revealObserver.unobserve(entry.target);
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -36px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Active nav link on scroll ───────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
        });
    });
}, {
    threshold: 0.35,
    rootMargin: '-72px 0px 0px 0px'
});

sections.forEach(s => activeObserver.observe(s));

/* ── Close nav when clicking outside ─────────────────────── */
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        burgerBtn.classList.remove('open');
        burgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

/* ── Escape key closes mobile nav ────────────────────────── */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        burgerBtn.classList.remove('open');
        burgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        burgerBtn.focus();
    }
});
