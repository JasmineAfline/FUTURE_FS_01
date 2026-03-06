const yearEl = document.getElementById("year");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav]");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const projectsGrid = document.getElementById("projectsGrid");

const projects = [
  {
    title: "TicketWise Event Website",
    description:
      "Full-stack event management system with multi-role authentication, M-Pesa integration, and real-time sales reporting.",
    tags: ["Node.js", "React", "Express", "MongoDB", "M-Pesa"],
    url: "https://github.com/JasmineAfline/TicketWise-event",
  },
  {
    title: "Helphive Donation Website",
    description:
      "A donation platform connecting donors and NGOs, featuring a secure backend and responsive UI.",
    tags: ["Laravel", "PHP", "JavaScript", "HTML", "CSS"],
    url: "https://github.com/JasmineAfline/Helphive_donation_website",
  },
  {
    title: "Final Project PLP (E-commerce)",
    description:
      "A functional storefront with product filtering, dynamic cart, and local storage persistence.",
    tags: ["JavaScript", "HTML", "CSS", "LocalStorage"],
    url: "https://github.com/JasmineAfline/FinalProjectPLP",
  },
];

function renderProjects() {
  projectsGrid.innerHTML = projects
    .map(
      (project) => `
      <article class="project-card">
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
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close mobile nav on click
  navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupSmoothScroll() {
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#" || targetId === "#top") {
        return;
      }
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function init() {
  yearEl.textContent = new Date().getFullYear();
  renderProjects();
  setupNavigation();
  setupSmoothScroll();
  contactForm.addEventListener("submit", handleFormSubmit);
}

init();
