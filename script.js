/* ===== CUSTOM CURSOR ===== */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left  = mouseX + 'px';
    dot.style.top   = mouseY + 'px';
});

(function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .skill-card, .cert-card, .stat-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        dot.style.transform  = 'translate(-50%,-50%) scale(2)';
        ring.style.transform = 'translate(-50%,-50%) scale(1.4)';
        ring.style.opacity   = '0.3';
    });
    el.addEventListener('mouseleave', () => {
        dot.style.transform  = 'translate(-50%,-50%) scale(1)';
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.opacity   = '0.6';
    });
});

/* ===== THEME MANAGER ===== */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sc_theme', theme);
    document.getElementById('lightBtn').classList.toggle('active', theme === 'light');
    document.getElementById('darkBtn').classList.toggle('active', theme === 'dark');
}
(function() {
    const saved = localStorage.getItem('sc_theme') || 'dark';
    setTheme(saved);
})();

/* ===== WELCOME POPUP ===== */
window.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('welcomeOverlay');
    if (overlay) overlay.style.display = 'flex';
});

function closeWelcome() {
    const overlay = document.getElementById('welcomeOverlay');
    if (overlay) {
        overlay.classList.add('hide');
        setTimeout(() => overlay.style.display = 'none', 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const logoLink = document.getElementById('logoLink');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            const overlay = document.getElementById('welcomeOverlay');
            if (overlay) {
                overlay.style.display = 'flex';
                setTimeout(() => overlay.classList.remove('hide'), 10);
            }
        });
    }
});

/* ===== PARTICLES ===== */
(function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 28; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left              = Math.random() * 100 + '%';
        p.style.width             =
        p.style.height            = (Math.random() * 3 + 1.5) + 'px';
        p.style.animationDuration = (Math.random() * 14 + 10) + 's';
        p.style.animationDelay    = (Math.random() * 12) + 's';
        container.appendChild(p);
    }
})();

/* ===== SCROLL REVEAL ===== */
(function initReveal() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, i) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, i * 90);
            }
        });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ===== ACTIVE NAV ===== */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const header   = document.getElementById('mainHeader');

    window.addEventListener('scroll', function() {
        if (header) header.classList.toggle('scrolled', window.scrollY > 20);
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    });
})();

/* ===== MOBILE MENU ===== */
function toggleMobileMenu() {
    // Basic mobile toggle — could expand to drawer
    const nav = document.querySelector('.nav-links');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

/* ===== SKILLS MODAL ===== */
const skillData = {
    frontend: {
        icon : '💻',
        title: 'Frontend Mastery',
        sub  : 'Technologies I use to build beautiful, responsive web interfaces',
        tags : [
            { name: 'HTML5',        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
            { name: 'CSS3',         img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
            { name: 'JavaScript',   img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'Tailwind CSS', img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
            { name: 'React',        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }
        ]
    },
    design: {
        icon : '🎨',
        title: 'Design & Prototyping',
        sub  : 'Tools I use to design stunning interfaces and interactive prototypes',
        tags : [
            { name: 'Figma', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
            { name: 'VS Code', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' }
        ]
    },
    tech: {
        icon : '⚙️',
        title: 'Core Tech Stack',
        sub  : 'Tools and platforms that power my development workflow',
        tags : [
            { name: 'GitHub',  img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
            { name: 'VS Code', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' }
        ]
    },
    cs: {
        icon : '🎓',
        title: 'CS Fundamentals',
        sub  : 'Core computer science concepts that form my problem-solving foundation',
        tags : [
            { name: 'C Language', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
            { name: 'Java',       img: 'https://img.icons8.com/color/48/java-coffee-cup-logo--v1.png' },
            { name: 'OOP',        img: 'https://img.icons8.com/color/48/java-coffee-cup-logo--v1.png' },
            { name: 'DSA',        img: 'https://img.icons8.com/color/48/data-configuration.png' }
        ]
    }
};

function openModal(type) {
    const d = skillData[type];
    if (!d) return;
    document.getElementById('modalIcon').textContent  = d.icon;
    document.getElementById('modalTitle').textContent = d.title;
    document.getElementById('modalSub').textContent   = d.sub;
    document.getElementById('modalTags').innerHTML = d.tags.map(t =>
        '<div class="skill-tag">' +
        '<img src="' + t.img + '" alt="' + t.name + '" onerror="this.style.display=\'none\'">' +
        t.name + '</div>'
    ).join('');
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

function closeModalOnBg(e) {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ===== CONTACT FORM ===== */
document.addEventListener('DOMContentLoaded', function() {
    const form   = document.getElementById('contactForm');
    const btn    = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        btn.textContent = 'Sending…';
        btn.disabled    = true;
        status.className = 'form-status';
        status.style.display = 'none';

        try {
            const response = await fetch(form.action, {
                method : 'POST',
                body   : new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.className   = 'form-status success';
                status.textContent = '✅ Message sent! I\'ll get back to you soon.';
                form.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    status.className   = 'form-status error';
                    status.textContent = '❌ ' + data.errors.map(e => e.message).join(', ');
                } else { throw new Error(); }
            }
        } catch {
            status.className   = 'form-status error';
            status.textContent = '❌ Something went wrong. Email me at 6shivamchauhan@gmail.com';
        }

        btn.textContent = 'Submit Inquiry';
        btn.disabled    = false;
    });
});
