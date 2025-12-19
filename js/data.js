/**
 * Mock Database
 * Contains product data, user data, and other mock data
 */

// Product Categories
const Categories = {
    ALL: 'all',
    ELECTRONICS: 'electronics',
    COMPUTERS: 'computers',
    PHONES: 'phones',
    ACCESSORIES: 'accessories'
};

// Mock Product Data
const Products = [
    {
        id: 1,
        name: "MacBook Pro 16-inch",
        description: "Powerful laptop with M2 Pro chip, 16GB RAM, 512GB SSD. Perfect for professionals and creatives.",
        price: 2499.99,
        category: Categories.COMPUTERS,
        image: "./OIP.webp",
        rating: 4.8,
        reviews: 125,
        inStock: true,
        features: ["M2 Pro Chip", "16-inch Retina Display", "16GB Unified Memory", "512GB SSD Storage", "Up to 22 hours battery life"],
        specs: {
            processor: "Apple M2 Pro",
            memory: "16GB",
            storage: "512GB SSD",
            display: "16.2-inch Liquid Retina XDR",
            battery: "Up to 22 hours"
        }
    },
    {
        id: 2,
        name: "iPhone 15 Pro",
        description: "Latest iPhone with A17 Pro chip, 48MP camera, and titanium design.",
        price: 999.99,
        category: Categories.PHONES,
        image: "./iphone-15-pro-.webp",
        rating: 4.9,
        reviews: 89,
        inStock: true,
        features: ["A17 Pro Chip", "48MP Main Camera", "Titanium Design", "USB-C Port", "iOS 17"],
        specs: {
            processor: "A17 Pro",
            memory: "8GB",
            storage: "256GB",
            display: "6.1-inch Super Retina XDR",
            battery: "Up to 23 hours"
        }
    },
    {
        id: 3,
        name: "Samsung Galaxy S24",
        description: "Android flagship with Snapdragon 8 Gen 3, 200MP camera, and AI features.",
        price: 899.99,
        category: Categories.PHONES,
        image: "./04_S24Series-GalaxyAI-KV_PC.jpg",
        rating: 4.7,
        reviews: 67,
        inStock: true,
        features: ["Snapdragon 8 Gen 3", "200MP Camera", "AI-Powered Features", "120Hz Display", "Android 14"],
        specs: {
            processor: "Snapdragon 8 Gen 3",
            memory: "12GB",
            storage: "256GB",
            display: "6.8-inch Dynamic AMOLED 2X",
            battery: "5000mAh"
        }
    },
    {
        id: 4,
        name: "Sony WH-1000XM5",
        description: "Premium noise-cancelling headphones with industry-leading sound quality.",
        price: 399.99,
        category: Categories.ELECTRONICS,
        image: "./img_9663.avif",
        rating: 4.8,
        reviews: 210,
        inStock: true,
        features: ["Industry-leading noise cancellation", "30-hour battery life", "Multipoint connection", "Voice assistant support", "Foldable design"],
        specs: {
            type: "Over-ear",
            battery: "30 hours",
            connectivity: "Bluetooth 5.2",
            weight: "250g",
            features: "Noise Cancelling, Voice Assistant"
        }
    },
    {
        id: 5,
        name: "Dell XPS 15",
        description: "Premium Windows laptop with Intel Core i9 and 4K OLED display.",
        price: 2199.99,
        category: Categories.COMPUTERS,
        image: "./91WgL3IbNIL._AC_SL1500_.jpg",
        rating: 4.6,
        reviews: 92,
        inStock: true,
        features: ["Intel Core i9-13900H", "15.6-inch 4K OLED", "32GB RAM", "1TB SSD", "NVIDIA RTX 4070"],
        specs: {
            processor: "Intel Core i9-13900H",
            memory: "32GB",
            storage: "1TB SSD",
            display: "15.6-inch 4K OLED",
            graphics: "NVIDIA RTX 4070"
        }
    },
    {
        id: 6,
        name: "Apple Watch Series 9",
        description: "Advanced smartwatch with health monitoring and fitness tracking.",
        price: 429.99,
        category: Categories.ELECTRONICS,
        image: "./Apple-Watch-S9-hero-230912_Full-Bleed-Image.jpg.large.jpg",
        rating: 4.7,
        reviews: 156,
        inStock: true,
        features: ["Blood Oxygen app", "ECG app", "Always-On Retina display", "Water resistant 50m", "GPS + Cellular"],
        specs: {
            display: "Always-On Retina LTPO OLED",
            processor: "S9 SiP",
            storage: "64GB",
            battery: "Up to 18 hours",
            features: "GPS, Cellular, Health Monitoring"
        }
    },
    {
        id: 7,
        name: "Logitech MX Master 3S",
        description: "Advanced wireless mouse for professionals with MagSpeed scrolling.",
        price: 99.99,
        category: Categories.ACCESSORIES,
        image: "./Logitech-MX-Master-3S.jpg",
        rating: 4.8,
        reviews: 312,
        inStock: true,
        features: ["8K DPI sensor", "MagSpeed electromagnetic scrolling", "70-day battery life", "Darkfield tracking", "Flow cross-computer control"],
        specs: {
            sensor: "Darkfield 8K DPI",
            connectivity: "Bluetooth & USB receiver",
            battery: "Up to 70 days",
            buttons: "7 programmable buttons",
            compatibility: "Windows, macOS, Linux"
        }
    },
    {
        id: 8,
        name: "Samsung Odyssey G9",
        description: "49-inch super ultrawide gaming monitor with 240Hz refresh rate.",
        price: 1299.99,
        category: Categories.ELECTRONICS,
        image: "./Samsung-Odyssey-OLED-G9-lead.webp",
        rating: 4.5,
        reviews: 78,
        inStock: true,
        features: ["49-inch Dual QHD", "240Hz refresh rate", "1ms response time", "QLED technology", "HDR1000"],
        specs: {
            size: "49-inch",
            resolution: "5120x1440",
            refreshRate: "240Hz",
            panel: "QLED",
            responseTime: "1ms"
        }
    },
    {
        id: 9,
        name: "AirPods Pro (2nd Gen)",
        description: "Wireless earbuds with active noise cancellation and spatial audio.",
        price: 249.99,
        category: Categories.ACCESSORIES,
        image: "./airpodsmirror.jpg",
        rating: 4.7,
        reviews: 189,
        inStock: true,
        features: ["Active Noise Cancellation", "Adaptive Transparency", "Personalized Spatial Audio", "6-hour battery life", "Wireless charging case"],
        specs: {
            type: "In-ear",
            battery: "6 hours (with ANC)",
            connectivity: "Bluetooth 5.3",
            features: "Noise Cancellation, Spatial Audio",
            case: "Wireless charging"
        }
    },
    {
        id: 10,
        name: "PlayStation 5",
        description: "Next-gen gaming console with ultra-high speed SSD and ray tracing.",
        price: 499.99,
        category: Categories.ELECTRONICS,
        image: "./sony-playstation-5-2560x1440-19022.jpg",
        rating: 4.8,
        reviews: 234,
        inStock: true,
        features: ["Ultra-high speed SSD", "Ray tracing", "4K 120fps", "Tempest 3D AudioTech", "DualSense wireless controller"],
        specs: {
            processor: "AMD Zen 2",
            graphics: "AMD RDNA 2",
            memory: "16GB GDDR6",
            storage: "825GB SSD",
            output: "4K 120Hz, 8K"
        }
    },
    {
        id: 11,
        name: "Microsoft Surface Pro 9",
        description: "Versatile 2-in-1 laptop with touchscreen and detachable keyboard.",
        price: 1299.99,
        category: Categories.COMPUTERS,
        image: "./IMG_0575.jpeg",
        rating: 4.5,
        reviews: 56,
        inStock: true,
        features: ["13-inch PixelSense touchscreen", "Intel Core i7", "16GB RAM", "512GB SSD", "Windows 11 Pro"],
        specs: {
            processor: "Intel Core i7-1255U",
            memory: "16GB",
            storage: "512GB SSD",
            display: "13-inch PixelSense",
            battery: "Up to 15.5 hours"
        }
    },
    {
        id: 12,
        name: "Google Pixel 8 Pro",
        description: "Google flagship phone with Tensor G3 chip and advanced camera system.",
        price: 899.99,
        category: Categories.PHONES,
        image: "./maxresdefault.jpg",
        rating: 4.6,
        reviews: 45,
        inStock: true,
        features: ["Google Tensor G3", "Triple camera system", "Super Actua display", "30W fast charging", "7 years of updates"],
        specs: {
            processor: "Google Tensor G3",
            memory: "12GB",
            storage: "256GB",
            display: "6.7-inch LTPO OLED",
            battery: "5050mAh"
        }
    }
];

