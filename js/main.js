// Helper to inject HTML into slots
async function injectSection(id, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (err) {
        console.error(`Error loading ${filePath}:`, err);
    }
}

// Logic for the Interchanging About Cards
let cardState = 0;
let autoRotate;

function rotateAboutCards() {
    const cards = [
        document.getElementById('card-1'),
        document.getElementById('card-2'),
        document.getElementById('card-3')
    ];
    
    // Safety check in case elements aren't loaded yet
    if (!cards[0]) return;

    cardState = (cardState + 1) % 3;

    if (cardState === 0) {
        cards[0].className = 'about-card active-card glass p-8 rounded-[2.5rem] border-white/10 absolute transition-all duration-700 ease-in-out shadow-2xl';
        cards[1].className = 'about-card back-card-left glass p-8 rounded-[2.5rem] border-white/10 absolute transition-all duration-700 ease-in-out';
        cards[2].className = 'about-card back-card-right glass p-8 rounded-[2.5rem] border-white/10 absolute transition-all duration-700 ease-in-out';
    } else if (cardState === 1) {
        cards[1].className = 'about-card active-card glass p-8 rounded-[2.5rem] border-white/10 absolute transition-all duration-700 ease-in-out shadow-2xl';
        cards[2].className = 'about-card back-card-left glass p-8 rounded-[2.5rem] border-white/10 absolute transition-all duration-700 ease-in-out';
        cards[0].className = 'about-card back-card-right glass p-8 rounded-[2.5rem] border-white/10 absolute transition-all duration-700 ease-in-out';
    } else {
        cards[2].className = 'about-card active-card glass p-8 rounded-[2.5rem] border-white/10 absolute transition-all duration-700 ease-in-out shadow-2xl';
        cards[0].className = 'about-card back-card-left glass p-8 rounded-[2.5rem] border-white/10 absolute transition-all duration-700 ease-in-out';
        cards[1].className = 'about-card back-card-right glass p-8 rounded-[2.5rem] border-white/10 absolute transition-all duration-700 ease-in-out';
    }
}

// Main Loader
async function initPortfolio() {
    // 1. Inject Navigation first
    await injectSection('nav-slot', 'components/nav.html');

    // 2. Load all other sections
    await Promise.all([
        injectSection('hero-slot', 'components/hero.html'),
        injectSection('about-slot', 'components/about.html'),
        injectSection('skills-slot', 'components/skills.html'),
        injectSection('projects-slot', 'components/projects.html'),
        injectSection('contact-slot', 'components/contact.html')
    ]);

    // 3. Start Scroll Reveal (must happen AFTER injection)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 4. Initialize About Card Auto-Rotation
    const aboutContainer = document.querySelector('.about-card')?.parentElement;
    if (aboutContainer) {
        autoRotate = setInterval(rotateAboutCards, 4000);
        
        // Pause on hover
        aboutContainer.addEventListener('mouseenter', () => clearInterval(autoRotate));
        aboutContainer.addEventListener('mouseleave', () => autoRotate = setInterval(rotateAboutCards, 4000));
    }
}

// Run the application
document.addEventListener('DOMContentLoaded', initPortfolio);