// Update this to the email address where you want to receive enquiries.
const YOUR_EMAIL = "your-email@example.com";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Reveal sections as they enter the screen.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// This opens the visitor's email app. It does not send messages to a server.
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (YOUR_EMAIL === "your-email@example.com") {
    formNote.textContent = "Before using this form, open script.js and replace YOUR_EMAIL with your real contact email.";
    formNote.classList.add("form-warning");
    return;
  }

  const formData = new FormData(contactForm);
  const senderName = formData.get("name").trim();
  const senderEmail = formData.get("email").trim();
  const message = formData.get("message").trim();

  const subject = encodeURIComponent(`Portfolio enquiry from ${senderName}`);
  const body = encodeURIComponent(
    `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
  formNote.textContent = "Your email app should open with the message ready. Review it and send it from there.";
  formNote.classList.remove("form-warning");
});
