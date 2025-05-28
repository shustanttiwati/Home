// Navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinksItems = document.querySelectorAll('.nav-link');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Animate toggle button
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking on a link
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // Handle contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send this data to a server
      // For demo purposes, we'll just log it and show a success message
      console.log('Form submitted:', { name, email, message });
      
      // Show success message
      const formContainer = contactForm.parentElement;
      contactForm.style.display = 'none';
      
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message fade-in';
      successMessage.innerHTML = `
        <h3>Thank you, ${name}!</h3>
        <p>Your message has been received. We'll get back to you shortly.</p>
        <button class="btn btn-primary" id="resetForm">Send another message</button>
      `;
      
      formContainer.appendChild(successMessage);
      
      // Add event listener for the reset button
      document.getElementById('resetForm').addEventListener('click', function() {
        contactForm.reset();
        successMessage.remove();
        contactForm.style.display = 'block';
      });
    });
  }

  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }
    
    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });

  // Implement Reveal on Scroll
  window.addEventListener('scroll', revealElements);
  
  function revealElements() {
    const reveals = document.querySelectorAll('[data-aos]');
    
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('aos-animate');
      }
    }
  }
  
  // Initialize reveal on load
  revealElements();
  
  // Set dynamic copyright year
  const yearSpan = document.querySelector('.footer-bottom p');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = `&copy; ${currentYear} Your Have. All rights reserved.`;
  }
});