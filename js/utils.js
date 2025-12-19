/**
 * Utility Functions
 * Reusable helper functions for the application
 */

// DOM Elements Cache
const DOM = {
    body: document.body,
    loadingOverlay: document.getElementById('loadingOverlay'),
    toastContainer: document.getElementById('toastContainer'),
    modalOverlay: document.getElementById('modalOverlay'),
    searchInput: document.getElementById('searchInput'),
    searchResults: document.getElementById('searchResults'),
    productsGrid: document.getElementById('productsGrid'),
    pagination: document.getElementById('pagination'),
    cartCount: document.querySelector('.cart-count'),
    cartItems: document.getElementById('cartItems'),
    cartEmpty: document.getElementById('cartEmpty'),
    cartSummary: document.getElementById('cartSummary')
};

// Local Storage Manager
const Storage = {
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    },

    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    },

    remove: (key) => {
        localStorage.removeItem(key);
    },

    clear: () => {
        localStorage.clear();
    }
};

// Theme Manager
const ThemeManager = {
    init: () => {
        const savedTheme = Storage.get('theme', 'light');
        DOM.body.setAttribute('data-theme', savedTheme);
        ThemeManager.updateThemeIcon(savedTheme);
    },

    toggle: () => {
        const currentTheme = DOM.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        DOM.body.setAttribute('data-theme', newTheme);
        Storage.set('theme', newTheme);
        ThemeManager.updateThemeIcon(newTheme);
        
        Notifications.show('success', `Switched to ${newTheme} mode`);
    },

    updateThemeIcon: (theme) => {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }
};

