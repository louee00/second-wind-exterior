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

    quoteForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const buttonText = submitButton ? submitButton.textContent : '';

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        if (formStatus) {
            formStatus.textContent = 'Sending your request...';
            formStatus.classList.remove('is-error');
        }

        try {
            const response = await fetch(quoteForm.dataset.ajaxAction || quoteForm.action, {
                method: 'POST',
                body: new FormData(quoteForm),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const result = await response.json();

            if (result.success === 'false') {
                throw new Error('Request failed');
            }

            quoteForm.reset();
            window.location.href = quoteForm.dataset.next || 'thanks.html';
        } catch (error) {
            if (formStatus) {
                formStatus.textContent = 'There was a problem sending your request. The email service may be temporarily unavailable. Please try again.';
                formStatus.classList.add('is-error');
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = buttonText;
            }
        }
    });
}

