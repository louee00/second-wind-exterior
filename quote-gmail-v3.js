const gmailQuoteFormV3 = document.querySelector('#quoteForm');

if (gmailQuoteFormV3) {
    const gmailSubmitButtonV3 = gmailQuoteFormV3.querySelector('button[type="submit"]');
    const gmailFormStatusV3 = document.querySelector('#formStatus');

    gmailQuoteFormV3.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const name = gmailQuoteFormV3.querySelector('#name')?.value.trim() || '';
        const contact = gmailQuoteFormV3.querySelector('#contact')?.value.trim() || '';
        const address = gmailQuoteFormV3.querySelector('#address')?.value.trim() || '';
        const service = gmailQuoteFormV3.querySelector('#service')?.value.trim() || '';
        const message = gmailQuoteFormV3.querySelector('#message')?.value.trim() || '';
        const subject = gmailQuoteFormV3.querySelector('input[name="_subject"]')?.value || 'New Quote Request';
        const to = gmailQuoteFormV3.dataset.email || 'secondwindexteriors@gmail.com';
        const nextPage = gmailQuoteFormV3.dataset.next || 'thanks.html';
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

        if (gmailSubmitButtonV3) {
            gmailSubmitButtonV3.textContent = 'Opening Gmail...';
        }

        if (gmailFormStatusV3) {
            gmailFormStatusV3.textContent = 'Opening Gmail in a new tab...';
            gmailFormStatusV3.classList.remove('is-error');
        }

        window.open(gmailUrl, '_blank', 'noopener,noreferrer');
        window.location.assign(nextPage);
    }, true);
}