// Language Manager
const LanguageManager = {
    currentLang: Storage.get('language', 'en'),
    translations: {},

    init: async () => {
        // Load translations
        await LanguageManager.loadTranslations();
        
        // Set initial language
        LanguageManager.setLanguage(LanguageManager.currentLang);
        
        // Update language toggle button
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            const flagSpan = languageToggle.querySelector('.language-flag');
            if (flagSpan) {
                flagSpan.textContent = LanguageManager.currentLang.toUpperCase();
            }
        }
    },

    loadTranslations: async () => {
        // In a real application, this would fetch translations from a server
        // For now, we'll define them inline
        LanguageManager.translations = {
            en: {
                // Navigation
                'home': 'Home',
                'products': 'Products',
                'about': 'About',
                'contact': 'Contact',
                
                // Hero
                'heroTitle': 'Welcome to <span class="highlight">TechStore</span>',
                'heroSubtitle': 'Discover the latest tech products with amazing deals and premium quality',
                'shopNow': 'Shop Now',
                'learnMore': 'Learn More',
                
                // Products
                'featuredProducts': 'Featured Products',
                'browseCollection': 'Browse our curated collection of premium tech products',
                'allProducts': 'All Products',
                'electronics': 'Electronics',
                'computers': 'Computers',
                'phones': 'Phones',
                'accessories': 'Accessories',
                
                // About
                'aboutTitle': 'About TechStore',
                'aboutText': 'We are a leading tech retailer providing the latest electronics, computers, and accessories with exceptional customer service and competitive prices since 2010.',
                'productsStat': 'Products',
                'customersStat': 'Customers',
                'brandsStat': 'Brands',
                'supportStat': 'Support',
                
                // Contact
                'contactTitle': 'Contact Us',
                'contactSubtitle': 'Get in touch with our team',
                'yourName': 'Your Name',
                'yourEmail': 'Your Email',
                'yourMessage': 'Your Message',
                'sendMessage': 'Send Message',
                
                // Footer
                'footerText': 'Your trusted tech partner for quality products and exceptional service.',
                'quickLinks': 'Quick Links',
                'support': 'Support',
                'contactInfo': 'Contact Info',
                'copyright': '© 2024 TechStore. All rights reserved.',
                
                // Search
                'searchPlaceholder': 'Search products...',
                'noResults': 'No products found matching your search.',
                
                // Product Actions
                'viewDetails': 'View Details',
                'addToCart': 'Add to Cart',
                'buyNow': 'Buy Now',
                
                // Modal
                'signIn': 'Sign In',
                'createAccount': 'Create Account',
                'fullName': 'Full Name',
                'email': 'Email',
                'password': 'Password',
                'confirmPassword': 'Confirm Password',
                'dontHaveAccount': 'Don\'t have an account?',
                'alreadyHaveAccount': 'Already have an account?',
                'registerHere': 'Register',
                'signInHere': 'Sign In',
                
                // Cart
                'shoppingCart': 'Shopping Cart',
                'cartEmpty': 'Your cart is empty',
                'continueShopping': 'Continue Shopping',
                'checkout': 'Checkout',
                'subtotal': 'Subtotal',
                'tax': 'Tax',
                'total': 'Total',
                'remove': 'Remove',
                'quantity': 'Quantity',
                
                // Notifications
                'addedToCart': 'Product added to cart',
                'removedFromCart': 'Product removed from cart',
                'cartUpdated': 'Cart updated',
                'messageSent': 'Message sent successfully',
                'loginSuccess': 'Logged in successfully',
                'registerSuccess': 'Account created successfully',
                'searchCleared': 'Search cleared'
            },
            
            ru: {
                // Navigation
                'home': 'Главная',
                'products': 'Товары',
                'about': 'О нас',
                'contact': 'Контакты',
                
                // Hero
                'heroTitle': 'Добро пожаловать в <span class="highlight">TechStore</span>',
                'heroSubtitle': 'Откройте для себя последние технические продукты с удивительными предложениями и премиальным качеством',
                'shopNow': 'Купить сейчас',
                'learnMore': 'Узнать больше',
                
                // Products
                'featuredProducts': 'Рекомендуемые товары',
                'browseCollection': 'Просмотрите нашу подборку премиальных технических продуктов',
                'allProducts': 'Все товары',
                'electronics': 'Электроника',
                'computers': 'Компьютеры',
                'phones': 'Телефоны',
                'accessories': 'Аксессуары',
                
                // About
                'aboutTitle': 'О TechStore',
                'aboutText': 'Мы являемся ведущим ритейлером техники, предоставляющим последние модели электроники, компьютеров и аксессуаров с исключительным обслуживанием клиентов и конкурентоспособными ценами с 2010 года.',
                'productsStat': 'Товары',
                'customersStat': 'Клиенты',
                'brandsStat': 'Бренды',
                'supportStat': 'Поддержка',
                
                // Contact
                'contactTitle': 'Свяжитесь с нами',
                'contactSubtitle': 'Свяжитесь с нашей командой',
                'yourName': 'Ваше имя',
                'yourEmail': 'Ваш email',
                'yourMessage': 'Ваше сообщение',
                'sendMessage': 'Отправить сообщение',
                
                // Footer
                'footerText': 'Ваш надежный технический партнер для качественных продуктов и исключительного сервиса.',
                'quickLinks': 'Быстрые ссылки',
                'support': 'Поддержка',
                'contactInfo': 'Контактная информация',
                'copyright': '© 2024 TechStore. Все права защищены.',
                
                // Search
                'searchPlaceholder': 'Поиск товаров...',
                'noResults': 'Товары по вашему запросу не найдены.',
                
                // Product Actions
                'viewDetails': 'Подробнее',
                'addToCart': 'В корзину',
                'buyNow': 'Купить сейчас',
                
                // Modal
                'signIn': 'Войти',
                'createAccount': 'Создать аккаунт',
                'fullName': 'Полное имя',
                'email': 'Email',
                'password': 'Пароль',
                'confirmPassword': 'Подтвердите пароль',
                'dontHaveAccount': 'Нет аккаунта?',
                'alreadyHaveAccount': 'Уже есть аккаунт?',
                'registerHere': 'Зарегистрироваться',
                'signInHere': 'Войти',
                
                // Cart
                'shoppingCart': 'Корзина покупок',
                'cartEmpty': 'Ваша корзина пуста',
                'continueShopping': 'Продолжить покупки',
                'checkout': 'Оформить заказ',
                'subtotal': 'Промежуточный итог',
                'tax': 'Налог',
                'total': 'Итого',
                'remove': 'Удалить',
                'quantity': 'Количество',
                
                // Notifications
                'addedToCart': 'Товар добавлен в корзину',
                'removedFromCart': 'Товар удален из корзины',
                'cartUpdated': 'Корзина обновлена',
                'messageSent': 'Сообщение отправлено успешно',
                'loginSuccess': 'Вход выполнен успешно',
                'registerSuccess': 'Аккаунт создан успешно',
                'searchCleared': 'Поиск очищен'
            },
            
            uz: {
                // Navigation
                'home': 'Bosh sahifa',
                'products': 'Mahsulotlar',
                'about': 'Biz haqimizda',
                'contact': 'Aloqa',
                
                // Hero
                'heroTitle': '<span class="highlight">TechStore</span>\'ga xush kelibsiz',
                'heroSubtitle': 'Ajoyib takliflar va yuqori sifatli eng so\'nggi texnika mahsulotlarini kashf eting',
                'shopNow': 'Hoziroq xarid qiling',
                'learnMore': 'Ko\'proq ma\'lumot',
                
                // Products
                'featuredProducts': 'Tavsiya etilgan mahsulotlar',
                'browseCollection': 'Yuqori sifatli texnika mahsulotlarimizning tanlangan kolleksiyasini ko\'rib chiqing',
                'allProducts': 'Barcha mahsulotlar',
                'electronics': 'Elektronika',
                'computers': 'Kompyuterlar',
                'phones': 'Telefonlar',
                'accessories': 'Aksessuarlar',
                
                // About
                'aboutTitle': 'TechStore haqida',
                'aboutText': 'Biz 2010 yildan beri eng so\'nggi elektronika, kompyuterlar va aksessuarlarni a\'lo mijozlar xizmati va raqobatbardosh narxlar bilan taqdim etuvchi etakchi texnika sotuvchisimiz.',
                'productsStat': 'Mahsulotlar',
                'customersStat': 'Mijozlar',
                'brandsStat': 'Brendlar',
                'supportStat': 'Qo\'llab-quvvatlash',
                
                // Contact
                'contactTitle': 'Biz bilan bog\'laning',
                'contactSubtitle': 'Bizning jamoamiz bilan aloqa qiling',
                'yourName': 'Ismingiz',
                'yourEmail': 'Elektron pochtangiz',
                'yourMessage': 'Xabaringiz',
                'sendMessage': 'Xabarni yuborish',
                
                // Footer
                'footerText': 'Sifatli mahsulotlar va a\'lo xizmat uchun ishonchli texnika hamkoringiz.',
                'quickLinks': 'Tezkor havolalar',
                'support': 'Yordam',
                'contactInfo': 'Aloqa ma\'lumotlari',
                'copyright': '© 2024 TechStore. Barcha huquqlar himoyalangan.',
                
                // Search
                'searchPlaceholder': 'Mahsulotlarni qidirish...',
                'noResults': 'Qidiruvingizga mos mahsulotlar topilmadi.',
                
                // Product Actions
                'viewDetails': 'Batafsil',
                'addToCart': 'Savatchaga qo\'shish',
                'buyNow': 'Hoziroq sotib olish',
                
                // Modal
                'signIn': 'Kirish',
                'createAccount': 'Hisob yaratish',
                'fullName': 'To\'liq ism',
                'email': 'Elektron pochta',
                'password': 'Parol',
                'confirmPassword': 'Parolni tasdiqlash',
                'dontHaveAccount': 'Hisobingiz yo\'qmi?',
                'alreadyHaveAccount': 'Allaqachon hisobingiz bormi?',
                'registerHere': 'Ro\'yxatdan o\'tish',
                'signInHere': 'Kirish',
                
                // Cart
                'shoppingCart': 'Savatcha',
                'cartEmpty': 'Savatchangiz bo\'sh',
                'continueShopping': 'Xaridlarni davom ettirish',
                'checkout': 'Buyurtma berish',
                'subtotal': 'Oraliq summa',
                'tax': 'Soliq',
                'total': 'Jami',
                'remove': 'O\'chirish',
                'quantity': 'Miqdor',
                
                // Notifications
                'addedToCart': 'Mahsulot savatchaga qo\'shildi',
                'removedFromCart': 'Mahsulot savatchadan o\'chirildi',
                'cartUpdated': 'Savatcha yangilandi',
                'messageSent': 'Xabar muvaffaqiyatli yuborildi',
                'loginSuccess': 'Muvaffaqiyatli kirdingiz',
                'registerSuccess': 'Hisob muvaffaqiyatli yaratildi',
                'searchCleared': 'Qidiruv tozalandi'
            }
        };
    },

    setLanguage: (lang) => {
        if (!LanguageManager.translations[lang]) return;
        
        LanguageManager.currentLang = lang;
        Storage.set('language', lang);
        
        // Update all translatable elements
        LanguageManager.updatePageContent();
        
        // Update language toggle
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            const flagSpan = languageToggle.querySelector('.language-flag');
            if (flagSpan) {
                flagSpan.textContent = lang.toUpperCase();
            }
        }
        
        // Update footer language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        Notifications.show('success', `Language switched to ${lang.toUpperCase()}`);
    },

    updatePageContent: () => {
        const lang = LanguageManager.currentLang;
        const t = LanguageManager.translations[lang];
        
        // Update navigation
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (t[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = t[key];
                } else {
                    element.innerHTML = t[key];
                }
            }
        });
        
        // Update page content
        const elementsToUpdate = [
            { selector: '.hero-title', key: 'heroTitle' },
            { selector: '.hero-subtitle', key: 'heroSubtitle' },
            { selector: '.hero-btns .btn-primary', key: 'shopNow' },
            { selector: '.hero-btns .btn-secondary', key: 'learnMore' },
            { selector: '.section-title', key: 'featuredProducts' },
            { selector: '.section-subtitle', key: 'browseCollection' },
            { selector: '.about-title', key: 'aboutTitle' },
            { selector: '.about-text', key: 'aboutText' },
            { selector: '.contact-title', key: 'contactTitle' },
            { selector: '.contact-subtitle', key: 'contactSubtitle' },
            { selector: '#searchInput', key: 'searchPlaceholder' },
            { selector: '#contactName', key: 'yourName' },
            { selector: '#contactEmail', key: 'yourEmail' },
            { selector: '#contactMessage', key: 'yourMessage' },
            { selector: '#contactForm .btn', key: 'sendMessage' }
        ];
        
        elementsToUpdate.forEach(({ selector, key }) => {
            const element = document.querySelector(selector);
            if (element && t[key]) {
                if (selector.includes('Input') || selector.includes('Message')) {
                    element.placeholder = t[key];
                } else if (selector === '.hero-title') {
                    element.innerHTML = t[key];
                } else {
                    element.textContent = t[key];
                }
            }
        });
        
        // Update category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            const category = btn.dataset.category;
            if (category && t[category]) {
                btn.textContent = t[category];
            }
        });
    }
};

