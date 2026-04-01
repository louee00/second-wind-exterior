const gmailQuoteFormV3 = document.querySelector('#gmailQuoteFormV3');
const quoteButtonV3 = document.querySelector('#quoteButtonV3');

if (gmailQuoteFormV3 && quoteButtonV3) {
    const gmailFormStatusV3 = document.querySelector('#formStatus');

    const openGmailAndRedirect = (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (!gmailQuoteFormV3.reportValidity()) {
            return;
        }

        const name = gmailQuoteFormV3.querySelector('#name')?.value.trim() || '';
        const contact = gmailQuoteFormV3.querySelector('#contact')?.value.trim() || '';
        const preferredContact = gmailQuoteFormV3.querySelector('#preferredContact')?.value.trim() || '';
        const address = gmailQuoteFormV3.querySelector('#address')?.value.trim() || '';
        const service = gmailQuoteFormV3.querySelector('#service')?.value.trim() || '';
        const timeline = gmailQuoteFormV3.querySelector('#timeline')?.value.trim() || '';
        const message = gmailQuoteFormV3.querySelector('#message')?.value.trim() || '';
        const subject = gmailQuoteFormV3.querySelector('input[name="_subject"]')?.value || 'New Quote Request';
        const to = gmailQuoteFormV3.dataset.email || 'secondwindexteriors@gmail.com';
        const nextPage = gmailQuoteFormV3.dataset.next || 'thanks.html';
        const body = [
            'New Quote Request - Second Wind Exteriors',
            '',
            `Full name: ${name}`,
            `Phone or email: ${contact}`,
            `Preferred contact method: ${preferredContact}`,
            `Service address: ${address}`,
            `Service needed: ${service}`,
            `Preferred timeline: ${timeline}`,
            '',
            'Project details:',
            message || 'None provided.'
        ].join('\n');
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        quoteButtonV3.textContent = 'Opening Gmail...';

        if (gmailFormStatusV3) {
            gmailFormStatusV3.textContent = 'Opening Gmail in a new tab...';
            gmailFormStatusV3.classList.remove('is-error');
        }

        const gmailWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer');

        if (!gmailWindow) {
            if (gmailFormStatusV3) {
                gmailFormStatusV3.textContent = 'Please allow pop-ups for this site so Gmail can open, then try again.';
                gmailFormStatusV3.classList.add('is-error');
            }

            quoteButtonV3.textContent = 'Request Your Estimate';
            return;
        }

        if (gmailFormStatusV3) {
            gmailFormStatusV3.textContent = 'Redirecting to thank-you page...';
        }

        window.setTimeout(() => {
            window.location.href = nextPage;
        }, 300);
    };

    quoteButtonV3.addEventListener('click', openGmailAndRedirect);
    gmailQuoteFormV3.addEventListener('submit', openGmailAndRedirect, true);
}
