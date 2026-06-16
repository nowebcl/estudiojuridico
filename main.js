document.addEventListener('DOMContentLoaded', () => {
  // Slide-out Drawer Menu Elements
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuDrawer = document.getElementById('menuDrawer');
  
  if (menuToggleBtn && menuDrawer && menuOverlay) {
    // Open Drawer
    menuToggleBtn.addEventListener('click', openMenu);
    
    // Close Drawer
    if (menuCloseBtn) {
      menuCloseBtn.addEventListener('click', closeMenu);
    }
    menuOverlay.addEventListener('click', closeMenu);
    
    // Close Drawer when clicking any link
    const drawerLinks = menuDrawer.querySelectorAll('.drawer-link');
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  function openMenu() {
    menuDrawer.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    menuDrawer.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  // Header Scroll Effect
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => {
      revealOnScroll.observe(el);
    });
  }

  // Contact Form Handler
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      // Basic validation
      if (!name || !lastName || !email || !message) {
        showFormMessage('Por favor, completa todos los campos del formulario.', 'error');
        return;
      }
      
      if (!validateEmail(email)) {
        showFormMessage('Por favor, ingresa un correo electrónico válido.', 'error');
        return;
      }
      
      // Disable button & show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }
      
      // Simulate form submission
      setTimeout(() => {
        showFormMessage('¡Gracias por tu mensaje! Nos pondremos en contacto contigo a la brevedad.', 'success');
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Enviar';
        }
      }, 1200);
    });
  }
  
  function showFormMessage(msg, type) {
    formMessage.textContent = msg;
    formMessage.className = `form-message ${type}`;
    
    if (window.innerWidth < 768) {
      formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
