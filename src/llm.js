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

  // Create the infinite loop animation
  gsap.to(logoSliderWrapper, {
    x: -groupWidth, // Move by the width of one group
    duration: 20, // Adjust duration for desired speed (20 seconds for slow, smooth movement)
    ease: "none", // Linear movement for consistent speed
    repeat: -1, // Infinite repeat
    onComplete: function () {
      // Reset position instantly when one cycle completes
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
