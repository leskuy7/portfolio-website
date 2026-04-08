document.addEventListener('DOMContentLoaded', () => {
    // ===== THEME TOGGLE =====
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');

    // Function to update icon
    const updateIcon = (theme) => {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateIcon(currentTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');

        // Enable transition only during theme switch
        document.body.classList.add('theme-transitioning');

        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateIcon('light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateIcon('dark');
        }

        // Remove transition class after animation completes
        setTimeout(() => document.body.classList.remove('theme-transitioning'), 350);
    });

    // ===== REVEAL ON SCROLL (native, replaces AOS) =====
    const revealEls = document.querySelectorAll('[data-aos]');
    if (revealEls.length && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
        revealEls.forEach(el => io.observe(el));
    } else {
        // Fallback: show everything immediately
        revealEls.forEach(el => el.classList.add('revealed'));
    }

    // Remove loading overlay immediately if still present
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) loadingOverlay.remove();

    // ===== SCROLL TO TOP =====
    const scrollTopBtn = document.getElementById('scroll-top');

    if (scrollTopBtn) {
        let scrollTicking = false;
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 300) {
                        scrollTopBtn.classList.add('visible');
                    } else {
                        scrollTopBtn.classList.remove('visible');
                    }
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== LANGUAGE TOGGLE =====
    const langToggleBtn = document.getElementById('lang-toggle');

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            // Mevcut dili çerezden oku
            const currentLang = document.cookie.replace(/(?:(?:^|.*;\s*)lang\s*=\s*([^;]*).*$)|^.*$/, '$1') || 'tr';
            const newLang = currentLang === 'tr' ? 'en' : 'tr';
            // Çereze yaz ve sayfayı yeniden yükle — sunucu doğru dilde render edecek
            document.cookie = `lang=${newLang};path=/;max-age=31536000;SameSite=Lax`;
            window.location.reload();
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== CLOSE NAVBAR ON CLICK OUTSIDE OR NAV LINK =====
    const navbarCollapse = document.getElementById('navbarNav');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // Close when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                // Use Bootstrap's collapse API for smoother close
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    navbarToggler.click();
                }
            }
        });
    });

    // Close menu when clicking theme or language toggle (on mobile)
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');

    [themeToggle, langToggle].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                if (window.innerWidth <= 991 && navbarCollapse.classList.contains('show')) {
                    setTimeout(() => {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        } else {
                            navbarToggler.click();
                        }
                    }, 200); // Small delay to let the action complete first
                }
            });
        }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (navbarCollapse.classList.contains('show') &&
            !navbarToggler.contains(e.target)) {
            // Check if click is directly on the overlay background (not on nav items)
            const navbarNav = document.querySelector('.navbar-nav');
            if (!navbarNav.contains(e.target)) {
                navbarToggler.click();
            }
        }
    });

    // ===== CONTACT FORM (AJAX) =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('contact-btn');
            const alertBox = document.getElementById('contact-alert');
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Gönderiliyor...';
            alertBox.style.display = 'none';

            try {
                const res = await fetch('/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await res.json();
                if (result.success) {
                    alertBox.className = 'mt-3 alert alert-success';
                    alertBox.textContent = 'Mesajınız başarıyla gönderildi!';
                    alertBox.style.display = 'block';
                    contactForm.reset();
                } else {
                    throw new Error(result.error || 'Bir hata oluştu.');
                }
            } catch (err) {
                alertBox.className = 'mt-3 alert alert-danger';
                alertBox.textContent = err.message || 'Mesaj gönderilemedi, lütfen tekrar deneyin.';
                alertBox.style.display = 'block';
            } finally {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Gönder';
            }
        });
    }
});
