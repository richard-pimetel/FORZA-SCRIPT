// Main JavaScript file for Forza Horizon 5 website
import { CarManager } from './modules/cars.js';
import { GalleryManager } from './modules/gallery.js';
import { NavigationManager } from './modules/navigation.js';
import { AnimationManager } from './modules/animations.js';

class ForzaWebsite {
    constructor() {
        this.carManager = new CarManager();
        this.galleryManager = new GalleryManager();
        this.navigationManager = new NavigationManager();
        this.animationManager = new AnimationManager();
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }
    
    initializeComponents() {
        // Initialize all components
        this.carManager.init();
        this.galleryManager.init();
        this.navigationManager.init();
        this.animationManager.init();
        
        // Setup event listeners
        this.setupEventListeners();
        
        console.log('Forza Horizon 5 website initialized successfully!');
    }
    
    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Button interactions
        this.setupButtonInteractions();
        
        // Scroll effects
        this.setupScrollEffects();
    }
    
    setupButtonInteractions() {
        // Hero buttons
        const playButton = document.querySelector('.btn-primary');
        const trailerButton = document.querySelector('.btn-secondary');
        
        if (playButton) {
            playButton.addEventListener('click', () => {
                this.showNotification('Redirecionando para a Microsoft Store...', 'info');
                // In a real implementation, this would redirect to the actual store
            });
        }
        
        if (trailerButton) {
            trailerButton.addEventListener('click', () => {
                this.showNotification('Abrindo trailer do jogo...', 'info');
                // In a real implementation, this would open a video modal
            });
        }
        
        // Download buttons
        document.querySelectorAll('.download-buttons .btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showNotification('Redirecionando para download...', 'success');
            });
        });
    }
    
    setupScrollEffects() {
        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        });
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '8px',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the website when the script loads
new ForzaWebsite();