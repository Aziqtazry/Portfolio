const themeToggle = document.getElementById('themeToggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const scrollTopBtn = document.getElementById('scrollTopBtn');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

(function initTheme() {
    setTheme(localStorage.getItem('theme') || 'dark');
})();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        const targetId = anchor.getAttribute('href');
        const targetElement = targetId ? document.querySelector(targetId) : null;

        if (!targetElement) return;

        event.preventDefault();
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 110;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (!link) return;

        link.classList.toggle('active', scrollPos >= top && scrollPos < top + height);
    });
}

function updateScrolledState() {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
    scrollTopBtn?.classList.toggle('show', window.scrollY > 400);
    updateActiveNavLink();
}

window.addEventListener('scroll', updateScrolledState, { passive: true });

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
});

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    scrollObserver.observe(element);
});

updateScrolledState();
