if (window.location.hostname === 'www.secondwindexteriors.com') {
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

const quoteForm = document.querySelector('#quoteForm');
const quoteEmail = 'secondwindexteriors@gmail.com';

if (quoteForm) {
    quoteForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(quoteForm);
        const name = formData.get('name')?.toString().trim() || '';
        const contact = formData.get('contact')?.toString().trim() || '';
        const address = formData.get('address')?.toString().trim() || '';
        const service = formData.get('service')?.toString().trim() || '';
        const message = formData.get('message')?.toString().trim() || '';

        const emailBody = [
            'Hello Second Wind Exteriors, I would like a quote.',
            name ? `Name: ${name}` : '',
            contact ? `Contact: ${contact}` : '',
            address ? `Address: ${address}` : '',
            service ? `Service: ${service}` : '',
            message ? `Project details: ${message}` : ''
        ]
            .filter(Boolean)
            .join('\n');

        const emailSubject = service
            ? `Quote Request - ${service}`
            : 'Quote Request - Second Wind Exteriors';

        window.location.href = `mailto:${quoteEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    });
}
