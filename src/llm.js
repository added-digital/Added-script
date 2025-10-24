require("./components/added_numbers").added_numbers();

gsap.set(".section_campaign-hero", {
  visibility: "visible",
});

gsap.set(".section_logo-slider", {
  visibility: "visible",
});

// Logo Slider Animation
function initLogoSliderAnimation() {
  const logoSliderWrapper = document.querySelector(".logo-slider_wrapper");

  if (!logoSliderWrapper) {
    console.warn("Logo slider wrapper not found");
    return;
  }

  // Get the width of one group to calculate the animation distance
  const firstGroup = logoSliderWrapper.querySelector(".logo-slider_group");
  if (!firstGroup) {
    console.warn("Logo slider group not found");
    return;
  }

  const groupWidth = firstGroup.offsetWidth;

  // Set initial position to ensure smooth start
  gsap.set(logoSliderWrapper, { x: 0 });

  // Create a timeline for the infinite loop animation
  const tl = gsap.timeline({ repeat: -1 });

  // Animate the wrapper moving left by one group width
  tl.to(logoSliderWrapper, {
    x: -groupWidth,
    duration: 15, // Adjust duration for desired speed (15 seconds for smooth movement)
    ease: "none", // Linear movement for consistent speed
    onComplete: function () {
      // Instantly reset position for seamless loop
      gsap.set(logoSliderWrapper, { x: 0 });
    },
  });
}

// Initialize the animation when the page loads
document.addEventListener("DOMContentLoaded", initLogoSliderAnimation);

// Also initialize if DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLogoSliderAnimation);
} else {
  initLogoSliderAnimation();
}
