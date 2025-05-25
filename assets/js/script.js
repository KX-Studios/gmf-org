// ====== COMBINED OPTIMIZED SCRIPT.JS ======

// 1. Active Nav Link Highlighting (your original code)
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

// 2. Optimized Header Scroll Effect (new improved version)
let lastScrollY = window.scrollY;
let ticking = false;

const updateHeader = () => {
  const header = document.querySelector('.main-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  ticking = false;
};

const onScroll = () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(updateHeader);
    ticking = true;
  }
};

// 3. Smooth Scroll for Anchor Links (your original code)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

// 4. Optimized Scroll Reveal Animation (improved version)
const scrollReveal = () => {
  const reveals = document.querySelectorAll('.fade-in, .reveal'); // Supports both classes
  const windowHeight = window.innerHeight;
  const elementVisible = 150;

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// 5. Team Member Hover Effect (your original code)
const teamMembers = document.querySelectorAll('.team-member');
teamMembers.forEach(member => {
  member.addEventListener('mouseenter', () => {
    member.style.transform = 'translateY(-10px)';
  });
  
  member.addEventListener('mouseleave', () => {
    member.style.transform = 'translateY(0)';
  });
});

// 6. Button Ripple Effect (modified to allow navigation)
const buttons = document.querySelectorAll('.btn-primary');
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    // Only prevent default if it's not a link
    if (!this.href) {
      e.preventDefault();
    }
    
    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;
    
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
      // If it's a link, navigate after ripple animation
      if (this.href && !e.defaultPrevented) {
        window.location.href = this.href;
      }
    }, 1000);
  });
});
// 7. Stats Counter Animation (new feature)
const animateStats = () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target;
        const target = parseInt(statNumber.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        
        let current = start;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            clearInterval(timer);
            current = target;
          }
          statNumber.textContent = Math.floor(current);
        }, 16);
        
        observer.unobserve(statNumber);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
};

// 8. Form Submission Handler (new feature)
const handleFormSubmit = () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.elements['name'].value;
    const email = contactForm.elements['email'].value;
    const subject = contactForm.elements['subject'].value;
    const message = contactForm.elements['message'].value;
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
  });
};

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all functions when DOM loads
  updateHeader(); // Set initial header state
  scrollReveal(); // Initial check for elements in view
  animateStats();
  handleFormSubmit();
  
  // Animate hero text if on homepage
  const heroText = document.querySelector('.hero-text');
  if (heroText) {
    heroText.style.opacity = '1';
    heroText.style.transform = 'translateY(0)';
  }
});

// ====== EVENT LISTENERS ======
window.addEventListener('scroll', onScroll, { passive: true });

// Debounced scroll event for reveal animations
let isScrolling;
window.addEventListener('scroll', () => {
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    scrollReveal();
  }, 66); // ~15fps
}, { passive: true });

// Handle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    scrollReveal();
  }, 100);
});