// Modal functionality
const modal = document.getElementById('registerModal');
const closeModal = document.getElementById('closeModal');
const registerForm = document.getElementById('registerForm');

// Open modal function
function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus on first input
    setTimeout(() => {
        document.getElementById('username').focus();
    }, 300);
}

// Close modal function
function closeModalFunc() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking close button
closeModal.addEventListener('click', closeModalFunc);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModalFunc();
    }
});

// Handle form submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(registerForm);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const birthdate = formData.get('birthdate');
    const country = formData.get('country');
    const terms = formData.get('terms');
    
    // Validation
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    if (password.length < 8) {
        showNotification('Password must be at least 8 characters long!', 'error');
        return;
    }
    
    if (!terms) {
        showNotification('You must agree to the Terms of Service!', 'error');
        return;
    }
    
    // Simulate registration process
    const submitBtn = registerForm.querySelector('.btn-register');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification(`Welcome to NovaPlay, ${username}! Your account has been created successfully!`, 'success');
        registerForm.reset();
        closeModalFunc();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Update buttons to open modal instead of showing notifications
document.querySelectorAll('.btn-hero-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

// Update game action buttons to open modal for registration
document.querySelectorAll('.btn-game-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

// Update tournament registration buttons
document.querySelectorAll('.btn-tournoi').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

// Update category explore buttons
document.querySelectorAll('.btn-category').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

// Update shop product buttons
document.querySelectorAll('.btn-produit').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    toggleBodyScroll(false);
}));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        toggleBodyScroll(false);
    }
});

// Smooth scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.webkitBackdropFilter = 'blur(15px)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.webkitBackdropFilter = 'blur(10px)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.1)';
    }
});

// Game filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const gameCards = document.querySelectorAll('.game-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        gameCards.forEach(card => {
            card.classList.add('hidden');
            
            setTimeout(() => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.classList.add('visible');
                    }, 50);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('visible');
                }
            }, 150);
        });
    });
});

// Shop filtering
const shopFilterButtons = document.querySelectorAll('.boutique-filter');
const productCards = document.querySelectorAll('.produit-card');

shopFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        shopFilterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-category');
        
        productCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Game action buttons
document.querySelectorAll('.btn-game-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const gameName = button.closest('.game-card').querySelector('h3').textContent;
        showNotification(`Starting ${gameName}...`, 'success');
    });
});

document.querySelectorAll('.btn-game-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const gameName = button.closest('.game-card').querySelector('h3').textContent;
        showNotification(`Pre-order added for ${gameName}!`, 'info');
    });
});

// Play buttons on game cards
document.querySelectorAll('.play-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const gameName = button.getAttribute('title').replace('Play ', '');
        showNotification(`Launching ${gameName}...`, 'success');
    });
});

// Tournament registration buttons
document.querySelectorAll('.btn-tournoi').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const tournamentName = button.closest('.tournoi-card').querySelector('h3').textContent;
        const status = button.closest('.tournoi-card').querySelector('.tournoi-status').textContent;
        
        if (status === 'Ongoing') {
            showNotification(`Registration successful for ${tournamentName}!`, 'success');
        } else {
            showNotification(`Pre-registration successful for ${tournamentName}!`, 'info');
        }
    });
});

// Category explore buttons
document.querySelectorAll('.btn-category').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryName = button.closest('.category-card').querySelector('h3').textContent;
        showNotification(`Exploring ${categoryName} games...`, 'info');
    });
});

// Shop product buttons
document.querySelectorAll('.btn-produit').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = button.closest('.produit-card').querySelector('h3').textContent;
        showNotification(`${productName} added to cart!`, 'success');
    });
});

// News read more buttons
document.querySelectorAll('.btn-actualite').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const articleTitle = button.closest('.actualite-card').querySelector('h3').textContent;
        showNotification(`Opening article: ${articleTitle}`, 'info');
    });
});

// Hero section buttons
document.querySelectorAll('.btn-hero-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Welcome to NovaPlay! Starting your gaming journey...', 'success');
    });
});

document.querySelectorAll('.btn-hero-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Opening NovaPlay trailer...', 'info');
    });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (name && email && subject && message) {
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        } else {
            showNotification('Please fill in all fields.', 'error');
        }
    });
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (email) {
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            newsletterForm.querySelector('input').value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4444' : '#00ffff'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 600;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.game-card, .feature-card, .section-header, .tournoi-card, .actualite-card, .produit-card').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroElements = document.querySelectorAll('.floating-game-elements .game-element');
    
    heroElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Game card hover effects
gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add dynamic background particles
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'dynamic-particle';
    particle.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: #00ffff;
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.7;
        animation: particleFloat 10s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 10000);
}

// Create particles periodically
setInterval(createParticle, 1000);

// Add CSS for dynamic particles and animations
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #000;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(style);

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Initialize game cards as visible
    gameCards.forEach(card => {
        card.classList.add('visible');
    });
    
    // Initialize product cards as visible
    productCards.forEach(card => {
        card.classList.add('visible');
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        toggleBodyScroll(false);
    }
});

// Prevent body scroll when mobile menu is open
function toggleBodyScroll(disable) {
    if (disable) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Update hamburger click handler
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    toggleBodyScroll(navMenu.classList.contains('active'));
});

// Performance optimization - throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Scroll-based animations and effects
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to NovaPlay!', 'success');
    }, 1000);
});