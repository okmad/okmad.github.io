document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });

        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    const osTabs = document.querySelectorAll('.os-tab');
    const osSections = document.querySelectorAll('.os-download-section');

    if (osTabs.length > 0 && osSections.length > 0) {
        osTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetOs = this.getAttribute('data-os');
                
                osTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                osSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetOs) {
                        section.classList.add('active');
                    }
                });
            });
        });
    }

    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', function() {
                    const isActive = item.classList.contains('active');
                    
                    faqItems.forEach(i => i.classList.remove('active'));
                    
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    const faqCategoryBtns = document.querySelectorAll('.faq-category-btn');

    if (faqCategoryBtns.length > 0) {
        faqCategoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                faqCategoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                faqItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    const faqSearchInput = document.getElementById('faq-search-input');

    if (faqSearchInput) {
        faqSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3');
                const answer = item.querySelector('.faq-answer');
                
                if (question && answer) {
                    const questionText = question.textContent.toLowerCase();
                    const answerText = answer.textContent.toLowerCase();
                    
                    if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    }

    const tutorialNav = document.querySelector('.tutorial-nav');
    
    if (tutorialNav) {
        const navLinks = tutorialNav.querySelectorAll('a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    const downloadButtons = document.querySelectorAll('.btn-download, .btn-download-small');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.includes('github.com')) {
                console.log('Download initiated:', href);
            }
        });
    });

    const animatedElements = document.querySelectorAll('.feature-card, .download-card, .quickstart-card, .stat-card, .changelog-item, .faq-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    header.style.transition = 'transform 0.3s ease';

    const versionBadge = document.querySelector('.version-badge-large');
    if (versionBadge) {
        versionBadge.style.cursor = 'pointer';
        versionBadge.addEventListener('click', function() {
            navigator.clipboard.writeText('v11.1.0').then(() => {
                const originalText = this.textContent;
                this.textContent = '已复制!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    }

    console.log('PeaZip中文官网已加载完成');
    console.log('当前版本: v11.1.0');
    console.log('域名: peazip.com.cn');
});