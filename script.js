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
const quoteForm = document.querySelector('#quoteForm');

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

if (quoteForm) {
    const submitButton = quoteForm.querySelector('button[type="submit"]');
    const formStatus = document.querySelector('#formStatus');

    quoteForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = quoteForm.querySelector('#name')?.value.trim() || '';
        const contact = quoteForm.querySelector('#contact')?.value.trim() || '';
        const address = quoteForm.querySelector('#address')?.value.trim() || '';
        const service = quoteForm.querySelector('#service')?.value.trim() || '';
        const message = quoteForm.querySelector('#message')?.value.trim() || '';
        const subject = quoteForm.querySelector('input[name="_subject"]')?.value || 'New Quote Request';
        const to = quoteForm.dataset.email || 'secondwindexteriors@gmail.com';
        const body = [
            'New Quote Request - Second Wind Exteriors',
            '',
            `Full name: ${name}`,
            `Phone or email: ${contact}`,
            `Service address: ${address}`,
            `Service needed: ${service}`,
            '',
            'Project details:',
            message || 'None provided.'
        ].join('\n');
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        if (submitButton) {
            submitButton.textContent = 'Opening Gmail...';
        }

        if (formStatus) {
            formStatus.textContent = 'Opening Gmail with your quote request...';
            formStatus.classList.remove('is-error');
        }

        window.location.href = gmailUrl;

        if (submitButton) {
            submitButton.textContent = 'Request Your Estimate';
        }
    });
}

if (!document.querySelector('.sticky-call')) {
    const stickyCall = document.createElement('a');
    stickyCall.className = 'sticky-call';
    stickyCall.href = 'tel:7073809830';
    stickyCall.textContent = 'Call 707-380-9830';
    document.body.appendChild(stickyCall);
}

