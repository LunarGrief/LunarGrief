// Smooth scrolling functionality
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Memorial form handling
document.addEventListener('DOMContentLoaded', function() {
    const memorialForm = document.getElementById('memorialForm');
    const memorialWall = document.getElementById('memorialWall');
    
    // Load existing memorials from localStorage
    loadMemorials();
    
    if (memorialForm) {
        memorialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const messageInput = document.getElementById('message');
            
            if (nameInput.value.trim() && messageInput.value.trim()) {
                addMemorial(nameInput.value.trim(), messageInput.value.trim());
                nameInput.value = '';
                messageInput.value = '';
                
                // Show success feedback
                showNotification('Memory added to the memorial wall');
            }
        });
    }
    
    // Add smooth scrolling to navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Add parallax effect to moon
    addParallaxEffect();
    
    // Add fade-in animation to sections on scroll
    addScrollAnimations();
    
    // Create floating particles
    createFloatingParticles();
    
    // Check server status
    checkServerStatus();
    
    // Check server status every 30 seconds
    setInterval(checkServerStatus, 30000);
});

function addMemorial(name, message) {
    const memorial = {
        id: Date.now(),
        name: name,
        message: message,
        date: new Date().toLocaleDateString()
    };
    
    // Save to localStorage
    let memorials = JSON.parse(localStorage.getItem('lunarMemorials') || '[]');
    memorials.unshift(memorial);
    localStorage.setItem('lunarMemorials', JSON.stringify(memorials));
    
    // Add to DOM
    displayMemorial(memorial);
}

function displayMemorial(memorial) {
    const memorialWall = document.getElementById('memorialWall');
    if (!memorialWall) return;
    
    const memorialEntry = document.createElement('div');
    memorialEntry.className = 'memorial-entry';
    memorialEntry.innerHTML = `
        <h4>${memorial.name}</h4>
        <p>${memorial.message}</p>
        <small style="color: #718096; font-size: 0.9rem;">${memorial.date}</small>
    `;
    
    memorialWall.insertBefore(memorialEntry, memorialWall.firstChild);
}

function loadMemorials() {
    const memorials = JSON.parse(localStorage.getItem('lunarMemorials') || '[]');
    const memorialWall = document.getElementById('memorialWall');
    
    if (memorialWall && memorials.length > 0) {
        memorials.forEach(memorial => displayMemorial(memorial));
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(74, 85, 104, 0.9);
        color: #e8e8f0;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function addParallaxEffect() {
    const moon = document.querySelector('.moon');
    const stars = document.querySelector('.stars');
    
    if (moon || stars) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            if (moon) {
                moon.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            if (stars) {
                stars.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
}

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Observe cards
    const cards = document.querySelectorAll('.about-card, .phase, .resource-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

function createFloatingParticles() {
    const particleCount = 20;
    const container = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
    `;
    
    // Random starting position
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    
    container.appendChild(particle);
    
    // Animate particle
    animateParticle(particle);
}

function animateParticle(particle) {
    const duration = 10000 + Math.random() * 20000; // 10-30 seconds
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    const endX = Math.random() * window.innerWidth;
    const endY = Math.random() * window.innerHeight;
    
    let startTime = null;
    
    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentX = startX + (endX - startX) * easeProgress;
        const currentY = startY + (endY - startY) * easeProgress;
        
        particle.style.left = currentX + 'px';
        particle.style.top = currentY + 'px';
        particle.style.opacity = 0.6 * (1 - progress * 0.5); // Fade out slightly
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Reset particle with new random position
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            animateParticle(particle);
        }
    }
    
    requestAnimationFrame(animate);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        const mobileMenu = document.querySelector('.nav-links.active');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    }
});

// Add touch gesture support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        // Could be used for mobile navigation in future
        console.log(diff > 0 ? 'Swiped left' : 'Swiped right');
    }
}

// Server status checking
function checkServerStatus() {
    const serverStatus = document.querySelector('.server-status');
    if (!serverStatus) return;
    
    // For demo purposes, show server as online
    serverStatus.textContent = 'Online';
    serverStatus.className = 'server-status online';
}

// Copy IP functionality
function copyIP() {
    const ip = 'f1.rustix.me:28302';
    const copyBtn = document.querySelector('.copy-ip-btn');
    
    // Copy to clipboard
    navigator.clipboard.writeText(ip).then(() => {
        // Show copied state
        copyBtn.textContent = '✓';
        copyBtn.classList.add('copied');
        copyBtn.title = 'Скопировано!';
        
        // Show notification
        showNotification('IP адрес скопирован: ' + ip, 'success');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            copyBtn.textContent = '📋';
            copyBtn.classList.remove('copied');
            copyBtn.title = 'Скопировать IP';
        }, 2000);
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = ip;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            copyBtn.textContent = '✓';
            copyBtn.classList.add('copied');
            copyBtn.title = 'Скопировано!';
            showNotification('IP адрес скопирован: ' + ip, 'success');
            
            setTimeout(() => {
                copyBtn.textContent = '📋';
                copyBtn.classList.remove('copied');
                copyBtn.title = 'Скопировать IP';
            }, 2000);
        } catch (err) {
            showNotification('Не удалось скопировать IP', 'error');
        }
        
        document.body.removeChild(textArea);
    });
}
