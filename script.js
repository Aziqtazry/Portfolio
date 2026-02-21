// ===== Skeleton Loading Screen =====
window.addEventListener('load', () => {
    const skeleton = document.getElementById('skeletonOverlay');
    const body = document.body;

    // Short delay so skeleton is visible, then fade it out
    setTimeout(() => {
        skeleton.classList.add('fade-out');
        body.classList.remove('is-loading');
        body.classList.add('content-loaded');

        // Fly in hero icons
        flyInHeroIcons();

        // Remove skeleton from DOM after transition
        skeleton.addEventListener('transitionend', () => {
            skeleton.remove();
        });
    }, 1200);
});

// ===== Hero Icons Fly-In =====
const driftData = [
    // [nth-child index, driftName keyframes, duration]
    [1, [{transform:'translate(0,0) rotate(0deg)'},{transform:'translate(18px,-22px) rotate(8deg)'},{transform:'translate(-12px,-40px) rotate(-5deg)'},{transform:'translate(22px,-15px) rotate(10deg)'},{transform:'translate(0,0) rotate(0deg)'}], 18000],
    [2, [{transform:'translate(0,0) rotate(0deg)'},{transform:'translate(-20px,-15px) rotate(-10deg)'},{transform:'translate(14px,-32px) rotate(6deg)'},{transform:'translate(-8px,12px) rotate(-8deg)'},{transform:'translate(0,0) rotate(0deg)'}], 15000],
    [3, [{transform:'translate(0,0) rotate(0deg)'},{transform:'translate(28px,16px) rotate(12deg)'},{transform:'translate(-16px,-24px) rotate(-6deg)'},{transform:'translate(0,0) rotate(0deg)'}], 20000],
    [4, [{transform:'translate(0,0) rotate(0deg)'},{transform:'translate(12px,20px) rotate(-8deg)'},{transform:'translate(25px,-8px) rotate(5deg)'},{transform:'translate(-8px,16px) rotate(-12deg)'},{transform:'translate(0,0) rotate(0deg)'}], 14000],
    [5, [{transform:'translate(0,0) rotate(0deg)'},{transform:'translate(-18px,22px) rotate(10deg)'},{transform:'translate(12px,-18px) rotate(-7deg)'},{transform:'translate(0,0) rotate(0deg)'}], 17000],
    [6, [{transform:'translate(0,0) rotate(0deg)'},{transform:'translate(15px,-12px) rotate(-6deg)'},{transform:'translate(-10px,18px) rotate(8deg)'},{transform:'translate(20px,8px) rotate(-10deg)'},{transform:'translate(0,0) rotate(0deg)'}], 13000],
    [7, [{transform:'translate(0,0) rotate(0deg)'},{transform:'translate(18px,-22px) rotate(8deg)'},{transform:'translate(-12px,-40px) rotate(-5deg)'},{transform:'translate(22px,-15px) rotate(10deg)'},{transform:'translate(0,0) rotate(0deg)'}], 19000],
    [8, [{transform:'translate(0,0) rotate(0deg)'},{transform:'translate(28px,16px) rotate(12deg)'},{transform:'translate(-16px,-24px) rotate(-6deg)'},{transform:'translate(0,0) rotate(0deg)'}], 16000],
    [9, [{transform:'translate(0,0) rotate(0deg)'},{transform:'translate(-18px,22px) rotate(10deg)'},{transform:'translate(12px,-18px) rotate(-7deg)'},{transform:'translate(0,0) rotate(0deg)'}], 22000],
    [10,[{transform:'translate(0,0) rotate(0deg)'},{transform:'translate(-20px,-15px) rotate(-10deg)'},{transform:'translate(14px,-32px) rotate(6deg)'},{transform:'translate(-8px,12px) rotate(-8deg)'},{transform:'translate(0,0) rotate(0deg)'}], 12000]
];

function flyInHeroIcons() {
    const heroIcons = document.querySelectorAll('.hero-bg-shapes .float-icon.fly-left, .hero-bg-shapes .float-icon.fly-right');

    heroIcons.forEach((icon, index) => {
        const isLeft = icon.classList.contains('fly-left');
        const startX = isLeft ? '-100vw' : '100vw';
        const startRotate = isLeft ? '-30deg' : '30deg';

        // Fly-in animation via Web Animations API
        const flyAnim = icon.animate([
            { transform: `translateX(${startX}) rotate(${startRotate}) scale(0.5)`, opacity: 0 },
            { transform: 'translateX(0) rotate(0deg) scale(1)', opacity: 0.35 }
        ], {
            duration: 1400,
            delay: index * 120,
            easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
            fill: 'both'
        });

        // When fly-in ends, start a fresh drift from translate(0,0)
        flyAnim.onfinish = () => {
            flyAnim.cancel(); // Remove fly-in effect so it doesn't conflict with drift
            icon.classList.remove('fly-left', 'fly-right');
            icon.style.opacity = '0.35';
            icon.style.animation = 'none';

            // Start drift via Web Animations API (begins at translate(0,0) — no snap)
            const dd = driftData[index];
            if (dd) {
                icon.animate(dd[1], {
                    duration: dd[2],
                    iterations: Infinity,
                    easing: 'ease-in-out'
                });
            }
        };
    });
}

// ===== Dark Mode Toggle =====
const themeToggle = document.getElementById('themeToggle');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Load saved theme or default to dark
(function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) {
        setTheme(saved);
    } else {
        setTheme('dark');
    }
})();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== Smooth scrolling for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar scroll effect =====
const navbar = document.querySelector('.navbar');
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    // Navbar shrink on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide scroll-to-top button
    if (scrollTopBtn) {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }

    // Active nav link highlighting
    updateActiveNavLink();
});

// Scroll to top button
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Active nav link based on scroll position =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// ===== Scroll Animations with Intersection Observer =====
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally stop observing after animation (better performance)
            // scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with the animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
});

// ===== Initialize active nav link on load =====
updateActiveNavLink();