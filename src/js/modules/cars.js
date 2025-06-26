// Car management module
export class CarManager {
    constructor() {
        this.cars = [
            {
                id: 1,
                name: "McLaren Senna",
                category: "hypercar",
                image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600",
                speed: 340,
                acceleration: 2.8,
                handling: 95
            },
            {
                id: 2,
                name: "Lamborghini Huracán",
                category: "supercar",
                image: "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=600",
                speed: 325,
                acceleration: 3.2,
                handling: 92
            },
            {
                id: 3,
                name: "Ford Bronco",
                category: "offroad",
                image: "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=600",
                speed: 180,
                acceleration: 6.5,
                handling: 78
            },
            {
                id: 4,
                name: "Ferrari F40",
                category: "classic",
                image: "https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=600",
                speed: 324,
                acceleration: 4.1,
                handling: 88
            },
            {
                id: 5,
                name: "Bugatti Chiron",
                category: "hypercar",
                image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=600",
                speed: 420,
                acceleration: 2.4,
                handling: 89
            },
            {
                id: 6,
                name: "Porsche 911 GT3",
                category: "supercar",
                image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600",
                speed: 318,
                acceleration: 3.4,
                handling: 96
            },
            {
                id: 7,
                name: "Jeep Wrangler",
                category: "offroad",
                image: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=600",
                speed: 160,
                acceleration: 8.2,
                handling: 72
            },
            {
                id: 8,
                name: "Dodge Challenger",
                category: "classic",
                image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600",
                speed: 280,
                acceleration: 4.5,
                handling: 82
            },
            {
                id: 9,
                name: "Koenigsegg Regera",
                category: "hypercar",
                image: "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=600",
                speed: 410,
                acceleration: 2.8,
                handling: 91
            }
        ];
        
        this.currentFilter = 'all';
        this.carsGrid = null;
        this.filterButtons = null;
    }
    
    init() {
        this.carsGrid = document.getElementById('carsGrid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        if (this.carsGrid) {
            this.renderCars();
            this.setupFilters();
        }
    }
    
    renderCars(filter = 'all') {
        if (!this.carsGrid) return;
        
        const filteredCars = filter === 'all' 
            ? this.cars 
            : this.cars.filter(car => car.category === filter);
        
        this.carsGrid.innerHTML = filteredCars.map(car => this.createCarCard(car)).join('');
        
        // Add animation to cards
        this.animateCards();
    }
    
    createCarCard(car) {
        return `
            <div class="car-card fade-in-up" data-category="${car.category}">
                <img src="${car.image}" alt="${car.name}" class="car-image" loading="lazy">
                <div class="car-info">
                    <div class="car-category">${this.getCategoryName(car.category)}</div>
                    <h3 class="car-name">${car.name}</h3>
                    <div class="car-stats">
                        <div class="car-stat">
                            <span class="car-stat-value">${car.speed}</span>
                            <span class="car-stat-label">km/h</span>
                        </div>
                        <div class="car-stat">
                            <span class="car-stat-value">${car.acceleration}s</span>
                            <span class="car-stat-label">0-100</span>
                        </div>
                        <div class="car-stat">
                            <span class="car-stat-value">${car.handling}</span>
                            <span class="car-stat-label">Handling</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getCategoryName(category) {
        const categoryNames = {
            'supercar': 'Supercar',
            'hypercar': 'Hypercar',
            'classic': 'Clássico',
            'offroad': 'Off-Road'
        };
        return categoryNames[category] || category;
    }
    
    setupFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                
                // Update active button
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Filter cars
                this.currentFilter = filter;
                this.renderCars(filter);
            });
        });
    }
    
    animateCards() {
        const cards = this.carsGrid.querySelectorAll('.car-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Method to add new car (for future expansion)
    addCar(carData) {
        const newCar = {
            id: this.cars.length + 1,
            ...carData
        };
        this.cars.push(newCar);
        this.renderCars(this.currentFilter);
    }
    
    // Method to get car by ID
    getCarById(id) {
        return this.cars.find(car => car.id === id);
    }
    
    // Method to search cars
    searchCars(query) {
        return this.cars.filter(car => 
            car.name.toLowerCase().includes(query.toLowerCase()) ||
            car.category.toLowerCase().includes(query.toLowerCase())
        );
    }
}