// Mock User Data
const Users = [
    {
        id: 1,
        email: "demo@techstore.com",
        password: "demo123", // In real app, this would be hashed
        name: "Demo User",
        role: "user",
        createdAt: "2024-01-01",
        preferences: {
            theme: "light",
            language: "en",
            notifications: true
        }
    }
];

// Mock Orders Data
const Orders = [
    {
        id: 1,
        userId: 1,
        items: [
            { productId: 1, quantity: 1, price: 2499.99 },
            { productId: 9, quantity: 1, price: 249.99 }
        ],
        total: 2749.98,
        status: "delivered",
        date: "2024-01-15",
        shippingAddress: "123 Tech Street, Digital City"
    }
];

// Current User Session
let CurrentUser = null;

// User Management Functions
const UserManager = {
    // Login function
    login: (email, password) => {
        const user = Users.find(u => u.email === email && u.password === password);
        
        if (user) {
            CurrentUser = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                preferences: user.preferences
            };
            
            // Save to localStorage
            Utils.Storage.set('currentUser', CurrentUser);
            
            // Update preferences
            if (user.preferences.theme) {
                Utils.ThemeManager.setTheme(user.preferences.theme);
            }
            
            if (user.preferences.language) {
                Utils.LanguageManager.setLanguage(user.preferences.language);
            }
            
            return { success: true, user: CurrentUser };
        }
        
        return { success: false, message: "Invalid email or password" };
    },

    // Register function
    register: (name, email, password) => {
        // Check if user already exists
        if (Users.find(u => u.email === email)) {
            return { success: false, message: "User with this email already exists" };
        }

        // Create new user
        const newUser = {
            id: Users.length + 1,
            email,
            password, // In real app, this would be hashed
            name,
            role: "user",
            createdAt: new Date().toISOString().split('T')[0],
            preferences: {
                theme: "light",
                language: "en",
                notifications: true
            }
        };

        Users.push(newUser);
        
        // Auto login after registration
        return UserManager.login(email, password);
    },

    // Logout function
    logout: () => {
        CurrentUser = null;
        Utils.Storage.remove('currentUser');
        return { success: true };
    },

    // Check if user is logged in
    isLoggedIn: () => {
        if (!CurrentUser) {
            CurrentUser = Utils.Storage.get('currentUser');
        }
        return CurrentUser !== null;
    },

    // Get current user
    getCurrentUser: () => {
        return CurrentUser;
    },

    // Update user preferences
    updatePreferences: (preferences) => {
        if (!CurrentUser) return false;
        
        CurrentUser.preferences = { ...CurrentUser.preferences, ...preferences };
        Utils.Storage.set('currentUser', CurrentUser);
        
        // Update in mock database
        const userIndex = Users.findIndex(u => u.id === CurrentUser.id);
        if (userIndex !== -1) {
            Users[userIndex].preferences = CurrentUser.preferences;
        }
        
        return true;
    }
};

