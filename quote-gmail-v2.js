const gmailQuoteForm = document.querySelector('#quoteForm');

if (gmailQuoteForm) {
    const gmailSubmitButton = gmailQuoteForm.querySelector('button[type="submit"]');
    const gmailFormStatus = document.querySelector('#formStatus');

    gmailQuoteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const name = gmailQuoteForm.querySelector('#name')?.value.trim() || '';
        const contact = gmailQuoteForm.querySelector('#contact')?.value.trim() || '';
        const address = gmailQuoteForm.querySelector('#address')?.value.trim() || '';
        const service = gmailQuoteForm.querySelector('#service')?.value.trim() || '';
        const message = gmailQuoteForm.querySelector('#message')?.value.trim() || '';
        const subject = gmailQuoteForm.querySelector('input[name="_subject"]')?.value || 'New Quote Request';
        const to = gmailQuoteForm.dataset.email || 'thesilent1yt@gmail.com';
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
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        if (gmailSubmitButton) {
            gmailSubmitButton.textContent = 'Opening Gmail...';
        }

        if (gmailFormStatus) {
            gmailFormStatus.textContent = 'Opening Gmail with your quote request...';
            gmailFormStatus.classList.remove('is-error');
        }

        window.location.assign(gmailUrl);
    }, true);
}
