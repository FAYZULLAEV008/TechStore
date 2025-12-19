/**
 * UI Components and Event Handlers
 * Contains event listeners and UI component initialization
 */

// DOM Elements
const elements = {
    // Navigation
    hamburgerBtn: document.getElementById('hamburgerBtn'),
    navMenu: document.getElementById('navMenu'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Theme toggle
    themeToggle: document.getElementById('themeToggle'),
    
    // Language toggle
    languageToggle: document.getElementById('languageToggle'),
    
    // User buttons
    userBtn: document.getElementById('userBtn'),
    cartBtn: document.getElementById('cartBtn'),
    
    // Category filter
    categoryFilter: document.getElementById('categoryFilter'),
    
    // Forms
    contactForm: document.getElementById('contactForm'),
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    
    // Modal close buttons
    closeLoginModal: document.getElementById('closeLoginModal'),
    closeRegisterModal: document.getElementById('closeRegisterModal'),
    closeProductModal: document.getElementById('closeProductModal'),
    closeCartModal: document.getElementById('closeCartModal'),
    
    // Modal show buttons
    showRegisterModal: document.getElementById('showRegisterModal'),
    showLoginModal: document.getElementById('showLoginModal'),
    
    // Cart buttons
    continueShoppingBtn: document.getElementById('continueShoppingBtn'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    
    // Language switcher buttons
    langButtons: document.querySelectorAll('.lang-btn')
};

// Initialize all components
const Components = {
    init: () => {
        Components.initNavigation();
        Components.initThemeToggle();
        Components.initLanguageToggle();
        Components.initUserButtons();
        Components.initCategoryFilter();
        Components.initForms();
        Components.initModalHandlers();
        Components.initCartHandlers();
        Components.initLanguageSwitcher();
        Components.initSmoothScrolling();
    },

    // Navigation initialization
    initNavigation: () => {
        // Hamburger menu toggle
        if (elements.hamburgerBtn && elements.navMenu) {
            elements.hamburgerBtn.addEventListener('click', () => {
                elements.hamburgerBtn.classList.toggle('active');
                elements.navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (elements.navMenu && elements.navMenu.classList.contains('active')) {
                if (!e.target.closest('.nav-container') && !e.target.closest('.hamburger')) {
                    elements.hamburgerBtn.classList.remove('active');
                    elements.navMenu.classList.remove('active');
                }
            }
        });

        // Close mobile menu when clicking a link
        if (elements.navLinks) {
            elements.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (elements.navMenu.classList.contains('active')) {
                        elements.hamburgerBtn.classList.remove('active');
                        elements.navMenu.classList.remove('active');
                    }
                    
                    // Update active nav link
                    elements.navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                });
            });
        }
    },

    // Theme toggle initialization
    initThemeToggle: () => {
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', () => {
                Utils.ThemeManager.toggle();
            });
        }
    },

    // Language toggle initialization
    initLanguageToggle: () => {
        if (elements.languageToggle) {
            elements.languageToggle.addEventListener('click', () => {
                const currentLang = Utils.LanguageManager.currentLang;
                const langs = ['en', 'ru', 'uz'];
                const currentIndex = langs.indexOf(currentLang);
                const nextIndex = (currentIndex + 1) % langs.length;
                Utils.LanguageManager.setLanguage(langs[nextIndex]);
            });
        }
    },

    // User buttons initialization
    initUserButtons: () => {
        // User button (login/register)
        if (elements.userBtn) {
            elements.userBtn.addEventListener('click', () => {
                if (Data.UserManager.isLoggedIn()) {
                    // Show user profile/dashboard
                    Utils.Notifications.show('info', `Welcome back, ${Data.UserManager.getCurrentUser().name}!`);
                } else {
                    // Show login modal
                    Utils.Modal.open('loginModal');
                }
            });
        }

        // Cart button
        if (elements.cartBtn) {
            elements.cartBtn.addEventListener('click', () => {
                Utils.CartManager.renderCart();
                Utils.Modal.open('cartModal');
            });
        }
    },

    // Category filter initialization
    initCategoryFilter: () => {
        if (elements.categoryFilter) {
            elements.categoryFilter.addEventListener('click', (e) => {
                if (e.target.classList.contains('category-btn')) {
                    const category = e.target.dataset.category;
                    Data.ProductManager.filterByCategory(category);
                }
            });
        }
    },

    // Form initialization
    initForms: () => {
        // Contact form
        if (elements.contactForm) {
            elements.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const rules = {
                    contactName: { required: true },
                    contactEmail: { required: true, email: true },
                    contactMessage: { required: true }
                };
                
                if (Utils.FormValidator.validateForm('contactForm', rules)) {
                    // Simulate form submission
                    Utils.LoadingManager.show();
                    
                    setTimeout(() => {
                        Utils.LoadingManager.hide();
                        
                        const formData = {
                            name: document.getElementById('contactName').value,
                            email: document.getElementById('contactEmail').value,
                            message: document.getElementById('contactMessage').value,
                            timestamp: new Date().toISOString()
                        };
                        
                        // Save to localStorage
                        const messages = Utils.Storage.get('contactMessages', []);
                        messages.push(formData);
                        Utils.Storage.set('contactMessages', messages);
                        
                        // Show success message
                        Utils.Notifications.show(
                            'success', 
                            Utils.LanguageManager.translations[Utils.LanguageManager.currentLang].messageSent
                        );
                        
                        // Reset form
                        elements.contactForm.reset();
                        Utils.FormValidator.clearErrors('contactForm');
                        
                        // Close modal if open
                        Utils.Modal.closeAll();
                    }, 1500);
                }
            });
        }

        // Login form
        if (elements.loginForm) {
            elements.loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const rules = {
                    loginEmail: { required: true, email: true },
                    loginPassword: { required: true }
                };
                
                if (Utils.FormValidator.validateForm('loginForm', rules)) {
                    const email = document.getElementById('loginEmail').value;
                    const password = document.getElementById('loginPassword').value;
                    
                    const result = Data.UserManager.login(email, password);
                    
                    if (result.success) {
                        Utils.Notifications.show(
                            'success',
                            Utils.LanguageManager.translations[Utils.LanguageManager.currentLang].loginSuccess
                        );
                        Utils.Modal.close('loginModal');
                        elements.loginForm.reset();
                        Utils.FormValidator.clearErrors('loginForm');
                    } else {
                        Utils.Notifications.show('error', result.message);
                    }
                }
            });
        }

        // Register form
        if (elements.registerForm) {
            elements.registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const rules = {
                    registerName: { required: true },
                    registerEmail: { required: true, email: true },
                    registerPassword: { required: true, password: true },
                    registerConfirmPassword: { required: true, match: 'registerPassword' }
                };
                
                if (Utils.FormValidator.validateForm('registerForm', rules)) {
                    const name = document.getElementById('registerName').value;
                    const email = document.getElementById('registerEmail').value;
                    const password = document.getElementById('registerPassword').value;
                    
                    const result = Data.UserManager.register(name, email, password);
                    
                    if (result.success) {
                        Utils.Notifications.show(
                            'success',
                            Utils.LanguageManager.translations[Utils.LanguageManager.currentLang].registerSuccess
                        );
                        Utils.Modal.close('registerModal');
                        elements.registerForm.reset();
                        Utils.FormValidator.clearErrors('registerForm');
                    } else {
                        Utils.Notifications.show('error', result.message);
                    }
                }
            });
        }
    },

    // Modal handlers initialization
    initModalHandlers: () => {
        // Close buttons
        if (elements.closeLoginModal) {
            elements.closeLoginModal.addEventListener('click', () => {
                Utils.Modal.close('loginModal');
            });
        }
        
        if (elements.closeRegisterModal) {
            elements.closeRegisterModal.addEventListener('click', () => {
                Utils.Modal.close('registerModal');
            });
        }
        
        if (elements.closeProductModal) {
            elements.closeProductModal.addEventListener('click', () => {
                Utils.Modal.close('productModal');
            });
        }
        
        if (elements.closeCartModal) {
            elements.closeCartModal.addEventListener('click', () => {
                Utils.Modal.close('cartModal');
            });
        }
        
        // Show register modal from login modal
        if (elements.showRegisterModal) {
            elements.showRegisterModal.addEventListener('click', (e) => {
                e.preventDefault();
                Utils.Modal.close('loginModal');
                Utils.Modal.open('registerModal');
            });
        }
        
        // Show login modal from register modal
        if (elements.showLoginModal) {
            elements.showLoginModal.addEventListener('click', (e) => {
                e.preventDefault();
                Utils.Modal.close('registerModal');
                Utils.Modal.open('loginModal');
            });
        }
    },

    // Cart handlers initialization
    initCartHandlers: () => {
        // Continue shopping button
        if (elements.continueShoppingBtn) {
            elements.continueShoppingBtn.addEventListener('click', () => {
                Utils.Modal.close('cartModal');
            });
        }
        
        // Checkout button
        if (elements.checkoutBtn) {
            elements.checkoutBtn.addEventListener('click', () => {
                if (Utils.CartManager.items.length === 0) {
                    Utils.Notifications.show('warning', 'Your cart is empty');
                    return;
                }
                
                if (!Data.UserManager.isLoggedIn()) {
                    Utils.Modal.close('cartModal');
                    Utils.Modal.open('loginModal');
                    Utils.Notifications.show('info', 'Please login to checkout');
                    return;
                }
                
                // Simulate checkout process
                Utils.LoadingManager.show();
                
                setTimeout(() => {
                    Utils.LoadingManager.hide();
                    
                    // Create order
                    const order = {
                        id: Data.Orders.length + 1,
                        userId: Data.UserManager.getCurrentUser().id,
                        items: [...Utils.CartManager.items],
                        total: Utils.CartManager.getTotal(),
                        status: 'processing',
                        date: new Date().toISOString().split('T')[0],
                        shippingAddress: '123 Tech Street, Digital City'
                    };
                    
                    // Save order
                    Data.Orders.push(order);
                    Utils.Storage.set('orders', Data.Orders);
                    
                    // Clear cart
                    Utils.CartManager.clearCart();
                    Utils.CartManager.renderCart();
                    
                    // Close cart modal
                    Utils.Modal.close('cartModal');
                    
                    // Show success message
                    Utils.Notifications.show('success', 'Order placed successfully! Order ID: ' + order.id);
                    
                    // Update cart count
                    Utils.CartManager.updateCartCount();
                }, 2000);
            });
        }
    },

    // Language switcher initialization
    initLanguageSwitcher: () => {
        if (elements.langButtons) {
            elements.langButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const lang = btn.dataset.lang;
                    Utils.LanguageManager.setLanguage(lang);
                });
            });
        }
    },

    // Smooth scrolling initialization
    initSmoothScrolling: () => {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    if (elements.navMenu && elements.navMenu.classList.contains('active')) {
                        elements.hamburgerBtn.classList.remove('active');
                        elements.navMenu.classList.remove('active');
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    if (elements.navLinks) {
                        elements.navLinks.forEach(link => {
                            link.classList.toggle('active', link.getAttribute('href') === targetId);
                        });
                    }
                }
            });
        });
    },

    // Update UI based on user authentication
    updateAuthUI: () => {
        if (Data.UserManager.isLoggedIn()) {
            const user = Data.UserManager.getCurrentUser();
            
            // Update user button
            if (elements.userBtn) {
                const icon = elements.userBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-user-check';
                }
                elements.userBtn.title = `Logged in as ${user.name}`;
            }
            
            // Update user name in UI if there's a user menu
            const userMenu = document.querySelector('.user-menu');
            if (userMenu) {
                userMenu.querySelector('.user-name').textContent = user.name;
            }
        } else {
            // Reset user button
            if (elements.userBtn) {
                const icon = elements.userBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-user';
                }
                elements.userBtn.title = 'User Account';
            }
        }
    },

    // Initialize error handling
    initErrorHandling: () => {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            Utils.Notifications.show('error', 'An unexpected error occurred. Please try again.');
        });

        // Unhandled promise rejection
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            Utils.Notifications.show('error', 'An unexpected error occurred. Please try again.');
        });

        // Network error handling
        window.addEventListener('offline', () => {
            Utils.Notifications.show('warning', 'You are offline. Some features may not work.');
        });

        window.addEventListener('online', () => {
            Utils.Notifications.show('success', 'You are back online!');
        });
    },

    // Initialize performance monitoring
    initPerformanceMonitoring: () => {
        // Log page load time
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
            
            if (loadTime > 3000) {
                console.warn('Page load time is slow. Consider optimizing assets.');
            }
        });

        // Monitor largest contentful paint
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('LCP:', entry.startTime, entry);
            }
        });

        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
};

// Export components
window.Components = Components;