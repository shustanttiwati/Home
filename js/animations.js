// Custom cursor
document.addEventListener('DOMContentLoaded', function() {
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  
  if (cursorDot && cursorOutline) {
    // Show cursors when mouse moves
    document.addEventListener('mousemove', function(e) {
      // Make cursor visible when it moves
      if (cursorDot.style.opacity === '0' || cursorOutline.style.opacity === '0') {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
      }
      
      // Position the cursors
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      
      // Delay the outline cursor slightly for effect
      setTimeout(function() {
        cursorOutline.style.left = `${e.clientX}px`;
        cursorOutline.style.top = `${e.clientY}px`;
      }, 50);
    });
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseout', function() {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .team-card, input, textarea');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseover', function() {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.border = '2px solid var(--primary-light)';
        cursorOutline.style.backgroundColor = 'rgba(255, 126, 38, 0.1)';
      });
      
      element.addEventListener('mouseout', function() {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.border = '2px solid var(--primary-light)';
        cursorOutline.style.backgroundColor = 'transparent';
      });
    });
  }
  
  // Parallax effect on hero section
  const heroSection = document.querySelector('.hero');
  
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrollValue = window.scrollY;
      heroSection.style.backgroundPosition = `center ${scrollValue * 0.5}px`;
    });
  }
  
  // Animate counter for stats (if added later)
  function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      element.textContent = Math.floor(start);
      
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  }
  
  // Card tilt effect
  const cards = document.querySelectorAll('.feature-card, .team-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX * 10; // max 10 degree tilt
      const deltaY = (y - centerY) / centerY * 10; // max 10 degree tilt
      
      this.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
  
  // Animated gradient background
  function animateGradient() {
    const colors = [
      'linear-gradient(135deg, #ff7e26 0%, #ff5100 100%)',
      'linear-gradient(135deg, #ff5100 0%, #ff7e26 100%)',
      'linear-gradient(135deg, #ff6213 0%, #ff8a3d 100%)'
    ];
    
    let index = 0;
    const hero = document.querySelector('.hero');
    
    if (hero) {
      setInterval(() => {
        index = (index + 1) % colors.length;
        hero.style.background = colors[index];
      }, 5000);
    }
  }
  
  // Initialize all animations
  function initAnimations() {
    // Animate elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    animatedElements.forEach(element => {
      const delay = element.getAttribute('data-aos-delay') || 0;
      
      setTimeout(() => {
        element.classList.add('aos-animate');
      }, delay);
    });
    
    // Start gradient animation
    animateGradient();
  }
  
  // Init animations after a short delay to ensure DOM is fully loaded
  setTimeout(initAnimations, 100);
});
