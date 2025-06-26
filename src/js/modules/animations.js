// Animation management module
export class AnimationManager {
    constructor() {
        this.observedElements = new Set();
        this.intersectionObserver = null;
    }
    
    init() {
        this.setupIntersectionObserver();
        this.observeElements();
        this.setupParallaxEffects();
        this.setupHoverEffects();
    }
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };
        
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.intersectionObserver.unobserve(entry.target);
                }
            });
        }, options);
    }
    
    observeElements() {
        // Observe elements that should animate on scroll
        const elementsToObserve = document.querySelectorAll(`
            .fade-in-up,
            .car-card,
            .feature-card,
            .gallery-item,
            .section-title,
            .section-subtitle
        `);
        
        elementsToObserve.forEach(element => {
            if (!this.observedElements.has(element)) {
                this.intersectionObserver.observe(element);
                this.observedElements.add(element);
                
                // Set initial state
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }
    
    animateElement(element) {
        // Add a small delay for staggered animations
        const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    }
    
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-image img');
        
        if (parallaxElements.length === 0) return;
        
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
    
    setupHoverEffects() {
        // Enhanced hover effects for cards
        this.setupCardHoverEffects();
        
        // Button hover effects
        this.setupButtonHoverEffects();
        
        // Image hover effects
        this.setupImageHoverEffects();
    }
    
    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.car-card, .feature-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
            });
        });
    }
    
    animateCardHover(card, isHovering) {
        const image = card.querySelector('img');
        const info = card.querySelector('.car-info, .feature-card');
        
        if (isHovering) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.3)';
            
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            
            if (image) {
                image.style.transform = 'scale(1)';
            }
        }
    }
    
    setupButtonHoverEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Create ripple effect
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
            
            // Enhanced hover animations
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    createRippleEffect(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;
        
        // Add ripple animation keyframes if not already added
        if (!document.querySelector('#ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'ripple-keyframes';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    setupImageHoverEffects() {
        const images = document.querySelectorAll('.gallery-item img, .hero-image img');
        
        images.forEach(image => {
            image.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.1) rotate(2deg)';
                image.style.filter = 'brightness(1.1) contrast(1.1)';
            });
            
            image.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1) rotate(0deg)';
                image.style.filter = 'brightness(1) contrast(1)';
            });
        });
    }
    
    // Method to animate elements on demand
    animateOnDemand(selector, animationType = 'fadeInUp') {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                this.applyAnimation(element, animationType);
            }, index * 100);
        });
    }
    
    applyAnimation(element, animationType) {
        const animations = {
            fadeInUp: {
                from: { opacity: '0', transform: 'translateY(30px)' },
                to: { opacity: '1', transform: 'translateY(0)' }
            },
            fadeInLeft: {
                from: { opacity: '0', transform: 'translateX(-30px)' },
                to: { opacity: '1', transform: 'translateX(0)' }
            },
            fadeInRight: {
                from: { opacity: '0', transform: 'translateX(30px)' },
                to: { opacity: '1', transform: 'translateX(0)' }
            },
            scaleIn: {
                from: { opacity: '0', transform: 'scale(0.8)' },
                to: { opacity: '1', transform: 'scale(1)' }
            }
        };
        
        const animation = animations[animationType];
        if (!animation) return;
        
        // Set initial state
        Object.assign(element.style, animation.from);
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Trigger animation
        requestAnimationFrame(() => {
            Object.assign(element.style, animation.to);
        });
    }
    
    // Method to add new elements to observation
    observeNewElements(selector) {
        const newElements = document.querySelectorAll(selector);
        newElements.forEach(element => {
            if (!this.observedElements.has(element)) {
                this.intersectionObserver.observe(element);
                this.observedElements.add(element);
            }
        });
    }
}