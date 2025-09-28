
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const scrolled = window.pageYOffset;

  if (scrolled > 50) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

const animateElements = document.querySelectorAll(
  ".project-card, .skill-item, .about-text, .contact-content"
);
animateElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating-element");

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    heroTitle.style.opacity = "0";
    heroTitle.style.transform = "translateY(20px)";

    setTimeout(() => {
      heroTitle.style.transition = "opacity 1s ease, transform 1s ease";
      heroTitle.style.opacity = "1";
      heroTitle.style.transform = "translateY(0)";
    }, 500);
  }
});

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-15px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

const skillItems = document.querySelectorAll(".skill-item");

skillItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const icon = item.querySelector("i");
    icon.style.transform = "scale(1.2) rotate(10deg)";
    icon.style.transition = "transform 0.3s ease";
  });

  item.addEventListener("mouseleave", () => {
    const icon = item.querySelector("i");
    icon.style.transform = "scale(1) rotate(0deg)";
  });
});

const socialLinks = document.querySelectorAll(".social-link");

socialLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.transform = "translateY(-5px) scale(1.1)";
  });

  link.addEventListener("mouseleave", () => {
    link.style.transform = "translateY(0) scale(1)";
  });
});

function revealSection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
    }
  });
}

const sectionObserver = new IntersectionObserver(revealSection, {
  threshold: 0.15,
});

document.querySelectorAll("section").forEach((section) => {
  sectionObserver.observe(section);
});

const style = document.createElement("style");
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    #home {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: #667eea;
    }
`;
document.head.appendChild(style);

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

if (window.innerWidth > 768) {
  const cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: window.innerWidth / 2,
    endY: window.innerHeight / 2,
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.createElement("div"),
    $outline: document.createElement("div"),

    init: function () {
      this.$dot.style.cssText = `
                position: fixed;
                left: 0;
                top: 0;
                width: 8px;
                height: 8px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 50%;
                opacity: 0.8;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 10001;
                transition: opacity 0.3s ease;
            `;

      this.$outline.style.cssText = `
                position: fixed;
                left: 0;
                top: 0;
                width: 40px;
                height: 40px;
                border: 1px solid rgba(102, 126, 234, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 10000;
                transition: all 0.08s ease-out;
            `;

      document.body.appendChild(this.$dot);
      document.body.appendChild(this.$outline);

      this.setupEventListeners();
      this.animateDotOutline();
    },

    setupEventListeners: function () {
      const self = this;

      document.addEventListener("mousemove", function (e) {
        self.cursorVisible = true;
        self.endX = e.clientX;
        self.endY = e.clientY;
        self.$dot.style.opacity = 0.8;
        self.$outline.style.opacity = 0.3;
      });

      document.addEventListener("mouseenter", function () {
        self.cursorVisible = true;
        self.$dot.style.opacity = 0.8;
        self.$outline.style.opacity = 0.3;
      });

      document.addEventListener("mouseleave", function () {
        self.cursorVisible = false;
        self.$dot.style.opacity = 0;
        self.$outline.style.opacity = 0;
      });

      const interactiveElements =
        "a, button, .btn, .project-card, .skill-item, .social-link";
      document.querySelectorAll(interactiveElements).forEach((el) => {
        el.addEventListener("mouseenter", function () {
          self.$outline.style.transform = "translate(-50%, -50%) scale(1.5)";
          self.$outline.style.borderColor = "rgba(102, 126, 234, 0.8)";
        });

        el.addEventListener("mouseleave", function () {
          self.$outline.style.transform = "translate(-50%, -50%) scale(1)";
          self.$outline.style.borderColor = "rgba(102, 126, 234, 0.3)";
        });
      });
    },

    animateDotOutline: function () {
      const self = this;

      self._x += (self.endX - self._x) / self.delay;
      self._y += (self.endY - self._y) / self.delay;
      self.$dot.style.left = self.endX + "px";
      self.$dot.style.top = self.endY + "px";
      self.$outline.style.left = self._x + "px";
      self.$outline.style.top = self._y + "px";

      requestAnimationFrame(this.animateDotOutline.bind(self));
    },
  };

  cursor.init();
}

function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const throttledScrollHandler = throttle(() => {
}, 16);
window.addEventListener("scroll", throttledScrollHandler);

window.addEventListener("load", () => {
  const preloader = document.createElement("div");
  preloader.id = "preloader";
  preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;

  const loader = document.createElement("div");
  loader.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(102, 126, 234, 0.3);
        border-top: 3px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;

  const spinStyle = document.createElement("style");
  spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(spinStyle);

  preloader.appendChild(loader);
  document.body.appendChild(preloader);

  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }, 1000);
});

