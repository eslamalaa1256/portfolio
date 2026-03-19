// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Multi-language support
const translations = {
  en: {
    home: "Home",
    about: "About",
    education: "Education",
    learning: "Courses & Learning",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    hello: "Hello, I'm",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    aboutMe: "About Me",
    aboutText: "Computer Engineering Student with strong foundations in web development, problem-solving, and software engineering. Passionate about building scalable and impactful digital solutions.",
    educationTitle: "Education",
    learningTitle: "Courses & Learning",
    experienceTitle: "Experience",
    skillsTitle: "Skills",
    projectsTitle: "Projects",
    contactTitle: "Contact Me",
    all: "All",
    webDev: "Web Development",
    mobile: "Mobile Apps",
    other: "Other"
  },
  ar: {
    home: "الرئيسية",
    about: "حولي",
    education: "التعليم",
    learning: "الدورات والتعلم",
    experience: "الخبرة",
    skills: "المهارات",
    projects: "المشاريع",
    contact: "التواصل",
    hello: "مرحباً، أنا",
    viewProjects: "عرض المشاريع",
    contactMe: "تواصل معي",
    aboutMe: "حولي",
    aboutText: "طالب هندسة حاسوب مع أساس قوي في تطوير الويب وحل المشكلات وهندسة البرمجيات. شغوف ببناء حلول رقمية قابلة للتوسع ومؤثرة.",
    educationTitle: "التعليم",
    learningTitle: "الدورات والتعلم",
    experienceTitle: "الخبرة",
    skillsTitle: "المهارات",
    projectsTitle: "المشاريع",
    contactTitle: "تواصل معي",
    all: "الكل",
    webDev: "تطوير الويب",
    mobile: "تطبيقات الهواتف",
    other: "أخرى"
  }
};

let currentLang = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);

  // Update navigation
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').substring(1);
    link.textContent = translations[lang][href] || link.textContent;
  });

  // Update headings
  document.querySelectorAll('h2').forEach(h2 => {
    const key = h2.textContent.toLowerCase().replace(/\s+/g, '');
    h2.textContent = translations[lang][key] || h2.textContent;
  });

  // Update buttons
  document.querySelectorAll('.btn').forEach(btn => {
    const key = btn.textContent.toLowerCase().replace(/\s+/g, '');
    btn.textContent = translations[lang][key] || btn.textContent;
  });

  // Update filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const filter = btn.getAttribute('data-filter');
    const key = filter === 'all' ? 'all' : filter === 'web' ? 'webDev' : filter === 'mobile' ? 'mobile' : 'other';
    btn.textContent = translations[lang][key] || btn.textContent;
  });

  // Update body direction for Arabic
  document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.body.style.textAlign = lang === 'ar' ? 'right' : 'left';
}

// Language toggle functionality
const langToggle = document.getElementById('lang-toggle');

langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
});

// Initialize language
setLanguage(currentLang);

// Smooth scroll is handled via CSS scroll-behavior

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
}

themeToggle.addEventListener('click', () => {
    const theme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Typing effect (improved: faster, fade-in)
const typingText = document.getElementById('typing-text');
const text = "Computer Engineering Student | Programmer | Web Developer";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingText.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 50); // Faster typing
    } else {
        // Add fade-in effect after typing completes
        typingText.style.opacity = '0';
        setTimeout(() => {
            typingText.style.transition = 'opacity 1s ease-in';
            typingText.style.opacity = '1';
        }, 500);
    }
}

window.addEventListener('load', typeWriter);

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Dynamic navbar (hide/show on scroll)
let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    // Active navbar link on scroll
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced scroll animations with fade and scale
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            obs.unobserve(entry.target); // stop observing for better performance
        }
    });
}, observerOptions);

document.querySelectorAll('section, .project-card, .skill-card, .certification-card, .education-item, .experience-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px) scale(0.9)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Animated counters for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-target');
            const data = +counter.innerText;
            const time = value / speed;

            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = value;
            }
        };
        animate();
    });
};

// Trigger counter animation when fun-facts section is visible
const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const funFactsSection = document.getElementById('fun-facts');
if (funFactsSection) {
    statsObserver.observe(funFactsSection);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        setTimeout(() => {
            formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
            formMessage.className = 'form-message success';
            contactForm.reset();
        }, 1000);
    });
}

// Project Modal Functionality
const modalButtons = document.querySelectorAll('.project-card button');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

modalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.parentElement.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.transform = 'translateY(-20px) scale(0.9)';
            modalContent.style.animation = 'bounceIn 0.6s ease-out';
            setTimeout(() => {
                modalContent.style.transform = 'translateY(0) scale(1)';
            }, 50);
        }
    });
});

closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});

// Swipe gestures for mobile navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const sections = document.querySelectorAll('section');
    const currentSection = getCurrentSection();

    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next section
        const nextSection = currentSection.nextElementSibling;
        if (nextSection && nextSection.tagName === 'SECTION') {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous section
        const prevSection = currentSection.previousElementSibling;
        if (prevSection && prevSection.tagName === 'SECTION') {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            return section;
        }
    }
    return sections[0];
}

// Project filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                // For demo purposes, we'll show all cards since we don't have categories assigned
                // In a real implementation, you'd check card categories
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            }
        });
    });
});

// Add hover scale effect to all buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.05)';
        btn.style.transition = 'transform 0.2s ease';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    });
});
