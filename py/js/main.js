document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initFaqAccordion();
    initFaqCategories();
    initFaqSearch();
    initOsTabs();
    initSmoothScroll();
    initAnimateOnScroll();
});

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
}

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                faqItems.forEach(function(faqItem) {
                    faqItem.classList.remove('active');
                });

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

function initFaqCategories() {
    const faqCategoryBtns = document.querySelectorAll('.faq-category-btn');
    const faqItems = document.querySelectorAll('.faq-item');

    faqCategoryBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            faqCategoryBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');

            faqItems.forEach(function(item) {
                if (category === 'all') {
                    item.style.display = 'block';
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

function initFaqSearch() {
    const searchInput = document.getElementById('faq-search-input');

    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const keyword = this.value.toLowerCase().trim();
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(function(item) {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

            if (keyword === '' || question.indexOf(keyword) !== -1 || answer.indexOf(keyword) !== -1) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

function initOsTabs() {
    const osTabs = document.querySelectorAll('.os-tab');
    const osSections = document.querySelectorAll('.os-download-section');

    osTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            const targetOs = this.getAttribute('data-os');

            osTabs.forEach(function(t) {
                t.classList.remove('active');
            });
            this.classList.add('active');

            osSections.forEach(function(section) {
                if (section.id === targetOs) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initAnimateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .stat-card, .download-card, .quickstart-card, .faq-item, .feature-item');

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

console.log('PyCharm + Python 下载站已加载完成');
