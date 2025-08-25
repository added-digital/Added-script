require("./components/added_numbers").added_numbers();

// Scrub animation for words - opacity from 50% to 100%
const createWordScrubAnimation = () => {
  // Select all words that should be animated
  const words = document.querySelectorAll("[data-scrub-words]");
  console.log(words);
};

// Initialize the word scrub animation
document.addEventListener("DOMContentLoaded", () => {
  createWordScrubAnimation();
});

// Reinitialize on window resize (optional)
window.addEventListener("resize", () => {
  // Refresh ScrollTrigger instances
  ScrollTrigger.refresh();
});
