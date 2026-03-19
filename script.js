/* ========================================
   SP Consultancy Services - JavaScript
   ======================================== */

// --- Mobile Navigation Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = hamburger.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// --- Header scroll effect ---
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- Active nav link highlight on scroll ---
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNav);

// --- Scroll Reveal Animation ---
function revealOnScroll() {
    const reveals = document.querySelectorAll('.service-card, .vm-card, .contact-item, .about-text, .vision-mission, .enrollment-info, .enrollment-form-card, .contact-form-card');
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('revealed');
        }
    });
}

// Add reveal styles dynamically
const style = document.createElement('style');
style.textContent = `
    .service-card, .vm-card, .contact-item, .about-text, .vision-mission,
    .enrollment-info, .enrollment-form-card, .contact-form-card {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .service-card.revealed, .vm-card.revealed, .contact-item.revealed,
    .about-text.revealed, .vision-mission.revealed,
    .enrollment-info.revealed, .enrollment-form-card.revealed, .contact-form-card.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    .service-card:nth-child(2) { transition-delay: 0.1s; }
    .service-card:nth-child(3) { transition-delay: 0.2s; }
    .service-card:nth-child(4) { transition-delay: 0.3s; }
    .service-card:nth-child(5) { transition-delay: 0.4s; }
    .service-card:nth-child(6) { transition-delay: 0.5s; }
    .service-card:nth-child(7) { transition-delay: 0.6s; }
`;
document.head.appendChild(style);

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// --- Smooth scroll for all anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// --- Form Submission Handler (AJAX with Formspree) ---
function handleFormSubmit(formId, successId) {
    const form = document.getElementById(formId);
    const successDiv = document.getElementById(successId);

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                form.style.display = 'none';
                successDiv.style.display = 'block';
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            // Show a friendly alert if Formspree is not yet configured
            alert('Thank you! To enable email delivery, please set up your free Formspree account and replace YOUR_FORM_ID in index.html. Visit https://formspree.io to get started.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Initialize form handlers
handleFormSubmit('contactForm', 'contactSuccess');
handleFormSubmit('enrollmentForm', 'enrollmentSuccess');
