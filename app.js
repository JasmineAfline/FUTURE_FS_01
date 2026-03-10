const yearEl = document.getElementById("year");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav]");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const projectsGrid = document.getElementById("projectsGrid");
const siteHeader = document.querySelector(".site-header");

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A responsive portfolio website with a smooth UI, project showcase, and contact form.",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "#projects",
  },
  {
    title: "Task Tracker",
    description:
      "A simple task tracking app with local storage persistence and dynamic filtering.",
    tags: ["JavaScript", "LocalStorage"],
    url: "#projects",
  },
  {
    title: "Blog API (Node.js)",
    description:
      "A RESTful Node.js backend for managing blog posts, designed for future deployment.",
    tags: ["Node.js", "Express", "MongoDB (optional)"],
    url: "#projects",
  },
];

function renderProjects() {
  projectsGrid.innerHTML = projects
    .map(
      (project, index) => `
      <article class="project-card reveal reveal-delay-${index + 1}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <a class="btn" href="${project.url}" aria-label="View ${project.title}">
          View project
        </a>
      </article>
    `
    )
    .join("");
}

function handleFormSubmit(event) {
  event.preventDefault();

  const data = {
    name: contactForm.name.value.trim(),
    email: contactForm.email.value.trim(),
    message: contactForm.message.value.trim(),
  };

  if (!data.name || !data.email || !data.message) {
    formStatus.textContent = "Please fill out all fields.";
    return;
  }

  // TODO: Replace with real backend endpoint when ready.
  // Example: await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) })
  // This placeholder shows a UI response path and keeps UX responsive.
  formStatus.textContent = "Sending message...";

  window.setTimeout(() => {
    contactForm.reset();
    formStatus.textContent = "Thanks! Your message is on its way.";
  }, 700);
}

function setupNavigation() {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close mobile nav on click
  navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Add active state to nav links on scroll
  const sections = document.querySelectorAll("section[id]");
  
  function highlightNav() {
    const scrollY = window.scrollY;
    
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add("active");
      } else {
        document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNav);
}

function setupScrollAnimations() {
  // Create scroll to top button
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.className = "scroll-top";
  scrollTopBtn.setAttribute("aria-label", "Scroll to top");
  scrollTopBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  `;
  document.body.appendChild(scrollTopBtn);

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }

    // Add scrolled class to header
    if (window.scrollY > 50) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  });

  // Scroll to top on click
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all elements with reveal class
  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });

  // Also observe sections for header animation
  document.querySelectorAll(".section, .hero").forEach((el) => {
    observer.observe(el);
  });
}

function setupSmoothScroll() {
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#" || targetId === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function addRevealClasses() {
  // Add reveal classes to about section elements
  const aboutSection = document.querySelector("#about");
  if (aboutSection) {
    const aboutContent = aboutSection.querySelector(".container");
    if (aboutContent) {
      aboutContent.querySelector("h2")?.classList.add("reveal");
      aboutContent.querySelector("p")?.classList.add("reveal", "reveal-delay-1");
      aboutContent.querySelector(".stats")?.classList.add("reveal", "reveal-delay-2");
    }
  }

  // Add reveal classes to projects section
  const projectsSection = document.querySelector("#projects");
  if (projectsSection) {
    const projectsContent = projectsSection.querySelector(".container");
    if (projectsContent) {
      projectsContent.querySelector("h2")?.classList.add("reveal");
      projectsContent.querySelector(".section-intro")?.classList.add("reveal", "reveal-delay-1");
    }
  }

  // Add reveal classes to skills section
  const skillsSection = document.querySelector("#skills");
  if (skillsSection) {
    const skillsContent = skillsSection.querySelector(".container");
    if (skillsContent) {
      skillsContent.querySelector("h2")?.classList.add("reveal");
      skillsContent.querySelector(".section-intro")?.classList.add("reveal", "reveal-delay-1");
      skillsContent.querySelector(".skill-grid")?.classList.add("reveal", "reveal-delay-2");
    }
  }

  // Add reveal classes to contact section
  const contactSection = document.querySelector("#contact");
  if (contactSection) {
    const contactContent = contactSection.querySelector(".container");
    if (contactContent) {
      contactContent.querySelector("h2")?.classList.add("reveal");
      contactContent.querySelector(".section-intro")?.classList.add("reveal", "reveal-delay-1");
      contactContent.querySelector(".contact-form")?.classList.add("reveal", "reveal-delay-2");
      contactContent.querySelector(".contact-details")?.classList.add("reveal", "reveal-delay-3");
    }
  }
}

function init() {
  yearEl.textContent = new Date().getFullYear();
  renderProjects();
  setupNavigation();
  setupSmoothScroll();
  setupScrollAnimations();
  addRevealClasses();
  contactForm.addEventListener("submit", handleFormSubmit);
}

init();
