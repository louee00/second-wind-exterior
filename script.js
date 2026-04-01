if (
    window.location.hostname === 'www.secondwindexteriors.com' ||
    (
        window.location.hostname.endsWith('.secondwindexteriors.com') &&
        window.location.hostname !== 'secondwindexteriors.com'
    )
) {
    window.location.replace(`https://secondwindexteriors.com${window.location.pathname}${window.location.search}${window.location.hash}`);
}

const topbar = document.querySelector('.topbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-links a');

if (navToggle && topbar) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        topbar.classList.toggle('nav-open');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            topbar.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

