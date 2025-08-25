require("./components/added_numbers").added_numbers();

// Scrub animation for words - opacity from 50% to 100%
const createWordScrubAnimation = () => {
  // Select all words that should be animated
  const words = document.querySelectorAll("[data-scrub-words]");

  words.forEach((wordContainer) => {
    // Split the text into individual words
    const text = wordContainer.textContent;
    const wordsArray = text.split(" ");

    // Clear the container
    wordContainer.innerHTML = "";

    // Create spans for each word
    wordsArray.forEach((word, index) => {
      const wordSpan = document.createElement("span");
      wordSpan.textContent = word + (index < wordsArray.length - 1 ? " " : "");
      wordSpan.style.opacity = "0.5"; // Start at 50% opacity
      wordContainer.appendChild(wordSpan);
    });

    // Create ScrollTrigger for scrub animation
    gsap.to(wordContainer.querySelectorAll("span"), {
      opacity: 1, // Animate to 100% opacity
      duration: 1,
      ease: "none",
      stagger: 0.1, // Stagger the animation between words
      scrollTrigger: {
        trigger: wordContainer,
        start: "top 80%", // Start when top of element is 80% from top of viewport
        end: "bottom 20%", // End when bottom of element is 20% from top of viewport
        scrub: true, // Enable scrub for smooth scroll-based animation
        toggleActions: "play none none reverse",
      },
    });
  });
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
