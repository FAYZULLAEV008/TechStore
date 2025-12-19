/**
 * Main Application File
 * Initializes and coordinates all application modules
 */

// Application State
const AppState = {
    initialized: false,
    loading: false,
    currentView: 'home'
};

// Main Application Class
class TechStoreApp {
    constructor() {
        this.init();
    }

    // Initialize application
    async init() {
        try {
            // Show loading screen
            Utils.LoadingManager.show();
            
            // Initialize all modules in sequence
            await this.initializeModules();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Final initialization
            this.finalizeInit();
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
            Utils.Notifications.show('error', 'Failed to initialize application. Please refresh the page.');
        } finally {
            // Hide loading screen after a minimum delay
            setTimeout(() => {
                Utils.LoadingManager.hide();
                AppState.initialized = true;
            }, 1000);
        }
    }

    // Initialize all application modules
    async initializeModules() {
        // Initialize theme
        Utils.ThemeManager.init();
        
        // Initialize language manager
        await Utils.LanguageManager.init();
        
        // Initialize modal system
        Utils.Modal.init();
        
        // Initialize search system
        Utils.SearchSystem.init();
        
        // Initialize cart manager
        Utils.CartManager.init();
        
        // Initialize product manager
        Data.ProductManager.init();
        
        // Initialize UI components
        Components.init();
        
        // Initialize error handling
        Components.initErrorHandling();
        
        // Initialize performance monitoring
        Components.initPerformanceMonitoring();
        
        // Load user from localStorage
        const savedUser = Utils.Storage.get('currentUser');
        if (savedUser) {
            Data.CurrentUser = savedUser;
            Components.updateAuthUI();
        }
    }

    // Set up global event listeners
    setupEventListeners() {
        // Window resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Scroll handler for sticky header
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const header = document.querySelector('.header');
            
            if (header) {
                if (currentScroll > 100) {
                    header.classList.add('scrolled');
                    
                    if (currentScroll > lastScroll && currentScroll > 200) {
                        header.classList.add('hidden');
                    } else {
                        header.classList.remove('hidden');
                    }
                } else {
                    header.classList.remove('scrolled');
                    header.classList.remove('hidden');
                }
                
                lastScroll = currentScroll;
            }
            
            // Update active section based on scroll position
            this.updateActiveSection();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search focus
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                Utils.Modal.closeAll();
            }
            
            // Ctrl/Cmd + / to toggle theme
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                Utils.ThemeManager.toggle();
            }
        });

        // Prevent form submission on enter in search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    Utils.SearchSystem.performSearch();
                }
            });
        }
    }

    // Handle window resize
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const hamburgerBtn = document.getElementById('hamburgerBtn');
            const navMenu = document.getElementById('navMenu');
            
            if (hamburgerBtn && navMenu) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
        
        // Update UI based on viewport
        this.updateViewportClasses();
    }

    // Update viewport classes for responsive design
    updateViewportClasses() {
        const width = window.innerWidth;
        const body = document.body;
        
        // Remove existing viewport classes
        body.classList.remove('viewport-xs', 'viewport-sm', 'viewport-md', 'viewport-lg', 'viewport-xl');
        
        // Add appropriate viewport class
        if (width < 576) {
            body.classList.add('viewport-xs');
        } else if (width < 768) {
            body.classList.add('viewport-sm');
        } else if (width < 992) {
            body.classList.add('viewport-md');
        } else if (width < 1200) {
            body.classList.add('viewport-lg');
        } else {
            body.classList.add('viewport-xl');
        }
    }

    // Update active section based on scroll position
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                AppState.currentView = sectionId;
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }

    // Final initialization steps
    finalizeInit() {
        // Add viewport classes
        this.updateViewportClasses();
        
        // Set current year in footer
        const currentYear = new Date().getFullYear();
        const yearElement = document.querySelector('.footer-bottom p');
        if (yearElement) {
            yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
        }
        
        // Initialize lazy loading for images
        this.initLazyLoading();
        
        // Initialize intersection observer for animations
        this.initAnimations();
        
        // Log initialization complete
        console.log('TechStore App initialized successfully');
        
        // Show welcome notification
        setTimeout(() => {
            if (!Data.UserManager.isLoggedIn()) {
                Utils.Notifications.show(
                    'info',
                    'Welcome to TechStore! Use Ctrl+K to quickly search products.'
                );
            }
        }, 2000);
    }

    // Initialize lazy loading for images
    initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // Initialize animations for elements
    initAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(el => animationObserver.observe(el));
        } else {
            // Fallback for browsers without IntersectionObserver
            animatedElements.forEach(el => el.classList.add('animated'));
        }
    }

    // Utility method to reload products
    reloadProducts() {
        Data.ProductManager.renderProducts(Data.ProductManager.products, 1);
    }

    // Utility method to clear all filters
    clearAllFilters() {
        // Clear search
        Utils.SearchSystem.clearSearch();
        
        // Reset category filter
        Data.ProductManager.filterByCategory(Data.Categories.ALL);
        
        // Reset pagination
        Data.ProductManager.renderProducts(Data.ProductManager.products, 1);
    }

    // Export app state for debugging
    getState() {
        return {
            ...AppState,
            user: Data.UserManager.getCurrentUser(),
            cartItems: Utils.CartManager.getTotalItems(),
            theme: document.body.getAttribute('data-theme'),
            language: Utils.LanguageManager.currentLang
        };
    }

    // Reset application (for development/testing)
    resetApp() {
        if (confirm('Are you sure you want to reset the app? This will clear all local data.')) {
            // Clear localStorage
            Utils.Storage.clear();
            
            // Reset application state
            AppState.initialized = false;
            AppState.loading = false;
            AppState.currentView = 'home';
            
            // Reset managers
            Utils.CartManager.items = [];
            Utils.CartManager.saveCart();
            Utils.CartManager.updateCartCount();
            
            Data.CurrentUser = null;
            
            // Reset theme and language
            Utils.ThemeManager.init();
            Utils.LanguageManager.setLanguage('en');
            
            // Reload page
            window.location.reload();
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global app instance
    window.app = new TechStoreApp();
    
    // Make app available globally for debugging
    console.log('TechStore App:', window.app);
});

