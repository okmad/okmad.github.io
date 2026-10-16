/**
 * lovemo AI虚拟伴侣下载站 - 交互脚本
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initDownloadButton();
    initNavbarScroll();
});

/**
 * FAQ 手风琴效果
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // 切换当前项的激活状态
            const isActive = item.classList.contains('active');

            // 关闭所有其他项
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // 切换当前项的状态
            item.classList.toggle('active');

            // 更新图标
            const icon = item.querySelector('.faq-icon');
            if (item.classList.contains('active')) {
                icon.textContent = '−';
            } else {
                icon.textContent = '+';
            }
        });
    });
}

/**
 * 平滑滚动
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // 跳过空链接
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                // 关闭移动端菜单
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }

                // 平滑滚动到目标
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 滚动动画
 */
function initScrollAnimations() {
    // 监听滚动事件
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 为需要动画的元素添加初始样式和观察
    const animatedElements = document.querySelectorAll('.feature-card, .review-card, .step-item');

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/**
 * 下载按钮处理
 */
function initDownloadButton() {
    const downloadLink = document.getElementById('download-link');

    if (downloadLink) {
        downloadLink.addEventListener('click', function(e) {
            // 如果有实际下载链接，允许正常跳转
            if (this.href && !this.href.endsWith('#')) {
                // 显示下载提示
                showNotification('正在跳转到下载页面...');
            }
        });
    }
}

/**
 * 显示通知提示
 */
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">ℹ️</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        z-index: 10000;
        animation: slideDown 0.3s ease;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    `;

    // 添加到页面
    document.body.appendChild(notification);

    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * 页面加载完成后的动画
 */
window.addEventListener('load', function() {
    // 移除加载状态（如果有）
    document.body.classList.remove('loading');

    // 为页面元素添加渐入效果
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
    }
});

// 添加动画关键帧（通过 JavaScript 动态添加）
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

/**
 * 性能优化：防抖函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 导航栏交互
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

/**
 * 导航栏滚动效果
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }
        });
    }
}

console.log('lovemo AI虚拟伴侣下载站已加载完成');