// Product Management Functions
const ProductManager = {
    products: Products,
    currentPage: 1,
    itemsPerPage: 9,
    currentCategory: Categories.ALL,

    // Initialize product data
    init: () => {
        // Try to load products from localStorage first
        const savedProducts = Utils.Storage.get('products');
        if (savedProducts && savedProducts.length > 0) {
            ProductManager.products = savedProducts;
        }
        
        // Render initial products
        ProductManager.renderProducts(ProductManager.products, ProductManager.currentPage);
    },

    // Get products by category
    getProductsByCategory: (category) => {
        if (category === Categories.ALL) {
            return ProductManager.products;
        }
        return ProductManager.products.filter(product => product.category === category);
    },

    // Get product by ID
    getProductById: (id) => {
        return ProductManager.products.find(product => product.id === parseInt(id));
    },

    // Render products to the grid
    renderProducts: (products, page = 1) => {
        if (!Utils.DOM.productsGrid) return;
        
        ProductManager.currentPage = page;
        const startIndex = (page - 1) * ProductManager.itemsPerPage;
        const endIndex = startIndex + ProductManager.itemsPerPage;
        const paginatedProducts = products.slice(startIndex, endIndex);
        
        // Clear existing products
        Utils.DOM.productsGrid.innerHTML = '';
        
        if (paginatedProducts.length === 0) {
            Utils.DOM.productsGrid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-box-open"></i>
                    <h3>No products found</h3>
                    <p>Try selecting a different category</p>
                </div>
            `;
            Utils.DOM.pagination.style.display = 'none';
            return;
        }
        
        // Render each product
        paginatedProducts.forEach(product => {
            const productCard = ProductManager.createProductCard(product);
            Utils.DOM.productsGrid.appendChild(productCard);
        });
        
        // Render pagination
        ProductManager.renderPagination(products.length, page);
    },

    // Create product card element
    createProductCard: (product) => {
        const lang = Utils.LanguageManager.currentLang;
        const t = Utils.LanguageManager.translations[lang];
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = product.id;
        card.dataset.category = product.category;
        
        // Generate star rating HTML
        const stars = ProductManager.generateStarRating(product.rating);
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='assets/images/placeholder.jpg'">
            <div class="product-content">
                <span class="product-category">${t[product.category] || product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="action-btn action-btn-secondary view-details-btn" data-id="${product.id}">
                        <i class="fas fa-eye"></i> ${t.viewDetails || 'View Details'}
                    </button>
                    <button class="action-btn action-btn-primary add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> ${t.addToCart || 'Add to Cart'}
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners
        const viewBtn = card.querySelector('.view-details-btn');
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        
        viewBtn.addEventListener('click', () => {
            ProductManager.showProductDetails(product.id);
        });
        
        addToCartBtn.addEventListener('click', () => {
            Utils.CartManager.addItem(product);
        });
        
        return card;
    },

    // Generate star rating HTML
    generateStarRating: (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        let stars = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        // Half star
        if (halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    },

    // Show product details modal
    showProductDetails: (productId) => {
        const product = ProductManager.getProductById(productId);
        if (!product) return;
        
        const lang = Utils.LanguageManager.currentLang;
        const t = Utils.LanguageManager.translations[lang];
        const stars = ProductManager.generateStarRating(product.rating);
        
        // Update modal title
        const modalTitle = document.getElementById('productModalTitle');
        if (modalTitle) {
            modalTitle.textContent = product.name;
        }
        
        // Update modal body
        const modalBody = document.getElementById('productModalBody');
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="product-details">
                    <div class="product-details-grid">
                        <div class="product-details-image">
                            <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/images/placeholder.jpg'">
                        </div>
                        <div class="product-details-info">
                            <div class="product-details-header">
                                <span class="product-category">${t[product.category] || product.category}</span>
                                <div class="product-rating">
                                    <div class="stars">${stars}</div>
                                    <span class="rating-count">${product.rating} (${product.reviews} reviews)</span>
                                </div>
                            </div>
                            
                            <h2 class="product-details-title">${product.name}</h2>
                            <p class="product-details-description">${product.description}</p>
                            
                            <div class="product-details-price">$${product.price.toFixed(2)}</div>
                            
                            <div class="product-details-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                                <i class="fas ${product.inStock ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                                ${product.inStock ? 'In Stock' : 'Out of Stock'}
                            </div>
                            
                            <div class="product-details-features">
                                <h4>Key Features:</h4>
                                <ul>
                                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <div class="product-details-actions">
                                <button class="btn btn-primary add-to-cart-details-btn" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                                    <i class="fas fa-cart-plus"></i> ${t.addToCart || 'Add to Cart'}
                                </button>
                                <button class="btn btn-secondary buy-now-btn" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                                    <i class="fas fa-bolt"></i> ${t.buyNow || 'Buy Now'}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="product-details-specs">
                        <h3>Specifications</h3>
                        <div class="specs-grid">
                            ${Object.entries(product.specs || {}).map(([key, value]) => `
                                <div class="spec-item">
                                    <span class="spec-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                                    <span class="spec-value">${value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            // Add event listeners to buttons in modal
            const addToCartBtn = modalBody.querySelector('.add-to-cart-details-btn');
            const buyNowBtn = modalBody.querySelector('.buy-now-btn');
            
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => {
                    Utils.CartManager.addItem(product);
                    Utils.Modal.close('productModal');
                });
            }
            
            if (buyNowBtn) {
                buyNowBtn.addEventListener('click', () => {
                    Utils.CartManager.addItem(product);
                    Utils.Modal.close('productModal');
                    Utils.Modal.open('cartModal');
                });
            }
        }
        
        // Open modal
        Utils.Modal.open('productModal');
    },

    // Render pagination
    renderPagination: (totalItems, currentPage) => {
        if (!Utils.DOM.pagination) return;
        
        const totalPages = Math.ceil(totalItems / ProductManager.itemsPerPage);
        
        if (totalPages <= 1) {
            Utils.DOM.pagination.style.display = 'none';
            return;
        }
        
        Utils.DOM.pagination.style.display = 'flex';
        
        let paginationHTML = `
            <button class="page-btn prev-btn" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
            <div class="page-numbers">
        `;
        
        // Calculate which page numbers to show
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);
        
        // Adjust if we're near the beginning
        if (currentPage <= 3) {
            endPage = Math.min(5, totalPages);
        }
        
        // Adjust if we're near the end
        if (currentPage >= totalPages - 2) {
            startPage = Math.max(1, totalPages - 4);
        }
        
        // Add page numbers
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        }
        
        paginationHTML += `
            </div>
            <button class="page-btn next-btn" ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        Utils.DOM.pagination.innerHTML = paginationHTML;
        
        // Add event listeners
        const prevBtn = Utils.DOM.pagination.querySelector('.prev-btn');
        const nextBtn = Utils.DOM.pagination.querySelector('.next-btn');
        const pageBtns = Utils.DOM.pagination.querySelectorAll('.page-btn[data-page]');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    ProductManager.renderProducts(
                        ProductManager.currentCategory === Categories.ALL 
                            ? ProductManager.products 
                            : ProductManager.getProductsByCategory(ProductManager.currentCategory),
                        currentPage - 1
                    );
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    ProductManager.renderProducts(
                        ProductManager.currentCategory === Categories.ALL 
                            ? ProductManager.products 
                            : ProductManager.getProductsByCategory(ProductManager.currentCategory),
                        currentPage + 1
                    );
                }
            });
        }
        
        pageBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.dataset.page);
                if (page !== currentPage) {
                    ProductManager.renderProducts(
                        ProductManager.currentCategory === Categories.ALL 
                            ? ProductManager.products 
                            : ProductManager.getProductsByCategory(ProductManager.currentCategory),
                        page
                    );
                }
            });
        });
    },

    // Filter products by category
    filterByCategory: (category) => {
        ProductManager.currentCategory = category;
        
        const products = category === Categories.ALL 
            ? ProductManager.products 
            : ProductManager.getProductsByCategory(category);
        
        ProductManager.renderProducts(products, 1);
        
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        // Clear search if active
        if (Utils.SearchSystem.currentSearch) {
            Utils.SearchSystem.clearSearch();
        }
    },

    // Sort products
    sortProducts: (sortBy) => {
        let sortedProducts = [...ProductManager.products];
        
        switch (sortBy) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }
        
        ProductManager.renderProducts(sortedProducts, 1);
    }
};

// Export data and managers
window.Data = {
    Categories,
    Products,
    Users,
    Orders,
    CurrentUser,
    UserManager,
    ProductManager
};