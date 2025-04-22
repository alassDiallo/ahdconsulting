document.addEventListener('DOMContentLoaded', () => {
    // Navigation mobile
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .service-card, .expertise-item').forEach(element => {
        observer.observe(element);
    });

    // Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Simple validation
            if (!data.email || !data.message) {
                alert('Veuillez remplir tous les champs requis.');
                return;
            }

            try {
                // Here you would typically send the data to your server
                // For now, we'll just show a success message
                alert('Merci pour votre message ! Nous vous contacterons bientôt.');
                contactForm.reset();
            } catch (error) {
                console.error('Erreur lors de l\'envoi du message:', error);
                alert('Une erreur est survenue. Veuillez réessayer plus tard.');
            }
        });
    }

    // Add scroll to top button functionality
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scroll-top';
    scrollButton.innerHTML = '↑';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 15px;
        background: var(--secondary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        font-size: 20px;
        z-index: 1000;
        transition: opacity 0.3s, transform 0.3s;
    `;
    document.body.appendChild(scrollButton);

    // Show/hide scroll button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
            setTimeout(() => scrollButton.style.opacity = '1', 0);
        } else {
            scrollButton.style.opacity = '0';
            setTimeout(() => scrollButton.style.display = 'none', 300);
        }
    });

    // Scroll to top when button is clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 