// Notification System
const Notifications = {
    show: (type, message, duration = 5000) => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">${message}</div>
            <button class="toast-close">&times;</button>
        `;
        
        DOM.toastContainer.appendChild(toast);
        
        // Auto remove after duration
        const timer = setTimeout(() => {
            Notifications.remove(toast);
        }, duration);
        
        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(timer);
            Notifications.remove(toast);
        });
        
        return toast;
    },

    remove: (toast) => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    },

    clearAll: () => {
        while (DOM.toastContainer.firstChild) {
            DOM.toastContainer.removeChild(DOM.toastContainer.firstChild);
        }
    }
};

// Modal System
const Modal = {
    open: (modalId) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        DOM.modalOverlay.classList.add('active');
        modal.classList.add('active');
        DOM.body.style.overflow = 'hidden';
    },

    close: (modalId) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        DOM.modalOverlay.classList.remove('active');
        modal.classList.remove('active');
        DOM.body.style.overflow = '';
    },

    closeAll: () => {
        DOM.modalOverlay.classList.remove('active');
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        DOM.body.style.overflow = '';
    },

    init: () => {
        // Close modal when clicking overlay
        DOM.modalOverlay.addEventListener('click', Modal.closeAll);
        
        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                Modal.closeAll();
            }
        });
        
        // Prevent modal close when clicking inside modal
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }
};

// Loading Manager
const LoadingManager = {
    show: () => {
        DOM.loadingOverlay.classList.remove('hidden');
    },

    hide: () => {
        DOM.loadingOverlay.classList.add('hidden');
    },

    simulate: (duration = 1000) => {
        LoadingManager.show();
        setTimeout(LoadingManager.hide, duration);
    }
};

// Form Validation
const FormValidator = {
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    validatePassword: (password) => {
        return password.length >= 6;
    },

    validateRequired: (value) => {
        return value.trim() !== '';
    },

    clearErrors: (formId) => {
        const form = document.getElementById(formId);
        if (!form) return;
        
        form.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
            input.classList.remove('error');
        });
    },

    showError: (inputId, message) => {
        const input = document.getElementById(inputId);
        const error = document.getElementById(`${inputId}Error`);
        
        if (input && error) {
            input.classList.add('error');
            error.textContent = message;
        }
    },

    validateForm: (formId, rules) => {
        let isValid = true;
        
        FormValidator.clearErrors(formId);
        
        for (const [fieldId, validation] of Object.entries(rules)) {
            const input = document.getElementById(fieldId);
            if (!input) continue;
            
            const value = input.value.trim();
            
            if (validation.required && !FormValidator.validateRequired(value)) {
                FormValidator.showError(fieldId, 'This field is required');
                isValid = false;
            }
            
            if (validation.email && value && !FormValidator.validateEmail(value)) {
                FormValidator.showError(fieldId, 'Please enter a valid email');
                isValid = false;
            }
            
            if (validation.password && value && !FormValidator.validatePassword(value)) {
                FormValidator.showError(fieldId, 'Password must be at least 6 characters');
                isValid = false;
            }
            
            if (validation.match) {
                const matchInput = document.getElementById(validation.match);
                if (matchInput && value !== matchInput.value.trim()) {
                    FormValidator.showError(fieldId, 'Passwords do not match');
                    isValid = false;
                }
            }
        }
        
        return isValid;
    }
};

// Shopping Cart Manager
const CartManager = {
    items: Storage.get('cart', []),

    init: () => {
        CartManager.updateCartCount();
    },

    addItem: (product, quantity = 1) => {
        const existingItem = CartManager.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            CartManager.items.push({
                ...product,
                quantity: quantity
            });
        }
        
        CartManager.saveCart();
        CartManager.updateCartCount();
        
        Notifications.show('success', LanguageManager.translations[LanguageManager.currentLang].addedToCart);
        return true;
    },

    removeItem: (productId) => {
        CartManager.items = CartManager.items.filter(item => item.id !== productId);
        CartManager.saveCart();
        CartManager.updateCartCount();
        
        Notifications.show('success', LanguageManager.translations[LanguageManager.currentLang].removedFromCart);
        return true;
    },

    updateQuantity: (productId, quantity) => {
        const item = CartManager.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            CartManager.saveCart();
            CartManager.updateCartCount();
            Notifications.show('success', LanguageManager.translations[LanguageManager.currentLang].cartUpdated);
        }
    },

    clearCart: () => {
        CartManager.items = [];
        CartManager.saveCart();
        CartManager.updateCartCount();
    },

    getTotalItems: () => {
        return CartManager.items.reduce((total, item) => total + item.quantity, 0);
    },

    getSubtotal: () => {
        return CartManager.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getTax: () => {
        return CartManager.getSubtotal() * 0.1; // 10% tax
    },

    getTotal: () => {
        return CartManager.getSubtotal() + CartManager.getTax();
    },

    saveCart: () => {
        Storage.set('cart', CartManager.items);
    },

    updateCartCount: () => {
        if (DOM.cartCount) {
            const totalItems = CartManager.getTotalItems();
            DOM.cartCount.textContent = totalItems;
            DOM.cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    },

    renderCart: () => {
        if (!DOM.cartItems || !DOM.cartEmpty || !DOM.cartSummary) return;
        
        const lang = LanguageManager.currentLang;
        const t = LanguageManager.translations[lang];
        
        if (CartManager.items.length === 0) {
            DOM.cartItems.style.display = 'none';
            DOM.cartSummary.style.display = 'none';
            DOM.cartEmpty.style.display = 'block';
            
            DOM.cartEmpty.innerHTML = `
                <i class="fas fa-shopping-cart"></i>
                <p>${t.cartEmpty || 'Your cart is empty'}</p>
            `;
        } else {
            DOM.cartEmpty.style.display = 'none';
            DOM.cartItems.style.display = 'block';
            DOM.cartSummary.style.display = 'block';
            
            // Render cart items
            DOM.cartItems.innerHTML = CartManager.items.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn increase">+</button>
                            <button class="cart-item-remove">
                                <i class="fas fa-trash"></i> ${t.remove || 'Remove'}
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Render cart summary
            DOM.cartSummary.innerHTML = `
                <div class="summary-row">
                    <span>${t.subtotal || 'Subtotal'}:</span>
                    <span>$${CartManager.getSubtotal().toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>${t.tax || 'Tax'}:</span>
                    <span>$${CartManager.getTax().toFixed(2)}</span>
                </div>
                <div class="summary-row summary-total">
                    <span>${t.total || 'Total'}:</span>
                    <span>$${CartManager.getTotal().toFixed(2)}</span>
                </div>
            `;
            
            // Add event listeners to cart items
            DOM.cartItems.querySelectorAll('.cart-item').forEach(item => {
                const id = item.dataset.id;
                const decreaseBtn = item.querySelector('.decrease');
                const increaseBtn = item.querySelector('.increase');
                const removeBtn = item.querySelector('.cart-item-remove');
                
                decreaseBtn.addEventListener('click', () => {
                    const cartItem = CartManager.items.find(i => i.id === id);
                    if (cartItem && cartItem.quantity > 1) {
                        CartManager.updateQuantity(id, cartItem.quantity - 1);
                        CartManager.renderCart();
                    }
                });
                
                increaseBtn.addEventListener('click', () => {
                    const cartItem = CartManager.items.find(i => i.id === id);
                    if (cartItem) {
                        CartManager.updateQuantity(id, cartItem.quantity + 1);
                        CartManager.renderCart();
                    }
                });
                
                removeBtn.addEventListener('click', () => {
                    CartManager.removeItem(id);
                    CartManager.renderCart();
                });
            });
        }
    }
};

// Search System
const SearchSystem = {
    currentSearch: '',
    searchResults: [],

    init: () => {
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                SearchSystem.performSearch();
            });
        }
        
        if (DOM.searchInput) {
            DOM.searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    SearchSystem.performSearch();
                }
                
                // Clear search if input is empty
                if (!DOM.searchInput.value.trim() && SearchSystem.currentSearch) {
                    SearchSystem.clearSearch();
                }
            });
            
            DOM.searchInput.addEventListener('input', (e) => {
                // Real-time search (optional)
                // You can enable this for real-time search
                // if (e.target.value.length >= 3) {
                //     SearchSystem.performSearch(e.target.value);
                // }
            });
        }
    },

    performSearch: (query = null) => {
        const searchQuery = query || DOM.searchInput.value.trim();
        
        if (!searchQuery) {
            SearchSystem.clearSearch();
            return;
        }
        
        SearchSystem.currentSearch = searchQuery.toLowerCase();
        
        // Filter products based on search query
        SearchSystem.searchResults = ProductManager.products.filter(product => 
            product.name.toLowerCase().includes(SearchSystem.currentSearch) ||
            product.description.toLowerCase().includes(SearchSystem.currentSearch) ||
            product.category.toLowerCase().includes(SearchSystem.currentSearch)
        );
        
        SearchSystem.displaySearchResults();
    },

    displaySearchResults: () => {
        if (!DOM.searchResults) return;
        
        const lang = LanguageManager.currentLang;
        const t = LanguageManager.translations[lang];
        
        if (SearchSystem.searchResults.length === 0) {
            DOM.searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>${t.noResults || 'No products found'}</h3>
                    <p>Try different keywords or check the spelling</p>
                </div>
            `;
        } else {
            DOM.searchResults.innerHTML = `
                <div class="search-header">
                    <h3>Found ${SearchSystem.searchResults.length} results for "${SearchSystem.currentSearch}"</h3>
                    <button class="btn btn-secondary" id="clearSearchBtn">
                        <i class="fas fa-times"></i> Clear Search
                    </button>
                </div>
            `;
            
            // Render search results
            ProductManager.renderProducts(SearchSystem.searchResults, 1);
            
            // Add clear search button event
            const clearBtn = document.getElementById('clearSearchBtn');
            if (clearBtn) {
                clearBtn.addEventListener('click', SearchSystem.clearSearch);
            }
        }
        
        DOM.searchResults.style.display = 'block';
    },

    clearSearch: () => {
        SearchSystem.currentSearch = '';
        SearchSystem.searchResults = [];
        
        if (DOM.searchInput) {
            DOM.searchInput.value = '';
        }
        
        if (DOM.searchResults) {
            DOM.searchResults.style.display = 'none';
            DOM.searchResults.innerHTML = '';
        }
        
        // Reset to showing all products
        ProductManager.renderProducts(ProductManager.products, 1);
        
        Notifications.show('success', LanguageManager.translations[LanguageManager.currentLang].searchCleared);
    }
};

// Export utilities
window.Utils = {
    DOM,
    Storage,
    ThemeManager,
    LanguageManager,
    Notifications,
    Modal,
    LoadingManager,
    FormValidator,
    CartManager,
    SearchSystem
};