// Add CSS for additional animations
const style = document.createElement('style');
style.textContent = `
    /* Additional animations */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Viewport classes */
    .viewport-xs .hide-xs { display: none !important; }
    .viewport-sm .hide-sm { display: none !important; }
    .viewport-md .hide-md { display: none !important; }
    .viewport-lg .hide-lg { display: none !important; }
    .viewport-xl .hide-xl { display: none !important; }
    
    /* Header scroll effects */
    .header.scrolled {
        padding: 0.5rem 0;
        backdrop-filter: blur(10px);
        background-color: rgba(var(--bg-primary-rgb), 0.9);
    }
    
    .header.hidden {
        transform: translateY(-100%);
    }
    
    /* Form input error state */
    .form-input.error,
    .form-textarea.error {
        border-color: var(--danger-color);
    }
    
    /* Product details styles */
    .product-details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
    }
    
    .product-details-image img {
        width: 100%;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-md);
    }
    
    .product-details-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .product-details-title {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .product-details-price {
        font-size: 2rem;
        color: var(--primary-color);
        font-weight: 700;
        margin: 1rem 0;
    }
    
    .product-details-stock {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: var(--border-radius);
        margin: 1rem 0;
    }
    
    .product-details-stock.in-stock {
        background-color: rgba(76, 201, 240, 0.1);
        color: var(--success-color);
    }
    
    .product-details-stock.out-of-stock {
        background-color: rgba(249, 65, 68, 0.1);
        color: var(--danger-color);
    }
    
    .product-details-features h4 {
        margin: 1.5rem 0 1rem;
    }
    
    .product-details-features ul {
        list-style: disc;
        padding-left: 1.5rem;
        margin-bottom: 1.5rem;
    }
    
    .product-details-features li {
        margin-bottom: 0.5rem;
    }
    
    .product-details-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .product-details-specs {
        padding: 2rem;
        background-color: var(--bg-secondary);
        border-radius: var(--border-radius);
    }
    
    .product-details-specs h3 {
        margin-bottom: 1.5rem;
    }
    
    .specs-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }
    
    .spec-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--border-color);
    }
    
    .spec-label {
        font-weight: 500;
        color: var(--text-secondary);
    }
    
    .spec-value {
        font-weight: 600;
    }
    
    /* Search header */
    .search-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: var(--bg-secondary);
        border-radius: var(--border-radius);
    }
    
    .search-header h3 {
        margin: 0;
        font-size: 1.25rem;
    }
    
    /* No products state */
    .no-products {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-secondary);
        grid-column: 1 / -1;
    }
    
    .no-products i {
        font-size: 4rem;
        margin-bottom: 1rem;
        color: var(--border-color);
    }
    
    .no-products h3 {
        margin-bottom: 0.5rem;
    }
    
    /* Responsive product details */
    @media (max-width: 768px) {
        .product-details-grid {
            grid-template-columns: 1fr;
        }
        
        .product-details-actions {
            flex-direction: column;
        }
        
        .product-details-actions .btn {
            width: 100%;
        }
        
        .specs-grid {
            grid-template-columns: 1fr;
        }
        
        .search-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
        }
    }
    
    @media (max-width: 480px) {
        .product-details-price {
            font-size: 1.5rem;
        }
        
        .product-details-title {
            font-size: 1.5rem;
        }
    }
`;
document.head.appendChild(style);

// Error boundary for the application
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
    
    // Show user-friendly error message
    if (!event.error.handled) {
        Utils.Notifications.show('error', 'Something went wrong. Please try again.');
        event.error.handled = true;
    }
    
    // Log to console for debugging
    if (window.location.hostname === 'localhost') {
        console.error('Error details:', {
            message: event.error.message,
            stack: event.error.stack,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
        });
    }
});