/* =========================================
   GSAP + ScrollTrigger Setup
========================================= */
gsap.registerPlugin(ScrollTrigger);

/* =========================================
   Navbar Scroll Effect
========================================= */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =========================================
   Hero Section Animation
========================================= */
gsap.from(".text-1", { y: 50, opacity: 0, duration: 1 });
gsap.from(".text-2", { y: 50, opacity: 0, duration: 1, delay: 0.5 });

/* =========================================
   About Section Animation
========================================= */
gsap.from(".about-img", {
  scrollTrigger: ".about",
  x: -100,
  opacity: 0,
  duration: 1,
});
gsap.from(".about-text", {
  scrollTrigger: ".about",
  x: 100,
  opacity: 0,
  duration: 1,
});

/* =========================================
   Services Section Animation
========================================= */
gsap.from(".service-card", {
  scrollTrigger: ".services",
  y: 100,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
});

/* =========================================
   Features Section Animation
========================================= */
gsap.from(".features-text", {
  scrollTrigger: ".features",
  x: -100,
  opacity: 0,
  duration: 1,
});
gsap.from(".features-img", {
  scrollTrigger: ".features",
  x: 100,
  opacity: 0,
  duration: 1,
});

/* =========================================
   Contact Section Animation
========================================= */
gsap.from(".contact-info", {
  scrollTrigger: ".contact",
  x: -100,
  opacity: 0,
  duration: 1,
});
gsap.from(".appointment-form", {
  scrollTrigger: ".contact",
  x: 100,
  opacity: 0,
  duration: 1,
});

/* =========================================
   Smooth Scroll for Anchor Links
========================================= */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

/* =========================================
   Mobile Menu Toggle
========================================= */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* =========================================
   Service Card Hover Effects
========================================= */
const cards = document.querySelectorAll(".service-card");

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.05,
      boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
      duration: 0.3,
      ease: "power2.out",
    });

    // Icon bounce effect
    gsap.fromTo(
      card.querySelector(".icon"),
      { y: 0 },
      { y: -10, duration: 0.3, ease: "bounce.out" }
    );
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.to(card.querySelector(".icon"), {
      y: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  });
});

/* =========================================
   Custom Select (Time Dropdown Arrow)
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const selectWrapper = document.querySelector(".custom-select");
  const selectElement = document.querySelector("#timeSelect");

  // Toggle arrow rotation
  selectElement.addEventListener("mousedown", () => {
    selectWrapper.classList.add("open");
  });

  // Reset arrow on blur
  selectElement.addEventListener("blur", () => {
    selectWrapper.classList.remove("open");
  });
});

/* =========================================
   Appointment Form Submission
========================================= */
const form = document.getElementById("appointmentForm");
const successMsg = document.getElementById("successMessage");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop redirect
  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
  })
    .then((response) => response.json())
    .then(() => {
      form.reset();
      successMsg.style.display = "block";

      // Success message GSAP animation
      gsap.fromTo(
        successMsg,
        { opacity: 0, scale: 0.7, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      );

      gsap.to(successMsg, {
        boxShadow:
          "0 0 25px rgba(212,175,55,0.8), 0 0 50px rgba(212,175,55,0.4)",
        repeat: 1,
        yoyo: true,
        duration: 1.5,
        delay: 0.5,
      });

      gsap.to(successMsg, {
        opacity: 0,
        y: -40,
        duration: 1,
        delay: 4,
        ease: "power2.inOut",
        onComplete: () => {
          successMsg.style.display = "none";
        },
      });
    })
    .catch(() => {
      alert("❌ Something went wrong. Please try again.");
    });
});

/* =========================================
   Preloader
========================================= */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");

  setTimeout(() => {
    preloader.classList.add("fade-out");
    content.style.display = "block";
  }, 500); // fade out after 3s
});

/* ========== Review Auto-Slide ========== */

window.addEventListener("load", () => {
  const reviewTrack = document.querySelector(".review-track");
  const reviewCards = document.querySelectorAll(".review-card");
  let reviewIndex = 0;
  let visibleReviews = 3;

  function updateVisibleReviews() {
    if (window.innerWidth <= 576) {
      visibleReviews = 1;
    } else if (window.innerWidth <= 992) {
      visibleReviews = 2;
    } else {
      visibleReviews = 3;
    }
  }

  function moveReviewSlider() {
    updateVisibleReviews();
    reviewIndex++;
    if (reviewIndex > reviewCards.length - visibleReviews) {
      reviewIndex = 0;
    }
    const cardWidth = reviewCards[0].offsetWidth + 20; // width + margin
    reviewTrack.style.transform = `translateX(-${reviewIndex * cardWidth}px)`;
  }

  // Run once after everything loads
  updateVisibleReviews();

  // Auto slide every 5s
  setInterval(moveReviewSlider, 5000);

  // Reset on resize
  window.addEventListener("resize", () => {
    updateVisibleReviews();
    reviewIndex = 0;
    reviewTrack.style.transform = "translateX(0)";
  });
});

// Mobile-only review slider (1 review at a time)
// Mobile-only review slider with GSAP
window.addEventListener("load", () => {
  const reviewTrack = document.querySelector(".review-track");
  const reviewCards = document.querySelectorAll(".review-card");
  let reviewIndex = 0;
  let slideInterval;

  function startMobileSlider() {
    if (window.innerWidth > 576) {
      // Stop slider if not mobile
      gsap.set(reviewTrack, { x: 0 });
      clearInterval(slideInterval);
      return;
    }

    const cardWidth = reviewCards[0].offsetWidth + 0; // margin handled in CSS

    slideInterval = setInterval(() => {
      reviewIndex++;
      if (reviewIndex >= reviewCards.length) reviewIndex = 0;

      gsap.to(reviewTrack, {
        x: -reviewIndex * cardWidth,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }, 5000);
  }

  startMobileSlider();

  // Reset on window resize
  window.addEventListener("resize", () => {
    reviewIndex = 0;
    startMobileSlider();
  });
});

/* =========================================
   date and time picker
========================================= */
// Handle custom select for Time
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

  // Get form values
  var name = e.parameter.name;
  var gender = e.parameter.gender;
  var date = e.parameter.date;
  var time = e.parameter.time;

  // Format date properly
  var formattedDate = Utilities.formatDate(
    new Date(date),
    "Asia/Kolkata",
    "dd-MM-yyyy"
  );

  // Push row into sheet
  sheet.appendRow([name, gender, formattedDate, time]);

  return ContentService.createTextOutput("Success");
}

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
