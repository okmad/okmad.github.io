document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initFaqAccordion();
    initFaqCategories();
    initSmoothScroll();
    initVersionSelector();
    initDownloadTracking();
});

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

function initVersionSelector() {
    const versionDropdowns = document.querySelectorAll('.version-dropdown');
    
    versionDropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('change', function() {
            const selectedVersion = this.value;
            const downloadCard = this.closest('.download-card');
            const sourceButtons = downloadCard.querySelectorAll('.source-buttons a');
            
            sourceButtons.forEach(function(button) {
                const standardUrl = button.getAttribute('data-standard');
                const lt20Url = button.getAttribute('data-lt20');
                
                if (selectedVersion === 'lt20' && lt20Url) {
                    button.setAttribute('href', lt20Url);
                } else if (standardUrl) {
                    button.setAttribute('href', standardUrl);
                }
            });
        });
    });
}

function initDownloadTracking() {
    const downloadButtons = document.querySelectorAll('.download-card .source-buttons a');
    downloadButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            const downloadCard = this.closest('.download-card');
            const osName = downloadCard.querySelector('.os-info h2').textContent;
            const version = downloadCard.querySelector('.version-dropdown').value;
            const source = this.classList.contains('source-baidu') ? '百度网盘' : '夸克网盘';
            console.log('下载:', osName, version, source, new Date().toISOString());
        });
    });
}

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
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
}

function initFaqCategories() {
    const faqCategories = document.querySelectorAll('.faq-category');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqCategories.length > 0 && faqItems.length > 0) {
        faqCategories.forEach(function(category) {
            category.addEventListener('click', function() {
                const categoryValue = this.getAttribute('data-category');
                
                faqCategories.forEach(function(c) {
                    c.classList.remove('active');
                });
                this.classList.add('active');
                
                faqItems.forEach(function(item) {
                    if (categoryValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        const itemCategory = item.getAttribute('data-category');
                        if (itemCategory === categoryValue) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
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

function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .platform-card, .stat-card, .download-card, .changelog-item, .faq-item');
    
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

if ('IntersectionObserver' in window) {
    animateOnScroll();
}

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            showNotification('已复制到剪贴板');
        });
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('已复制到剪贴板');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('qBittorrent 网站已加载完成');
