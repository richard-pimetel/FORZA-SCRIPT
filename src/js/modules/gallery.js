// Gallery management module
export class GalleryManager {
    constructor() {
        this.galleryImages = [
            {
                id: 1,
                src: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
                title: "Corrida no Deserto",
                description: "Velocidade máxima nas dunas mexicanas"
            },
            {
                id: 2,
                src: "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800",
                title: "Supercar na Cidade",
                description: "Explorando as ruas vibrantes do México"
            },
            {
                id: 3,
                src: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=800",
                title: "Off-Road Extremo",
                description: "Aventura nas montanhas selvagens"
            },
            {
                id: 4,
                src: "https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800",
                title: "Clássico Atemporal",
                description: "Elegância e potência em harmonia"
            },
            {
                id: 5,
                src: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800",
                title: "Hypercar Futurista",
                description: "O futuro da velocidade chegou"
            },
            {
                id: 6,
                src: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800",
                title: "Precisão Alemã",
                description: "Engenharia de precisão em ação"
            },
            {
                id: 7,
                src: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800",
                title: "Aventura Todo-Terreno",
                description: "Sem limites, sem fronteiras"
            },
            {
                id: 8,
                src: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800",
                title: "Muscle Car Americano",
                description: "Potência bruta e estilo clássico"
            },
            {
                id: 9,
                src: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
                title: "Pôr do Sol Mexicano",
                description: "Beleza natural encontra velocidade"
            }
        ];
        
        this.galleryGrid = null;
        this.currentImageIndex = 0;
        this.lightboxOpen = false;
    }
    
    init() {
        this.galleryGrid = document.getElementById('galleryGrid');
        
        if (this.galleryGrid) {
            this.renderGallery();
            this.setupLightbox();
        }
    }
    
    renderGallery() {
        if (!this.galleryGrid) return;
        
        this.galleryGrid.innerHTML = this.galleryImages.map((image, index) => 
            this.createGalleryItem(image, index)
        ).join('');
        
        // Add click listeners to gallery items
        this.setupGalleryItemListeners();
    }
    
    createGalleryItem(image, index) {
        return `
            <div class="gallery-item fade-in-up" data-index="${index}" style="animation-delay: ${index * 0.1}s">
                <img src="${image.src}" alt="${image.title}" loading="lazy">
                <div class="gallery-overlay">
                    <div class="gallery-title">${image.title}</div>
                </div>
            </div>
        `;
    }
    
    setupGalleryItemListeners() {
        const galleryItems = this.galleryGrid.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.openLightbox(index);
            });
        });
    }
    
    setupLightbox() {
        // Create lightbox HTML
        const lightboxHTML = `
            <div id="lightbox" class="lightbox">
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <button class="lightbox-prev">&#10094;</button>
                    <button class="lightbox-next">&#10095;</button>
                    <img class="lightbox-image" src="" alt="">
                    <div class="lightbox-info">
                        <h3 class="lightbox-title"></h3>
                        <p class="lightbox-description"></p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        
        // Add lightbox styles
        this.addLightboxStyles();
        
        // Setup lightbox event listeners
        this.setupLightboxListeners();
    }
    
    addLightboxStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                display: none;
                position: fixed;
                z-index: 10000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(10px);
            }
            
            .lightbox-content {
                position: relative;
                margin: auto;
                padding: 20px;
                width: 90%;
                max-width: 1200px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            
            .lightbox-image {
                max-width: 100%;
                max-height: 70vh;
                object-fit: contain;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }
            
            .lightbox-close {
                position: absolute;
                top: 20px;
                right: 30px;
                color: white;
                font-size: 40px;
                font-weight: bold;
                cursor: pointer;
                z-index: 10001;
                transition: all 0.3s ease;
            }
            
            .lightbox-close:hover {
                color: #ff6b35;
                transform: scale(1.1);
            }
            
            .lightbox-prev,
            .lightbox-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(255, 107, 53, 0.8);
                color: white;
                border: none;
                padding: 15px 20px;
                font-size: 24px;
                cursor: pointer;
                border-radius: 50%;
                transition: all 0.3s ease;
                z-index: 10001;
            }
            
            .lightbox-prev {
                left: 30px;
            }
            
            .lightbox-next {
                right: 30px;
            }
            
            .lightbox-prev:hover,
            .lightbox-next:hover {
                background: rgba(255, 107, 53, 1);
                transform: translateY(-50%) scale(1.1);
            }
            
            .lightbox-info {
                text-align: center;
                margin-top: 20px;
                color: white;
            }
            
            .lightbox-title {
                font-size: 1.5rem;
                font-weight: 700;
                margin-bottom: 10px;
                color: #ff6b35;
            }
            
            .lightbox-description {
                font-size: 1.1rem;
                color: #cccccc;
            }
            
            @media (max-width: 768px) {
                .lightbox-prev,
                .lightbox-next {
                    padding: 10px 15px;
                    font-size: 20px;
                }
                
                .lightbox-prev {
                    left: 15px;
                }
                
                .lightbox-next {
                    right: 15px;
                }
                
                .lightbox-close {
                    top: 15px;
                    right: 20px;
                    font-size: 30px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setupLightboxListeners() {
        const lightbox = document.getElementById('lightbox');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        // Close lightbox
        closeBtn.addEventListener('click', () => this.closeLightbox());
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });
        
        // Navigation
        prevBtn.addEventListener('click', () => this.previousImage());
        nextBtn.addEventListener('click', () => this.nextImage());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightboxOpen) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.previousImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });
    }
    
    openLightbox(index) {
        this.currentImageIndex = index;
        this.lightboxOpen = true;
        
        const lightbox = document.getElementById('lightbox');
        const image = lightbox.querySelector('.lightbox-image');
        const title = lightbox.querySelector('.lightbox-title');
        const description = lightbox.querySelector('.lightbox-description');
        
        const currentImage = this.galleryImages[index];
        
        image.src = currentImage.src;
        image.alt = currentImage.title;
        title.textContent = currentImage.title;
        description.textContent = currentImage.description;
        
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    }
    
    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.lightboxOpen = false;
    }
    
    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
        this.updateLightboxImage();
    }
    
    previousImage() {
        this.currentImageIndex = this.currentImageIndex === 0 
            ? this.galleryImages.length - 1 
            : this.currentImageIndex - 1;
        this.updateLightboxImage();
    }
    
    updateLightboxImage() {
        const lightbox = document.getElementById('lightbox');
        const image = lightbox.querySelector('.lightbox-image');
        const title = lightbox.querySelector('.lightbox-title');
        const description = lightbox.querySelector('.lightbox-description');
        
        const currentImage = this.galleryImages[this.currentImageIndex];
        
        // Fade out
        image.style.opacity = '0';
        
        setTimeout(() => {
            image.src = currentImage.src;
            image.alt = currentImage.title;
            title.textContent = currentImage.title;
            description.textContent = currentImage.description;
            
            // Fade in
            image.style.opacity = '1';
        }, 150);
    }
    
    // Method to add new image to gallery
    addImage(imageData) {
        const newImage = {
            id: this.galleryImages.length + 1,
            ...imageData
        };
        this.galleryImages.push(newImage);
        this.renderGallery();
    }
}