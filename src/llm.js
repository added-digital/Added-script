require("./components/added_numbers").added_numbers();

gsap.set(".section_campaign-hero", {
  visibility: "visible",
});

gsap.set(".section_logo-slider", {
  visibility: "visible",
});

// Simple Hover Animation with Split Text
function initSimpleHoverAnimation() {
  // Find elements with data-hover-animation attribute
  const hoverElements = document.querySelectorAll("[data-hover-animation]");

  hoverElements.forEach((element) => {
    // Skip if element doesn't have text content
    if (!element.textContent.trim()) {
      console.warn("Element has no text content for split animation");
      return;
    }

    // Create split text
    const splitText = SplitText.create(element, {
      type: "chars",
      charsClass: "char",
    });

    // Set initial state
    gsap.set(splitText.chars, {
      y: 0,
      opacity: 1,
    });

    // Hover in animation
    element.addEventListener("mouseenter", () => {
      gsap.to(splitText.chars, {
        y: -10,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out",
      });
    });

    // Hover out animation
    element.addEventListener("mouseleave", () => {
      gsap.to(splitText.chars, {
        y: 0,
        duration: 0.3,
        stagger: 0.01,
        ease: "power2.out",
      });
    });
  });
}

// Initialize hover animations
document.addEventListener("DOMContentLoaded", initSimpleHoverAnimation);

// Also initialize if DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSimpleHoverAnimation);
} else {
  initSimpleHoverAnimation();
}
